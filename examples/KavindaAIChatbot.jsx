// ============================================
// 🎯 COPY-PASTE REACT COMPONENT
// ============================================
// This is a complete, ready-to-use React component
// Just copy this entire file to your React project!

import React, { useState, useEffect } from 'react';

// ============================================
// 🔧 CONFIGURATION
// ============================================
// REPLACE THIS with your actual Netlify site URL
const API_BASE_URL = 'https://kavindabot.netlify.app/.netlify/functions';

// For local testing with netlify dev:
// const API_BASE_URL = 'http://localhost:8888/.netlify/functions';

// ============================================
// 📡 API HELPER FUNCTIONS
// ============================================

async function sendMessageToAI(message) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      conversationHistory: []
    })
  });

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to get response');
  }
  
  return data.message;
}

async function checkAPIHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}

async function getPortfolioData() {
  const response = await fetch(`${API_BASE_URL}/personal-data`);
  const data = await response.json();
  return data.data;
}

// ============================================
// 🎨 MAIN COMPONENT
// ============================================

function KavindaAIChatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');

  // Check API status on mount
  useEffect(() => {
    checkAPIHealth()
      .then(data => {
        setApiStatus(data.status === 'OK' ? 'online' : 'offline');
      })
      .catch(() => {
        setApiStatus('offline');
      });
  }, []);

  const handleSendQuestion = async () => {
    if (!question.trim()) {
      alert('Please enter a question!');
      return;
    }

    setLoading(true);
    setAnswer('');

    try {
      const response = await sendMessageToAI(question);
      setAnswer(response);
      setQuestion(''); // Clear input after successful response
    } catch (error) {
      setAnswer(`❌ Error: ${error.message}\n\nPlease check:\n1. API_BASE_URL is correctly set\n2. Netlify site is deployed\n3. GEMINI_API_KEY is set in Netlify`);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (q) => {
    setQuestion(q);
    setTimeout(() => handleSendQuestion(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSendQuestion();
    }
  };

  // Format message to convert **bold** to JSX
  const formatMessage = (text) => {
    if (!text) return null;
    
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🤖 Kavinda's AI Assistant</h1>
          <p style={styles.subtitle}>Ask me anything about Kavinda Rajapaksha</p>
          
          {/* API Status Badge */}
          <div style={{
            ...styles.statusBadge,
            background: apiStatus === 'online' ? '#e8f5e9' : apiStatus === 'offline' ? '#ffebee' : '#f5f5f5'
          }}>
            <div style={{
              ...styles.statusDot,
              background: apiStatus === 'online' ? '#4caf50' : apiStatus === 'offline' ? '#f44336' : '#9e9e9e'
            }} />
            <span style={styles.statusText}>
              {apiStatus === 'online' ? '✅ API Online' : apiStatus === 'offline' ? '⚠️ API Offline' : '🔄 Checking...'}
            </span>
          </div>
        </div>

        {/* Quick Questions */}
        <div style={styles.quickQuestions}>
          <button 
            style={styles.quickBtn} 
            onClick={() => handleQuickQuestion('What projects have you worked on?')}
            disabled={loading}
          >
            📂 Projects
          </button>
          <button 
            style={styles.quickBtn} 
            onClick={() => handleQuickQuestion('Tell me about your skills')}
            disabled={loading}
          >
            💡 Skills
          </button>
          <button 
            style={styles.quickBtn} 
            onClick={() => handleQuickQuestion('What is your education background?')}
            disabled={loading}
          >
            🎓 Education
          </button>
          <button 
            style={styles.quickBtn} 
            onClick={() => handleQuickQuestion('How can I contact you?')}
            disabled={loading}
          >
            📧 Contact
          </button>
        </div>

        {/* Input */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Kavinda..."
            style={styles.input}
            disabled={loading}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendQuestion}
          disabled={loading || !question.trim()}
          style={{
            ...styles.sendButton,
            opacity: (loading || !question.trim()) ? 0.6 : 1,
            cursor: (loading || !question.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Thinking...' : '📤 Send Question'}
        </button>

        {/* Answer Box */}
        {(answer || loading) && (
          <div style={styles.answerBox}>
            {loading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Getting answer from AI...</p>
              </div>
            ) : (
              <div style={styles.answerContent}>
                <strong style={styles.answerLabel}>Answer:</strong>
                <div style={styles.answerText}>
                  {formatMessage(answer)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Powered by Netlify Functions + Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 🎨 STYLES
// ============================================

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    maxWidth: '700px',
    width: '100%',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 20px 0',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    fontWeight: '500',
  },
  quickQuestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  quickBtn: {
    padding: '10px 16px',
    background: '#f5f5f5',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  sendButton: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  answerBox: {
    marginTop: '30px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '12px',
    minHeight: '100px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '15px',
    color: '#666',
    fontSize: '14px',
  },
  answerContent: {
    lineHeight: '1.6',
  },
  answerLabel: {
    display: 'block',
    color: '#667eea',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  answerText: {
    color: '#333',
    fontSize: '15px',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '12px',
    color: '#999',
    margin: 0,
  },
};

export default KavindaAIChatbot;

// ============================================
// 📝 USAGE INSTRUCTIONS
// ============================================
/*

1. SETUP:
   - Copy this entire file to your React project
   - Update API_BASE_URL (line 10) with your Netlify site URL
   - Save the file as: src/components/KavindaAIChatbot.jsx

2. USE IN YOUR APP:
   import KavindaAIChatbot from './components/KavindaAIChatbot';
   
   function App() {
     return <KavindaAIChatbot />;
   }

3. DONE! 
   The component is fully functional and styled.

4. CUSTOMIZATION:
   - Change colors in the styles object
   - Add more quick questions
   - Modify the UI layout
   - Add conversation history tracking

5. TESTING:
   - Make sure your Netlify site is deployed
   - Ensure GEMINI_API_KEY is set in Netlify
   - Click the quick question buttons or type your own

*/
