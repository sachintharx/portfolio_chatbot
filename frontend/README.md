# Frontend Component

This is the React chatbot component that communicates with the backend API.

## Installation

```bash
npm install
```

## Type Checking

```bash
npm run typecheck
```

## Usage in Your React App

1. Copy `Chatbot.tsx` to your React project's components folder
2. Import and use it:

```tsx
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div>
      <Chatbot />
    </div>
  );
}
```

## Environment Variables

Create a `.env` file in your React app root:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Dependencies Required in Your React App

Make sure your React app has:
- `react` (^18.0.0)
- `react-dom` (^18.0.0)
- `lucide-react` (^0.263.1)

Install lucide-react if needed:
```bash
npm install lucide-react
```
