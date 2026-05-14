import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Opening index.html...');
  await page.goto('http://localhost:8080/index.html', { timeout: 10000 });
  await page.waitForLoadState('networkidle');

  // Wait for the page to load
  await page.waitForTimeout(2000);

  // Take screenshot of main page
  await page.screenshot({ path: 'test-screenshot-main.png', fullPage: true });
  console.log('Screenshot saved: test-screenshot-main.png');

  // Try to navigate to safety-control-object
  // Click on enterprise module in sidebar
  try {
    await page.click('text=企业管理', { timeout: 3000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-screenshot-enterprise.png', fullPage: true });
    console.log('Screenshot saved: test-screenshot-enterprise.png');

    // Click on safety control object
    await page.click('text=安全管控对象', { timeout: 3000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-screenshot-safety.png', fullPage: true });
    console.log('Screenshot saved: test-screenshot-safety.png');

    // Check if tree is visible
    const treeVisible = await page.isVisible('.tree-node').catch(() => false);
    console.log('Tree visible:', treeVisible);

    // Click add place button
    await page.click('button:has-text("新增场所"), button:has-text("新增"), .btn-primary', { timeout: 3000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-screenshot-modal.png', fullPage: true });
    console.log('Screenshot saved: test-screenshot-modal.png');

  } catch (e) {
    console.log('Navigation error:', e.message);
  }

  await browser.close();
  console.log('Done!');
})();
