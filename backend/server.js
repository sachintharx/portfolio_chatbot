const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*' // Allow your Netlify domain in production
    : '*', // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Store personal data in memory
let personalData = '';

// Load personal data on startup
const loadPersonalData = async () => {
  try {
    const dataPath = path.join(__dirname, 'KavindaDetails.txt');
    personalData = await fs.readFile(dataPath, 'utf-8');
    console.log('Personal data loaded successfully for Kavinda Rajapaksha');
  } catch (error) {
    console.error('Error loading personal data:', error);
    personalData = "Kavinda Rajapaksha is a final year Computer Engineering undergraduate at University of Ruhuna, specializing in cloud data engineering.";
  }
};

// Initialize personal data
loadPersonalData();

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get personal data endpoint
app.get('/api/personal-data', (req, res) => {
  res.json({ data: personalData });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build the prompt with personal data
    const prompt = `You are Kavinda Rajapaksha's portfolio AI assistant. Use the following comprehensive information to answer questions accurately and professionally.

=== PERSONAL DATA ===
${personalData}

=== RESPONSE FORMAT INSTRUCTIONS ===
IMPORTANT: Format your responses properly:
- Use **bold text** for project titles, section headers, and important names (wrap with double asterisks like **this**)
- Use bullet points (* or -) for listing items
- Use numbered lists (1., 2., 3.) when showing steps or ordered information
- Add blank lines between different sections for better readability
- Keep responses informative but concise
- When listing projects, format as: **Project Name:** description
- Always be friendly and professional

User question: ${message}`;

    // Call Google Gemini API
    const geminiApiKey = process.env.GEMINI_API_KEY || 'AIzaSyDVesbvbOl7dYrtGcCJy3q86vgiHrg29pc';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const assistantMessage = data.candidates[0].content.parts[0].text;
      res.json({
        success: true,
        message: assistantMessage,
      });
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while processing your request',
      message: 'Sorry, I encountered an error. Please try again.',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  - GET  /api/health`);
  console.log(`  - GET  /api/personal-data`);
  console.log(`  - POST /api/chat`);
});
