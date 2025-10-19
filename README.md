# Portfolio Chatbot - Separated Frontend & Backend

This project has been separated into frontend and backend components for better organization and scalability.

## Project Structure

```
portfolio_chatbot/
├── backend/              # Express.js API server
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   ├── .env.example     # Environment variables template
│   └── README.md        # Backend documentation
├── frontend/            # React frontend
│   ├── Chatbot.tsx      # Main chatbot component
│   └── .env.example     # Frontend environment variables
├── Chatbot.tsx          # Original combined file (legacy)
└── hashara-data.txt     # Personal data file
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file:
```bash
cp .env.example .env
```
Then edit `.env` and add your Gemini API key if you want to use a different one.

4. Start the server:
```bash
# Development mode (auto-reload)
npm run dev

# OR Production mode
npm start
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. The frontend component is ready to use in your React application.

2. Create a `.env` file in your React app root (not in the frontend folder):
```bash
REACT_APP_API_URL=http://localhost:3001/api
```

3. Import and use the chatbot component:
```tsx
import Chatbot from './frontend/Chatbot';

function App() {
  return (
    <div>
      <Chatbot />
    </div>
  );
}
```

4. Make sure your React app has the required dependencies:
```bash
npm install lucide-react
```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/health` - Health check
- `GET /api/personal-data` - Get personal data
- `POST /api/chat` - Send chat message and get response

See `backend/README.md` for detailed API documentation.

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3001)
- `GEMINI_API_KEY` - Your Google Gemini API key (optional, has default)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001/api)

## Key Changes

### Frontend (Chatbot.tsx)
- Removed direct Gemini API calls
- Now calls backend API via `/api/chat` endpoint
- Removed personal data loading (handled by backend)
- Cleaner and more maintainable code

### Backend (server.js)
- Express.js server with REST API
- Handles Gemini API communication
- Loads and manages personal data
- CORS enabled for frontend communication
- Error handling and validation

## Benefits of Separation

1. **Security**: API keys are kept on the server, not exposed in frontend
2. **Scalability**: Backend can be scaled independently
3. **Maintainability**: Clear separation of concerns
4. **Flexibility**: Easy to add new endpoints or change AI providers
5. **Rate Limiting**: Can implement rate limiting on backend
6. **Caching**: Can add response caching on backend

## Development Workflow

1. Start the backend server first:
```bash
cd backend
npm run dev
```

2. Start your React development server:
```bash
npm start
```

3. The chatbot will communicate with the backend API automatically.

## Production Deployment

### Backend
- Deploy to services like Heroku, Railway, Render, or AWS
- Set environment variables in your hosting platform
- Update CORS settings if needed

### Frontend
- Build your React app: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting
- Update `REACT_APP_API_URL` to your production backend URL

## Notes

- The original `Chatbot.tsx` file is kept for reference
- Make sure the backend is running before using the frontend
- For production, use HTTPS for API calls
- Consider implementing authentication for production use
