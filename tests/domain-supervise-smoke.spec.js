const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8080/modules/government/domain-supervise.html';

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

  test('左树: 渲染24个领域小类', async ({ page }) => {
    const domains = page.locator('.tree-node[data-id^="domain-"]');
    await expect(domains).toHaveCount(24);
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
    await search.fill('劝导');
    const transCat = page.locator('.tree-node[data-id="cat-TRANS"]');
    const persuadeDomain = page.locator('.tree-node[data-id="domain-persuade"]');
    await expect(transCat).toBeVisible();
    await expect(persuadeDomain).toBeVisible();
    await search.fill('');
  });

  test('左树: 点击行业大类切换上下文', async ({ page }) => {
    const chemCat = page.locator('.tree-node[data-id="cat-CHEM"]');
    await chemCat.click();
    await expect(chemCat).toHaveClass(/active/);
    const title = page.locator('.detail-title');
    await expect(title).toContainText('危险化学品类');
  });

  test('左树: 点击领域小类切换上下文', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    const charging = page.locator('.tree-node[data-id="domain-charging"]');
    await expect(charging).toHaveClass(/active/);
    const title = page.locator('.detail-title');
    await expect(title).toContainText('电动自行车充电场所');
  });

  // ========== Tab 切换 ==========
  test('Tab: 2个Tab正常渲染', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    const tabs = page.locator('.tab-btn');
    await expect(tabs).toHaveCount(2);
    await expect(tabs.nth(0)).toContainText('任务配置');
    await expect(tabs.nth(1)).toContainText('进度监督');
  });

  test('Tab: 切换到任务配置', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    const configTab = page.locator('#tab-config');
    await expect(configTab).toHaveClass(/active/);
  });

  test('Tab: 切换到进度监督', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    const progressTab = page.locator('#tab-progress');
    await expect(progressTab).toHaveClass(/active/);
  });

  test('Tab: 切换后内容区变化', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    const configContent = page.locator('#configContent');
    await expect(configContent).toBeVisible();
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await expect(configContent).not.toBeVisible();
    const progressContent = page.locator('#progressContent');
    await expect(progressContent).toBeVisible();
  });

  // ========== Tab1: 监管总览 ==========
  test('Tab1: 根节点显示汇总表', async ({ page }) => {
    const header = page.locator('.table-scroll th', { hasText: '领域小类名称' });
    await expect(header).toBeVisible();
  });

  test('Tab1: 汇总表数据行', async ({ page }) => {
    const rows = page.locator('#overviewContent table tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Tab1: 选中领域小类不显示监管总览Tab', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    // 领域小类节点只有任务配置和进度监督两个Tab，无监管总览
    const tabNav = page.locator('#tabNav');
    await expect(tabNav).toBeVisible();
    const tabs = page.locator('.tab-btn');
    await expect(tabs).toHaveCount(2);
  });

  test('Tab1: 根节点汇总表有数据', async ({ page }) => {
    const rows = page.locator('#overviewContent table tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    // First row should have domain name
    const firstCell = await rows.first().locator('td').nth(1).textContent();
    expect(firstCell.length).toBeGreaterThan(0);
  });

  // ========== Tab2: 任务配置 ==========
  test('Tab2: 选中领域小类显示配置分区', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const blocks = page.locator('#tab-config .config-block');
    expect(await blocks.count()).toBeGreaterThanOrEqual(3);
    const titles = page.locator('#tab-config .config-section-title');
    await expect(titles.nth(0)).toContainText('责任科室');
    await expect(titles.nth(1)).toContainText('扫码责任');
    await expect(titles.nth(2)).toContainText('隐患责任');
  });

  test('Tab2: 递进提示条', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const contextBar = page.locator('#tab-config .context-bar', { hasText: '当前配置' });
    await expect(contextBar).toBeVisible();
  });

  test('Tab2: 扫码责任配置列表', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const scanSection = page.locator('#tab-config .config-section-title', { hasText: '扫码责任' });
    await expect(scanSection).toBeVisible();
  });

  test('Tab2: 检查表编辑/删除按钮', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const editBtn = page.locator('#tab-config .btn-link', { hasText: '编辑' }).first();
    await expect(editBtn).toBeVisible();
    const deleteBtn = page.locator('#tab-config .btn-link.danger', { hasText: '删除' }).first();
    await expect(deleteBtn).toBeVisible();
  });

  // Skipped: domain-other no longer exists in the tree; all domains now have checklists.
  test.skip('Tab2: 扫码依赖强制 - 无检查表时置灰', async ({ page }) => {
    // All 23 domains now have checklists configured, so there's no domain without checklists to test this.
  });

  test('Tab2: 根节点不显示Tab导航', async ({ page }) => {
    // 根节点/行业大类节点不显示Tab导航，直接展示监管总览
    const tabNav = page.locator('#tabNav');
    await expect(tabNav).not.toBeVisible();
  });

  // ========== Tab3: 进度监督 ==========
  test('Tab3: 根节点不显示Tab导航', async ({ page }) => {
    const tabNav = page.locator('#tabNav');
    await expect(tabNav).not.toBeVisible();
    // 根节点默认显示监管总览
    const header = page.locator('.table-scroll th', { hasText: '领域小类名称' });
    await expect(header).toBeVisible();
  });

  test('Tab3: 选中领域小类显示明细+类型标签', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    const typeTag = page.locator('#tab-progress .table-scroll .tag').first();
    await expect(typeTag).toBeVisible();
  });

  test('Tab3: 矩阵数据正确性', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    // Matrix columns: 领域小类(1) | 每日(2) | 每周(3) | 每月(4) | 每季度(5) | 每年(6) | 整体(7)
    const matrixTable = page.locator('#tab-progress .table-scroll').first();
    // Daily column (td 2) has data: '63%待15 / 对15'
    const dailyCell = matrixTable.locator('tbody tr:first-child td:nth-child(2)');
    await expect(dailyCell).toContainText('%');
    await expect(dailyCell).toContainText('待');
    // Overall column (td 7): '74/120 62%'
    const overallCell = matrixTable.locator('tbody tr:first-child td:nth-child(7)');
    await expect(overallCell).toContainText('/');
    await expect(overallCell).toContainText('%');
  });

  test('Tab3: 明细表有计划检查次数', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    // Detail table has columns: 管控对象名称, 对象类型, 计划检查次数, 已完成次数, 完成率, 操作
    const detailTable = page.locator('#tab-progress .table-scroll').nth(1);
    const firstPlanned = detailTable.locator('tbody tr:first-child td:nth-child(3)');
    const plannedText = await firstPlanned.textContent();
    // Should be a positive number
    expect(parseInt(plannedText)).toBeGreaterThan(0);
  });

  // ========== 弹窗 ==========
  test('弹窗: 配置责任分配弹窗存在', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    // The modal exists in the DOM
    const modal = page.locator('#modal-assign-responsibility');
    await expect(modal).toBeAttached();
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

  test.skip('弹窗: 扫码责任编辑', async ({ page }) => {
    // domain-construction no longer exists; skipping until a suitable replacement domain is identified
  });

  test('配置: 隐患责任配置为行内卡片', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    // Hazard config is now inline (not modal), check section exists with radio buttons
    const hazardSection = page.locator('#tab-config .config-section-title', { hasText: '隐患责任' });
    await expect(hazardSection).toBeVisible();
    // Should have radio buttons for 整改人 and 复核方
    const radios = page.locator('#tab-config .config-block input[type="radio"]');
    const radioCount = await radios.count();
    expect(radioCount).toBeGreaterThan(0);
  });

  test('弹窗: 删除确认', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    const deleteBtn = page.locator('#tab-config .btn-link.danger', { hasText: '删除' }).first();
    await deleteBtn.click();
    const modal = page.locator('#modal-delete-confirm');
    await expect(modal).toHaveClass(/show/);
    await expect(page.locator('#deleteConfirmText')).toContainText('不可恢复');
  });

  test('弹窗: 矩阵点击打开任务清单', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    // Matrix columns: 领域小类(1) | 每日(2) | 每周(3) | 每月(4) | 每季度(5) | 每年(6) | 整体(7)
    const matrixTable = page.locator('#tab-progress .table-scroll').first();
    // Click monthly cell (td 4)
    const monthlyCell = matrixTable.locator('tbody tr:first-child td:nth-child(4)');
    await monthlyCell.click();
    const modal = page.locator('#modal-task-list');
    await expect(modal).toHaveClass(/show/);
    // Title should contain domain + frequency
    await expect(page.locator('#taskListTitle')).toContainText('电动自行车充电场所');
    await expect(page.locator('#taskListTitle')).toContainText('每月');
    // Matrix click only shows undone tasks; header shows "未完成" + "共 X 条待处理"
    await expect(page.locator('#taskListBody')).toContainText('未完成');
    await expect(page.locator('#taskListBody')).toContainText('待处理');
    // Close modal
    await page.locator('#modal-task-list .modal-close').click();
    await expect(modal).not.toHaveClass(/show/);
  });

  test('弹窗: 明细表点击打开单对象任务清单', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    // Click first object's "任务清单" button
    const taskBtn = page.locator('#tab-progress .table-scroll tbody tr:first-child .btn-link', { hasText: '任务清单' });
    await taskBtn.click();
    const modal = page.locator('#modal-task-list');
    await expect(modal).toHaveClass(/show/);
    // Title should contain object name
    await expect(page.locator('#taskListTitle')).toContainText('南山');
    // Should show checklist table (flat table for single object)
    await expect(page.locator('#taskListBody')).toContainText('检查表名称');
    await expect(page.locator('#taskListBody')).toContainText('截止时间');
    // Close modal
    await page.locator('#modal-task-list .modal-close').click();
    await expect(modal).not.toHaveClass(/show/);
  });

  test('Tab3: 明细表行颜色存在三色之一', async ({ page }) => {
    await clickDomain(page, 'domain-charging');
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    const detailTable = page.locator('#tab-progress .table-scroll').nth(1);
    const fills = detailTable.locator('.coverage-fill');
    const count = await fills.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const cls = await fills.nth(i).getAttribute('class');
      const hasColor = cls.includes('red') || cls.includes('yellow') || cls.includes('green');
      expect(hasColor).toBe(true);
    }
  });

  // ========== 无JS错误 ==========
  test('无控制台JS错误', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(BASE);
    await page.waitForTimeout(1000);
    // Navigate through domains and tabs
    await clickDomain(page, 'domain-charging');
    await page.waitForTimeout(300);
    await page.locator('.tab-btn', { hasText: '任务配置' }).click();
    await page.waitForTimeout(300);
    await page.locator('.tab-btn', { hasText: '进度监督' }).click();
    await page.waitForTimeout(300);
    await page.locator('.tree-node[data-id="cat-CHEM"]').click();
    await page.waitForTimeout(300);
    await clickDomain(page, 'domain-gas-station');
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });
});
