/**
 * 项目信息管理 — 共享数据源
 * 供超管端 project-manage.html、政府端 project-manage.html、政府端 task-manage.html 共同引用
 * 单一数据源，确保项目数据一致
 */

'use strict';

var _pid = 100;
function _pidGen() { return 'p' + (_pid++); }

var SHARED_PROJECT_DATA = [
  {id:_pidGen(),projectNo:'2024-001',projectName:'XX大厦建设工程',projectCategory:'1',domainId:'d1',domainCode:'CONS-BUILD',domainName:'房屋建设工程',projectType:'主体',projectStatus:'2',streetCode:'440305007',streetName:'粤海街道',communityCode:'440305007008',communityName:'科技园社区',gridCode:'440305007008001',gridName:'科技园01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区科技园南路88号',supervisionGroupId:'1',supervisionGroupName:'第一督导组',description:'高层商业综合体建设项目',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX建设集团',creditCode:'91440300MA5EX01',contactName:'张三',contactPhone:'13800138001'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX建筑工程有限公司',creditCode:'91440300MA5EX02',contactName:'李四',contactPhone:'13900139001'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX监理咨询有限公司',creditCode:'91440300MA5EX03',contactName:'王五',contactPhone:'13700137001'}
  ],loginAccount:'project_001',safetyCode:'P202401001',codeColor:'green',createTime:'2024-01-15'},
  {id:_pidGen(),projectNo:'2024-002',projectName:'XX地铁站改造工程',projectCategory:'1',domainId:'d2',domainCode:'CONS-CIVIL',domainName:'市政工程',projectType:'隧道',projectStatus:'2',streetCode:'440305001',streetName:'南山街道',communityCode:'440305001008',communityName:'南山社区',gridCode:'440305001008001',gridName:'南山01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区南山大道与创业路交汇处',supervisionGroupId:'2',supervisionGroupName:'第二督导组',description:'地铁站点扩容改造项目',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX地铁集团',creditCode:'91440300MA5EX04',contactName:'赵六',contactPhone:'13800138002'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX隧道工程有限公司',creditCode:'91440300MA5EX05',contactName:'钱七',contactPhone:'13900139002'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX市政监理公司',creditCode:'91440300MA5EX06',contactName:'孙八',contactPhone:'13700137002'}
  ],loginAccount:'project_002',safetyCode:'P202402001',codeColor:'green',createTime:'2024-02-20'},
  {id:_pidGen(),projectNo:'2024-003',projectName:'XX高速公路扩建段',projectCategory:'1',domainId:'d3',domainCode:'CONS-TRANS',domainName:'公路工程',projectType:'路面',projectStatus:'3',streetCode:'440305003',streetName:'西丽街道',communityCode:'440305003009',communityName:'西丽社区',gridCode:'440305003009001',gridName:'西丽01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区深汕公路K25-K30段',supervisionGroupId:'3',supervisionGroupName:'第三督导组',description:'双向四车道扩建为六车道',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX交通投资集团',creditCode:'91440300MA5EX07',contactName:'周九',contactPhone:'13800138003'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX公路工程有限公司',creditCode:'91440300MA5EX08',contactName:'吴十',contactPhone:'13900139003'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX交通监理公司',creditCode:'91440300MA5EX09',contactName:'郑十一',contactPhone:'13700137003'}
  ],loginAccount:'project_003',safetyCode:'P202403001',codeColor:'yellow',createTime:'2024-03-10'},
  {id:_pidGen(),projectNo:'2024-004',projectName:'XX水库除险加固工程',projectCategory:'1',domainId:'d4',domainCode:'CONS-CIVIL',domainName:'水利工程',projectType:'水库',projectStatus:'1',streetCode:'440305004',streetName:'沙河街道',communityCode:'440305004008',communityName:'沙河街社区',gridCode:'440305004008001',gridName:'沙河街01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区沙河街道XX水库',supervisionGroupId:'1',supervisionGroupName:'第一督导组',description:'水库大坝除险加固及配套设施改造',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX水务集团',creditCode:'91440300MA5EX10',contactName:'王十二',contactPhone:'13800138004'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX水利工程有限公司',creditCode:'91440300MA5EX11',contactName:'李十三',contactPhone:'13900139004'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX水利监理公司',creditCode:'91440300MA5EX12',contactName:'张十四',contactPhone:'13700137004'}
  ],loginAccount:'project_004',safetyCode:'P202404001',codeColor:'green',createTime:'2024-04-05'},
  {id:_pidGen(),projectNo:'2024-005',projectName:'XX商业广场装修工程',projectCategory:'1',domainId:'d1',domainCode:'CONS-BUILD',domainName:'房屋建设工程',projectType:'装饰装修',projectStatus:'4',streetCode:'440305002',streetName:'南头街道',communityCode:'440305002008',communityName:'南头城社区',gridCode:'440305002008001',gridName:'南头城01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区海岸城购物中心',supervisionGroupId:'2',supervisionGroupName:'第二督导组',description:'商场内部整体装修升级',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX商业管理有限公司',creditCode:'91440300MA5EX13',contactName:'刘十五',contactPhone:'13800138005'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX装饰工程有限公司',creditCode:'91440300MA5EX14',contactName:'陈十六',contactPhone:'13900139005'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX装饰监理公司',creditCode:'91440300MA5EX15',contactName:'杨十七',contactPhone:'13700137005'}
  ],loginAccount:'project_005',safetyCode:'P202405001',codeColor:'green',createTime:'2024-05-12'},
  {id:_pidGen(),projectNo:'2024-006',projectName:'XX市政道路新建工程',projectCategory:'1',domainId:'d2',domainCode:'CONS-CIVIL',domainName:'市政工程',projectType:'道路',projectStatus:'2',streetCode:'440305006',streetName:'招商街道',communityCode:'440305006003',communityName:'海月社区',gridCode:'440305006003001',gridName:'海月01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区招商街道海月大道',supervisionGroupId:'3',supervisionGroupName:'第三督导组',description:'城市主干道新建及配套设施',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX市政建设集团',creditCode:'91440300MA5EX16',contactName:'黄十八',contactPhone:'13800138006'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX市政工程有限公司',creditCode:'91440300MA5EX17',contactName:'林十九',contactPhone:'13900139006'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX市政监理公司',creditCode:'91440300MA5EX18',contactName:'何二十',contactPhone:'13700137006'}
  ],loginAccount:'project_006',safetyCode:'P202406001',codeColor:'green',createTime:'2024-06-18'},
  {id:_pidGen(),projectNo:'2024-007',projectName:'XX桥梁加固维修工程',projectCategory:'1',domainId:'d2',domainCode:'CONS-CIVIL',domainName:'市政工程',projectType:'桥梁',projectStatus:'3',streetCode:'440305005',streetName:'蛇口街道',communityCode:'440305005007',communityName:'深圳湾社区',gridCode:'440305005007001',gridName:'深圳湾01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区蛇口街道深圳湾大桥',supervisionGroupId:'1',supervisionGroupName:'第一督导组',description:'老旧桥梁结构加固及桥面翻新',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX桥梁管理所',creditCode:'91440300MA5EX19',contactName:'罗二十一',contactPhone:'13800138007'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX桥梁工程有限公司',creditCode:'91440300MA5EX20',contactName:'高二十二',contactPhone:'13900139007'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX桥梁监理公司',creditCode:'91440300MA5EX21',contactName:'马二十三',contactPhone:'13700137007'}
  ],loginAccount:'project_007',safetyCode:'P202407001',codeColor:'red',createTime:'2024-07-22'},
  {id:_pidGen(),projectNo:'2024-008',projectName:'XX住宅小区建设项目',projectCategory:'1',domainId:'d1',domainCode:'CONS-BUILD',domainName:'房屋建设工程',projectType:'总包',projectStatus:'2',streetCode:'440305008',streetName:'桃源街道',communityCode:'440305008009',communityName:'桃源社区',gridCode:'440305008009001',gridName:'桃源01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区桃源街道XX路',supervisionGroupId:'2',supervisionGroupName:'第二督导组',description:'高层住宅及配套设施建设',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX房地产开发有限公司',creditCode:'91440300MA5EX22',contactName:'朱二十四',contactPhone:'13800138008'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX建设集团有限公司',creditCode:'91440300MA5EX23',contactName:'徐二十五',contactPhone:'13900139008'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX工程监理公司',creditCode:'91440300MA5EX24',contactName:'胡二十六',contactPhone:'13700137008'}
  ],loginAccount:'project_008',safetyCode:'P202408001',codeColor:'green',createTime:'2024-08-30'},
  {id:_pidGen(),projectNo:'2024-009',projectName:'XX河道整治工程',projectCategory:'1',domainId:'d4',domainCode:'CONS-CIVIL',domainName:'水利工程',projectType:'河道整治',projectStatus:'1',streetCode:'440305007',streetName:'粤海街道',communityCode:'440305007004',communityName:'大冲社区',gridCode:'440305007004001',gridName:'大冲01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区大沙河下游段',supervisionGroupId:'3',supervisionGroupName:'第三督导组',description:'河道清淤、护岸及生态修复',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX水务局',creditCode:'91440300MA5EX25',contactName:'郭二十七',contactPhone:'13800138009'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX河道工程有限公司',creditCode:'91440300MA5EX26',contactName:'梁二十八',contactPhone:'13900139009'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX水利监理公司',creditCode:'91440300MA5EX27',contactName:'宋二十九',contactPhone:'13700137009'}
  ],loginAccount:'project_009',safetyCode:'P202409001',codeColor:'yellow',createTime:'2024-09-15'},
  {id:_pidGen(),projectNo:'2024-010',projectName:'XX交通枢纽配套工程',projectCategory:'1',domainId:'d2',domainCode:'CONS-CIVIL',domainName:'市政工程',projectType:'管网',projectStatus:'2',streetCode:'440305003',streetName:'西丽街道',communityCode:'440305003007',communityName:'松坪山社区',gridCode:'440305003007001',gridName:'松坪山01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区西丽松坪山路段',supervisionGroupId:'1',supervisionGroupName:'第一督导组',description:'综合管廊及配套设施建设',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX交通建设集团',creditCode:'91440300MA5EX28',contactName:'谢三十',contactPhone:'13800138010'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX管网工程有限公司',creditCode:'91440300MA5EX29',contactName:'韩三十一',contactPhone:'13900139010'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX市政监理公司',creditCode:'91440300MA5EX30',contactName:'冯三十二',contactPhone:'13700137010'}
  ],loginAccount:'project_010',safetyCode:'P202410001',codeColor:'green',createTime:'2024-10-08'},
  {id:_pidGen(),projectNo:'2024-011',projectName:'XX学校改扩建工程',projectCategory:'1',domainId:'d1',domainCode:'CONS-BUILD',domainName:'房屋建设工程',projectType:'二次装修',projectStatus:'2',streetCode:'440305008',streetName:'桃源街道',communityCode:'440305008001',communityName:'大学城社区',gridCode:'440305008001001',gridName:'大学城01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区桃源街道大学城路',supervisionGroupId:'2',supervisionGroupName:'第二督导组',description:'教学楼改扩建及操场翻新',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX教育局',creditCode:'91440300MA5EX31',contactName:'邓三十三',contactPhone:'13800138011'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX教育建设公司',creditCode:'91440300MA5EX32',contactName:'曹三十四',contactPhone:'13900139011'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX教育监理公司',creditCode:'91440300MA5EX33',contactName:'彭三十五',contactPhone:'13700137011'}
  ],loginAccount:'project_011',safetyCode:'P202411001',codeColor:'green',createTime:'2024-11-20'},
  {id:_pidGen(),projectNo:'2024-012',projectName:'XX医院新建大楼工程',projectCategory:'1',domainId:'d1',domainCode:'CONS-BUILD',domainName:'房屋建设工程',projectType:'幕墙',projectStatus:'1',streetCode:'440305004',streetName:'沙河街道',communityCode:'440305004004',communityName:'高发社区',gridCode:'440305004004001',gridName:'高发01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区沙河街道高发路',supervisionGroupId:'3',supervisionGroupName:'第三督导组',description:'综合医疗大楼及附属设施建设',parties:[
    {partyType:1,partyTypeName:'建设单位',partyName:'XX医院',creditCode:'91440300MA5EX34',contactName:'曾三十六',contactPhone:'13800138012'},
    {partyType:2,partyTypeName:'施工单位',partyName:'XX医疗建设公司',creditCode:'91440300MA5EX35',contactName:'肖三十七',contactPhone:'13900139012'},
    {partyType:3,partyTypeName:'监理单位',partyName:'XX医疗监理公司',creditCode:'91440300MA5EX36',contactName:'董三十八',contactPhone:'13700137012'}
  ],loginAccount:'project_012',safetyCode:'P202412001',codeColor:'yellow',createTime:'2024-12-01'},
  // 运营项目示例
  {id:_pidGen(),projectNo:'2025-001',projectName:'XX购物中心运营项目',projectCategory:'2',domainId:'d1',domainCode:'COMM-PROJ',domainName:'房屋建设工程',projectType:'商业综合体',projectStatus:'1',streetCode:'440305007',streetName:'粤海街道',communityCode:'440305007008',communityName:'科技园社区',gridCode:'440305007008001',gridName:'科技园01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区科技园南路88号',supervisionGroupId:'',supervisionGroupName:'',description:'大型商业综合体日常运营管理',parties:[
    {partyType:5,partyTypeName:'运营单位',partyName:'XX商业运营有限公司',creditCode:'91440300MA5EX37',contactName:'陈运营',contactPhone:'13800138013'}
  ],loginAccount:'project_013',safetyCode:'P202501001',codeColor:'green',createTime:'2025-01-15'},
  {id:_pidGen(),projectNo:'2025-002',projectName:'XX工业园区运营项目',projectCategory:'2',domainId:'d1',domainCode:'IND-PROJ',domainName:'房屋建设工程',projectType:'工业园区',projectStatus:'2',streetCode:'440305003',streetName:'西丽街道',communityCode:'440305003010',communityName:'阳光社区',gridCode:'440305003010001',gridName:'阳光01',regionCode:'440305',regionName:'南山区',address:'深圳市南山区西丽街道阳光工业区',supervisionGroupId:'',supervisionGroupName:'',description:'工业园区日常运营管理',parties:[
    {partyType:5,partyTypeName:'运营单位',partyName:'XX工业园区管理有限公司',creditCode:'91440300MA5EX38',contactName:'刘运营',contactPhone:'13800138014'}
  ],loginAccount:'project_014',safetyCode:'P202502001',codeColor:'green',createTime:'2025-02-20'}
];
