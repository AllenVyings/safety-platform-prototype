/**
 * 政府端导出 — 演示数据补齐层（共享）
 * 所有派生值按 seed（对象 ID / 名称）确定性生成，禁止 Math.random，保证刷新前后一致。
 */
(function (global) {
  'use strict';

  /* FNV-1a 32 位哈希 */
  function hash(input) {
    var str = String(input == null ? '' : input);
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h >>> 0;
  }

  function int(seed, min, max) {
    if (max <= min) return min;
    return min + (hash(seed) % (max - min + 1));
  }

  function pick(seed, list, offset) {
    if (!list || !list.length) return '';
    return list[(hash(seed) + (offset || 0)) % list.length];
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function parseDate(dateStr) {
    var parts = String(dateStr || '').split('-');
    if (parts.length !== 3) return new Date(2026, 3, 6);
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function fmtDate(date) {
    return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
  }

  function addDays(dateStr, days) {
    var d = parseDate(dateStr);
    d.setDate(d.getDate() + Number(days || 0));
    return fmtDate(d);
  }

  function fmtDateTime(dateStr, seed) {
    var d = parseDate(dateStr);
    return fmtDate(d) + ' ' + pad2(int(seed, 8, 17)) + ':' + pad2(int(seed + 'm', 0, 59));
  }

  /* "南山区-南山街道-南山社区" → 区/街道/社区；网格无数据时返回「—」 */
  function regionParts(grid) {
    var segments = String(grid || '').split('-').filter(Boolean);
    return {
      district: segments[0] || '南山区',
      street: segments[1] || '—',
      community: segments[2] || '—',
      grid: segments[3] || '—'
    };
  }

  /* 领域小类 → 领域大类（与政府端左树口径一致） */
  var BIG_DOMAIN_MAP = {
    '充换电设施': '公共场所',
    '农贸市场': '公共场所',
    '商业综合体': '公共场所',
    '物业小区': '公共场所',
    '建筑施工现场': '建设工程',
    '轨道交通施工': '建设工程',
    '危险化学品仓储': '危险化学品',
    '加油站': '危险化学品',
    '高温熔融企业': '工业制造业',
    '工贸企业': '工业制造业',
    '城镇燃气': '城市运行',
    '消防安全': '城市运行'
  };

  function bigDomain(domainName) {
    var name = String(domainName || '');
    if (BIG_DOMAIN_MAP[name]) return BIG_DOMAIN_MAP[name];
    if (name.indexOf('建筑') >= 0 || name.indexOf('工程') >= 0) return '建设工程';
    if (name.indexOf('化工') >= 0 || name.indexOf('危险') >= 0 || name.indexOf('燃气') >= 0) return '危险化学品';
    if (name.indexOf('工贸') >= 0 || name.indexOf('制造') >= 0 || name.indexOf('熔融') >= 0) return '工业制造业';
    if (name.indexOf('消防') >= 0 || name.indexOf('城市') >= 0 || name.indexOf('交通') >= 0) return '城市运行';
    if (name.indexOf('商场') >= 0 || name.indexOf('市场') >= 0 || name.indexOf('场所') >= 0 || name.indexOf('小区') >= 0 || name.indexOf('综合体') >= 0) return '公共场所';
    return '其他';
  }

  var CODE_STATES = ['绿码', '黄码', '红码', '灰码'];

  function codeState(seed) {
    var r = int(seed, 1, 100);
    if (r <= 62) return '绿码';
    if (r <= 82) return '黄码';
    if (r <= 94) return '红码';
    return '灰码';
  }

  function count(seed, kind) {
    var ranges = {
      place: [1, 6],
      hazard: [1, 9],
      checklist: [2, 12],
      record: [1, 5]
    };
    var range = ranges[kind] || [1, 5];
    return int(kind + ':' + seed, range[0], range[1]);
  }

  /* 示意照片：96×96 SVG，按种子微调色调 */
  function photoSvg(kind, seed) {
    var tone = int('tone:' + seed, 0, 2);
    var accent = ['#4dabf7', '#51cf66', '#fcc419'][tone];
    if (kind === 'check') {
      return "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>" +
        "<rect width='96' height='96' fill='#e9eef5'/><rect x='0' y='60' width='96' height='36' fill='#c3ccd8'/>" +
        "<rect x='10' y='14' width='24' height='44' fill='#9aa6b6'/><rect x='62' y='14' width='24' height='44' fill='#9aa6b6'/>" +
        "<rect x='30' y='34' width='36' height='26' rx='2' fill='#f8f9fa' stroke='#adb5bd'/>" +
        "<rect x='34' y='40' width='10' height='16' fill='" + accent + "'/><rect x='48' y='40' width='10' height='16' fill='#ced4da'/>" +
        "<path d='M12 72h72' stroke='#868e96' stroke-width='2'/></svg>";
    }
    if (kind === 'reform') {
      return "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>" +
        "<rect width='96' height='96' fill='#2f3542'/><rect x='18' y='14' width='60' height='68' rx='4' fill='#1e2430' stroke='#5c677a' stroke-width='2'/>" +
        "<rect x='26' y='22' width='20' height='12' rx='2' fill='#ff6b6b'/><rect x='50' y='22' width='20' height='12' rx='2' fill='#51cf66'/>" +
        "<rect x='26' y='40' width='44' height='8' rx='2' fill='#748094'/><rect x='26' y='52' width='44' height='8' rx='2' fill='#748094'/>" +
        "<rect x='26' y='64' width='28' height='8' rx='2' fill='" + accent + "'/><circle cx='70' cy='68' r='5' fill='#fcc419'/></svg>";
    }
    if (kind === 'place') {
      return "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>" +
        "<rect width='96' height='96' fill='#dbe7f3'/><rect x='14' y='34' width='68' height='44' rx='3' fill='#f1f3f5' stroke='#adb5bd'/>" +
        "<rect x='20' y='40' width='16' height='14' fill='" + accent + "'/><rect x='40' y='40' width='16' height='14' fill='#ced4da'/>" +
        "<rect x='60' y='40' width='16' height='14' fill='#ced4da'/><rect x='40' y='60' width='16' height='18' fill='#8b95a3'/>" +
        "<rect x='14' y='22' width='68' height='12' fill='#9aa6b6'/></svg>";
    }
    /* hazard 默认 */
    return "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>" +
      "<rect width='96' height='96' fill='#dfe6ee'/><rect x='0' y='58' width='96' height='38' fill='#b7c0cc'/>" +
      "<rect x='8' y='12' width='18' height='46' fill='#8b95a3'/><rect x='70' y='12' width='18' height='46' fill='#8b95a3'/>" +
      "<rect x='30' y='40' width='36' height='22' rx='2' fill='#e9ecef' stroke='#adb5bd'/>" +
      "<rect x='34' y='46' width='10' height='14' fill='" + accent + "'/><rect x='46' y='46' width='10' height='14' fill='#ced4da'/>" +
      "<rect x='58' y='46' width='4' height='14' fill='#adb5bd'/><path d='M12 70h72' stroke='#868e96' stroke-width='2'/></svg>";
  }

  global.GovExportData = {
    hash: hash,
    int: int,
    pick: pick,
    addDays: addDays,
    fmtDate: fmtDate,
    fmtDateTime: fmtDateTime,
    regionParts: regionParts,
    bigDomain: bigDomain,
    codeState: codeState,
    count: count,
    photoSvg: photoSvg,
    CODE_STATES: CODE_STATES
  };
})(window);