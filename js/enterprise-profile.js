(function (global) {
  var STORAGE_KEY = 'sa_enterprise_profile';
  var DEFAULT_PROFILE = {
    name: '深圳市天道医药有限公司南山分厂',
    creditCode: '91440300MA5EGUXE2W',
    status: '启用',
    legalPerson: '李锂',
    phone: '0755-86142880',
    regAddress: '南山区 粤海街道 麻岭社区 深圳市天道医药有限公司',
    bizAddress: '南山区 粤海街道 麻岭社区 深圳市天道医药有限公司',
    grid: '南山区 / 粤海街道 / 麻岭社区 / 麻岭01',
    remark: '深圳市南山区重点医药企业，主营化学药品制剂和中药材加工。',
    industry: '区应急管理局',
    professional: '区消防救援局、市场监督管理局南山监管局、市生态环境局南山管理局',
    localOrg: '粤海街道办事处'
  };

  function getEnterpriseProfile() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULT_PROFILE);
      return Object.assign({}, DEFAULT_PROFILE, JSON.parse(raw));
    } catch (err) {
      return Object.assign({}, DEFAULT_PROFILE);
    }
  }

  function saveEnterpriseProfile(profile) {
    var next = Object.assign({}, DEFAULT_PROFILE, profile || {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  global.getEnterpriseProfile = getEnterpriseProfile;
  global.saveEnterpriseProfile = saveEnterpriseProfile;
})(window);
