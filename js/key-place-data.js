/**
 * 重点场所管理 — 共享数据源
 * 供超管端 key-place.html、政府端 key-place.html、政府端 domain-supervise.html 共同引用
 * 单一数据源，确保三端重点场所数据一致
 */

'use strict';

/* ========== 南山区行政区划数据（区→街道→社区） ========== */
var KEY_PLACE_REGION_TREE = {
  code: '440305',
  name: '南山区',
  streets: [
    { code: '440305001', name: '南头街道', communities: ['南头城社区','马家龙社区','北头社区','向南社区','田厦社区','同乐社区','大汪山社区','大新社区','九街社区','南光社区','龙珠社区','桂庙社区'] },
    { code: '440305002', name: '南山街道', communities: ['南光社区','南山社区','南园社区','北头社区','向南社区','荔湾社区','荔林社区','月亮湾社区','前海社区','南水社区','向南瑞峰社区','大新社区','登良社区','龙瑞社区'] },
    { code: '440305003', name: '沙河街道', communities: ['白石洲社区','沙河社区','侨城北社区','侨城东社区','侨城西社区','侨香社区','光华社区','沙河西社区','新塘社区','燕晗山社区','汉京九榕台社区','沙河天健社区','沙河翰邦社区','光侨社区'] },
    { code: '440305004', name: '蛇口街道', communities: ['南水社区','龟山社区','蛇口社区','后海社区','海昌社区','海湾社区','工业七路社区','花果山社区','湾厦社区','育才社区','渔二社区','龟山一社区','龟山二社区'] },
    { code: '440305005', name: '招商街道', communities: ['鲸山社区','水湾社区','文竹园社区','花园城社区','蛇口社区','南水社区','南光社区','沿山社区','望海社区','招商东角头社区','蛇口工业区社区'] },
    { code: '440305006', name: '粤海街道', communities: ['麻岭社区','大冲社区','科技园社区','科技园东社区','高新区社区','深圳湾社区','后海社区','后海福海社区','后海大新社区','滨海之窗社区','蔚蓝海岸社区','海珠社区','海德社区','海风社区','海月社区','华联社区'] },
    { code: '440305007', name: '桃源街道', communities: ['平山社区','龙珠社区','龙辉社区','光前社区','光华社区','茶光社区','长源社区','金桃园社区','金桂园社区','留仙社区','桃源村社区','大磡社区'] },
    { code: '440305008', name: '西丽街道', communities: ['西丽社区','麻磡社区','大磡社区','白芒社区','大学城社区','九祥岭社区','茶光社区','长岭社区','松坪社区','松坪山社区','西丽湖社区','官龙村社区','新围社区','丽湖社区','南科大社区','长源社区','沙河社区'] },
    { code: '440305009', name: '前海合作区', communities: ['前海合作区社区'] }
  ]
};

/* ========== 关联企业 mock 池 ========== */
var KEY_PLACE_ENTERPRISE_POOL = [
  { id: 'ent_1', name: '深圳创安电子科技有限公司', persons: [{id:'ep_1_1',name:'张伟'},{id:'ep_1_2',name:'李娜'},{id:'ep_1_3',name:'王强'}] },
  { id: 'ent_2', name: '深圳市安全科技集团', persons: [{id:'ep_2_1',name:'刘洋'},{id:'ep_2_2',name:'陈雪'}] },
  { id: 'ent_3', name: '万科物业管理有限公司', persons: [{id:'ep_3_1',name:'赵磊'},{id:'ep_3_2',name:'孙婷'},{id:'ep_3_3',name:'周明'}] },
  { id: 'ent_4', name: '华润置地有限公司', persons: [{id:'ep_4_1',name:'吴芳'},{id:'ep_4_2',name:'郑浩'}] },
  { id: 'ent_5', name: '腾讯科技（深圳）有限公司', persons: [{id:'ep_5_1',name:'冯涛'},{id:'ep_5_2',name:'褚琳'}] },
  { id: 'ent_6', name: '招商蛇口产业园开发有限公司', persons: [{id:'ep_6_1',name:'卫军'},{id:'ep_6_2',name:'蒋玲'}] },
  { id: 'ent_7', name: '前海控股有限公司', persons: [{id:'ep_7_1',name:'沈艳'},{id:'ep_7_2',name:'韩斌'}] },
  { id: 'ent_8', name: '深圳市西丽建设投资有限公司', persons: [{id:'ep_8_1',name:'杨柳'},{id:'ep_8_2',name:'朱锋'}] }
];

/* ========== 政府部门 mock 池 ========== */
var KEY_PLACE_GOV_DEPT_POOL = [
  { id: 'gov_1', name: '南山区应急管理局', persons: [{id:'gp_1_1',name:'廖卫国'},{id:'gp_1_2',name:'蒋晓燕'}] },
  { id: 'gov_2', name: '南山区消防救援大队', persons: [{id:'gp_2_1',name:'范立军'},{id:'gp_2_2',name:'方俊'}] },
  { id: 'gov_3', name: '南山区市场监督管理局', persons: [{id:'gp_3_1',name:'石磊'},{id:'gp_3_2',name:'熊倩'}] }
];

/* ========== 检查表库 ========== */
var KEY_PLACE_CHECKLIST_LIB = [
  { id: 'cl_lib_1', name: '充电桩日常安全检查表', items: [
    { id: 'i1_1', desc: '充电桩本体', contents: [{ name: '外观完好无破损', standard: '无裂纹、无变形' }, { name: '充电接口无松动', standard: '插拔力≤50N' }] },
    { id: 'i1_2', desc: '电气安全', contents: [{ name: '漏电保护器有效', standard: '动作电流≤30mA' }, { name: '接地电阻合格', standard: '≤4Ω' }] }
  ]},
  { id: 'cl_lib_2', name: '消防设施巡查表', items: [
    { id: 'i2_1', desc: '灭火器', contents: [{ name: '压力表在绿区', standard: '1.0~1.4MPa' }, { name: '有效期未过', standard: '5年内' }] },
    { id: 'i2_2', desc: '消防通道', contents: [{ name: '通道畅通无堵塞', standard: '宽度≥1.2m' }] }
  ]},
  { id: 'cl_lib_3', name: '高层建筑外立面检查表', items: [
    { id: 'i3_1', desc: '外墙饰面', contents: [{ name: '无脱落风险', standard: '空鼓率<5%' }, { name: '幕墙胶缝完好', standard: '无开裂' }] }
  ]},
  { id: 'cl_lib_4', name: '边坡稳定性巡查表', items: [
    { id: 'i4_1', desc: '坡体表面', contents: [{ name: '无新增裂缝', standard: '裂缝宽度<2mm' }, { name: '排水沟畅通', standard: '无淤积' }] }
  ]},
  { id: 'cl_lib_5', name: '电气线路检查表', items: [
    { id: 'i5_1', desc: '配电箱', contents: [{ name: '箱体完好上锁', standard: '锁具有效' }, { name: '标识清晰', standard: '回路标识完整' }] },
    { id: 'i5_2', desc: '线缆', contents: [{ name: '无老化破损', standard: '绝缘电阻≥0.5MΩ' }] }
  ]}
];

/* ========== 动态表单 mock 常量 ========== */
var KEY_PLACE_MOCK_ROCK_TYPES = ['砂岩', '泥岩', '花岗岩', '页岩', '石灰岩'];
var KEY_PLACE_MOCK_TREATMENT_STATUSES = ['untreated', 'partial', 'treated'];
var KEY_PLACE_MOCK_THREAT_TARGETS = ['南头城社区老居民点', '南海大道人行路段', '西丽小学周边', '桃源村住宅区', '科技园公交站', '大新社区市场', '沙河街道商铺', '蛇口渔港路'];
var KEY_PLACE_MOCK_DISASTER_TYPES = ['retaining_wall', 'dangerous_slope'];
var KEY_PLACE_MOCK_ADMIN_UNITS = ['南山区城市管理和综合执法局', '南山区住房和建设局', '南山区建筑工务署', '南山区应急管理局', '南山区教育局'];
var KEY_PLACE_MOCK_PERSONS = [
  { name: '廖卫国', phone: '13812340001' }, { name: '蒋晓燕', phone: '13812340002' },
  { name: '范立军', phone: '13812340003' }, { name: '方俊', phone: '13812340004' },
  { name: '石磊', phone: '13812340005' }, { name: '熊倩', phone: '13812340006' },
  { name: '张伟', phone: '13912340001' }, { name: '李娜', phone: '13912340002' },
  { name: '赵磊', phone: '13912340003' }, { name: '孙婷', phone: '13912340004' }
];
var KEY_PLACE_MOCK_PREVENTIONS = [
  '已完成格构梁加固+截排水沟改造，定期巡查中',
  '设置挡土墙+防护网，雨季加密巡查频次',
  '已实施锚杆支护+坡面绿化，安装位移监测点',
  '在建治理工程，预计下月完工，临时设置警戒线',
  '未治理，已列入年度治理计划，汛期每日巡查'
];

/* ========== 辅助函数 ========== */

/**
 * 生成安全码
 */
function keyPlaceGenSafetyCode(districtCode, seq) {
  var code = districtCode || '440305';
  var now = new Date();
  var ym = now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0');
  return 'KP' + code + ym + String(seq).padStart(4, '0');
}

/**
 * 确定性经纬度生成（替换 Math.random()，确保三端一致）
 * 基于 seq/streetIdx/domainIdx 的确定性散列
 */
function keyPlaceGenLngLat(seq, streetIdx, domainIdx) {
  var lng = (113.9 + ((seq * 13 + streetIdx * 7 + domainIdx * 3) % 120) / 1000).toFixed(7);
  var lat = (22.50 + ((seq * 11 + streetIdx * 5 + domainIdx * 2) % 80) / 1000).toFixed(7);
  return { lng: lng, lat: lat };
}

/**
 * 生成动态表单 mock 值
 */
function keyPlaceGenMockExtValues(domain, seq) {
  if (!domain.dynamicFormEnabled) return {};
  var fields = domain.formFields || [];
  var result = {};
  var personPool = KEY_PLACE_MOCK_PERSONS;
  var adminUnit = KEY_PLACE_MOCK_ADMIN_UNITS[seq % KEY_PLACE_MOCK_ADMIN_UNITS.length];
  var adminPerson = personPool[(seq * 2) % personPool.length];
  var techPerson = personPool[(seq * 2 + 1) % personPool.length];
  var patrolPerson = personPool[(seq * 2 + 3) % personPool.length];
  var rockType = KEY_PLACE_MOCK_ROCK_TYPES[seq % KEY_PLACE_MOCK_ROCK_TYPES.length];
  var slopeLen = (25 + (seq % 7) * 8 + (seq % 3) * 2).toFixed(1);
  var slopeHt = (8 + (seq % 5) * 3 + (seq % 2) * 1.5).toFixed(1);
  var slopeAng = (35 + (seq % 6) * 5 + (seq % 4)).toString();
  var treatStatus = KEY_PLACE_MOCK_TREATMENT_STATUSES[seq % KEY_PLACE_MOCK_TREATMENT_STATUSES.length];
  var threatTarget = KEY_PLACE_MOCK_THREAT_TARGETS[seq % KEY_PLACE_MOCK_THREAT_TARGETS.length];
  var riskArea = (50 + (seq % 8) * 30 + (seq % 5) * 10).toString();
  var disasterType = KEY_PLACE_MOCK_DISASTER_TYPES[seq % KEY_PLACE_MOCK_DISASTER_TYPES.length];
  var pointCode = 'NS-SLOPE-' + String(seq + 1).padStart(3, '0');
  var threatPeople = (5 + (seq % 6) * 8 + (seq % 3) * 2).toString();
  var econLoss = (20 + (seq % 7) * 15 + (seq % 4) * 5).toString();
  var prevention = KEY_PLACE_MOCK_PREVENTIONS[seq % KEY_PLACE_MOCK_PREVENTIONS.length];
  var dutyPhone = '0755-' + String(26000000 + seq * 137 % 9000000).padStart(8, '0');

  fields.forEach(function(f) {
    switch (f.fieldKey) {
      case 'rock_type': result[f.fieldKey] = rockType; break;
      case 'slope_length': result[f.fieldKey] = slopeLen; break;
      case 'slope_height': result[f.fieldKey] = slopeHt; break;
      case 'slope_angle': result[f.fieldKey] = slopeAng; break;
      case 'treatment_status': result[f.fieldKey] = treatStatus; break;
      case 'threat_target': result[f.fieldKey] = threatTarget; break;
      case 'risk_area': result[f.fieldKey] = riskArea; break;
      case 'disaster_type': result[f.fieldKey] = disasterType; break;
      case 'point_code': result[f.fieldKey] = pointCode; break;
      case 'threat_people': result[f.fieldKey] = threatPeople; break;
      case 'economic_loss': result[f.fieldKey] = econLoss; break;
      case 'prevention': result[f.fieldKey] = prevention; break;
      case 'admin_unit': result[f.fieldKey] = adminUnit; break;
      case 'duty_phone': result[f.fieldKey] = dutyPhone; break;
      case 'admin_person': result[f.fieldKey] = adminPerson.name; break;
      case 'admin_phone': result[f.fieldKey] = adminPerson.phone; break;
      case 'tech_person': result[f.fieldKey] = techPerson.name; break;
      case 'tech_phone': result[f.fieldKey] = techPerson.phone; break;
      case 'patrol_person': result[f.fieldKey] = patrolPerson.name; break;
      case 'patrol_phone': result[f.fieldKey] = patrolPerson.phone; break;
    }
  });
  return result;
}

/**
 * 核心：初始化重点场所数据
 * @param {Array} domainDataList - mode==='special' 的领域列表
 * @returns {Object} placeData（key=rawDomainId, value=场所数组）
 */
function initKeyPlaceData(domainDataList) {
  var keySiteDomains = domainDataList.filter(function(d) { return d.mode === 'special'; });
  var codeStates = ['red', 'yellow', 'green'];
  var streetWeights = {
    '南山区南头街道办事处': 12, '南山区南山街道办事处': 14, '南山区沙河街道办事处': 14, '南山区蛇口街道办事处': 13,
    '南山区招商街道办事处': 11, '南山区粤海街道办事处': 16, '南山区桃源街道办事处': 12, '南山区西丽街道办事处': 17, '前海合作区': 1
  };
  var REGION_TREE = KEY_PLACE_REGION_TREE;
  var ENTERPRISE_POOL = KEY_PLACE_ENTERPRISE_POOL;
  var GOV_DEPT_POOL = KEY_PLACE_GOV_DEPT_POOL;
  var CHECKLIST_LIB = KEY_PLACE_CHECKLIST_LIB;
  var placeData = {};

  keySiteDomains.forEach(function(domain, domainIdx) {
    var places = [];
    var seq = 1;
    REGION_TREE.streets.forEach(function(street, streetIdx) {
      var weight = streetWeights[street.name] || 1;
      var count = Math.max(1, Math.floor(weight * (0.4 + (domainIdx * 0.18 % 0.5))));
      for (var i = 0; i < count; i++) {
        var community = street.communities[(i + streetIdx) % street.communities.length];
        var codeState = codeStates[(i + streetIdx + domainIdx) % 3];
        var finalCodeState = i % 4 === 0 && codeState === 'red' ? 'green' : codeState;

        // 关联企业（每场所 2 家）—— 边坡类（OTH_001/OTH_002）不生成
        var eTypes = domain.enterprise_types || [{code:'DEFAULT',name:'默认'}];
        var ent1 = ENTERPRISE_POOL[(seq * 3) % ENTERPRISE_POOL.length];
        var ent2 = ENTERPRISE_POOL[(seq * 3 + 2) % ENTERPRISE_POOL.length];
        var isSlopeDomain = (domain.id === 'OTH_001' || domain.id === 'OTH_002');
        var enterprises = isSlopeDomain ? [] : [
          { type_code: eTypes[0].code, type_name: eTypes[0].name, ent_id: ent1.id, ent_name: ent1.name, is_scanner: true, is_hazard_handler: true, is_hazard_reviewer: false },
          { type_code: (eTypes[1] || eTypes[0]).code, type_name: (eTypes[1] || eTypes[0]).name, ent_id: ent2.id, ent_name: ent2.name, is_scanner: true, is_hazard_handler: false, is_hazard_reviewer: true }
        ];

        // 隐患整改/复核人（边坡类无企业，强制走政府人员）
        var handler_type = isSlopeDomain ? 'gov' : ((seq % 2 === 0) ? 'enterprise' : 'gov');
        var handler = handler_type === 'enterprise' ? ent1.persons[0] : GOV_DEPT_POOL[0].persons[0];
        var reviewer_type = isSlopeDomain ? 'gov' : ((seq % 3 === 0) ? 'gov' : 'enterprise');
        var reviewer = reviewer_type === 'enterprise' ? ent2.persons[0] : GOV_DEPT_POOL[1].persons[0];

        // 扫码配置 1~2 行
        var scanConfigs = [
          { resp_type: 'enterprise', resp_id: ent1.id, resp_name: ent1.name, scanner_id: '', scanner_name: '全员', freq: '每1周检查1次', cl_id: 'cl_lib_1', cl_name: CHECKLIST_LIB[seq % CHECKLIST_LIB.length].name, skip_holiday: true }
        ];
        if (seq % 2 === 0) {
          scanConfigs.push({ resp_type: 'gov', resp_id: GOV_DEPT_POOL[0].id, resp_name: GOV_DEPT_POOL[0].name, scanner_id: GOV_DEPT_POOL[0].persons[0].id, scanner_name: GOV_DEPT_POOL[0].persons[0].name, freq: '每1月检查1次', cl_id: 'cl_lib_2', cl_name: '消防设施巡查表', skip_holiday: false });
        }

        // 经纬度（确定性生成）
        var lngLat = keyPlaceGenLngLat(seq, streetIdx, domainIdx);

        places.push({
          id: domain.id + '_KP_' + String(seq).padStart(3, '0'),
          domain_id: domain.id,
          place_name: domain.name + '·' + street.name.replace('街道','').replace('合作区','') + (i + 1) + '号',
          province: '广东省',
          province_code: '440000',
          city: '深圳市',
          city_code: '440300',
          district: '南山区',
          district_code: '440305',
          street: street.name,
          street_code: street.code,
          community: community,
          detail_address: community.replace('社区','') + '路' + (10 + i * 2) + '号',
          longitude: lngLat.lng,
          latitude: lngLat.lat,
          enterprises: enterprises,
          hazard_handler_type: handler_type,
          hazard_handler_id: handler.id,
          hazard_handler_name: handler.name,
          hazard_reviewer_type: reviewer_type,
          hazard_reviewer_id: reviewer.id,
          hazard_reviewer_name: reviewer.name,
          scan_configs: scanConfigs,
          status: seq % 11 === 0 ? '0' : '1',
          safety_code: keyPlaceGenSafetyCode('440305', seq),
          code_state: finalCodeState,
          images: ['mock_img_1.jpg', 'mock_img_2.jpg'],
          ext_values: keyPlaceGenMockExtValues(domain, seq),
          create_time: (function() {
            var dayOfYear = 30 + (seq * 17) % 300;
            var month = Math.min(12, Math.floor(dayOfYear / 28) + 1);
            var day = ((dayOfYear % 28) || 1);
            return '2026-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
          })()
        });
        seq++;
      }
    });
    placeData[domain.id] = places;
  });
  return placeData;
}

/**
 * 适配器：将 placeData 转为 domain-supervise 所需的 OBJECT_DETAILS shape
 * @param {Object} placeDataMap - initKeyPlaceData 返回的 placeData（key=rawDomainId）
 * @param {Object} domainIdMap - rawId → internalId 映射（如 { 'COMM_001': 'domain-charging' }）
 * @returns {Object} 适配后的数据（key=internalId, value=管控对象数组）
 */
function adaptPlaceDataToObjectDetails(placeDataMap, domainIdMap) {
  var result = {};
  Object.keys(placeDataMap).forEach(function(rawDomainId) {
    var internalId = domainIdMap[rawDomainId] || rawDomainId;
    var places = placeDataMap[rawDomainId] || [];
    result[internalId] = places.map(function(p, idx) {
      // 确定性派生 hazards/rate
      var hazards = p.code_state === 'red' ? 2 : p.code_state === 'yellow' ? 1 : 0;
      var rate;
      if (p.code_state === 'green') {
        rate = 85 + (idx % 16); // 85-100
      } else if (p.code_state === 'yellow') {
        rate = 70 + (idx % 15); // 70-84
      } else {
        rate = 40 + (idx % 25); // 40-64
      }
      // person: 优先 hazard_handler_name，fallback 到关联企业第一个人
      var person = p.hazard_handler_name || '';
      if (!person && p.enterprises && p.enterprises.length > 0) {
        var entId = p.enterprises[0].ent_id;
        var ent = KEY_PLACE_ENTERPRISE_POOL.find(function(e) { return e.id === entId; });
        if (ent && ent.persons && ent.persons.length > 0) {
          person = ent.persons[0].name;
        }
      }
      return {
        name: p.place_name,
        type: '重点场所',
        person: person,
        dept: '',
        code: p.code_state,
        hazards: hazards,
        rate: rate
      };
    });
  });
  return result;
}
