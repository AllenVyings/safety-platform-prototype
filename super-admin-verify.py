#!/usr/bin/env python3
"""
超管端页面自动化验证脚本
使用 Playwright 验证所有超管端页面
"""

import asyncio
from playwright.async_api import async_playwright
import json
from datetime import datetime

BASE_URL = "http://localhost:8888/modules/super-admin"

# 超管端页面列表
PAGES = [
    {"name": "政府用户管理", "path": "/gov-user.html", "checks": ["stat-cards", "filter-bar", "data-table", "pagination", "modal-overlay"]},
    {"name": "企业用户管理", "path": "/ent-user.html", "checks": ["tree-panel", "stat-cards", "filter-bar", "data-table", "pagination"]},
    {"name": "企业信息管理", "path": "/ent-manage.html", "checks": ["filter-bar", "data-table", "pagination", "modal-overlay"]},
    {"name": "领域小类管理", "path": "/domain-manage.html", "checks": ["tree-panel", "stat-row", "data-table", "modal-overlay"]},
    {"name": "检查库管理", "path": "/checklist-lib.html", "checks": ["tab-nav", "data-table", "modal-overlay"]},
    {"name": "隐患库管理", "path": "/hazard-lib.html", "checks": ["stat-cards", "filter-bar", "data-table", "modal-overlay"]},
    {"name": "法规库管理", "path": "/regulation-lib.html", "checks": ["filter-bar", "data-table", "modal-overlay"]},
    {"name": "项目信息管理", "path": "/project-manage.html", "checks": ["stat-cards", "filter-bar", "data-table", "pagination", "modal-overlay"]},
    {"name": "项目组织架构", "path": "/project-org.html", "checks": ["tree-panel", "detail-panel"]},
    {"name": "项目用户管理", "path": "/project-user.html", "checks": ["tree-panel", "filter-bar", "data-table", "pagination"]},
]

async def verify_page(page, page_info):
    """验证单个页面"""
    url = BASE_URL + page_info["path"]
    results = {
        "name": page_info["name"],
        "url": url,
        "status": "PASS",
        "checks": {},
        "errors": [],
        "screenshot": None
    }
    
    try:
        # 导航到页面
        response = await page.goto(url, wait_until="networkidle", timeout=30000)
        
        if not response or response.status >= 400:
            results["status"] = "FAIL"
            results["errors"].append(f"HTTP {response.status if response else 'no response'}")
            return results
        
        # 等待页面加载
        await page.wait_for_load_state("domcontentloaded")
        await asyncio.sleep(1)  # 等待 JS 执行
        
        # 检查页面标题
        title = await page.title()
        results["checks"]["title"] = title
        
        # 检查关键元素
        for check in page_info["checks"]:
            try:
                # 尝试多种选择器
                selectors = [
                    f".{check}",
                    f"[class*='{check}']",
                    f"#{check}",
                ]
                found = False
                for selector in selectors:
                    try:
                        element = await page.wait_for_selector(selector, timeout=2000)
                        if element:
                            found = True
                            break
                    except:
                        continue
                
                results["checks"][check] = "FOUND" if found else "NOT_FOUND"
                if not found:
                    results["status"] = "WARN"
            except Exception as e:
                results["checks"][check] = f"ERROR: {str(e)}"
                results["status"] = "WARN"
        
        # 检查 JS 错误
        js_errors = []
        page.on("pageerror", lambda err: js_errors.append(str(err)))
        await asyncio.sleep(0.5)
        if js_errors:
            results["errors"].extend(js_errors)
            results["status"] = "WARN"
        
        # 截图
        screenshot_path = f"verify-screenshots/super-admin-{page_info['path'].replace('/', '-').replace('.html', '')}.png"
        await page.screenshot(path=screenshot_path, full_page=True)
        results["screenshot"] = screenshot_path
        
    except Exception as e:
        results["status"] = "FAIL"
        results["errors"].append(str(e))
    
    return results

async def main():
    """主函数"""
    import os
    os.makedirs("verify-screenshots", exist_ok=True)
    
    results = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()
        
        print(f"开始验证超管端 {len(PAGES)} 个页面...")
        print("=" * 60)
        
        for page_info in PAGES:
            print(f"\n验证: {page_info['name']} ({page_info['path']})")
            result = await verify_page(page, page_info)
            results.append(result)
            
            # 打印结果
            status_icon = "✅" if result["status"] == "PASS" else "⚠️" if result["status"] == "WARN" else "❌"
            print(f"  {status_icon} 状态: {result['status']}")
            
            if result["errors"]:
                print(f"  错误: {', '.join(result['errors'])}")
            
            for check, status in result["checks"].items():
                if check != "title":
                    icon = "✓" if status == "FOUND" else "✗"
                    print(f"  {icon} {check}: {status}")
        
        await browser.close()
    
    # 生成报告
    report = {
        "timestamp": datetime.now().isoformat(),
        "total": len(results),
        "pass": sum(1 for r in results if r["status"] == "PASS"),
        "warn": sum(1 for r in results if r["status"] == "WARN"),
        "fail": sum(1 for r in results if r["status"] == "FAIL"),
        "results": results
    }
    
    with open("verify-report-super-admin.json", "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 60)
    print(f"验证完成: {report['pass']}/{report['total']} 通过, {report['warn']} 警告, {report['fail']} 失败")
    print(f"报告已保存: verify-report-super-admin.json")
    print(f"截图目录: verify-screenshots/")

if __name__ == "__main__":
    asyncio.run(main())
