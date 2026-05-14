# 安全码 V5.0 原型 - 快速启动指南

## 问题原因

Chrome/Edge 浏览器出于安全考虑，**禁止直接打开本地 HTML 文件**时加载其他本地资源（CSS/JS/iframe）。

错误信息：`Not allowed to load local resource`

## 解决方案

### 方案 1：使用内置 HTTP 服务器（推荐）⭐

**步骤**：
1. 打开命令行（PowerShell 或 CMD）
2. 进入项目目录：
   ```bash
   cd C:\Users\allen\.qclaw\workspace\01-安全码综合管理平台\05-原型 V5.0
   ```
3. 启动 HTTP 服务器：
   ```bash
   # 使用 Python（如果已安装）
   python -m http.server 8080
   
   # 或使用 Node.js（如果已安装）
   npx http-server -p 8080
   ```
4. 浏览器访问：`http://localhost:8080`

---

### 方案 2：修改 Edge 启动参数（临时）

**步骤**：
1. 关闭所有 Edge 窗口
2. 按 `Win + R`，输入：
   ```
   msedge.exe --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%/edge-dev"
   ```
3. 回车启动 Edge
4. 打开文件：`file:///C:/Users/allen/.qclaw/workspace/01-安全码综合管理平台/05-原型 V5.0/index.html`

⚠️ **注意**：此方法会降低浏览器安全性，仅用于开发测试

---

### 方案 3：使用 Firefox 浏览器

Firefox 对本地文件限制较宽松：

1. 打开 Firefox
2. 地址栏输入：`file:///C:/Users/allen/.qclaw/workspace/01-安全码综合管理平台/05-原型 V5.0/index.html`

---

### 方案 4：使用 VS Code Live Server 插件

**步骤**：
1. 安装 VS Code
2. 安装 "Live Server" 插件
3. 用 VS Code 打开项目文件夹
4. 右键 `index.html` → "Open with Live Server"

---

## 推荐工具：Quick HTTP Server

创建一个简单的启动脚本：

**start-server.bat**（双击即可启动）：
```batch
@echo off
cd /d "%~dp0"
echo ========================================
echo   安全码 V5.0 原型 - HTTP 服务器
echo ========================================
echo.
echo 访问地址：http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo.

python -m http.server 8080
```

---

## 文件检查清单

确保以下文件存在：

- [ ] index.html
- [ ] css/variables.css
- [ ] css/framework.css
- [ ] js/app.js
- [ ] js/router.js
- [ ] js/utils.js
- [ ] config/constants.js
- [ ] config/menus.js
- [ ] modules/super-admin/workbench.html
- [ ] modules/government/workbench.html
- [ ] modules/enterprise/workbench.html

---

## 故障排查

### 问题 1：Python 未安装

**错误**：`'python' 不是内部或外部命令`

**解决**：
- 安装 Python：https://www.python.org/downloads/
- 或使用 Node.js：`npx http-server -p 8080`

### 问题 2：端口被占用

**错误**：`Address already in use`

**解决**：
```bash
# 使用其他端口
python -m http.server 8081
```

### 问题 3：防火墙阻止

**解决**：
- 允许 Python/Node.js 通过防火墙
- 或临时关闭防火墙测试

---

## 快速验证

启动服务器后，访问 `http://localhost:8080`，应该看到：

1. ✅ 顶部导航栏（三端 Tab）
2. ✅ 左侧菜单（动态渲染）
3. ✅ 内容区域（工作台页面）
4. ✅ 按 F12 无错误日志

---

*最后更新：2026-04-02 15:40*
