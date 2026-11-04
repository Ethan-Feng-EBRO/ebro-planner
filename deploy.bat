@echo off
chcp 65001 >nul
echo ================================================
echo   EBRO 备件运营分析 - 一键部署到腾讯云
echo ================================================
echo.
echo 正在部署...
echo.

"D:\Program Files\Ada\resources\python\runtime\python.exe" "%~dp0deploy_to_cos.py" %*
