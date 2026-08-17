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
    const { id = 'table', emptyText = '暂无数据', emptyType = '' } = options;

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
      : (() => {
          // 支持新式空状态组件（emptyType）或传统文本（emptyText）
          if (emptyType && window.Components && window.Components.Empty) {
            return `<tr><td colspan="${columns.length}" style="padding: 0;">${window.Components.Empty.render(emptyType, options)}</td></tr>`;
          }
          return `<tr><td colspan="${columns.length}" style="text-align: center; color: var(--text-tertiary); padding: 40px;">${emptyText}</td></tr>`;
        })();

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

// ==================== 空状态组件 ====================
const EmptyStates = {
  /**
   * 渲染空状态
   * @param {string} type - 类型：list-empty | no-selection | first-use | load-error | no-permission | no-search-result | maintenance
   * @param {Object} options - 配置项
   * @param {string} options.title - 自定义标题（覆盖默认）
   * @param {string} options.description - 自定义描述（覆盖默认）
   * @param {string} options.actionText - 操作按钮文字
   * @param {Function} options.onAction - 操作按钮回调
   * @returns {string} HTML 字符串
   */
  render(type, options = {}) {
    const presets = {
      'list-empty': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="4" stroke="#bfbfbf" stroke-width="2"/><line x1="20" y1="28" x2="44" y2="28" stroke="#d9d9d9" stroke-width="2"/><line x1="20" y1="36" x2="36" y2="36" stroke="#d9d9d9" stroke-width="2"/></svg>',
        title: '暂无数据',
        description: '当前列表为空，请先添加数据或调整筛选条件'
      },
      'no-selection': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="20" stroke="#bfbfbf" stroke-width="2" stroke-dasharray="4 4"/><path d="M26 32L30 36L38 28" stroke="#d9d9d9" stroke-width="2"/></svg>',
        title: '未选择',
        description: '请从左侧列表中选择一项查看详情'
      },
      'first-use': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="16" y="20" width="32" height="24" rx="4" stroke="#bfbfbf" stroke-width="2"/><circle cx="32" cy="32" r="6" stroke="#bfbfbf" stroke-width="2"/><path d="M32 26V20M32 44V38" stroke="#d9d9d9" stroke-width="2"/></svg>',
        title: '欢迎使用',
        description: '这是您首次进入该功能，点击开始配置'
      },
      'load-error': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="20" stroke="#ff4d4f" stroke-width="2"/><line x1="32" y1="22" x2="32" y2="34" stroke="#ff4d4f" stroke-width="2"/><circle cx="32" cy="40" r="2" fill="#ff4d4f"/></svg>',
        title: '加载失败',
        description: '网络异常或数据获取失败，请稍后重试'
      },
      'no-permission': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="20" y="28" width="24" height="16" rx="2" stroke="#bfbfbf" stroke-width="2"/><path d="M24 28V22C24 17.58 27.58 14 32 14C36.42 14 40 17.58 40 22V28" stroke="#bfbfbf" stroke-width="2"/><circle cx="32" cy="36" r="2" fill="#bfbfbf"/></svg>',
        title: '无访问权限',
        description: '您没有权限查看此内容，请联系管理员开通'
      },
      'no-search-result': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="28" cy="28" r="12" stroke="#bfbfbf" stroke-width="2"/><line x1="36" y1="36" x2="44" y2="44" stroke="#bfbfbf" stroke-width="2"/><line x1="24" y1="28" x2="32" y2="28" stroke="#d9d9d9" stroke-width="2"/></svg>',
        title: '搜索无结果',
        description: '未找到匹配的内容，请尝试其他关键词'
      },
      'maintenance': {
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M32 16L48 44H16L32 16Z" stroke="#faad14" stroke-width="2" fill="none"/><line x1="32" y1="26" x2="32" y2="34" stroke="#faad14" stroke-width="2"/><circle cx="32" cy="38" r="1.5" fill="#faad14"/></svg>',
        title: '功能维护中',
        description: '该功能正在升级维护，预计很快恢复，敬请期待'
      }
    };

    const preset = presets[type] || presets['list-empty'];
    const title = options.title || preset.title;
    const description = options.description || preset.description;
    const actionHtml = options.actionText
      ? `<button class="btn btn-primary" style="margin-top: 16px;" onclick="${options.onAction || ''}">${options.actionText}</button>`
      : '';

    return `
      <div class="empty-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center;">
        <div class="empty-state-icon" style="margin-bottom: 16px;">${preset.icon}</div>
        <div class="empty-state-title" style="font-size: 14px; font-weight: 500; color: var(--text-secondary); margin-bottom: 8px;">${title}</div>
        <div class="empty-state-description" style="font-size: 13px; color: var(--text-tertiary); max-width: 300px; line-height: 1.6;">${description}</div>
        ${actionHtml}
      </div>
    `;
  }
};

// ==================== 导出组件 ====================
window.Components = {
  Modal: ModalComponent,
  Form: FormComponents,
  Table: TableComponents,
  Select: SelectComponents,
  Empty: EmptyStates
};

console.log('[Components] 公共组件库加载完成 ✅');
