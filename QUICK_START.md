# 🚀 Portfolio Chatbot - Quick Start Guide

## 📋 Prerequisites

Before you start, make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🎯 Project Overview

This project has two parts:
1. **Backend** - Express.js API server that handles chat requests
2. **Frontend** - React component that provides the chat UI

## 📦 Installation & Running

### Step 1: Start the Backend Server

The backend API must be running for the chatbot to work.

```powershell
# Navigate to the backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the server
npm run dev
```

**Expected Output:**
```
Server is running on http://localhost:3001
API endpoints:
  - GET  /api/health
  - GET  /api/personal-data
  - POST /api/chat
```

✅ **Backend is now running on http://localhost:3001**

Keep this terminal window open!

---

### Step 2: Use the Frontend Component

The frontend component (`frontend/Chatbot.tsx`) is designed to be used in a React application.

#### Option A: Integration into Your Existing React App

1. **Copy the component:**
   ```powershell
   # Copy frontend/Chatbot.tsx to your React project's components folder
   ```

2. **Install required dependencies in your React app:**
   ```powershell
   npm install lucide-react
   ```

3. **Create a `.env` file in your React app root:**
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. **Import and use the chatbot:**
   ```tsx
   // In your App.tsx or App.jsx
   import Chatbot from './components/Chatbot';

   function App() {
     return (
       <div className="App">
         {/* Your other components */}
         <Chatbot />
       </div>
     );
   }

   export default App;
   ```

5. **Start your React app:**
   ```powershell
   npm start
   ```

---

#### Option B: Create a New React App (For Testing)

If you don't have a React app yet, create one:

```powershell
# Navigate back to the project root
cd ..

# Create a new React app with TypeScript
npx create-react-app my-portfolio --template typescript

# Navigate to the new app
cd my-portfolio

# Install lucide-react
npm install lucide-react

# Copy the chatbot component
# Manually copy frontend/Chatbot.tsx to my-portfolio/src/components/Chatbot.tsx
```

Create `.env` file in `my-portfolio/`:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

Update `my-portfolio/src/App.tsx`:
```tsx
import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <h1>My Portfolio</h1>
      <Chatbot />
    </div>
  );
}

export default App;
```

Start the React app:
```powershell
npm start
```

---

## 🧪 Testing the API (Optional)

You can test the backend API independently:

### Test Health Endpoint
```powershell
# In a new terminal
curl http://localhost:3001/api/health
```

### Test Chat Endpoint
```powershell
curl -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d "{\"message\": \"Hello\"}"
```

Or use a tool like [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/).

---

## 📁 Project Structure

```
portfolio_chatbot/
├── backend/              # Backend API Server
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── README.md        # Backend documentation
│
├── frontend/            # Frontend React Component
│   ├── Chatbot.tsx      # Main chatbot component
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend documentation
│
├── Chatbot.tsx          # Original combined file (legacy)
├── hashara-data.txt     # Personal data for the chatbot
└── README.md            # Main documentation
```

---

## 🔧 Configuration

### Backend Configuration

**File:** `backend/.env` (optional)

```env
PORT=3001
GEMINI_API_KEY=your_api_key_here
```

- `PORT`: Server port (default: 3001)
- `GEMINI_API_KEY`: Your Google Gemini API key (optional, has default)

### Frontend Configuration

**File:** `.env` in your React app

```env
REACT_APP_API_URL=http://localhost:3001/api
```

---

## 📝 Personal Data

The chatbot reads from `hashara-data.txt`. To customize:

1. Edit `hashara-data.txt` in the project root
2. Restart the backend server
3. The chatbot will use the updated information

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Make sure you ran `npm install` in the backend folder
- Check for errors in the terminal

### Frontend shows API errors
- Make sure the backend is running on http://localhost:3001
- Check if `.env` file has the correct `REACT_APP_API_URL`
- Restart your React development server after changing `.env`

### CORS errors
- The backend has CORS enabled by default
- If you still get CORS errors, check the backend console

### TypeScript errors in VS Code
- Run `npm run typecheck` to verify there are no actual errors
- Reload VS Code window: `Ctrl+Shift+P` → "Reload Window"
- Select workspace TypeScript version

---

## 🚀 Quick Start (TL;DR)

```powershell
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Your React App
cd your-react-app
npm install lucide-react
# Copy frontend/Chatbot.tsx to your-react-app/src/components/
# Create .env with REACT_APP_API_URL=http://localhost:3001/api
npm start
```

---

## 📚 Additional Resources

- [Backend API Documentation](backend/README.md)
- [Frontend Component Documentation](frontend/README.md)
- [Main Project Documentation](README.md)

---

## 💡 Tips

1. **Development Mode**: The backend uses `nodemon` in dev mode for auto-reload
2. **Production**: Use `npm start` instead of `npm run dev` for production
3. **Environment Variables**: Never commit `.env` files with sensitive keys
4. **Customization**: Edit `hashara-data.txt` to personalize the chatbot responses

---

## ❓ Need Help?

If you encounter any issues:
1. Check the error messages in both terminal windows
2. Make sure both backend and frontend are running
3. Verify your `.env` configuration
4. Check the browser console for frontend errors

---

**Happy Coding! 🎉**
