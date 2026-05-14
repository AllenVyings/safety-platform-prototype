@echo off
chcp 65001 >nul
title 安全码综合管理平台 V5.0

echo ========================================
echo   安全码综合管理平台 V5.0
echo   一键启动
echo ========================================
echo.

cd /d "%~dp0"

set PORT=8080

REM 尝试 Node.js（优先，因为自带 _srv.js）
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [√] 检测到 Node.js，启动内置服务器...
    echo.
    echo   访问地址：http://localhost:%PORT%
    echo   按 Ctrl+C 停止服务器
    echo.
    start "" "http://localhost:%PORT%"
    node _srv.js
    goto :end
)

REM 尝试 Python
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [√] 检测到 Python，启动 HTTP 服务器...
    echo.
    echo   访问地址：http://localhost:%PORT%
    echo   按 Ctrl+C 停止服务器
    echo.
    start "" "http://localhost:%PORT%"
    python -m http.server %PORT%
    goto :end
)

REM 尝试 Python3
where python3 >nul 2>nul
if %errorlevel% equ 0 (
    echo [√] 检测到 Python3，启动 HTTP 服务器...
    echo.
    echo   访问地址：http://localhost:%PORT%
    echo   按 Ctrl+C 停止服务器
    echo.
    start "" "http://localhost:%PORT%"
    python3 -m http.server %PORT%
    goto :end
)

echo [×] 未检测到 Node.js 或 Python
echo.
echo 请安装以下任一工具（任选其一即可）：
echo   1. Node.js: https://nodejs.org/  （推荐）
echo   2. Python:  https://www.python.org/downloads/
echo.
pause

:end
