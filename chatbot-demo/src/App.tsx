import React from "react";
import "./App.css";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "calc(10px + 2vmin)",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>🤖 Portfolio Chatbot Demo</h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Click the chat button in the bottom right corner to start chatting!
        </p>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "30px",
            borderRadius: "15px",
            maxWidth: "600px",
            textAlign: "left",
          }}
        >
          <h3>✨ Features:</h3>
          <ul style={{ fontSize: "16px", lineHeight: "2" }}>
            <li>💬 AI-powered responses using Google Gemini</li>
            <li>📚 Personalized information from data file</li>
            <li>🎨 Beautiful modern UI</li>
            <li>⚡ Real-time chat interface</li>
            <li>📱 Responsive design</li>
          </ul>
        </div>
      </header>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}

export default App;
