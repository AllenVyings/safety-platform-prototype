/**
 * 安全码综合管理平台 V5.0 - 常量配置
 */

const CONSTANTS = {
  // 应用信息
  APP_NAME: '安全码综合管理平台',
  APP_VERSION: '5.0.0',
  
  // API 基础路径（原型阶段使用模拟数据）
  API_BASE: '/api',
  
  // 端标识
  PORTAL: {
    SUPER_ADMIN: 'super-admin',
    GOVERNMENT: 'government',
    ENTERPRISE: 'enterprise'
  },
  
  // 状态枚举
  STATUS: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending'
  },
  
  // 弹窗尺寸
  MODAL_SIZE: {
    SM: 400,
    MD: 520,
    LG: 640,
    XL: 720,
    FULL: 800
  },
  
  // 分页配置
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
  },
  
  // 缓存配置
  CACHE: {
    ENABLED: true,
    EXPIRY_MS: 5 * 60 * 1000  // 5 分钟
  }
};
