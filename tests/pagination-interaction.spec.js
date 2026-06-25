// @ts-check
/**
 * Pagination interaction smoke test
 * V6.3.1 全局分页组件交互验证：选定 3 个数据量 >10 条的页面
 * 验证：
 *   - 点 "下一页" 后页码切换
 *   - 改 size 触发重渲染（页码总数变化）
 *   - 跳转输入回车跳页
 */
const { test, expect } = require('@playwright/test');

const INTERACTIVE_PAGES = [
  'modules/super-admin/hazard-lib.html',
  'modules/super-admin/regulation-lib.html',
  'modules/super-admin/position-manage.html',
];

for (const path of INTERACTIVE_PAGES) {
  test(`分页交互：${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
    });

    await page.goto(`/${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const container = page.locator('.pagination').first();
    await expect(container).toBeVisible();

    // 读取初始状态
    const initialTotal = await page.evaluate(() => {
      const info = document.querySelector('.pagination .pg-info');
      const m = info ? info.textContent.match(/共\s*(\d+)\s*条/) : null;
      return m ? parseInt(m[1], 10) : 0;
    });

    // 数据量不足以触发分页则跳过交互断言（但仍记录通过）
    if (initialTotal <= 10) {
      test.skip(true, `数据量 ${initialTotal} ≤ 10，无法验证分页交互`);
      return;
    }

    // ========== 1. 点"下一页" ==========
    const activeBefore = await container.locator('.pg.active').textContent();
    expect(activeBefore.trim()).toBe('1');

    const nextBtn = container.locator('.pg', { hasText: '下一页' });
    await nextBtn.click();
    await page.waitForTimeout(200);

    const activeAfter = await container.locator('.pg.active').textContent();
    expect(activeAfter.trim(), '点下一页后 active 应变为 2').toBe('2');

    // ========== 2. 改 size 触发 onChange ==========
    const sizeSelect = container.locator('.pg-size');
    await sizeSelect.selectOption('50');
    await page.waitForTimeout(200);

    // 改档后应回到第 1 页
    const activeAfterSize = await container.locator('.pg.active').textContent();
    expect(activeAfterSize.trim(), '改 size 后应回到第 1 页').toBe('1');

    // ========== 3. 跳转输入回车（在 size=50 下可能只有 1 页，先恢复 size=10） ==========
    await sizeSelect.selectOption('10');
    await page.waitForTimeout(200);

    // 检查是否存在跳转输入（总页数 > 7 才显示）
    const jumpInput = container.locator('.pg-jump-input');
    const jumpVisible = await jumpInput.isVisible().catch(() => false);
    if (jumpVisible) {
      await jumpInput.fill('3');
      await jumpInput.press('Enter');
      await page.waitForTimeout(200);
      const activeAfterJump = await container.locator('.pg.active').textContent();
      expect(activeAfterJump.trim(), '跳转输入 3 + 回车后 active 应变为 3').toBe('3');
    }

    // 无 JS 报错
    expect(errors, `页面不应有 JS 报错：\n${errors.join('\n')}`).toHaveLength(0);
  });
}
