# 🚀 Deploy Both Frontend & Backend to Netlify

## Overview
Your chatbot is now configured to deploy **everything** to Netlify using:
- **Frontend**: React app (static files)
- **Backend**: Netlify Serverless Functions (replaces Express server)

## ✅ What Changed

### 1. **Created Netlify Functions** (Backend)
Created 3 serverless functions in `chatbot-demo/netlify/functions/`:
- `health.js` - Health check endpoint
- `personal-data.js` - Serves Kavinda's data
- `chat.js` - Main chat endpoint with Gemini AI

### 2. **Updated Configuration**
- ✅ Modified `netlify.toml` to include functions directory
- ✅ Updated `Chatbot.tsx` to use `/.netlify/functions` for API calls
- ✅ Functions automatically use `KavindaDetails.txt` from backend folder

### 3. **API Endpoint Changes**
```
OLD (Express):                    NEW (Netlify Functions):
http://localhost:3001/api/health  →  /.netlify/functions/health
http://localhost:3001/api/chat    →  /.netlify/functions/chat
http://localhost:3001/api/personal-data  →  /.netlify/functions/personal-data
```

## 📋 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for full Netlify deployment with serverless functions"
git push origin main
```

### Step 2: Deploy to Netlify

#### Option A: Netlify CLI (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy from project root
cd "c:\Users\Asus\Documents\My Documents\University - Computer Engineering\portfolio_chatbot"
netlify init

# Follow prompts:
# - Create & configure new site? Yes
# - Team: Select your team
# - Site name: kavinda-portfolio-chatbot (or your choice)
# - Build command: npm run build
# - Directory: chatbot-demo
# - Functions directory: chatbot-demo/netlify/functions

# Deploy
netlify deploy --prod
```

#### Option B: Netlify Dashboard (Web UI)
1. **Go to**: https://app.netlify.com/
2. **Click**: "Add new site" → "Import an existing project"
3. **Connect**: Your GitHub repository
4. **Configure Build Settings**:
   - Base directory: `chatbot-demo`
   - Build command: `npm run build`
   - Publish directory: `chatbot-demo/build`
   - Functions directory: `chatbot-demo/netlify/functions`
5. **Click**: "Deploy site"

### Step 3: Add Environment Variable
After deployment, add your Gemini API key:

1. Go to **Site settings** → **Environment variables**
2. Add new variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key (replace the one in code)
3. **Save** and **redeploy** (Netlify will auto-redeploy)

### Step 4: Test Your Deployment
Once deployed, Netlify will give you a URL like:
```
https://kavinda-portfolio-chatbot.netlify.app
```

Test these endpoints:
- **Frontend**: `https://your-site.netlify.app`
- **Health Check**: `https://your-site.netlify.app/.netlify/functions/health`
- **Chat API**: `https://your-site.netlify.app/.netlify/functions/chat`

## 🎯 Testing Locally with Netlify Dev

Before deploying, test locally:

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Navigate to chatbot-demo folder
cd chatbot-demo

# Install dependencies
npm install

# Start Netlify Dev (runs both frontend and functions locally)
netlify dev
```

This will:
- ✅ Start React app on `http://localhost:8888`
- ✅ Start functions at `http://localhost:8888/.netlify/functions/*`
- ✅ Simulate production environment

Test the chatbot locally before deploying!

## 📁 Project Structure (Updated)

```
portfolio_chatbot/
├── backend/
│   ├── KavindaDetails.txt       ← Used by Netlify Functions
│   ├── server.js                 ← Not needed for Netlify (kept for reference)
│   └── package.json
├── chatbot-demo/
│   ├── netlify/
│   │   └── functions/            ← NEW: Serverless functions
│   │       ├── chat.js           ← Main chat API
│   │       ├── health.js         ← Health check
│   │       └── personal-data.js  ← Data endpoint
│   ├── src/
│   │   └── components/
│   │       ├── Chatbot.tsx       ← Updated API URLs
│   │       └── Chatbot.css
│   ├── public/
│   ├── package.json
│   └── ...
├── netlify.toml                  ← Updated with functions config
└── README.md
```

## 🔧 Troubleshooting

### Issue: Functions not found (404)
**Solution**: Check that `netlify.toml` has:
```toml
[build]
  functions = "netlify/functions"
```

### Issue: GEMINI_API_KEY not found
**Solution**: 
1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add `GEMINI_API_KEY` with your API key
3. Redeploy site

### Issue: CORS errors
**Solution**: Functions already have CORS headers configured:
```javascript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

### Issue: Personal data not loading
**Solution**: Verify `KavindaDetails.txt` path in functions:
```javascript
const dataPath = path.join(__dirname, '..', '..', '..', 'backend', 'KavindaDetails.txt');
```

## 💰 Pricing (Free Tier)
Netlify Free Tier includes:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ 125K function invocations/month
- ✅ Automatic SSL certificate
- ✅ Continuous deployment from Git

Perfect for your portfolio chatbot! 🎉

## 🎨 Custom Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Add custom domain (e.g., `kavinda.com`)
3. Update DNS records at your domain registrar
4. Netlify provides free SSL automatically

## 📊 Monitoring
After deployment, monitor your site:
- **Functions logs**: Site → Functions → View logs
- **Analytics**: Site → Analytics (track visitors)
- **Deploys**: See deployment history and logs

## ✨ Benefits of Netlify Functions
1. ✅ **Serverless** - No server management
2. ✅ **Auto-scaling** - Handles traffic spikes
3. ✅ **Free tier** - Generous limits
4. ✅ **Fast deployment** - Deploy in seconds
5. ✅ **Single platform** - Frontend + Backend together
6. ✅ **Global CDN** - Fast worldwide

## 🚀 Quick Deploy Command
```bash
# One-command deployment
cd chatbot-demo
netlify deploy --prod --build
```

## 📝 Next Steps After Deployment
1. ✅ Test chatbot functionality
2. ✅ Share your Netlify URL: `https://your-site.netlify.app`
3. ✅ Update README with live link
4. ✅ Optional: Add custom domain
5. ✅ Monitor function usage in Netlify dashboard

## 🎉 You're Done!
Your chatbot is now fully deployed on Netlify with both frontend and backend! The Express server is no longer needed - everything runs as serverless functions.

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com
- Functions Guide: https://docs.netlify.com/functions/overview/
- Support: https://answers.netlify.com
