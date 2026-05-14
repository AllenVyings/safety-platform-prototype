# 原型开发检查清单

> 每次原型开发/修改后必须逐项检查，确保质量。
> 创建时间：2026-04-23
> 版本：V1.0

---

## 一、开发前检查

| # | 检查项 | 说明 |
|---|--------|------|
| □ 1 | PRD章节是否已阅读 | 明确需求边界和交互细节 |
| □ 2 | 数据结构是否已定义 | 参考 DATA-SCHEMA.md |
| □ 3 | 模拟数据是否覆盖所有字段 | 包括边界值和异常值 |
| □ 4 | CSS是否复用 variables.css | 禁止自定义颜色变量 |

---

## 二、布局检查

| # | 检查项 | 规范 |
|---|--------|------|
| □ 1 | 页面容器 | `min-height:100vh` + `display:flex` + `flex-direction:column` |
| □ 2 | 左侧树面板 | `width:220-320px` + `position:sticky` + `overflow-y:auto` |
| □ 3 | 右侧内容区 | `flex:1` + `min-width:0` |
| □ 4 | 表格容器 | `overflow-x:auto` + `min-width:1000px` |

---

## 三、表格检查

| # | 检查项 | 规范 |
|---|--------|------|
| □ 1 | 序号列 | 第一列，宽度60px，居中 |
| □ 2 | 操作列 | 最后一列，sticky固定，实色背景 |
| □ 3 | 字段列 | 固定宽度 + 省略号 + title悬浮提示 |
| □ 4 | 操作列背景 | `background:#fff`（偶数行`#f9fafb`，悬浮`#f1f5f9`） |
| □ 5 | 操作列按钮 | 4个蓝色按钮，间距8px，不换行 |
| □ 6 | 表头居中 | 操作列表头 `text-align:center` |
| □ 7 | 数据量 | 至少21条，展示分页效果 |

---

## 四、弹窗检查

| # | 检查项 | 规范 |
|---|--------|------|
| □ 1 | 弹窗宽度 | 900px + `max-width:95vw` |
| □ 2 | 弹窗高度 | `max-height:90vh` |
| □ 3 | 内容滚动 | `overflow-y:auto` + `max-height:calc(90vh - 160px)` |
| □ 4 | 新增/编辑一致性 | 共用弹窗，仅标题和数据状态不同 |
| □ 5 | 关闭方式 | 右上角X + 底部取消按钮 + 点击遮罩 |

---

## 五、CSS检查

| # | 检查项 | 禁止项 |
|---|--------|--------|
| □ 1 | 禁止全局td规则 | ❌ `td { max-width:200px }` |
| □ 2 | 禁止background:inherit | ❌ sticky列用inherit会穿透 |
| □ 3 | 禁止内联style覆盖类样式 | ❌ `style="display:none"` 优先级高于类 |
| □ 4 | 表格布局 | ✅ `table-layout:fixed` 防止列宽溢出 |

---

## 六、数据检查

| # | 检查项 | 说明 |
|---|--------|------|
| □ 1 | 字段名一致性 | 渲染逻辑与数据字段名一致（如 userStatus vs status） |
| □ 2 | 关联字段完整性 | enterpriseId、industry、checklists 等关联字段必填 |
| □ 3 | 枚举值正确性 | 状态、类型等枚举值符合 DATA-SCHEMA.md 定义 |
| □ 4 | 空值处理 | 空数组、null、undefined 的渲染处理 |

---

## 七、交互检查

| # | 检查项 | 说明 |
|---|--------|------|
| □ 1 | 树节点点击 | 过滤列表 + 更新统计 + 更新面包屑 |
| □ 2 | Tab切换 | 重置选中节点 + 重置过滤条件 |
| □ 3 | 分页切换 | 切换页码 + 更新数据 |
| □ 4 | 弹窗打开/关闭 | 显示/隐藏 + 数据回填/清空 |
| □ 5 | 表单提交 | 必填校验 + 数据更新 + Toast提示 |

---

## 八、PRD同步检查

| # | 检查项 | 说明 |
|---|--------|------|
| □ 1 | 功能完整性 | PRD章节所有功能点已实现 |
| □ 2 | 交互一致性 | PRD描述的交互流程与原型一致 |
| □ 3 | 字段一致性 | PRD字段列表与原型表单一致 |
| □ 4 | PRD补充 | 原型新增交互是否需写入PRD |

---

## 九、增量修改检查

| # | 检查项 | 说明 |
|---|--------|------|
| □ 1 | 数据结构同步 | 修改是否需要更新 DATA-SCHEMA.md |
| □ 2 | 已有功能回归 | 是否影响已有功能 |
| □ 3 | CSS冲突检测 | 是否引入全局规则冲突 |
| □ 4 | PRD同步 | 是否需要更新PRD章节 |

---

## 十、发布前检查

| # | 检查项 | 说明 |
|---|--------|------|
| □ 1 | 所有页面浏览器测试 | Chrome/Edge/Firefox |
| □ 2 | 响应式测试 | 不同窗口宽度 |
| □ 3 | 数据边界测试 | 空数据、超长数据 |
| □ 4 | Playwright审计通过 | prd_audit.py 全绿 |

---

## 快速检查脚本

```javascript
// 控制台执行，快速检查常见问题
function quickCheck() {
  // 1. 检查表格列数
  const ths = document.querySelectorAll('thead th');
  const tds = document.querySelectorAll('tbody tr:first-child td');
  if (ths.length !== tds.length) {
    console.error(`[列数不匹配] 表头${ths.length}列，数据${tds.length}列`);
  }

  // 2. 检查操作列sticky
  const lastTh = ths[ths.length - 1];
  const style = getComputedStyle(lastTh);
  if (style.position !== 'sticky') {
    console.error('[操作列未sticky] 最后一列应设置 position:sticky');
  }
  if (style.background === 'rgba(0, 0, 0, 0)') {
    console.error('[操作列背景透明] sticky列需要实色背景');
  }

  // 3. 检查弹窗宽度
  document.querySelectorAll('.modal').forEach(modal => {
    const w = parseInt(getComputedStyle(modal).width);
    if (w < 800) {
      console.warn(`[弹窗偏窄] ${modal.id || '未命名弹窗'} 宽度${w}px，建议900px`);
    }
  });

  console.log('✅ 快速检查完成');
}
quickCheck();
```

---

**使用方式**：
1. 开发前：完成「一、开发前检查」
2. 开发中：边开发边检查「二-五」布局/表格/弹窗/CSS
3. 开发后：完成「六-八」数据/交互/PRD同步检查
4. 增量修改：完成「九、增量修改检查」
5. 发布前：完成「十、发布前检查」
