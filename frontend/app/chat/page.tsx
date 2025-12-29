'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Brain, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { chatAPI } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load chat history
    const loadHistory = async () => {
      try {
        const history = await chatAPI.getHistory();
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message immediately
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const response = await chatAPI.sendMessage(userMessage);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="glass border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-display font-bold gradient-text">MindfulAI</h1>
                <p className="text-sm text-slate-400">Your AI Companion</p>
              </div>
            </div>
            
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-all"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Welcome to MindfulAI</h2>
              <p className="text-slate-400 max-w-md mx-auto">
                I'm here to listen and support you. Share what's on your mind, and let's talk through it together.
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                      : 'glass text-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass rounded-2xl px-6 py-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <span className="text-slate-400">Thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="glass border-t border-slate-700/50 sticky bottom-0">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none transition-all"
                  rows={1}
                  style={{ minHeight: '56px', maxHeight: '200px' }}
                />
              </div>
              
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-2xl transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mt-3 text-center">
              MindfulAI is here to support you, but is not a replacement for professional therapy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
