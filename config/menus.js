/**
 * 安全码综合管理平台 V5.0 - 菜单配置
 * 三端菜单配置，新增菜单只需在此添加
 */

const MENU_CONFIG = {
  // ========== 超管端菜单 ==========
  'super-admin': [
    {
      id: 'sa-workbench',
      name: '安全态势',
      icon: '🛡️',
      module: 'super-admin/workbench',
      path: 'modules/super-admin/workbench.html',
      description: '系统概览与快捷操作',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-gov-group',
      name: '政府单位管理',
      icon: '🏛️',
      children: [
        {
          id: 'sa-gov-org',
          name: '组织架构管理',
          module: 'super-admin/gov-org',
          path: 'modules/super-admin/gov-org.html',
          description: '管理政府组织架构与人员',
          badge: null,
          disabled: false
        },
        {
          id: 'sa-gov-user',
          name: '人员账号管理',
          module: 'super-admin/gov-user',
          path: 'modules/super-admin/gov-user.html',
          description: '政府端用户账号管理',
          badge: null,
          disabled: false
        }
      ]
    },
    {
      id: 'sa-ent-group',
      name: '企业信息管理',
      icon: '🏢',
      children: [
        {
          id: 'sa-ent-manage',
          name: '企业基本信息',
          module: 'super-admin/ent-manage',
          path: 'modules/super-admin/ent-manage.html',
          description: '企业基本信息管理、审核、账号管理',
          badge: null,
          disabled: false
        },
        {
          id: 'sa-ent-user',
          name: '企业用户管理',
          module: 'super-admin/ent-user',
          path: 'modules/super-admin/ent-user.html',
          description: '企业端用户账号管理',
          badge: null,
          disabled: false
        }
      ]
    },
    {
      id: 'sa-project-group',
      name: '项目管理',
      icon: '📁',
      children: [
        {
          id: 'sa-project-manage',
          name: '项目信息管理',
          module: 'super-admin/project-manage',
          path: 'modules/super-admin/project-manage.html',
          description: '项目信息增删改查与账号管理',
          badge: null,
          disabled: false
        }
      ]
    },
    {
      id: 'sa-key-place',
      name: '重点场所管理',
      icon: '📍',
      module: 'super-admin/key-place',
      path: 'modules/super-admin/key-place.html?v=20260625-layout',
      description: '重点场所信息管理',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-domain-manage',
      name: '领域小类管理',
      icon: '🏷️',
      module: 'super-admin/domain-manage',
      path: 'modules/super-admin/domain-manage.html?v=20260625-special-preset',
      description: '配置领域小类与监管单位',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-checklist-lib',
      name: '检查库管理',
      icon: '📋',
      module: 'super-admin/checklist-lib',
      path: 'modules/super-admin/checklist-lib.html',
      description: '检查表模板管理',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-hazard-lib',
      name: '隐患库管理',
      icon: '⚠️',
      module: 'super-admin/hazard-lib',
      path: 'modules/super-admin/hazard-lib.html',
      description: '隐患类型、级别与整改期限配置',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-regulation-lib',
      name: '法规库管理',
      icon: '📜',
      module: 'super-admin/regulation-lib',
      path: 'modules/super-admin/regulation-lib.html',
      description: '法规文件增删改查与条款管理',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-system-config',
      name: '系统配置',
      icon: '⚙️',
      children: [
        {
          id: 'sa-role-manage',
          name: '角色管理',
          module: 'super-admin/role-permission',
          path: 'modules/super-admin/role-permission.html',
          description: '平台角色定义与权限配置',
          badge: null,
          disabled: false
        },
        {
          id: 'sa-menu-manage',
          name: '菜单管理',
          module: 'super-admin/menu-manage',
          path: 'modules/super-admin/menu-manage.html',
          description: '系统菜单与按钮权限配置',
          badge: '待开发',
          disabled: true
        },
        {
          id: 'sa-position-manage',
          name: '职务管理',
          module: 'super-admin/position-manage',
          path: 'modules/super-admin/position-manage.html',
          description: '全局职务配置，支持场景隔离与单位类型联动',
          badge: null,
          disabled: false
        },
        {
          id: 'sa-dict-manage',
          name: '字典管理',
          module: 'super-admin/dict-manage',
          path: 'modules/super-admin/dict-manage.html',
          description: '数据字典分类与字典项维护',
          badge: '待开发',
          disabled: true
        },
        {
          id: 'sa-param-setting',
          name: '参数设置',
          module: 'super-admin/param-setting',
          path: 'modules/super-admin/param-setting.html',
          description: '系统级参数配置',
          badge: '待开发',
          disabled: true
        },
        {
          id: 'sa-calendar-manage',
          name: '日历管理',
          module: 'super-admin/calendar-manage',
          path: 'modules/super-admin/calendar-manage.html',
          description: '年度节假日与工作日方案管理',
          badge: '待开发',
          disabled: true
        },
        {
          id: 'sa-operation-log',
          name: '操作日志',
          module: 'super-admin/operation-log',
          path: 'modules/super-admin/operation-log.html',
          description: '系统操作行为审计日志',
          badge: '待开发',
          disabled: true
        },
        {
          id: 'sa-login-log',
          name: '登录日志',
          module: 'super-admin/login-log',
          path: 'modules/super-admin/login-log.html',
          description: '登录行为日志与在线用户管理',
          badge: '待开发',
          disabled: true
        },
        {
          id: 'sa-area-manage',
          name: '区域管理',
          module: 'super-admin/area-manage',
          path: 'modules/super-admin/area-manage.html',
          description: '行政区划数据源管理（区/街道/社区/网格）',
          badge: null,
          disabled: false
        }
      ]
    },
  ],
  
  // ========== 政府端菜单（V7.0 重构） ==========
  'government': [
    {
      id: 'gov-workbench',
      name: '安全态势',
      icon: '📊',
      module: 'government/workbench',
      path: 'modules/government/workbench.html',
      description: '辖区安全监管核心数据概览（含统计分析）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-ent-manage',
      name: '企业基本信息',
      icon: '🏢',
      module: 'government/ent-manage',
      path: 'modules/government/ent-manage.html',
      description: '辖区企业基本信息管理（含审批列表）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-project-manage',
      name: '项目信息管理',
      icon: '🏗️',
      module: 'government/project-manage',
      path: 'modules/government/project-manage.html',
      description: '辖区项目信息管理（含审批列表）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-key-place',
      name: '重点场所管理',
      icon: '🏭',
      module: 'government/key-place',
      path: 'modules/government/key-place.html',
      description: '重点场所信息与管理（含审批列表）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-domain-supervise',
      name: '领域监管',
      icon: '🎯',
      module: 'government/domain-supervise',
      path: 'modules/government/domain-supervise.html',
      description: '监管总览、任务配置、进度监督',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-duty-supervise',
      name: '履职管理',
      icon: '👁️',
      module: 'government/duty-supervise',
      path: 'modules/government/duty-supervise.html',
      description: '科室履职进度监督与催办督办',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-check-task',
      name: '检查管理',
      icon: '📋',
      module: 'government/check-task',
      path: 'modules/government/check-task.html',
      description: '履职任务与专项任务管理',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-hazard-manage',
      name: '隐患管理',
      icon: '⚠️',
      module: 'government/hazard-manage',
      path: 'modules/government/hazard-manage.html',
      description: '隐患全生命周期跟踪',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-control-archive',
      name: '管控档案',
      icon: '📁',
      module: 'government/control-archive',
      path: 'modules/government/control-archive.html',
      description: '辖区管控对象全量查阅（只读）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-org-group',
      name: '政府单位管理',
      icon: '🏛️',
      children: [
        {
          id: 'gov-org-manage',
          name: '组织架构管理',
          module: 'government/gov-org',
          path: 'modules/government/gov-org.html',
          description: '本单位及下级科室组织架构管理',
          badge: null,
          disabled: false
        },
        {
          id: 'gov-user-manage',
          name: '人员账号管理',
          module: 'government/gov-user',
          path: 'modules/government/gov-user.html',
          description: '本单位及下级科室人员账号管理',
          badge: null,
          disabled: false
        }
      ]
    },
    {
      id: 'gov-emergency-group',
      name: '应急资源',
      icon: '🚨',
      children: [
        {
          id: 'gov-emergency-plan',
          name: '应急预案',
          module: 'government/emergency-plan',
          path: 'modules/government/emergency-plan.html',
          description: '应急预案管理与评审',
          badge: null,
          disabled: false
        },
        {
          id: 'gov-emergency-supply',
          name: '应急物资',
          module: 'government/emergency-supply',
          path: 'modules/government/emergency-supply.html',
          description: '应急物资库存与有效期管理',
          badge: null,
          disabled: false
        },
        {
          id: 'gov-emergency-team',
          name: '应急队伍',
          module: 'government/emergency-team',
          path: 'modules/government/emergency-team.html',
          description: '应急救援队伍管理',
          badge: null,
          disabled: false
        },
        {
          id: 'gov-emergency-contact',
          name: '联络通讯',
          module: 'government/emergency-contact',
          path: 'modules/government/emergency-contact.html',
          description: '应急联络通讯录管理',
          badge: null,
          disabled: false
        }
      ]
    },
    {
      id: 'gov-persuade',
      name: '劝导路口',
      icon: '🚧',
      module: 'government/persuade',
      path: 'modules/government/persuade.html',
      description: '农村/社区交通安全劝导站管理',
      badge: '待设计',
      disabled: true
    }
  ],
  
  // ========== 企业端菜单 - 基础模式 ==========
  'enterprise-basic': [
    {
      id: 'ent-workbench',
      name: '工作台',
      icon: '📊',
      module: 'enterprise/workbench',
      path: 'modules/enterprise/workbench.html',
      description: '企业安全概览',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-info',
      name: '企业基本信息',
      icon: '🏢',
      module: 'enterprise/ent-info',
      path: 'modules/enterprise/ent-info.html',
      description: '企业信息与监管单位',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-org',
      name: '企业组织架构管理',
      icon: '🏛️',
      module: 'enterprise/ent-org',
      path: 'modules/enterprise/ent-org.html',
      description: '企业部门与组织架构管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-user',
      name: '企业用户管理',
      icon: '👥',
      module: 'enterprise/ent-user',
      path: 'modules/enterprise/ent-user.html',
      description: '企业人员账号管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-hazard-list',
      name: '安全管控对象管理',
      icon: '📋',
      module: 'enterprise/hazard-list',
      path: 'modules/enterprise/hazard-list.html',
      description: '危险源、场所、设备管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-check-records',
      name: '检查记录管理',
      icon: '📝',
      module: 'enterprise/check-records',
      path: 'modules/enterprise/check-records.html',
      description: '自查与巡查记录',
      badge: '开发中',
      disabled: true
    },
    {
      id: 'ent-hazard-fix',
      name: '隐患整改管理',
      icon: '🔧',
      module: 'enterprise/hazard-fix',
      path: 'modules/enterprise/hazard-fix.html',
      description: '隐患整改与反馈',
      badge: '开发中',
      disabled: true
    },
    {
      id: 'ent-project-info',
      name: '项目信息管理',
      icon: '🏗️',
      module: 'enterprise/project-info',
      path: 'modules/enterprise/project-info.html',
      description: '项目信息查看（只读）',
      badge: null,
      disabled: false
    }
  ],

  // ========== 移动端-企业侧菜单 ==========
  'mobile': [
    {
      id: 'mobile-enterprise-code',
      name: '企业码首页',
      icon: '🏠',
      module: 'mobile/enterprise-code',
      path: 'modules/mobile/enterprise-code.html',
      description: '企业码首页-安全态势总览',
      badge: null,
      disabled: false
    },
    {
      id: 'mobile-code-group',
      name: '码首页',
      icon: '📱',
      children: [
        {
          id: 'mobile-place-code',
          name: '场所码首页',
          module: 'mobile/place-code',
          path: 'modules/mobile/place-code.html',
          description: '场所码首页',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-hazard-code',
          name: '危险源码首页',
          module: 'mobile/hazard-code',
          path: 'modules/mobile/hazard-code.html',
          description: '危险源码首页',
          badge: null,
          disabled: false
        }
      ]
    },
    {
      id: 'mobile-control-list',
      name: '管控列表',
      icon: '📋',
      module: 'mobile/control-list',
      path: 'modules/mobile/control-list.html',
      description: '风险列表+人员列表',
      badge: null,
      disabled: false
    },
    {
      id: 'mobile-workbench',
      name: '工作台',
      icon: '⚡',
      module: 'mobile/workbench',
      path: 'modules/mobile/workbench.html',
      description: '检查统计+隐患统计+知识库',
      badge: null,
      disabled: false
    },
    {
      id: 'mobile-task-list',
      name: '任务管理',
      icon: '📌',
      module: 'mobile/task-list',
      path: 'modules/mobile/task-list.html',
      description: '任务列表与处理',
      badge: null,
      disabled: false
    },
    {
      id: 'mobile-profile',
      name: '我的中心',
      icon: '👤',
      module: 'mobile/profile',
      path: 'modules/mobile/profile.html',
      description: '个人画像+动态码+设置',
      badge: null,
      disabled: false
    },
    {
      id: 'mobile-secondary-group',
      name: '二级页面',
      icon: '📑',
      children: [
        {
          id: 'mobile-check-execute',
          name: '码上排查执行',
          module: 'mobile/check-execute',
          path: 'modules/mobile/check-execute.html',
          description: '检查表填写与签名',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-hazard-detail',
          name: '隐患详情',
          module: 'mobile/hazard-detail',
          path: 'modules/mobile/hazard-detail.html',
          description: '隐患详情与整改',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-check-detail',
          name: '检查详情',
          module: 'mobile/check-detail',
          path: 'modules/mobile/check-detail.html',
          description: '检查记录详情',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-code-change',
          name: '变码记录',
          module: 'mobile/code-change',
          path: 'modules/mobile/code-change.html',
          description: '码色变更记录',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-scan',
          name: '扫一扫',
          module: 'mobile/scan',
          path: 'modules/mobile/scan.html',
          description: '扫码识别',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-login',
          name: '登录页',
          module: 'mobile/login',
          path: 'modules/mobile/login.html',
          description: '登录注册',
          badge: null,
          disabled: false
        },
        {
          id: 'mobile-settings',
          name: '设置',
          module: 'mobile/settings',
          path: 'modules/mobile/settings.html',
          description: '账号切换、扫码、码变更记录、清除缓存',
          badge: null,
          disabled: false
        }
      ]
    }
  ],

  // ========== 企业端菜单 - 项目模式（项目账号登录） ==========
  'enterprise-project': [
    {
      id: 'ent-project-workbench',
      name: '工作台',
      icon: '📊',
      module: 'enterprise/project-workbench',
      path: 'modules/enterprise/project-workbench.html',
      description: '项目视角工作台',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-project-info',
      name: '项目基本信息',
      icon: '🏗️',
      module: 'enterprise/project-info',
      path: 'modules/enterprise/project-info.html',
      description: '项目信息维护',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-project-org',
      name: '项目组织架构管理',
      icon: '🏛️',
      module: 'enterprise/project-org',
      path: 'modules/enterprise/project-org.html',
      description: '项目组织架构查看',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-project-user',
      name: '项目用户管理',
      icon: '👥',
      module: 'enterprise/project-user',
      path: 'modules/enterprise/project-user.html',
      description: '项目人员账号管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-hazard-list',
      name: '安全管控对象管理',
      icon: '📋',
      module: 'enterprise/safety-control-object',
      path: 'modules/enterprise/safety-control-object.html',
      description: '项目码+区域+场所+危险源四级管控',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-check-records',
      name: '检查记录管理',
      icon: '📝',
      module: 'enterprise/check-records',
      path: 'modules/enterprise/check-records.html',
      description: '自查与巡查记录',
      badge: '开发中',
      disabled: true
    },
    {
      id: 'ent-hazard-fix',
      name: '隐患整改管理',
      icon: '🔧',
      module: 'enterprise/hazard-fix',
      path: 'modules/enterprise/hazard-fix.html',
      description: '隐患整改与反馈',
      badge: '开发中',
      disabled: true
    }
  ]
};

/**
 * 获取指定端的菜单配置
 * @param {string} portal - 端标识: super-admin | government | enterprise-basic | enterprise-basic-project | enterprise-project
 * @returns {Array} 菜单配置数组
 */
function getMenuConfig(portal) {
  return MENU_CONFIG[portal] || [];
}

/**
 * 获取企业端菜单（根据账号类型自动返回对应菜单）
 * @param {string} accountType - 账号类型: basic | basic-project | project
 * @returns {Array} 菜单配置数组
 */
function getEnterpriseMenu(accountType) {
  const menuMap = {
    'basic': 'enterprise-basic',
    'project': 'enterprise-project'
  };
  return MENU_CONFIG[menuMap[accountType]] || MENU_CONFIG['enterprise-basic'] || [];
}

/**
 * 获取菜单项配置
 * @param {string} portal - 端标识
 * @param {string} menuId - 菜单 ID
 * @returns {Object|null} 菜单项配置
 */
function getMenuItem(portal, menuId) {
  const menu = getMenuConfig(portal);
  for (const item of menu) {
    if (item.id === menuId) return item;
    if (item.children) {
      const child = item.children.find(c => c.id === menuId);
      if (child) return child;
    }
  }
  return null;
}

/**
 * 根据 module 路径反查菜单项（用于 iframe 直接加载 module 时同步面包屑）
 * @param {string} portal
 * @param {string} module - 形如 'government/task-config'
 * @returns {Array<{name:string}>} 面包屑数组
 */
function getBreadcrumbByModule(portal, module) {
  const menu = getMenuConfig(portal);
  for (const item of menu) {
    if (item.module === module) return [{ name: item.name }];
    if (item.children) {
      for (const child of item.children) {
        if (child.module === module) return [{ name: item.name }, { name: child.name }];
      }
    }
  }
  return [];
}

/**
 * 根据菜单 ID 生成面包屑（含父菜单层级）
 * @param {string} portal - 端标识
 * @param {string} menuId - 菜单 ID
 * @returns {Array<{name:string}>} 面包屑数组，最后一项为当前页
 */
function getBreadcrumb(portal, menuId) {
  const menu = getMenuConfig(portal);
  for (const item of menu) {
    if (item.id === menuId) return [{ name: item.name }];
    if (item.children) {
      for (const child of item.children) {
        if (child.id === menuId) return [{ name: item.name }, { name: child.name }];
      }
    }
  }
  return [];
}
