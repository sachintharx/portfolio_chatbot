import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

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
      content: "Hi! I'm Hashara's AI assistant. How can I help you today?",
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
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 group"
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X size={28} className="group-hover:rotate-90 transition-transform" />
        ) : (
          <MessageCircle
            size={28}
            className="group-hover:scale-110 transition-transform animate-pulse"
          />
        )}
      </button>

      {/* Chatbot Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-slide-in-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-xs text-white/80">Ask me about Hashara</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                      : "bg-white text-gray-700 shadow-md border border-gray-200"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {message.role === "assistant" ? (
                      formatMessage(message.content)
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl px-4 py-3 shadow-md border border-gray-200">
                  <Loader2 size={20} className="animate-spin text-pink-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
