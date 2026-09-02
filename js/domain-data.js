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

/* ========== 区划树街道名 → 街道办 orgId 映射 ========== */
// 重点场所在选择所属区划（街道）时，自动带出对应的属地监管单位
var STREET_NAME_TO_ORG_ID = {
  '南山街道': 'NS-NANSHAN-STREET',
  '粤海街道': 'NS-YUEHAI',
  '西丽街道': 'NS-XILI',
  '南头街道': 'NS-NANTOU',
  '沙河街道': 'NS-SHAHE',
  '蛇口街道': 'NS-SHEKOU',
  '招商街道': 'NS-ZHAOSHANG',
  '桃源街道': 'NS-TAOYUAN'
};

/**
 * 根据区划树街道名获取属地监管单位信息
 * @param {string} streetName - 区划树中的街道名（如"南山街道"）
 * @returns {{orgId: string, name: string}|null}
 */
function getLocalSupervisorByStreetName(streetName) {
  var orgId = STREET_NAME_TO_ORG_ID[streetName];
  if (!orgId) return null;
  var unit = DOMAIN_LOCAL_STREETS.find(function(u) { return u.id === orgId; });
  return unit ? { orgId: unit.id, name: unit.name } : null;
}

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
  { id: 'cl_non_flood_check', name: '非汛期检查表', interval: '1', unit: 'month', times: '1', skipHoliday: false, frequency: '每1月检查1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) },
  { id: 'cl_flood_check', name: '汛期检查表', interval: '2', unit: 'week', times: '1', skipHoliday: false, frequency: '每2周检查1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) }
];
var DOMAIN_SLOPE_CHECKLISTS_KEY = [
  { id: 'cl_non_flood_check', name: '非汛期检查表', interval: '2', unit: 'week', times: '1', skipHoliday: false, frequency: '每2周检查1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) },
  { id: 'cl_flood_check', name: '汛期检查表', interval: '1', unit: 'week', times: '1', skipHoliday: false, frequency: '每1周检查1次', items: JSON.parse(JSON.stringify(DOMAIN_SLOPE_CHECK_ITEMS)) }
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
  { id: 'COMM_001', name: '电动自行车充电场所', industry: 'COMM', industryName: '公共场所类', mode: 'special', status: '1', desc: '电动自行车集中充电场所安全管理', supervisors: [domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 4, hazardDefault: { handlerType: 'enterprise', handlerUserIds: [], reviewerType: 'government', reviewerUserIds: [] } },
  { id: 'COMM_002', name: '商业综合体', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '大型商业综合体安全管理', supervisors: [domainSupRef('industry', 'NS-COMMERCE'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 9 },
  { id: 'COMM_003', name: '物业小区', industry: 'COMM', industryName: '公共场所类', mode: 'basic', status: '1', desc: '住宅物业小区安全管理', supervisors: [domainSupRef('professional', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-NANSHAN-STREET')], checklists: [], sortOrder: 10 },
  { id: 'COMM_004', name: '超高层建筑', industry: 'COMM', industryName: '公共场所类', mode: 'special', status: '1', desc: '超高层建筑安全管理', supervisors: [domainSupRef('professional', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB'), domainSupRef('local', 'NS-SHEKOU')], checklists: [], sortOrder: 5, hazardDefault: { handlerType: 'enterprise', handlerUserIds: [], reviewerType: 'government', reviewerUserIds: [] } },
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
    ],
    hazardDefault: { handlerType: 'government', handlerUserIds: [], reviewerType: 'government', reviewerUserIds: [] }
  },
  {
    id: 'OTH_002', name: '危险边坡（重点边坡）', industry: 'OTH', industryName: '其他类', mode: 'special', status: '1', desc: '危险边坡（重点边坡）安全管理',
    supervisors: [
      domainSupRefWithChecklists('industry', 'NS-URBAN', 'OTH_002'), domainSupRefWithChecklists('industry', 'NS-EDU', 'OTH_002'), domainSupRefWithChecklists('industry', 'NS-HOUSING', 'OTH_002'),
      domainSupRefWithChecklists('industry', 'NS-CULTURE', 'OTH_002'), domainSupRefWithChecklists('industry', 'NS-CONSTRUCTION', 'OTH_002'),
      domainSupRefWithChecklists('professional', 'NS-AMB', 'OTH_002'),
      domainSupRefWithChecklists('local', 'NS-NANSHAN-STREET', 'OTH_002')
    ],
    // 原型演示：新增权限单位列表（不包含 NS-AMB），使默认视角单位无新增权限，展示只读状态
    // 若未定义此字段，则默认所有 supervisors 都有新增权限
    createPermissionOrgIds: ['NS-URBAN', 'NS-EDU', 'NS-HOUSING', 'NS-CULTURE', 'NS-CONSTRUCTION'],
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
    ],
    hazardDefault: { handlerType: 'government', handlerUserIds: [], reviewerType: 'government', reviewerUserIds: [] }
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

/* ========== ID 映射：共享数据 ID（COMM_001 等）→ 政府端内部 ID（domain-charging 等） ========== */
var DOMAIN_ID_MAP = {
  'COMM_001': 'domain-charging', 'COMM_002': 'domain-commercial', 'COMM_003': 'domain-property',
  'COMM_004': 'domain-highrise', 'COMM_005': 'domain-civilized',
  'COMM_006': 'domain-small-shop', 'COMM_007': 'domain-small-gasfood', 'COMM_008': 'domain-small-beauty',
  'COMM_009': 'domain-small-elecfood', 'COMM_010': 'domain-small-cybercafe', 'COMM_011': 'domain-small-store',
  'COMM_012': 'domain-small-school', 'COMM_013': 'domain-small-multi', 'COMM_014': 'domain-small-clinic',
  'COMM_015': 'domain-small-entertain', 'COMM_016': 'domain-small-produce', 'COMM_017': 'domain-small-hotel',
  'COMM_018': 'domain-small-playground', 'CONS_001': 'domain-house-build',
  'TRANS_001': 'domain-persuade', 'CHEM_001': 'domain-gas-station', 'CHEM_002': 'domain-pharma',
  'OTH_001': 'domain-slope', 'OTH_002': 'domain-slope-key'
};

// 反向映射：内部 ID（domain-charging）→ 共享数据 ID（COMM_001）
var RAW_DOMAIN_ID_MAP = {};
Object.keys(DOMAIN_ID_MAP).forEach(function(rawId) {
  RAW_DOMAIN_ID_MAP[DOMAIN_ID_MAP[rawId]] = rawId;
});

/* ========== 政府端领域监管检查表配置（共享数据源） ========== */
/* 供 domain-supervise.html 和 task-manage.html 共同引用 */
var GOV_CONFIG_DATA = {
  'domain-charging': {
    dept: '督导检查科',
    checklists: [
      { name: '消防安全日常检查表', frequency: '每月检查1次', checklistType: 'system', person: '张伟', dept: '安全监管和执法科', enabled: true },
      { name: '电气安全检查表', frequency: '每季度检查1次', checklistType: 'system', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '充电设施每日巡检表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '充电站周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '充电场所年度综合评估表', frequency: '每年检查1次', checklistType: 'custom', person: '陈敏', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-commercial': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '安全监管和执法科', enabled: true },
      { name: '商户每日安全巡检表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '商业综合体周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '电梯及特种设备季度检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '商业综合体年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-property': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '张伟', dept: '安全监管和执法科', enabled: true },
      { name: '电梯安全检查表', frequency: '每季度检查1次', checklistType: 'system', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '物业每日安全巡检表', frequency: '每日检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true },
      { name: '小区周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '物业年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-highrise': {
    checklists: [
      { name: '高层建筑消防检查表', frequency: '每月检查1次', checklistType: 'system', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '避难层安全检查表', frequency: '每季度检查1次', checklistType: 'system', person: '李娜', dept: '防灾减灾科', enabled: true },
      { name: '高层建筑每日巡检表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '高层建筑周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '超高层建筑年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '陈敏', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-civilized': {
    checklists: [
      { name: '文明施工检查表', frequency: '每周检查1次', checklistType: 'system', person: '刘洋', dept: '危化品监管和执法科', enabled: true },
      { name: '扬尘治理检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '危化品监管和执法科', enabled: true },
      { name: '工地每日安全巡查表', frequency: '每日检查1次', checklistType: 'custom', person: '陈敏', dept: '危化品监管和执法科', enabled: true },
      { name: '文明施工季度专项检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '刘洋', dept: '危化品监管和执法科', enabled: true },
      { name: '文明施工年度综合评估表', frequency: '每年检查1次', checklistType: 'custom', person: '王强', dept: '危化品监管和执法科', enabled: true }
    ]
  },
  'domain-small-shop': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '张伟', dept: '安全监管和执法科', enabled: true },
      { name: '经营场所每日巡查表', frequency: '每日检查1次', checklistType: 'system', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '商场周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true },
      { name: '商户季度合规检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '商场年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-gasfood': {
    checklists: [
      { name: '燃气安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '安全监管和执法科', enabled: true },
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '燃气设施每日巡检表', frequency: '每日检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '餐饮场所周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '刘洋', dept: '督导检查科', enabled: true },
      { name: '燃气安全年度检测表', frequency: '每年检查1次', checklistType: 'custom', person: '陈敏', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-beauty': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '李娜', dept: '安全监管和执法科', enabled: true },
      { name: '场所每日安全巡查表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '美容场所周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true },
      { name: '卫生及设施季度检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '小美容休闲年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-elecfood': {
    checklists: [
      { name: '用电安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '张伟', dept: '安全监管和执法科', enabled: true },
      { name: '餐饮场所每日用电巡检表', frequency: '每日检查1次', checklistType: 'system', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '餐饮用电周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true },
      { name: '电气线路季度检测表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '餐饮用电年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-cybercafe': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '刘洋', dept: '安全监管和执法科', enabled: true },
      { name: '网吧每日安全巡查表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '网吧周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '网络安全季度检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '网吧年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '刘洋', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-store': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '安全监管和执法科', enabled: true },
      { name: '门店每日安全巡查表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '门店周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '门店季度合规检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '小门店年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-school': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '李娜', dept: '安全监管和执法科', enabled: true },
      { name: '食品安全检查表', frequency: '每季度检查1次', checklistType: 'system', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '校园每日安全巡查表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '学校周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '学校年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-multi': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '刘洋', dept: '督导检查科', enabled: true },
      { name: '多业态场所每日巡查表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '多业态场所周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '多业态季度综合检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '多业态场所年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '刘洋', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-clinic': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '督导检查科', enabled: true },
      { name: '医疗废物处置检查表', frequency: '每季度检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '医疗机构每日安全巡查表', frequency: '每日检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '医疗场所周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '医疗机构年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-entertain': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '应急疏散检查表', frequency: '每季度检查1次', checklistType: 'system', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '娱乐场所每日安全巡查表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '娱乐场所周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '娱乐场所年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-produce': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '刘洋', dept: '督导检查科', enabled: true },
      { name: '生产安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '督导检查科', enabled: true },
      { name: '生产加工场所每日巡查表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '生产加工周安全检查表', frequency: '每周检查1次', checklistType: 'custom', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '生产安全季度专项检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '综合协调科', enabled: true },
      { name: '生产加工企业年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '刘洋', dept: '区三防办', enabled: true }
    ]
  },
  'domain-small-hotel': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '督导检查科', enabled: true },
      { name: '旅店每日安全巡查表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '督导检查科', enabled: true },
      { name: '旅店周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '旅店季度卫生及消防检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '督导检查科', enabled: true },
      { name: '旅店年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-small-playground': {
    checklists: [
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '李娜', dept: '督导检查科', enabled: true },
      { name: '设施安全检查表', frequency: '每季度检查1次', checklistType: 'system', person: '陈敏', dept: '防灾减灾科', enabled: true },
      { name: '游乐设施每日安全检查表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '游乐场周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '督导检查科', enabled: true },
      { name: '游乐场年度安全检测表', frequency: '每年检查1次', checklistType: 'custom', person: '李娜', dept: '防灾减灾科', enabled: true }
    ]
  },
  'domain-house-build': {
    checklists: [
      { name: '建筑施工安全检查表', frequency: '每周检查1次', checklistType: 'system', person: '陈敏', dept: '危化品监管和执法科', enabled: true },
      { name: '高处作业检查表', frequency: '每月检查1次', checklistType: 'system', person: '刘洋', dept: '危化品监管和执法科', enabled: true },
      { name: '临时用电检查表', frequency: '每月检查1次', checklistType: 'custom', person: '王强', dept: '危化品监管和执法科', enabled: true },
      { name: '施工现场每日安全巡检表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '危化品监管和执法科', enabled: true },
      { name: '建筑施工季度综合检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '危化品监管和执法科', enabled: true },
      { name: '建筑工程年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '刘洋', dept: '危化品监管和执法科', enabled: true }
    ]
  },
  'domain-persuade': {
    checklists: [
      { name: '交通安全劝导检查表', frequency: '每周检查1次', checklistType: 'system', person: '刘洋', dept: '综合协调科', enabled: true },
      { name: '劝导点位每日安全巡查表', frequency: '每日检查1次', checklistType: 'system', person: '张伟', dept: '综合协调科', enabled: true },
      { name: '劝导路口月度安全检查表', frequency: '每月检查1次', checklistType: 'custom', person: '王强', dept: '综合协调科', enabled: true },
      { name: '劝导路口季度专项检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '李娜', dept: '综合协调科', enabled: true },
      { name: '交通安全劝导年度评估表', frequency: '每年检查1次', checklistType: 'custom', person: '刘洋', dept: '综合协调科', enabled: true }
    ]
  },
  'domain-gas-station': {
    checklists: [
      { name: '加油站安全检查表', frequency: '每周检查1次', checklistType: 'system', person: '张伟', dept: '危化品监管和执法科', enabled: true },
      { name: '消防安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '李娜', dept: '危化品监管和执法科', enabled: true },
      { name: '加油站每日安全巡检表', frequency: '每日检查1次', checklistType: 'custom', person: '王强', dept: '危化品监管和执法科', enabled: true },
      { name: '加油站季度综合检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '危化品监管和执法科', enabled: true },
      { name: '加油站年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '张伟', dept: '危化品监管和执法科', enabled: true }
    ]
  },
  'domain-pharma': {
    checklists: [
      { name: '医药化工安全检查表', frequency: '每月检查1次', checklistType: 'system', person: '张伟', dept: '危化品监管和执法科', enabled: true },
      { name: '医药化工每日安全巡检表', frequency: '每日检查1次', checklistType: 'system', person: '李娜', dept: '危化品监管和执法科', enabled: true },
      { name: '医药化工周安全巡查表', frequency: '每周检查1次', checklistType: 'custom', person: '王强', dept: '危化品监管和执法科', enabled: true },
      { name: '医药化工季度专项检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '陈敏', dept: '危化品监管和执法科', enabled: true },
      { name: '医药化工年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '张伟', dept: '危化品监管和执法科', enabled: true }
    ]
  },
  'domain-slope': {
    dept: '防灾减灾科',
    checklists: [
      { name: '边坡安全巡查表', frequency: '每周检查1次', checklistType: 'system', person: '刘洋', dept: '综合协调科', enabled: true },
      { name: '雨季专项检查表', frequency: '每月检查1次', checklistType: 'system', person: '王强', dept: '防灾减灾科', enabled: true },
      { name: '边坡每日安全巡查表', frequency: '每日检查1次', checklistType: 'custom', person: '张伟', dept: '区三防办', enabled: true },
      { name: '边坡季度地质灾害检查表', frequency: '每季度检查1次', checklistType: 'custom', person: '李娜', dept: '防灾减灾科', enabled: true },
      { name: '边坡年度安全评估表', frequency: '每年检查1次', checklistType: 'custom', person: '刘洋', dept: '区三防办', enabled: true }
    ]
  }
};
