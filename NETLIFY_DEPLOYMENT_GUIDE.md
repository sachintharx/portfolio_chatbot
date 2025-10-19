# 🚀 Netlify Deployment Guide

Complete guide to deploy your Portfolio AI Chatbot to Netlify.

## 📋 Prerequisites

Before deploying, you need:

1. **GitHub Account** - To push your code
2. **Netlify Account** - Free at [netlify.com](https://netlify.com)
3. **Backend Deployed** - Your API must be live first
4. **Git Installed** - To push code to GitHub

## 🎯 Deployment Strategy

### Architecture:
```
┌─────────────────┐         ┌──────────────────┐
│   Netlify       │  HTTP   │   Backend API    │
│   (Frontend)    │────────▶│   (Railway/      │
│   React App     │         │    Render/Heroku)│
└─────────────────┘         └──────────────────┘
```

### What Goes Where:
- **Netlify**: React frontend (chatbot-demo)
- **Backend Platform**: Node.js API (backend/)

## 📦 Step 1: Prepare Your Project

### 1.1 Create Production Environment File

In `chatbot-demo/` folder, create `.env.production`:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Important**: Replace `your-backend-url.com` with your actual backend URL after deploying the backend (Step 2).

### 1.2 Test Build Locally

```bash
cd chatbot-demo
npm run build
```

This should create a `build/` folder. If successful, you're ready!

### 1.3 Update .gitignore (if needed)

Make sure your `.gitignore` includes:
```
# Don't commit environment files with secrets
.env.local
.env.production

# Don't commit build folder
/build

# Don't commit dependencies
node_modules/
```

## 🔧 Step 2: Deploy Backend First

You **must** deploy your backend before the frontend, because the frontend needs the backend API URL.

### Option A: Deploy to Railway (Recommended)

1. **Sign up** at [railway.app](https://railway.app)

2. **Create New Project** → Deploy from GitHub

3. **Select your repository** and choose `backend` folder

4. **Add Environment Variables**:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

5. **Deploy** - Railway will give you a URL like:
   ```
   https://your-app-name.up.railway.app
   ```

6. **Save this URL** - You'll need it for frontend!

### Option B: Deploy to Render

1. **Sign up** at [render.com](https://render.com)

2. **New Web Service** → Connect GitHub

3. **Configure**:
   - **Name**: kavinda-portfolio-api
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   ```

5. **Deploy** - Render gives you:
   ```
   https://your-app-name.onrender.com
   ```

### Option C: Deploy to Heroku

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

2. **Create Heroku App**:
   ```bash
   cd backend
   heroku login
   heroku create kavinda-portfolio-api
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set GEMINI_API_KEY=your_key_here
   ```

4. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

5. **Your URL**:
   ```
   https://kavinda-portfolio-api.herokuapp.com
   ```

## 🌐 Step 3: Deploy Frontend to Netlify

### Method 1: Deploy via Netlify UI (Easiest)

#### 3.1 Push to GitHub

```bash
# Initialize git if not done
git init
git add .
git commit -m "Ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/portfolio_chatbot.git
git branch -M main
git push -u origin main
```

#### 3.2 Connect to Netlify

1. **Go to** [netlify.com](https://netlify.com)

2. **Sign up / Log in** (use GitHub for easier connection)

3. **Click** "Add new site" → "Import an existing project"

4. **Connect to Git provider** → Choose GitHub

5. **Select repository** → `portfolio_chatbot`

6. **Configure build settings**:
   ```
   Base directory:        chatbot-demo
   Build command:         npm run build
   Publish directory:     chatbot-demo/build
   ```

7. **Add Environment Variables** (CRITICAL!):
   - Click "Show advanced"
   - Add variable:
     ```
     Key:   REACT_APP_API_URL
     Value: https://your-backend-url.com/api
     ```
   **Example**: If Railway gave you `https://portfolio-api.up.railway.app`, use:
   ```
   REACT_APP_API_URL=https://portfolio-api.up.railway.app/api
   ```

8. **Click** "Deploy site"

#### 3.3 Wait for Build

Netlify will:
- Install dependencies
- Run `npm run build`
- Deploy your site
- Give you a URL like: `https://random-name-123.netlify.app`

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build your app
cd chatbot-demo
npm run build

# Deploy
netlify deploy --prod --dir=build
```

When prompted, create a new site and follow instructions.

## ⚙️ Step 4: Configure Your Deployment

### 4.1 Custom Domain (Optional)

1. **In Netlify Dashboard** → Domain settings
2. **Add custom domain** → Enter your domain (e.g., `kavinda-portfolio.com`)
3. **Update DNS** at your domain registrar with Netlify's nameservers
4. **Enable HTTPS** (automatic with Netlify)

### 4.2 Environment Variables

If you need to update your backend URL later:

1. **Netlify Dashboard** → Site settings
2. **Environment variables** → Edit
3. **Update** `REACT_APP_API_URL`
4. **Trigger redeploy**

### 4.3 Custom Site Name

1. **Site settings** → Site details
2. **Change site name** → `kavinda-portfolio` (if available)
3. **Your URL**: `https://kavinda-portfolio.netlify.app`

## ✅ Step 5: Verify Deployment

### 5.1 Check Frontend

Visit your Netlify URL: `https://your-site.netlify.app`

**Expected**:
- ✅ Page loads
- ✅ Purple gradient button in bottom-right
- ✅ Click opens chatbot widget
- ✅ See "AI Assistant" header

### 5.2 Check Backend Connection

1. **Open chatbot**
2. **Type a message**: "Hello"
3. **Wait for response**

**If it works**: ✅ Deployment successful!

**If it fails**: See troubleshooting below.

## 🐛 Troubleshooting

### Error: "Failed to fetch" or "Network error"

**Problem**: Frontend can't reach backend

**Solutions**:
1. Check backend is running (visit backend URL directly)
2. Verify `REACT_APP_API_URL` is correct in Netlify
3. Check CORS is enabled in backend `server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-netlify-site.netlify.app'],
     credentials: true
   }));
   ```
4. Redeploy frontend after fixing

### Error: "API key not found"

**Problem**: Backend missing Gemini API key

**Solution**:
1. Check backend platform (Railway/Render/Heroku)
2. Verify `GEMINI_API_KEY` environment variable is set
3. Restart backend service

### Build Fails on Netlify

**Problem**: Build command fails

**Solutions**:
1. Check build logs in Netlify
2. Verify `package.json` is correct
3. Try building locally first: `npm run build`
4. Check Node version (Netlify uses Node 18 by default)

### Chatbot Opens but Shows Old Messages

**Problem**: Cache issue

**Solution**:
1. Clear browser cache
2. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Environment Variables Not Working

**Problem**: Variables not loaded

**Solution**:
1. Ensure variables start with `REACT_APP_`
2. Rebuild after changing environment variables
3. Check Netlify build logs to verify variables are set

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push

Netlify automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update chatbot styling"
git push origin main

# Netlify automatically detects push and rebuilds!
```

### Deploy Previews

Every pull request gets a preview URL:
- Create branch → Make changes → Open PR
- Netlify creates preview: `https://deploy-preview-123.netlify.app`
- Test before merging!

## 📊 Monitoring

### Netlify Analytics (Optional)

1. **Enable** in Netlify Dashboard
2. **View**:
   - Page views
   - Bandwidth usage
   - Top pages
   - User locations

### Backend Logs

Check your backend platform:
- **Railway**: View logs in dashboard
- **Render**: Real-time logs available
- **Heroku**: `heroku logs --tail`

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files
- ✅ Use environment variables for API URLs
- ✅ Rotate API keys periodically

### 2. CORS Configuration
Update `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-netlify-site.netlify.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### 3. HTTPS
- ✅ Netlify provides free SSL
- ✅ Always use HTTPS for production
- ✅ Backend should use HTTPS too

## 💰 Cost Breakdown

### Free Tier Limits:

**Netlify (Frontend)**:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Free SSL
- 💰 **Cost**: FREE

**Railway (Backend)**:
- ✅ $5 free credit/month
- ✅ ~550 hours of uptime
- 💰 **Cost**: FREE (with credit)

**Render (Backend)**:
- ✅ Free tier available
- ⚠️ Spins down after inactivity
- 💰 **Cost**: FREE

**Total Monthly Cost**: 💰 **$0** (Free tier)

## 📝 Quick Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Backend URL copied
- [ ] `.env.production` created with backend URL
- [ ] Local build successful (`npm run build`)
- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] Environment variables set in Netlify
- [ ] Build successful on Netlify
- [ ] Frontend accessible via Netlify URL
- [ ] Chatbot opens correctly
- [ ] Messages send and receive successfully
- [ ] CORS configured for production URLs
- [ ] Custom domain configured (optional)

## 🎉 Success!

Once deployed, you'll have:
- ✅ Live frontend: `https://your-site.netlify.app`
- ✅ Live backend: `https://your-api.railway.app`
- ✅ Fully functional AI chatbot
- ✅ Automatic deployments on git push
- ✅ Free hosting on both platforms
- ✅ Portfolio-ready project!

## 🔗 Useful Links

- **Netlify Dashboard**: https://app.netlify.com
- **Railway Dashboard**: https://railway.app/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **GitHub**: https://github.com
- **Google Gemini API**: https://makersuite.google.com/app/apikey

## 📞 Need Help?

If you encounter issues:
1. Check Netlify build logs
2. Check backend logs
3. Verify environment variables
4. Test API directly (Postman/browser)
5. Check CORS settings

---

**Created**: October 19, 2025  
**Project**: Kavinda Rajapaksha Portfolio Chatbot  
**Status**: Ready for Deployment 🚀
