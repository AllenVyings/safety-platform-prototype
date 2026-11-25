/**
 * 检查项与法规共用数据。超管端检查项库（checklist-lib）、隐患库（hazard-lib）与
 * 移动端现场录入（check-execute）读取同一份。
 * 第四期（方案 4.8）从 hazard-lib-data.js 拆出：隐患↔检查项关联双向读写同一份数据。
 */
var CHECKLIB_ITEMS = [
  { id: 'CI001', name: '消防通道是否畅通', category: '基础设施', type: '常规项', status: '启用', industries: ['COMM'], regs: ['R2'] },
  { id: 'CI002', name: '灭火器压力是否正常', category: '基础设施', type: '常规项', status: '启用', industries: ['COMM'], regs: ['R4'] },
  { id: 'CI003', name: '应急照明是否完好', category: '基础设施', type: '重点项', status: '启用', industries: ['COMM'], regs: ['R1'] },
  { id: 'CI004', name: '配电箱是否有警示标识', category: '电气安全', type: '常规项', status: '停用', industries: ['COMM'], regs: ['R1'] },
  { id: 'CI005', name: '接地保护是否有效', category: '电气安全', type: '常规项', status: '启用', industries: ['CHEM'], regs: ['R6'] },
  { id: 'CI006', name: '安全出口标识是否清晰', category: '基础设施', type: '重点项', status: '启用', industries: ['COMM'], regs: ['R1'] },
  { id: 'CI007', name: '电缆线路是否规范敷设', category: '电气安全', type: '重点项', status: '启用', industries: ['CONS'], regs: ['R1'] },
  { id: 'CI008', name: '应急预案是否制定并演练', category: '运营管理', type: '重点项', status: '启用', industries: ['COMM'], regs: ['R1'] },
  { id: 'CI009', name: '可燃气体报警器是否安装', category: '设备设施', type: '重点项', status: '启用', industries: ['COMM'], regs: ['R5'] },
  { id: 'CI010', name: '动火作业是否审批', category: '特殊作业', type: '重点项', status: '启用', industries: ['CHEM', 'CONS'], regs: ['R3'] },
  { id: 'CI011', name: '临边洞口防护是否到位', category: '特殊作业', type: '重点项', status: '启用', industries: ['CONS'], regs: ['R7'] },
  { id: 'CI012', name: '危化品是否分类存放', category: '危化品使用', type: '重点项', status: '启用', industries: ['CHEM'], regs: ['R3'] },
  { id: 'CI013', name: '疏散指示标志是否完好', category: '基础设施', type: '常规项', status: '启用', industries: ['COMM'], regs: ['R1'] },
  { id: 'CI014', name: '火灾报警是否在用', category: '设备设施', type: '重点项', status: '启用', industries: ['COMM'], regs: ['R1'] },
  { id: 'CI015', name: '排水沟是否畅通', category: '现场环境', type: '常规项', status: '启用', industries: ['OTH'], regs: ['R8'] },
  { id: 'CI016', name: '信号灯是否正常', category: '设备设施', type: '常规项', status: '启用', industries: ['TRANS'], regs: ['R9'] },
  { id: 'CI017', name: '围挡是否完好', category: '现场环境', type: '常规项', status: '启用', industries: ['COMM'], regs: ['R7'] }
];

var CHECKLIB_REGS = [
  { id: 'R1', law: '消防法', no: '第十六条', title: '单位消防安全职责' },
  { id: 'R2', law: '消防法', no: '第二十八条', title: '疏散通道和安全出口' },
  { id: 'R3', law: '危险化学品安全管理条例', no: '第二十条', title: '动火和储存' },
  { id: 'R4', law: '建筑灭火器配置验收及检查规范', no: '5.2', title: '灭火器检查' },
  { id: 'R5', law: '城镇燃气管理条例', no: '第二十八条', title: '燃气安全装置' },
  { id: 'R6', law: '汽车加油加气站设计与施工规范', no: '11.2', title: '防静电' },
  { id: 'R7', law: '建筑施工高处作业安全技术规范', no: '4.1', title: '临边防护' },
  { id: 'R8', law: '地质灾害防治条例', no: '第十九条', title: '监测与巡查' },
  { id: 'R9', law: '道路交通安全法', no: '第二十五条', title: '交通信号' }
];

/* 检查表清单（隐患库"被 N 个检查表引用"派生用；检查项库 checklist-lib.html 本地另有同名数据） */
var CHECKLIST_TABLES = [
  { id: 'CL001', name: '生产车间通用检查表', domain: '生产车间', supervisor: '区消防大队', items: 15, status: '启用', updateTime: '2026-04-20' },
  { id: 'CL002', name: '充换电设施日常检查表', domain: '充换电设施', supervisor: '区安监局', items: 12, status: '启用', updateTime: '2026-04-19' },
  { id: 'CL003', name: '建筑施工现场安全检查表', domain: '建筑施工现场', supervisor: '区住建局', items: 18, status: '启用', updateTime: '2026-04-18' },
  { id: 'CL004', name: '道路运输企业检查表', domain: '道路运输', supervisor: '区交通局', items: 10, status: '启用', updateTime: '2026-04-17' },
  { id: 'CL005', name: '危险化学品仓储检查表', domain: '危险化学品仓储', supervisor: '区应急局', items: 23, status: '启用', updateTime: '2026-04-16' },
  { id: 'CL006', name: '大型展会安全检查表', domain: '大型展会', supervisor: '区文旅局', items: 16, status: '停用', updateTime: '2026-04-15' },
  { id: 'CL007', name: '污水处理厂检查表', domain: '污水处理厂', supervisor: '区环保局', items: 14, status: '启用', updateTime: '2026-04-14' },
  { id: 'CL008', name: '化工企业综合检查表', domain: '化工', supervisor: '区应急局', items: 28, status: '启用', updateTime: '2026-04-13' }
];

/* 第四期 4.7：隐患被 N 个检查表引用（确定性派生，FNV-1a 哈希保证刷新稳定） */
function hashStr4(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 0x01000193) >>> 0; }
  return h;
}
function checklistsOfHazard(hzId) {
  var n = hashStr4(hzId) % 4; // 0~3 张检查表引用
  if (!n) return [];
  var all = CHECKLIST_TABLES.slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; });
  var start = hashStr4(hzId + '#start') % all.length;
  var out = [];
  for (var i = 0; i < n; i++) out.push(all[(start + i) % all.length]);
  return out;
}
