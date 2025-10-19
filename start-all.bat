@echo off
echo ============================================
echo   Portfolio Chatbot - Complete Setup
echo ============================================
echo.
echo This will start BOTH backend and frontend
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop
echo ============================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 5 /nobreak

echo Starting Frontend App...
start "Frontend App" cmd /k "cd chatbot-demo && npm start"

echo.
echo ============================================
echo Both services are starting!
echo ============================================
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Close this window anytime.
echo To stop services, close their respective windows.
echo ============================================
pause
