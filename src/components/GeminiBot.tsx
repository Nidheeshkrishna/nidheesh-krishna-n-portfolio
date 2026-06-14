import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Sparkles, AlertCircle, RefreshCw, X, ArrowUpRight } from "lucide-react";
import { Message } from "../types";
import { motion } from "motion/react";

export default function GeminiBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Nidheesh's Interactive Portfolio AI, powered by Gemini. You can ask me anything about my core Flutter competencies, my signature project mobicom, or my professional mobile development experience!",
      timestamp: "21:28",
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions chips
  const SUGGESTIONS = [
    "Tell me about the mobicom project.",
    "Why use Selector in Provider state management?",
    "What is Nidheesh's official contact info?",
    "How many years of Flutter experience?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputVal("");
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Chat assistant failed to respond.");
      }

      const data = await response.json();
      const botMessage: Message = {
        role: "assistant",
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      setIsError(true);
      setErrorMessage(err.message || "Chat communication error. Please try sending your message again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (sug: string) => {
    handleSendMessage(sug);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-gold-500/10 flex flex-col h-[520px] bg-[#0c0d13]/85 relative overflow-hidden">
      
      {/* Decorative soft glowing top gradient */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/45 to-transparent shadow-[0_0_15px_rgba(217,190,109,0.3)]" />

      {/* Bot Chat Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-luxury-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-gold-500 to-gold-300 flex items-center justify-center text-black shadow-lg shadow-gold-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-gold-400 font-bold">Ask AI Copilot</h4>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-gray-400">Online &bull; State-synchronized</p>
            </div>
          </div>
        </div>
        <div className="text-[9px] font-mono bg-gold-400/10 text-gold-300 px-2 py-0.5 rounded border border-gold-400/15">
          Gemini 3.5 Flash
        </div>
      </div>

      {/* Main Messages Body */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
        {messages.map((msg, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed relative ${
              msg.role === "user" 
                ? "bg-gold-500 text-black font-semibold rounded-tr-xs shadow-md shadow-gold-500/10" 
                : "bg-[#10121d] text-gray-200 border border-gold-400/10 rounded-tl-xs shadow-sm"
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <span className={`block text-[8px] text-right mt-1.5 ${
                msg.role === "user" ? "text-black/60" : "text-gray-500"
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#10121d] text-gray-500 border border-gray-900 rounded-2xl p-3.5 space-y-2 max-w-[80px]">
              <div className="flex space-x-1 justify-center items-center">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {isError && (
          <div className="p-3.5 bg-rose-950/20 border border-rose-500/25 text-rose-300 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="text-xs font-semibold">AI Interaction Assistant Error</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-normal">{errorMessage}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Inline Suggestion Chips */}
      {messages.length < 3 && (
        <div className="py-2.5 space-y-1.5">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">Suggestion Queries</span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(sug)}
                className="text-[10px] bg-[#11121c] border border-gold-500/10 text-gray-300 rounded-full px-3 py-1 hover:border-gold-300/40 hover:text-white transition-all text-left flex items-center space-x-1 cursor-pointer"
              >
                <span>{sug}</span>
                <ArrowUpRight className="w-3 h-3 text-gold-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Box */}
      <div className="pt-2 border-t border-luxury-border/30 flex items-center space-x-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputVal)}
          placeholder="Ask about my Flutter experience, biometrics, Stripe..."
          className="bg-[#12141c] text-xs text-white placeholder-gray-600 outline-none p-3 rounded-xl border border-gray-900 flex-1 focus:border-gold-500/20 transition-all font-sans"
        />
        <button
          onClick={() => handleSendMessage(inputVal)}
          disabled={!inputVal.trim() || isLoading}
          className={`p-3 rounded-xl transition-all cursor-pointer ${
            inputVal.trim() && !isLoading
              ? "bg-gold-500 text-black hover:bg-gold-400"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
