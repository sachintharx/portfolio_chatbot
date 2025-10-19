# 📚 Examples: Use Kavinda's Backend in Other Frontends

This folder contains **ready-to-use examples** showing how to use your Netlify Functions backend in different frontend frameworks.

---

## 🎯 Available Examples

### 1. **React Component** (`KavindaAIChatbot.jsx`)
- ✅ Complete React component with full UI
- ✅ Copy-paste ready
- ✅ Includes styling and API calls
- ✅ Perfect for React apps

**Usage:**
```jsx
import KavindaAIChatbot from './examples/KavindaAIChatbot';

function App() {
  return <KavindaAIChatbot />;
}
```

---

### 2. **Standalone HTML** (`standalone-html-example.html`)
- ✅ Pure HTML/CSS/JavaScript
- ✅ No framework needed
- ✅ Beautiful gradient UI
- ✅ Just open in browser!

**Usage:**
1. Open `standalone-html-example.html`
2. Update `API_BASE_URL` (line 219)
3. Save and open in browser
4. Done!

---

## 🔧 Setup Instructions

### For ALL Examples:

**Step 1:** Deploy your main project to Netlify first
```bash
cd chatbot-demo
netlify deploy --prod
```

**Step 2:** Get your Netlify site URL
```
Example: https://kavinda-portfolio.netlify.app
```

**Step 3:** Update API URL in examples

**For React (KavindaAIChatbot.jsx):**
```javascript
// Line 10
const API_BASE_URL = 'https://YOUR-SITE-NAME.netlify.app/.netlify/functions';
```

**For HTML (standalone-html-example.html):**
```javascript
// Line 219
const API_BASE_URL = 'https://YOUR-SITE-NAME.netlify.app/.netlify/functions';
```

**Step 4:** Use the example in your project!

---

## 📡 API Endpoints Used

All examples use these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Check if API is online |
| `/personal-data` | GET | Get Kavinda's portfolio data |
| `/chat` | POST | Chat with AI assistant |

**Base URL:** `https://YOUR-SITE.netlify.app/.netlify/functions`

---

## 🧪 Quick Test

Test if your backend is working:

### Browser Console Test:
1. Open ANY website
2. Press F12 → Console
3. Paste this (replace YOUR-SITE-NAME):

```javascript
fetch('https://YOUR-SITE-NAME.netlify.app/.netlify/functions/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
})
.then(r => r.json())
.then(data => console.log(data));
```

4. If you see `{success: true, message: "..."}` → It works! ✅

---

## 📂 Example Folder Structure

```
examples/
├── README.md                          ← This file
├── KavindaAIChatbot.jsx              ← React component
├── standalone-html-example.html       ← HTML page
└── (future: Vue, Angular, etc.)
```

---

## 🎨 Customization

### Change Colors (React):
Edit the `styles` object in `KavindaAIChatbot.jsx`:
```javascript
const styles = {
  container: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Change this
  },
  // ...
};
```

### Change Colors (HTML):
Edit the `<style>` section in `standalone-html-example.html`:
```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Change this */
}
```

### Add More Quick Questions:
Just add more buttons in the quick questions section!

---

## 🚀 What You Can Build

Using these examples as templates, you can create:

1. **Multiple Portfolio Versions**
   - Professional version
   - Creative version
   - Minimal version
   - All using the same backend!

2. **Landing Pages**
   - Simple one-page sites with AI chatbot
   - No need to rebuild the backend

3. **Admin Dashboards**
   - Monitor chat usage
   - View analytics
   - All connected to same API

4. **Mobile Apps**
   - React Native apps
   - Same API calls, different UI

5. **WordPress Integration**
   - Add chatbot to WordPress
   - Use the HTML example code

---

## 💡 Tips & Tricks

### Tip 1: Local Testing
Use Netlify Dev to test locally:
```bash
cd chatbot-demo
netlify dev
```
Then use: `http://localhost:8888/.netlify/functions` as API_BASE_URL

### Tip 2: Environment Variables
Store API URL in env variables:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://fallback-url';
```

### Tip 3: Error Handling
Always wrap API calls in try-catch:
```javascript
try {
  const response = await fetch(...);
  const data = await response.json();
  if (data.success) {
    // Handle success
  } else {
    // Handle API error
  }
} catch (error) {
  // Handle network error
}
```

### Tip 4: Loading States
Always show loading indicators:
```javascript
const [loading, setLoading] = useState(false);

const sendMessage = async () => {
  setLoading(true);
  try {
    // API call
  } finally {
    setLoading(false);
  }
};
```

---

## 🔒 Security Notes

1. **API Key Protection** ✅
   - GEMINI_API_KEY is server-side only
   - Never exposed to frontend
   - Safe in Netlify environment variables

2. **CORS** ✅
   - Already configured in functions
   - Allows requests from any origin
   - Can be restricted if needed

3. **Rate Limiting** ⚠️
   - Netlify: 125k requests/month (free)
   - Monitor usage in dashboard
   - Implement rate limiting if needed

---

## ❓ Troubleshooting

### Issue: "Failed to fetch"
**Solution:**
1. Check API_BASE_URL is correct
2. Ensure Netlify site is deployed
3. Check browser console for errors
4. Test endpoint with curl/Postman

### Issue: "GEMINI_API_KEY not set"
**Solution:**
1. Go to Netlify Dashboard
2. Site settings → Environment variables
3. Add GEMINI_API_KEY
4. Redeploy site

### Issue: "CORS error"
**Solution:**
- CORS is already enabled in functions
- If still seeing errors, check if using HTTPS
- HTTP → HTTPS might cause issues

### Issue: API returns empty response
**Solution:**
1. Check function logs in Netlify dashboard
2. Verify KavindaDetails.txt is in functions folder
3. Ensure API key is valid

---

## 📚 Additional Resources

- **Main Documentation:** See `USE_BACKEND_ANYWHERE.md` in root folder
- **Quick Start:** See `QUICK_START_OTHER_FRONTEND.md` in root folder
- **Netlify Docs:** https://docs.netlify.com/functions/overview/

---

## ✅ Checklist for Using Examples

Before using any example, ensure:

- [ ] Main project deployed to Netlify
- [ ] Got your Netlify site URL
- [ ] Updated API_BASE_URL in example code
- [ ] GEMINI_API_KEY set in Netlify dashboard
- [ ] Tested API with browser console or Postman
- [ ] Example works in your project!

---

## 🎉 You're Ready!

These examples make it **super easy** to use your backend in any frontend project. Just:

1. Copy the example
2. Update the API URL
3. Start building!

Your backend is now a **reusable API** that can power unlimited frontends! 🚀

---

**Questions?** Check the main documentation or test the API endpoints directly!
