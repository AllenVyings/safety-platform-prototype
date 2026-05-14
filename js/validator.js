/**
 * 安全码综合管理平台 V5.0 - 模块语法验证工具
 * 检查 HTML 模块的语法完整性
 */

const ModuleValidator = {
  /**
   * 验证结果
   */
  results: {
    passed: [],
    warnings: [],
    errors: []
  },
  
  /**
   * 验证单个模块
   * @param {string} content - HTML 内容
   * @param {string} filename - 文件名
   * @returns {Object} 验证结果
   */
  validateModule(content, filename) {
    const issues = [];
    const warnings = [];
    
    // 1. 检查 DOCTYPE
    if (!content.startsWith('<!DOCTYPE html>')) {
      issues.push('缺少 DOCTYPE 声明');
    }
    
    // 2. 检查 meta charset
    if (!content.includes('<meta charset="UTF-8">') && !content.includes("<meta charset='UTF-8'>")) {
      issues.push('缺少 UTF-8 编码声明');
    }
    
    // 3. 检查 CSS 引用
    if (!content.includes('variables.css')) {
      warnings.push('未引用 variables.css');
    }
    if (!content.includes('framework.css')) {
      warnings.push('未引用 framework.css');
    }
    
    // 4. 检查 HTML 标签闭合
    const openTags = content.match(/<([a-z][a-z0-9]*)\b[^>]*>/gi) || [];
    const closeTags = content.match(/<\/([a-z][a-z0-9]*)>/gi) || [];
    
    const tagCounts = {};
    openTags.forEach(tag => {
      const tagName = tag.match(/<([a-z][a-z0-9]*)/i)[1].toLowerCase();
      if (!['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'].includes(tagName)) {
        tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
      }
    });
    
    closeTags.forEach(tag => {
      const tagName = tag.match(/<\/([a-z][a-z0-9]*)/i)[1].toLowerCase();
      tagCounts[tagName] = (tagCounts[tagName] || 0) - 1;
    });
    
    Object.entries(tagCounts).forEach(([tag, count]) => {
      if (count > 0) {
        issues.push(`<${tag}> 标签未闭合 (${count} 个)`);
      }
    });
    
    // 5. 检查 script 标签
    const scriptOpen = (content.match(/<script/gi) || []).length;
    const scriptClose = (content.match(/<\/script>/gi) || []).length;
    if (scriptOpen !== scriptClose) {
      issues.push(`script 标签数量不匹配 (开: ${scriptOpen}, 闭: ${scriptClose})`);
    }
    
    // 6. 检查 style 标签
    const styleOpen = (content.match(/<style/gi) || []).length;
    const styleClose = (content.match(/<\/style>/gi) || []).length;
    if (styleOpen !== styleClose) {
      issues.push(`style 标签数量不匹配 (开: ${styleOpen}, 闭: ${styleClose})`);
    }
    
    // 7. 检查引号配对
    const doubleQuotes = (content.match(/"/g) || []).length;
    const singleQuotes = (content.match(/'/g) || []).length;
    if (doubleQuotes % 2 !== 0) {
      issues.push('双引号数量不匹配');
    }
    if (singleQuotes % 2 !== 0) {
      issues.push('单引号数量不匹配');
    }
    
    // 8. 检查大括号配对（JS 代码）
    const scriptContent = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
    scriptContent.forEach(script => {
      const braces = script.replace(/"[^"]*"/g, '').replace(/'[^']*'/g, '').replace(/\/\/.*$/gm, '');
      const openBraces = (braces.match(/{/g) || []).length;
      const closeBraces = (braces.match(/}/g) || []).length;
      if (openBraces !== closeBraces) {
        issues.push('JS 大括号不匹配');
      }
    });
    
    // 9. 检查函数定义
    const functionNames = content.match(/function\s+(\w+)\s*\(/g) || [];
    functionNames.forEach(fn => {
      const name = fn.match(/function\s+(\w+)/)[1];
      // 检查函数是否被调用（简单检查）
    });
    
    // 10. 检查 onclick 等事件绑定
    const eventHandlers = content.match(/on(click|change|submit|load|error|keyup|keydown|mouseover|mouseout)\s*=\s*["'][^"']*["']/gi) || [];
    eventHandlers.forEach(handler => {
      const funcName = handler.match(/="([^"]+)"/)?.[1] || handler.match(/='([^']+)'/)?.[1];
      if (funcName && !funcName.includes('(') && !content.includes(`function ${funcName}`)) {
        warnings.push(`事件函数可能未定义: ${funcName}`);
      }
    });
    
    return {
      filename,
      passed: issues.length === 0,
      issues,
      warnings
    };
  },
  
  /**
   * 验证所有模块
   * @param {Array} files - 文件列表
   */
  validateAll(files) {
    this.results = { passed: [], warnings: [], errors: [] };
    
    files.forEach(file => {
      const result = this.validateModule(file.content, file.name);
      
      if (result.passed && result.warnings.length === 0) {
        this.results.passed.push(result);
      } else if (result.passed && result.warnings.length > 0) {
        this.results.warnings.push(result);
      } else {
        this.results.errors.push(result);
      }
    });
    
    return this.results;
  },
  
  /**
   * 生成验证报告
   */
  generateReport() {
    const lines = [];
    
    lines.push('========================================');
    lines.push('   V5.0 模块语法验证报告');
    lines.push(`   时间: ${new Date().toLocaleString()}`);
    lines.push('========================================');
    lines.push('');
    
    // 统计
    const total = this.results.passed.length + this.results.warnings.length + this.results.errors.length;
    lines.push(`📊 验证统计:`);
    lines.push(`   总文件数: ${total}`);
    lines.push(`   ✅ 通过: ${this.results.passed.length}`);
    lines.push(`   ⚠️ 警告: ${this.results.warnings.length}`);
    lines.push(`   ❌ 错误: ${this.results.errors.length}`);
    lines.push('');
    
    // 错误详情
    if (this.results.errors.length > 0) {
      lines.push('❌ 错误详情:');
      this.results.errors.forEach((r, i) => {
        lines.push(`   ${i + 1}. ${r.filename}`);
        r.issues.forEach(issue => {
          lines.push(`      - ${issue}`);
        });
      });
      lines.push('');
    }
    
    // 警告详情
    if (this.results.warnings.length > 0) {
      lines.push('⚠️ 警告详情:');
      this.results.warnings.forEach((r, i) => {
        lines.push(`   ${i + 1}. ${r.filename}`);
        r.warnings.forEach(warn => {
          lines.push(`      - ${warn}`);
        });
      });
      lines.push('');
    }
    
    // 通过列表
    if (this.results.passed.length > 0) {
      lines.push('✅ 通过验证:');
      this.results.passed.forEach((r, i) => {
        lines.push(`   ${i + 1}. ${r.filename}`);
      });
    }
    
    lines.push('');
    lines.push('========================================');
    
    return lines.join('\n');
  }
};

// 导出
window.ModuleValidator = ModuleValidator;

console.log('[Validator] 模块验证工具加载完成 ✅');
