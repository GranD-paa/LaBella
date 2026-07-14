@echo off
cd /d "%~dp0"
echo Starting LaBella dev server...
node node_modules\next\dist\bin\next dev
