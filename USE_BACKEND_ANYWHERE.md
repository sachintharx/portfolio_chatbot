# 🔌 Using Your Netlify Backend with Other Frontends

## Overview

Your Netlify Functions backend is now a **standalone API** that can be used by:
- ✅ Any React app
- ✅ Any Vue.js app
- ✅ Any Angular app
- ✅ Plain HTML/JavaScript websites
- ✅ Mobile apps (React Native, Flutter)
- ✅ Desktop apps (Electron)
- ✅ Other backend services

---

## 🌐 Your Backend API Endpoints

Once deployed on Netlify, your backend is available at:

```
Base URL: https://your-site.netlify.app/.netlify/functions

Available Endpoints:
├── GET  /health           → Health check
├── GET  /personal-data    → Get Kavinda's portfolio data
└── POST /chat             → Chat with AI assistant
```

### Full URLs:
```
https://your-site.netlify.app/.netlify/functions/health
https://your-site.netlify.app/.netlify/functions/personal-data
https://your-site.netlify.app/.netlify/functions/chat
```

---

## 🚀 Method 1: Use from ANY Frontend (Recommended)

### Step 1: Get Your Backend URL

After deploying to Netlify, note your site URL:
```
Example: https://kavinda-portfolio.netlify.app
```

Your API base URL will be:
```
https://kavinda-portfolio.netlify.app/.netlify/functions
```

### Step 2: Call from Another Frontend

**Example: New React App**

Create a new React app:
```bash
npx create-react-app my-new-app
cd my-new-app
```

Create a file: `src/api/chatbot.js`

```javascript
// API Configuration
const API_BASE_URL = 'https://kavinda-portfolio.netlify.app/.netlify/functions';

// Chat with AI
export async function sendMessage(message, conversationHistory = []) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        conversationHistory: conversationHistory,
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      return data.message;
    } else {
      throw new Error(data.error || 'Failed to get response');
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
}

// Get portfolio data
export async function getPortfolioData() {
  try {
    const response = await fetch(`${API_BASE_URL}/personal-data`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Portfolio Data API Error:', error);
    throw error;
  }
}

// Health check
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health Check API Error:', error);
    throw error;
  }
}
```

**Use it in a component:**

```javascript
import React, { useState } from 'react';
import { sendMessage, getPortfolioData } from './api/chatbot';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    setLoading(true);
    try {
      const answer = await sendMessage('What projects have you worked on?');
      setResponse(answer);
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetData = async () => {
    setLoading(true);
    try {
      const data = await getPortfolioData();
      console.log('Portfolio Data:', data);
      setResponse(data);
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Using Kavinda's AI Backend</h1>
      
      <button onClick={handleAskQuestion} disabled={loading}>
        Ask About Projects
      </button>
      
      <button onClick={handleGetData} disabled={loading}>
        Get Portfolio Data
      </button>
      
      {loading && <p>Loading...</p>}
      {response && <pre>{response}</pre>}
    </div>
  );
}

export default App;
```

---

## 🌍 Method 2: Use with Plain HTML/JavaScript

**Example: Simple HTML page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Kavinda's AI Assistant</title>
</head>
<body>
    <h1>Chat with Kavinda's AI</h1>
    
    <input type="text" id="messageInput" placeholder="Ask a question...">
    <button onclick="sendMessage()">Send</button>
    
    <div id="response"></div>

    <script>
        const API_BASE_URL = 'https://kavinda-portfolio.netlify.app/.netlify/functions';

        async function sendMessage() {
            const message = document.getElementById('messageInput').value;
            const responseDiv = document.getElementById('response');
            
            responseDiv.innerHTML = 'Loading...';

            try {
                const response = await fetch(`${API_BASE_URL}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });

                const data = await response.json();
                
                if (data.success) {
                    responseDiv.innerHTML = `<strong>AI:</strong> ${data.message}`;
                } else {
                    responseDiv.innerHTML = `<strong>Error:</strong> ${data.error}`;
                }
            } catch (error) {
                responseDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
            }
        }
    </script>
</body>
</html>
```

---

## 📱 Method 3: Use with Mobile App (React Native)

**Example: React Native**

```javascript
// api/chatbot.js
const API_BASE_URL = 'https://kavinda-portfolio.netlify.app/.netlify/functions';

export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// App.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { sendMessage } from './api/chatbot';

export default function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const result = await sendMessage(message);
    if (result.success) {
      setResponse(result.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Ask Kavinda's AI..."
      />
      <Button title="Send" onPress={handleSend} />
      <Text>{response}</Text>
    </View>
  );
}
```

---

## 🔧 Method 4: Use with Vue.js

**Example: Vue 3**

```javascript
// composables/useChatbot.js
import { ref } from 'vue';

export function useChatbot() {
  const API_BASE_URL = 'https://kavinda-portfolio.netlify.app/.netlify/functions';
  const response = ref('');
  const loading = ref(false);

  async function sendMessage(message) {
    loading.value = true;
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      
      if (data.success) {
        response.value = data.message;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      response.value = 'Error: ' + error.message;
    } finally {
      loading.value = false;
    }
  }

  return { response, loading, sendMessage };
}

// Component.vue
<template>
  <div>
    <input v-model="message" placeholder="Ask a question...">
    <button @click="send" :disabled="loading">Send</button>
    <p v-if="loading">Loading...</p>
    <p v-else>{{ response }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatbot } from './composables/useChatbot';

const message = ref('');
const { response, loading, sendMessage } = useChatbot();

const send = () => {
  sendMessage(message.value);
};
</script>
```

---

## 🎨 Method 5: Use with Angular

**Example: Angular Service**

```typescript
// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiBaseUrl = 'https://kavinda-portfolio.netlify.app/.netlify/functions';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/chat`, { message });
  }

  getPortfolioData(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/personal-data`);
  }

  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/health`);
  }
}

// app.component.ts
import { Component } from '@angular/core';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <input [(ngModel)]="message" placeholder="Ask a question...">
      <button (click)="send()">Send</button>
      <p>{{ response }}</p>
    </div>
  `
})
export class AppComponent {
  message = '';
  response = '';

  constructor(private chatbot: ChatbotService) {}

  send() {
    this.chatbot.sendMessage(this.message).subscribe(
      data => {
        if (data.success) {
          this.response = data.message;
        }
      },
      error => {
        this.response = 'Error: ' + error.message;
      }
    );
  }
}
```

---

## 📡 API Documentation

### Endpoint 1: Health Check

**Request:**
```http
GET https://your-site.netlify.app/.netlify/functions/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Netlify Functions are running",
  "timestamp": "2025-10-19T12:00:00.000Z"
}
```

---

### Endpoint 2: Get Portfolio Data

**Request:**
```http
GET https://your-site.netlify.app/.netlify/functions/personal-data
```

**Response:**
```json
{
  "data": "Hi, I'm Kavinda Rajapaksha\nI'm a final year Computer Engineering undergraduate at University of Ruhuna..."
}
```

---

### Endpoint 3: Chat with AI

**Request:**
```http
POST https://your-site.netlify.app/.netlify/functions/chat
Content-Type: application/json

{
  "message": "What projects have you worked on?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "success": true,
  "message": "**AWS End-to-End Data Warehousing Project**\nBuilt a medallion-architecture..."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "An error occurred while processing your request",
  "message": "Sorry, I encountered an error. Please try again."
}
```

---

## 🔒 CORS Configuration

Your Netlify Functions already have CORS enabled:

```javascript
// In all functions
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}
```

This means **any website** can call your API! 

### To Restrict Access (Optional):

If you want to restrict to specific domains:

```javascript
// In netlify/functions/chat.js
const allowedOrigins = [
  'https://my-app.com',
  'https://another-app.com',
  'http://localhost:3000', // for development
];

const origin = event.headers.origin;
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
```

---

## 🧪 Testing Your API

### Using cURL (Command Line):

```bash
# Health Check
curl https://your-site.netlify.app/.netlify/functions/health

# Get Portfolio Data
curl https://your-site.netlify.app/.netlify/functions/personal-data

# Chat
curl -X POST https://your-site.netlify.app/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects have you worked on?"}'
```

### Using Postman:

1. Open Postman
2. Create new request
3. Set method to **POST**
4. URL: `https://your-site.netlify.app/.netlify/functions/chat`
5. Headers: `Content-Type: application/json`
6. Body (raw JSON):
```json
{
  "message": "Tell me about your experience"
}
```
7. Click Send

### Using JavaScript Console (Browser):

Open any website, press F12, go to Console, paste:

```javascript
fetch('https://kavinda-portfolio.netlify.app/.netlify/functions/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
})
.then(r => r.json())
.then(data => console.log(data));
```

---

## 📦 NPM Package (Advanced)

You can even create an NPM package for your API:

**Create: `kavinda-ai-sdk/index.js`**

```javascript
class KavindaAI {
  constructor(baseUrl = 'https://kavinda-portfolio.netlify.app/.netlify/functions') {
    this.baseUrl = baseUrl;
  }

  async chat(message, history = []) {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationHistory: history }),
    });
    return response.json();
  }

  async getPortfolioData() {
    const response = await fetch(`${this.baseUrl}/personal-data`);
    return response.json();
  }

  async healthCheck() {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }
}

module.exports = KavindaAI;
```

**Usage:**
```javascript
const KavindaAI = require('kavinda-ai-sdk');

const ai = new KavindaAI();

// Chat
const response = await ai.chat('What are your skills?');
console.log(response.message);

// Get data
const data = await ai.getPortfolioData();
console.log(data);
```

---

## 🎯 Real-World Use Cases

### 1. Portfolio Website + Admin Dashboard
- **Frontend**: Your portfolio (current chatbot)
- **Another App**: Admin dashboard to see chat analytics
- **Backend**: Same Netlify Functions

### 2. Multiple Portfolio Variations
- **App 1**: Professional version
- **App 2**: Creative/minimal version
- **App 3**: Mobile app
- **Backend**: Same Netlify Functions for all

### 3. Landing Page + Full App
- **Landing Page**: Simple HTML with chatbot
- **Full App**: Complete React dashboard
- **Backend**: Shared Netlify Functions

### 4. WordPress Site Integration
- Add chatbot widget to WordPress site
- Calls your Netlify Functions backend
- No PHP backend needed!

---

## ⚡ Quick Start Template

Copy this to ANY project:

```javascript
// config.js
export const CHATBOT_API = {
  baseUrl: 'https://your-site.netlify.app/.netlify/functions',
  endpoints: {
    chat: '/chat',
    data: '/personal-data',
    health: '/health',
  }
};

// chatbot-client.js
import { CHATBOT_API } from './config';

export async function askAI(question) {
  const response = await fetch(
    `${CHATBOT_API.baseUrl}${CHATBOT_API.endpoints.chat}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question }),
    }
  );
  
  const data = await response.json();
  
  if (data.success) {
    return data.message;
  } else {
    throw new Error(data.error || 'Failed to get response');
  }
}

// Usage in any component
import { askAI } from './chatbot-client';

const answer = await askAI('What projects have you worked on?');
console.log(answer);
```

---

## 📊 Rate Limits & Quotas

Netlify Free Tier:
- ✅ 125,000 function invocations/month
- ✅ 100 hours of function runtime/month
- ✅ Unlimited bandwidth (within fair use)

For high-traffic apps:
- Monitor usage in Netlify Dashboard → Functions
- Upgrade if needed ($19/mo for 2M invocations)

---

## 🔐 Security Best Practices

1. **API Key Protection**: ✅ Already done (GEMINI_API_KEY is server-side only)
2. **Rate Limiting**: Consider adding if needed
3. **Input Validation**: Add validation in functions
4. **HTTPS Only**: ✅ Netlify enforces this
5. **CORS Restriction**: Optionally restrict to your domains

---

## ✅ Summary

Your Netlify Functions backend is a **standalone API** accessible from:
- ✅ Any React/Vue/Angular app
- ✅ Mobile apps (React Native, Flutter)
- ✅ Plain HTML/JavaScript sites
- ✅ Other backend services
- ✅ Command line tools

**Key URLs:**
```
Base: https://your-site.netlify.app/.netlify/functions
Chat: https://your-site.netlify.app/.netlify/functions/chat
Data: https://your-site.netlify.app/.netlify/functions/personal-data
```

**Just replace `your-site.netlify.app` with your actual Netlify domain!** 🚀

---

## 📚 Next Steps

1. Deploy your current project to Netlify
2. Note your site URL
3. Use the examples above in any other project
4. Test with Postman or curl
5. Build unlimited frontends using the same backend!

The backend is **completely independent** - use it anywhere! 🎉
