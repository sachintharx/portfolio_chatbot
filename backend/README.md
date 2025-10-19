# Portfolio Chatbot Backend API

This is the backend API for the portfolio chatbot application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Gemini API key (or use the default one in the code)

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### GET /api/health
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### GET /api/personal-data
Get the personal data loaded from the text file.

**Response:**
```json
{
  "data": "Personal data content..."
}
```

### POST /api/chat
Send a chat message and get a response.

**Request Body:**
```json
{
  "message": "Tell me about your projects",
  "conversationHistory": [] // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "AI response..."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly error message"
}
```
