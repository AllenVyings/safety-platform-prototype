/**
 * 领域小类管理 — 共享数据源
 * 供超管端 domain-manage.html 和政府端 domain-supervise.html 共同引用
 * 单一数据源，确保两端领域小类数据一致
 */

'use strict';

/* ========== 非街道类监管单位名称字典 ========== */
var DOMAIN_NON_STREET_UNITS = [
  { id: 'NS-AWB', name: '区安全生产委员会办公室', isAwb: true },
  { id: 'NS-TRAFFIC-POLICE', name: '深圳市公安局交通管理支队南山大队' },
  { id: 'NS-AMB', name: '区应急管理局' },
  { id: 'NS-EEB', name: '市生态环境局南山管理局' },
  { id: 'NS-EDU', name: '南山区教育局' },
  { id: 'NS-IIT', name: '南山区工业和信息化局' },
  { id: 'NS-FIRE', name: '南山区消防救援局' },
  { id: 'NS-HOUSING', name: '南山区住房和建设局' },
  { id: 'NS-WATER', name: '南山区水务局' },
  { id: 'NS-COMMERCE', name: '南山区商务局' },
  { id: 'NS-CULTURE', name: '南山区文化广电旅游体育局' },
  { id: 'NS-HEALTH', name: '南山区卫生健康局' },
  { id: 'NS-URBAN', name: '南山区城市管理和综合执法局' },
  { id: 'NS-MARKET', name: '市场监督管理局南山监管局' },
  { id: 'NS-CONSTRUCTION', name: '南山区建筑工务署' }
];

/* ========== 属地监管 8 个街道 ========== */
var DOMAIN_LOCAL_STREETS = [
  { id: 'NS-NANSHAN-STREET', name: '南山区南山街道办事处' },
  { id: 'NS-YUEHAI', name: '南山区粤海街道办事处' },
  { id: 'NS-XILI', name: '南山区西丽街道办事处' },
  { id: 'NS-NANTOU', name: '南山区南头街道办事处' },
  { id: 'NS-SHAHE', name: '南山区沙河街道办事处' },
  { id: 'NS-SHEKOU', name: '南山区蛇口街道办事处' },
  { id: 'NS-ZHAOSHANG', name: '南山区招商街道办事处' },
  { id: 'NS-TAOYUAN', name: '南山区桃源街道办事处' }
];

/* ========== 辅助函数 ========== */

/**
 * 从非街道单位/街道列表中查找名称，构建 supervisor 对象
 */
var domainSupRef = function(type, orgId) {
  var rawUnit = DOMAIN_NON_STREET_UNITS.find(function(u) { return u.id === orgId; });
  if (rawUnit) return { type: type, id: type + '_' + orgId, orgId: orgId, name: rawUnit.name, checklists: [] };
  var localUnit = DOMAIN_LOCAL_STREETS.find(function(u) { return u.id === orgId; });
  if (localUnit) return { type: type, id: type + '_' + orgId, orgId: orgId, name: localUnit.name, checklists: [] };
  return { type: type, id: type + '_' + orgId, orgId: orgId, name: orgId, checklists: [] };
};

/* ========== 边坡类检查表检查项 ========== */
var DOMAIN_SLOPE_CHECK_ITEMS = [
  { id: 'item_env', category: '边坡环境', name: '边坡环境', contents: [
    { id: 'env_1', name: '坡面是否存在植被倾倒破坏，植被退化、开裂及裂缝形态、变形（鼓胀、裂缝）、岩土体裸露、落石、危岩、坡面冲刷、渗漏水、马刀树、醉汉林、结构面 (层面、节理等) 增宽 错动或扭曲等情况', standard: '' },
    { id: 'env_2', name: '坡体是否存在崩塌、滑坡、泥石流等情况', standard: '' },
    { id: 'env_3', name: '坡脚是否存在裂缝、渗漏水、变形（地面隆起、反翘等）、岩土体崩落堆积等情况', standard: '' },
    { id: 'env_4', name: '坡顶是否存在裂缝、变形、植被倾倒等情况', standard: '' },
    { id: 'env_5', name: '周边环境是否存在积水、坡面长期渗水、水位突变、泄水点水量突增、水质突然浑浊、坡体上种植蔬菜等、附近建筑物（如有）倾斜、开裂、附近存在开挖、加载、爆破等人类活动、受威胁对象等情况', standard: '' }
  ]},
  { id: 'item_fac', category: '附属设施', name: '附属设施', contents: [
    { id: 'fac_1', name: '标识牌是否存在牌面污浊、字迹模糊、破损、倾倒等情况', standard: '' },
    { id: 'fac_2', name: '检修道是否存在未安装护栏、破损、杂草覆盖、土体覆盖等情况', standard: '' },
    { id: 'fac_3', name: '视频监测设备是否存在被遮挡、损坏、运行失常等情况', standard: '' },
    { id: 'fac_4', name: '数据监测设备是否存在被移动、破损、运行失常、树枝等压覆等情况', standard: '' }
  ]}
];

/* ========== 边坡类检查表（普通/重点两种频次） ========== */
var DOMAIN_SLOPE_CHECKLISTS_NORMAL = [
  { id: 'cl_non_flood_check', name: '非汛期检查表', interval: '1', unit: 'month', times: '1', skipHoliday: false, frequency: '每月1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) },
  { id: 'cl_flood_check', name: '汛期检查表', interval: '2', unit: 'week', times: '1', skipHoliday: false, frequency: '每两周1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) }
];
var DOMAIN_SLOPE_CHECKLISTS_KEY = [
  { id: 'cl_non_flood_check', name: '非汛期检查表', interval: '2', unit: 'week', times: '1', skipHoliday: false, frequency: '每两周1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) },
  { id: 'cl_flood_check', name: '汛期检查表', interval: '1', unit: 'week', times: '1', skipHoliday: false, frequency: '每周1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) }
];

/**
 * 带检查表的 supRef（用于边坡类领域）
 */
var domainSupRefWithChecklists = function(type, orgId, domainId) {
  var sup = domainSupRef(type, orgId);
  var checklists = (domainId === 'OTH_002') ? DOMAIN_SLOPE_CHECKLISTS_KEY : DOMAIN_SLOPE_CHECKLISTS_NORMAL;
  sup.checklists = JSON.parse(JSON.stringify(checklists));
  return sup;
};

/* ========== 领域小类主数据 ========== */
var DOMAIN_TABLE_DATA = [
  // ===== 公共场所类 (COMM) 18项 =====
  { id: 'COMM_001', name: '电动自行车充电场所', industry: 'COMM', industryName: '公共场所类', mode: 'special', status: '1', desc: '电动自行车集中充电场所安全管理', supervisors: [domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 4 },
  { id: 'COMM_002', name: '商业综合体', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '大型商业综合体安全管理', supervisors: [domainSupRef('industry', 'NS-COMMERCE'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 9 },
  { id: 'COMM_003', name: '物业小区', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '住宅物业小区安全管理', supervisors: [domainSupRef('professional', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 10 },
  { id: 'COMM_004', name: '超高层建筑', industry: 'COMM', industryName: '公共场所类', mode: 'special', status: '1', desc: '超高层建筑安全管理', supervisors: [domainSupRef('professional', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-SHEKOU')], checklists: [], sortOrder: 5 },
  { id: 'COMM_005', name: '文明施工', industry: 'COMM', industryName: '公共场所类', mode: 'project', status: '1', desc: '文明施工安全管理', supervisors: [domainSupRef('industry', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 11 },
  { id: 'COMM_006', name: '"三小"场所（小商店—商场、市场、商店等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '商场、市场、商店等小商店场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 12 },
  { id: 'COMM_007', name: '"三小"场所（小餐饮（燃气））', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '使用燃气的小餐饮场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 13 },
  { id: 'COMM_008', name: '"三小"场所（小美容休闲—理发、美容、纹身、采耳、理疗、针灸、足浴、按摩等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '理发、美容、纹身、采耳、理疗、针灸、足浴、按摩等小美容休闲场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 14 },
  { id: 'COMM_009', name: '"三小"场所（小餐饮（仅用电））', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '仅使用电力的小餐饮场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 15 },
  { id: 'COMM_010', name: '"三小"场所（小网吧）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '小网吧场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 16 },
  { id: 'COMM_011', name: '"三小"场所（小门店—汽配、废品、五金、打印等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '汽配、废品、五金、打印等小门店场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 17 },
  { id: 'COMM_012', name: '"三小"场所（小型学校幼儿园—托幼、晚托班、午休班、培训机构等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '托幼、晚托班、午休班、培训机构等小型学校幼儿园场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 18 },
  { id: 'COMM_013', name: '"三小"场所（小型多业态场所）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '小型多业态混合场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 19 },
  { id: 'COMM_014', name: '"三小"场所（小型医疗机构—口腔、中医等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '口腔、中医等小型医疗机构安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 20 },
  { id: 'COMM_015', name: '"三小"场所（小歌舞娱乐—小ktv、酒吧、密室逃脱、剧本杀等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '小KTV、酒吧、密室逃脱、剧本杀等小歌舞娱乐场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 21 },
  { id: 'COMM_016', name: '"三小"场所（小生产加工企业）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '小生产加工企业场所安全管理', supervisors: [domainSupRef('industry', 'NS-IIT'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 22 },
  { id: 'COMM_017', name: '"三小"场所（小旅店—群租房、公寓、民宿等）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '群租房、公寓、民宿等小旅店场所安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 23 },
  { id: 'COMM_018', name: '"三小"场所（小型游乐场）', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '小型游乐场安全管理', supervisors: [domainSupRef('industry', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 24 },
  // ===== 建设工程类 (CONS) 1项 =====
  { id: 'CONS_001', name: '房屋建设工程', industry: 'CONS', industryName: '建设工程类', mode: 'project', status: '1', desc: '房屋建设工程施工安全管理', supervisors: [domainSupRef('industry', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 3 },
  // ===== 交通运输类 (TRANS) 1项 =====
  { id: 'TRANS_001', name: '劝导路口', industry: 'TRANS', industryName: '交通运输类', mode: 'other', status: '1', desc: '交通安全劝导路口管理', supervisors: [domainSupRef('industry', 'NS-TRAFFIC-POLICE'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 6 },
  // ===== 危险化学品类 (CHEM) 2项 =====
  { id: 'CHEM_001', name: '加油站', industry: 'CHEM', industryName: '危险化学品类', mode: 'basic', status: '1', desc: '加油站安全管理', supervisors: [domainSupRef('industry', 'NS-AMB'), domainSupRef('professional', 'NS-MARKET'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 2 },
  { id: 'CHEM_002', name: '医药化工', industry: 'CHEM', industryName: '危险化学品类', mode: 'basic', status: '1', desc: '医药化工企业安全管理', supervisors: [domainSupRef('industry', 'NS-AMB'), domainSupRef('professional', 'NS-IIT'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 1 },
  // ===== 其他类 (OTH) 2项 =====
  {
    id: 'OTH_001', name: '危险边坡', industry: 'OTH', industryName: '其他类', mode: 'special', status: '1', desc: '危险边坡安全管理',
    supervisors: [
      domainSupRefWithChecklists('industry', 'NS-URBAN', 'OTH_001'), domainSupRefWithChecklists('industry', 'NS-EDU', 'OTH_001'), domainSupRefWithChecklists('industry', 'NS-HOUSING', 'OTH_001'),
      domainSupRefWithChecklists('industry', 'NS-CULTURE', 'OTH_001'), domainSupRefWithChecklists('industry', 'NS-CONSTRUCTION', 'OTH_001'),
      domainSupRefWithChecklists('professional', 'NS-AMB', 'OTH_001'),
      domainSupRefWithChecklists('local', 'NS-NANSHAN-STREET', 'OTH_001')
    ],
    checklists: [], dynamicFormEnabled: true, sortOrder: 7,
    formSections: [
      { id: 'sec_oth001_special', name: '专项信息', type: 'custom', sortOrder: 1 },
      { id: 'sec_oth001_resp', name: '责任信息', type: 'custom', sortOrder: 2 }
    ],
    formFields: [
      { id: 'f_oth001_01', sectionId: 'sec_oth001_special', fieldKey: 'rock_type', fieldLabel: '岩性特征', fieldType: 'text', required: false, placeholder: '如：砂岩、泥岩', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 1 },
      { id: 'f_oth001_02', sectionId: 'sec_oth001_special', fieldKey: 'slope_length', fieldLabel: '坡长（m）', fieldType: 'number', required: false, placeholder: '单位：米', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 2 },
      { id: 'f_oth001_03', sectionId: 'sec_oth001_special', fieldKey: 'slope_height', fieldLabel: '坡高（m）', fieldType: 'number', required: false, placeholder: '单位：米', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 3 },
      { id: 'f_oth001_04', sectionId: 'sec_oth001_special', fieldKey: 'slope_angle', fieldLabel: '坡度（°）', fieldType: 'number', required: false, placeholder: '单位：度', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 4 },
      { id: 'f_oth001_05', sectionId: 'sec_oth001_special', fieldKey: 'treatment_status', fieldLabel: '治理现状', fieldType: 'select-single', required: false, placeholder: '', defaultValue: '', validationRules: '', options: '[{"value":"untreated","label":"未治理"},{"value":"partial","label":"部分治理"},{"value":"treated","label":"已治理"}]', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 5 },
      { id: 'f_oth001_06', sectionId: 'sec_oth001_special', fieldKey: 'threat_target', fieldLabel: '威胁对象', fieldType: 'text', required: false, placeholder: '如：居民点、道路', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 6 },
      { id: 'f_oth001_07', sectionId: 'sec_oth001_special', fieldKey: 'risk_area', fieldLabel: '涉险面积（m²）', fieldType: 'number', required: false, placeholder: '单位：平方米', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 7 },
      { id: 'f_oth001_08', sectionId: 'sec_oth001_special', fieldKey: 'disaster_type', fieldLabel: '灾害类型', fieldType: 'select-single', required: false, placeholder: '', defaultValue: '', validationRules: '', options: '[{"value":"retaining_wall","label":"挡土墙"},{"value":"dangerous_slope","label":"危险边坡"}]', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 8 },
      { id: 'f_oth001_09', sectionId: 'sec_oth001_special', fieldKey: 'point_code', fieldLabel: '点位编号', fieldType: 'text', required: false, placeholder: '如：NS-SLOPE-001', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 9 },
      { id: 'f_oth001_10', sectionId: 'sec_oth001_special', fieldKey: 'threat_people', fieldLabel: '威胁人数（人）', fieldType: 'number', required: false, placeholder: '单位：人', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 10 },
      { id: 'f_oth001_11', sectionId: 'sec_oth001_special', fieldKey: 'economic_loss', fieldLabel: '潜在经济损失（万元）', fieldType: 'number', required: false, placeholder: '单位：万元', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 11 },
      { id: 'f_oth001_12', sectionId: 'sec_oth001_special', fieldKey: 'prevention', fieldLabel: '防治措施', fieldType: 'textarea', required: false, placeholder: '描述已采取或计划的防治措施', defaultValue: '', validationRules: '', options: '', fieldWidth: 'full', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 12 },
      { id: 'f_oth001_13', sectionId: 'sec_oth001_resp', fieldKey: 'admin_unit', fieldLabel: '行政责任单位', fieldType: 'text', required: false, placeholder: '如：南山区应急管理局', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 1 },
      { id: 'f_oth001_14', sectionId: 'sec_oth001_resp', fieldKey: 'duty_phone', fieldLabel: '值班电话', fieldType: 'text', required: false, placeholder: '如：0755-xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 2 },
      { id: 'f_oth001_15', sectionId: 'sec_oth001_resp', fieldKey: 'admin_person', fieldLabel: '行政负责人', fieldType: 'text', required: false, placeholder: '姓名', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 3 },
      { id: 'f_oth001_16', sectionId: 'sec_oth001_resp', fieldKey: 'admin_phone', fieldLabel: '联系电话', fieldType: 'text', required: false, placeholder: '如：138xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 4 },
      { id: 'f_oth001_17', sectionId: 'sec_oth001_resp', fieldKey: 'tech_person', fieldLabel: '技术负责人', fieldType: 'text', required: false, placeholder: '姓名', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 5 },
      { id: 'f_oth001_18', sectionId: 'sec_oth001_resp', fieldKey: 'tech_phone', fieldLabel: '联系电话', fieldType: 'text', required: false, placeholder: '如：138xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 6 },
      { id: 'f_oth001_19', sectionId: 'sec_oth001_resp', fieldKey: 'patrol_person', fieldLabel: '巡查负责人', fieldType: 'text', required: false, placeholder: '姓名', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 7 },
      { id: 'f_oth001_20', sectionId: 'sec_oth001_resp', fieldKey: 'patrol_phone', fieldLabel: '联系电话', fieldType: 'text', required: false, placeholder: '如：138xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 8 }
    ]
  },
  {
    id: 'OTH_002', name: '危险边坡（重点边坡）', industry: 'OTH', industryName: '其他类', mode: 'special', status: '1', desc: '危险边坡（重点边坡）安全管理',
    supervisors: [
      domainSupRefWithChecklists('industry', 'NS-URBAN', 'OTH_002'), domainSupRefWithChecklists('industry', 'NS-EDU', 'OTH_002'), domainSupRefWithChecklists('industry', 'NS-HOUSING', 'OTH_002'),
      domainSupRefWithChecklists('industry', 'NS-CULTURE', 'OTH_002'), domainSupRefWithChecklists('industry', 'NS-CONSTRUCTION', 'OTH_002'),
      domainSupRefWithChecklists('professional', 'NS-AMB', 'OTH_002'),
      domainSupRefWithChecklists('local', 'NS-NANSHAN-STREET', 'OTH_002')
    ],
    checklists: [], dynamicFormEnabled: true, sortOrder: 8,
    formSections: [
      { id: 'sec_oth002_special', name: '专项信息', type: 'custom', sortOrder: 1 },
      { id: 'sec_oth002_resp', name: '责任信息', type: 'custom', sortOrder: 2 }
    ],
    formFields: [
      { id: 'f_oth002_01', sectionId: 'sec_oth002_special', fieldKey: 'rock_type', fieldLabel: '岩性特征', fieldType: 'text', required: false, placeholder: '如：砂岩、泥岩', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 1 },
      { id: 'f_oth002_02', sectionId: 'sec_oth002_special', fieldKey: 'slope_length', fieldLabel: '坡长（m）', fieldType: 'number', required: false, placeholder: '单位：米', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 2 },
      { id: 'f_oth002_03', sectionId: 'sec_oth002_special', fieldKey: 'slope_height', fieldLabel: '坡高（m）', fieldType: 'number', required: false, placeholder: '单位：米', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 3 },
      { id: 'f_oth002_04', sectionId: 'sec_oth002_special', fieldKey: 'slope_angle', fieldLabel: '坡度（°）', fieldType: 'number', required: false, placeholder: '单位：度', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 4 },
      { id: 'f_oth002_05', sectionId: 'sec_oth002_special', fieldKey: 'treatment_status', fieldLabel: '治理现状', fieldType: 'select-single', required: false, placeholder: '', defaultValue: '', validationRules: '', options: '[{"value":"untreated","label":"未治理"},{"value":"partial","label":"部分治理"},{"value":"treated","label":"已治理"}]', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 5 },
      { id: 'f_oth002_06', sectionId: 'sec_oth002_special', fieldKey: 'threat_target', fieldLabel: '威胁对象', fieldType: 'text', required: false, placeholder: '如：居民点、道路', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 6 },
      { id: 'f_oth002_07', sectionId: 'sec_oth002_special', fieldKey: 'risk_area', fieldLabel: '涉险面积（m²）', fieldType: 'number', required: false, placeholder: '单位：平方米', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 7 },
      { id: 'f_oth002_08', sectionId: 'sec_oth002_special', fieldKey: 'disaster_type', fieldLabel: '灾害类型', fieldType: 'select-single', required: false, placeholder: '', defaultValue: '', validationRules: '', options: '[{"value":"retaining_wall","label":"挡土墙"},{"value":"dangerous_slope","label":"危险边坡"}]', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 8 },
      { id: 'f_oth002_09', sectionId: 'sec_oth002_special', fieldKey: 'point_code', fieldLabel: '点位编号', fieldType: 'text', required: false, placeholder: '如：NS-SLOPE-001', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 9 },
      { id: 'f_oth002_10', sectionId: 'sec_oth002_special', fieldKey: 'threat_people', fieldLabel: '威胁人数（人）', fieldType: 'number', required: false, placeholder: '单位：人', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 10 },
      { id: 'f_oth002_11', sectionId: 'sec_oth002_special', fieldKey: 'economic_loss', fieldLabel: '潜在经济损失（万元）', fieldType: 'number', required: false, placeholder: '单位：万元', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 11 },
      { id: 'f_oth002_12', sectionId: 'sec_oth002_special', fieldKey: 'prevention', fieldLabel: '防治措施', fieldType: 'textarea', required: false, placeholder: '描述已采取或计划的防治措施', defaultValue: '', validationRules: '', options: '', fieldWidth: 'full', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 12 },
      { id: 'f_oth002_13', sectionId: 'sec_oth002_resp', fieldKey: 'admin_unit', fieldLabel: '行政责任单位', fieldType: 'text', required: false, placeholder: '如：南山区应急管理局', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 1 },
      { id: 'f_oth002_14', sectionId: 'sec_oth002_resp', fieldKey: 'duty_phone', fieldLabel: '值班电话', fieldType: 'text', required: false, placeholder: '如：0755-xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 2 },
      { id: 'f_oth002_15', sectionId: 'sec_oth002_resp', fieldKey: 'admin_person', fieldLabel: '行政负责人', fieldType: 'text', required: false, placeholder: '姓名', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 3 },
      { id: 'f_oth002_16', sectionId: 'sec_oth002_resp', fieldKey: 'admin_phone', fieldLabel: '联系电话', fieldType: 'text', required: false, placeholder: '如：138xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 4 },
      { id: 'f_oth002_17', sectionId: 'sec_oth002_resp', fieldKey: 'tech_person', fieldLabel: '技术负责人', fieldType: 'text', required: false, placeholder: '姓名', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 5 },
      { id: 'f_oth002_18', sectionId: 'sec_oth002_resp', fieldKey: 'tech_phone', fieldLabel: '联系电话', fieldType: 'text', required: false, placeholder: '如：138xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 6 },
      { id: 'f_oth002_19', sectionId: 'sec_oth002_resp', fieldKey: 'patrol_person', fieldLabel: '巡查负责人', fieldType: 'text', required: false, placeholder: '姓名', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 7 },
      { id: 'f_oth002_20', sectionId: 'sec_oth002_resp', fieldKey: 'patrol_phone', fieldLabel: '联系电话', fieldType: 'text', required: false, placeholder: '如：138xxxxxxxx', defaultValue: '', validationRules: '', options: '', fieldWidth: 'half', uniqueCheck: false, helpText: '', isLocked: false, sortOrder: 8 }
    ]
  }
];

/* ========== 后处理：为包含属地监管的领域补充全部 8 街道 ========== */
(function initDomainLocalStreets() {
  var allLocalStreets = DOMAIN_LOCAL_STREETS.map(function(u) {
    return { type: 'local', id: 'local_' + u.id, orgId: u.id, name: u.name, checklists: [] };
  });
  var allLocalStreetsNormal = DOMAIN_LOCAL_STREETS.map(function(u) {
    return { type: 'local', id: 'local_' + u.id, orgId: u.id, name: u.name, checklists: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECKLISTS_NORMAL)) };
  });
  var allLocalStreetsKey = DOMAIN_LOCAL_STREETS.map(function(u) {
    return { type: 'local', id: 'local_' + u.id, orgId: u.id, name: u.name, checklists: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECKLISTS_KEY)) };
  });
  DOMAIN_TABLE_DATA.forEach(function(d) {
    var hasLocal = d.supervisors.some(function(s) { return s.type === 'local'; });
    if (hasLocal) {
      var localStreets = allLocalStreets;
      if (d.id === 'OTH_001') localStreets = allLocalStreetsNormal;
      else if (d.id === 'OTH_002') localStreets = allLocalStreetsKey;
      d.supervisors = d.supervisors.filter(function(s) { return s.type !== 'local'; }).concat(localStreets);
    }
  });
})();

/* ========== 业态模式映射 ========== */
var DOMAIN_MODE_MAP = {
  basic: { label: '基础模式', tagClass: 'tag-blue' },
  project: { label: '项目模式', tagClass: 'tag-orange' },
  special: { label: '重点场所', tagClass: 'tag-green' },
  other: { label: '其他模式', tagClass: 'tag-gray' }
};

/* ========== 行业大类映射 ========== */
var DOMAIN_INDUSTRY_MAP = {
  IND: '工业制造类', CITY: '城市运行类', CONS: '建设工程类',
  CHEM: '危险化学品类', TRANS: '交通运输类', COMM: '公共场所类', OTH: '其他类'
};

/* ========== 辅助函数 ========== */

/**
 * 根据单位 ID 获取单位名称
 */
var getUnitNameById = function(orgId) {
  var nonStreet = DOMAIN_NON_STREET_UNITS.find(function(u) { return u.id === orgId; });
  if (nonStreet) return nonStreet.name;
  var street = DOMAIN_LOCAL_STREETS.find(function(u) { return u.id === orgId; });
  if (street) return street.name;
  return orgId;
};

/**
 * 判断单位 ID 是否为安委办
 */
var isAwbUnit = function(orgId) {
  var unit = DOMAIN_NON_STREET_UNITS.find(function(u) { return u.id === orgId; });
  return unit && unit.isAwb === true;
};

/**
 * 获取所有监管单位列表（含安委办、非街道委办局、街道办）
 * 用于安委办视角下的"责任单位"下拉选择器
 */
var getAllSupervisorUnits = function() {
  var units = [];
  DOMAIN_NON_STREET_UNITS.forEach(function(u) {
    units.push({ id: u.id, name: u.name, isAwb: !!u.isAwb, type: u.isAwb ? 'awb' : 'commission' });
  });
  DOMAIN_LOCAL_STREETS.forEach(function(u) {
    units.push({ id: u.id, name: u.name, isAwb: false, type: 'street' });
  });
  return units;
};

/**
 * 获取全区所有监管单位的人员列表（扁平数组，每人带所属单位信息）
 * 数据来源：gov-user-data.js 中的人员账号管理共享数据
 * 用于安委办视角下的"扫码责任人"选择器
 */
var getAllSupervisorPersonnel = function() {
  if (typeof GOV_USER_DATA_ALL === 'undefined') return [];
  return GOV_USER_DATA_ALL.slice();
};

/**
 * 获取指定单位的人员列表
 * 数据来源：gov-user-data.js 中的人员账号管理共享数据
 * @param {string} orgId 单位 ID
 */
var getUnitPersonnel = function(orgId) {
  if (typeof GOV_USER_DATA_ALL === 'undefined') return [];
  return GOV_USER_DATA_ALL.filter(function(u) { return u.orgId === orgId; });
};
