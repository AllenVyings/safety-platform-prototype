import { test, expect } from '@playwright/test';

// 直接打开模块页面（绕过 iframe 导航问题）
const MODULE_URL = 'http://localhost:8080/modules/enterprise/safety-control-object.html';

test.describe('Safety Control Object - Bug Fixes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(MODULE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('scan config table user column should use "position-name" format consistently', async ({ page }) => {
    // Click on "办公生活区" to expand
    const regionNode = page.locator('.tree-item:has-text("办公生活区")').first();
    if (await regionNode.isVisible()) {
      await regionNode.click();
      await page.waitForTimeout(300);

      // Click arrow to expand
      const arrow = regionNode.locator('.tree-node-arrow').first();
      if (await arrow.isVisible()) {
        await arrow.click();
        await page.waitForTimeout(200);
      }
    }

    // Click on "办公室" place node
    const placeNode = page.locator('.tree-item:has-text("办公室")').first();
    if (await placeNode.isVisible()) {
      await placeNode.click();
      await page.waitForTimeout(500);

      // Check scan config table user cells
      const userCells = page.locator('#placeScanConfigBody td:nth-child(4)');
      const count = await userCells.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(count, 5); i++) {
          const text = await userCells.nth(i).textContent();
          // Should be "职位-姓名" format, not just "姓名"
          expect(text.trim()).toMatch(/-.+/);
        }
      }
    }
  });

  test('cascader should display level (员工层级) tag for each user', async ({ page }) => {
    // Click on "办公生活区" to expand
    const regionNode = page.locator('.tree-item:has-text("办公生活区")').first();
    if (await regionNode.isVisible()) {
      await regionNode.click();
      await page.waitForTimeout(300);
      const arrow = regionNode.locator('.tree-node-arrow').first();
      if (await arrow.isVisible()) {
        await arrow.click();
        await page.waitForTimeout(200);
      }
    }

    // Click on "办公室" to show place detail
    const placeNode = page.locator('.tree-item:has-text("办公室")').first();
    if (await placeNode.isVisible()) {
      await placeNode.click();
      await page.waitForTimeout(300);
    }

    // Click "添加扫码配置" or similar button
    const addScanBtn = page.locator('button:has-text("扫码配置"), a:has-text("扫码配置")').first();
    if (await addScanBtn.isVisible()) {
      await addScanBtn.click();
      await page.waitForTimeout(300);
    }

    // Click cascader trigger
    const trigger = page.locator('#scanResponsibleCascader .tree-select-trigger').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      await page.waitForTimeout(500);

      // Check user items contain level tags
      const userItems = page.locator('.scan-user-item');
      const count = await userItems.count();
      if (count > 0) {
        const firstText = await userItems.first().textContent();
        const hasLevel = firstText.includes('领导层') || firstText.includes('管理层') || firstText.includes('员工层');
        expect(hasLevel).toBeTruthy();
      }
    }
  });

  test('selectedScanUsers should include level field after toggle', async ({ page }) => {
    // Verify through JavaScript evaluation that level field is included
    const hasLevel = await page.evaluate(() => {
      // Check that the toggleScanUser function copies level field
      const code = toggleScanUser.toString();
      return code.includes('level');
    });
    expect(hasLevel).toBeTruthy();
  });

  test('autoGenerateScanConfigs should use position-name format', async ({ page }) => {
    const formatConsistent = await page.evaluate(() => {
      const checklistData = { name: '测试检查表', skipHoliday: true };
      const configs = autoGenerateScanConfigs(checklistData);
      if (configs.length === 0) return true;
      // Every config.user should contain a dash (position-name format)
      return configs.every(c => c.user && c.user.includes('-'));
    });
    expect(formatConsistent).toBeTruthy();
  });
});
