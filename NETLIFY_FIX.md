# 🔧 Netlify Deployment Fix

## Issues Fixed

### 1. **KavindaDetails.txt Not Found**
**Problem**: Functions couldn't find the data file in Netlify's serverless environment.

**Solution**: 
- ✅ Copied `KavindaDetails.txt` to `chatbot-demo/netlify/functions/` directory
- ✅ Updated functions to load from `__dirname` (same directory)
- ✅ Added `included_files` in `netlify.toml` to bundle the file

### 2. **Function Path Updates**
Updated both functions:
- `chat.js` - Now loads from `path.join(__dirname, 'KavindaDetails.txt')`
- `personal-data.js` - Now loads from `path.join(__dirname, 'KavindaDetails.txt')`

## 🚀 Deploy the Fix

### Step 1: Commit Changes
```powershell
git add .
git commit -m "Fix Netlify functions - include KavindaDetails.txt"
git push origin main
```

### Step 2: Verify Environment Variable
Go to your Netlify site dashboard:
1. **Site settings** → **Environment variables**
2. Make sure `GEMINI_API_KEY` is set
3. If not, add it:
   - Key: `GEMINI_API_KEY`
   - Value: Your actual Gemini API key

### Step 3: Check Function Logs
After deployment:
1. Go to **Netlify Dashboard** → Your site
2. Click **Functions** tab
3. Click on `chat` function
4. View the logs to see any errors

## 🧪 Test Locally First

Before deploying, test with Netlify Dev:

```powershell
cd chatbot-demo
netlify dev
```

This will run functions locally at `http://localhost:8888/.netlify/functions/chat`

Test by opening the chatbot and sending a message.

## 🔍 Debugging Steps

### If still showing errors:

#### Check 1: Function Logs in Netlify
```
Dashboard → Functions → chat → Recent logs
```
Look for:
- "Personal data loaded successfully" ✅
- "GEMINI_API_KEY environment variable is not set" ❌
- Any other error messages

#### Check 2: Test Individual Endpoints
```powershell
# Test health endpoint
curl https://your-site.netlify.app/.netlify/functions/health

# Should return: {"status":"OK","message":"Netlify Functions are running"}
```

#### Check 3: Verify File Structure
```
chatbot-demo/
├── netlify/
│   └── functions/
│       ├── chat.js
│       ├── health.js
│       ├── personal-data.js
│       └── KavindaDetails.txt  ← Must be here!
```

#### Check 4: Environment Variable
In Netlify Dashboard:
- Make sure `GEMINI_API_KEY` is set (not empty)
- After adding/changing it, redeploy the site

## 📋 Common Issues & Solutions

### Issue: "Sorry, I encountered an error"
**Causes:**
1. ❌ GEMINI_API_KEY not set → Add in Netlify dashboard
2. ❌ KavindaDetails.txt not found → Already fixed!
3. ❌ Gemini API rate limit → Wait a few minutes
4. ❌ Invalid API key → Check your key at https://makersuite.google.com/app/apikey

**Solution**: Check function logs for specific error

### Issue: 404 on functions
**Cause**: Functions not deployed properly

**Solution**:
```powershell
netlify deploy --prod --build
```

### Issue: CORS errors in browser console
**Cause**: CORS headers not set

**Solution**: Already fixed in functions with:
```javascript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads at https://your-site.netlify.app
- [ ] Chatbot button appears in bottom-right
- [ ] Click chatbot opens the widget
- [ ] Health check works: `/.netlify/functions/health`
- [ ] Send "hello" message - gets AI response (not error)
- [ ] Send "What projects have you worked on?" - gets detailed response
- [ ] No CORS errors in browser console (F12)
- [ ] Function logs show no errors in Netlify dashboard

## 🎯 Expected Behavior

When working correctly:
1. User opens chatbot → Sees welcome message
2. User types "What projects have you worked on?"
3. AI responds with formatted list of Kavinda's projects
4. No error messages appear

## 📞 Still Having Issues?

1. **Check Browser Console** (F12) - Look for errors
2. **Check Netlify Function Logs** - See what's failing
3. **Test with Netlify Dev** - Run locally to debug
4. **Verify API Key** - Make sure it's valid and has quota

## 🔑 Get a New Gemini API Key

If needed, get a fresh key:
1. Go to: https://makersuite.google.com/app/apikey
2. Create new API key
3. Add to Netlify: Site settings → Environment variables → `GEMINI_API_KEY`
4. Redeploy site

---

**Files Changed:**
- ✅ `chatbot-demo/netlify/functions/chat.js` - Updated path
- ✅ `chatbot-demo/netlify/functions/personal-data.js` - Updated path
- ✅ `chatbot-demo/netlify/functions/KavindaDetails.txt` - Copied here
- ✅ `netlify.toml` - Added included_files config

**Next Step**: Push to GitHub and let Netlify redeploy automatically! 🚀
