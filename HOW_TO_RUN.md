# 🚀 Easy Start Scripts Created!

## Available Batch Files

I've created convenient batch files to run your chatbot:

### 1. **start-frontend.bat** ⭐
Double-click to start the frontend React app
```
Frontend: http://localhost:3000
```

### 2. **start-backend.bat** 
Double-click to start the backend API server
```
Backend: http://localhost:3001
```

### 3. **start-all.bat** 🎯 (Recommended!)
Double-click to start BOTH backend and frontend
- Opens 2 separate terminal windows
- Backend starts first, then frontend
- Everything runs automatically!

---

## 📋 Quick Guide

### Option A: Start Everything at Once (Easiest!)
**Just double-click:** `start-all.bat`

This will:
1. ✅ Start backend on port 3001
2. ✅ Wait 5 seconds
3. ✅ Start frontend on port 3000
4. ✅ Browser opens automatically
5. ✅ Ready to chat!

### Option B: Start Services Separately

**Step 1:** Double-click `start-backend.bat`
**Step 2:** Double-click `start-frontend.bat`

---

## 🛑 How to Stop

### If using start-all.bat:
- Close both terminal windows (Backend Server & Frontend App)

### If running separately:
- Press `Ctrl+C` in each terminal window

---

## 🎯 Files in Your Project

```
portfolio_chatbot/
├── start-all.bat        ⭐ Start everything (Recommended!)
├── start-backend.bat    ▶️  Start backend only
├── start-frontend.bat   ▶️  Start frontend only
├── start-backend.ps1    🔷 PowerShell version (backend)
└── start-frontend.ps1   🔷 PowerShell version (frontend)
```

---

## 💡 Which One to Use?

**For Quick Testing:**
👉 **start-all.bat** - Double-click and go!

**For Development:**
👉 **start-backend.bat** + **start-frontend.bat** separately
   - Better for seeing logs
   - Easier to restart individual services

---

## ⚡ Quick Start (3 Steps)

1. **Double-click** `start-all.bat`
2. **Wait** for browser to open
3. **Click** the pink chat button!

---

## 🐛 Troubleshooting

### Port Already in Use Error?

**For Backend (Port 3001):**
```powershell
netstat -ano | findstr :3001
taskkill /F /PID [PID_NUMBER]
```

**For Frontend (Port 3000):**
```powershell
netstat -ano | findstr :3000
taskkill /F /PID [PID_NUMBER]
```

Then restart the services.

---

## 📚 More Help

- `SUCCESS.md` - Detailed success guide
- `QUICK_START.md` - Step-by-step instructions
- `PROJECT_STATUS.md` - Current project status

---

**🎉 Just double-click `start-all.bat` to get started!**
