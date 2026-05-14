const fs = require('fs');
const path = 'C:/Users/allen/.qclaw/workspace/01-安全码综合管理平台/05-原型 V5.0/modules/enterprise/safety-control-object.html';
let content = fs.readFileSync(path, 'utf8');

// 检查tree-children-root的闭合标签
const rootOpen = content.indexOf('id="tree-children-root"');
const rootClose = content.indexOf('</div>', rootOpen);
const afterRootClose = content.substring(rootClose, rootClose + 50);
console.log('tree-children-root闭合后内容:', JSON.stringify(afterRootClose));

// 检查left-panel的闭合
const leftStart = content.indexOf('class="left-panel"');
// 找到left-panel对应的闭合标签（跳过内部div）
let depth = 0;
let leftEnd = leftStart;
let found = false;
for (let i = leftStart; i < content.length; i++) {
  if (content.substring(i, i+4) === '<div') depth++;
  if (content.substring(i, i+6) === '</div>') {
    depth--;
    if (depth === 0 && found === false) {
      leftEnd = i;
      found = true;
      break;
    }
  }
}
console.log('\nleft-panel闭合位置:', leftEnd);
console.log('left-panel闭合后内容:', JSON.stringify(content.substring(leftEnd, leftEnd + 50)));

// 检查page-container内的结构
const pageStart = content.indexOf('class="page-container"');
const pageInner = content.substring(pageStart, leftEnd + 6);
const divCount = (pageInner.match(/<div/g) || []).length;
const closeCount = (pageInner.match(/<\/div>/g) || []).length;
console.log('\npage-container内 <div 数量:', divCount);
console.log('page-container内 </div> 数量:', closeCount);
console.log('是否平衡:', divCount === closeCount ? '✅' : '❌');
