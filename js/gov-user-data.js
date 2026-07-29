/**
 * 政府端人员账号管理 — 共享数据源
 * 供 gov-user.html（人员账号管理页）和 domain-supervise.html（扫码责任人选择器）共同引用
 * 单一数据源，确保多模块人员数据一致
 *
 * 数据来源说明：本文件为原型阶段的 mock 数据。
 * 生产环境中，人员数据来自后端 API（对应"政府单位管理 > 人员账号管理"模块）。
 */

'use strict';

/* ========== 科室定义（多单位） ========== */
// 按单位组织科室，便于 UI 联动。deptId 全局唯一（带单位前缀）。
var GOV_USER_DEPTS = {
  'NS-AWB': [
    { id: 'dept-awb-01', name: '综合协调科' },
    { id: 'dept-awb-02', name: '督查督办科' }
  ],
  'NS-AMB': [
    { id: 'dept-amb-01', name: '督导检查科' },
    { id: 'dept-amb-02', name: '综合协调科' },
    { id: 'dept-amb-03', name: '区三防办' },
    { id: 'dept-amb-04', name: '安全监管和执法科' },
    { id: 'dept-amb-05', name: '防灾减灾科' },
    { id: 'dept-amb-06', name: '危化品监管和执法科' }
  ],
  'NS-MARKET': [
    { id: 'dept-mkt-01', name: '安全监管科' },
    { id: 'dept-mkt-02', name: '执法大队' }
  ],
  'NS-HOUSING': [
    { id: 'dept-hou-01', name: '安全监管科' },
    { id: 'dept-hou-02', name: '物业管理科' },
    { id: 'dept-hou-03', name: '建设监管科' }
  ],
  'NS-IIT': [
    { id: 'dept-iit-01', name: '安全生产科' }
  ],
  'NS-EDU': [
    { id: 'dept-edu-01', name: '安全督导科' }
  ],
  'NS-CULTURE': [
    { id: 'dept-cul-01', name: '市场执法科' },
    { id: 'dept-cul-02', name: '旅游监管科' }
  ],
  'NS-HEALTH': [
    { id: 'dept-hea-01', name: '医政科' },
    { id: 'dept-hea-02', name: '疾控科' }
  ],
  'NS-URBAN': [
    { id: 'dept-urb-01', name: '市容监管科' },
    { id: 'dept-urb-02', name: '执法大队' }
  ],
  'NS-FIRE': [
    { id: 'dept-fir-01', name: '防火监督科' },
    { id: 'dept-fir-02', name: '灭火救援科' }
  ],
  'NS-EEB': [
    { id: 'dept-eeb-01', name: '环境监察科' }
  ],
  'NS-WATER': [
    { id: 'dept-wat-01', name: '水利安全监管科' }
  ],
  'NS-COMMERCE': [
    { id: 'dept-com-01', name: '安全生产科' }
  ],
  'NS-CONSTRUCTION': [
    { id: 'dept-con-01', name: '工程监管科' }
  ],
  'NS-TRAFFIC-POLICE': [
    { id: 'dept-trf-01', name: '交通秩序科' },
    { id: 'dept-trf-02', name: '宣传科' }
  ],
  'NS-NANSHAN-STREET': [
    { id: 'dept-nss-01', name: '应急管理办' },
    { id: 'dept-nss-02', name: '综合治理办' }
  ],
  'NS-YUEHAI': [{ id: 'dept-yh-01', name: '应急管理办' }],
  'NS-XILI': [{ id: 'dept-xl-01', name: '应急管理办' }],
  'NS-NANTOU': [{ id: 'dept-nt-01', name: '应急管理办' }],
  'NS-SHAHE': [{ id: 'dept-sh-01', name: '应急管理办' }],
  'NS-SHEKOU': [{ id: 'dept-sk-01', name: '应急管理办' }],
  'NS-ZHAOSHANG': [{ id: 'dept-zs-01', name: '应急管理办' }],
  'NS-TAOYUAN': [{ id: 'dept-ty-01', name: '应急管理办' }]
};

/* ========== 人员账号主数据 ========== */
// 字段：id/name/account/mobile/email/orgId/org/deptId/deptName/title/userType/status/lastLogin
var _uid = 100;
function _uidGen() { return 'u' + (_uid++); }

var GOV_USER_DATA_ALL = [
  // ===== 区安全生产委员会办公室（安委办）=====
  { id: _uidGen(), name: '李安监', account: '13900000001', mobile: '13900000001', email: 'lianjin@gov.cn', orgId: 'NS-AWB', org: '区安全生产委员会办公室', deptId: 'dept-awb-01', deptName: '综合协调科', title: '科长', userType: '领导层', status: '启用', lastLogin: '2026-07-28 09:00' },
  { id: _uidGen(), name: '王协调', account: '13900000002', mobile: '13900000002', email: 'wangxietiao@gov.cn', orgId: 'NS-AWB', org: '区安全生产委员会办公室', deptId: 'dept-awb-01', deptName: '综合协调科', title: '副科长', userType: '监管层', status: '启用', lastLogin: '2026-07-27 14:30' },
  { id: _uidGen(), name: '张督导', account: '13900000003', mobile: '13900000003', email: 'zhangdudao@gov.cn', orgId: 'NS-AWB', org: '区安全生产委员会办公室', deptId: 'dept-awb-02', deptName: '督查督办科', title: '科员', userType: '监管层', status: '启用', lastLogin: '2026-07-26 16:20' },

  // ===== 区应急管理局（NS-AMB）—— 沿用 gov-user.html 原有 14 人数据 =====
  { id: _uidGen(), name: '王建国', account: '13800138001', mobile: '13800138001', email: 'wangjianguo@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-01', deptName: '督导检查科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-10 09:21' },
  { id: _uidGen(), name: '李明华', account: '13800138002', mobile: '13800138002', email: 'liminghua@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-01', deptName: '督导检查科', title: '副科长', userType: '巡查层', status: '启用', lastLogin: '2026-06-09 16:45' },
  { id: _uidGen(), name: '张志强', account: '13800138003', mobile: '13800138003', email: 'zhangzhiqiang@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-02', deptName: '综合协调科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-08 08:30' },
  { id: _uidGen(), name: '陈月明', account: '13800138004', mobile: '13800138004', email: 'chenyueming@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-02', deptName: '综合协调科', title: '副科长', userType: '巡查层', status: '启用', lastLogin: '2026-06-07 14:20' },
  { id: _uidGen(), name: '刘建军', account: '13800138005', mobile: '13800138005', email: 'liujianjun@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-03', deptName: '区三防办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-06-06 10:15' },
  { id: _uidGen(), name: '赵晓燕', account: '13800138006', mobile: '13800138006', email: 'zhaoxiaoyan@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-03', deptName: '区三防办', title: '科员', userType: '巡查层', status: '启用', lastLogin: '2026-06-05 07:50' },
  { id: _uidGen(), name: '孙志强', account: '13800138007', mobile: '13800138007', email: 'sunzhiqiang@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-04', deptName: '安全监管和执法科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-04 17:30' },
  { id: _uidGen(), name: '周文博', account: '13800138008', mobile: '13800138008', email: 'zhouwenbo@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-04', deptName: '安全监管和执法科', title: '副科长', userType: '巡查层', status: '启用', lastLogin: '2026-06-03 09:00' },
  { id: _uidGen(), name: '钱晓东', account: '13800138009', mobile: '13800138009', email: 'qianxiaodong@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-05', deptName: '防灾减灾科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-02 14:55' },
  { id: _uidGen(), name: '吴明远', account: '13800138010', mobile: '13800138010', email: 'wumingyuan@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-05', deptName: '防灾减灾科', title: '科员', userType: '巡查层', status: '停用', lastLogin: '2026-05-20 11:00' },
  { id: _uidGen(), name: '黄伟', account: '13800138011', mobile: '13800138011', email: 'huangwei@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-06', deptName: '危化品监管和执法科', title: '科长', userType: '领导层', status: '启用', lastLogin: '2026-06-01 10:30' },
  { id: _uidGen(), name: '林芳', account: '13800138012', mobile: '13800138012', email: 'linfang@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-06', deptName: '危化品监管和执法科', title: '副科长', userType: '巡查层', status: '启用', lastLogin: '2026-05-30 14:20' },
  { id: _uidGen(), name: '徐明', account: '13800138013', mobile: '13800138013', email: 'xuming@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-01', deptName: '督导检查科', title: '科员', userType: '巡查层', status: '停用', lastLogin: '2026-05-15 16:45' },
  { id: _uidGen(), name: '高洁', account: '13800138014', mobile: '13800138014', email: 'gaojie@gov.cn', orgId: 'NS-AMB', org: '区应急管理局', deptId: 'dept-amb-02', deptName: '综合协调科', title: '科员', userType: '巡查层', status: '启用', lastLogin: '2026-05-28 11:30' },

  // ===== 市场监督管理局南山监管局 =====
  { id: _uidGen(), name: '周市场', account: '13800200001', mobile: '13800200001', email: 'zhoushichang@gov.cn', orgId: 'NS-MARKET', org: '市场监督管理局南山监管局', deptId: 'dept-mkt-01', deptName: '安全监管科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-20 09:15' },
  { id: _uidGen(), name: '吴检查', account: '13800200002', mobile: '13800200002', email: 'wujiancha@gov.cn', orgId: 'NS-MARKET', org: '市场监督管理局南山监管局', deptId: 'dept-mkt-01', deptName: '安全监管科', title: '科员', userType: '巡查层', status: '启用', lastLogin: '2026-07-19 14:30' },
  { id: _uidGen(), name: '郑执法', account: '13800200003', mobile: '13800200003', email: 'zhengzhifa@gov.cn', orgId: 'NS-MARKET', org: '市场监督管理局南山监管局', deptId: 'dept-mkt-02', deptName: '执法大队', title: '副大队长', userType: '监管层', status: '启用', lastLogin: '2026-07-18 17:00' },

  // ===== 南山区住房和建设局 =====
  { id: _uidGen(), name: '孙住建', account: '13800300001', mobile: '13800300001', email: 'sunzhujian@gov.cn', orgId: 'NS-HOUSING', org: '南山区住房和建设局', deptId: 'dept-hou-01', deptName: '安全监管科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-15 10:00' },
  { id: _uidGen(), name: '钱物业', account: '13800300002', mobile: '13800300002', email: 'qianwuye@gov.cn', orgId: 'NS-HOUSING', org: '南山区住房和建设局', deptId: 'dept-hou-02', deptName: '物业管理科', title: '副科长', userType: '监管层', status: '启用', lastLogin: '2026-07-14 11:30' },
  { id: _uidGen(), name: '冯工程', account: '13800300003', mobile: '13800300003', email: 'fenggongcheng@gov.cn', orgId: 'NS-HOUSING', org: '南山区住房和建设局', deptId: 'dept-hou-03', deptName: '建设监管科', title: '科员', userType: '巡查层', status: '启用', lastLogin: '2026-07-13 16:00' },

  // ===== 南山区工业和信息化局 =====
  { id: _uidGen(), name: '褚工业', account: '13800400001', mobile: '13800400001', email: 'chugongye@gov.cn', orgId: 'NS-IIT', org: '南山区工业和信息化局', deptId: 'dept-iit-01', deptName: '安全生产科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-10 09:30' },

  // ===== 南山区教育局 =====
  { id: _uidGen(), name: '蒋校园', account: '13800500001', mobile: '13800500001', email: 'jiangxiaoyuan@gov.cn', orgId: 'NS-EDU', org: '南山区教育局', deptId: 'dept-edu-01', deptName: '安全督导科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-08 14:00' },

  // ===== 南山区文化广电旅游体育局 =====
  { id: _uidGen(), name: '韩文娱', account: '13800600001', mobile: '13800600001', email: 'hanwenyu@gov.cn', orgId: 'NS-CULTURE', org: '南山区文化广电旅游体育局', deptId: 'dept-cul-01', deptName: '市场执法科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-05 10:30' },

  // ===== 南山区卫生健康局 =====
  { id: _uidGen(), name: '朱医疗', account: '13800700001', mobile: '13800700001', email: 'zhuyiliao@gov.cn', orgId: 'NS-HEALTH', org: '南山区卫生健康局', deptId: 'dept-hea-01', deptName: '医政科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-03 09:45' },

  // ===== 南山区城市管理和综合执法局 =====
  { id: _uidGen(), name: '尤城管', account: '13800800001', mobile: '13800800001', email: 'youchengguan@gov.cn', orgId: 'NS-URBAN', org: '南山区城市管理和综合执法局', deptId: 'dept-urb-01', deptName: '市容监管科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-07-01 08:30' },
  { id: _uidGen(), name: '许执法', account: '13800800002', mobile: '13800800002', email: 'xuzhifa@gov.cn', orgId: 'NS-URBAN', org: '南山区城市管理和综合执法局', deptId: 'dept-urb-02', deptName: '执法大队', title: '大队长', userType: '监管层', status: '启用', lastLogin: '2026-06-30 17:15' },

  // ===== 南山区消防救援局 =====
  { id: _uidGen(), name: '何消防', account: '13800900001', mobile: '13800900001', email: 'hexiaofang@gov.cn', orgId: 'NS-FIRE', org: '南山区消防救援局', deptId: 'dept-fir-01', deptName: '防火监督科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-28 10:00' },

  // ===== 市生态环境局南山管理局 =====
  { id: _uidGen(), name: '施环保', account: '13801000001', mobile: '13801000001', email: 'shihuanbao@gov.cn', orgId: 'NS-EEB', org: '市生态环境局南山管理局', deptId: 'dept-eeb-01', deptName: '环境监察科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-25 14:20' },

  // ===== 南山区水务局 =====
  { id: _uidGen(), name: '张水利', account: '13801100001', mobile: '13801100001', email: 'zhangshuili@gov.cn', orgId: 'NS-WATER', org: '南山区水务局', deptId: 'dept-wat-01', deptName: '水利安全监管科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-22 09:00' },

  // ===== 南山区商务局 =====
  { id: _uidGen(), name: '王商贸', account: '13801200001', mobile: '13801200001', email: 'wangshangmao@gov.cn', orgId: 'NS-COMMERCE', org: '南山区商务局', deptId: 'dept-com-01', deptName: '安全生产科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-20 11:00' },

  // ===== 南山区建筑工务署 =====
  { id: _uidGen(), name: '陈工务', account: '13801300001', mobile: '13801300001', email: 'chengongwu@gov.cn', orgId: 'NS-CONSTRUCTION', org: '南山区建筑工务署', deptId: 'dept-con-01', deptName: '工程监管科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-18 15:30' },

  // ===== 深圳市公安局交通管理支队南山大队 =====
  { id: _uidGen(), name: '楚交警', account: '13801400001', mobile: '13801400001', email: 'chujiaojing@gov.cn', orgId: 'NS-TRAFFIC-POLICE', org: '深圳市公安局交通管理支队南山大队', deptId: 'dept-trf-01', deptName: '交通秩序科', title: '科长', userType: '监管层', status: '启用', lastLogin: '2026-06-15 08:00' },

  // ===== 8 个街道办（每办 2-3 人）=====
  { id: _uidGen(), name: '林南山', account: '13802000001', mobile: '13802000001', email: 'linnanshan@gov.cn', orgId: 'NS-NANSHAN-STREET', org: '南山区南山街道办事处', deptId: 'dept-nss-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-25 09:00' },
  { id: _uidGen(), name: '魏巡查', account: '13802000002', mobile: '13802000002', email: 'weixuncha@gov.cn', orgId: 'NS-NANSHAN-STREET', org: '南山区南山街道办事处', deptId: 'dept-nss-01', deptName: '应急管理办', title: '科员', userType: '巡查层', status: '启用', lastLogin: '2026-07-24 16:30' },
  { id: _uidGen(), name: '陆粤海', account: '13802100001', mobile: '13802100001', email: 'luyuehai@gov.cn', orgId: 'NS-YUEHAI', org: '南山区粤海街道办事处', deptId: 'dept-yh-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-22 08:30' },
  { id: _uidGen(), name: '袁西丽', account: '13802200001', mobile: '13802200001', email: 'yuanxili@gov.cn', orgId: 'NS-XILI', org: '南山区西丽街道办事处', deptId: 'dept-xl-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-20 14:00' },
  { id: _uidGen(), name: '任南头', account: '13802300001', mobile: '13802300001', email: 'rennantou@gov.cn', orgId: 'NS-NANTOU', org: '南山区南头街道办事处', deptId: 'dept-nt-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-18 09:30' },
  { id: _uidGen(), name: '肖沙河', account: '13802400001', mobile: '13802400001', email: 'xiaoshahe@gov.cn', orgId: 'NS-SHAHE', org: '南山区沙河街道办事处', deptId: 'dept-sh-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-15 10:15' },
  { id: _uidGen(), name: '严蛇口', account: '13802500001', mobile: '13802500001', email: 'yanshekou@gov.cn', orgId: 'NS-SHEKOU', org: '南山区蛇口街道办事处', deptId: 'dept-sk-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-12 11:00' },
  { id: _uidGen(), name: '华招商', account: '13802600001', mobile: '13802600001', email: 'huazhaoshang@gov.cn', orgId: 'NS-ZHAOSHANG', org: '南山区招商街道办事处', deptId: 'dept-zs-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-10 14:30' },
  { id: _uidGen(), name: '梁桃源', account: '13802700001', mobile: '13802700001', email: 'liangtaoyuan@gov.cn', orgId: 'NS-TAOYUAN', org: '南山区桃源街道办事处', deptId: 'dept-ty-01', deptName: '应急管理办', title: '主任', userType: '监管层', status: '启用', lastLogin: '2026-07-08 16:00' }
];

/* ========== 辅助函数 ========== */

/**
 * 按单位 ID 获取该单位的人员列表
 * @param {string} orgId 单位 ID
 * @returns {Array} 该单位的人员列表
 */
function getPersonnelByOrgId(orgId) {
  return GOV_USER_DATA_ALL.filter(function(u) { return u.orgId === orgId; });
}

/**
 * 按科室 ID 获取该科室的人员列表
 * @param {string} deptId 科室 ID
 * @returns {Array} 该科室的人员列表
 */
function getPersonnelByDeptId(deptId) {
  return GOV_USER_DATA_ALL.filter(function(u) { return u.deptId === deptId; });
}

/**
 * 按科室 ID 获取科室信息
 * @param {string} deptId 科室 ID
 * @returns {Object|null} 科室信息
 */
function getDeptById(deptId) {
  if (!deptId) return null;
  var orgIds = Object.keys(GOV_USER_DEPTS);
  for (var i = 0; i < orgIds.length; i++) {
    var depts = GOV_USER_DEPTS[orgIds[i]];
    var found = depts.find(function(d) { return d.id === deptId; });
    if (found) return found;
  }
  return null;
}

/**
 * 获取指定单位下的科室列表
 * @param {string} orgId 单位 ID
 * @returns {Array} 科室列表
 */
function getDeptsByOrgId(orgId) {
  return GOV_USER_DEPTS[orgId] || [];
}

/**
 * 按 ID 获取单条人员信息
 * @param {string} userId 用户 ID
 * @returns {Object|null} 人员信息
 */
function getUserById(userId) {
  return GOV_USER_DATA_ALL.find(function(u) { return u.id === userId; }) || null;
}
