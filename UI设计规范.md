# 安全码综合管理平台 V5.0 - UI 设计规范

> 最后更新：2026-05-11
> 适用对象：所有原型页面开发 / 前端开发

---

## 1. CSS 文件引用

**每个模块 HTML 文件必须在 `<head>` 中引用以下两个 CSS 文件：**

```html
<link rel="stylesheet" href="../../css/variables.css">
<link rel="stylesheet" href="../../css/framework.css">
```

- `variables.css` — 设计令牌（颜色、间距、字号、圆角、动效）
- `framework.css` — 通用组件样式（按钮、表格、表单、弹窗、分页、面包屑、标签、统计卡片等）

**禁止**在页面 `<style>` 中重复定义 framework.css 已有的样式。

---

## 2. 色彩系统

### 2.1 功能色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--primary` | `#1677ff` | 主按钮、链接、高亮 |
| `--primary-hover` | `#4096ff` | 主按钮悬停 |
| `--primary-active` | `#0958d9` | 主按钮激活 |
| `--primary-light` | `#e6f4ff` | 主色背景（激活态） |
| `--success` | `#52c41a` | 成功状态 |
| `--success-light` | `#f6ffed` | 成功标签背景 |
| `--warning` | `#faad14` | 警告状态 |
| `--warning-light` | `#fffbe6` | 警告标签背景 |
| `--danger` | `#ff4d4f` | 危险/删除状态 |
| `--danger-light` | `#fff1f0` | 危险标签背景 |
| `--info` | `#1677ff` | 信息状态 |
| `--info-light` | `#e6f4ff` | 信息标签背景 |

### 2.2 状态色（标签专用）

| 变量 | 值 | 用途 |
|------|-----|------|
| `--error` | `#ff4d4f` | 错误/超期标签（等同 --danger） |
| `--error-light` | `#fff1f0` | 错误标签背景 |
| `--blue` | `#1677ff` | 蓝色标签（等同 --primary） |
| `--green` | `#52c41a` | 绿色标签（等同 --success） |
| `--orange` | `#faad14` | 橙色标签（等同 --warning） |

### 2.3 中性色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--text-primary` | `#1f1f1f` | 主文字（标题、正文） |
| `--text-secondary` | `#666666` | 次要文字（标签、描述） |
| `--text-tertiary` | `#999999` | 辅助文字（时间、占位） |
| `--text-disabled` | `#cccccc` | 禁用文字 |
| `--text-inverse` | `#ffffff` | 反色文字（深色背景上） |

### 2.4 背景色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg-primary` | `#ffffff` | 卡片、表格、弹窗背景 |
| `--bg-secondary` | `#f5f5f5` | 页面辅助背景 |
| `--bg-tertiary` | `#fafafa` | 表头、辅助区域 |
| `--bg-page` | `linear-gradient(180deg, #f0f2f5, #f5f7fa)` | 页面整体背景渐变 |
| `--bg-page-solid` | `#f0f2f5` | 页面背景纯色 |
| `--bg-card` | `#ffffff` | 卡片容器背景 |
| `--bg-section` | `#fafbfc` | 板块/筛选栏背景 |
| `--bg-section-alt` | `#f5f7fa` | 斑马表格交替行 |
| `--bg-hover` | `#f0f7ff` | 悬停背景 |
| `--bg-active` | `#e6f4ff` | 激活背景 |

### 2.5 边框色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--border` | `#d9d9d9` | 输入框、按钮边框 |
| `--border-light` | `#e8e8e8` | 表格分割线、弹窗分割线 |
| `--border-dark` | `#bfbfbf` | 强调边框 |
| `--border-section` | `#e8eaed` | 板块边框 |
| `--border-card` | `#e2e8f0` | 卡片边框 |

### 2.6 阴影

| 变量 | 值 | 用途 |
|------|-----|------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.08)` | 卡片、顶部导航 |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.12)` | 下拉菜单 |
| `--shadow-lg` | `0 6px 32px rgba(0,0,0,0.15)` | 弹窗 |
| `--shadow-elevated` | `0 8px 48px rgba(0,0,0,0.18)` | 全局弹窗、置顶元素 |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.08)` | 表格容器 |
| `--shadow-card-hover` | `0 4px 12px rgba(0,0,0,0.12)` | 卡片悬停 |
| `--shadow-header` | `0 1px 4px rgba(0,0,0,0.06)` | 页面标题栏 |
| `--shadow-input-focus` | `0 0 0 2px rgba(22,119,255,0.1)` | 输入框聚焦光环 |

**规则：禁止使用硬编码颜色值 `#1677ff`, `#ff4d4f`, `#52c41a`, `#faad14`, `#1f1f1f`, `#666`, `#999`, `#fff`, `#f0f2f5`, `#fafbfc`, `#e8eaed` 等。必须使用对应的 CSS 变量。**

---

## 3. 间距系统

| 变量 | 值 | 用途 |
|------|-----|------|
| `--spacing-xs` | `4px` | 图标间距、徽章内边距 |
| `--spacing-sm` | `8px` | 按钮内边距、小元素间距 |
| `--spacing-md` | `16px` | 卡片内边距、板块间距 |
| `--spacing-lg` | `24px` | 页面内边距、大板块间距 |
| `--spacing-xl` | `32px` | 跨板块间距 |
| `--spacing-xxl` | `48px` | 页面级大间距 |

**规则：禁止硬编码 `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`。使用对应 CSS 变量。**

---

## 4. 圆角系统

| 变量 | 值 | 用途 |
|------|-----|------|
| `--radius-sm` | `4px` | 标签、小按钮 |
| `--radius-md` | `6px` | 按钮、输入框 |
| `--radius-lg` | `8px` | 卡片、弹窗 |
| `--radius-xl` | `12px` | 大卡片 |
| `--radius-full` | `9999px` | 圆形、胶囊形 |

---

## 5. 字体系统

| 变量 | 值 | 用途 |
|------|-----|------|
| `--font-size-xs` | `12px` | 辅助文字、标签、徽章 |
| `--font-size-sm` | `13px` | 表格文字、小字 |
| `--font-size-md` | `14px` | 正文、按钮、输入框 |
| `--font-size-lg` | `16px` | 小标题、弹窗标题 |
| `--font-size-xl` | `18px` | 页面标题 |
| `--font-size-xxl` | `20px` | 模块标题 |
| `--font-size-xxxl` | `24px` | 统计数值 |

---

## 6. 动效系统

| 变量 | 值 | 用途 |
|------|-----|------|
| `--duration-fast` | `0.15s` | 按钮、链接过渡 |
| `--duration-normal` | `0.3s` | 弹窗、面板动画 |
| `--duration-slow` | `0.5s` | 大型过渡动画 |
| `--ease-out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 默认缓出 |
| `--ease-in-out` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | 缓入缓出 |

---

## 7. 组件使用规范

### 7.1 统计卡片

**必须使用 framework.css 提供的 `.stat-cards` + `.stat-card` 结构：**

```html
<div class="stat-cards">
  <div class="stat-card">
    <div class="stat-icon blue">📊</div>
    <div class="stat-content">
      <div class="stat-label">监管企业总数</div>
      <div class="stat-value">1,248</div>
    </div>
  </div>
  <!-- 更多卡片 -->
</div>
```

- 图标容器：`.stat-icon` + 颜色类（`blue`/`green`/`orange`/`gray`）
- 内容容器：`.stat-content` > `.stat-label` + `.stat-value`
- **禁止**自行定义 `.stats-row`、`.stats-grid` 等替代容器

### 7.2 标签（Tag）

**必须使用 framework.css 提供的 `.tag` 类：**

```html
<span class="tag tag-green">正常运营</span>
<span class="tag tag-orange">整改中</span>
<span class="tag tag-red">超期</span>
<span class="tag tag-blue">一般隐患</span>
<span class="tag tag-gray">已归档</span>
```

- `.tag` — 基础样式（inline-block, 2px 8px padding, 12px 字号）
- `.tag-green` — 成功/正常（绿色）
- `.tag-orange` — 警告/进行中（橙色）
- `.tag-red` — 危险/超期（红色）
- `.tag-blue` — 信息/一般（蓝色）
- `.tag-gray` — 次要/已归档（灰色）
- **禁止**在页面 `<style>` 中重新定义 `.tag-*` 样式

### 7.3 面包屑导航

**必须使用 framework.css 提供的 `.breadcrumb` 结构：**

```html
<div class="breadcrumb" id="breadcrumb">
  <span class="breadcrumb-prefix">当前位置：</span>
  <span class="breadcrumb-item" onclick="goToHome()">首页</span>
  <span class="breadcrumb-separator">&gt;</span>
  <span class="breadcrumb-item current">当前页面</span>
</div>
```

- 分隔符固定为 `>`
- **禁止**使用 `/` 作为分隔符
- **禁止**定义 `.breadcrumb-bar` 等替代样式

### 7.4 按钮

使用 framework.css 提供的按钮类：

| 类名 | 样式 | 用途 |
|------|------|------|
| `.btn .btn-primary` | 蓝色实心按钮 | 主要操作（新增、保存、确认） |
| `.btn .btn-default` | 白色描边按钮 | 次要操作（取消、重置、导出） |
| `.btn .btn-danger` | 红色实心按钮 | 危险操作（删除、停用） |
| `.btn-link` | 蓝色文字链接 | 表格操作列（查看、编辑） |
| `.btn-link.danger` | 红色文字链接 | 表格操作列（删除、督办） |

### 7.5 表格

使用 `.table-wrap` 容器（含边框、阴影、斑马纹、悬停效果）：

```html
<div class="table-wrap">
  <div class="table-scroll">
    <table>
      <thead><tr>...</tr></thead>
      <tbody>...</tbody>
    </table>
  </div>
  <div class="pagination-wrap">...</div>
</div>
```

### 7.6 筛选栏

使用 `.filter-bar` 容器：

```html
<div class="filter-bar">
  <div class="filter-item"><label>筛选：</label><select>...</select></div>
  <div class="filter-item"><input type="text" placeholder="搜索"></div>
  <button class="btn btn-default" onclick="resetFilter()">重置</button>
  <div style="flex: 1;"></div>
  <button class="btn btn-primary">+ 新增</button>
</div>
```

### 7.7 弹窗

使用全局 `Modal` 组件或框架标准弹窗结构。弹窗内信息板块使用 `.info-section` + `.info-grid`。

### 7.8 分页（强制使用 Pagination 组件）

**所有列表页分页必须使用 `js/pagination.js` 提供的 `Pagination` 类**，禁止在页面内联实现 `renderPagination` / `changePageSize` / `goPage` 函数。

#### 7.8.1 引入

```html
<!-- 在页面底部、其他业务 JS 之前引入 -->
<script src="../../js/pagination.js"></script>
```

#### 7.8.2 HTML 容器

```html
<div class="table-wrap">
  <div class="table-scroll">
    <table>...</table>
  </div>
  <!-- 容器为空 div，id 唯一，class 必须为 pagination -->
  <div class="pagination" id="paginationBar"></div>
</div>
```

#### 7.8.3 初始化与回调

```javascript
let currentPage = 1;
let pageSize = 10;
let pg;

document.addEventListener('DOMContentLoaded', () => {
  pg = new Pagination('paginationBar', {
    size: 10,                       // 默认每页（与组件默认一致）
    total: 0,                       // 初始总数（异步加载后用 setTotal 更新）
    sizeOptions: [10, 20, 50],      // 每页档位（标准三档，不再使用 100）
    onChange: (page, size) => {
      currentPage = page;
      pageSize = size;
      renderList();                 // 业务方负责重新渲染表格
    }
  });
  loadData();
});

function loadData() {
  const filtered = applyFilterToDataset();
  pg.setTotal(filtered.length);     // 数据变化后必须调用 setTotal
  renderList();
}
```

#### 7.8.4 筛选联动契约（强制）

筛选 / 搜索 / 重置函数**必须同时**重置业务变量和组件状态：

```javascript
function applyFilter() {
  currentPage = 1;
  pg.setPage(1);                    // 关键：避免页码停留在第 5 页但数据已回到首页
  loadData();
}

function resetFilter() {
  document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(el => el.value = '');
  applyFilter();
}
```

#### 7.8.5 公共 API

| 方法 | 用途 |
|------|------|
| `new Pagination(containerId, options)` | 初始化，options 含 `size` / `total` / `sizeOptions` / `onChange` |
| `pg.setTotal(total)` | 数据变化后更新总数，内部自动 re-render |
| `pg.setPage(page)` | 强制跳转到指定页（筛选后必须调用 `pg.setPage(1)`） |
| `pg.getState()` | 返回 `{ page, size, total }`，用于调试或导出当前分页状态 |

#### 7.8.6 视觉规范

| 元素 | CSS 类 | 备注 |
|------|--------|------|
| 容器 | `.pagination` | flex 布局，组件渲染入口 |
| 页码按钮 | `.pg` / `.pg.active` | active 为当前页高亮 |
| 总数文字 | `.pg-info` | "共 X 条" |
| 每页下拉 | `.pg-size` | select 元素 |
| 省略号 | `.pg-ellipsis` | 总页数 >7 时智能折叠 |
| 跳转容器 | `.pg-jump` | "前往 [_] 页" |
| 跳转输入 | `.pg-jump-input` | 回车触发跳转 |

#### 7.8.7 已废弃用法

| 旧写法 | 替代方案 |
|--------|----------|
| `<div class="pagination-wrap">...</div>` 静态 HTML | `<div class="pagination" id="..."></div>` + 组件 |
| 页内 `function renderPagination()` | `new Pagination()` 自动渲染 |
| 页内 `function changePageSize()` | 组件内部处理 |
| 页内 `function goPage(p)` | 组件内部处理 |
| 每页档位含 100 条 | 标准为 `[10, 20, 50]` |

---

## 8. 页面结构模板

标准管理页面应包含以下结构（从上到下）：

```
1. 面包屑导航 (.breadcrumb)
2. 统计卡片 (.stat-cards) - 可选
3. 筛选栏 (.filter-bar) - 如有表格
4. 表格容器 (.table-wrap) - 如有列表
   - 表格 (.table-scroll > table)
   - 分页 (.pagination#paginationBar) - 必须用 Pagination 组件渲染（见 §7.8）
```

---

## 9. 开发检查清单

新增/修改页面后自查：

### PC 端（超管/政府/企业）

- [ ] 已引用 `css/variables.css` 和 `css/framework.css`
- [ ] 无硬编码颜色（`#1677ff`, `#ff4d4f`, `#52c41a`, `#faad14`, `#1f1f1f`, `#666`, `#999`, `#fff`）
- [ ] 无硬编码间距（`4px`, `8px`, `12px`, `16px`, `20px`, `24px`）
- [ ] 无硬编码字号（`12px`, `13px`, `14px`, `16px`, `18px`, `24px`）
- [ ] 统计卡片使用 `.stat-cards` + `.stat-card` 结构
- [ ] 标签使用 `.tag .tag-{color}` 类
- [ ] 面包屑使用 `>` 分隔符
- [ ] 有 `data-module` 属性和初始化脚本
- [ ] 含树形结构的页面，`.tree-children` 已改为 scoped（仅 `.tree-select-group .tree-children` 受影响），自定义树形无需额外覆盖
- [ ] 阴影使用 `--shadow-sm`/`--shadow-md`/`--shadow-card`/`--shadow-card-hover`（`--shadow-card` 等于 `--shadow-sm`）

### 移动端

- [ ] 已引用 `css/mobile.css`（内含 `:root` 变量定义，无需额外引用 `variables.css`）
- [ ] 无硬编码颜色（使用 `--wc-*`、`--code-*`、`--brand-*` 变量）
- [ ] 无硬编码间距/字号/圆角（使用 `--wc-gap-*`、`--wc-font-*`、`--wc-radius-*` 变量）
- [ ] JS 中动态设置颜色时，优先使用 `var(--xxx)` 而非硬编码 hex 值

---

## 10. 常见问题

### Q: 为什么我的标签颜色和 framework.css 不一致？

A: 确保使用 `.tag-green` / `.tag-orange` / `.tag-red` / `.tag-blue` / `.tag-gray`，不要自行定义 `.tag-success` 等变体。

### Q: 统计卡片没有图标怎么办？

A: 使用 `.stat-icon {color}` 结构，color 可选 `blue`/`green`/`orange`/`gray`。如果不需要图标，仍使用标准结构，只是省略图标元素。

### Q: 可以覆盖 framework.css 的样式吗？

A: 尽量避免。如确有特殊需求，先在页面 `<style>` 中检查是否有更具体的选择器可复用，而非新增重复选择器。

### Q: 为什么我页面的树形内容不显示了？

A: `framework.css` 中 `.tree-children { display: none }` 已改为 scoped 选择器 `.tree-select-group .tree-children { display: none }`，仅影响 tree-select 组件。自定义树形不再受影响，无需额外覆盖。如果你的页面仍定义了 `.tree-children { display: block }` 的覆盖规则，可以安全删除。

### Q: 左树右表布局中，左右两侧顶部高度不一致怎么办？

A: 确保 `.right-panel` 的 `padding-top` 为 0，且所有 `.detail-view` 不设置 `margin-top`。顶部间距统一由外层容器控制，避免不同视图切换时高度跳动。

### Q: 移动端页面应该引用哪些 CSS？

A: 只需引用 `css/mobile.css`，它内含 `:root` 变量定义（`--wc-*`、`--code-*`、`--brand-*`），无需额外引用 `variables.css`。移动端使用 WeUI 设计规范，与 PC 端变量体系独立。

### Q: `--shadow-card` 和 `--shadow-sm` 有什么区别？

A: 值相同（`0 2px 8px rgba(0,0,0,0.08)`），`--shadow-card` 是 `--shadow-sm` 的语义别名。使用哪个取决于语境：卡片场景用 `--shadow-card`，通用小阴影用 `--shadow-sm`。

### Q: JS 中动态设置颜色可以用 CSS 变量吗？

A: 可以。现代浏览器支持 `element.style.color = 'var(--danger)'` 等写法。原型中已全面采用此方式。
