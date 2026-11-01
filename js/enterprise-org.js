(function (global) {
  var STORAGE_KEY = 'sa_enterprise_org';

  // 默认组织架构：与企业组织架构管理页面的演示树一致
  // 字段：id/name/type(company|unit|dept)/parent_id/status(1正常|2停用)/sort_order/expanded/children
  var DEFAULT_ORG = [
    {
      id: 'root',
      name: '深圳市天道医药有限公司南山分厂',
      type: 'company',
      parent_id: null,
      status: 1,
      sort_order: 0,
      expanded: true,
      children: [
        {
          id: 'unit-1',
          name: '安全生产部',
          type: 'unit',
          parent_id: 'root',
          status: 1,
          sort_order: 1,
          expanded: false,
          children: [
            {
              id: 'dept-1',
              name: '安全管理一组',
              type: 'dept',
              parent_id: 'unit-1',
              status: 1,
              sort_order: 1,
              expanded: false,
              children: [
                {
                  id: 'dept-1-1',
                  name: '安全巡查小组',
                  type: 'dept',
                  parent_id: 'dept-1',
                  status: 1,
                  sort_order: 1,
                  expanded: false,
                  children: [
                    {
                      id: 'dept-1-1-1',
                      name: '日间巡查组',
                      type: 'dept',
                      parent_id: 'dept-1-1',
                      status: 1,
                      sort_order: 1,
                      expanded: false,
                      children: []
                    }
                  ]
                },
                {
                  id: 'dept-1-2',
                  name: '隐患整改小组',
                  type: 'dept',
                  parent_id: 'dept-1',
                  status: 1,
                  sort_order: 2,
                  expanded: false,
                  children: []
                }
              ]
            },
            {
              id: 'dept-2',
              name: '安全管理二组',
              type: 'dept',
              parent_id: 'unit-1',
              status: 1,
              sort_order: 2,
              expanded: false,
              children: []
            }
          ]
        },
        {
          id: 'unit-2',
          name: '技术质量部',
          type: 'unit',
          parent_id: 'root',
          status: 1,
          sort_order: 2,
          expanded: false,
          children: [
            {
              id: 'dept-3',
              name: '工程技术组',
              type: 'dept',
              parent_id: 'unit-2',
              status: 1,
              sort_order: 1,
              expanded: false,
              children: []
            },
            {
              id: 'dept-4',
              name: '质量检测组',
              type: 'dept',
              parent_id: 'unit-2',
              status: 2,
              sort_order: 2,
              expanded: false,
              children: []
            }
          ]
        },
        {
          id: 'dept-5',
          name: '综合管理部',
          type: 'dept',
          parent_id: 'root',
          status: 1,
          sort_order: 3,
          expanded: false,
          children: [
            {
              id: 'dept-5-1',
              name: '行政管理组',
              type: 'dept',
              parent_id: 'dept-5',
              status: 1,
              sort_order: 1,
              expanded: false,
              children: []
            },
            {
              id: 'dept-5-2',
              name: '后勤保障组',
              type: 'dept',
              parent_id: 'dept-5',
              status: 2,
              sort_order: 2,
              expanded: false,
              children: []
            }
          ]
        },
        {
          id: 'dept-6',
          name: '财务部',
          type: 'dept',
          parent_id: 'root',
          status: 1,
          sort_order: 4,
          expanded: false,
          children: []
        }
      ]
    }
  ];

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getEnterpriseOrg() {
    var tree = null;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (saved && typeof saved.length === 'number' && saved.length) tree = saved;
      }
    } catch (err) {}
    if (!tree) tree = deepClone(DEFAULT_ORG);
    var profile = global.getEnterpriseProfile ? global.getEnterpriseProfile() : null;
    var root = tree[0];
    if (profile && profile.name && root && root.type === 'company' && root.name !== profile.name) {
      root.name = profile.name;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
      } catch (err) {}
    }
    return tree;
  }

  function saveEnterpriseOrg(tree) {
    var next = tree && tree.length ? tree : deepClone(DEFAULT_ORG);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {}
    return next;
  }

  function syncEnterpriseOrgRoot(profile) {
    var tree = getEnterpriseOrg();
    var root = tree[0];
    if (!root || root.type !== 'company' || !profile || !profile.name) return tree;
    if (root.name === profile.name) return tree;
    root.name = profile.name;
    return saveEnterpriseOrg(tree);
  }

  global.getEnterpriseOrg = getEnterpriseOrg;
  global.saveEnterpriseOrg = saveEnterpriseOrg;
  global.syncEnterpriseOrgRoot = syncEnterpriseOrgRoot;
})(window);
