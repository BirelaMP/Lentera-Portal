@echo off
setlocal
cd /d "%~dp0"
echo ==========================================
echo LENTERA Lab - Raspberry Pi / Local Backend
echo ==========================================
python main.py
if errorlevel 1 (
  echo.
  echo LENTERA backend berhenti dengan error.
  pause
)
endlocal
