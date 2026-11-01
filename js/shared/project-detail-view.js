/**
 * 超管、政府项目详情整页。外观对齐企业端项目基本信息，字段对齐编辑弹窗口径。
 * 依赖 domain-data.js。页面需已加载 variables.css / framework.css。
 */
(function () {
  'use strict';

  var STATUS_BUILD = { '1': '未开工', '2': '在建', '3': '停工', '4': '竣工' };
  var STATUS_OP = { '1': '正常运营', '2': '暂停运营', '3': '关闭' };
  var PARTY_CLASS = { 1: 'build', 2: 'construct', 3: 'supervise', 4: 'subcontract', 5: 'operate' };
  var PIN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#1677ff" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';
  var built = false;
  var hooks = { onBack: null, onEdit: null };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function text(s) {
    var v = s == null ? '' : String(s).trim();
    return v ? esc(v) : '—';
  }

  function catalog() {
    var list = (typeof DOMAIN_TABLE_DATA !== 'undefined' ? DOMAIN_TABLE_DATA : []).filter(function (d) {
      return d.status === '1';
    }).map(function (d) {
      return { id: d.id, name: d.name, industryName: d.industryName || '其他类', mode: d.mode || 'basic', supervisors: d.supervisors || [] };
    });
    [
      { id: 'd2', name: '市政工程', industryName: '建设工程类', mode: 'project' },
      { id: 'd3', name: '公路工程', industryName: '建设工程类', mode: 'project' },
      { id: 'd4', name: '水利工程', industryName: '建设工程类', mode: 'project' }
    ].forEach(function (ex) {
      if (list.some(function (d) { return d.name === ex.name; })) return;
      var supervisors = (typeof domainSupRef === 'function')
        ? [domainSupRef('industry', 'NS-HOUSING'), domainSupRef('professional', 'NS-AMB')]
        : [];
      list.push({ id: ex.id, name: ex.name, industryName: ex.industryName, mode: ex.mode, supervisors: supervisors });
    });
    return list;
  }

  function resolveTags(record) {
    var cat = catalog();
    var raw = (record.domainTags && record.domainTags.length) ? record.domainTags : (record.domainName ? [{ name: record.domainName, id: record.domainId }] : []);
    return raw.map(function (t) {
      var full = cat.filter(function (d) { return (t.id && d.id === t.id) || d.name === t.name; })[0];
      return full || { id: t.id || '', name: t.name || '', industryName: t.industryName || '', mode: t.mode || '', supervisors: t.supervisors || [] };
    });
  }

  function tagLabel(t) {
    return (t.industryName ? t.industryName + ' - ' : '') + (t.name || '');
  }

  function regulators(tags, street) {
    var industry = [];
    var professional = [];
    tags.forEach(function (t) {
      (t.supervisors || []).forEach(function (s) {
        if (s.type === 'industry' && industry.indexOf(s.name) < 0) industry.push(s.name);
        if (s.type === 'professional' && professional.indexOf(s.name) < 0) professional.push(s.name);
      });
    });
    var local = (typeof getLocalSupervisorByStreetName === 'function') ? getLocalSupervisorByStreetName(street) : null;
    return {
      industry: industry.join('、') || '—',
      professional: professional.join('、') || '—',
      local: local ? local.name : '—'
    };
  }

  function statusOf(record, op) {
    var name = op ? (STATUS_OP[record.projectStatus] || '—') : (STATUS_BUILD[record.projectStatus] || '—');
    var cls = 'status-default';
    if (name === '在建' || name === '正常运营') cls = 'status';
    else if (name === '停工' || name === '暂停运营') cls = 'status-warning';
    else if (name === '竣工') cls = 'status-info';
    return { name: name, cls: cls };
  }

  function row(label, valueHtml, full) {
    return '<div class="info-row' + (full ? ' full' : '') + '"><span class="info-label">' + label + '</span><span class="info-value">' + valueHtml + '</span></div>';
  }

  function render(record) {
    var op = String(record.projectCategory) === '2';
    var status = statusOf(record, op);
    var tags = resolveTags(record);
    var main = null;
    tags.some(function (t) { if (t.mode === 'project') { main = t; return true; } return false; });
    var region = [record.regionName, record.streetName, record.communityName, record.gridName].filter(function (part) { return part; }).join(' / ');
    var regs = regulators(tags, record.streetName);
    var chips = tags.length ? tags.map(function (t, i) {
      return '<span class="scene-tag ' + (i === 0 ? 'category' : 'status-info') + '">' + esc(tagLabel(t)) + '</span>';
    }).join('') : '—';
    var parties = (record.parties || []).filter(function (p) { return op ? p.partyType === 5 : p.partyType !== 5; });
    var partyRows = parties.length ? parties.map(function (p) {
      var cls = PARTY_CLASS[p.partyType] || 'operate';
      return '<tr><td><span class="party-type-tag ' + cls + '">' + esc(p.partyTypeName || '—') + '</span></td><td>' + text(p.partyName) + '</td><td>' + text(p.creditCode) + '</td><td>' + text(p.contactName) + '</td><td>' + text(p.contactPhone) + '</td></tr>';
    }).join('') : '<tr><td colspan="5">—</td></tr>';

    var basic = row('项目类别', '<span class="scene-tag category">' + (op ? '运营项目' : '在建项目') + '</span>')
      + row('项目名称', text(record.projectName))
      + row('项目编号', text(record.projectNo))
      + row('项目状态', '<span class="scene-tag ' + status.cls + '">' + esc(status.name) + '</span>');
    if (!op) {
      basic += row('项目小类', text(record.projectType)) + row('所属督导组', text(record.supervisionGroupName));
    }
    basic += row('所属区划', text(region), true);
    basic += row('详细地址', '<div class="address-row"><span class="address-text">' + text(record.address) + '</span><button type="button" class="icon-btn" id="pdPin" title="地图选点">' + PIN_SVG + '</button></div>', true);
    basic += row('项目描述', text(record.description), true);

    return ''
      + '<div class="detail-card card-bg">'
      + '<div class="pd-head"><div class="section-title">基础信息</div><div class="pd-actions"><button type="button" class="btn btn-default" id="pdBack">返回</button><button type="button" class="btn btn-primary" id="pdEdit">编辑</button></div></div>'
      + '<div class="info-grid">' + basic + '</div></div>'
      + '<div class="detail-card"><div class="section-title">安全场景标签库</div><div class="info-grid">'
      + row('安全场景标签库', '<div class="tag-list">' + chips + '</div>')
      + row('主领域小类', main ? esc(tagLabel(main)) : '—')
      + '</div></div>'
      + '<div class="detail-card"><div class="section-title">' + (op ? '运营单位' : '四方责任体') + '</div>'
      + '<table class="party-table"><thead><tr><th style="width:15%">责任方类型</th><th>单位名称</th><th>统一社会信用代码</th><th>主要负责人</th><th>联系电话</th></tr></thead><tbody>' + partyRows + '</tbody></table></div>'
      + '<div class="detail-card"><div class="section-title">监管单位</div>'
      + '<table class="supervisor-table"><thead><tr><th style="width:50%">监管类型</th><th>监管单位名称</th></tr></thead><tbody>'
      + '<tr><td>行业监管单位</td><td>' + esc(regs.industry) + '</td></tr>'
      + '<tr><td>专业监管单位</td><td>' + esc(regs.professional) + '</td></tr>'
      + '<tr><td>属地监管单位</td><td>' + esc(regs.local) + '</td></tr>'
      + '</tbody></table></div>';
  }

  function inject() {
    if (built) return;
    built = true;
    var style = document.createElement('style');
    style.textContent = [
      '#pdPage{display:block;}',
      '#pdPage .detail-card{background:var(--bg-primary);border-radius:var(--radius-lg);box-shadow:var(--shadow-card);padding:var(--spacing-lg);margin-bottom:12px;}',
      '#pdPage .detail-card:last-child{margin-bottom:0;}',
      '#pdPage .detail-card.card-bg{background:url("../enterprise/images/ent-info-bg.png") center top / 100% 200px no-repeat,var(--bg-primary);}',
      '#pdPage .pd-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--spacing-lg);gap:12px;}',
      '#pdPage .pd-actions{display:flex;gap:var(--spacing-sm);align-items:center;flex-shrink:0;}',
      '#pdPage .section-title{display:flex;align-items:center;font-size:16px;font-weight:600;color:var(--text-primary);padding:0 0 0 12px;border-left:4px solid var(--primary);border-radius:0 !important;border-bottom:none !important;background:transparent !important;margin:0 0 16px !important;gap:8px;line-height:1.6;}',
      '#pdPage .pd-head .section-title{margin:0 !important;}',
      '#pdPage .section-title::before{display:none !important;}',
      '#pdPage .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;}',
      '#pdPage .info-row{display:flex;align-items:flex-start;padding:var(--spacing-sm) 0;border-bottom:1px solid var(--border-light);}',
      '#pdPage .info-row.full{grid-column:1 / -1;}',
      '#pdPage .info-label{width:120px;flex-shrink:0;font-size:var(--font-size-sm);color:var(--text-secondary);line-height:28px;}',
      '#pdPage .info-value{flex:1;font-size:var(--font-size-md);color:var(--text-primary);line-height:28px;min-width:0;}',
      '#pdPage .address-row{display:flex;align-items:center;gap:var(--spacing-sm);min-width:0;}',
      '#pdPage .address-text{flex:1;min-width:0;line-height:28px;}',
      '#pdPage .icon-btn{display:inline-flex;padding:0;background:none;border:none;cursor:pointer;flex-shrink:0;}',
      '#pdPage .tag-list{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);}',
      '#pdPage .scene-tag{padding:4px 14px;border-radius:var(--radius-sm);font-size:var(--font-size-sm);display:inline-flex;align-items:center;}',
      '#pdPage .scene-tag.category{background:var(--success-light);color:var(--success);}',
      '#pdPage .scene-tag.status{background:var(--info-light);color:var(--info);}',
      '#pdPage .scene-tag.status-warning{background:var(--warning-light);color:var(--warning);}',
      '#pdPage .scene-tag.status-info{background:var(--primary-light);color:var(--primary);}',
      '#pdPage .scene-tag.status-default{background:var(--bg-secondary);color:var(--text-tertiary);}',
      '#pdPage table{width:100% !important;min-width:0 !important;border-collapse:collapse;}',
      '#pdPage th,#pdPage td{width:auto !important;max-width:none !important;overflow:visible !important;text-overflow:clip !important;white-space:normal !important;position:static !important;box-shadow:none !important;text-align:left !important;padding:var(--spacing-sm) var(--spacing-md);border-bottom:1px solid var(--border-light);font-size:var(--font-size-sm);}',
      '#pdPage th{background:var(--bg-tertiary);font-weight:600;color:var(--text-secondary);font-size:var(--font-size-xs);}',
      '#pdPage tr:last-child td{border-bottom:none;}',
      '#pdPage tbody tr:hover{background:transparent;}',
      '#pdPage .party-type-tag{padding:2px 8px;border-radius:var(--radius-sm);font-size:var(--font-size-xs);}',
      '#pdPage .party-type-tag.build{background:var(--primary-light);color:var(--primary);}',
      '#pdPage .party-type-tag.construct{background:var(--success-light);color:var(--success);}',
      '#pdPage .party-type-tag.supervise{background:var(--warning-light);color:var(--warning);}',
      '#pdPage .party-type-tag.subcontract{background:var(--accent-light);color:var(--accent);}',
      '#pdPage .party-type-tag.operate{background:var(--info-light);color:var(--info);}',
      '#pdMapDialog .modal-dialog{width:600px;max-width:calc(100vw - 48px);}'
    ].join('');
    document.head.appendChild(style);

    var map = document.createElement('div');
    map.className = 'modal-overlay';
    map.id = 'pdMapDialog';
    map.innerHTML = '<div class="modal-dialog"><div class="modal-header"><span class="modal-title" style="display:flex;align-items:center;gap:6px;">' + PIN_SVG + '地图选点</span><button type="button" class="modal-close" id="pdMapClose">×</button></div>'
      + '<div class="modal-body" style="padding:0;"><div style="padding:12px 16px;"><input type="text" class="form-input" placeholder="输入地址搜索" style="width:100%;box-sizing:border-box;"></div>'
      + '<div style="position:relative;height:380px;background:#f0f2f5;margin:0 16px;border-radius:var(--radius-sm);overflow:hidden;"><div style="position:absolute;inset:0;background-image:linear-gradient(0deg,rgba(0,0,0,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.05) 1px,transparent 1px);background-size:30px 30px;"></div><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-100%);"><svg width="28" height="28" viewBox="0 0 24 24" fill="#ff4d4f" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></div></div>'
      + '<div style="padding:12px 16px;background:var(--bg-section-alt);display:flex;gap:var(--spacing-lg);font-size:var(--font-size-sm);color:var(--text-secondary);"><span>经度: <strong style="color:var(--text-primary);">113.9398</strong></span><span>纬度: <strong style="color:var(--text-primary);">22.5341</strong></span></div></div>'
      + '<div class="modal-footer"><button type="button" class="btn btn-default" id="pdMapCancel">取消</button><button type="button" class="btn btn-primary" id="pdMapOk">确定</button></div></div>';
    document.body.appendChild(map);
    function closeMap() { map.classList.remove('show'); }
    map.querySelector('#pdMapClose').onclick = closeMap;
    map.querySelector('#pdMapCancel').onclick = closeMap;
    map.querySelector('#pdMapOk').onclick = function () {
      closeMap();
      if (typeof window.showToast === 'function') window.showToast('地图选点完成');
    };
  }

  function show(host, record, opts) {
    inject();
    hooks.onBack = opts && opts.onBack;
    hooks.onEdit = opts && opts.onEdit;
    host.style.display = 'block';
    host.innerHTML = render(record);
    host.querySelector('#pdBack').onclick = function () { if (hooks.onBack) hooks.onBack(); };
    host.querySelector('#pdEdit').onclick = function () { if (hooks.onEdit) hooks.onEdit(); };
    host.querySelector('#pdPin').onclick = function () {
      document.getElementById('pdMapDialog').classList.add('show');
    };
  }

  function hide(host) {
    if (!host) return;
    host.style.display = 'none';
    host.innerHTML = '';
  }

  window.ProjectDetailView = { show: show, hide: hide };
})();
