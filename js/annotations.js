/**
 * 安全码综合管理平台 V5.0 - 标注层引擎
 * 在 iframe 内运行，渲染标注徽章和弹出卡片，通过 postMessage 受主框架控制
 */
(function() {
  'use strict';

  var currentMode = 'demo';
  var initialized = false;
  var pendingMode = null;

  // 注入标注样式
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../../css/annotations.css';
  document.head.appendChild(link);

  /**
   * 异步加载标注数据后初始化
   */
  function loadDataAndInit() {
    if (typeof ANNOTATIONS_CONFIG !== 'undefined') {
      onReady();
      return;
    }
    var script = document.createElement('script');
    script.src = '../../config/annotations.js';
    script.onload = function() { onReady(); };
    script.onerror = function() { console.warn('[Annotations] Failed to load config/annotations.js'); };
    document.head.appendChild(script);
  }

  /**
   * 数据加载完成后的初始化入口
   */
  function onReady() {
    var moduleId = getModuleId();
    if (!moduleId || !ANNOTATIONS_CONFIG || !ANNOTATIONS_CONFIG[moduleId]) {
      return;
    }

    var saved = null;
    try { saved = localStorage.getItem('prototype-mode'); } catch(e) {}
    var mode = pendingMode || saved || 'demo';
    currentMode = mode;

    initialized = true;
    renderMarkers();
    applyMode(mode);
  }

  /**
   * 获取当前模块 ID
   */
  function getModuleId() {
    var el = document.querySelector('[data-module]');
    if (el && el.dataset.module) return el.dataset.module;
    var path = window.location.pathname;
    var match = path.match(/modules\/(.+)\.html/);
    return match ? match[1] : '';
  }

  /**
   * 判断徽章放置方式
   * @returns {'inline'|'sibling'|'corner'}
   */
  function getPlacement(targetEl) {
    var tag = targetEl.tagName.toLowerCase();
    // 按钮类：作为兄弟元素插入
    if (tag === 'button' || targetEl.classList.contains('btn')) return 'sibling';
    // 标题类：内联插入
    if (targetEl.classList.contains('card-header') ||
        targetEl.classList.contains('panel-header') ||
        targetEl.classList.contains('modal-title')) return 'inline';
    // 输入/文本类：内联插入
    if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'label') return 'inline';
    // 其他容器：角标定位
    return 'corner';
  }

  /**
   * 渲染所有标注标记
   */
  function renderMarkers() {
    var moduleId = getModuleId();
    if (!moduleId || !ANNOTATIONS_CONFIG) return;

    var annotations = ANNOTATIONS_CONFIG[moduleId];
    if (!annotations || annotations.length === 0) return;

    annotations.forEach(function(ann, index) {
      var targetEl = document.querySelector(ann.selector);
      if (!targetEl) {
        console.warn('[Annotations] Selector not found: ' + ann.selector + ' (module: ' + moduleId + ')');
        return;
      }

      var placement = getPlacement(targetEl);

      // 创建徽章
      var badge = document.createElement('span');
      badge.className = 'ann-marker ann-' + placement;
      badge.dataset.annId = ann.id;
      badge.textContent = index + 1;
      badge.title = ann.title;

      // 根据放置方式插入
      if (placement === 'sibling') {
        targetEl.parentNode.insertBefore(badge, targetEl.nextSibling);
      } else if (placement === 'corner') {
        // 容器角标：确保父元素有 relative 定位
        var pos = window.getComputedStyle(targetEl).position;
        if (pos === 'static') {
          targetEl.style.position = 'relative';
        }
        targetEl.appendChild(badge);
      } else {
        // inline：优先插入 .card-title / .panel-title 子元素，避免 flex 布局偏移
        var titleChild = targetEl.querySelector('.card-title, .panel-title');
        if (titleChild) {
          titleChild.appendChild(badge);
        } else {
          targetEl.appendChild(badge);
        }
      }

      // 创建卡片（隐藏，追加到 body 用 fixed 定位）
      var card = document.createElement('div');
      card.className = 'ann-card';
      card.dataset.annId = ann.id;
      card.style.display = 'none';
      card.innerHTML = buildCardHTML(ann);
      document.body.appendChild(card);

      // 徽章点击
      badge.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleCard(ann.id, badge);
      });

      // 卡片内关闭按钮
      var closeBtn = card.querySelector('.ann-card-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          card.style.display = 'none';
        });
      }
    });

    // 点击空白关闭卡片
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.ann-marker') && !e.target.closest('.ann-card')) {
        var cards = document.querySelectorAll('.ann-card');
        for (var i = 0; i < cards.length; i++) {
          cards[i].style.display = 'none';
        }
      }
    });

    applyMode(currentMode);
  }

  /**
   * 构建卡片 HTML
   */
  function buildCardHTML(ann) {
    var html = '<div class="ann-card-header">';
    html += '<div class="ann-card-title">' + escapeHtml(ann.title) + '</div>';
    html += '<button class="ann-card-close">&times;</button>';
    html += '</div>';
    html += '<div class="ann-card-body">';
    html += '<span class="ann-card-category cat-' + (ann.categoryColor || 'info') + '">' + escapeHtml(ann.category) + '</span>';
    html += '<p class="ann-card-desc">' + escapeHtml(ann.description) + '</p>';
    if (ann.prdRef) {
      html += '<div class="ann-card-ref">&rarr; ' + escapeHtml(ann.prdRef) + '</div>';
    }
    html += '</div>';
    return html;
  }

  /**
   * 切换卡片显示
   */
  function toggleCard(annId, badgeEl) {
    var card = document.querySelector('.ann-card[data-ann-id="' + annId + '"]');
    if (!card) return;

    if (card.style.display === 'none') {
      // 先关闭其他卡片
      var allCards = document.querySelectorAll('.ann-card');
      for (var i = 0; i < allCards.length; i++) {
        allCards[i].style.display = 'none';
      }

      // 用徽章位置定位卡片
      var rect = badgeEl.getBoundingClientRect();
      var cardWidth = 320;
      var cardMaxHeight = 300;

      var left = rect.right + 8;
      var top = rect.top - 10;

      // 防止右侧溢出
      if (left + cardWidth > window.innerWidth) {
        left = rect.left - cardWidth - 8;
      }
      // 防止底部溢出
      if (top + cardMaxHeight > window.innerHeight) {
        top = window.innerHeight - cardMaxHeight - 16;
      }
      // 防止顶部溢出
      if (top < 8) {
        top = 8;
      }

      card.style.left = left + 'px';
      card.style.top = top + 'px';
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }

  /**
   * 应用模式（通过 body class 控制）
   */
  function applyMode(mode) {
    currentMode = mode;
    if (mode === 'demo') {
      document.body.classList.add('ann-demo');
    } else {
      document.body.classList.remove('ann-demo');
    }
  }

  /**
   * HTML 转义
   */
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * 弹窗白名单映射：modalId → 打开函数
   */
  var MODAL_OPEN_MAP = {
    // 通用 showModal('xxx')
    'scanConfig':     function() { if (typeof showModal === 'function') showModal('scanConfig'); },
    'deleteRegion':   function() { if (typeof showModal === 'function') showModal('deleteRegion'); },
    'region':         function() { if (typeof showModal === 'function') showModal('region'); },
    'qrcode':         function() { if (typeof showModal === 'function') showModal('qrcode'); },
    'personSelector': function() { if (typeof showModal === 'function') showModal('personSelector'); },
    // 专用打开函数
    'exclusiveChecklist': function() { if (typeof openExclusiveChecklistModal === 'function') openExclusiveChecklistModal(); },
    'addScanConfig':      function() { if (typeof openScanConfigModal === 'function') openScanConfigModal(); },
    'scanCheckLib':       function() { if (typeof showModal === 'function') showModal('scanCheckLib'); }
  };

  /**
   * 从选择器解析视图/弹窗信息
   * 1. 直接从选择器中提取 #view-xxx 或 #modal-xxx
   * 2. 若无匹配，通过 DOM 查找目标元素所在的 .detail-view 或 .modal-overlay 祖先
   * @returns {{ type: 'view'|'modal'|'none', id: string }}
   */
  function parseViewFromSelector(selector) {
    // #view-add-place .card-header → type=view, id=add-place
    var viewMatch = selector.match(/#view-([\w-]+)/);
    if (viewMatch) return { type: 'view', id: viewMatch[1] };
    // #modal-scanConfig .modal-title → type=modal, id=scanConfig
    var modalMatch = selector.match(/#modal-([\w-]+)/);
    if (modalMatch) return { type: 'modal', id: modalMatch[1] };

    // 降级：查找 DOM 祖先确定所属视图
    var el = document.querySelector(selector);
    if (el) {
      var viewAncestor = el.closest('.detail-view');
      if (viewAncestor && viewAncestor.id) {
        var m = viewAncestor.id.match(/^view-(.+)$/);
        if (m) return { type: 'view', id: m[1] };
      }
      var modalAncestor = el.closest('.modal-overlay');
      if (modalAncestor && modalAncestor.id) {
        var m2 = modalAncestor.id.match(/^modal-(.+)$/);
        if (m2) return { type: 'modal', id: m2[1] };
      }
    }

    return { type: 'none', id: '' };
  }

  /**
   * 监听主框架 postMessage
   */
  window.addEventListener('message', function(event) {
    if (!event.data) return;

    // 模式切换
    if (event.data.type === 'annotations-toggle') {
      var mode = event.data.mode || 'demo';
      if (!initialized) {
        pendingMode = mode;
        return;
      }
      applyMode(mode);
      return;
    }

    // 重新渲染标注（弹窗打开后调用）
    if (event.data.type === 'annotations-rerender') {
      if (initialized) {
        renderMarkers();
      }
      return;
    }

    // 导航到标注
    if (event.data.type === 'navigate-to-annotation') {
      var selector = event.data.selector || '';
      var viewInfo = parseViewFromSelector(selector);

      if (viewInfo.type === 'view') {
        // 切换到目标视图
        if (typeof showView === 'function') {
          showView(viewInfo.id);
        } else if (typeof showAddForm === 'function' && viewInfo.id.indexOf('add-') === 0) {
          showAddForm(viewInfo.id.replace('add-', ''));
        }
      } else if (viewInfo.type === 'modal') {
        // 先回到默认视图，再打开弹窗
        if (typeof showView === 'function') showView('project');
        var opener = MODAL_OPEN_MAP[viewInfo.id];
        if (opener) {
          setTimeout(opener, 150);
        }
      }
    }
  });

  /**
   * DOM 就绪后加载数据并初始化
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDataAndInit);
  } else {
    loadDataAndInit();
  }

})();
