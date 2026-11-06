/**
 * 企业新增/编辑：安全场景标签库 + 监管单位
 * 仅基础模式；政府端再限「本单位是该领域小类监管单位」。
 * 第一个选中的领域小类为主领域小类。
 * 行业主管、专业监管可取消；属地监管由归属网格带出且不可取消。
 */
'use strict';

var EntScene = (function () {
  var TYPE_LABELS = { industry: '行业主管', professional: '专业监管', local: '属地监管' };
  var TYPE_ORDER = ['industry', 'professional', 'local'];

  function createPicker() {
    return { activeIndustry: null, selectedIds: [], unchecked: {}, search: '' };
  }

  var pickers = { add: createPicker(), edit: createPicker() };

  function portal() {
    return (typeof ENT_PORTAL !== 'undefined' && ENT_PORTAL) ? ENT_PORTAL : 'super';
  }

  function loginOrgId() {
    try { return localStorage.getItem('gov_domain_supervise_perspective') || 'NS-AMB'; }
    catch (e) { return 'NS-AMB'; }
  }

  function catalog() {
    return (typeof DOMAIN_TABLE_DATA !== 'undefined' && DOMAIN_TABLE_DATA) ? DOMAIN_TABLE_DATA : [];
  }

  function esc(value) {
    if (typeof escapeHtml === 'function') return escapeHtml(value == null ? '' : String(value));
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function findDomain(id) {
    return catalog().find(function (d) { return d.id === id; }) || null;
  }

  function selectable(domain) {
    if (!domain || domain.mode !== 'basic') return false;
    if (portal() !== 'government') return true;
    var orgId = loginOrgId();
    return (domain.supervisors || []).some(function (s) { return s.orgId === orgId; });
  }

  function domains() {
    return catalog().filter(selectable);
  }

  function hintText() {
    var scopeText = portal() === 'government'
      ? '仅可选择本单位作为监管单位的基础模式领域小类。'
      : '仅可选择基础模式领域小类。';
    return scopeText + '按选择顺序，第一个为主领域小类，至少选择 1 个。';
  }

  function streetOf(scope) {
    if (scope === 'add') {
      return (typeof entRegionPanelState !== 'undefined' && entRegionPanelState) ? (entRegionPanelState.street || '') : '';
    }
    return (typeof editRegionState !== 'undefined' && editRegionState) ? (editRegionState.street || '') : '';
  }

  function mergedNonLocal(ids) {
    var groups = { industry: [], professional: [] };
    var seen = {};
    ids.forEach(function (id) {
      var domain = findDomain(id);
      if (!domain || !selectable(domain)) return;
      (domain.supervisors || []).forEach(function (s) {
        if (s.type !== 'industry' && s.type !== 'professional') return;
        var key = s.type + '|' + s.orgId;
        if (seen[key]) return;
        seen[key] = true;
        groups[s.type].push({ type: s.type, orgId: s.orgId, name: s.name });
      });
    });
    return groups;
  }

  function packOf(scope) {
    var picker = pickers[scope];
    var groups = mergedNonLocal(picker.selectedIds);
    var selected = [];
    TYPE_ORDER.forEach(function (type) {
      if (type === 'local') return;
      (groups[type] || []).forEach(function (item) {
        if (picker.unchecked[type + '|' + item.orgId]) return;
        selected.push(item);
      });
    });
    var local = null;
    var street = streetOf(scope);
    if (street && typeof getLocalSupervisorByStreetName === 'function') {
      var unit = getLocalSupervisorByStreetName(street);
      if (unit) local = { type: 'local', orgId: unit.orgId, name: unit.name };
    }
    if (local) selected.push(local);
    return { groups: groups, selected: selected, local: local };
  }

  function renderHints() {
    ['addDomainHint', 'editDomainRule'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = hintText();
    });
  }

  function renderColumns(scope) {
    var industryCol = document.getElementById(scope + 'DomainColIndustry');
    var domainCol = document.getElementById(scope + 'DomainColDomain');
    if (!industryCol || !domainCol) return;
    var picker = pickers[scope];
    var list = domains();
    var industryMap = {};
    var order = (typeof DOMAIN_INDUSTRY_MAP !== 'undefined') ? Object.keys(DOMAIN_INDUSTRY_MAP) : [];
    order.forEach(function (code) {
      industryMap[code] = { code: code, name: DOMAIN_INDUSTRY_MAP[code], count: 0 };
    });
    list.forEach(function (d) {
      var code = d.industry || 'OTH';
      if (!industryMap[code]) {
        industryMap[code] = { code: code, name: d.industryName || code, count: 0 };
        order.push(code);
      }
      industryMap[code].count += 1;
    });
    var industries = order.map(function (code) { return industryMap[code]; });
    if (!picker.activeIndustry || !industryMap[picker.activeIndustry]) {
      picker.activeIndustry = industries.length ? industries[0].code : null;
    }

    function countBadge(count) {
      return '<span class="ent-domain-badge' + (count ? '' : ' is-zero') + '">' + count + '</span>';
    }

    var html = '<div class="ent-domain-col-head">行业大类</div>';
    industries.forEach(function (item) {
      var active = item.code === picker.activeIndustry;
      html += '<div class="ent-domain-item' + (active ? ' active' : '') + '" data-scene-action="industry" data-scene-scope="' + scope + '" data-scene-code="' + esc(item.code) + '"><span class="ent-domain-name">' + esc(item.name) + '</span>' + countBadge(item.count) + '</div>';
    });
    industryCol.innerHTML = html;

    var keyword = (picker.search || '').trim().toLowerCase();
    var items = list.filter(function (d) {
      if (keyword) return String(d.name || '').toLowerCase().indexOf(keyword) >= 0;
      return d.industry === picker.activeIndustry;
    });
    var headName = keyword ? '搜索结果' : (industryMap[picker.activeIndustry] ? industryMap[picker.activeIndustry].name : '领域小类');
    var right = '<div class="ent-domain-col-head"><span class="ent-domain-name">' + esc(headName) + '</span>' + countBadge(items.length) + '</div>';
    if (!items.length) {
      right += '<div class="ent-domain-empty">' + (keyword ? '无匹配领域小类' : '暂无领域小类') + '</div>';
    }
    items.forEach(function (d) {
      var checked = picker.selectedIds.indexOf(d.id) >= 0;
      right += '<div class="ent-domain-item' + (checked ? ' active' : '') + '" data-scene-action="domain" data-scene-scope="' + scope + '" data-scene-id="' + esc(d.id) + '">';
      right += '<input type="checkbox" tabindex="-1"' + (checked ? ' checked' : '') + '>';
      right += '<span>' + esc(d.name) + (keyword ? ' <span class="ent-domain-count">(' + esc(d.industryName || '') + ')</span>' : '') + '</span></div>';
    });
    domainCol.innerHTML = right;
    placePopover(scope);
  }

  function placePopover(scope) {
    var pop = document.getElementById(scope + 'DomainPopover');
    if (!pop || !pop.classList.contains('open')) return;
    pop.style.top = 'calc(100% + 4px)';
    pop.style.bottom = 'auto';
    var field = pop.parentElement;
    if (!field) return;
    var popRect = pop.getBoundingClientRect();
    var fieldRect = field.getBoundingClientRect();
    var modal = pop.closest('.modal-body');
    var limitBottom = modal ? modal.getBoundingClientRect().bottom - 8 : window.innerHeight - 8;
    var limitTop = modal ? modal.getBoundingClientRect().top + 8 : 8;
    if (popRect.bottom <= limitBottom) return;
    var spaceAbove = fieldRect.top - limitTop;
    var spaceBelow = limitBottom - fieldRect.bottom;
    if (spaceAbove > spaceBelow) {
      pop.style.top = 'auto';
      pop.style.bottom = 'calc(100% + 4px)';
    }
  }

  function renderTags(scope) {
    var label = document.getElementById(scope + 'DomainLabel');
    if (!label) return;
    var picker = pickers[scope];
    picker.selectedIds = picker.selectedIds.filter(function (id) { return selectable(findDomain(id)); });
    if (!picker.selectedIds.length) {
      label.className = 'ent-domain-value placeholder';
      label.textContent = '请选择领域小类';
      return;
    }
    var html = '';
    picker.selectedIds.forEach(function (id, index) {
      var domain = findDomain(id);
      if (!domain) return;
      html += '<span class="domain-tag">';
      if (index === 0) html += '<span class="primary-mark">主</span>';
      html += esc(domain.name);
      html += '<span class="remove" data-scene-action="remove" data-scene-scope="' + scope + '" data-scene-id="' + esc(id) + '">×</span>';
      html += '</span>';
    });
    label.className = 'ent-domain-value';
    label.innerHTML = html;
  }

  function emptySupervisorTag() {
    return '<span class="supervisor-tag is-empty">未带出</span>';
  }

  function renderSupervisors(scope) {
    var container = document.getElementById(scope + 'SupervisorGroups');
    if (!container) return;
    var picker = pickers[scope];
    var pack = packOf(scope);
    var picked = picker.selectedIds.length > 0;
    var html = '<div class="supervisor-board">';
    TYPE_ORDER.forEach(function (type) {
      html += '<div class="supervisor-card"><div class="supervisor-card-label">' + TYPE_LABELS[type] + '：</div><div class="supervisor-tags">';
      if (!picked) {
        html += emptySupervisorTag();
      } else if (type === 'local') {
        html += pack.local
          ? '<span class="supervisor-tag locked">' + esc(pack.local.name) + '</span>'
          : emptySupervisorTag();
      } else {
        var items = pack.groups[type] || [];
        if (!items.length) {
          html += emptySupervisorTag();
        } else {
          items.forEach(function (item) {
            var on = pack.selected.some(function (s) { return s.type === item.type && s.orgId === item.orgId; });
            html += '<span class="supervisor-tag' + (on ? ' active' : '') + '" data-scene-action="supervisor" data-scene-scope="' + scope + '" data-scene-type="' + esc(item.type) + '" data-scene-org="' + esc(item.orgId) + '">' + esc(item.name) + '</span>';
          });
        }
      }
      html += '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function render(scope) {
    renderHints();
    renderColumns(scope);
    renderTags(scope);
    renderSupervisors(scope);
  }

  function close(scope) {
    var pop = document.getElementById(scope + 'DomainPopover');
    if (!pop) return;
    pop.classList.remove('open');
    pop.style.display = 'none';
  }

  function toggle(scope, ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    var pop = document.getElementById(scope + 'DomainPopover');
    if (!pop) return;
    var willOpen = !pop.classList.contains('open');
    close('add');
    close('edit');
    if (willOpen) {
      pop.classList.add('open');
      pop.style.display = 'flex';
      renderColumns(scope);
    }
  }

  function reset(scope) {
    pickers[scope] = createPicker();
    var search = document.getElementById(scope + 'DomainSearch');
    if (search) search.value = '';
    close(scope);
    render(scope);
  }

  function load(scope, ids) {
    pickers[scope] = createPicker();
    var clean = [];
    (ids || []).forEach(function (id) {
      var domain = findDomain(id);
      if (selectable(domain) && clean.indexOf(domain.id) < 0) clean.push(domain.id);
    });
    pickers[scope].selectedIds = clean;
    if (clean.length) {
      var first = findDomain(clean[0]);
      if (first) pickers[scope].activeIndustry = first.industry;
    }
    var search = document.getElementById(scope + 'DomainSearch');
    if (search) search.value = '';
    render(scope);
  }

  function selectIndustry(scope, code) {
    pickers[scope].activeIndustry = code;
    pickers[scope].search = '';
    var search = document.getElementById(scope + 'DomainSearch');
    if (search) search.value = '';
    renderColumns(scope);
  }

  function toggleDomain(scope, id) {
    var domain = findDomain(id);
    if (!selectable(domain)) return;
    var ids = pickers[scope].selectedIds;
    var index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
    else ids.push(id);
    render(scope);
  }

  function removeDomain(scope, id) {
    var ids = pickers[scope].selectedIds;
    var index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
    render(scope);
  }

  function toggleSupervisor(scope, type, orgId) {
    if (type === 'local') return;
    var key = type + '|' + orgId;
    if (pickers[scope].unchecked[key]) delete pickers[scope].unchecked[key];
    else pickers[scope].unchecked[key] = true;
    renderSupervisors(scope);
  }

  function search(scope) {
    var input = document.getElementById(scope + 'DomainSearch');
    pickers[scope].search = input ? input.value : '';
    renderColumns(scope);
  }

  function syncLocal(scope) {
    renderSupervisors(scope);
  }

  function validate(scope) {
    if (!pickers[scope].selectedIds.length) {
      if (typeof showToast === 'function') showToast('请至少选择 1 个领域小类');
      return false;
    }
    if (!packOf(scope).local) {
      if (typeof showToast === 'function') showToast('请选择归属网格，以带出属地监管单位');
      return false;
    }
    return true;
  }

  function namesOf(scope, type) {
    return packOf(scope).selected.filter(function (s) { return s.type === type; }).map(function (s) { return s.name; }).join('、') || '—';
  }

  function applyToEnterprise(ent, scope) {
    if (!ent) return;
    var first = findDomain(pickers[scope].selectedIds[0]);
    if (first) {
      ent.domain = first.name;
      ent.domainId = first.id;
      ent.domainIds = pickers[scope].selectedIds.slice();
    }
    ent.industryDept = namesOf(scope, 'industry');
    ent.professionalDept = namesOf(scope, 'professional');
    ent.localDept = namesOf(scope, 'local');
  }

  function snapshot(scope) {
    return {
      activeIndustry: pickers[scope].activeIndustry,
      selectedIds: pickers[scope].selectedIds.slice()
    };
  }

  document.addEventListener('click', function (e) {
    var hit = e.target.closest ? e.target.closest('[data-scene-action]') : null;
    if (hit) {
      var scope = hit.getAttribute('data-scene-scope');
      var action = hit.getAttribute('data-scene-action');
      if (action === 'industry') selectIndustry(scope, hit.getAttribute('data-scene-code'));
      else if (action === 'domain') toggleDomain(scope, hit.getAttribute('data-scene-id'));
      else if (action === 'remove') removeDomain(scope, hit.getAttribute('data-scene-id'));
      else if (action === 'supervisor') toggleSupervisor(scope, hit.getAttribute('data-scene-type'), hit.getAttribute('data-scene-org'));
      if (e.stopPropagation) e.stopPropagation();
      return;
    }
    ['add', 'edit'].forEach(function (scope) {
      var pop = document.getElementById(scope + 'DomainPopover');
      var trigger = document.getElementById(scope + 'DomainTrigger');
      if (!pop || !pop.classList.contains('open')) return;
      if (pop.contains(e.target) || (trigger && trigger.contains(e.target))) return;
      close(scope);
    });
  }, true);

  return {
    toggle: toggle,
    reset: reset,
    load: load,
    render: render,
    search: search,
    syncLocal: syncLocal,
    validate: validate,
    applyToEnterprise: applyToEnterprise,
    snapshot: snapshot
  };
})();
