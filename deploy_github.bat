@echo off
title EBRO Parts Planner - GitHub Pages Deploy

echo ========================================
echo   EBRO Parts Planner - GitHub Deploy
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Adding files to Git...
git add -A
if errorlevel 1 (
    echo ❌ Add files failed
    pause
    exit /b 1
)

echo [2/3] Committing changes...
git commit -m "Update report %date% %time%"
if errorlevel 1 (
    echo ⚠️ No changes to commit
) else (
    echo ✅ Commit successful
)

echo [3/3] Pushing to GitHub...
git push
if errorlevel 1 (
    echo ❌ Push failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ Deploy Success!
echo ========================================
echo.
echo GitHub Pages will update in 1-2 minutes
echo.
echo Visit:
echo https://ethan-feng-ebro.github.io/ebro-planner/
echo.
echo Press any key to exit...
pause >nul
