const fs = require('fs');
const path = 'C:/Users/allen/.qclaw/workspace/01-安全码综合管理平台/05-原型 V5.0/modules/enterprise/safety-control-object.html';
let content = fs.readFileSync(path, 'utf8');

// 找到left-panel开始位置
const leftStart = content.indexOf('class="left-panel"');
// 向前找<div
const divStart = content.lastIndexOf('<div', leftStart);
console.log('left-panel div起始:', divStart);
console.log('内容:', content.substring(divStart, divStart + 30));

// 找到这个div的闭合位置
let depth = 0;
let leftEnd = divStart;
for (let i = divStart; i < content.length; i++) {
  if (content.substring(i, i+4) === '<div') depth++;
  if (content.substring(i, i+6) === '</div>') {
    depth--;
    if (depth === 0) {
      leftEnd = i;
      break;
    }
  }
}
console.log('\nleft-panel正确闭合位置:', leftEnd);
console.log('闭合后内容:', JSON.stringify(content.substring(leftEnd, leftEnd + 60)));

// 检查left-panel内部结构
const leftInner = content.substring(divStart, leftEnd + 6);
const innerDivs = (leftInner.match(/<div/g) || []).length;
const innerCloses = (leftInner.match(/<\/div>/g) || []).length;
console.log('\nleft-panel内 <div 数量:', innerDivs);
console.log('left-panel内 </div> 数量:', innerCloses);
console.log('是否平衡:', innerDivs === innerCloses ? '✅' : '❌');
