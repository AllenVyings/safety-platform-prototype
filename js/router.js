/**
 * 安全码综合管理平台 V5.0 - 路由管理
 * 负责模块页面的加载与切换
 */

class Router {
  constructor() {
    this.currentPortal = CONSTANTS.PORTAL.SUPER_ADMIN;
    this.currentModule = null;
    this.cache = new Map();
    this.history = [];
  }
  
  /**
   * 初始化路由
   */
  init() {
    console.log('[Router] 初始化...');
    
    // 渲染当前端的菜单
    this.renderMenu();
    
    // 绑定菜单点击事件
    const sideMenu = document.getElementById('side-menu');
    if (sideMenu) {
      sideMenu.addEventListener('click', (e) => {
        // 父菜单：展开/折叠（手风琴模式）
        const parentItem = e.target.closest('.menu-parent');
        if (parentItem) {
          const group = parentItem.closest('.menu-group');
          if (group) {
            const isExpanded = group.classList.contains('expanded');
            // 关闭其他展开的组
            document.querySelectorAll('.menu-group.expanded').forEach(g => {
              if (g !== group) g.classList.remove('expanded');
            });
            group.classList.toggle('expanded', !isExpanded);
          }
          return;
        }
        // 子菜单或普通菜单项：导航
        const menuItem = e.target.closest('.menu-item');
        if (menuItem && !menuItem.classList.contains('disabled') && menuItem.dataset.module) {
          const moduleId = menuItem.dataset.module;
          this.navigate(moduleId);
        }
      });
    }
    
    // 加载默认页面
    this.loadDefaultModule();
    
    console.log('[Router] 初始化完成 ✅');
  }
  
  /**
   * 渲染菜单
   */
  renderMenu() {
    const sideMenu = document.getElementById('side-menu');
    if (!sideMenu) {
      console.error('[Router] 未找到菜单容器');
      return;
    }
    
    // 企业端根据账号类型获取菜单，其他端直接获取
    let menuItems;
    if (this.currentPortal.startsWith('enterprise')) {
      const accountType = this.currentPortal === 'enterprise-project' ? 'project' : 'basic';
      menuItems = getEnterpriseMenu(accountType);
    } else {
      menuItems = getMenuConfig(this.currentPortal);
    }
    console.log(`[Router] 渲染菜单（${this.currentPortal}）：${menuItems.length} 项`);
    
    const html = menuItems.map(item => {
      if (item.type === 'section') {
        return `<div class="menu-section">${item.name}</div>`;
      }
      if (item.children) {
        const hasActive = item.children.some(c => c.id === this.currentModule);
        const childrenHtml = item.children.map(c => `
          <div class="menu-item menu-child ${c.disabled ? 'disabled' : ''} ${c.id === this.currentModule ? 'active' : ''}"
               data-module="${c.id}">
            <span class="name">${c.name}</span>
            ${c.badge ? `<span class="badge">${c.badge}</span>` : ''}
          </div>
        `).join('');
        return `
          <div class="menu-group ${hasActive ? 'expanded' : ''}">
            <div class="menu-item menu-parent" data-group="${item.id}">
              <span class="icon">${item.icon}</span>
              <span class="name">${item.name}</span>
              ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
              <span class="menu-arrow">▶</span>
            </div>
            <div class="menu-children">${childrenHtml}</div>
          </div>
        `;
      }
      return `
        <div class="menu-item ${item.disabled ? 'disabled' : ''} ${item.id === this.currentModule ? 'active' : ''}"
             data-module="${item.id}">
          <span class="icon">${item.icon}</span>
          <span class="name">${item.name}</span>
          ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
        </div>
      `;
    }).join('');
    
    sideMenu.innerHTML = html;
  }
  
  /**
   * 导航到指定模块
   */
  async navigate(moduleId) {
    let menuItem = getMenuItem(this.currentPortal, moduleId);
    // 企业端菜单项可能在不同配置中，尝试从企业端配置查找
    if (!menuItem && this.currentPortal.startsWith('enterprise')) {
      const accountType = this.currentPortal === 'enterprise-project' ? 'project' : 'basic';
      const enterpriseMenu = getEnterpriseMenu(accountType);
      for (const item of enterpriseMenu) {
        if (item.id === moduleId) { menuItem = item; break; }
        if (item.children) {
          const child = item.children.find(c => c.id === moduleId);
          if (child) { menuItem = child; break; }
        }
      }
    }
    if (!menuItem) {
      console.error(`[Router] 模块未找到：${moduleId}`);
      return;
    }
    
    console.log(`[Router] 导航到：${moduleId}`);
    
    try {
      // 更新菜单激活状态
      this.updateMenuActive(moduleId);

      // 更新顶级面包屑
      this.updateBreadcrumb(moduleId);

      // 加载模块页面
      await this.loadModule(menuItem);
      
      // 更新历史记录
      this.history.push({
        portal: this.currentPortal,
        module: moduleId,
        timestamp: Date.now()
      });
      
      this.currentModule = moduleId;
      
    } catch (error) {
      console.error('[Router] 模块加载失败:', error);
      this.showError('页面加载失败，请稍后重试');
    }
  }
  
  /**
   * 加载模块页面
   */
  async loadModule(menuItem) {
    const iframe = document.getElementById('module-frame');
    if (!iframe) {
      console.error('[Router] 未找到模块容器');
      return;
    }
    
    this.showLoading();
    
    try {
      const moduleUrl = menuItem.path.startsWith('/') ? menuItem.path : './' + menuItem.path;
      console.log(`[Router] 加载模块：${moduleUrl}`);

      // fetch HEAD 预检，防止 404 页面被 iframe 错误标记为加载成功
      const response = await fetch(moduleUrl, { method: 'HEAD', cache: 'no-cache' });
      if (!response.ok) {
        console.error(`[Router] 模块预检失败：${moduleUrl} (HTTP ${response.status})`);
        this.hideLoading();
        this.showError(`页面加载失败（HTTP ${response.status}），请稍后重试`);
        return;
      }

      iframe.onload = () => {
        console.log(`[Router] 模块加载成功：${moduleUrl}`);
        this.hideLoading();
      };
      iframe.onerror = () => {
        console.error('[Router] 模块加载失败');
        this.hideLoading();
        this.showError('页面加载失败，请稍后重试');
      };
      iframe.src = moduleUrl;

    } catch (error) {
      console.error('[Router] 模块加载失败:', error);
      this.hideLoading();
      this.showError('页面加载失败，请稍后重试');
    }
  }
  

  
  /**
   * 切换端
   */
  switchPortal(portal) {
    console.log(`[Router] 切换端：${this.currentPortal} -> ${portal}`);
    this.currentPortal = portal;
    this.currentModule = null;

    // 移动端特殊处理：显示手机模拟器，隐藏标准布局
    var isMobile = portal === 'mobile';
    var sideMenu = document.getElementById('side-menu');
    var contentArea = document.getElementById('content-area');
    var mobileViewer = document.getElementById('mobileViewer');

    if (isMobile) {
      if (sideMenu) sideMenu.style.display = 'none';
      if (contentArea) contentArea.style.display = 'none';
      if (mobileViewer) mobileViewer.style.display = 'flex';
      // 初始化移动端导航状态，确保Tab高亮、导航栏样式、信息面板与iframe内容一致
      if (typeof mobileNav === 'function') mobileNav('enterprise-code');
    } else {
      if (sideMenu) sideMenu.style.display = '';
      if (contentArea) contentArea.style.display = '';
      if (mobileViewer) mobileViewer.style.display = 'none';
      // 重新渲染菜单
      this.renderMenu();
      // 加载默认模块
      this.loadDefaultModule();
    }
  }
  
  /**
   * 加载默认模块
   */
  loadDefaultModule() {
    let menu;
    if (this.currentPortal.startsWith('enterprise')) {
      const accountType = this.currentPortal === 'enterprise-project' ? 'project' : 'basic';
      menu = getEnterpriseMenu(accountType);
    } else {
      menu = getMenuConfig(this.currentPortal);
    }
    const defaultItem = menu.find(item => !item.disabled);
    if (defaultItem) {
      this.navigate(defaultItem.id);
    }
  }
  
  /**
   * 更新菜单激活状态
   */
  updateMenuActive(moduleId) {
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.module === moduleId) {
        item.classList.add('active');
      }
    });
  }

  /**
   * 更新主框架顶级面包屑（深圳港 A 方案）
   * 适配多 portal：企业端动态映射 enterprise-basic / enterprise-project
   */
  updateBreadcrumb(moduleId) {
    const container = document.getElementById('breadcrumb');
    if (!container) return;

    // 企业端需要映射到具体的 menu 配置键
    let portalKey = this.currentPortal;
    if (this.currentPortal.startsWith('enterprise')) {
      portalKey = this.currentPortal === 'enterprise-project'
        ? 'enterprise-project'
        : 'enterprise-basic';
    }

    const items = (typeof getBreadcrumb === 'function')
      ? getBreadcrumb(portalKey, moduleId)
      : [];

    if (!items.length) {
      container.innerHTML = '<span class="breadcrumb-current">工作台</span>';
      return;
    }

    container.innerHTML = items.map((item, i) => {
      if (i === items.length - 1) {
        return `<span class="breadcrumb-current">${item.name}</span>`;
      }
      return `${item.name}<span>/</span>`;
    }).join('');
  }
  
  /**
   * 显示加载动画
   */
  showLoading() {
    const loading = document.getElementById('global-loading');
    if (loading) loading.classList.remove('hidden');
  }
  
  /**
   * 隐藏加载动画
   */
  hideLoading() {
    const loading = document.getElementById('global-loading');
    if (loading) loading.classList.add('hidden');
  }
  
  /**
   * 显示错误提示
   */
  showError(message) {
    alert(message);
  }
}

// 创建全局路由实例
const router = new Router();

// 监听 iframe 子页面通过 postMessage 主动更新面包屑（深圳港 A 方案）
// 用法：iframe 内 window.parent.postMessage({type:'setBreadcrumb', items:['菜单','子菜单','当前页']}, window.location.origin);
window.addEventListener('message', function(event) {
  if (event.origin !== window.location.origin) return;
  if (!event.data || event.data.type !== 'setBreadcrumb') return;
  const container = document.getElementById('breadcrumb');
  if (!container) return;
  const items = Array.isArray(event.data.items) ? event.data.items : [];
  if (!items.length) return;
  container.replaceChildren();
  items.forEach((name, i) => {
    const item = document.createElement('span');
    item.textContent = String(name);
    if (i === items.length - 1) {
      item.className = 'breadcrumb-current';
    }
    container.appendChild(item);
    if (i < items.length - 1) {
      const separator = document.createElement('span');
      separator.textContent = '/';
      container.appendChild(separator);
    }
  });
});