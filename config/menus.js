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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
      module: 'super-admin/workbench',
      path: 'modules/super-admin/workbench.html',
      description: '系统概览与快捷操作',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-gov-group',
      name: '政府单位管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7M19 21V7M9 21V11M15 21V11M3 7l9-4 9 4M3 7h18"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="7" y="11" width="3" height="3" rx="0.5"/><path d="M12 12.5h5"/><rect x="7" y="16" width="3" height="3" rx="0.5"/><path d="M12 17.5h5"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><path d="M12 4l1.8 3.6 4 .6-2.9 2.8.7 4L12 13.3 8.4 15l.7-4-2.9-2.8 4-.6z"/></svg>',
      module: 'super-admin/key-place',
      path: 'modules/super-admin/key-place.html?v=20260625-layout',
      description: '重点场所信息管理',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-domain-manage',
      name: '领域小类管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><circle cx="15" cy="14" r="2.5"/><path d="M15 10v1.5M15 16.5V18M10.5 14H12M18 14h1.5M11.5 10.5l1 1M17.5 16.5l1 1M18.5 10.5l-1 1M12.5 16.5l-1 1"/></svg>',
      module: 'super-admin/domain-manage',
      path: 'modules/super-admin/domain-manage.html?v=20260625-special-preset',
      description: '配置领域小类与监管单位',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-checklist-lib',
      name: '检查库管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="18" rx="2"/><path d="M8 2h8v4H8z"/><path d="M8 11h8"/><path d="M8 15h8"/><path d="M8 19h5"/></svg>',
      module: 'super-admin/checklist-lib',
      path: 'modules/super-admin/checklist-lib.html',
      description: '检查表模板管理',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-hazard-lib',
      name: '隐患库管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
      module: 'super-admin/hazard-lib',
      path: 'modules/super-admin/hazard-lib.html',
      description: '隐患类型、级别与整改期限配置',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-regulation-lib',
      name: '法规库管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 10h6"/><path d="M10 14h4"/></svg>',
      module: 'super-admin/regulation-lib',
      path: 'modules/super-admin/regulation-lib.html',
      description: '法规文件增删改查与条款管理',
      badge: null,
      disabled: false
    },
    {
      id: 'sa-system-config',
      name: '系统配置',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
      module: 'government/workbench',
      path: 'modules/government/workbench.html',
      description: '辖区安全监管核心数据概览（含统计分析）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-ent-manage',
      name: '企业基本信息',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/></svg>',
      module: 'government/ent-manage',
      path: 'modules/government/ent-manage.html',
      description: '辖区企业基本信息管理（含审批列表）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-project-manage',
      name: '项目信息管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="7" y="11" width="3" height="3" rx="0.5"/><path d="M12 12.5h5"/><rect x="7" y="16" width="3" height="3" rx="0.5"/><path d="M12 17.5h5"/></svg>',
      module: 'government/project-manage',
      path: 'modules/government/project-manage.html',
      description: '辖区项目信息管理（含审批列表）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-key-place',
      name: '重点场所管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><path d="M12 4l1.8 3.6 4 .6-2.9 2.8.7 4L12 13.3 8.4 15l.7-4-2.9-2.8 4-.6z"/></svg>',
      module: 'government/key-place',
      path: 'modules/government/key-place.html',
      description: '重点场所信息与管理（含审批列表）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-domain-supervise',
      name: '领域监管',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><circle cx="12" cy="10" r="4"/><path d="M12 6v8M8 10h8"/><path d="M12 10l3-2-1 4z" fill="currentColor" stroke="none"/></svg>',
      module: 'government/domain-supervise',
      path: 'modules/government/domain-supervise.html',
      description: '监管总览、任务配置、进度监督',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-duty-supervise',
      name: '履职管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      module: 'government/duty-supervise',
      path: 'modules/government/duty-supervise.html',
      description: '科室履职进度监督与催办督办',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-check-task',
      name: '检查管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14l2 2 4-4"/></svg>',
      module: 'government/check-task',
      path: 'modules/government/check-task.html',
      description: '履职任务与专项任务管理',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-hazard-manage',
      name: '隐患管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      module: 'government/hazard-manage',
      path: 'modules/government/hazard-manage.html',
      description: '隐患全生命周期跟踪',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-control-archive',
      name: '管控档案',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="7" y="11" width="3" height="3" rx="0.5"/><path d="M12 12.5h5"/><rect x="7" y="16" width="3" height="3" rx="0.5"/><path d="M12 17.5h5"/></svg>',
      module: 'government/control-archive',
      path: 'modules/government/control-archive.html',
      description: '辖区管控对象全量查阅（只读）',
      badge: null,
      disabled: false
    },
    {
      id: 'gov-org-group',
      name: '政府单位管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7M19 21V7M9 21V11M15 21V11M3 7l9-4 9 4M3 7h18"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0-6 6v5l-2 2h16l-2-2V9a6 6 0 0 0-6-6z"/><path d="M10 1h4"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="7" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="17" r="2"/></svg>',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
      module: 'enterprise/workbench',
      path: 'modules/enterprise/workbench.html',
      description: '企业安全概览',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-info',
      name: '企业基本信息',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/></svg>',
      module: 'enterprise/ent-info',
      path: 'modules/enterprise/ent-info.html',
      description: '企业信息与监管单位',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-org',
      name: '企业组织架构管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v4"/><path d="M5 17v-3h14v3"/><path d="M12 14v3"/></svg>',
      module: 'enterprise/ent-org',
      path: 'modules/enterprise/ent-org.html',
      description: '企业部门与组织架构管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-user',
      name: '企业用户管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="3"/><path d="M21 21v-2a3 3 0 0 0-2-2.83"/></svg>',
      module: 'enterprise/ent-user',
      path: 'modules/enterprise/ent-user.html',
      description: '企业人员账号管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-hazard-list',
      name: '安全管控对象管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
      module: 'enterprise/hazard-list',
      path: 'modules/enterprise/hazard-list.html',
      description: '危险源、场所、设备管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-check-records',
      name: '检查记录管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14l2 2 4-4"/></svg>',
      module: 'enterprise/check-records',
      path: 'modules/enterprise/check-records.html',
      description: '自查与巡查记录',
      badge: '开发中',
      disabled: true
    },
    {
      id: 'ent-hazard-fix',
      name: '隐患整改管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      module: 'enterprise/hazard-fix',
      path: 'modules/enterprise/hazard-fix.html',
      description: '隐患整改与反馈',
      badge: '开发中',
      disabled: true
    },
    {
      id: 'ent-project-info',
      name: '项目信息管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="7" y="11" width="3" height="3" rx="0.5"/><path d="M12 12.5h5"/><rect x="7" y="16" width="3" height="3" rx="0.5"/><path d="M12 17.5h5"/></svg>',
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
      path: 'modules/mobile/enterprise-code.html?v=20260818b',
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
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
      module: 'enterprise/project-workbench',
      path: 'modules/enterprise/project-workbench.html',
      description: '项目视角工作台',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-project-info',
      name: '项目基本信息',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="7" y="11" width="3" height="3" rx="0.5"/><path d="M12 12.5h5"/><rect x="7" y="16" width="3" height="3" rx="0.5"/><path d="M12 17.5h5"/></svg>',
      module: 'enterprise/project-info',
      path: 'modules/enterprise/project-info.html',
      description: '项目信息维护',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-project-org',
      name: '项目组织架构管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v4"/><path d="M5 17v-3h14v3"/><path d="M12 14v3"/></svg>',
      module: 'enterprise/project-org',
      path: 'modules/enterprise/project-org.html',
      description: '项目组织架构查看',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-project-user',
      name: '项目用户管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="3"/><path d="M21 21v-2a3 3 0 0 0-2-2.83"/></svg>',
      module: 'enterprise/project-user',
      path: 'modules/enterprise/project-user.html',
      description: '项目人员账号管理',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-hazard-list',
      name: '安全管控对象管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
      module: 'enterprise/safety-control-object',
      path: 'modules/enterprise/safety-control-object.html',
      description: '项目码+区域+场所+危险源四级管控',
      badge: null,
      disabled: false
    },
    {
      id: 'ent-check-records',
      name: '检查记录管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14l2 2 4-4"/></svg>',
      module: 'enterprise/check-records',
      path: 'modules/enterprise/check-records.html',
      description: '自查与巡查记录',
      badge: '开发中',
      disabled: true
    },
    {
      id: 'ent-hazard-fix',
      name: '隐患整改管理',
      icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
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
