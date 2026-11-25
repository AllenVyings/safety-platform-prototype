/**
 * 隐患库共用数据。超管端隐患库与移动端现场录入读取同一份。
 * 第四期（方案 4.8）：检查项与法规抽到 js/checklist-data.js，本文件仅保留隐患本体；
 * 检查项库与隐患库通过 checkItems 双向读写同一份关联数据。
 * 消防设施检查→CI002/CI003/CI014，安全出口检查→CI001/CI006，电气线路检查→CI005，
 * 灭火器检查→CI002，安全标识检查→CI013/CI006（移动端 check-execute 对应关系）。
 */
var HAZARD_CATEGORIES = ['现场环境', '标志标线', '电气线路', '设备设施', '危化品使用', '特殊作业', '应急处置', '从业人员', '疏散通道'];
var SUGGEST_DAYS = { '一般隐患': 15, '重大隐患': 3 };

var HAZARD_LIB = [
  { id: 'HZ001', name: '商业综合体疏散通道被堵塞', alias: '消防通道堵塞', category: '疏散通道', level: '重大隐患', domains: ['商业综合体'], desc: '疏散通道堆放货物，火灾时人员无法撤离。', suggestion: '立即清理通道并设置禁放标识。', checkItems: ['CI001'], regulations: ['R2'], status: '启用', updateTime: '2026-11-10 09:20' },
  { id: 'HZ002', name: '商业综合体安全出口上锁', alias: '', category: '疏散通道', level: '重大隐患', domains: ['商业综合体'], desc: '安全出口在营业时段上锁。', suggestion: '拆除锁具，改为推闩式逃生门。', checkItems: ['CI006'], regulations: ['R2'], status: '启用', updateTime: '2026-11-09 14:10' },
  { id: 'HZ003', name: '物业小区电动自行车违规进楼充电', alias: '飞线充电', category: '现场环境', level: '重大隐患', domains: ['物业小区'], desc: '电动自行车在楼道、门厅充电。', suggestion: '引导至集中充电场所，楼道禁止停放充电。', checkItems: ['CI001'], regulations: ['R2'], status: '启用', updateTime: '2026-11-08 11:00' },
  { id: 'HZ004', name: '充电场所未设置自动灭火装置', alias: '灭火装置、灭火器', category: '设备设施', level: '重大隐患', domains: ['电动自行车充电场所'], desc: '集中充电棚未安装自动灭火或断电保护。', suggestion: '加装热感断电与简易喷淋。', checkItems: ['CI002'], regulations: ['R4'], status: '启用', updateTime: '2026-11-08 16:40' },
  { id: 'HZ005', name: '超高层建筑避难层堆放杂物', alias: '', category: '疏散通道', level: '重大隐患', domains: ['超高层建筑'], desc: '避难层被改作仓库。', suggestion: '清空避难层并恢复避难功能。', checkItems: ['CI001'], regulations: ['R2'], status: '启用', updateTime: '2026-11-07 10:15' },
  { id: 'HZ006', name: '超高层消防电梯迫降功能失效', alias: '', category: '设备设施', level: '重大隐患', domains: ['超高层建筑'], desc: '消防电梯不能迫降至首层。', suggestion: '立即检修联动控制，停用期间安排人工值守。', checkItems: ['CI003'], regulations: ['R1'], status: '启用', updateTime: '2026-11-07 15:30' },
  { id: 'HZ007', name: '小餐饮未安装燃气报警器', alias: '燃气报警', category: '设备设施', level: '重大隐患', domains: ['"三小"场所（小餐饮（燃气））'], desc: '使用燃气的小餐饮未安装可燃气体报警器。', suggestion: '安装报警器并定期检定。', checkItems: ['CI009'], regulations: ['R5'], status: '启用', updateTime: '2026-11-06 09:50' },
  { id: 'HZ008', name: '小餐饮灭火器压力不足', alias: '灭火筒、干粉灭火器', category: '设备设施', level: '一般隐患', domains: ['"三小"场所（小餐饮（仅用电））'], desc: '灭火器压力表指针处于红区。', suggestion: '送检或更换灭火器。', checkItems: ['CI002'], regulations: ['R4'], status: '停用', updateTime: '2026-11-05 13:20' },
  { id: 'HZ009', name: '小商店疏散指示标志缺失', alias: '', category: '标志标线', level: '一般隐患', domains: ['"三小"场所（小商店—商场、市场、商店等）'], desc: '出口方向无疏散指示。', suggestion: '按疏散路径补设指示标志。', checkItems: ['CI013'], regulations: ['R1'], status: '启用', updateTime: '2026-11-05 17:05' },
  { id: 'HZ010', name: '小歌舞娱乐场所安全出口不足', alias: '', category: '疏散通道', level: '重大隐患', domains: ['"三小"场所（小歌舞娱乐—小ktv、酒吧、密室逃脱、剧本杀等）'], desc: '营业时仅一个出口可用。', suggestion: '恢复全部安全出口并保持畅通。', checkItems: ['CI006'], regulations: ['R1'], status: '启用', updateTime: '2026-11-04 20:10' },
  { id: 'HZ011', name: '加油站静电接地失效', alias: '', category: '电气线路', level: '重大隐患', domains: ['加油站'], desc: '卸油静电夹电阻超标。', suggestion: '停止卸油，修复接地并复测。', checkItems: ['CI005'], regulations: ['R6'], status: '启用', updateTime: '2026-11-04 11:40' },
  { id: 'HZ012', name: '加油站卸油区动火作业', alias: '', category: '特殊作业', level: '重大隐患', domains: ['加油站'], desc: '卸油区进行焊接，未办理动火票。', suggestion: '立即停止动火，清空油气后再按规定审批。', checkItems: ['CI010'], regulations: ['R3'], status: '启用', updateTime: '2026-11-03 09:30' },
  { id: 'HZ013', name: '医药化工危化品未分类存放', alias: '', category: '危化品使用', level: '重大隐患', domains: ['医药化工'], desc: '氧化剂与易燃液体混存。', suggestion: '按化学品相容性重新分区存放。', checkItems: ['CI012'], regulations: ['R3'], status: '启用', updateTime: '2026-11-03 15:00' },
  { id: 'HZ014', name: '危化场所动火未审批', alias: '', category: '特殊作业', level: '重大隐患', domains: ['加油站', '医药化工'], desc: '危险化学品场所动火作业未经审批。', suggestion: '建立动火审批，未审批不得作业。', checkItems: ['CI010'], regulations: ['R3'], status: '启用', updateTime: '2026-11-02 10:25' },
  { id: 'HZ015', name: '房屋建设工程临边洞口无防护', alias: '', category: '特殊作业', level: '重大隐患', domains: ['房屋建设工程'], desc: '楼层临边和电梯井口无防护栏。', suggestion: '立即搭设防护栏杆并挂警示。', checkItems: ['CI011'], regulations: ['R7'], status: '启用', updateTime: '2026-11-02 08:40' },
  { id: 'HZ016', name: '脚手架连墙件缺失', alias: '', category: '特殊作业', level: '重大隐患', domains: ['房屋建设工程'], desc: '外脚手架连墙件数量不足。', suggestion: '停工补设连墙件并验收。', checkItems: ['CI011'], regulations: ['R7'], status: '启用', updateTime: '2026-11-01 16:15' },
  { id: 'HZ017', name: '劝导路口信号灯故障', alias: '', category: '电气线路', level: '一般隐患', domains: ['劝导路口'], desc: '信号灯长期不亮，劝导员无替代措施。', suggestion: '报修信号灯，故障期间安排人工指挥。', checkItems: ['CI016'], regulations: ['R9'], status: '启用', updateTime: '2026-10-30 07:50' },
  { id: 'HZ018', name: '危险边坡排水沟堵塞', alias: '', category: '现场环境', level: '一般隐患', domains: ['危险边坡'], desc: '坡顶排水沟被泥土堵塞。', suggestion: '清淤并在雨季前巡查。', checkItems: ['CI015'], regulations: ['R8'], status: '启用', updateTime: '2026-10-28 14:00' },
  { id: 'HZ019', name: '重点边坡监测点损坏', alias: '', category: '设备设施', level: '重大隐患', domains: ['危险边坡（重点边坡）'], desc: '位移监测点损坏，无法采集数据。', suggestion: '修复监测点，损坏期间人工加密巡查。', checkItems: ['CI015'], regulations: ['R8'], status: '启用', updateTime: '2026-10-27 09:10' },
  { id: 'HZ020', name: '文明施工围挡破损', alias: '', category: '现场环境', level: '一般隐患', domains: ['文明施工'], desc: '施工围挡倾倒、缺口未封闭。', suggestion: '修复围挡并设置夜间警示。', checkItems: ['CI017'], regulations: ['R7'], status: '启用', updateTime: '2026-10-26 18:20' },
  { id: 'HZ021', name: '小旅店消防设施停用', alias: '火灾报警停用', category: '应急处置', level: '重大隐患', domains: ['"三小"场所（小旅店—群租房、公寓、民宿等）'], desc: '客房区火灾自动报警停用。', suggestion: '立即修复报警系统，停用期间专人巡查。', checkItems: ['CI014'], regulations: ['R1'], status: '启用', updateTime: '2026-10-25 21:30' }
];

/* 兼容别名：既有页面（hazard-lib.html、check-execute.html）按 CHECK_ITEMS/REG_DATA 引用 */
var CHECK_ITEMS = CHECKLIB_ITEMS;
var REG_DATA = CHECKLIB_REGS;
