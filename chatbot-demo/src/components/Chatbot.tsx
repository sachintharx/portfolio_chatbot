import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Sparkles,
  Bot,
  User,
} from "lucide-react";
import "./Chatbot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

// Configuration
// For Netlify deployment, functions are available at /.netlify/functions
const API_BASE_URL = process.env.REACT_APP_API_URL || "/.netlify/functions";

// Helper function to parse inline formatting (bold text)
const parseInlineFormatting = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

// Helper function to format message content with better structure
const formatMessage = (content: string) => {
  // Clean up escaped characters
  let cleanContent = content
    .replace(/\\n/g, "\n") // Replace \n with actual newlines
    .replace(/\\\*/g, "*") // Replace \* with *
    .replace(/\\\\/g, "\\"); // Replace \\ with \

  const elements: React.ReactNode[] = [];

  // Split content by lines
  const lines = cleanContent.split("\n");

  lines.forEach((line, lineIndex) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      // Empty line - add spacing
      elements.push(<div key={`space-${lineIndex}`} className="h-3" />);
      return;
    }

    // Check for standalone bold headers (entire line is **text**)
    const standaloneBoldMatch = trimmedLine.match(/^\*\*([^*]+)\*\*:?\s*$/);
    if (standaloneBoldMatch) {
      elements.push(
        <div
          key={`header-${lineIndex}`}
          className="font-bold text-gray-900 text-base mt-4 mb-2"
        >
          {standaloneBoldMatch[1]}
        </div>
      );
      return;
    }

    // Check for bullet points (starting with * or -)
    const bulletMatch = trimmedLine.match(/^[\*\-]\s+(.+)$/);
    if (bulletMatch) {
      const bulletContent = bulletMatch[1];

      // Parse the bullet content for inline bold formatting
      elements.push(
        <div
          key={`bullet-${lineIndex}`}
          className="flex items-start gap-3 mb-3 ml-1"
        >
          <span className="text-pink-600 font-bold text-base mt-0.5 flex-shrink-0">
            •
          </span>
          <div className="flex-1 text-gray-700 leading-relaxed">
            {parseInlineFormatting(bulletContent)}
          </div>
        </div>
      );
      return;
    }

    // Check for numbered lists
    const numberMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (numberMatch) {
      elements.push(
        <div
          key={`number-${lineIndex}`}
          className="flex items-start gap-3 mb-3 ml-1"
        >
          <span className="text-pink-600 font-semibold min-w-[24px] flex-shrink-0">
            {numberMatch[1]}.
          </span>
          <div className="flex-1 text-gray-700 leading-relaxed">
            {parseInlineFormatting(numberMatch[2])}
          </div>
        </div>
      );
      return;
    }

    // Regular paragraph with potential inline formatting
    if (trimmedLine.includes("**")) {
      elements.push(
        <p
          key={`para-${lineIndex}`}
          className="mb-3 leading-relaxed text-gray-700"
        >
          {parseInlineFormatting(trimmedLine)}
        </p>
      );
    } else {
      elements.push(
        <p
          key={`para-${lineIndex}`}
          className="mb-3 leading-relaxed text-gray-700"
        >
          {trimmedLine}
        </p>
      );
    }
  });

  return <div className="space-y-0.5">{elements}</div>;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Kavinda's AI assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (data.success && data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        throw new Error(data.error || "Invalid response format");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle
            size={28}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Rounded Corner Widget Chat */}
      {isOpen && (
        <div className="chatbot-widget-container">
          {/* Compact Modern Header */}
          <div className="chatbot-header">
            {/* Animated background blobs */}
            <div className="chatbot-header-blob-1"></div>
            <div className="chatbot-header-blob-2"></div>

            <div className="chatbot-header-content">
              <div className="chatbot-header-left">
                <div className="chatbot-header-avatar-wrapper">
                  <div className="chatbot-header-avatar">
                    <Bot size={20} />
                  </div>
                  <span className="chatbot-header-avatar-status"></span>
                </div>
                <div className="chatbot-header-info">
                  <h3>
                    AI Assistant
                    <Sparkles size={14} className="chatbot-icon-sparkle" />
                  </h3>
                  <p>
                    <span className="chatbot-header-status-dot"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-header-close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  message.role === "user" ? "user" : ""
                }`}
              >
                {/* Avatar */}
                <div className={`chatbot-message-avatar ${message.role}`}>
                  {message.role === "user" ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`chatbot-message-bubble ${message.role}`}>
                  {/* Message Content */}
                  <div className="chatbot-message-content">
                    {message.role === "assistant" ? (
                      formatMessage(message.content)
                    ) : (
                      <p className="whitespace-pre-wrap font-medium">
                        {message.content}
                      </p>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="chatbot-message-timestamp">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="chatbot-loading">
                <div className="chatbot-loading-avatar">
                  <Bot size={20} />
                </div>
                <div className="chatbot-loading-bubble">
                  <div className="chatbot-loading-text">
                    <Loader2 size={18} className="chatbot-icon-spinning" />
                    <span>AI is thinking...</span>
                  </div>
                  <div className="chatbot-loading-dots">
                    <span className="chatbot-loading-dot"></span>
                    <span className="chatbot-loading-dot"></span>
                    <span className="chatbot-loading-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-area">
            <div className="chatbot-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="chatbot-input"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="chatbot-send-button"
              >
                {isLoading ? (
                  <Loader2 size={18} className="chatbot-icon-spinning" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="chatbot-quick-actions">
              <button
                onClick={() => setInputMessage("Tell me about your skills")}
                className="chatbot-quick-action skills"
              >
                💼 Skills
              </button>
              <button
                onClick={() =>
                  setInputMessage("What projects have you worked on?")
                }
                className="chatbot-quick-action projects"
              >
                🚀 Projects
              </button>
              <button
                onClick={() => setInputMessage("Tell me about your education")}
                className="chatbot-quick-action education"
              >
                🎓 Education
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
