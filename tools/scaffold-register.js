/**
 * scaffold 辅助 — 菜单注册 + module-registry 注册
 * 用法:
 *   node tools/scaffold-register.js <portal> <moduleName> <displayName> <description> <prdRef> <moduleId> <menuId> <menusPortalKey> <htmlPath>
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 9) {
  console.error('用法: node scaffold-register.js <portal> <moduleName> <displayName> <description> <prdRef> <moduleId> <menuId> <menusPortalKey> <htmlPath>');
  process.exit(1);
}

const [portal, moduleName, displayName, description, prdRef, moduleId, menuId, menusPortalKey, htmlPath] = args;

const baseDir = path.join(__dirname, '..');

// ================================================================
// 1. 注册 menus.js
// ================================================================
function registerMenu() {
  const menusPath = path.join(baseDir, 'config', 'menus.js');
  const content = fs.readFileSync(menusPath, 'utf8');

  // 找到 portal section
  const startMarker = "'" + menusPortalKey + "': [";
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('错误: 未找到 portal section: ' + menusPortalKey);
    process.exit(1);
  }

  // 找到对应的结束 ]
  let depth = 0;
  let inTarget = false;
  let insertPos = -1;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') { depth++; inTarget = true; }
    else if (content[i] === ']') {
      depth--;
      if (inTarget && depth === 0) { insertPos = i; break; }
    }
  }

  if (insertPos === -1) {
    console.error('错误: 无法确定插入位置');
    process.exit(1);
  }

  // 构建菜单条目
  const entry = [
    '    {',
    "      id: '" + menuId + "',",
    "      name: '" + displayName + "',",
    "      icon: '📄',",
    "      module: '" + moduleId + "',",
    "      path: '" + htmlPath + "',",
    "      description: '" + description + "',",
    '      badge: null,',
    '      disabled: false',
    '    }'
  ].join('\n');

  const before = content.slice(0, insertPos);
  const after = content.slice(insertPos);
  const trimmedBefore = before.trimEnd();
  const needsComma = !trimmedBefore.endsWith(',');

  const newContent = trimmedBefore + (needsComma ? ',' : '') + '\n' + entry + '\n  ' + after.trimStart();

  fs.writeFileSync(menusPath, newContent, 'utf8');
  console.log('  [menus.js] 菜单项已插入: ' + menuId);
}

// ================================================================
// 2. 注册 module-registry.json
// ================================================================
function registerRegistry() {
  const registryPath = path.join(baseDir, 'module-registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  if (registry.modules[moduleId]) {
    console.log('  [registry] 模块已存在，跳过: ' + moduleId);
    return;
  }

  registry.modules[moduleId] = {
    prd: prdRef,
    annotations: 'missing',
    status: 'draft',
    note: displayName
  };
  registry._meta.lastUpdated = new Date().toISOString().slice(0, 10);

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');
  console.log('  [registry] 已注册: ' + moduleId);
}

// ================================================================
// Run
// ================================================================
registerMenu();
registerRegistry();
