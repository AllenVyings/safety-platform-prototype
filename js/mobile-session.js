/**
 * MobileSession — 移动端会话管理统一入口
 * 版本：V1.2（对应移动端原型重构方案 V1.2）
 *
 * 职责：
 * 1. localStorage 存储登录态（政府端 / 企业端）
 * 2. 多身份管理（identities[] + activeDomainId）
 * 3. 身份切换事件（onIdentityChange / offIdentityChange）
 * 4. session 过期校验（TTL = 7 天）
 *
 * 数据结构见 03-详细设计/移动端原型重构方案.md §3.2
 */

'use strict';

var MobileSession = (function() {
  var STORAGE_KEY = 'safety_mobile_session';
  var TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 天

  var _listeners = [];

  /* ========== 内部工具 ========== */

  function _read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function _write(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      _toast('存储空间不足，请清除缓存后重试');
      return false;
    }
  }

  function _toast(msg) {
    var el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);'
      + 'background:rgba(0,0,0,0.78);color:#fff;padding:10px 24px;border-radius:8px;'
      + 'font-size:14px;z-index:9999;white-space:nowrap;';
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 2000);
  }

  function _emit(identity) {
    for (var i = 0; i < _listeners.length; i++) {
      try { _listeners[i](identity); } catch (e) { /* 监听器异常不影响主流程 */ }
    }
  }

  /* ========== 基础会话管理 ========== */

  /**
   * 获取当前会话完整数据
   * @returns {object|null}
   */
  function get() {
    return _read();
  }

  /**
   * 设置会话（登录时调用）
   * @param {object} data - session 数据
   * @returns {boolean} 是否写入成功
   */
  function set(data) {
    if (!data || !data.portalType) {
      _toast('会话数据异常');
      return false;
    }
    data.loginTime = Date.now();
    return _write(data);
  }

  /**
   * 清除会话（退出登录时调用）
   */
  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  /**
   * 获取端类型
   * @returns {'gov'|'ent'|null}
   */
  function getPortalType() {
    var s = _read();
    return s ? s.portalType : null;
  }

  /**
   * 检查是否已登录（session 存在且未过期）
   * @returns {boolean}
   */
  function isLoggedIn() {
    var s = _read();
    if (!s) return false;
    if (!s.loginTime) return false;
    if (Date.now() - s.loginTime > TTL_MS) {
      clear();
      return false;
    }
    return true;
  }

  /**
   * 检查 session 是否过期
   * @returns {boolean}
   */
  function isExpired() {
    var s = _read();
    if (!s || !s.loginTime) return true;
    return (Date.now() - s.loginTime) > TTL_MS;
  }

  /**
   * 未登录时跳转登录页（供各页面初始化时调用）
   * @param {string} [loginUrl] - 登录页路径，默认 ../../modules/mobile/login.html
   */
  function requireLogin(loginUrl) {
    if (!isLoggedIn()) {
      var url = loginUrl || '../../modules/mobile/login.html';
      // 如果在 iframe 内，通知父页面跳转
      if (window.parent && window.parent.mobileNav) {
        window.parent.mobileNav('login');
      } else {
        window.location.href = url;
      }
    }
  }

  /* ========== 多身份相关 ========== */

  /**
   * 获取当前用户所有业务身份
   * @returns {Array} 政府端返回 []
   */
  function getIdentities() {
    var s = _read();
    if (!s || s.portalType !== 'ent') return [];
    return s.identities || [];
  }

  /**
   * 获取当前激活的身份
   * @returns {object|null} 政府端返回 null
   */
  function getActiveIdentity() {
    var s = _read();
    if (!s || s.portalType !== 'ent') return null;
    var identities = s.identities || [];
    var activeId = s.activeDomainId;
    if (!activeId) return identities[0] || null;
    return identities.find(function(id) { return id.domainId === activeId; }) || null;
  }

  /**
   * 切换业务身份
   * @param {string} domainId - 目标领域 ID
   * @returns {boolean} 是否切换成功
   */
  function switchIdentity(domainId) {
    var s = _read();
    if (!s || s.portalType !== 'ent') {
      _toast('当前非企业端登录');
      return false;
    }

    var identities = s.identities || [];
    var target = identities.find(function(id) { return id.domainId === domainId; });
    if (!target) {
      _toast('身份不存在');
      return false;
    }

    if (domainId === s.activeDomainId) {
      return true; // 已是当前身份，无需切换
    }

    s.activeDomainId = domainId;
    var ok = _write(s);
    if (ok) {
      _emit(target);
    }
    return ok;
  }

  /**
   * 监听身份切换事件
   * @param {Function} callback - 回调函数，参数为新激活的 identity 对象
   */
  function onIdentityChange(callback) {
    if (typeof callback === 'function') {
      _listeners.push(callback);
    }
  }

  /**
   * 移除身份切换监听
   * @param {Function} callback - 之前注册的回调函数
   */
  function offIdentityChange(callback) {
    var idx = _listeners.indexOf(callback);
    if (idx !== -1) {
      _listeners.splice(idx, 1);
    }
  }

  /* ========== 兼容方法 ========== */

  /**
   * 获取当前激活身份的 mode
   * 政府端返回 'gov'
   * @returns {'basic'|'project'|'special'|'other'|'gov'|null}
   */
  function getMode() {
    var portal = getPortalType();
    if (portal === 'gov') return 'gov';
    var identity = getActiveIdentity();
    return identity ? identity.mode : null;
  }

  /* ========== 公开 API ========== */

  return {
    // 基础会话
    get: get,
    set: set,
    clear: clear,
    getPortalType: getPortalType,
    isLoggedIn: isLoggedIn,
    isExpired: isExpired,
    requireLogin: requireLogin,

    // 多身份
    getIdentities: getIdentities,
    getActiveIdentity: getActiveIdentity,
    switchIdentity: switchIdentity,
    onIdentityChange: onIdentityChange,
    offIdentityChange: offIdentityChange,

    // 兼容
    getMode: getMode
  };
})();

/* ========== 全局工具方法（IIFE 外部，所有页面可用） ========== */

/**
 * 安全页面导航 — 替代直接调用 parent.navigateTo
 * 防止 iframe 外独立打开时 parent.navigateTo 不存在导致崩溃 (H5)
 * @param {string} page - 目标页面名称
 */
function navTo(page) {
  try {
    if (window.parent && window.parent !== window && typeof window.parent.navigateTo === 'function') {
      window.parent.navigateTo(page);
    }
  } catch (e) { /* 静默失败 */ }
}

/**
 * 全局 Toast 提示（统一实现，各页面不再重复定义）
 * @param {string} msg - 提示文案
 * @param {string} [type] - 类型：success / warning / error / info
 * @param {number} [duration] - 显示时长（ms），默认 2000
 */
function showToast(msg, type, duration) {
  type = type || 'info';
  duration = duration || 2000;
  var existing = document.getElementById('mGlobalToast');
  if (existing) existing.remove();
  var t = document.createElement('div');
  t.id = 'mGlobalToast';
  var bg = 'rgba(0,0,0,0.78)';
  if (type === 'success') bg = 'var(--success, #52c41a)';
  else if (type === 'warning') bg = 'var(--warning, #faad14)';
  else if (type === 'error') bg = 'var(--danger, #ff4d4f)';
  else if (type === 'info') bg = 'var(--primary, #1677ff)';
  t.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);'
    + 'background:' + bg + ';color:#fff;padding:10px 24px;border-radius:8px;'
    + 'font-size:14px;z-index:9999;white-space:nowrap;opacity:1;'
    + 'transition:opacity 0.3s;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() {
    t.style.opacity = '0';
    setTimeout(function() { t.remove(); }, 300);
  }, duration);
}
