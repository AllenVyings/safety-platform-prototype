/**
 * 安全码综合管理平台 V5.0 - 工具函数
 */

const Utils = {
  /**
   * 格式化日期
   */
  formatDate(date, format = 'YYYY-MM-DD HH:mm') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes);
  },
  
  /**
   * 格式化数字（千分位）
   */
  formatNumber(num) {
    if (num === null || num === undefined) return '';
    return Number(num).toLocaleString();
  },
  
  /**
   * 状态文本转换
   */
  getStatusText(status) {
    const map = {
      'enabled': '启用',
      'disabled': '停用',
      'pending': '待审核',
      'completed': '已完成',
      'processing': '处理中',
      'cancelled': '已取消'
    };
    return map[status] || status;
  },
  
  /**
   * 状态样式类
   */
  getStatusClass(status) {
    const map = {
      'enabled': 'badge-success',
      'disabled': 'badge-danger',
      'pending': 'badge-warning',
      'completed': 'badge-success',
      'processing': 'badge-info',
      'cancelled': 'badge-danger'
    };
    return map[status] || 'badge-info';
  },
  
  /**
   * HTML 转义
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
  
  /**
   * 防抖函数
   */
  debounce(fn, delay = 300) {
    let timer = null;
    return function(...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  /**
   * 节流函数
   */
  throttle(fn, delay = 300) {
    let lastTime = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  },
  
  /**
   * 深拷贝
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => this.deepClone(item));
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, this.deepClone(value)])
    );
  },
  
  /**
   * 生成唯一 ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  
  /**
   * 本地存储封装
   */
  storage: {
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Storage get error:', e);
        return null;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Storage set error:', e);
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Storage remove error:', e);
        return false;
      }
    }
  }
};
