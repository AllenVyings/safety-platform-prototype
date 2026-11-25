/**
 * 政府端统一导出中心（共享）
 * - 任务状态机：queued → packaging → completed / failed
 * - 全模块共用一个任务中心（localStorage: sa_gov_export_tasks）
 * - 支持下载 / 重试 / 全状态删除（二次确认）
 * - 由模块提供：列定义、取数函数、补充筛选、数据范围摘要
 *
 * 用法：
 * ExportCenter.init({
 *   moduleKey: 'gov-hazard-manage',
 *   moduleName: '隐患记录',
 *   exportTitle: '导出隐患记录',
 *   filePrefix: '隐患记录',
 *   entryButtonId: 'btnEcEntry',
 *   filters: [{ id:'level', label:'隐患等级', options:['一般隐患','重大事故隐患'] }],
 *   scopeSummary: function(filters){ return '...'; },
 *   getData: function(filters, withPhotos){
 *     return { headers:[], values:[[]], photoSvgs:[[]] };
 *   },
 *   photoTip: '开启后内嵌隐患照片/整改照片列'
 * });
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'sa_gov_export_tasks';
  var TICK_MS = 500;
  var QUEUE_MS = 1000;
  var PACK_MS = 4000;

  var config = null;
  var timer = null;
  var pendingDeleteId = null;
  var styleInjected = false;
  var domInjected = false;
  var tasksWasOpen = false;

  /* ======================= 工具 ======================= */

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function timeText(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) +
      ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }

  function stampText(ts) {
    var d = new Date(ts);
    return '' + d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) +
      '_' + pad2(d.getHours()) + pad2(d.getMinutes());
  }

  function makeId() {
    return 'EX' + Date.now() + '_' + String(Math.floor(Math.random() * 10000));
  }

  function loadTasks() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) || []) : [];
    } catch (err) {
      return [];
    }
  }

  function saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      /* 容量不足时忽略：演示环境可接受 */
    }
  }

  function taskActive(task) {
    return task.status === 'queued' || task.status === 'packaging';
  }

  function toast(message) {
    if (typeof global.showToast === 'function') {
      global.showToast(message);
      return;
    }
    var el = document.getElementById('ecToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ecToast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }

  /* ======================= 样式与 DOM ======================= */

  function injectStyle() {
    if (styleInjected) return;
    styleInjected = true;
    var css = [
      '.ec-mask{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1300;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45)}',
      '.ec-mask.show{display:flex}',
      '#ecExportMask{z-index:1350}',
      '#ecDeleteMask{z-index:1400}',
      '.ec-dialog{background:#fff;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.18);width:640px;max-width:calc(100vw - 48px);max-height:86vh;display:flex;flex-direction:column;overflow:hidden}',
      '.ec-dialog-tasks{width:880px}',
      '.ec-dialog-confirm{width:400px}',
      '.ec-head{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #f0f0f0;flex-shrink:0}',
      '.ec-head-title{font-size:16px;font-weight:600;color:#1f2329}',
      '.ec-head-close{background:none;border:none;font-size:22px;line-height:1;color:#8f959e;cursor:pointer;padding:0 4px}',
      '.ec-body{padding:18px 22px;overflow:auto;flex:1;min-height:0}',
      '.ec-foot{flex-shrink:0;padding:12px 22px;border-top:1px solid #f0f0f0;display:flex;justify-content:flex-end;gap:12px}',
      '.ec-scope{background:#f5f8fc;border:1px solid #e5e9f0;border-radius:6px;padding:12px 16px;margin-bottom:16px}',
      '.ec-scope-label{font-size:12px;color:#8f959e;margin-bottom:4px}',
      '.ec-scope-value{font-size:13px;color:#1f2329;line-height:1.6;word-break:break-word}',
      '.ec-scope-count{font-size:13px;color:#646a73;margin-top:6px}',
      '.ec-scope-count b{color:#1677ff;font-size:18px;font-weight:700;padding:0 2px}',
      '.ec-section-title{font-size:13px;font-weight:600;color:#1f2329;padding-left:10px;border-left:3px solid #1677ff;line-height:1.4;margin:0 0 12px}',
      '.ec-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:20px;row-gap:12px}',
      '.ec-field{display:flex;flex-direction:column;gap:6px}',
      '.ec-field label{font-size:13px;color:#646a73}',
      '.ec-field select,.ec-field input{width:100%;height:32px;padding:0 10px;border:1px solid #dee0e3;border-radius:6px;font-size:13px;box-sizing:border-box;background:#fff;outline:none}',
      '.ec-field select:focus,.ec-field input:focus{border-color:#1677ff}',
      '.ec-date-range{display:flex;align-items:center;gap:6px}',
      '.ec-date-range span{color:#8f959e;font-size:12px}',
      '.ec-photo-row{display:flex;align-items:center;gap:12px;border-top:1px solid #f0f0f0;margin-top:16px;padding-top:14px}',
      '.ec-photo-label{font-size:13px;color:#1f2329;font-weight:500}',
      '.ec-switch{display:inline-flex;align-items:center;gap:8px;cursor:pointer;height:28px}',
      '.ec-switch input{display:none}',
      '.ec-slider{width:36px;height:20px;border-radius:10px;background:#d9d9d9;position:relative;transition:background .2s;flex-shrink:0}',
      '.ec-slider::after{content:"";position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s}',
      '.ec-switch input:checked + .ec-slider{background:#1677ff}',
      '.ec-switch input:checked + .ec-slider::after{left:18px}',
      '.ec-switch-text{font-size:13px;color:#646a73}',
      '.ec-photo-tip{margin-left:auto;font-size:12px;color:#8f959e}',
      '.ec-toolbar{display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-bottom:14px}',
      '.ec-table{width:100%;border-collapse:collapse;font-size:13px;table-layout:fixed}',
      '.ec-table th{background:#f5f7fa;text-align:left;padding:10px 12px;font-weight:600;color:#1f2329;white-space:nowrap}',
      '.ec-table td{padding:12px;border-bottom:1px solid #f0f0f0;vertical-align:middle;color:#1f2329}',
      '.ec-table th:nth-child(1),.ec-table td:nth-child(1){width:92px}',
      '.ec-table th:nth-child(3),.ec-table td:nth-child(3){width:56px}',
      '.ec-table th:nth-child(4),.ec-table td:nth-child(4){width:120px}',
      '.ec-table th:nth-child(5),.ec-table td:nth-child(5){width:92px}',
      '.ec-table th:nth-child(6),.ec-table td:nth-child(6){width:132px}',
      '.ec-table td:nth-child(n+3){white-space:nowrap}',
      '.ec-task-name{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.ec-task-scope{color:#8f959e;font-size:12px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.ec-task-actions{display:flex;gap:12px;white-space:nowrap}',
      '.ec-link{padding:2px 0;border:none;background:none;color:#1677ff;cursor:pointer;font-size:13px}',
      '.ec-link:hover{text-decoration:underline}',
      '.ec-link.danger{color:#f53f3f}',
      '.ec-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:12px;white-space:nowrap}',
      '.ec-tag-queue{background:#f2f3f5;color:#646a73}',
      '.ec-tag-doing{background:#fff3e8;color:#ff7d00}',
      '.ec-tag-done{background:#e8ffea;color:#00b42a}',
      '.ec-tag-fail{background:#ffece8;color:#f53f3f}',
      '.ec-progress{color:#8f959e;font-size:12px;margin-left:4px}',
      '.ec-empty{text-align:center;color:#8f959e;padding:44px 12px}',
      '.ec-confirm-text{font-size:13px;color:#1f2329;line-height:1.8;word-break:break-word}',
      '.ec-badge{display:none;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#f53f3f;color:#fff;font-size:11px;line-height:16px;text-align:center;box-sizing:border-box;margin-left:4px;vertical-align:1px}',
      '.ec-badge.show{display:inline-block}',
      '#ecToast{position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:2000;padding:10px 20px;background:rgba(0,0,0,.78);color:#fff;font-size:14px;border-radius:6px;opacity:0;transition:opacity .3s;pointer-events:none}',
      '#ecToast.show{opacity:1}'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'ecStyle';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function injectDom() {
    if (domInjected) return;
    domInjected = true;
    var html = '' +
      '<div class="ec-mask" id="ecExportMask">' +
        '<div class="ec-dialog">' +
          '<div class="ec-head"><span class="ec-head-title" id="ecExportTitle">导出</span>' +
          '<button class="ec-head-close" type="button" data-ec-close="export">&times;</button></div>' +
          '<div class="ec-body">' +
            '<div class="ec-scope"><div class="ec-scope-label">数据范围</div>' +
            '<div class="ec-scope-value" id="ecScopeValue"></div>' +
            '<div class="ec-scope-count">当前条件共 <b id="ecCountNum">0</b> 条<span id="ecEmptyTip"></span></div></div>' +
            '<div class="ec-section-title">补充筛选</div>' +
            '<div class="ec-grid" id="ecFilterGrid"></div>' +
            '<div class="ec-photo-row">' +
              '<span class="ec-photo-label">是否导出照片</span>' +
              '<label class="ec-switch"><input type="checkbox" id="ecPhotos"><span class="ec-slider"></span>' +
              '<span class="ec-switch-text" id="ecPhotosText">否</span></label>' +
              '<span class="ec-photo-tip" id="ecPhotoTip"></span>' +
            '</div>' +
          '</div>' +
          '<div class="ec-foot">' +
            '<button class="btn btn-default" type="button" data-ec-close="export">取消</button>' +
            '<button class="btn btn-primary" type="button" id="ecSubmit">提交导出任务</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ec-mask" id="ecTasksMask">' +
        '<div class="ec-dialog ec-dialog-tasks">' +
          '<div class="ec-head"><span class="ec-head-title">导出记录</span>' +
          '<button class="ec-head-close" type="button" data-ec-close="tasks">&times;</button></div>' +
          '<div class="ec-body">' +
            '<div class="ec-toolbar"><button class="btn btn-primary" type="button" id="ecBatchBtn">批量导出</button></div>' +
            '<div id="ecTaskListBody"></div>' +
          '</div>' +
          '<div class="ec-foot"><button class="btn btn-primary" type="button" data-ec-close="tasks">关闭</button></div>' +
        '</div>' +
      '</div>' +
      '<div class="ec-mask" id="ecDeleteMask">' +
        '<div class="ec-dialog ec-dialog-confirm">' +
          '<div class="ec-head"><span class="ec-head-title">删除导出任务</span>' +
          '<button class="ec-head-close" type="button" data-ec-close="delete">&times;</button></div>' +
          '<div class="ec-body"><div class="ec-confirm-text" id="ecDeleteText"></div></div>' +
          '<div class="ec-foot">' +
            '<button class="btn btn-default" type="button" data-ec-close="delete">取消</button>' +
            '<button class="btn btn-danger" type="button" id="ecConfirmDelete">删除</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    var holder = document.createElement('div');
    holder.id = 'ecRoot';
    holder.innerHTML = html;
    document.body.appendChild(holder);
  }

  function showMask(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('show');
  }

  function hideMask(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('show');
  }

  /* ======================= 任务状态 ======================= */

  function ensureTimer() {
    if (!timer) timer = setInterval(tickTasks, TICK_MS);
  }

  function stopTimerIfIdle(tasks) {
    var active = tasks.some(taskActive);
    if (!active && timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function tickTasks() {
    var tasks = loadTasks();
    var now = Date.now();
    var changed = false;
    tasks.forEach(function (task) {
      if (task.status === 'queued' && now - task.createdAt >= QUEUE_MS) {
        task.status = 'packaging';
        task.progress = 0;
        changed = true;
      } else if (task.status === 'packaging') {
        task.progress = Math.min(100, Math.round((now - task.createdAt - QUEUE_MS) / PACK_MS * 100));
        if (task.progress >= 100) {
          if (global.ExcelJS) {
            task.status = 'completed';
            task.completedAt = now;
          } else {
            task.status = 'failed';
            task.error = 'ExcelJS 未加载';
          }
        }
        changed = true;
      }
    });
    if (changed) {
      saveTasks(tasks);
      renderBadge();
      if (isShown('ecTasksMask')) renderTaskList();
    }
    stopTimerIfIdle(tasks);
  }

  function isShown(id) {
    var el = document.getElementById(id);
    return !!(el && el.classList.contains('show'));
  }

  /* ======================= 徽标 ======================= */

  function renderBadge() {
    var count = loadTasks().filter(function (task) {
      return task.status === 'completed' && !task.downloaded;
    }).length;
    var badges = document.querySelectorAll('.ec-badge');
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = count > 99 ? '99+' : String(count);
      badges[i].classList.toggle('show', count > 0);
    }
  }

  /* ======================= 导出设置 ======================= */

  function buildFilters() {
    var grid = document.getElementById('ecFilterGrid');
    var list = config.filters || [];
    var html = '';
    list.forEach(function (item) {
      var id = 'ecF_' + item.id;
      if (item.type === 'dateRange') {
        html += '<div class="ec-field"><label>' + esc(item.label) + '</label>' +
          '<div class="ec-date-range"><input type="date" id="' + id + 'Start">' +
          '<span>至</span><input type="date" id="' + id + 'End"></div></div>';
      } else if (item.type === 'text') {
        html += '<div class="ec-field"><label for="' + id + '">' + esc(item.label) + '</label>' +
          '<input type="text" id="' + id + '" placeholder="' + esc(item.placeholder || '') + '"></div>';
      } else {
        var options = ['<option value="">' + esc(item.allLabel || '全部') + '</option>'];
        (item.options || []).forEach(function (opt) {
          options.push('<option value="' + esc(opt) + '">' + esc(opt) + '</option>');
        });
        html += '<div class="ec-field"><label for="' + id + '">' + esc(item.label) + '</label>' +
          '<select id="' + id + '">' + options.join('') + '</select></div>';
      }
    });
    grid.innerHTML = html;
  }

  function readFilters() {
    var values = {};
    (config.filters || []).forEach(function (item) {
      if (item.type === 'dateRange') {
        var start = document.getElementById('ecF_' + item.id + 'Start');
        var end = document.getElementById('ecF_' + item.id + 'End');
        values[item.id + 'Start'] = start ? start.value : '';
        values[item.id + 'End'] = end ? end.value : '';
      } else {
        var el = document.getElementById('ecF_' + item.id);
        values[item.id] = el ? el.value.trim() : '';
      }
    });
    values.photos = config.showPhotoSwitch === false ? false : !!(document.getElementById('ecPhotos') && document.getElementById('ecPhotos').checked);
    return values;
  }

  function currentData() {
    var filters = readFilters();
    var data = config.getData(filters, filters.photos) || { headers: [], values: [], photoSvgs: [] };
    return { filters: filters, data: data };
  }

  function updateCount() {
    var result = currentData();
    var count = result.data.values.length;
    document.getElementById('ecCountNum').textContent = String(count);
    document.getElementById('ecEmptyTip').textContent = count ? '' : '，' + (config.emptyText || '暂无可导出记录');
    document.getElementById('ecSubmit').disabled = count === 0;
  }

  function openExportDialog() {
    if (!config) return;
    document.getElementById('ecExportTitle').textContent = config.exportTitle || ('导出' + config.moduleName);
    document.getElementById('ecPhotoTip').textContent = config.photoTip || '开启后内嵌照片列';
    buildFilters();
    document.getElementById('ecScopeValue').textContent = config.scopeSummary ? config.scopeSummary(readFilters()) : '当前筛选范围';
    var photos = document.getElementById('ecPhotos');
    photos.checked = false;
    document.getElementById('ecPhotosText').textContent = '否';
    var photoRow = document.querySelector('#ecExportMask .ec-photo-row');
    if (photoRow) photoRow.style.display = config.showPhotoSwitch === false ? 'none' : '';
    updateCount();
    tasksWasOpen = isShown('ecTasksMask');
    if (tasksWasOpen) hideMask('ecTasksMask');
    showMask('ecExportMask');
  }

  function closeExportDialog() {
    hideMask('ecExportMask');
    if (tasksWasOpen) {
      tasksWasOpen = false;
      showMask('ecTasksMask');
      renderTaskList();
    }
  }

  function submitExport() {
    var result = currentData();
    var data = result.data;
    if (!data.values.length) {
      toast('当前范围暂无可导出记录');
      return;
    }
    var now = Date.now();
    var task = {
      id: makeId(),
      moduleKey: config.moduleKey,
      moduleName: config.moduleName,
      fileName: (config.filePrefix || config.moduleName) + '_' + stampText(now) + '.xlsx',
      scope: config.scopeSummary ? config.scopeSummary(result.filters) : '',
      count: data.values.length,
      withPhotos: result.filters.photos,
      headers: data.headers,
      values: data.values,
      photoSvgs: data.photoSvgs || [],
      status: 'queued',
      progress: 0,
      createdAt: now,
      createdAtText: timeText(now),
      downloaded: false
    };
    var tasks = loadTasks();
    tasks.unshift(task);
    saveTasks(tasks);
    ensureTimer();
    renderBadge();
    closeExportDialog();
    if (isShown('ecTasksMask')) renderTaskList();
    toast('已提交打包任务，完成后可在「导出记录」下载');
  }

  /* ======================= 任务中心 ======================= */

  function statusTag(task) {
    if (task.status === 'queued') return '<span class="ec-tag ec-tag-queue">排队中</span>';
    if (task.status === 'packaging') {
      return '<span class="ec-tag ec-tag-doing">打包中</span><span class="ec-progress">' + (task.progress || 0) + '%</span>';
    }
    if (task.status === 'completed') return '<span class="ec-tag ec-tag-done">已完成</span>';
    return '<span class="ec-tag ec-tag-fail">失败</span>';
  }

  function renderTaskList() {
    var tasks = loadTasks();
    var box = document.getElementById('ecTaskListBody');
    if (!box) return;
    if (!tasks.length) {
      box.innerHTML = '<div class="ec-empty">暂无导出任务</div>';
      return;
    }
    var html = '<table class="ec-table"><thead><tr><th>导出类型</th><th>文件名</th><th>条数</th><th>提交时间</th><th>状态</th><th>操作</th></tr></thead><tbody>';
    tasks.forEach(function (task) {
      var actions = '';
      if (task.status === 'completed') {
        actions += '<button class="ec-link" type="button" data-ec-download="' + esc(task.id) + '">下载</button>';
      } else if (task.status === 'failed') {
        actions += '<button class="ec-link" type="button" data-ec-retry="' + esc(task.id) + '">重试</button>';
      }
      actions += '<button class="ec-link danger" type="button" data-ec-delete="' + esc(task.id) + '">删除</button>';
      html += '<tr>' +
        '<td>' + esc(task.moduleName || '—') + '</td>' +
        '<td><div class="ec-task-name" title="' + esc(task.fileName) + '">' + esc(task.fileName) + '</div>' +
        '<div class="ec-task-scope" title="' + esc(task.scope || '') + '">' + esc(task.scope || '') + '</div></td>' +
        '<td>' + task.count + '</td>' +
        '<td>' + esc(task.createdAtText) + '</td>' +
        '<td>' + statusTag(task) + '</td>' +
        '<td><div class="ec-task-actions">' + actions + '</div></td>' +
      '</tr>';
    });
    html += '</tbody></table>';
    box.innerHTML = html;
  }

  function openTaskCenter() {
    renderTaskList();
    showMask('ecTasksMask');
  }

  function closeTaskCenter() {
    hideMask('ecTasksMask');
  }

  /* ======================= 删除 / 重试 ======================= */

  function askDelete(id) {
    var task = loadTasks().filter(function (item) { return item.id === id; })[0];
    if (!task) return;
    pendingDeleteId = id;
    var tip = taskActive(task)
      ? '该任务正在处理中，删除将取消打包。'
      : '删除后该任务记录将移除，已下载的文件不受影响。';
    document.getElementById('ecDeleteText').textContent = '确定删除导出任务「' + task.fileName + '」？' + tip;
    showMask('ecDeleteMask');
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;
    var tasks = loadTasks().filter(function (item) { return item.id !== pendingDeleteId; });
    saveTasks(tasks);
    pendingDeleteId = null;
    hideMask('ecDeleteMask');
    renderBadge();
    renderTaskList();
    toast('已删除导出任务');
  }

  function retryTask(id) {
    var tasks = loadTasks();
    var task = tasks.filter(function (item) { return item.id === id; })[0];
    if (!task || task.status !== 'failed') return;
    task.status = 'queued';
    task.progress = 0;
    task.createdAt = Date.now();
    task.createdAtText = timeText(task.createdAt);
    delete task.error;
    saveTasks(tasks);
    ensureTimer();
    renderTaskList();
    toast('已重新提交打包任务');
  }

  /* ======================= xlsx 构建 / 下载 ======================= */

  function rasterizeSvg(svg) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = 96;
          canvas.height = 96;
          canvas.getContext('2d').drawImage(img, 0, 0, 96, 96);
          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          resolve(null);
        }
      };
      img.onerror = function () { resolve(null); };
      img.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    });
  }

  var LONG_HEADERS = ['隐患描述', '检查内容', '整改反馈', '复核意见', '检查表名称', '管控对象', '企业名称', '项目名称', '场所名称'];

  function buildWorkbook(task) {
    var headerStyle = { bold: true, color: { argb: 'FF1F2329' } };
    var headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F4FF' } };
    var workbook = new global.ExcelJS.Workbook();
    var sheetName = String(task.moduleName || '导出数据').slice(0, 28) || '导出数据';
    var sheet = workbook.addWorksheet(sheetName);
    sheet.views = [{ state: 'frozen', ySplit: 1 }];
    var headerRow = sheet.addRow(task.headers);
    headerRow.font = headerStyle;
    headerRow.fill = headerFill;
    headerRow.alignment = { vertical: 'middle' };
    sheet.columns.forEach(function (col, index) {
      var header = task.headers[index] || '';
      col.width = header.indexOf('照片') >= 0 ? 14 : (LONG_HEADERS.indexOf(header) >= 0 ? 38 : 16);
    });
    var photoColIndexes = [];
    task.headers.forEach(function (header, index) {
      if (header.indexOf('照片') >= 0) photoColIndexes.push(index);
    });
    var pending = [];
    task.values.forEach(function (values, rowIndex) {
      var row = sheet.addRow(values);
      row.alignment = { vertical: 'middle', wrapText: true };
      if (!task.withPhotos || !photoColIndexes.length) return;
      var svgs = (task.photoSvgs && task.photoSvgs[rowIndex]) || [];
      var hasPhoto = false;
      photoColIndexes.forEach(function (colIndex) {
        var svg = svgs[colIndex];
        if (!svg) return;
        hasPhoto = true;
        pending.push(rasterizeSvg(svg).then(function (png) {
          if (!png) return;
          sheet.addImage(workbook.addImage({ base64: png, extension: 'png' }), {
            tl: { col: colIndex, row: rowIndex + 1 },
            ext: { width: 72, height: 72 }
          });
        }));
      });
      if (hasPhoto) row.height = 72;
    });
    return Promise.all(pending).then(function () {
      return workbook.xlsx.writeBuffer();
    });
  }

  function triggerDownload(buffer, fileName) {
    var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function downloadTask(id) {
    var tasks = loadTasks();
    var task = tasks.filter(function (item) { return item.id === id; })[0];
    if (!task || task.status !== 'completed') return;
    if (!global.ExcelJS) {
      toast('导出组件未加载，无法生成文件');
      return;
    }
    buildWorkbook(task).then(function (buffer) {
      triggerDownload(buffer, task.fileName);
      task.downloaded = true;
      saveTasks(tasks);
      renderBadge();
      renderTaskList();
      toast('已开始下载');
    }).catch(function () {
      toast('下载失败，请重试');
    });
  }

  /* ======================= 事件绑定 ======================= */

  function bindEvents() {
    document.addEventListener('click', function (event) {
      var closeBtn = event.target.closest('[data-ec-close]');
      if (closeBtn) {
        var target = closeBtn.getAttribute('data-ec-close');
        if (target === 'export') closeExportDialog();
        else if (target === 'tasks') closeTaskCenter();
        else if (target === 'delete') { pendingDeleteId = null; hideMask('ecDeleteMask'); }
        return;
      }
      var downloadBtn = event.target.closest('[data-ec-download]');
      if (downloadBtn) { downloadTask(downloadBtn.getAttribute('data-ec-download')); return; }
      var retryBtn = event.target.closest('[data-ec-retry]');
      if (retryBtn) { retryTask(retryBtn.getAttribute('data-ec-retry')); return; }
      var deleteBtn = event.target.closest('[data-ec-delete]');
      if (deleteBtn) { askDelete(deleteBtn.getAttribute('data-ec-delete')); }
    });

    document.getElementById('ecFilterGrid').addEventListener('change', updateCount);
    document.getElementById('ecFilterGrid').addEventListener('input', updateCount);
    document.getElementById('ecPhotos').addEventListener('change', function () {
      document.getElementById('ecPhotosText').textContent = this.checked ? '是' : '否';
      updateCount();
    });
    document.getElementById('ecSubmit').addEventListener('click', submitExport);
    document.getElementById('ecBatchBtn').addEventListener('click', openExportDialog);
    document.getElementById('ecConfirmDelete').addEventListener('click', confirmDelete);
  }

  /* ======================= 对外 API ======================= */

  function init(options) {
    if (!options || !options.moduleKey) {
      throw new Error('ExportCenter.init 需要 moduleKey');
    }
    config = options;
    injectStyle();
    injectDom();
    bindEvents();

    var entry = document.getElementById(options.entryButtonId);
    if (entry) {
      if (!entry.querySelector('.ec-badge')) {
        var badge = document.createElement('span');
        badge.className = 'ec-badge';
        entry.appendChild(badge);
      }
      entry.addEventListener('click', function (event) {
        event.preventDefault();
        openTaskCenter();
      });
    }

    var tasks = loadTasks();
    if (tasks.some(taskActive)) ensureTimer();
    renderBadge();
  }

  global.ExportCenter = {
    init: init,
    openTaskCenter: openTaskCenter,
    openExportDialog: openExportDialog,
    renderBadge: renderBadge,
    _storageKey: STORAGE_KEY
  };
})(window);