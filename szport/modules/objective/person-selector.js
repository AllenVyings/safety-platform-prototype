/**
 * Person Selector — 共享人员选择器组件
 * 从 org-data.js 组织架构动态生成模拟人员数据
 * 使用: openPersonSelector({ multi:true }, function(selected){ ... })
 */
(function() {
  var _personCache = {};
  var _surnames = ['张','李','王','赵','刘','陈','杨','黄','周','吴','徐','孙','马','朱','胡'];
  var _givenNames = ['明','强','磊','芳','涛','伟','军','丽','杰','敏','华','平','刚','秀英','建'];
  var _titles = ['负责人','主管','安全员','专员','副主管','技术员'];

  function _findOrgNode(nodeId) {
    if (typeof orgList === 'undefined') return null;
    function walk(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].id === nodeId) return nodes[i];
        if (nodes[i].children) { var f = walk(nodes[i].children); if (f) return f; }
      }
      return null;
    }
    return walk(orgList);
  }

  function getMockPersons(unitId) {
    if (_personCache[unitId]) return _personCache[unitId];
    var node = _findOrgNode(unitId);
    if (!node || !node.children) return [];
    var result = [];
    var depts = node.children.filter(function(c) { return c.type === '部门'; });
    depts.forEach(function(dept, di) {
      var persons = [];
      var count = Math.min(3, Math.max(1, 3));
      for (var i = 0; i < count; i++) {
        var idx = (di * 3 + i);
        persons.push({
          id: 'p-' + dept.id + '-' + i,
          name: _surnames[idx % _surnames.length] + _givenNames[idx % _givenNames.length],
          title: dept.name.replace(/与环保部$/, '部').replace(/部$|室$|中心$/, '') + _titles[i % _titles.length]
        });
      }
      result.push({ deptId: dept.id, deptName: dept.name, persons: persons });
    });
    _personCache[unitId] = result;
    return result;
  }

  function _renderModal() {
    if (document.getElementById('modal-person-selector')) return;
    var overlay = document.createElement('div');
    overlay.id = 'modal-person-selector';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal" style="width:min(720px,94vw);max-height:80vh;display:flex;flex-direction:column;">'
      + '<div class="modal-header" style="flex-shrink:0;"><h3>选择人员</h3>'
      + '<button class="btn btn-text btn-sm" onclick="closePersonSelector()">&times;</button></div>'
      + '<div class="modal-body" style="flex:1;min-height:0;overflow-y:auto;padding:12px 20px;">'
      + '<div style="margin-bottom:12px;"><input class="form-input" id="personSearchInput" placeholder="搜索姓名" style="width:200px;"></div>'
      + '<div id="personSelectorContent"></div></div>'
      + '<div class="modal-footer" style="flex-shrink:0;">'
      + '<button class="btn btn-default" onclick="closePersonSelector()">取消</button>'
      + '<button class="btn btn-primary" onclick="confirmPersonSelector()">确认选择</button></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closePersonSelector(); });
    document.getElementById('personSearchInput').addEventListener('input', function() {
      var kw = this.value.trim().toLowerCase();
      document.querySelectorAll('#personSelectorContent .ps-person-item').forEach(function(el) {
        el.style.display = (!kw || el.textContent.toLowerCase().indexOf(kw) >= 0) ? '' : 'none';
      });
    });
  }

  var _callback = null;
  var _multi = true;
  var _selectedIds = {};

  window.openPersonSelector = function(opts, cb) {
    _multi = (opts && opts.multi !== false);
    _callback = cb;
    _selectedIds = {};
    _renderModal();
    var unitId = (opts && opts.unitId) || (typeof currentUnit !== 'undefined' ? currentUnit : 'group');
    var groups = getMockPersons(unitId);
    var html = '';
    groups.forEach(function(g) {
      html += '<div class="ps-group">';
      html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-weight:600;font-size:var(--font-size-13);color:var(--text-primary);border-bottom:1px solid var(--border-light);">'
        + '<input type="checkbox" class="ps-group-check" data-group="' + g.deptId + '" onchange="togglePersonGroup(\'' + g.deptId + '\',this.checked)">'
        + g.deptName + '</div>';
      g.persons.forEach(function(p) {
        html += '<label class="ps-person-item" style="display:flex;align-items:center;gap:8px;padding:5px 0 5px 24px;font-size:var(--font-size-13);cursor:pointer;">'
          + '<input type="checkbox" class="ps-person-check" data-group="' + g.deptId + '" data-pid="' + p.id + '" data-pname="' + p.name + '" data-ptitle="' + p.title + '">'
          + '<span>' + p.name + '</span><span style="color:var(--text-tertiary);font-size:var(--font-size-12);">' + p.title + '</span></label>';
      });
      html += '</div>';
    });
    if (!html) html = '<div style="text-align:center;padding:24px;color:var(--text-tertiary);">当前单位无人员数据</div>';
    document.getElementById('personSelectorContent').innerHTML = html;
    document.getElementById('personSearchInput').value = '';
    document.getElementById('modal-person-selector').classList.add('show');
  };

  window.closePersonSelector = function() {
    var m = document.getElementById('modal-person-selector');
    if (m) m.classList.remove('show');
  };

  window.togglePersonGroup = function(groupId, checked) {
    document.querySelectorAll('.ps-person-check[data-group="' + groupId + '"]').forEach(function(cb) {
      cb.checked = checked;
    });
  };

  window.confirmPersonSelector = function() {
    var selected = [];
    document.querySelectorAll('.ps-person-check:checked').forEach(function(cb) {
      selected.push({ id: cb.getAttribute('data-pid'), name: cb.getAttribute('data-pname'), title: cb.getAttribute('data-ptitle') });
    });
    closePersonSelector();
    if (_callback) _callback(selected);
  };

  window.getMockPersons = getMockPersons;

  // Inject minimal CSS
  var style = document.createElement('style');
  style.textContent = '.ps-group{margin-bottom:8px;}.ps-person-item:hover{background:var(--bg-hover);border-radius:4px;}';
  document.head.appendChild(style);
})();
