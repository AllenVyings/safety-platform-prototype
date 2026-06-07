#!/usr/bin/env node

/**
 * Auto-Fix Loop — Autonomous test-fix cycle for HTML prototypes
 *
 * Usage:
 *   node auto-fix-loop.js --bug "Reviewer names don't display correctly"
 *   node auto-fix-loop.js --bug "Position level cascade not syncing" --max-iterations 5
 *   node auto-fix-loop.js --config bugs.json
 *
 * Flow:
 *   1. Take bug description → call Claude CLI to write Playwright test
 *   2. Run the test → if it fails, feed output back to Claude to fix the code
 *   3. Repeat until test passes or max iterations hit
 *   4. Log every attempt to fix-log.json
 */

import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// ── Config ──────────────────────────────────────────────────────────

const DEFAULTS = {
  maxIterations: 5,
  baseURL: 'http://localhost:8080',
  testDir: 'tests',
  prototypeDir: 'modules/enterprise',
  logFile: 'fix-log.json',
  claudeCmd: 'claude',
  // Target file for safety-control-object module
  targetFile: 'modules/enterprise/safety-control-object.html',
};

// ── Helpers ─────────────────────────────────────────────────────────

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${msg}`);
}

function runCmd(cmd, options = {}) {
  try {
    const result = execSync(cmd, {
      encoding: 'utf-8',
      timeout: options.timeout || 120000,
      cwd: options.cwd || process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { ok: true, stdout: result, stderr: '' };
  } catch (err) {
    return {
      ok: false,
      stdout: err.stdout || '',
      stderr: err.stderr || '',
      code: err.status,
    };
  }
}

function loadLog(logFile) {
  if (existsSync(logFile)) {
    try {
      return JSON.parse(readFileSync(logFile, 'utf-8'));
    } catch {
      return [];
    }
  }
  return [];
}

function saveLog(logFile, entries) {
  writeFileSync(logFile, JSON.stringify(entries, null, 2), 'utf-8');
}

function getGitDiff() {
  const r = runCmd('git diff --stat');
  return r.ok ? r.stdout.trim() : '(no diff)';
}

function getGitDiffFull() {
  const r = runCmd('git diff');
  return r.ok ? r.stdout.trim() : '';
}

// ── Step 1: Generate Playwright Test ────────────────────────────────

function generateTestPrompt(bug, iteration, previousFailOutput) {
  let prompt = `Write a Playwright test that reproduces this bug in the HTML prototype:

BUG: ${bug}

CONTEXT:
- Prototype runs at http://localhost:8080
- Main page is index.html which loads modules via iframe
- The safety-control-object module is at modules/enterprise/safety-control-object.html
- To navigate to the module: load http://localhost:8080/index.html, click the enterprise tab, then navigate to "安全管控对象" in the left menu
- Wait for iframe to load before interacting: await page.frameLocator('iframe').locator(...)
- The prototype uses mock data, no real API calls

REQUIREMENTS:
- Write the test to ${join(DEFAULTS.testDir, `auto-fix-${slugify(bug)}.spec.js`)}
- Use @playwright/test
- The test should FAIL if the bug exists, PASS if the bug is fixed
- Be specific: check exact text content, element visibility, or CSS classes
- Use page.frameLocator('#module-frame') to access the iframe content
- Add explicit waits for dynamic content (tree nodes, modals, etc.)
- Do NOT use skip or todo — the test must actually run`;

  if (previousFailOutput) {
    prompt += `

PREVIOUS TEST OUTPUT (test failed — the bug still exists):
${previousFailOutput}

Write an improved test that more precisely targets the bug.`;
  }

  return prompt;
}

function generateFixPrompt(bug, testOutput, iteration) {
  return `The Playwright test for this bug is FAILING:

BUG: ${bug}

TEST OUTPUT:
${testOutput}

Fix the code in ${DEFAULTS.targetFile} so this test passes.
- Only change what's necessary to fix the bug
- Keep all existing functionality intact
- Do NOT modify the test file
- After fixing, explain what you changed in one sentence.`;
}

// ── Step 2: Call Claude CLI ─────────────────────────────────────────

function callClaude(prompt, options = {}) {
  const allowedTools = options.allowedTools || 'Edit,Read,Write,Bash,Glob,Grep';
  const maxTokens = options.maxTokens || '';

  // Write prompt to temp file to avoid shell escaping issues
  const tmpFile = join(process.cwd(), '.auto-fix-prompt.md');
  writeFileSync(tmpFile, prompt, 'utf-8');

  let cmd = `${DEFAULTS.claudeCmd} -p "$(cat .auto-fix-prompt.md)" --allowedTools "${allowedTools}"`;
  if (maxTokens) {
    cmd += ` --max-tokens ${maxTokens}`;
  }

  log(`Calling Claude CLI...`);
  const result = runCmd(cmd, { timeout: 300000 });

  // Cleanup
  try { require('fs').unlinkSync(tmpFile); } catch {}

  return result;
}

// ── Step 3: Run Playwright Test ─────────────────────────────────────

function runTest(testFile) {
  log(`Running test: ${testFile}`);
  const result = runCmd(`npx playwright test ${testFile} --reporter=line`, { timeout: 60000 });
  return result;
}

// ── Step 4: Check Server ────────────────────────────────────────────

function ensureServer() {
  log('Checking if dev server is running...');
  const check = runCmd(`curl -s -o /dev/null -w "%{http_code}" ${DEFAULTS.baseURL}/index.html`);
  if (check.ok && check.stdout.trim() === '200') {
    log('Dev server is running.');
    return true;
  }

  log('Starting dev server...');
  runCmd('python -m http.server 8080', { timeout: 5000 });
  // Give server time to start
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Can't easily async in this script structure, so just warn
  log('WARNING: Server may need manual start. Run: python -m http.server 8080');
  return false;
}

// ── Main Loop ───────────────────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

async function autoFixLoop(bug, config = {}) {
  const maxIter = config.maxIterations || DEFAULTS.maxIterations;
  const logFile = config.logFile || DEFAULTS.logFile;
  const testDir = config.testDir || DEFAULTS.testDir;
  const slug = slugify(bug);
  const testFile = join(testDir, `auto-fix-${slug}.spec.js`);

  const logEntries = loadLog(logFile);
  const bugLog = {
    bug,
    slug,
    startedAt: new Date().toISOString(),
    iterations: [],
    result: 'pending',
  };

  log(`\n${'='.repeat(60)}`);
  log(`Auto-Fix Loop: "${bug}"`);
  log(`Max iterations: ${maxIter}`);
  log(`${'='.repeat(60)}\n`);

  // ── Iteration 0: Generate Test ──
  log('--- Iteration 0: Generate Playwright test ---');
  const genPrompt = generateTestPrompt(bug, 0, null);
  const genResult = callClaude(genPrompt, { allowedTools: 'Write,Read,Glob,Grep' });

  const iter0 = {
    iteration: 0,
    phase: 'generate-test',
    claudeOutput: genResult.stdout.slice(-2000),
    success: genResult.ok,
    timestamp: new Date().toISOString(),
  };

  if (!genResult.ok) {
    log(`ERROR: Claude CLI failed: ${genResult.stderr.slice(0, 500)}`);
    iter0.error = genResult.stderr.slice(0, 500);
    bugLog.iterations.push(iter0);
    bugLog.result = 'error-generating-test';
    logEntries.push(bugLog);
    saveLog(logFile, logEntries);
    return bugLog;
  }

  // Check if test file was created
  if (!existsSync(testFile)) {
    log(`WARNING: Test file not found at ${testFile}, checking test dir...`);
    const ls = runCmd(`ls ${testDir}/auto-fix-*.spec.js 2>/dev/null`);
    iter0.note = `Expected test at ${testFile}, found: ${ls.stdout.trim()}`;
  }

  bugLog.iterations.push(iter0);
  log('Test generated.');

  // ── Iterations 1..N: Test → Fix → Retest ──
  for (let i = 1; i <= maxIter; i++) {
    log(`\n--- Iteration ${i}: Run test ---`);

    const testResult = runTest(testFile);
    const testOutput = testResult.ok
      ? testResult.stdout
      : `${testResult.stdout}\n${testResult.stderr}`;

    const testPassed = testResult.ok;
    const diff = getGitDiff();

    const iter = {
      iteration: i,
      phase: testPassed ? 'test-passed' : 'test-failed',
      testOutput: testOutput.slice(-3000),
      testPassed,
      diff: diff.slice(0, 2000),
      timestamp: new Date().toISOString(),
    };

    if (testPassed) {
      log('TEST PASSED! Bug is fixed.');
      iter.fullDiff = getGitDiffFull().slice(0, 5000);
      bugLog.iterations.push(iter);
      bugLog.result = 'fixed';
      bugLog.fixedAt = new Date().toISOString();
      break;
    }

    log(`Test FAILED. Feeding output to Claude for fix...`);

    // Feed failing test output to Claude for fix
    const fixPrompt = generateFixPrompt(bug, testOutput, i);
    const fixResult = callClaude(fixPrompt);

    iter.fixOutput = fixResult.stdout.slice(-2000);
    iter.fixSuccess = fixResult.ok;

    if (!fixResult.ok) {
      log(`ERROR: Claude fix failed: ${fixResult.stderr.slice(0, 500)}`);
      iter.fixError = fixResult.stderr.slice(0, 500);
      bugLog.iterations.push(iter);
      bugLog.result = 'error-fixing';
      break;
    }

    log('Fix applied. Re-running test...');
    bugLog.iterations.push(iter);

    // If this was the last iteration, check test one more time
    if (i === maxIter) {
      const finalTest = runTest(testFile);
      bugLog.result = finalTest.ok ? 'fixed-on-last-try' : 'max-iterations-reached';
      bugLog.finalTestPassed = finalTest.ok;
    }
  }

  bugLog.completedAt = new Date().toISOString();
  logEntries.push(bugLog);
  saveLog(logFile, logEntries);

  log(`\n${'='.repeat(60)}`);
  log(`Result: ${bugLog.result}`);
  log(`Iterations: ${bugLog.iterations.length}`);
  log(`Log saved to: ${logFile}`);
  log(`${'='.repeat(60)}\n`);

  return bugLog;
}

// ── CLI Entry ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
let bugDescription = '';
let maxIterations = DEFAULTS.maxIterations;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--bug' && args[i + 1]) {
    bugDescription = args[++i];
  } else if (args[i] === '--max-iterations' && args[i + 1]) {
    maxIterations = parseInt(args[++i], 10);
  } else if (args[i] === '--config' && args[i + 1]) {
    // Load config from JSON
    const configPath = args[++i];
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    if (config.bugs) {
      // Run multiple bugs sequentially
      for (const bug of config.bugs) {
        autoFixLoop(bug.description || bug, {
          ...DEFAULTS,
          maxIterations: config.maxIterations || maxIterations,
        });
      }
      process.exit(0);
    }
  }
}

if (!bugDescription) {
  console.error('Usage: node auto-fix-loop.js --bug "Bug description" [--max-iterations 5]');
  console.error('       node auto-fix-loop.js --config bugs.json');
  process.exit(1);
}

autoFixLoop(bugDescription, { ...DEFAULTS, maxIterations });
