/**
 * 构建脚本：将组件注入到主页面
 * 用法：node build.js
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'components', 'modals');
const MAIN_FILE = path.join(__dirname, '..', 'domain-manage.html');
const OUTPUT_FILE = path.join(__dirname, '..', 'domain-manage.html');

// 读取组件
function readComponent(filename) {
  const filePath = path.join(COMPONENTS_DIR, filename);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return '';
}

// 读取主文件
function readMainFile() {
  if (fs.existsSync(MAIN_FILE)) {
    return fs.readFileSync(MAIN_FILE, 'utf8');
  }
  return '';
}

// 替换占位符
function replacePlaceholder(content, placeholder, replacement) {
  const regex = new RegExp(`<!-- COMPONENT:${placeholder} -->[\\s\\S]*?<!-- /COMPONENT:${placeholder} -->`, 'g');
  return content.replace(regex, `<!-- COMPONENT:${placeholder} -->\n${replacement}\n<!-- /COMPONENT:${placeholder} -->`);
}

// 主函数
function build() {
  console.log('开始构建...');
  
  let mainContent = readMainFile();
  
  if (!mainContent) {
    console.error('错误：找不到主文件', MAIN_FILE);
    return;
  }
  
  // 读取组件
  const checklistModal = readComponent('checklist-modal.html');
  
  if (!checklistModal) {
    console.error('错误：找不到检查表配置弹框组件');
    return;
  }
  
  // 检查是否有占位符
  if (!mainContent.includes('<!-- COMPONENT:checklist-modal -->')) {
    console.log('提示：主文件中未找到占位符，将在文件末尾添加组件');
    
    // 在 </body> 前添加组件
    mainContent = mainContent.replace('</body>', `${checklistModal}\n</body>`);
  } else {
    // 替换占位符
    mainContent = replacePlaceholder(mainContent, 'checklist-modal', checklistModal);
  }
  
  // 写入输出文件
  fs.writeFileSync(OUTPUT_FILE, mainContent, 'utf8');
  
  console.log('构建完成！输出文件:', OUTPUT_FILE);
}

build();
