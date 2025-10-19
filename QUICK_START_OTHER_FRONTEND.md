# 🎯 Quick Start: Use Backend in Another Frontend

## Step 1: Get Your Backend URL

After deploying to Netlify, your backend API is at:
```
https://YOUR-SITE-NAME.netlify.app/.netlify/functions
```

Replace `YOUR-SITE-NAME` with your actual Netlify site name.

---

## Step 2: Copy & Paste this Code

### For React App:

**Create file: `src/api/kavinda-ai.js`**

```javascript
// Replace with your actual Netlify site URL
const API_BASE_URL = 'https://YOUR-SITE-NAME.netlify.app/.netlify/functions';

export async function askKavindaAI(question) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: question,
        conversationHistory: []
      })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.message;
    } else {
      throw new Error(data.error || 'Failed to get response');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getKavindaInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/personal-data`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

**Use in component:**

```javascript
import React, { useState } from 'react';
import { askKavindaAI } from './api/kavinda-ai';

function ChatWithKavinda() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await askKavindaAI(question);
      setAnswer(response);
    } catch (error) {
      setAnswer('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Ask Kavinda's AI Assistant</h2>
      
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
        placeholder="Ask anything about Kavinda..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      
      <button 
        onClick={handleAsk} 
        disabled={loading}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Ask'}
      </button>
      
      {answer && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f5f5f5',
          borderRadius: '8px',
          whiteSpace: 'pre-wrap'
        }}>
          <strong>Answer:</strong>
          <p dangerouslySetInnerHTML={{ 
            __html: answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
        </div>
      )}
    </div>
  );
}

export default ChatWithKavinda;
```

---

### For Plain HTML:

See the `example-standalone-page.html` file in this directory!

**To use it:**
1. Open `example-standalone-page.html`
2. Find line 219: `const API_BASE_URL = 'https://your-site.netlify.app/.netlify/functions';`
3. Replace `your-site.netlify.app` with your actual Netlify site URL
4. Save and open the HTML file in your browser
5. Done! The chatbot works!

---

### For Vue.js:

```javascript
// composables/useKavindaAI.js
import { ref } from 'vue';

export function useKavindaAI() {
  const API_BASE_URL = 'https://YOUR-SITE-NAME.netlify.app/.netlify/functions';
  const answer = ref('');
  const loading = ref(false);

  async function ask(question) {
    loading.value = true;
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
      });

      const data = await response.json();
      answer.value = data.success ? data.message : 'Error: ' + data.error;
    } catch (error) {
      answer.value = 'Error: ' + error.message;
    } finally {
      loading.value = false;
    }
  }

  return { answer, loading, ask };
}
```

**Use in component:**
```vue
<template>
  <div>
    <input v-model="question" @keyup.enter="sendQuestion">
    <button @click="sendQuestion" :disabled="loading">Ask</button>
    <p v-if="answer">{{ answer }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useKavindaAI } from './composables/useKavindaAI';

const question = ref('');
const { answer, loading, ask } = useKavindaAI();

const sendQuestion = () => {
  if (question.value.trim()) {
    ask(question.value);
  }
};
</script>
```

---

## Step 3: Test It!

### Quick Test with Browser Console:

1. Open ANY website (even google.com)
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Paste this code (replace YOUR-SITE-NAME):

```javascript
fetch('https://YOUR-SITE-NAME.netlify.app/.netlify/functions/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'What projects have you worked on?' })
})
.then(r => r.json())
.then(data => console.log(data.message));
```

5. Press Enter
6. You should see Kavinda's projects in the console! ✅

---

## Step 4: Available Endpoints

### 1. Chat with AI
```javascript
POST https://YOUR-SITE.netlify.app/.netlify/functions/chat

Body:
{
  "message": "What are your skills?"
}

Response:
{
  "success": true,
  "message": "AI response here..."
}
```

### 2. Get Portfolio Data
```javascript
GET https://YOUR-SITE.netlify.app/.netlify/functions/personal-data

Response:
{
  "data": "Full portfolio text..."
}
```

### 3. Health Check
```javascript
GET https://YOUR-SITE.netlify.app/.netlify/functions/health

Response:
{
  "status": "OK",
  "message": "Netlify Functions are running"
}
```

---

## 🎯 Common Questions

### Q: Can I use this in a WordPress site?
**A:** Yes! Add this to your theme's footer:

```html
<script>
async function askKavinda(question) {
  const res = await fetch('https://YOUR-SITE.netlify.app/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: question })
  });
  const data = await res.json();
  return data.message;
}
</script>
```

### Q: Can I use this in a mobile app?
**A:** Yes! Works with React Native, Flutter, etc. Just make HTTP requests to the API.

### Q: Is there a rate limit?
**A:** Netlify free tier: 125,000 requests/month. More than enough for most apps!

### Q: Do I need CORS headers?
**A:** No! Already configured in the functions with `Access-Control-Allow-Origin: *`

### Q: Can I use it from localhost?
**A:** Yes! Works from anywhere, including local development.

---

## 🚀 Next Steps

1. ✅ Deploy your project to Netlify
2. ✅ Get your site URL (e.g., `https://kavinda-portfolio.netlify.app`)
3. ✅ Copy the code examples above
4. ✅ Replace `YOUR-SITE-NAME` with your actual site name
5. ✅ Start using the API in ANY frontend!

---

## 📝 Example Projects You Can Build

1. **Simple Landing Page** - Use `example-standalone-page.html`
2. **Mobile App** - React Native app with Kavinda AI
3. **Chrome Extension** - Browser extension with AI assistant
4. **Discord Bot** - Bot that answers questions about Kavinda
5. **WordPress Widget** - Add chatbot to WordPress site
6. **Desktop App** - Electron app with AI assistant
7. **Multiple Websites** - Different sites using same backend

**The possibilities are endless!** Your backend is a standalone API now! 🎉
