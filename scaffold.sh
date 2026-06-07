#!/usr/bin/env bash
# ============================================================
# scaffold.sh — 模块脚手架
# 一键: 生成HTML模板 -> 注册菜单 -> 注册module-registry -> 引入annotations.js
#
# 用法:
#   ./scaffold.sh <portal> <module-name> <display-name> [description] [prd-ref]
#
# 示例:
#   ./scaffold.sh enterprise my-module "我的模块" "模块描述" "§6.4 章节"
# ============================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PORTAL="${1:-}"
MODULE_NAME="${2:-}"
DISPLAY_NAME="${3:-}"
DESCRIPTION="${4:-$DISPLAY_NAME}"
PRD_REF="${5:-待定}"

if [ -z "$PORTAL" ] || [ -z "$MODULE_NAME" ] || [ -z "$DISPLAY_NAME" ]; then
  echo -e "${RED}用法: ./scaffold.sh <portal> <module-name> <display-name> [description] [prd-ref]${NC}"
  echo ""
  echo "portal: super-admin | government | enterprise | mobile"
  exit 1
fi

VALID_PORTALS=("super-admin" "government" "enterprise" "mobile")
if [[ ! " ${VALID_PORTALS[*]} " =~ " ${PORTAL} " ]]; then
  echo -e "${RED}错误: 无效的 portal '$PORTAL'${NC}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

MODULE_ID="${PORTAL}/${MODULE_NAME}"
HTML_PATH="modules/${PORTAL}/${MODULE_NAME}.html"

case "$PORTAL" in
  super-admin) MENU_PREFIX="sa" ;;
  government)  MENU_PREFIX="gov" ;;
  enterprise)  MENU_PREFIX="ent" ;;
  mobile)      MENU_PREFIX="mobile" ;;
esac
MENU_ID="${MENU_PREFIX}-${MODULE_NAME}"

MENUS_PORTAL_KEY="$PORTAL"
case "$PORTAL" in
  enterprise) MENUS_PORTAL_KEY="enterprise-basic" ;;
esac

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  模块脚手架${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "  模块 ID:   ${MODULE_ID}"
echo "  菜单 ID:   ${MENU_ID}"
echo "  显示名:    ${DISPLAY_NAME}"
echo "  HTML路径:  ${HTML_PATH}"
echo ""

# Step 1: 检查是否已存在
echo -e "${YELLOW}[1/4]${NC} 检查冲突..."
if [ -f "$HTML_PATH" ]; then
  echo -e "${RED}错误: HTML文件已存在: ${HTML_PATH}${NC}"
  exit 1
fi
echo "  检查通过"

# Step 2: 生成HTML模板
echo -e "${YELLOW}[2/4]${NC} 生成HTML模板..."
mkdir -p "modules/${PORTAL}"

cat > "$HTML_PATH" << HTMLEOF
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${DISPLAY_NAME}</title>
  <link rel="stylesheet" href="../../css/variables.css">
  <link rel="stylesheet" href="../../css/framework.css">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:var(--font-family);font-size:var(--font-size-md);color:var(--text-primary);background:var(--bg-page-solid)}
    .hidden{display:none}
    .detail-view{min-height:100%}
    .page-container{display:flex;flex-direction:column;height:100vh;overflow:hidden;padding:var(--spacing-lg)}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--spacing-lg)}
    .page-title{font-size:var(--font-size-lg);font-weight:600;color:var(--text-primary)}
    .page-actions{display:flex;gap:8px}
    .info-card{background:var(--bg-primary);border-radius:var(--radius-lg);padding:var(--spacing-lg);margin-bottom:var(--spacing-lg);box-shadow:var(--shadow-sm);border:1px solid var(--border-light)}
    .card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border-light)}
    .card-title{font-size:var(--font-size-md);font-weight:600;color:var(--text-primary)}
    .table-container{overflow-x:auto}
    table{width:100%;border-collapse:collapse;font-size:var(--font-size-sm)}
    th,td{padding:8px 12px;text-align:left;border-bottom:1px solid var(--border-light)}
    th{background:var(--bg-tertiary);font-weight:500;color:var(--text-primary)}
    tr:hover td{background:var(--bg-section-alt)}
  </style>
</head>
<body>
<div class="page-container" data-module="${MODULE_ID}">

  <div id="view-list" class="detail-view">
    <div class="page-header">
      <h1 class="page-title">${DISPLAY_NAME}</h1>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="showView('add')">+ 新增</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:var(--spacing-lg)">
      <div class="info-card" style="text-align:center">
        <div style="font-size:24px;font-weight:600;color:var(--primary)">0</div>
        <div style="font-size:var(--font-size-xs);color:var(--text-secondary);margin-top:4px">总计</div>
      </div>
      <div class="info-card" style="text-align:center">
        <div style="font-size:24px;font-weight:600;color:var(--success)">0</div>
        <div style="font-size:var(--font-size-xs);color:var(--text-secondary);margin-top:4px">启用</div>
      </div>
      <div class="info-card" style="text-align:center">
        <div style="font-size:24px;font-weight:600;color:var(--warning)">0</div>
        <div style="font-size:var(--font-size-xs);color:var(--text-secondary);margin-top:4px">待处理</div>
      </div>
      <div class="info-card" style="text-align:center">
        <div style="font-size:24px;font-weight:600;color:var(--danger)">0</div>
        <div style="font-size:var(--font-size-xs);color:var(--text-secondary);margin-top:4px">异常</div>
      </div>
    </div>

    <div class="info-card">
      <div style="display:flex;gap:12px;align-items:center">
        <input type="text" class="form-input" placeholder="搜索..." style="flex:1;max-width:300px" oninput="filterTable()">
        <button class="btn btn-default" onclick="resetFilter()">重置</button>
      </div>
    </div>

    <div class="info-card">
      <div class="card-header">
        <span class="card-title">数据列表</span>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>名称</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="dataTableBody">
            <tr>
              <td colspan="5" style="text-align:center;color:var(--text-tertiary);padding:40px">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div id="view-add" class="detail-view hidden">
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:12px">
        <button class="btn btn-default" onclick="showView('list')">&larr; 返回</button>
        <h1 class="page-title">新增${DISPLAY_NAME}</h1>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="saveData()">保存</button>
      </div>
    </div>

    <div class="info-card">
      <div class="card-header">
        <span class="card-title">基本信息</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
        <div class="form-group">
          <label class="form-label">名称 <span style="color:var(--danger)">*</span></label>
          <input type="text" class="form-input" id="inputName" placeholder="请输入名称">
        </div>
        <div class="form-group">
          <label class="form-label">备注</label>
          <input type="text" class="form-input" id="inputRemark" placeholder="请输入备注">
        </div>
      </div>
    </div>
  </div>

</div>

<script>
(function() {
  'use strict';
  var CONFIG = { moduleId: '${MODULE_ID}', moduleName: '${DISPLAY_NAME}' };
  var state = { initialized: false };

  function init() {
    if (state.initialized) return;
    console.log('[' + CONFIG.moduleId + '] 模块初始化');
    state.initialized = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.destroyModule = function() {
    console.log('[' + CONFIG.moduleId + '] 模块销毁');
    state.initialized = false;
  };
})();

function showView(viewName) {
  document.querySelectorAll('.detail-view').forEach(function(v) { v.classList.add('hidden'); });
  var target = document.getElementById('view-' + viewName);
  if (target) target.classList.remove('hidden');
}

function filterTable() {
  var input = document.querySelector('#view-list input[type=text]');
  var keyword = (input ? input.value.toLowerCase() : '');
  var rows = document.querySelectorAll('#dataTableBody tr');
  rows.forEach(function(row) {
    if (row.cells.length === 1) return;
    var text = row.textContent.toLowerCase();
    row.style.display = text.includes(keyword) ? '' : 'none';
  });
}

function resetFilter() {
  var input = document.querySelector('#view-list input[type=text]');
  if (input) input.value = '';
  filterTable();
}

function saveData() {
  alert('保存功能开发中');
  showView('list');
}
</script>
<script src="../../js/annotations.js"></script>
</body>
</html>
HTMLEOF

echo -e "  ${GREEN}OK${NC} HTML模板已生成: ${HTML_PATH}"

# Step 3: 注册菜单 + module-registry (Node.js 辅助脚本)
echo -e "${YELLOW}[3/4]${NC} 注册菜单和模块注册表..."

node tools/scaffold-register.js \
  "$PORTAL" "$MODULE_NAME" "$DISPLAY_NAME" "$DESCRIPTION" "$PRD_REF" \
  "$MODULE_ID" "$MENU_ID" "$MENUS_PORTAL_KEY" "$HTML_PATH"

echo -e "  ${GREEN}OK${NC} 菜单已注册: ${MENU_ID} -> ${MENUS_PORTAL_KEY}"
echo -e "  ${GREEN}OK${NC} module-registry.json 已更新"

# Step 4: 移动端额外注册
echo -e "${YELLOW}[4/4]${NC} 完成"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  脚手架完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "  已创建:"
echo "    1. ${HTML_PATH}"
echo "    2. menus.js 菜单注册 (ID: ${MENU_ID})"
echo "    3. module-registry.json 注册"
echo ""
echo "  下一步:"
echo "    1. 完善 HTML 模板中的业务内容"
echo "    2. align-prd 对齐 PRD: ${PRD_REF}"
echo "    3. prototype-annotation 添加标注"
