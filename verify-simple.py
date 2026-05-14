#!/usr/bin/env python3
"""简化版超管端页面验证"""

import asyncio
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:8888/modules/super-admin"

PAGES = [
    ("政府用户管理", "gov-user.html"),
    ("企业用户管理", "ent-user.html"),
    ("企业信息管理", "ent-manage.html"),
    ("领域小类管理", "domain-manage.html"),
    ("检查库管理", "checklist-lib.html"),
    ("隐患库管理", "hazard-lib.html"),
    ("法规库管理", "regulation-lib.html"),
    ("项目信息管理", "project-manage.html"),
    ("项目组织架构", "project-org.html"),
    ("项目用户管理", "project-user.html"),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        
        print("超管端页面验证开始\n" + "="*50)
        
        for name, path in PAGES:
            url = f"{BASE_URL}/{path}"
            try:
                response = await page.goto(url, wait_until="domcontentloaded", timeout=15000)
                await asyncio.sleep(0.5)
                
                # 基本检查
                title = await page.title()
                body = await page.query_selector("body")
                body_text = await body.inner_text() if body else ""
                
                # 检查关键元素
                has_table = await page.query_selector("table") is not None
                has_modal = await page.query_selector(".modal-overlay") is not None
                
                status = "✅ PASS" if response and response.status == 200 else "❌ FAIL"
                print(f"{status} | {name}")
                print(f"       标题: {title[:40]}")
                print(f"       表格: {'✓' if has_table else '✗'} | 弹窗: {'✓' if has_modal else '✗'}")
                
                # 截图
                await page.screenshot(path=f"verify-{path.replace('.html','')}.png", full_page=True)
                
            except Exception as e:
                print(f"❌ FAIL | {name}: {str(e)[:60]}")
        
        await browser.close()
    
    print("="*50 + "\n验证完成，截图已保存")

if __name__ == "__main__":
    asyncio.run(main())
