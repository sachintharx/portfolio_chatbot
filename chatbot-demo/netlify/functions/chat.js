const fs = require('fs');
const path = require('path');

// Load personal data
let personalData = '';
try {
  const dataPath = path.join(__dirname, '..', '..', '..', 'backend', 'KavindaDetails.txt');
  personalData = fs.readFileSync(dataPath, 'utf-8');
  console.log('Personal data loaded successfully for Kavinda Rajapaksha');
} catch (error) {
  console.error('Error loading personal data:', error);
  personalData = "Kavinda Rajapaksha is a final year Computer Engineering undergraduate at University of Ruhuna, specializing in cloud data engineering.";
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { message, conversationHistory } = JSON.parse(event.body);

    if (!message || !message.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
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
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
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
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: assistantMessage,
        }),
      };
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Error in chat function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'An error occurred while processing your request',
        message: 'Sorry, I encountered an error. Please try again.',
      }),
    };
  }
};
