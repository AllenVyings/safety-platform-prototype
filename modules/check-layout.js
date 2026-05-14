const fs = require('fs');
const path = 'C:/Users/allen/.qclaw/workspace/01-安全码综合管理平台/05-原型 V5.0/modules/enterprise/safety-control-object.html';
let content = fs.readFileSync(path, 'utf8');

// 检查关键CSS类是否存在
const checks = [
  '.page-container',
  '.left-panel',
  '.right-panel',
  'display:flex',
  'flex-direction:row',
  'width:280px',
  'flex:1'
];

checks.forEach(c => {
  const found = content.includes(c);
  console.log((found ? '✅' : '❌') + ' ' + c);
});

// 检查HTML结构
const leftStart = content.indexOf('class="left-panel"');
const leftEnd = content.indexOf('</div>', leftStart);
const rightStart = content.indexOf('class="right-panel"');
const rightEnd = content.indexOf('</div>', rightStart);
const pageStart = content.indexOf('class="page-container"');
const pageEnd = content.lastIndexOf('</div>');

console.log('\n📍 left-panel  起始: ' + leftStart + '  闭合: ' + leftEnd);
console.log('📍 right-panel 起始: ' + rightStart + '  闭合: ' + rightEnd);
console.log('📍 page-container 起始: ' + pageStart + '  最后闭合: ' + pageEnd);

// 检查tree-children-root是否正确闭合
const rootOpen = content.indexOf('id="tree-children-root"');
const rootClose = content.indexOf('</div>', rootOpen);
console.log('\n🌳 tree-children-root 起始: ' + rootOpen + '  闭合: ' + rootClose);

// 检查left-panel和right-panel是否在page-container内
if (leftStart > pageStart && leftEnd < pageEnd && rightStart > pageStart && rightEnd < pageEnd) {
  console.log('\n✅ left-panel 和 right-panel 都在 page-container 内');
} else {
  console.log('\n❌ 布局结构异常！');
  console.log('   left-panel 在 page-container 内: ' + (leftStart > pageStart && leftEnd < pageEnd));
  console.log('   right-panel 在 page-container 内: ' + (rightStart > pageStart && rightEnd < pageEnd));
}
