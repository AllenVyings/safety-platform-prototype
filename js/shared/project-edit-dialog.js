/**
 * 三端项目信息编辑弹窗。同一套字段和样式，角色只改能不能改。
 * 依赖 district-data.js、domain-data.js，以及页面已加载的 variables.css / framework.css。
 */
(function () {
  'use strict';

  var SUBTYPE_MAP = {
    '房屋建设工程': ['主体工程', '桩基础工程', '总包工程', '二次装修', '装饰装修', '幕墙'],
    '市政工程': ['道路', '桥梁', '隧道', '管网', '绿化'],
    '公路工程': ['路基', '路面', '桥梁', '隧道', '交安设施'],
    '水利工程': ['水库', '堤防', '水闸', '泵站', '河道整治'],
    '文明施工': ['主体工程', '临建工程']
  };
  var STATUS_BUILD = ['未开工', '在建', '停工', '竣工'];
  var STATUS_OP = ['正常运营', '暂停运营', '关闭'];
  var STATUS_CODE_BUILD = { '未开工': '1', '在建': '2', '停工': '3', '竣工': '4' };
  var STATUS_CODE_OP = { '正常运营': '1', '暂停运营': '2', '关闭': '3' };
  var CODE_STATUS_BUILD = { '1': '未开工', '2': '在建', '3': '停工', '4': '竣工' };
  var CODE_STATUS_OP = { '1': '正常运营', '2': '暂停运营', '3': '关闭' };
  var GROUPS = ['第一督导组', '第二督导组', '第三督导组', '第四督导组', '第五督导组'];
  var PIN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#1677ff" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

  var catalog = null;
  var enterprises = null;
  var state = null;
  var built = false;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function toast(msg) {
    var el = document.getElementById('peToast');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.style.opacity = '0'; }, 2200);
  }

  function ensureCatalog() {
    if (catalog) return catalog;
    var list = (typeof DOMAIN_TABLE_DATA !== 'undefined' ? DOMAIN_TABLE_DATA : []).filter(function (d) {
      return d.status === '1';
    }).map(function (d) {
      return { id: d.id, name: d.name, industryName: d.industryName || '其他类', mode: d.mode || 'basic', supervisors: d.supervisors || [] };
    });
    var extras = [
      { id: 'd2', name: '市政工程', industryName: '建设工程类', mode: 'project' },
      { id: 'd3', name: '公路工程', industryName: '建设工程类', mode: 'project' },
      { id: 'd4', name: '水利工程', industryName: '建设工程类', mode: 'project' }
    ];
    extras.forEach(function (ex) {
      if (list.some(function (d) { return d.name === ex.name; })) return;
      var supervisors = [];
      if (typeof domainSupRef === 'function') {
        supervisors = [domainSupRef('industry', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB')];
      }
      list.push({ id: ex.id, name: ex.name, industryName: ex.industryName, mode: ex.mode, supervisors: supervisors });
    });
    catalog = list;
    return catalog;
  }

  function ensureEnterprises() {
    if (enterprises) return enterprises;
    enterprises = [
      { name: 'XX建设集团', credit: '91110000123456789X', district: '南山区' },
      { name: 'XX建筑工程有限公司', credit: '91110000987654321Y', district: '南山区' },
      { name: 'XX监理咨询有限公司', credit: '91110000567890123Z', district: '南山区' },
      { name: 'XX装饰工程有限公司', credit: '91110000345678901A', district: '南山区' },
      { name: 'XX市政工程有限公司', credit: '91110000789012345B', district: '南山区' },
      { name: 'XX物业管理公司', credit: '91110000234567890C', district: '南山区' },
      { name: 'XX交通建设集团', credit: '91110000456789012D', district: '南山区' },
      { name: 'XX水利工程有限公司', credit: '91110000678901234E', district: '南山区' },
      { name: 'XX商业运营有限公司', credit: '91110000345678901J', district: '南山区' },
      { name: 'XX福田建设有限公司', credit: '91440300MA5FT001X', district: '福田区' },
      { name: 'XX罗湖工程有限公司', credit: '91440300MA5LH001Y', district: '罗湖区' }
    ];
    return enterprises;
  }

  function inject() {
    if (built) return;
    built = true;
    var style = document.createElement('style');
    style.textContent = [
      '#peDialog .modal-dialog,#peEntDialog .modal-dialog,#peMapDialog .modal-dialog{width:900px;max-width:calc(100vw - 48px);max-height:85vh;display:flex;flex-direction:column;}',
      '#peDialog .modal-title{font-size:var(--font-size-lg);font-weight:600;color:var(--text-primary);}',
      '#peEntDialog .modal-dialog,#peMapDialog .modal-dialog{width:640px;}',
      '#peDialog .modal-body{overflow-y:auto;flex:1;}',
      '#peDialog .pe-section{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--border-light);}',
      '#peDialog .pe-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}',
      '#peDialog .pe-title{font-size:14px;font-weight:600;color:var(--text-primary);margin:0 0 16px;padding-left:10px;border-left:3px solid var(--primary);line-height:1.4;}',
      '#peDialog .pe-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;}',
      '#peDialog .pe-grid .full{grid-column:1 / -1;}',
      '#peDialog .form-group,#peEntDialog .form-group,#peMapDialog .form-group{display:block !important;flex-direction:column !important;align-items:stretch !important;max-width:none !important;margin:0 !important;flex:none !important;min-width:0 !important;}',
      '#peDialog .form-label{display:block !important;width:auto !important;text-align:left !important;margin:0 0 6px !important;font-size:var(--font-size-sm);color:var(--text-secondary);font-weight:500;}',
      '#peDialog .form-label .required{color:var(--danger);margin-left:4px;}',
      '#peDialog .form-input,#peDialog .form-select,#peDialog .pe-trigger,#peEntDialog .form-input,#peMapDialog .form-input{width:100% !important;flex:none !important;box-sizing:border-box;height:32px;padding:0 12px;border:1px solid var(--border-figma);border-radius:var(--radius-sm);font-size:var(--font-size-md);background:var(--bg-primary);color:var(--text-primary);}',
      '#peDialog textarea.form-input{height:80px;padding:8px 12px;resize:vertical;font-family:inherit;}',
      '#peDialog .form-input:disabled,#peDialog .form-select:disabled,#peDialog .pe-trigger:disabled{background:var(--bg-tertiary);color:var(--text-tertiary);cursor:not-allowed;}',
      '#peDialog .pe-trigger{display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;}',
      '#peDialog .pe-pop{display:none;position:absolute;z-index:30;left:0;top:calc(100% + 4px);background:var(--bg-primary);border:1px solid var(--border-figma);border-radius:var(--radius-md);box-shadow:0 4px 16px rgba(0,0,0,.12);padding:12px;}',
      '#peDialog .pe-pop.open{display:flex;flex-direction:column;}',
      '#peDialog .pe-cols{display:flex;gap:6px;}',
      '#peDialog .pe-col{flex:1;min-width:0;border:1px solid var(--border-light);border-radius:var(--radius-sm);max-height:220px;overflow:auto;}',
      '#peDialog .pe-col h4{margin:0;padding:6px 10px;font-size:12px;background:var(--bg-tertiary);color:var(--text-secondary);position:sticky;top:0;}',
      '#peDialog .pe-item{padding:6px 10px;font-size:13px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '#peDialog .pe-item:hover{background:var(--bg-section-alt);}',
      '#peDialog .pe-item.active{background:var(--primary-light);color:var(--primary);font-weight:500;}',
      '#peDialog .pe-item.locked{cursor:default;color:var(--text-tertiary);}',
      '#peDialog .pe-tags{display:flex;flex-wrap:wrap;gap:8px;min-height:40px;padding:8px;border:1px solid var(--border-figma);border-radius:var(--radius-sm);}',
      '#peDialog .pe-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:var(--radius-sm);background:var(--primary-light);color:var(--primary);font-size:12px;}',
      '#peDialog .pe-chip button{border:none;background:none;color:inherit;cursor:pointer;padding:0;}',
      '#peDialog .pe-hint{margin-top:4px;font-size:12px;color:var(--text-tertiary);}',
      '#peDialog .pe-readonly{min-height:32px;line-height:32px;padding:0 12px;background:var(--bg-tertiary);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;}',
      '#peDialog .party-table{width:100%;min-width:0;border-collapse:collapse;table-layout:fixed;}',
      '#peDialog .party-table th,#peDialog .party-table td{padding:8px;border-bottom:1px solid var(--border-light);font-size:13px;text-align:left;vertical-align:middle;max-width:none;overflow:visible;text-overflow:clip;white-space:nowrap;}',
      '#peDialog .party-table th{background:var(--bg-tertiary);color:var(--text-secondary);font-size:12px;}',
      '#peDialog .party-table .form-input{height:32px;min-width:0;width:100% !important;}',
      '#peDialog .party-type-tag{padding:2px 8px;border-radius:var(--radius-sm);font-size:12px;white-space:nowrap;}',
      '#peDialog .party-type-tag.build{background:var(--primary-light);color:var(--primary);}',
      '#peDialog .party-type-tag.construct{background:var(--success-light);color:var(--success);}',
      '#peDialog .party-type-tag.supervise{background:var(--warning-light);color:var(--warning);}',
      '#peDialog .party-type-tag.subcontract{background:var(--accent-light);color:var(--accent);}',
      '#peDialog .party-type-tag.operate{background:var(--bg-tertiary);color:var(--text-primary);}',
      '#peDialog .pe-inline{display:flex;align-items:center;gap:8px;}',
      '#peDialog .pe-inline .form-input{flex:1 1 auto !important;width:auto !important;min-width:0 !important;}',
      '#peDialog .pe-inline .pe-pick{width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;flex:none;}',
      '#peDialog .pe-name-cell{display:flex;gap:4px;align-items:center;}',
      '#peDialog .pe-name-cell .form-input{flex:1 1 auto !important;width:auto !important;min-width:0 !important;}',
      '#peDialog .pe-pick{border:none;background:none;cursor:pointer;padding:0;flex-shrink:0;}',
      '#peDialog .pe-reg-row{display:grid;grid-template-columns:160px 1fr;column-gap:16px;align-items:center;min-height:36px;border-bottom:1px solid var(--border-light);font-size:13px;}',
      '#peDialog .pe-reg-row span:first-child{color:var(--text-secondary);}',
      '#peToast{position:fixed;top:24px;left:50%;transform:translateX(-50%);padding:8px 24px;background:var(--primary);color:#fff;border-radius:6px;font-size:14px;z-index:3000;opacity:0;transition:opacity .2s;pointer-events:none;}',
      '#peEntList{max-height:360px;overflow:auto;border:1px solid var(--border-light);border-radius:var(--radius-sm);}',
      '#peEntList .pe-ent{padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--border-light);font-size:13px;}',
      '#peEntList .pe-ent:hover{background:var(--primary-light);}',
      '#peDialog .form-group.pe-hidden,#peDialog #peAddSub.pe-hidden,#peDialog tr.pe-hidden{display:none !important;}'
    ].join('');
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="modal-overlay" id="peDialog"><div class="modal-dialog"><div class="modal-header"><span class="modal-title" id="peTitle">编辑项目信息</span><button class="modal-close" type="button" id="peClose">×</button></div>' +
      '<div class="modal-body"><div class="modal-form">' +
      '<div class="pe-section"><div class="pe-title">基础信息</div><div class="pe-grid">' +
      '<div class="form-group"><label class="form-label">项目类别<span class="required">*</span></label><select class="form-select" id="peCategory"><option value="在建项目">在建项目</option><option value="运营项目">运营项目</option></select></div>' +
      '<div class="form-group"><label class="form-label">项目状态<span class="required">*</span></label><select class="form-select" id="peStatus"></select></div>' +
      '<div class="form-group"><label class="form-label">项目名称<span class="required">*</span></label><input class="form-input" id="peName" type="text"></div>' +
      '<div class="form-group"><label class="form-label">项目编号<span class="required">*</span></label><input class="form-input" id="peNo" type="text" placeholder="施工许可证号"></div>' +
      '<div class="form-group pe-construction" id="peSubtypeWrap"><label class="form-label">项目小类<span class="required">*</span></label><select class="form-select" id="peSubtype"><option value="">请先选择安全场景标签库</option></select></div>' +
      '<div class="form-group pe-construction" id="peGroupWrap"><label class="form-label">所属督导组</label><select class="form-select" id="peGroup"><option value="">请选择（选填）</option></select></div>' +
      '<div class="form-group full" style="position:relative"><label class="form-label">所属区划<span class="required">*</span></label><button type="button" class="pe-trigger" id="peRegionBtn"><span id="peRegionLabel">请选择区 / 街道 / 社区</span><span>▼</span></button>' +
      '<div class="pe-pop" id="peRegionPop" style="width:640px;max-width:80vw"><input class="form-input" id="peRegionSearch" placeholder="搜索区/街道/社区/网格" style="margin-bottom:8px"><div class="pe-cols"><div class="pe-col" id="peColDistrict"></div><div class="pe-col" id="peColStreet"></div><div class="pe-col" id="peColCommunity"></div><div class="pe-col" id="peColGrid"></div></div><div class="pe-hint">区、街道、社区必填，网格选填。选到社区即可。</div></div></div>' +
      '<div class="form-group full"><label class="form-label">详细地址<span class="required">*</span></label><div class="pe-inline"><input class="form-input" id="peAddress" placeholder="街道门牌号"><button type="button" class="pe-pick" id="peMapBtn" title="地图选点">' + PIN_SVG + '</button></div></div>' +
      '<div class="form-group full"><label class="form-label">项目描述</label><textarea class="form-input" id="peDesc" placeholder="选填"></textarea></div>' +
      '</div></div>' +
      '<div class="pe-section"><div class="pe-title">安全场景标签库</div>' +
      '<div class="form-group" style="position:relative"><label class="form-label">安全场景标签库<span class="required">*</span></label><div class="pe-tags" id="peTags"></div><div class="pe-pop" id="peTagPop" style="width:520px;max-width:80vw"><div class="pe-cols"><div class="pe-col" id="peColIndustry"></div><div class="pe-col" id="peColDomain"></div></div></div>' +
      '<div class="pe-hint">至少选一个。行业大类再到领域小类，可多选。主领域小类取第一个项目模式领域小类。</div></div>' +
      '<div class="form-group" style="margin-top:8px"><label class="form-label">主领域小类</label><div class="pe-readonly" id="peMain">—</div></div></div>' +
      '<div class="pe-section"><div class="pe-title" id="pePartyTitle">四方责任体</div>' +
      '<table class="party-table" id="pePartyTable"><colgroup><col style="width:13%"><col style="width:28%"><col style="width:24%"><col style="width:12%"><col style="width:16%"><col style="width:7%"></colgroup><thead><tr><th>责任方类型</th><th>单位名称</th><th>统一社会信用代码</th><th>主要负责人</th><th>联系电话</th><th>操作</th></tr></thead>' +
      '<tbody id="pePartyBody"></tbody></table>' +
      '<button type="button" class="btn btn-default btn-sm" id="peAddSub" style="margin-top:8px">+ 添加分包单位</button></div>' +
      '<div class="pe-section"><div class="pe-title">监管单位</div><div class="pe-reg">' +
      '<div class="pe-reg-row"><span>行业监管单位</span><span id="peRegIndustry">—</span></div>' +
      '<div class="pe-reg-row"><span>专业监管单位</span><span id="peRegProf">—</span></div>' +
      '<div class="pe-reg-row"><span>属地监管单位</span><span id="peRegLocal">—</span></div>' +
      '</div><div class="pe-hint">由安全场景标签库和所属区划带出，不能手改。</div></div>' +
      '<div class="pe-section"><div class="pe-title">账号信息</div><div class="pe-grid">' +
      '<div class="form-group"><label class="form-label">登录账号<span class="required" id="peAccountReq">*</span></label><input class="form-input" id="peAccount" placeholder="4-32位字母或数字"></div>' +
      '<div class="form-group" id="pePwdWrap"><label class="form-label">初始密码<span class="required">*</span></label><input class="form-input" id="pePassword" type="password" value="Abc@123456"></div>' +
      '</div><div class="pe-hint" id="peAccountHint"></div></div>' +
      '</div></div><div class="modal-footer"><button type="button" class="btn btn-default" id="peCancel">取消</button><button type="button" class="btn btn-primary" id="peSave">保存</button></div></div></div>' +
      '<div class="modal-overlay" id="peEntDialog"><div class="modal-dialog"><div class="modal-header"><span class="modal-title">选择企业</span><button class="modal-close" type="button" id="peEntClose">×</button></div>' +
      '<div class="modal-body"><input class="form-input" id="peEntSearch" placeholder="搜索企业名称、信用代码" style="margin-bottom:8px"><div id="peEntList"></div><div class="pe-hint" id="peEntHint"></div></div>' +
      '<div class="modal-footer"><button type="button" class="btn btn-default" id="peEntCancel">关闭</button></div></div></div>' +
      '<div class="modal-overlay" id="peMapDialog"><div class="modal-dialog"><div class="modal-header"><span class="modal-title">地图选点</span><button class="modal-close" type="button" id="peMapClose">×</button></div>' +
      '<div class="modal-body" style="padding:0"><div style="padding:12px 16px"><input class="form-input" placeholder="输入地址搜索" style="width:100%"></div>' +
      '<div style="position:relative;height:320px;background:#f0f2f5;margin:0 16px;border-radius:4px"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-100%)">' + PIN_SVG + '</div></div>' +
      '<div style="padding:12px 16px;font-size:13px;color:var(--text-secondary)">经度 113.9398　纬度 22.5341</div></div>' +
      '<div class="modal-footer"><button type="button" class="btn btn-default" id="peMapCancel">取消</button><button type="button" class="btn btn-primary" id="peMapOk">确定</button></div></div></div>' +
      '<div id="peToast"></div>';
    document.body.appendChild(wrap);
    bind();
  }

  function $(id) { return document.getElementById(id); }

  function bind() {
    $('peClose').onclick = close;
    $('peCancel').onclick = close;
    $('peSave').onclick = save;
    $('peCategory').onchange = function () { applyCategory(true); };
    $('peRegionBtn').onclick = function (e) {
      e.stopPropagation();
      $('peRegionPop').classList.toggle('open');
      $('peTagPop').classList.remove('open');
      renderRegion();
    };
    $('peRegionSearch').oninput = renderRegion;
    $('peRegionPop').onclick = function (e) { e.stopPropagation(); };
    $('peAddSub').onclick = function () { addPartyRow('sub'); };
    $('pePartyBody').onclick = onPartyClick;
    $('peTags').onclick = onTagBoxClick;
    $('peTagPop').onclick = function (e) { e.stopPropagation(); };
    $('peEntClose').onclick = $('peEntCancel').onclick = function () { $('peEntDialog').classList.remove('show'); };
    $('peEntSearch').oninput = renderEnterprises;
    $('peMapBtn').onclick = function () { $('peMapDialog').classList.add('show'); };
    $('peMapClose').onclick = $('peMapCancel').onclick = function () { $('peMapDialog').classList.remove('show'); };
    $('peMapOk').onclick = function () { $('peMapDialog').classList.remove('show'); toast('地图选点完成'); };
    document.addEventListener('click', function () {
      var region = $('peRegionPop');
      var tag = $('peTagPop');
      if (region) region.classList.remove('open');
      if (tag) tag.classList.remove('open');
    });
  }

  function partyMeta(kind) {
    if (kind === 'build') return { cls: 'build', label: '建设单位', required: true };
    if (kind === 'construct') return { cls: 'construct', label: '施工单位', required: true };
    if (kind === 'supervise') return { cls: 'supervise', label: '监理单位', required: true };
    if (kind === 'operate') return { cls: 'operate', label: '运营单位', required: true };
    return { cls: 'subcontract', label: '分包单位', required: false };
  }

  function addPartyRow(kind, data) {
    data = data || {};
    var meta = partyMeta(kind);
    var tr = document.createElement('tr');
    tr.setAttribute('data-kind', kind);
    var star = meta.required ? '<span class="required">*</span>' : '';
    var op = kind === 'sub'
      ? '<button type="button" class="pe-pick pe-del" title="删除">删</button>'
      : '';
    tr.innerHTML =
      '<td><span class="party-type-tag ' + meta.cls + '">' + meta.label + star + '</span></td>' +
      '<td><div class="pe-name-cell"><input class="form-input pe-name" value="' + esc(data.name || '') + '"><button type="button" class="pe-pick pe-choose" title="选择企业">' + PIN_SVG + '</button></div></td>' +
      '<td><input class="form-input pe-credit" value="' + esc(data.credit || '') + '"></td>' +
      '<td><input class="form-input pe-contact" value="' + esc(data.contact || '') + '"></td>' +
      '<td><input class="form-input pe-phone" value="' + esc(data.phone || '') + '"></td>' +
      '<td>' + op + '</td>';
    $('pePartyBody').appendChild(tr);
  }

  function onPartyClick(e) {
    var del = e.target.closest('.pe-del');
    if (del) { del.closest('tr').remove(); return; }
    var choose = e.target.closest('.pe-choose');
    if (!choose) return;
    state.pickRow = choose.closest('tr');
    $('peEntSearch').value = '';
    $('peEntHint').textContent = state.role === 'gov' ? '只显示本辖区企业。选中后带出名称和统一社会信用代码。' : '选中后带出名称和统一社会信用代码。';
    renderEnterprises();
    $('peEntDialog').classList.add('show');
  }

  function renderEnterprises() {
    var kw = $('peEntSearch').value.trim();
    var district = state.role === 'gov' ? (state.region.district || '南山区') : '';
    var rows = ensureEnterprises().filter(function (ent) {
      if (district && ent.district !== district) return false;
      if (!kw) return true;
      return ent.name.indexOf(kw) >= 0 || ent.credit.indexOf(kw) >= 0;
    });
    $('peEntList').innerHTML = rows.map(function (ent, i) {
      return '<div class="pe-ent" data-i="' + i + '"><b>' + esc(ent.name) + '</b><div style="color:var(--text-tertiary)">' + esc(ent.credit) + ' · ' + esc(ent.district) + '</div></div>';
    }).join('') || '<div style="padding:16px;color:var(--text-tertiary)">没有匹配的企业</div>';
    Array.prototype.forEach.call($('peEntList').querySelectorAll('.pe-ent'), function (el, idx) {
      el.onclick = function () {
        var ent = rows[idx];
        if (!state.pickRow || !ent) return;
        state.pickRow.querySelector('.pe-name').value = ent.name;
        state.pickRow.querySelector('.pe-credit').value = ent.credit;
        $('peEntDialog').classList.remove('show');
      };
    });
  }

  function resetParties(list, operator) {
    $('pePartyBody').innerHTML = '';
    var fixed = { build: null, construct: null, supervise: null };
    var subs = [];
    (list || []).forEach(function (p) {
      if (p.kind === 'build' || p.kind === 'construct' || p.kind === 'supervise') fixed[p.kind] = p;
      else if (p.kind === 'sub') subs.push(p);
    });
    ['build', 'construct', 'supervise'].forEach(function (k) { addPartyRow(k, fixed[k] || {}); });
    subs.forEach(function (p) { addPartyRow('sub', p); });
    addPartyRow('operate', operator || {});
    applyCategory(false);
  }

  function applyCategory(resetStatus) {
    var op = $('peCategory').value === '运营项目';
    Array.prototype.forEach.call(document.querySelectorAll('#peDialog .pe-construction'), function (el) {
      el.classList.toggle('pe-hidden', op);
    });
    Array.prototype.forEach.call($('pePartyBody').querySelectorAll('tr'), function (tr) {
      var kind = tr.getAttribute('data-kind');
      tr.classList.toggle('pe-hidden', op ? kind !== 'operate' : kind === 'operate');
    });
    $('peAddSub').classList.toggle('pe-hidden', op);
    $('pePartyTitle').textContent = op ? '运营单位' : '四方责任体';
    var select = $('peStatus');
    var prev = select.value;
    var options = op ? STATUS_OP : STATUS_BUILD;
    select.innerHTML = options.map(function (s) { return '<option value="' + s + '">' + s + '</option>'; }).join('');
    if (!resetStatus && options.indexOf(prev) >= 0) select.value = prev;
    else if (options.indexOf(state.keepStatus) >= 0) select.value = state.keepStatus;
    state.keepStatus = '';
  }

  function renderTags() {
    var box = $('peTags');
    var chips = state.tags.map(function (t, i) {
      return '<span class="pe-chip">' + esc(t.industryName + ' - ' + t.name) + '<button type="button" data-remove="' + i + '">×</button></span>';
    }).join('');
    box.innerHTML = chips + '<button type="button" class="btn btn-default btn-sm" id="peAddTag" style="height:28px">+ 添加</button>';
    var main = null;
    state.tags.some(function (t) { if (t.mode === 'project') { main = t; return true; } return false; });
    $('peMain').textContent = main ? (main.industryName + ' - ' + main.name) : '—';
    fillSubtypes();
    refreshRegulators();
  }

  function fillSubtypes() {
    var select = $('peSubtype');
    var prev = select.value || state.keepSubtype;
    var set = [];
    state.tags.forEach(function (t) {
      if (t.mode !== 'project') return;
      (SUBTYPE_MAP[t.name] || []).forEach(function (s) { if (set.indexOf(s) < 0) set.push(s); });
    });
    if (prev && set.indexOf(prev) < 0) set.unshift(prev);
    select.innerHTML = '<option value="">请选择项目小类</option>' + set.map(function (s) {
      return '<option value="' + esc(s) + '">' + esc(s) + '</option>';
    }).join('');
    if (prev) select.value = prev;
    state.keepSubtype = '';
  }

  function refreshRegulators() {
    var industry = [];
    var professional = [];
    state.tags.forEach(function (t) {
      (t.supervisors || []).forEach(function (s) {
        if (s.type === 'industry' && industry.indexOf(s.name) < 0) industry.push(s.name);
        if (s.type === 'professional' && professional.indexOf(s.name) < 0) professional.push(s.name);
      });
    });
    var local = (typeof getLocalSupervisorByStreetName === 'function') ? getLocalSupervisorByStreetName(state.region.street) : null;
    $('peRegIndustry').textContent = industry.join('、') || '—';
    $('peRegProf').textContent = professional.join('、') || '—';
    $('peRegLocal').textContent = local ? local.name : '—';
  }

  function onTagBoxClick(e) {
    var rm = e.target.getAttribute && e.target.getAttribute('data-remove');
    if (rm != null) {
      state.tags.splice(Number(rm), 1);
      renderTags();
      return;
    }
    if (e.target.id === 'peAddTag' || e.target.closest('#peAddTag')) {
      e.stopPropagation();
      $('peTagPop').classList.toggle('open');
      $('peRegionPop').classList.remove('open');
      renderTagPicker('');
    }
  }

  function renderTagPicker(industry) {
    var list = ensureCatalog();
    var industries = [];
    list.forEach(function (d) { if (industries.indexOf(d.industryName) < 0) industries.push(d.industryName); });
    if (!industry) industry = state.tagIndustry || industries[0] || '';
    state.tagIndustry = industry;
    $('peColIndustry').innerHTML = '<h4>行业大类</h4>' + industries.map(function (name) {
      return '<div class="pe-item' + (name === industry ? ' active' : '') + '" data-ind="' + esc(name) + '">' + esc(name) + '</div>';
    }).join('');
    var domains = list.filter(function (d) { return d.industryName === industry; });
    $('peColDomain').innerHTML = '<h4>领域小类</h4>' + domains.map(function (d) {
      var on = state.tags.some(function (t) { return t.id === d.id; });
      return '<div class="pe-item' + (on ? ' active' : '') + '" data-id="' + esc(d.id) + '">' + (on ? '✓ ' : '') + esc(d.name) + '</div>';
    }).join('');
    Array.prototype.forEach.call($('peColIndustry').querySelectorAll('[data-ind]'), function (el) {
      el.onclick = function (ev) { ev.stopPropagation(); renderTagPicker(el.getAttribute('data-ind')); };
    });
    Array.prototype.forEach.call($('peColDomain').querySelectorAll('[data-id]'), function (el) {
      el.onclick = function (ev) {
        ev.stopPropagation();
        var id = el.getAttribute('data-id');
        var found = ensureCatalog().filter(function (d) { return d.id === id; })[0];
        if (!found) return;
        var idx = -1;
        state.tags.forEach(function (t, i) { if (t.id === id) idx = i; });
        if (idx >= 0) state.tags.splice(idx, 1);
        else state.tags.push(found);
        renderTags();
        renderTagPicker(state.tagIndustry);
      };
    });
  }

  function regionTree() {
    return (typeof buildDistrictTree === 'function') ? buildDistrictTree() : [];
  }

  function renderRegion() {
    var tree = regionTree();
    var root = tree[0];
    if (!root) return;
    var kw = $('peRegionSearch').value.trim();
    var lock = state.role === 'gov';
    $('peColDistrict').innerHTML = '<h4>区</h4><div class="pe-item active' + (lock ? ' locked' : '') + '">' + esc(root.name) + '</div>';
    state.region.district = root.name;
    var streets = root.children || [];
    if (kw) streets = streets.filter(function (s) { return s.name.indexOf(kw) >= 0 || (s.children || []).some(function (c) { return c.name.indexOf(kw) >= 0; }); });
    $('peColStreet').innerHTML = '<h4>街道</h4>' + streets.map(function (s) {
      return '<div class="pe-item' + (s.name === state.region.street ? ' active' : '') + '" data-street="' + esc(s.name) + '">' + esc(s.name) + '</div>';
    }).join('');
    var street = (root.children || []).filter(function (s) { return s.name === state.region.street; })[0];
    var communities = street ? (street.children || []) : [];
    if (kw) communities = communities.filter(function (c) { return c.name.indexOf(kw) >= 0; });
    $('peColCommunity').innerHTML = '<h4>社区</h4>' + (street ? communities.map(function (c) {
      return '<div class="pe-item' + (c.name === state.region.community ? ' active' : '') + '" data-comm="' + esc(c.name) + '">' + esc(c.name) + '</div>';
    }).join('') : '<div class="pe-item locked">请先选街道</div>');
    var comm = street ? (street.children || []).filter(function (c) { return c.name === state.region.community; })[0] : null;
    var grids = comm ? (comm.children || []) : [];
    if (kw) grids = grids.filter(function (g) { return g.name.indexOf(kw) >= 0; });
    $('peColGrid').innerHTML = '<h4>网格</h4>' + (comm ? grids.map(function (g) {
      return '<div class="pe-item' + (g.name === state.region.grid ? ' active' : '') + '" data-grid="' + esc(g.name) + '">' + esc(g.name) + '</div>';
    }).join('') : '<div class="pe-item locked">请先选社区</div>');
    Array.prototype.forEach.call($('peColStreet').querySelectorAll('[data-street]'), function (el) {
      el.onclick = function (ev) {
        ev.stopPropagation();
        state.region.street = el.getAttribute('data-street');
        state.region.community = '';
        state.region.grid = '';
        setRegionLabel();
        renderRegion();
        refreshRegulators();
      };
    });
    Array.prototype.forEach.call($('peColCommunity').querySelectorAll('[data-comm]'), function (el) {
      el.onclick = function (ev) {
        ev.stopPropagation();
        state.region.community = el.getAttribute('data-comm');
        state.region.grid = '';
        setRegionLabel();
        renderRegion();
      };
    });
    Array.prototype.forEach.call($('peColGrid').querySelectorAll('[data-grid]'), function (el) {
      el.onclick = function (ev) {
        ev.stopPropagation();
        state.region.grid = el.getAttribute('data-grid');
        setRegionLabel();
        $('peRegionPop').classList.remove('open');
      };
    });
  }

  function setRegionLabel() {
    var parts = [];
    if (state.region.district) parts.push(state.region.district);
    if (state.region.street) parts.push(state.region.street);
    if (state.region.community) parts.push(state.region.community);
    if (state.region.grid) parts.push(state.region.grid);
    $('peRegionLabel').textContent = parts.length ? parts.join(' / ') : '请选择区 / 街道 / 社区';
  }

  function fillGroups(current) {
    $('peGroup').innerHTML = '<option value="">请选择（选填）</option>' + GROUPS.map(function (g) {
      return '<option value="' + g + '">' + g + '</option>';
    }).join('');
    if (current && GROUPS.indexOf(current) >= 0) $('peGroup').value = current;
  }

  function readParties() {
    var list = [];
    Array.prototype.forEach.call($('pePartyBody').querySelectorAll('tr'), function (tr) {
      if (tr.classList.contains('pe-hidden')) return;
      list.push({
        kind: tr.getAttribute('data-kind'),
        name: tr.querySelector('.pe-name').value.trim(),
        credit: tr.querySelector('.pe-credit').value.trim(),
        contact: tr.querySelector('.pe-contact').value.trim(),
        phone: tr.querySelector('.pe-phone').value.trim()
      });
    });
    return list;
  }

  function save() {
    var op = $('peCategory').value === '运营项目';
    var name = $('peName').value.trim();
    var projectNo = $('peNo').value.trim();
    var address = $('peAddress').value.trim();
    var account = $('peAccount').value.trim();
    var password = $('pePassword').value;
    if (!name) { toast('请填写项目名称'); return; }
    if (!projectNo) { toast('请填写项目编号'); return; }
    if (!state.tags.length) { toast('请至少选择一个安全场景标签'); return; }
    if (!op && !$('peSubtype').value) { toast('请选择项目小类'); return; }
    if (!$('peStatus').value) { toast('请选择项目状态'); return; }
    if (!state.region.district || !state.region.street || !state.region.community) { toast('请选满区、街道、社区'); return; }
    if (!address) { toast('请填写详细地址'); return; }
    var parties = readParties();
    if (op) {
      var operator = parties.filter(function (p) { return p.kind === 'operate'; })[0];
      if (!operator || !operator.name) { toast('请填写运营单位'); return; }
    } else {
      var missing = ['build', 'construct', 'supervise'].some(function (k) {
        var row = parties.filter(function (p) { return p.kind === k; })[0];
        return !row || !row.name;
      });
      if (missing) { toast('请填写建设单位、施工单位、监理单位'); return; }
    }
    var creating = state.mode === 'create' && state.role !== 'project';
    if (creating) {
      if (!/^[A-Za-z0-9]{4,32}$/.test(account)) { toast('登录账号需为 4-32 位字母或数字'); return; }
      if (!password) { toast('请填写初始密码'); return; }
    }
    var projects = state.projects || [];
    var selfId = state.record && state.record.id;
    if (projects.some(function (p) { return p.projectNo === projectNo && p.id !== selfId; })) {
      toast('项目编号已存在，请勿重复'); return;
    }
    if (creating && projects.some(function (p) { return p.loginAccount === account; })) {
      toast('登录账号已存在，请更换'); return;
    }
    var form = {
      category: $('peCategory').value,
      name: name,
      projectNo: projectNo,
      subtype: op ? '' : $('peSubtype').value,
      status: $('peStatus').value,
      region: { district: state.region.district, street: state.region.street, community: state.region.community, grid: state.region.grid },
      address: address,
      supervisionGroup: op ? '' : $('peGroup').value,
      description: $('peDesc').value.trim(),
      tags: state.tags.map(function (t) { return { id: t.id, name: t.name, industryName: t.industryName, mode: t.mode }; }),
      parties: parties,
      loginAccount: account,
      password: creating ? password : ''
    };
    if (state.projects) writeProject(form);
    if (typeof state.onSaved === 'function') state.onSaved(form, state.record);
    close();
    toast(state.mode === 'create' ? '项目新增成功' : '项目信息已更新');
  }

  function typeCode(kind) {
    if (kind === 'build') return 1;
    if (kind === 'construct') return 2;
    if (kind === 'supervise') return 3;
    if (kind === 'sub') return 4;
    return 5;
  }

  function typeName(kind) {
    return partyMeta(kind).label;
  }

  function writeProject(form) {
    var op = form.category === '运营项目';
    var main = null;
    form.tags.some(function (t) { if (t.mode === 'project') { main = t; return true; } return false; });
    var domainName = main ? main.name : (form.tags[0] ? form.tags[0].name : '');
    var known = (typeof domainList !== 'undefined') ? domainList : [];
    var domain = known.filter(function (d) { return d.name === domainName; })[0];
    var target = state.record;
    if (!target) {
      target = { id: (typeof _pidGen === 'function') ? _pidGen() : ('p' + Date.now()), createTime: new Date().toISOString().slice(0, 10), safetyCode: 'P' + new Date().getFullYear() + String(Math.floor(Math.random() * 900) + 100), codeColor: 'green' };
      state.projects.unshift(target);
      state.record = target;
    }
    target.projectCategory = op ? '2' : '1';
    target.projectNo = form.projectNo;
    target.projectName = form.name;
    target.domainId = domain ? domain.id : (main ? main.id : (form.tags[0] ? form.tags[0].id : ''));
    target.domainName = domainName;
    target.projectType = form.subtype;
    target.projectStatus = op ? (STATUS_CODE_OP[form.status] || '1') : (STATUS_CODE_BUILD[form.status] || '2');
    target.regionName = form.region.district;
    target.streetName = form.region.street;
    target.communityName = form.region.community;
    target.gridName = form.region.grid || '';
    if (!target.regionCode) target.regionCode = (typeof REGION_ROOT !== 'undefined') ? REGION_ROOT.code : '440305';
    target.address = form.address;
    target.supervisionGroupName = form.supervisionGroup;
    target.supervisionGroupId = form.supervisionGroup ? String(GROUPS.indexOf(form.supervisionGroup) + 1) : '';
    target.description = form.description;
    target.domainTags = form.tags;
    target.parties = form.parties.filter(function (p) { return p.name; }).map(function (p) {
      return { partyType: typeCode(p.kind), partyTypeName: typeName(p.kind), partyName: p.name, creditCode: p.credit, contactName: p.contact, contactPhone: p.phone };
    });
    if (state.mode === 'create') target.loginAccount = form.loginAccount;
  }

  function tagsFromRecord(record) {
    if (record.domainTags && record.domainTags.length) {
      return record.domainTags.map(function (t) {
        var full = ensureCatalog().filter(function (d) { return d.id === t.id || d.name === t.name; })[0];
        return full || t;
      });
    }
    if (!record.domainName) return [];
    var found = ensureCatalog().filter(function (d) { return d.name === record.domainName; })[0];
    return found ? [found] : [];
  }

  function partiesFromRecord(record) {
    var list = [];
    var operator = {};
    (record.parties || []).forEach(function (p) {
      var item = { name: p.partyName || '', credit: p.creditCode || '', contact: p.contactName || '', phone: p.contactPhone || '' };
      if (p.partyType === 1) list.push(Object.assign({ kind: 'build' }, item));
      else if (p.partyType === 2) list.push(Object.assign({ kind: 'construct' }, item));
      else if (p.partyType === 3) list.push(Object.assign({ kind: 'supervise' }, item));
      else if (p.partyType === 4) list.push(Object.assign({ kind: 'sub' }, item));
      else if (p.partyType === 5) operator = item;
    });
    return { list: list, operator: operator };
  }

  function open(opts) {
    inject();
    ensureCatalog();
    opts = opts || {};
    var record = opts.record || null;
    var op = record && String(record.projectCategory) === '2';
    state = {
      role: opts.role || 'project',
      mode: opts.mode || (record ? 'edit' : 'create'),
      record: record,
      projects: opts.projects || null,
      onSaved: opts.onSaved || null,
      tags: record ? tagsFromRecord(record) : [],
      region: {
        district: (record && record.regionName) || '南山区',
        street: (record && record.streetName) || '',
        community: (record && record.communityName) || '',
        grid: (record && record.gridName) || ''
      },
      tagIndustry: '',
      pickRow: null,
      keepStatus: '',
      keepSubtype: ''
    };
    if (!record && opts.preset) {
      state.region = opts.preset.region || state.region;
      state.tags = opts.preset.tags || [];
    }
    $('peTitle').textContent = state.mode === 'create' ? '新增项目' : '编辑项目信息';
    var preset = opts.preset || {};
    $('peCategory').value = op ? '运营项目' : (preset.category || '在建项目');
    $('peName').value = record ? (record.projectName || '') : (preset.name || '');
    $('peName').disabled = state.role === 'project';
    $('peName').title = state.role === 'project' ? '项目名称变更需审批，不在这个弹窗里改' : '';
    $('peNo').value = record ? (record.projectNo || '') : (preset.projectNo || '');
    $('peAddress').value = record ? (record.address || '') : (preset.address || '');
    $('peDesc').value = record ? (record.description || '') : (preset.description || '');
    $('peAccount').value = record ? (record.loginAccount || '') : (preset.loginAccount || '');
    $('peAccount').disabled = state.role === 'project' || state.mode === 'edit';
    $('peAccountReq').style.display = (state.mode === 'create' && state.role !== 'project') ? '' : 'none';
    $('pePwdWrap').classList.toggle('pe-hidden', !(state.mode === 'create' && state.role !== 'project'));
    $('pePassword').value = 'Abc@123456';
    $('peAccountHint').textContent = state.role === 'project'
      ? '项目端登录的是这个项目管理账号，这里只读。改密码在右上角当前账号。'
      : (state.mode === 'edit' ? '登录账号创建后不可改。重置密码在列表操作里。' : '初始密码默认 Abc@123456，只在新增时填写。');
    state.keepStatus = record
      ? (op ? (CODE_STATUS_OP[record.projectStatus] || record.projectStatus) : (CODE_STATUS_BUILD[record.projectStatus] || record.projectStatus))
      : (op ? '正常运营' : '在建');
    state.keepSubtype = record ? (record.projectType || '') : ((opts.preset && opts.preset.subtype) || '');
    fillGroups(record ? (record.supervisionGroupName || '') : ((opts.preset && opts.preset.supervisionGroup) || ''));
    var parsed = record ? partiesFromRecord(record) : { list: (opts.preset && opts.preset.parties) || [], operator: {} };
    if (opts.preset && opts.preset.tags) state.tags = opts.preset.tags.map(function (t) {
      return ensureCatalog().filter(function (d) { return d.id === t.id || d.name === t.name; })[0] || t;
    });
    resetParties(parsed.list, parsed.operator);
    renderTags();
    setRegionLabel();
    $('peRegionPop').classList.remove('open');
    $('peTagPop').classList.remove('open');
    $('peDialog').classList.add('show');
  }

  function close() {
    var el = $('peDialog');
    if (el) el.classList.remove('show');
    var ent = $('peEntDialog');
    if (ent) ent.classList.remove('show');
    var map = $('peMapDialog');
    if (map) map.classList.remove('show');
  }

  window.ProjectEditDialog = { open: open, close: close };
})();
