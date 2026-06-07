// @ts-check
/**
 * Pagination smoke test
 * 覆盖 V6.3.1 全局分页组件标准化：11 个列表页统一接入 js/pagination.js
 * 验证每个页面：
 *   1. .pagination 容器存在
 *   2. .pg 页码按钮被渲染（说明 new Pagination() 执行成功）
 *   3. .pg-size 每页档位下拉存在
 *   4. .pg-info "共 X 条" 文字渲染
 *   5. .pg-jump 跳转输入框存在
 */
const { test, expect } = require('@playwright/test');

const PAGES = [
  'modules/enterprise/project-org.html',
  'modules/enterprise/project-user.html',
  'modules/government/project-manage.html',
  'modules/super-admin/domain-manage.html',
  'modules/super-admin/ent-manage.html',
  'modules/super-admin/ent-user.html',
  'modules/super-admin/gov-user.html',
  'modules/super-admin/hazard-lib.html',
  'modules/super-admin/position-manage.html',
  'modules/super-admin/project-manage.html',
  'modules/super-admin/regulation-lib.html',
];

for (const path of PAGES) {
  test(`分页组件渲染：${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    });

    await page.goto(`/${path}`, { waitUntil: 'networkidle' });

    // 1. 分页容器
    const container = page.locator('.pagination').first();
    await expect(container, '.pagination 容器应存在').toBeVisible({ timeout: 5000 });

    // 2. 页码按钮（至少 1 个 .pg 被渲染，证明 Pagination 实例化成功）
    //    注意：初始 total 可能为 0（异步加载），此时组件只渲染「上一页 / 1 / 下一页」共 2-3 个按钮
    const pgBtns = container.locator('.pg');
    await expect(pgBtns.first(), '至少应渲染 1 个 .pg 按钮').toBeVisible();
    const pgCount = await pgBtns.count();
    expect(pgCount, '.pg 按钮数量应 >= 2（至少含 上一页/下一页）').toBeGreaterThanOrEqual(2);

    // 3. 每页档位下拉
    const sizeSelect = container.locator('.pg-size');
    await expect(sizeSelect, '.pg-size 下拉应存在').toBeVisible();
    const options = await sizeSelect.locator('option').allTextContents();
    expect(options.length, '每页档位应为 3 档 (10/20/50)').toBe(3);

    // 4. 总数文字
    const info = container.locator('.pg-info');
    await expect(info, '.pg-info 应渲染').toBeVisible();
    const infoText = await info.textContent();
    expect(infoText, '应包含 "共 X 条" 格式').toMatch(/共\s*\d+\s*条/);

    // 5. 跳转输入
    const jumpInput = container.locator('.pg-jump-input');
    await expect(jumpInput, '.pg-jump-input 跳转输入框应存在').toBeVisible();

    // 6. 无 JS 报错
    expect(errors, `页面不应有 JS 报错：\n${errors.join('\n')}`).toHaveLength(0);
  });
}
