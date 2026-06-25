const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8766/modules/government/domain-supervise.html';

test.describe('领域监管 - 冒烟测试', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(500);
  });

  // Helper: expand tree to make domain nodes visible
  async function expandAll(page) {
    await page.locator('button', { hasText: '展开/收起' }).click();
    // If already collapsed, click again to expand
    const shownChildren = page.locator('.tree-children.show');
    if (await shownChildren.count() === 0) {
      await page.locator('button', { hasText: '展开/收起' }).click();
    }
  }

  async function clickDomain(page, id) {
    await expandAll(page);
    await page.locator(`.tree-node[data-id="${id}"]`).click();
  }

  // ========== 左树 ==========
  test('左树: 渲染7个行业大类', async ({ page }) => {
    const categories = page.locator('.tree-node[data-id^="cat-"]');
    await expect(categories).toHaveCount(7);
  });

  test('左树: 渲染17个领域小类', async ({ page }) => {
    const domains = page.locator('.tree-node[data-id^="domain-"]');
    await expect(domains).toHaveCount(17);
  });

  test('左树: 根节点默认选中', async ({ page }) => {
    const root = page.locator('.tree-node[data-id="root"]');
    await expect(root).toHaveClass(/active/);
  });

  test('左树: 展开/收起按钮', async ({ page }) => {
    const btn = page.locator('button', { hasText: '展开/收起' });
    await expect(btn).toBeVisible();
    // Initial: only root children are shown, sub-categories are hidden
    // First click: expand all (anyHidden=true)
    await btn.click();
    await page.waitForTimeout(200);
    // All tree-children should now have .show
    const allShown = page.locator('.tree-children.show');
    const totalChildren = page.locator('.tree-children');
    expect(await allShown.count()).toEqual(await totalChildren.count());
    // Second click: collapse all (anyHidden=false)
    await btn.click();
    await page.waitForTimeout(200);
    const allHidden = page.locator('.tree-children:not(.show)');
    expect(await allHidden.count()).toEqual(await totalChildren.count());
  });

  test('左树: 搜索保留父节点', async ({ page }) => {
    const search = page.locator('.tree-search');
    await search.fill('道路');
    const transportCat = page.locator('.tree-node[data-id="cat-transport"]');
    const roadDomain = page.locator('.tree-node[data-id="domain-road-transport"]');
    await expect(transportCat).toBeVisible();
    await expect(roadDomain).toBeVisible();
    await search.fill('');
  });

  test('左树: 点击行业大类切换上下文', async ({ page }) => {
    const chemCat = page.locator('.tree-node[data-id="cat-chemical"]');
    await chemCat.click();
    await expect(chemCat).toHaveClass(/active/);
    const title = page.locator('.detail-title');
    await expect(title).toContainText('危险化学品');
  });

  test('左树: 点击领域小类切换上下文', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    const charging = page.locator('.tree-node[data-id="domain-charging"]');
    await expect(charging).toHaveClass(/active/);
    const title = page.locator('.detail-title');
    await expect(title).toContainText('充换电设施');
  });

  // ========== Tab 切换 ==========
  test('Tab: 3个Tab正常渲染', async ({ page }) => {
    const tabs = page.locator('.tab-btn');
    await expect(tabs).toHaveCount(3);
    await expect(tabs.nth(0)).toContainText('监管总览');
    await expect(tabs.nth(1)).toContainText('任务配置');
    await expect(tabs.nth(2)).toContainText('进度监督');
  });

  test('Tab: 切换到任务配置', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    const configTab = page.locator('#tab-config');
    await expect(configTab).toHaveClass(/active/);
  });

  test('Tab: 切换到进度监督', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    const progressTab = page.locator('#tab-progress');
    await expect(progressTab).toHaveClass(/active/);
  });

  test('Tab: 切换后内容区变化', async ({ page }) => {
    const overviewContent = page.locator('#overviewContent');
    await expect(overviewContent).toBeVisible();
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await expect(overviewContent).not.toBeVisible();
    const configContent = page.locator('#configContent');
    await expect(configContent).toBeVisible();
  });

  // ========== Tab1: 监管总览 ==========
  test('Tab1: 根节点显示汇总表', async ({ page }) => {
    const header = page.locator('.table-scroll th', { hasText: '领域小类名称' });
    await expect(header).toBeVisible();
  });

  test('Tab1: 汇总表统计卡片', async ({ page }) => {
    const statCards = page.locator('#overviewContent .stat-card');
    await expect(statCards).toHaveCount(4);
  });

  test('Tab1: 选中领域小类显示明细表+勾选列', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    const checkboxHeader = page.locator('#overviewContent .table-scroll th input[type="checkbox"]');
    await expect(checkboxHeader).toBeVisible();
    const batchBtn = page.locator('#overviewContent button', { hasText: '批量配置责任人' });
    await expect(batchBtn).toBeVisible();
  });

  test('Tab1: 覆盖率三色正确', async ({ page }) => {
    await page.locator('.tree-node[data-id="cat-chemical"]').click();
    await page.waitForTimeout(300);
    const greenBars = page.locator('#overviewContent .coverage-fill.green');
    const yellowBars = page.locator('#overviewContent .coverage-fill.yellow');
    const redBars = page.locator('#overviewContent .coverage-fill.red');
    const totalBars = await greenBars.count() + await yellowBars.count() + await redBars.count();
    expect(totalBars).toBeGreaterThan(0);
  });

  // ========== Tab2: 任务配置 ==========
  test('Tab2: 选中领域小类显示递进分区', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const sections = page.locator('#tab-config .config-section');
    expect(await sections.count()).toBeGreaterThanOrEqual(3);
    const steps = page.locator('#tab-config .config-title .step');
    await expect(steps.nth(0)).toContainText('1');
    await expect(steps.nth(1)).toContainText('2');
    await expect(steps.nth(2)).toContainText('3');
  });

  test('Tab2: 递进提示条', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const contextBar = page.locator('#tab-config .context-bar', { hasText: '递进关系' });
    await expect(contextBar).toBeVisible();
  });

  test('Tab2: 全部配置列表', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const mixedList = page.locator('#tab-config .config-title', { hasText: '全部配置列表' });
    await expect(mixedList).toBeVisible();
  });

  test('Tab2: 检查表编辑/删除按钮', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const editBtn = page.locator('#tab-config .config-table .btn-link', { hasText: '编辑' }).first();
    await expect(editBtn).toBeVisible();
    const deleteBtn = page.locator('#tab-config .config-table .btn-link.danger', { hasText: '删除' }).first();
    await expect(deleteBtn).toBeVisible();
  });

  test('Tab2: 扫码依赖强制 - 无检查表时置灰', async ({ page }) => {
    await clickDomain(page, 'domain-other');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const scanSection = page.locator('#tab-config .config-section').nth(1);
    const opacity = await scanSection.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeLessThanOrEqual(0.7);
  });

  test('Tab2: 根节点显示配置总览矩阵', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const header = page.locator('#tab-config .table-scroll th', { hasText: '检查表配置' });
    await expect(header).toBeVisible();
  });

  // ========== Tab3: 进度监督 ==========
  test('Tab3: 根节点显示进度汇总表', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    const header = page.locator('#tab-progress .table-scroll th', { hasText: '整体完成率' });
    await expect(header).toBeVisible();
  });

  test('Tab3: 进度汇总列名完整', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('#tab-progress .table-scroll th', { hasText: '计划检查次数' })).toBeVisible();
    await expect(page.locator('#tab-progress .table-scroll th', { hasText: '已完成次数' })).toBeVisible();
    await expect(page.locator('#tab-progress .table-scroll th', { hasText: '超期次数' })).toBeVisible();
  });

  test('Tab3: 选中领域小类显示明细+类型标签', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    const typeTag = page.locator('#tab-progress .table-scroll .tag').first();
    await expect(typeTag).toBeVisible();
  });

  test('Tab3: 统计周期切换', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    const periodSelect = page.locator('#progressPeriod');
    await expect(periodSelect).toBeVisible();
    await periodSelect.selectOption('本季度');
    const table = page.locator('#tab-progress .table-scroll table');
    await expect(table).toBeVisible();
  });

  // ========== 弹窗 ==========
  test('弹窗: 批量配置责任人(多选)', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    await page.locator('#overviewContent button', { hasText: '批量配置责任人' }).click();
    const modal = page.locator('#modal-assign');
    await expect(modal).toHaveClass(/show/);
    const personSelect = page.locator('#assignPerson');
    const isMultiple = await personSelect.getAttribute('multiple');
    expect(isMultiple).not.toBeNull();
  });

  test('弹窗: 新增检查表配置', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const addBtn = page.locator('#tab-config button', { hasText: '+ 新增' }).first();
    await addBtn.click();
    const modal = page.locator('#modal-checklist');
    await expect(modal).toHaveClass(/show/);
  });

  test('弹窗: 扫码责任编辑', async ({ page }) => {
    await clickDomain(page, 'domain-construction');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    // Find the scan section edit button (2nd config section)
    const scanEditBtn = page.locator('#tab-config .config-section').nth(1).locator('button', { hasText: '编辑' });
    await scanEditBtn.click();
    const modal = page.locator('#modal-scan-edit');
    await expect(modal).toHaveClass(/show/);
    const linkedSelect = page.locator('#scanLinkedChecklist');
    await expect(linkedSelect).toBeVisible();
  });

  test('弹窗: 隐患责任编辑', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const hazardEditBtn = page.locator('#tab-config .config-section').nth(2).locator('button', { hasText: '编辑' });
    await hazardEditBtn.click();
    const modal = page.locator('#modal-hazard-edit');
    await expect(modal).toHaveClass(/show/);
  });

  test('弹窗: 删除确认', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const deleteBtn = page.locator('#tab-config .config-table .btn-link.danger', { hasText: '删除' }).first();
    await deleteBtn.click();
    const modal = page.locator('#modal-delete-confirm');
    await expect(modal).toHaveClass(/show/);
    await expect(page.locator('#deleteConfirmText')).toContainText('不可恢复');
  });

  test('弹窗: 未完成清单', async ({ page }) => {
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    const viewBtn = page.locator('#tab-progress .btn-link', { hasText: '查看未完成清单' }).first();
    await viewBtn.click();
    const modal = page.locator('#modal-incomplete');
    await expect(modal).toHaveClass(/show/);
  });

  // ========== 无JS错误 ==========
  test('无控制台JS错误', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(BASE);
    await page.waitForTimeout(1000);
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    await page.locator('.tab-btn', { hasText: '监管总览' }).click();
    await page.waitForTimeout(300);
    await expandAll(page);
    await page.locator('.tree-node[data-id="cat-transport"]').click();
    await page.waitForTimeout(300);
    await clickDomain(page, 'domain-road-transport');
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });
});
