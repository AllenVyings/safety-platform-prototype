/**
 * MobilePageConfig — 移动端页面差异化配置
 * 版本：V1.2（对应移动端原型重构方案 V1.2）
 *
 * 职责：
 * 1. 为各页面提供根据 portalType / mode / activeDomainId 渲染所需的配置数据
 * 2. 集中管理模拟数据（原型阶段无后端）
 * 3. 供 enterprise-code.html / control-list.html / profile.html / workbench.html 等页面使用
 *
 * 使用方式：
 *   var config = MobilePageConfig.getHomeConfig();
 *   var listConfig = MobilePageConfig.getListConfig();
 */

'use strict';

var MobilePageConfig = (function() {

  /* ========== 工具方法 ========== */

  /**
   * 获取当前会话信息（封装 MobileSession API）
   * @returns {object} { portalType, mode, identity, session }
   */
  function _getContext() {
    var session = (typeof MobileSession !== 'undefined') ? MobileSession.get() : null;
    if (!session) {
      return { portalType: null, mode: null, identity: null, session: null };
    }
    var portalType = session.portalType;
    var identity = null;
    var mode = null;
    if (portalType === 'ent') {
      identity = MobileSession.getActiveIdentity ? MobileSession.getActiveIdentity() : null;
      // 原型演示：强制使用设计稿企业名称
      if (identity) identity.entName = '深圳市天道医药有限公司';
      mode = identity ? identity.mode : null;
    } else if (portalType === 'gov') {
      mode = 'gov';
    }
    return { portalType: portalType, mode: mode, identity: identity, session: session };
  }

  /**
   * 根据领域 ID 查找领域数据
   * @param {string} domainId
   * @returns {object|null}
   */
  function _findDomain(domainId) {
    if (typeof DOMAIN_TABLE_DATA === 'undefined') return null;
    return DOMAIN_TABLE_DATA.find(function(d) { return d.id === domainId; }) || null;
  }

  /* ========== 首页(enterprise-code.html)配置 ========== */

  /**
   * 码类型标签映射
   */
  var CODE_TYPE_LABELS = {
    gov: '监管码',
    basic: '企业码',
    project: '项目码',
    special: '场所码',
    other: '管理码'
  };

  /**
   * 码类型边框颜色映射
   */
  var CODE_BORDER_COLORS = {
    gov: 'var(--wc-code-border-green)',
    basic: 'var(--wc-code-border-green)',
    project: 'var(--wc-code-border-blue, #1068ff)',
    special: 'var(--wc-code-border-orange, #fa8c16)',
    other: 'var(--wc-code-border-green)'
  };

  /**
   * 页面背景渐变配色
   */
  var PAGE_GRADIENTS = {
    gov: 'linear-gradient(180deg, #1068ff 0%, #3d86ff 30%, #5a9aff 50%, #70a4fd 70%, #b8d4fe 85%, var(--wc-page-bg) 100%)',
    ent_basic: 'linear-gradient(180deg, #1068ff 0%, #3d86ff 30%, #5a9aff 50%, #70a4fd 70%, #b8d4fe 85%, var(--wc-page-bg) 100%)',
    ent_project: 'linear-gradient(180deg, #722ed1 0%, #9254de 30%, #b37feb 50%, #d3adf7 70%, #efdbff 85%, var(--wc-page-bg) 100%)',
    ent_special: 'linear-gradient(180deg, #fa8c16 0%, #ffa940 30%, #ffc069 50%, #ffd591 70%, #fff7e6 85%, var(--wc-page-bg) 100%)',
    ent_other: 'linear-gradient(180deg, #13c2c2 0%, #36cfc9 30%, #5cdbd3 50%, #87e8de 70%, #e6fffb 85%, var(--wc-page-bg) 100%)'
  };

  /**
   * 首页统计数据（模拟）
   */
  var HOME_STATS = {
    gov: {
      title: '辖区监管概况',
      total: 156, green: 120, yellow: 24, red: 12,
      greenPct: '77%'
    },
    basic: {
      title: '安全管控',
      total: 7, green: 5, yellow: 1, red: 1,
      greenPct: '71%'
    },
    project: {
      title: '项目安全管控',
      total: 12, green: 9, yellow: 2, red: 1,
      greenPct: '75%'
    },
    special: {
      title: '场所安全管控',
      total: 3, green: 2, yellow: 1, red: 0,
      greenPct: '67%'
    },
    other: {
      title: '管控概况',
      total: 5, green: 4, yellow: 1, red: 0,
      greenPct: '80%'
    }
  };

  /**
   * 首页快捷入口（按 mode 差异化）
   */
  var HOME_QUICK_ACTIONS = {
    gov: [
      { icon: '📊', label: '监管统计', color: 'blue' },
      { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
      { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
      { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
    ],
    basic: [
      { icon: '📊', label: '基本信息', color: 'blue' },
      { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
      { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
      { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
    ],
    project: [
      { icon: '📊', label: '项目信息', color: 'blue' },
      { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
      { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
      { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
    ],
    special: [
      { icon: '📊', label: '场所信息', color: 'blue' },
      { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
      { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
      { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
    ],
    other: [
      { icon: '📊', label: '基本信息', color: 'blue' },
      { icon: '🔎', label: '巡查记录', color: 'orange', nav: 'check-list' },
      { icon: '⚠️', label: '问题记录', color: 'green', nav: 'hazard-stats' },
      { icon: '📄', label: '劝导记录', color: 'purple', nav: 'inspection-stats' }
    ]
  };

  /**
   * 获取首页完整配置
   * @returns {object}
   */
  function getHomeConfig() {
    var ctx = _getContext();
    var mode = ctx.mode || 'basic';
    var statsKey = mode === 'gov' ? 'gov' : mode;
    var stats = HOME_STATS[statsKey] || HOME_STATS.basic;
    var quickActions = HOME_QUICK_ACTIONS[statsKey] || HOME_QUICK_ACTIONS.basic;

    // 主体名称
    var entityName = '';
    if (ctx.portalType === 'gov') {
      entityName = ctx.session ? (ctx.session.govOrgName || '监管单位') : '监管单位';
    } else if (ctx.identity) {
      entityName = ctx.identity.entName || ctx.identity.name || '管控对象';
    } else {
      entityName = '管控对象';
    }

    // 码类型标签
    var codeTypeLabel = CODE_TYPE_LABELS[mode] || '安全码';

    // 背景渐变
    var gradientKey = ctx.portalType === 'gov' ? 'gov' : ('ent_' + mode);
    var gradient = PAGE_GRADIENTS[gradientKey] || PAGE_GRADIENTS.ent_basic;

    // 边框颜色
    var borderColor = CODE_BORDER_COLORS[mode] || CODE_BORDER_COLORS.basic;

    // 主Tab面板标题（按模式区分）
    var mainTabLabels = {
      gov: ['监管概况', '巡查统计', '隐患统计'],
      basic: ['安全管控', '人员履职', '隐患统计'],
      project: ['项目管控', '人员履职', '隐患统计'],
      special: ['场所管控', '人员履职', '隐患统计'],
      other: ['管控概况', '人员履职', '问题统计']
    };

    return {
      portalType: ctx.portalType,
      mode: mode,
      entityName: entityName,
      codeTypeLabel: codeTypeLabel,
      gradient: gradient,
      borderColor: borderColor,
      stats: stats,
      quickActions: quickActions,
      mainTabLabels: mainTabLabels[mode] || mainTabLabels.basic
    };
  }

  /* ========== 列表页(control-list.html)配置 ========== */

  /**
   * 获取列表页完整配置
   * @returns {object}
   */
  function getListConfig() {
    var ctx = _getContext();
    var mode = ctx.mode || 'basic';

    // 搜索占位符
    var searchPlaceholders = {
      gov: '搜索监管对象名称',
      basic: '搜索安全管控对象名称',
      project: '搜索项目管控对象名称',
      special: '搜索场所管控对象名称',
      other: '搜索管控对象名称'
    };

    // 根节点（第一层）
    var rootName = '';
    var rootTypeLabel = '';
    var rootTypeClass = '';

    if (ctx.portalType === 'gov') {
      rootName = ctx.session ? (ctx.session.govOrgName || '监管辖区') : '监管辖区';
      rootTypeLabel = '监管码';
      rootTypeClass = 'ent';
    } else if (ctx.identity) {
      rootName = ctx.identity.entName || ctx.identity.name || '管控对象';
      if (mode === 'basic') {
        rootTypeLabel = '企业码';
        rootTypeClass = 'ent';
      } else if (mode === 'project') {
        rootTypeLabel = '项目码';
        rootTypeClass = 'ent';
      } else if (mode === 'special') {
        rootTypeLabel = '场所码';
        rootTypeClass = 'place';
      } else {
        rootTypeLabel = '管理码';
        rootTypeClass = 'ent';
      }
    }

    return {
      portalType: ctx.portalType,
      mode: mode,
      searchPlaceholder: searchPlaceholders[mode] || searchPlaceholders.basic,
      rootName: rootName,
      rootTypeLabel: rootTypeLabel,
      rootTypeClass: rootTypeClass
    };
  }

  /* ========== 我的页(profile.html)配置 ========== */

  /**
   * 获取我的页完整配置
   * @returns {object}
   */
  function getProfileConfig() {
    var ctx = _getContext();

    // 所属单位
    var unitName = '';
    if (ctx.portalType === 'gov') {
      unitName = ctx.session ? (ctx.session.govOrgName || '监管单位') : '监管单位';
    } else if (ctx.identity) {
      unitName = ctx.identity.entName || ctx.identity.name || '';
    }

    // 角色标签
    var roleTag = '';
    if (ctx.portalType === 'gov') {
      roleTag = '监管人员';
    } else {
      roleTag = '安全管理人员';
    }

    return {
      portalType: ctx.portalType,
      mode: ctx.mode,
      unitName: unitName,
      roleTag: roleTag
    };
  }

  /* ========== 工作台(workbench.html)配置 ========== */

  /**
   * 获取工作台完整配置
   * @returns {object}
   */
  function getWorkbenchConfig() {
    var ctx = _getContext();
    var mode = ctx.mode || 'basic';

    // 常用功能（按 portalType + mode 差异化）
    var commonFunctions = {
      gov: [
        { icon: '🔎', label: '码上排查', color: 'blue', nav: 'check-list' },
        { icon: '🛠️', label: '隐患排查', color: 'green', nav: 'my-hazards' },
        { icon: '📋', label: '任务管理', color: 'orange', nav: 'task-list' },
        { icon: '🎯', label: '监管对象', color: 'purple', nav: 'control-list' }
      ],
      basic: [
        { icon: '🔎', label: '码上排查', color: 'blue', nav: 'check-list' },
        { icon: '🛠️', label: '隐患排查', color: 'green', nav: 'my-hazards' },
        { icon: '📋', label: '任务管理', color: 'orange', nav: 'task-list' },
        { icon: '🎯', label: '安全管控对象', color: 'purple', nav: 'control-list' }
      ],
      project: [
        { icon: '🔎', label: '码上排查', color: 'blue', nav: 'check-list' },
        { icon: '🛠️', label: '隐患排查', color: 'green', nav: 'my-hazards' },
        { icon: '📋', label: '任务管理', color: 'orange', nav: 'task-list' },
        { icon: '🎯', label: '项目管控对象', color: 'purple', nav: 'control-list' }
      ],
      special: [
        { icon: '🔎', label: '码上排查', color: 'blue', nav: 'check-list' },
        { icon: '🛠️', label: '隐患排查', color: 'green', nav: 'my-hazards' },
        { icon: '📋', label: '任务管理', color: 'orange', nav: 'task-list' },
        { icon: '🎯', label: '场所管控对象', color: 'purple', nav: 'control-list' }
      ],
      other: [
        { icon: '🔎', label: '巡查记录', color: 'blue', nav: 'check-list' },
        { icon: '⚠️', label: '问题上报', color: 'green', nav: 'my-hazards' },
        { icon: '📋', label: '任务管理', color: 'orange', nav: 'task-list' },
        { icon: '🚦', label: '劝导记录', color: 'purple', nav: 'inspection-stats' }
      ]
    };

    // 安全档案 section — 政府端/企业端标题不同
    var archiveSectionTitle = ctx.portalType === 'gov' ? '监管档案' : '安全档案';

    // other 模式下不显示安全知识库和监测预警
    var showKnowledgeBase = (mode !== 'other');
    var showMonitoring = (mode !== 'other');

    return {
      portalType: ctx.portalType,
      mode: mode,
      commonFunctions: commonFunctions[mode] || commonFunctions.basic,
      archiveSectionTitle: archiveSectionTitle,
      showKnowledgeBase: showKnowledgeBase,
      showMonitoring: showMonitoring
    };
  }

  /* ========== 场所码(place-code.html)配置 ========== */

  /** 按 mode 生成模拟场所数据 */
  function _getMockPlaces(mode, identity) {
    var entName = (identity && identity.entName) || '管控对象';
    if (mode === 'special') {
      // special 模式：identity 本身就是场所
      return [{
        id: 'PLACE_001', name: identity ? identity.name : '重点场所',
        parentName: null, qrTime: '2025-01-15 08:00',
        quickActions: [
          { icon: '📊', label: '场所信息', color: 'blue' },
          { icon: '', label: '码上排查', color: 'orange', nav: 'check-list' },
          { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
          { icon: '', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
        ],
        stats: { total: 3, green: 2, yellow: 1, red: 0 },
        dutyPersons: [
          { name: '李安全', pos: '区域责任人', dept: '安全管理部', progress: '2/3', progressPct: 67 },
          { name: '赵巡检', pos: '扫码责任人', dept: '安全管理部', progress: '2/2', progressPct: 100 }
        ]
      }];
    }
    if (mode === 'project') {
      return [
        { id: 'PLACE_P01', name: '1号基坑', parentName: entName, qrTime: '2025-01-15 08:00',
          quickActions: [
            { icon: '📊', label: '场所信息', color: 'blue' },
            { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
            { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
            { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
          ],
          stats: { total: 2, green: 1, yellow: 1, red: 0 },
          dutyPersons: [
            { name: '王施工', pos: '区域责任人', dept: '施工管理部', progress: '1/2', progressPct: 50 },
            { name: '张巡检', pos: '扫码责任人', dept: '安全管理部', progress: '2/2', progressPct: 100 }
          ]
        },
        { id: 'PLACE_P02', name: '2号塔吊', parentName: entName, qrTime: '2025-01-15 09:00',
          quickActions: [
            { icon: '📊', label: '场所信息', color: 'blue' },
            { icon: '', label: '码上排查', color: 'orange', nav: 'check-list' },
            { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
            { icon: '', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
          ],
          stats: { total: 1, green: 1, yellow: 0, red: 0 },
          dutyPersons: [
            { name: '刘机长', pos: '区域责任人', dept: '设备管理部', progress: '3/3', progressPct: 100 }
          ]
        }
      ];
    }
    // basic / other：通用模拟场所
    return [
      { id: 'PLACE_001', name: 'A栋生产车间', parentName: entName, qrTime: '2025-01-15 08:00',
        quickActions: [
          { icon: '', label: '基本信息', color: 'blue' },
          { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
          { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
          { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
        ],
        stats: { total: 3, green: 1, yellow: 1, red: 1 },
        dutyPersons: [
          { name: '李安全', pos: '区域责任人', dept: '安全管理部', progress: '2/3', progressPct: 67 },
          { name: '赵巡检', pos: '扫码责任人', dept: '安全管理部', progress: '2/2', progressPct: 100 }
        ]
      },
      { id: 'PLACE_002', name: 'B栋仓储区', parentName: entName, qrTime: '2025-01-15 09:00',
        quickActions: [
          { icon: '📊', label: '基本信息', color: 'blue' },
          { icon: '', label: '码上排查', color: 'orange', nav: 'check-list' },
          { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
          { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' }
        ],
        stats: { total: 2, green: 2, yellow: 0, red: 0 },
        dutyPersons: [
          { name: '陈仓管', pos: '区域责任人', dept: '仓储管理部', progress: '1/1', progressPct: 100 }
        ]
      }
    ];
  }

  /**
   * 获取场所码页完整配置
   * @param {string} [placeId] — 指定场所 ID，不传则取第一个
   * @returns {object|null}
   */
  function getPlaceCodeConfig(placeId) {
    var ctx = _getContext();
    var mode = ctx.mode || 'basic';
    var places = _getMockPlaces(mode, ctx.identity);
    var place = null;
    if (placeId) {
      place = places.find(function(p) { return p.id === placeId; }) || null;
    }
    if (!place && places.length > 0) place = places[0];
    if (!place) return null;

    var gradientKey = mode === 'gov' ? 'gov' : ('ent_' + (mode === 'special' ? 'special' : mode));
    var gradient = PAGE_GRADIENTS[gradientKey] || PAGE_GRADIENTS.ent_basic;
    var borderColor = CODE_BORDER_COLORS.special || CODE_BORDER_COLORS.basic;

    return {
      portalType: ctx.portalType,
      mode: mode,
      place: place,
      gradient: gradient,
      borderColor: borderColor,
      codeTypeLabel: '场所码'
    };
  }

  /* ========== 危险源码(hazard-code.html)配置 ========== */

  /** 按 mode 生成模拟危险源数据 */
  function _getMockHazards(mode) {
    if (mode === 'project') {
      return [
        { id: 'HAZ_P01', name: '深基坑坍塌风险', level: '重大', levelColor: 'red', rValue: 25,
          dept: '施工管理部', qrTime: '2025-01-15 08:00',
          quickActions: [
            { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
            { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
            { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' },
            { icon: '🔄', label: '变码记录', color: 'blue', nav: 'code-change' }
          ],
          hazardStats: { total: 5, pending: 2, fixing: 1, done: 2 },
          dutyPersons: [
            { name: '王操作', pos: '区域责任人', dept: '施工管理部', progress: '1/3', progressPct: 33 },
            { name: '赵巡检', pos: '扫码责任人', dept: '安全管理部', freq: '每日1次', status: '未完成', statusColor: 'var(--code-yellow)', progress: '1/2', progressPct: 50 }
          ]
        },
        { id: 'HAZ_P02', name: '塔吊倾覆风险', level: '较大', levelColor: 'yellow', rValue: 16,
          dept: '设备管理部', qrTime: '2025-01-15 09:00',
          quickActions: [
            { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
            { icon: '️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
            { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' },
            { icon: '🔄', label: '变码记录', color: 'blue', nav: 'code-change' }
          ],
          hazardStats: { total: 3, pending: 0, fixing: 1, done: 2 },
          dutyPersons: [
            { name: '刘机长', pos: '区域责任人', dept: '设备管理部', progress: '2/2', progressPct: 100 }
          ]
        }
      ];
    }
    if (mode === 'special') {
      return [
        { id: 'HAZ_S01', name: '充电桩过热风险', level: '较大', levelColor: 'yellow', rValue: 12,
          dept: '设施管理部', qrTime: '2025-01-15 08:00',
          quickActions: [
            { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
            { icon: '️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
            { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' },
            { icon: '🔄', label: '变码记录', color: 'blue', nav: 'code-change' }
          ],
          hazardStats: { total: 2, pending: 0, fixing: 1, done: 1 },
          dutyPersons: [
            { name: '孙电工', pos: '区域责任人', dept: '设施管理部', progress: '1/1', progressPct: 100 }
          ]
        }
      ];
    }
    // basic / other：通用模拟危险源
    return [
      { id: 'HAZ_001', name: '危化品存储区', level: '重大', levelColor: 'red', rValue: 25,
        dept: '生产运营部', qrTime: '2025-01-15 08:00',
        quickActions: [
          { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
          { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
          { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' },
          { icon: '', label: '变码记录', color: 'blue', nav: 'code-change' }
        ],
        hazardStats: { total: 5, pending: 2, fixing: 1, done: 2 },
        dutyPersons: [
          { name: '王操作', pos: '区域责任人', dept: '生产运营部', progress: '1/3', progressPct: 33 },
          { name: '赵巡检', pos: '扫码责任人', dept: '安全管理部', freq: '每日1次', status: '未完成', statusColor: 'var(--code-yellow)', progress: '1/2', progressPct: 50 }
        ]
      },
      { id: 'HAZ_002', name: '冲压设备区', level: '一般', levelColor: 'green', rValue: 4,
        dept: '生产运营部', qrTime: '2025-01-15 09:00',
        quickActions: [
          { icon: '🔎', label: '码上排查', color: 'orange', nav: 'check-list' },
          { icon: '⚠️', label: '隐患记录', color: 'green', nav: 'hazard-stats' },
          { icon: '📄', label: '检查记录', color: 'purple', nav: 'inspection-stats' },
          { icon: '', label: '变码记录', color: 'blue', nav: 'code-change' }
        ],
        hazardStats: { total: 1, pending: 0, fixing: 0, done: 1 },
        dutyPersons: [
          { name: '刘机修', pos: '区域责任人', dept: '设备维护部', progress: '1/1', progressPct: 100 }
        ]
      }
    ];
  }

  /**
   * 获取危险源码页完整配置
   * @param {string} [hazardId] — 指定危险源 ID，不传则取第一个
   * @returns {object|null}
   */
  function getHazardCodeConfig(hazardId) {
    var ctx = _getContext();
    var mode = ctx.mode || 'basic';
    var hazards = _getMockHazards(mode);
    var hazard = null;
    if (hazardId) {
      hazard = hazards.find(function(h) { return h.id === hazardId; }) || null;
    }
    if (!hazard && hazards.length > 0) hazard = hazards[0];
    if (!hazard) return null;

    // 危险源码页使用场所码的上层渐变（special 橙色 / basic 蓝色 / project 紫色）
    var gradientKey = mode === 'gov' ? 'gov' : ('ent_' + (mode === 'special' ? 'special' : mode));
    var gradient = PAGE_GRADIENTS[gradientKey] || PAGE_GRADIENTS.ent_basic;
    var borderColor = CODE_BORDER_COLORS[mode] || CODE_BORDER_COLORS.basic;

    return {
      portalType: ctx.portalType,
      mode: mode,
      hazard: hazard,
      gradient: gradient,
      borderColor: borderColor,
      codeTypeLabel: '危险源码'
    };
  }

  /* ========== 公开 API ========== */

  return {
    getHomeConfig: getHomeConfig,
    getListConfig: getListConfig,
    getProfileConfig: getProfileConfig,
    getWorkbenchConfig: getWorkbenchConfig,
    getPlaceCodeConfig: getPlaceCodeConfig,
    getHazardCodeConfig: getHazardCodeConfig,
    // 暴露内部工具供页面特殊需要
    getContext: _getContext,
    findDomain: _findDomain
  };
})();
