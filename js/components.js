/**
 * 安全码综合管理平台 V5.0 - 公共组件库
 * 包含弹窗、表单、表格、选择器等常用组件
 */

// ==================== 弹窗组件 ====================
const ModalComponent = {
  /**
   * 表单弹窗
   * @param {Object} options - 配置项
   * @param {string} options.title - 弹窗标题
   * @param {Array} options.fields - 表单字段配置
   * @param {Function} options.onConfirm - 确认回调
   */
  form(options) {
    const { title, fields, onConfirm, width = 520 } = options;
    
    const fieldsHtml = fields.map(field => {
      const required = field.required ? '<span style="color: var(--error);">*</span>' : '';
      const label = `<label class="form-label">${required} ${field.label}</label>`;
      
      let input = '';
      switch (field.type) {
        case 'select':
          const options = (field.options || []).map(opt => 
            `<option value="${opt.value}">${opt.label}</option>`
          ).join('');
          input = `<select class="form-select" name="${field.name}">${options}</select>`;
          break;
        case 'textarea':
          input = `<textarea class="form-textarea" name="${field.name}" rows="${field.rows || 3}" placeholder="${field.placeholder || ''}"></textarea>`;
          break;
        case 'date':
          input = `<input type="date" class="form-input" name="${field.name}" value="${field.value || ''}">`;
          break;
        default:
          input = `<input type="${field.type || 'text'}" class="form-input" name="${field.name}" placeholder="${field.placeholder || ''}" value="${field.value || ''}">`;
      }
      
      return `<div class="form-group">${label}${input}</div>`;
    }).join('');
    
    return {
      title,
      content: `<form class="modal-form">${fieldsHtml}</form>`,
      width,
      onConfirm
    };
  },
  
  /**
   * 确认弹窗
   */
  confirm(message, onConfirm) {
    return {
      title: '确认操作',
      content: `<p style="text-align: center; padding: 20px 0;">${message}</p>`,
      width: 400,
      type: 'confirm',
      onConfirm
    };
  },
  
  /**
   * 信息弹窗
   */
  info(message, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return {
      title: '提示',
      content: `<div style="text-align: center; padding: 20px 0;"><span style="font-size: 48px;">${icons[type]}</span><p style="margin-top: 16px;">${message}</p></div>`,
      width: 400,
      type: 'alert'
    };
  }
};

// ==================== 表单组件 ====================
const FormComponents = {
  /**
   * 输入框
   */
  input(name, label, options = {}) {
    const { placeholder = '', value = '', required = false, type = 'text' } = options;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    return `
      <div class="form-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <input type="${type}" class="form-input" name="${name}" value="${value}" placeholder="${placeholder}">
      </div>
    `;
  },
  
  /**
   * 下拉选择
   */
  select(name, label, options = [], config = {}) {
    const { required = false, placeholder = '请选择' } = config;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    const optionsHtml = options.map(opt => 
      `<option value="${opt.value}">${opt.label}</option>`
    ).join('');
    return `
      <div class="form-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <select class="form-select" name="${name}">
          <option value="">${placeholder}</option>
          ${optionsHtml}
        </select>
      </div>
    `;
  },
  
  /**
   * 日期选择
   */
  date(name, label, options = {}) {
    const { required = false, value = '' } = options;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    return `
      <div class="form-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <input type="date" class="form-input" name="${name}" value="${value}">
      </div>
    `;
  },
  
  /**
   * 文本域
   */
  textarea(name, label, options = {}) {
    const { required = false, placeholder = '', rows = 3 } = options;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    return `
      <div class="form-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <textarea class="form-textarea" name="${name}" rows="${rows}" placeholder="${placeholder}"></textarea>
      </div>
    `;
  },
  
  /**
   * 单选框组
   */
  radioGroup(name, label, options = [], config = {}) {
    const { required = false, inline = true } = config;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    const itemsHtml = options.map((opt, i) => `
      <label class="radio-item ${inline ? 'inline' : ''}">
        <input type="radio" name="${name}" value="${opt.value}" ${i === 0 ? 'checked' : ''}>
        <span>${opt.label}</span>
      </label>
    `).join('');
    return `
      <div class="form-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <div class="radio-group">${itemsHtml}</div>
      </div>
    `;
  },
  
  /**
   * 复选框组
   */
  checkboxGroup(name, label, options = [], config = {}) {
    const { required = false, inline = true } = config;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    const itemsHtml = options.map(opt => `
      <label class="checkbox-item ${inline ? 'inline' : ''}">
        <input type="checkbox" name="${name}" value="${opt.value}">
        <span>${opt.label}</span>
      </label>
    `).join('');
    return `
      <div class="form-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <div class="checkbox-group">${itemsHtml}</div>
      </div>
    `;
  }
};

// ==================== 表格组件 ====================
const TableComponents = {
  /**
   * 标准表格
   */
  basic(columns, data, options = {}) {
    const { id = 'table', emptyText = '暂无数据' } = options;
    
    const theadHtml = columns.map(col => 
      `<th style="${col.width ? 'width:' + col.width : ''}">${col.title}</th>`
    ).join('');
    
    const tbodyHtml = data.length > 0 
      ? data.map((row, i) => {
          const cells = columns.map(col => {
            const value = row[col.key];
            if (col.render) {
              return `<td>${col.render(value, row, i)}</td>`;
            }
            return `<td>${value || '-'}</td>`;
          }).join('');
          return `<tr data-index="${i}">${cells}</tr>`;
        }).join('')
      : `<tr><td colspan="${columns.length}" style="text-align: center; color: var(--text3); padding: 40px;">${emptyText}</td></tr>`;
    
    return `
      <div class="table-wrapper">
        <table class="table-basic">
          <thead><tr>${theadHtml}</tr></thead>
          <tbody>${tbodyHtml}</tbody>
        </table>
      </div>
    `;
  },
  
  /**
   * 分页表格
   */
  pagination(total, current = 1, pageSize = 10, onChange) {
    const totalPages = Math.ceil(total / pageSize);
    const pages = [];
    
    // 生成页码
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (current >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', totalPages);
      }
    }
    
    const pagesHtml = pages.map(p => {
      if (p === '...') {
        return `<span class="pg-ellipsis">...</span>`;
      }
      return `<button class="pg ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }).join('');
    
    return `
      <div class="pagination">
        <span class="pg-info">共 ${total} 条</span>
        <button class="pg" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}>上一页</button>
        ${pagesHtml}
        <button class="pg" data-page="${current + 1}" ${current === totalPages ? 'disabled' : ''}>下一页</button>
      </div>
    `;
  },
  
  /**
   * 操作列
   */
  actions(btns) {
    return btns.map(btn => {
      const { text, type = 'link', onClick, danger = false } = btn;
      const className = type === 'link' ? 'btn-link' : `btn btn-${type}`;
      const dangerClass = danger ? 'danger' : '';
      return `<button class="${className} ${dangerClass}" onclick="${onClick}">${text}</button>`;
    }).join('');
  }
};

// ==================== 选择器组件 ====================
const SelectComponents = {
  /**
   * 级联选择器
   */
  cascade(name, label, options = [], config = {}) {
    const { placeholder = '请选择', required = false, levels = 3 } = config;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    
    const selectsHtml = [];
    for (let i = 0; i < levels; i++) {
      selectsHtml.push(`<select class="form-select cascade-select" data-level="${i}" name="${name}_${i}">
        <option value="">${i === 0 ? placeholder : '请选择'}</option>
      </select>`);
    }
    
    return `
      <div class="form-group cascade-group" data-name="${name}" data-options='${JSON.stringify(options)}'>
        <label class="form-label">${requiredMark} ${label}</label>
        <div class="cascade-selects">
          ${selectsHtml.join('')}
        </div>
      </div>
    `;
  },
  
  /**
   * 树形选择器
   */
  treeSelect(name, label, data = [], config = {}) {
    const { placeholder = '请选择', required = false, multiple = false } = config;
    const requiredMark = required ? '<span style="color: var(--error);">*</span>' : '';
    
    const renderTree = (nodes, level = 0) => {
      return nodes.map(node => {
        const hasChildren = node.children && node.children.length > 0;
        const indent = level * 20;
        return `
          <div class="tree-node" data-id="${node.id}" style="padding-left: ${indent}px;">
            ${hasChildren ? '<span class="tree-toggle">▶</span>' : '<span class="tree-leaf"></span>'}
            <label class="tree-checkbox">
              <input type="${multiple ? 'checkbox' : 'radio'}" name="${name}" value="${node.id}">
              <span>${node.name}</span>
            </label>
          </div>
          ${hasChildren ? `<div class="tree-children">${renderTree(node.children, level + 1)}</div>` : ''}
        `;
      }).join('');
    };
    
    return `
      <div class="form-group tree-select-group">
        <label class="form-label">${requiredMark} ${label}</label>
        <div class="tree-select-trigger" onclick="this.nextElementSibling.classList.toggle('show')">
          <span class="tree-select-value">${placeholder}</span>
          <span class="tree-select-arrow">▼</span>
        </div>
        <div class="tree-select-dropdown">
          <div class="tree-select-search">
            <input type="text" placeholder="搜索..." class="form-input">
          </div>
          <div class="tree-select-content">
            ${renderTree(data)}
          </div>
        </div>
      </div>
    `;
  }
};

// ==================== 导出组件 ====================
window.Components = {
  Modal: ModalComponent,
  Form: FormComponents,
  Table: TableComponents,
  Select: SelectComponents
};

console.log('[Components] 公共组件库加载完成 ✅');
