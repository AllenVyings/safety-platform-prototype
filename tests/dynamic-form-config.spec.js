// 验证 §6.1.5.9 动态表单配置（二级弹窗 + 预览弹窗）
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8766';

test('domain-manage 动态表单配置 - 二级弹窗/板块/字段拖拽/暂存确认', async ({ page }) => {
  await page.goto(`${BASE}/modules/super-admin/domain-manage.html`);
  await page.waitForTimeout(800);

  // 点击新增按钮
  await page.click('text=新增领域小类');
  await page.waitForTimeout(500);

  // 验证主弹窗打开
  await expect(page.locator('#domainModal')).toBeVisible();

  // 初始状态：动态表单配置面板隐藏
  const configPanel = page.locator('#dynamicFormConfig');
  await expect(configPanel).not.toHaveClass(/active/);

  // 选择「启用动态表单=是」
  await page.check('input[name="dynamicFormEnabled"][value="1"]');
  await page.waitForTimeout(300);

  // 面板应展开，显示「配置」+「预览」按钮 + 摘要
  await expect(configPanel).toHaveClass(/active/);
  await expect(page.locator('button:has-text("⚙ 配置")')).toBeVisible();
  await expect(page.locator('button:has-text("👁 预览")')).toBeVisible();
  // 启用时自动初始化预设板块（含预填字段），摘要应显示 5 字段
  await expect(page.locator('#dfConfigSummary')).toContainText('5 个字段');

  // 点击「配置」打开二级弹窗
  await page.click('button:has-text("⚙ 配置")');
  await page.waitForTimeout(500);
  await expect(page.locator('#dfConfigModal')).toBeVisible();

  // 应有 2 个预设板块（基本信息/账号信息）
  await expect(page.locator('#dfConfigModal .df-section-tag:has-text("预设")')).toHaveCount(2);
  await expect(page.locator('#dfConfigModal .df-section-name:has-text("基本信息")')).toBeVisible();
  await expect(page.locator('#dfConfigModal .df-section-name:has-text("账号信息")')).toBeVisible();

  // 预设板块应自带预填字段（3 + 2 = 5 个）
  await expect(page.locator('#dfConfigModal .df-field-row')).toHaveCount(5);

  // 验证预填字段
  const initialLabels = await page.locator('#dfConfigModal .df-field-label').allTextContents();
  console.log('预填字段 labels:', initialLabels.join(', '));
  expect(initialLabels.some(l => l.includes('企业名称'))).toBeTruthy();
  expect(initialLabels.some(l => l.includes('统一信用代码'))).toBeTruthy();
  expect(initialLabels.some(l => l.includes('法定代表人'))).toBeTruthy();
  expect(initialLabels.some(l => l.includes('登录名'))).toBeTruthy();
  expect(initialLabels.some(l => l.includes('手机号'))).toBeTruthy();

  // 字段类型库应有 16 项
  const fieldTypeItems = page.locator('#dfConfigModal .df-field-type-item');
  await expect(fieldTypeItems).toHaveCount(16);

  // 拖拽字段类型到第一个板块（3 预填 + 1 新增 = 4 个）
  const firstTypeItem = fieldTypeItems.first();
  const firstSectionBody = page.locator('#dfConfigModal .df-section-body').first();
  await firstTypeItem.hover();
  await page.mouse.down();
  await firstSectionBody.hover();
  await page.mouse.up();
  await page.waitForTimeout(300);
  await expect(page.locator('#dfConfigModal .df-section-card').first().locator('.df-field-row')).toHaveCount(4);

  // 修改字段名称
  await page.fill('#dfConfigModal .df-property-form input[type="text"]', '测试字段');
  await page.waitForTimeout(200);
  const selectedFieldLabel = await page.locator('#dfConfigModal .df-field-row.selected .df-field-label').textContent();
  console.log('字段 label:', selectedFieldLabel);

  // 折叠/展开
  const firstCollapseBtn = page.locator('#dfConfigModal .df-section-card').first().locator('.df-collapse-btn');
  await firstCollapseBtn.click();
  await page.waitForTimeout(200);
  await expect(page.locator('#dfConfigModal .df-section-card').first()).toHaveClass(/collapsed/);
  await firstCollapseBtn.click();
  await page.waitForTimeout(200);

  // 新增自定义板块
  page.on('dialog', d => d.accept('测试板块'));
  await page.click('#dfConfigModal button:has-text("新增自定义板块")');
  await page.waitForTimeout(300);
  await expect(page.locator('#dfConfigModal .df-section-name:has-text("测试板块")')).toBeVisible();
  await expect(page.locator('#dfConfigModal .df-section-tag.custom')).toHaveCount(1);

  // 点击「取消」：丢弃草稿，摘要恢复为 5 字段（自定义板块+新增字段被丢弃）
  await page.click('#dfConfigModal button:has-text("取消")');
  await page.waitForTimeout(300);
  await expect(page.locator('#dfConfigModal')).not.toBeVisible();
  await expect(page.locator('#dfConfigSummary')).toContainText('5 个字段');

  // 重新点「配置」打开：应为预填的 5 个字段（自定义板块被丢弃）
  await page.click('button:has-text("⚙ 配置")');
  await page.waitForTimeout(500);
  await expect(page.locator('#dfConfigModal .df-field-row')).toHaveCount(5);
  await expect(page.locator('#dfConfigModal .df-section-name:has-text("测试板块")')).toHaveCount(0);

  // 再次拖入字段并修改名称
  await firstTypeItem.hover();
  await page.mouse.down();
  await firstSectionBody.hover();
  await page.mouse.up();
  await page.waitForTimeout(300);
  await page.fill('#dfConfigModal .df-property-form input[type="text"]', '安全员姓名');

  // 点击「确定」：草稿同步，摘要更新
  await page.click('#dfConfigModal button:has-text("确定")');
  await page.waitForTimeout(300);
  await expect(page.locator('#dfConfigModal')).not.toBeVisible();
  await expect(page.locator('#dfConfigSummary')).toContainText('共 2 个板块，6 个字段');

  // 切换到其他模式：动态表单应禁用
  await page.click('.mode-option:has-text("其他模式")');
  await page.waitForTimeout(300);
  await expect(page.locator('#dynamicFormEnabled')).toHaveClass(/disabled/);
  const checkedValue = await page.locator('input[name="dynamicFormEnabled"]:checked').inputValue();
  expect(checkedValue).toBe('0');
  await expect(configPanel).not.toHaveClass(/active/);

  // 切回基础模式：应解禁
  await page.click('.mode-option:has-text("基础模式")');
  await page.waitForTimeout(300);
  await expect(page.locator('#dynamicFormEnabled')).not.toHaveClass(/disabled/);
  // 摘要应保留（确定过的 6 字段）
  await expect(page.locator('#dfConfigSummary')).toContainText('6 个字段');

  console.log('=== 二级弹窗 + 暂存确认 验证通过 ===');
});

test('domain-manage 动态表单预览弹窗 - 模拟填报+实时校验', async ({ page }) => {
  await page.goto(`${BASE}/modules/super-admin/domain-manage.html`);
  await page.waitForTimeout(800);

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  // 新增
  await page.click('text=新增领域小类');
  await page.waitForTimeout(500);

  // 启用动态表单
  await page.check('input[name="dynamicFormEnabled"][value="1"]');
  await page.waitForTimeout(300);

  // 直接点「预览」：应显示空状态（预填字段存在，不为空）
  await page.click('button:has-text("👁 预览")');
  await page.waitForTimeout(500);
  await expect(page.locator('#dfPreviewModal')).toBeVisible();

  // 预览应显示 2 个板块（基本信息/账号信息）+ 5 个字段
  await expect(page.locator('#dfPreviewModal .df-preview-section')).toHaveCount(2);
  await expect(page.locator('#dfPreviewModal .df-preview-field')).toHaveCount(5);

  // 验证字段 label 含必填标记
  await expect(page.locator('#dfPreviewModal .df-preview-field-label:has-text("企业名称")')).toBeVisible();
  await expect(page.locator('#dfPreviewModal .df-preview-field-label:has-text("登录名")')).toBeVisible();

  // 关闭预览
  await page.click('#dfPreviewModal button:has-text("关闭")');
  await page.waitForTimeout(300);
  await expect(page.locator('#dfPreviewModal')).not.toBeVisible();

  console.log('=== 预览弹窗 验证通过 ===');
  console.log('console errors:', errors.length);
  expect(errors.length).toBe(0);
});

test('domain-manage 动态表单配置 - 保存与回填', async ({ page }) => {
  await page.goto(`${BASE}/modules/super-admin/domain-manage.html`);
  await page.waitForTimeout(800);

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  // 新增
  await page.click('text=新增领域小类');
  await page.waitForTimeout(500);

  // 填写基本信息
  const industryOptions = await page.locator('#industryCategory option').allTextContents();
  const targetOption = industryOptions.find(o => o.includes('工业制造')) || industryOptions[1];
  await page.selectOption('#industryCategory', { label: targetOption });
  await page.fill('#domainName', '动态表单测试小类');

  // 启用动态表单
  await page.check('input[name="dynamicFormEnabled"][value="1"]');
  await page.waitForTimeout(300);

  // 打开配置弹窗
  await page.click('button:has-text("⚙ 配置")');
  await page.waitForTimeout(500);

  // 拖拽字段到第一个板块
  const firstTypeItem = page.locator('#dfConfigModal .df-field-type-item').first();
  const firstSectionBody = page.locator('#dfConfigModal .df-section-body').first();
  await firstTypeItem.hover();
  await page.mouse.down();
  await firstSectionBody.hover();
  await page.mouse.up();
  await page.waitForTimeout(300);

  // 修改字段名称
  await page.fill('#dfConfigModal .df-property-form input[type="text"]', '安全员姓名');

  // 确定配置
  await page.click('#dfConfigModal button:has-text("确定")');
  await page.waitForTimeout(300);

  // 保存主弹窗
  await page.click('#domainModal button:has-text("保存")');
  await page.waitForTimeout(800);

  await expect(page.locator('text=新增成功')).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.locator('text=动态表单测试小类')).toBeVisible();

  // 编辑该记录
  await page.click('tr:has-text("动态表单测试小类") button:has-text("编辑")');
  await page.waitForTimeout(800);

  // 验证动态表单已启用
  const enabledValue = await page.locator('input[name="dynamicFormEnabled"]:checked').inputValue();
  expect(enabledValue).toBe('1');

  // 摘要应显示 6 字段
  await expect(page.locator('#dfConfigSummary')).toContainText('6 个字段');

  // 打开配置弹窗，字段应回填
  await page.click('button:has-text("⚙ 配置")');
  await page.waitForTimeout(500);
  await expect(page.locator('#dfConfigModal .df-field-row')).toHaveCount(6);

  const allLabels = await page.locator('#dfConfigModal .df-field-label').allTextContents();
  console.log('回填字段 labels:', allLabels.join(', '));
  expect(allLabels.some(l => l.includes('安全员姓名'))).toBeTruthy();
  expect(allLabels.some(l => l.includes('企业名称'))).toBeTruthy();

  console.log('=== 保存与回填 验证通过 ===');
  console.log('console errors:', errors.length);
  expect(errors.length).toBe(0);
});
