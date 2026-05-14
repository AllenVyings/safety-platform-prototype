/**
 * 安全码综合管理平台 V5.0 - 应用主逻辑
 */

const App = {
  /**
   * 应用初始化
   */
  init() {
    console.log(`[App] ${CONSTANTS.APP_NAME} V${CONSTANTS.APP_VERSION} 初始化...`);
    
    // 绑定门户切换事件
    this.bindPortalTabs();
    
    // 初始化路由
    router.init();
    
    // 初始化公共组件
    if (window.Modal) {
      Modal.init();
    }
    
    console.log('[App] 初始化完成 ✅');
  },
  
  /**
   * 绑定门户切换事件
   */
  bindPortalTabs() {
    const tabs = document.querySelectorAll('.portal-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const portal = tab.dataset.portal;
        if (portal && portal !== router.currentPortal) {
          // 更新 Tab 激活状态
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          // 切换端
          router.switchPortal(portal);
        }
      });
    });
  },
  
  /**
   * 获取当前端
   */
  getCurrentPortal() {
    return router.currentPortal;
  },
  
  /**
   * 获取当前模块
   */
  getCurrentModule() {
    return router.currentModule;
  }
};

// DOM 加载完成后初始化应用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
