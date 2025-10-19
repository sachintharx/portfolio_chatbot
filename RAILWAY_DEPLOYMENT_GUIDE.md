# 🚂 Backend Deployment Guide (Railway)

Quick guide to deploy your Node.js backend to Railway.

## 🎯 Why Railway?

- ✅ Free $5 credit/month
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Environment variables support
- ✅ Logs and monitoring
- ✅ No credit card required for free tier

## 📋 Prerequisites

- GitHub account with your code pushed
- Railway account (sign up at railway.app)
- Gemini API key

## 🚀 Deployment Steps

### Step 1: Sign Up for Railway

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign in with GitHub (recommended)
4. Authorize Railway to access your repositories

### Step 2: Create New Project

1. Click "**+ New Project**"
2. Select "**Deploy from GitHub repo**"
3. Choose your repository: `portfolio_chatbot`
4. Railway will detect it's a Node.js project

### Step 3: Configure Service

1. **Root Directory**: Set to `backend`
   - Click on service → Settings
   - Find "Root Directory"
   - Enter: `backend`

2. **Start Command**: (Auto-detected as `npm start`)
   - Should automatically use: `npm start`
   - If not, set it manually in Settings

3. **Build Command**: (Auto-detected as `npm install`)
   - Should automatically use: `npm install`

### Step 4: Add Environment Variables

1. Click on your service
2. Go to "**Variables**" tab
3. Click "**+ New Variable**"
4. Add the following:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
NODE_ENV=production
```

**Important**: Replace `your_actual_gemini_api_key_here` with your real Gemini API key from Google AI Studio.

Optional (for CORS):
```
FRONTEND_URL=https://your-netlify-site.netlify.app
```

### Step 5: Deploy

1. Click "**Deploy**" (or it may auto-deploy)
2. Wait for build to complete (usually 1-2 minutes)
3. Check logs for any errors
4. Look for: "Server is running on http://localhost:3001"

### Step 6: Get Your Public URL

1. Go to "**Settings**" tab
2. Find "**Networking**" section
3. Click "**Generate Domain**"
4. Copy your public URL (e.g., `https://portfolio-chatbot-production.up.railway.app`)

### Step 7: Test Your API

Open these URLs in your browser:

1. **Health Check**:
   ```
   https://your-app.up.railway.app/api/health
   ```
   Should return:
   ```json
   {"status":"OK","message":"Server is running"}
   ```

2. **Personal Data**:
   ```
   https://your-app.up.railway.app/api/personal-data
   ```
   Should return Kavinda's data

### Step 8: Update Frontend

Now update your frontend's `.env.production`:

```env
REACT_APP_API_URL=https://your-app.up.railway.app/api
```

Then redeploy on Netlify!

## ⚙️ Configuration Tips

### Enable Automatic Deployments

Railway automatically deploys when you push to GitHub:
- Any push to `main` branch triggers deployment
- Check logs in Railway dashboard
- Enable/disable in Settings → Service

### View Logs

1. Click on your service
2. Go to "**Deployments**" tab
3. Click on latest deployment
4. View real-time logs

### Monitor Usage

1. Go to "**Usage**" tab
2. Check:
   - CPU usage
   - Memory usage
   - Network bandwidth
   - Execution time

### Custom Domain (Optional)

1. Go to "**Settings**"
2. Find "**Networking**"
3. Add custom domain
4. Update DNS records at your domain provider

## 🐛 Troubleshooting

### Build Fails

**Check**:
- Is `backend/package.json` correct?
- Are all dependencies listed?
- Check build logs for errors

**Solution**:
```bash
# Test locally first
cd backend
npm install
npm start
```

### Server Won't Start

**Check**:
- Environment variables are set
- `PORT` variable is set
- Check deployment logs

**Solution**:
- Verify `GEMINI_API_KEY` is correct
- Check `KavindaDetails.txt` exists in backend folder

### CORS Errors

**Problem**: Frontend can't access API

**Solution**:
Add `FRONTEND_URL` environment variable:
```
FRONTEND_URL=https://your-netlify-site.netlify.app
```

Then update `server.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};
app.use(cors(corsOptions));
```

### 500 Internal Server Error

**Check**:
- Gemini API key is valid
- `KavindaDetails.txt` file exists
- Check logs for specific error

## 💰 Free Tier Limits

Railway Free Tier:
- ✅ $5 credit/month (~550 hours)
- ✅ 500 MB memory
- ✅ 1 GB disk
- ✅ Shared CPU
- ✅ 100 GB bandwidth

This is enough for:
- Personal portfolios
- Demo projects
- Low-traffic applications

## 🔄 Updates & Redeployment

### Auto-Deploy on Git Push

```bash
# Make changes to backend
cd backend
# Edit files...

# Commit and push
git add .
git commit -m "Update backend API"
git push origin main

# Railway automatically redeploys!
```

### Manual Redeploy

1. Go to Railway dashboard
2. Click on service
3. Click "**Deployments**"
4. Click "**Redeploy**"

## 📊 Alternative Platforms

If you prefer other platforms:

### Render.com
- Free tier with auto-sleep
- Good for demos
- Similar to Railway

### Heroku
- More expensive
- Requires credit card
- Well-established

### DigitalOcean App Platform
- $5/month minimum
- More features
- Good for production

### Vercel (for API routes)
- Serverless functions
- Free tier
- Good for small APIs

## ✅ Deployment Checklist

- [ ] Railway account created
- [ ] GitHub repo connected
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] `GEMINI_API_KEY` set
- [ ] Deployment successful
- [ ] Health check endpoint works
- [ ] Public URL copied
- [ ] Frontend `.env.production` updated
- [ ] CORS configured for Netlify domain
- [ ] Both frontend and backend deployed
- [ ] End-to-end test successful

## 🎉 Success!

Your backend is now live at:
```
https://your-app.up.railway.app
```

Next steps:
1. ✅ Update frontend with this URL
2. ✅ Deploy frontend to Netlify
3. ✅ Test the complete application
4. ✅ Share your portfolio!

---

**Platform**: Railway  
**Project**: Kavinda Portfolio API  
**Status**: Ready for Production 🚀
