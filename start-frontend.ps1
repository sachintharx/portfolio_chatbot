# Start Frontend App Script
# Run this with: ./start-frontend.ps1

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Portfolio Chatbot - Frontend App" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting frontend React app..." -ForegroundColor Yellow
Write-Host "App will run on: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "The browser will open automatically" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Set-Location chatbot-demo
npm start
