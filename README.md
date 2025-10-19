# 🤖 Portfolio AI Chatbot

A modern, full-stack AI chatbot application with a beautiful top-widget design, powered by Google Gemini AI.

## 📁 Project Structure

```
portfolio_chatbot/
├── backend/                    # Express.js API server
│   ├── hashara-data.txt       # Personal data for AI context
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── node_modules/          # Backend packages
│
├── chatbot-demo/              # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   └── Chatbot.tsx    # Main chatbot component
│   │   ├── App.tsx            # Main app component
│   │   ├── App.css            # Global styles & animations
│   │   └── index.tsx          # Entry point
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies
│   └── .env                   # Environment variables
│
├── start-backend.bat          # Windows batch script for backend
├── start-frontend.bat         # Windows batch script for frontend
├── start-all.bat              # Start both services at once
├── hashara-data.txt           # Personal data (backend copy)
└── README.md                  # This file
```

## 🚀 Features

### ✨ Modern UI Design
- **Top Widget Layout** - Full-width collapsible bar at the top of the page
- **Glass Morphism** - Beautiful backdrop blur effects
- **Gradient Backgrounds** - Smooth violet-purple-pink gradients
- **Smooth Animations** - Slide-down, fade-in, and hover effects
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Accents** - Professional color scheme

### 🤖 AI Capabilities
- Powered by **Google Gemini 2.0 Flash** AI model
- Context-aware responses using personal data
- Natural conversation flow
- Fast response times
- Error handling and loading states

### 💡 Interactive Features
- **Quick Action Buttons** - Pre-filled prompts for Skills, Projects, Education
- **Avatar Icons** - Distinct user and bot avatars
- **Timestamps** - Message timing display
- **Typing Indicators** - Shows when AI is thinking
- **Auto-scroll** - Automatically scrolls to latest message

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v4.18.2) - Web framework
- **Google Generative AI** - AI model integration
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.3.1) - Environment variables

### Frontend
- **React** (v18.3.1) - UI library
- **TypeScript** (v5.0.0) - Type safety
- **Lucide React** (v0.263.1) - Modern icons
- **Create React App** - Build tooling

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd portfolio_chatbot
```

### 2. Set Up Backend
```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 3. Set Up Frontend
```bash
cd ../chatbot-demo
npm install
```

Create `.env` file in the `chatbot-demo` folder:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

### 4. Customize Personal Data
Edit `backend/hashara-data.txt` with your own information for the AI to reference.

## 🎯 Running the Project

### Option 1: Using Batch Files (Windows - Easiest)

**Start everything at once:**
```bash
start-all.bat
```

**Or start separately:**
```bash
# Terminal 1 - Start backend
start-backend.bat

# Terminal 2 - Start frontend
start-frontend.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd chatbot-demo
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

### API Endpoints:
- `GET /api/health` - Check server status
- `GET /api/personal-data` - Get personal information
- `POST /api/chat` - Send chat messages

## 💻 Usage

1. Open your browser to `http://localhost:3000`
2. You'll see a gradient bar at the top with "AI Assistant"
3. Click anywhere on the top bar to open the chatbot
4. Type your message or use quick action buttons:
   - 💼 **Skills** - Ask about technical skills
   - 🚀 **Projects** - Learn about projects
   - 🎓 **Education** - Get education background
5. Chat naturally with the AI assistant
6. Click the X button to close the widget

## 🎨 Customization

### Change Colors
Edit `chatbot-demo/src/components/Chatbot.tsx` and modify the gradient classes:
```tsx
// Change main gradient
className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600"

// Change to your colors
className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"
```

### Modify Personal Data
Edit `backend/hashara-data.txt` with your:
- Name and title
- Skills and technologies
- Projects and achievements
- Education background
- Contact information

### Adjust Widget Size
In `Chatbot.tsx`, modify the style:
```tsx
style={{
  maxHeight: "70vh",  // Change height (e.g., "80vh", "600px")
}}
```

## 📦 Building for Production

### Frontend
```bash
cd chatbot-demo
npm run build
```

The build folder will contain optimized production files.

### Backend
The backend is ready for deployment as-is. Just set environment variables on your hosting platform.

## 🚀 Deployment Options

### Backend (Node.js API)
- **Heroku** - Easy Node.js deployment
- **Railway** - Modern platform with free tier
- **Render** - Simple deployment
- **AWS EC2** - Full control
- **DigitalOcean** - App platform

### Frontend (React App)
- **Vercel** - Instant deployment (recommended)
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting
- **AWS S3 + CloudFront** - Scalable solution

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 or 3001 is busy:
```bash
# Windows - Find and kill process
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### Backend Won't Start
- Check if `.env` file exists with valid GEMINI_API_KEY
- Verify Node.js version: `node --version`
- Reinstall dependencies: `npm install`

### Frontend Build Errors
- Clear cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

### API Errors
- Verify backend is running on port 3001
- Check CORS configuration in `backend/server.js`
- Verify `REACT_APP_API_URL` in frontend `.env`

## 📝 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

**Hashara Sachintha**
- Portfolio: [Your Portfolio URL]
- GitHub: [@sachintharx](https://github.com/sachintharx)
- LinkedIn: [Your LinkedIn]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using React, Node.js, and Google Gemini AI**
