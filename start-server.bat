@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   安全码综合管理平台 V5.0 - HTTP 服务器
echo ========================================
echo.
echo 启动 HTTP 服务器...
echo.
echo 访问地址：http://localhost:8080
echo 或：http://127.0.0.1:8080
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

REM 尝试 Python
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo [√] 使用 Python HTTP 服务器
    python -m http.server 8080
    goto :end
)

REM 尝试 Python3
where python3 >nul 2>&1
if %errorlevel% equ 0 (
    echo [√] 使用 Python3 HTTP 服务器
    python3 -m http.server 8080
    goto :end
)

REM 尝试 Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [√] 使用 Node.js HTTP 服务器
    npx http-server -p 8080 -c-1
    goto :end
)

echo [×] 未找到 Python 或 Node.js
echo.
echo 请安装以下任一工具：
echo   1. Python: https://www.python.org/downloads/
echo   2. Node.js: https://nodejs.org/
echo.
pause

:end
