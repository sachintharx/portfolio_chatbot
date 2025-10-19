# ⚡ Quick Fix - Add API Key to Netlify

## 🔑 CRITICAL: Add GEMINI_API_KEY

Your code has been pushed and Netlify is rebuilding. But you MUST add the API key:

### Step-by-Step:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com/
   - Select your site (kavinda-portfolio-chatbot or similar)

2. **Navigate to Environment Variables**
   - Click **Site settings** (in top menu)
   - Scroll down and click **Environment variables** (in left sidebar)
   - OR click **Site configuration** → **Environment variables**

3. **Add New Variable**
   - Click **Add a variable** or **Add environment variable**
   - Enter:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: Paste your Gemini API key
       - Get it from: https://makersuite.google.com/app/apikey
       - OR use your existing key
   - Select: **All scopes** (or at least Production)
   - Click **Create variable** or **Save**

4. **Trigger Redeploy**
   - The site should automatically redeploy after adding the variable
   - If not, go to **Deploys** tab → Click **Trigger deploy** → **Deploy site**

## 🧪 Test After Deployment

Once deployed (check the Deploys tab for "Published" status):

1. Open your Netlify site URL
2. Click the chatbot button (bottom-right)
3. Type: "hello"
4. ✅ Should get an AI response (not an error!)

## 🔍 If Still Getting Errors

### Check Function Logs:
1. Go to **Functions** tab in Netlify
2. Click on **chat** function
3. Look at **Recent logs**
4. Should see: "Personal data loaded successfully for Kavinda Rajapaksha"
5. If you see errors, they'll tell you what's wrong

### Common Issues:

#### "GEMINI_API_KEY environment variable is not set"
→ You forgot to add the API key in Step 3 above

#### "Invalid API key"
→ Get a new key from https://makersuite.google.com/app/apikey

#### "Resource exhausted" or "Quota exceeded"
→ API rate limit reached, wait a few minutes or use a new key

## 📸 Screenshots Locations:

**Environment Variables Page:**
```
Netlify Dashboard → Your Site → Site settings → Environment variables
```

Look for a section that shows:
```
GEMINI_API_KEY    ••••••••••••••••••    Production, Deploy previews, Branch deploys
```

## ✅ Success Indicators

When working correctly:
- ✅ Chatbot loads
- ✅ Welcome message appears: "Hi! I'm Kavinda's AI assistant"
- ✅ Can send messages and get responses about Kavinda's projects
- ✅ No "Sorry, I encountered an error" messages
- ✅ Function logs show successful API calls

## 🎯 Your API Key

If you don't have a Gemini API key:

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click **Create API key**
4. Copy the key
5. Add to Netlify as shown above

**Note**: The free tier includes:
- 15 requests per minute
- 1,500 requests per day
- More than enough for a portfolio chatbot!

---

**Current Status:**
- ✅ Code pushed to GitHub
- ✅ Netlify is rebuilding/deploying
- ⏳ WAITING: You need to add GEMINI_API_KEY
- ⏳ Then test the chatbot

**Next Step**: Add the API key in Netlify NOW! 🚀
