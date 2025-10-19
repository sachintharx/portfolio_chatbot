# ✅ Deployment Checklist

Use this checklist to deploy your chatbot step by step.

## 📦 Pre-Deployment

### Code Preparation
- [ ] All code tested locally
- [ ] Backend runs on `http://localhost:3001`
- [ ] Frontend runs on `http://localhost:3000`
- [ ] Chatbot sends and receives messages successfully
- [ ] No console errors

### Required Accounts
- [ ] GitHub account created
- [ ] Netlify account created (free)
- [ ] Railway account created (free)
- [ ] Google Gemini API key obtained

### Files Ready
- [ ] `netlify.toml` exists in project root
- [ ] `backend/KavindaDetails.txt` exists
- [ ] `backend/package.json` has correct dependencies
- [ ] `chatbot-demo/package.json` has correct dependencies

---

## 🔧 Backend Deployment (Railway)

### Step 1: Push to GitHub
- [ ] Git repository initialized: `git init`
- [ ] All files added: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit"`
- [ ] GitHub repository created
- [ ] Remote added: `git remote add origin <url>`
- [ ] Code pushed: `git push -u origin main`

### Step 2: Railway Setup
- [ ] Logged into Railway with GitHub
- [ ] New project created
- [ ] Repository connected to Railway
- [ ] Root directory set to: `backend`
- [ ] Build command detected: `npm install`
- [ ] Start command detected: `npm start`

### Step 3: Environment Variables
- [ ] `GEMINI_API_KEY` added (your actual key)
- [ ] `PORT` set to: `3001`
- [ ] `NODE_ENV` set to: `production` (optional)
- [ ] Variables saved

### Step 4: Deploy Backend
- [ ] Deployment triggered
- [ ] Build completed successfully (green checkmark)
- [ ] Logs show: "Server is running"
- [ ] Logs show: "Personal data loaded successfully for Kavinda Rajapaksha"

### Step 5: Get Backend URL
- [ ] Domain generated in Railway
- [ ] URL copied: `https://__________.up.railway.app`
- [ ] Health check works: `<URL>/api/health`
- [ ] Returns: `{"status":"OK","message":"Server is running"}`

**✅ Backend URL**: `https://_____________________________.up.railway.app`

---

## 🌐 Frontend Deployment (Netlify)

### Step 6: Create Production Environment
- [ ] Create file: `chatbot-demo/.env.production`
- [ ] Add line: `REACT_APP_API_URL=<your-railway-url>/api`
- [ ] ⚠️ **Important**: URL must end with `/api`
- [ ] Save file

### Step 7: Test Local Build
- [ ] Run: `cd chatbot-demo`
- [ ] Run: `npm run build`
- [ ] Build succeeds without errors
- [ ] `build/` folder created

### Step 8: Netlify Setup
- [ ] Logged into Netlify
- [ ] "Add new site" clicked
- [ ] "Import from Git" selected
- [ ] GitHub connected
- [ ] Repository selected: `portfolio_chatbot`

### Step 9: Build Settings
- [ ] Base directory: `chatbot-demo`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `chatbot-demo/build`
- [ ] Settings saved

### Step 10: Environment Variables
- [ ] "Show advanced" clicked
- [ ] Variable added:
  - Key: `REACT_APP_API_URL`
  - Value: `<your-railway-url>/api`
- [ ] ⚠️ **Verified**: URL ends with `/api`

### Step 11: Deploy Frontend
- [ ] "Deploy site" clicked
- [ ] Build started
- [ ] Build completed (green)
- [ ] Site URL generated: `https://__________.netlify.app`

**✅ Frontend URL**: `https://_____________________________.netlify.app`

---

## 🧪 Testing

### Backend Tests
- [ ] Health endpoint: `<backend-url>/api/health`
  - [ ] Returns: `{"status":"OK",...}`
- [ ] Personal data: `<backend-url>/api/personal-data`
  - [ ] Returns Kavinda's data
- [ ] No errors in Railway logs

### Frontend Tests
- [ ] Open frontend URL in browser
- [ ] Page loads successfully
- [ ] No console errors (F12)
- [ ] Purple gradient button appears (bottom-right)

### Chatbot Tests
- [ ] Click chatbot button
- [ ] Widget opens with purple header
- [ ] See "AI Assistant" title
- [ ] See "Ask me about Kavinda" subtitle
- [ ] Type message: "Hello"
- [ ] Press send
- [ ] AI responds successfully
- [ ] Try: "Tell me about your skills"
- [ ] Response includes Kavinda's skills
- [ ] Try: "What projects have you worked on?"
- [ ] Response includes project details
- [ ] Quick action buttons work

### CORS Test
- [ ] No CORS errors in browser console
- [ ] Messages send and receive properly
- [ ] No "Failed to fetch" errors

---

## 🔐 Security

### Environment Variables
- [ ] `.env` files NOT committed to GitHub
- [ ] `.gitignore` includes `.env*`
- [ ] API keys stored in platform dashboards
- [ ] No secrets in code

### CORS Configuration
- [ ] Backend allows Netlify domain
- [ ] `FRONTEND_URL` set in Railway (optional)
- [ ] CORS errors resolved

### HTTPS
- [ ] Netlify provides SSL (automatic)
- [ ] Railway provides SSL (automatic)
- [ ] Both URLs use `https://`

---

## 🎯 Optional Enhancements

### Custom Domains
- [ ] Custom domain purchased (optional)
- [ ] Domain added to Netlify
- [ ] DNS records configured
- [ ] SSL certificate issued
- [ ] Custom domain works

### Site Name
- [ ] Netlify site renamed
- [ ] Better URL: `https://kavinda-portfolio.netlify.app`

### Monitoring
- [ ] Netlify Analytics enabled (optional)
- [ ] Railway logs bookmarked
- [ ] Error tracking set up (optional)

---

## 📊 Post-Deployment

### Documentation
- [ ] README.md updated with live URLs
- [ ] Deployment date noted
- [ ] Screenshots taken

### Sharing
- [ ] URL added to portfolio
- [ ] Shared on LinkedIn
- [ ] Added to resume
- [ ] Shared with friends

### Maintenance
- [ ] Set calendar reminder to check monthly
- [ ] Monitor Railway credit usage
- [ ] Monitor Netlify bandwidth

---

## 🐛 Troubleshooting

### If Build Fails
- [ ] Check Netlify build logs
- [ ] Verify base directory: `chatbot-demo`
- [ ] Test local build: `npm run build`
- [ ] Check Node version compatibility

### If CORS Errors
- [ ] Verify backend URL in Netlify env vars
- [ ] Check URL ends with `/api`
- [ ] Add `FRONTEND_URL` to Railway
- [ ] Redeploy both services

### If 500 Errors
- [ ] Check Railway logs
- [ ] Verify Gemini API key
- [ ] Check `KavindaDetails.txt` exists
- [ ] Restart Railway service

### If Messages Don't Send
- [ ] Open browser DevTools (F12)
- [ ] Check Network tab for failed requests
- [ ] Verify `REACT_APP_API_URL` is correct
- [ ] Test backend URL directly in browser

---

## ✅ Final Verification

### Complete System Check
- [ ] Frontend loads: `https://your-site.netlify.app`
- [ ] Backend responds: `https://your-api.up.railway.app/api/health`
- [ ] Chatbot opens and closes
- [ ] Messages send successfully
- [ ] AI responds correctly
- [ ] Quick actions work
- [ ] No errors in console
- [ ] Both platforms show "Active" status

### Success Criteria
- [ ] ✅ Frontend deployed and accessible
- [ ] ✅ Backend deployed and accessible
- [ ] ✅ End-to-end communication working
- [ ] ✅ No errors or warnings
- [ ] ✅ Professional and portfolio-ready

---

## 🎉 Congratulations!

If all checkboxes are marked, your deployment is **COMPLETE!** 🎊

**Your Live URLs:**
- **Frontend**: _________________________________
- **Backend**: _________________________________
- **Deployed**: _________________________________
- **Status**: 🟢 Live and Running

---

**Time Invested**: ~15 minutes  
**Cost**: $0 (Free tier)  
**Achievement Unlocked**: Deployed Full-Stack AI Application! 🏆

Share your success! 🚀
