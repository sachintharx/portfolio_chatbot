# Start Backend Server Script
# Run this with: ./start-backend.ps1

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Portfolio Chatbot - Backend Server" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting backend server..." -ForegroundColor Yellow
Write-Host "Server will run on: http://localhost:3001" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend
npm run dev
