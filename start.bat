@echo off
REM Employee Portal - Quick Start Script for Windows
REM This script starts both frontend and backend servers

echo.
echo ========================================
echo   Employee Portal - Quick Start
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js v18+ from https://nodejs.org
    pause
    exit /b 1
)

echo Starting services...
echo.

REM Start Backend
echo Starting Backend Server (port 3000)...
cd backend
call npm install >nul 2>&1
start "Backend Server" cmd /k npm run dev
timeout /t 2 /nobreak
cd ..

REM Start Frontend
echo Starting Frontend Server (port 5173)...
cd frontend
call npm install >nul 2>&1
start "Frontend Server" cmd /k npm run dev
cd ..

echo.
echo ========================================
echo Services are running!
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo.
echo Demo Credentials:
echo   Admin:    john.smith@company.com / password123
echo   Manager:  sarah.johnson@company.com / password123
echo   Employee: michael.chen@company.com / password123
echo.
echo Press Ctrl+C to stop services
echo ========================================
echo.

pause
