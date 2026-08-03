@echo off
cd /d "%~dp0"
echo Starting Laparli dev server...
node node_modules\next\dist\bin\next dev
