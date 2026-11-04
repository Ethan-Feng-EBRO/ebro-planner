@echo off
title EBRO Parts Planner - Auto Deploy

echo ========================================
echo   EBRO Parts Planner - Auto Deploy
echo ========================================
echo.

cd /d "%~dp0"

:: Check if index.html exists in current directory
if not exist "index.html" (
    echo index.html not found in current directory
    echo Please download it first from the web app
    pause
    exit /b 1
)

echo [1/3] Adding files to Git...
git add -A
if errorlevel 1 (
    echo Failed to add files
    pause
    exit /b 1
)

echo [2/3] Committing changes...
git commit -m "Auto sync %date% %time%" >nul 2>&1
if errorlevel 1 (
    echo No changes or commit failed
) else (
    echo Commit successful
)

echo [3/3] Pushing to GitHub...
git push
if errorlevel 1 (
    echo Push failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Deploy Success!
echo ========================================
echo.
echo GitHub Pages will update in 1-2 minutes
echo Visit: https://ethan-feng-ebro.github.io/ebro-planner/
echo.
pause
