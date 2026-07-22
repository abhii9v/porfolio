'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../layout/AppContext';
import { X, Send, Sparkles, User, Terminal, Loader2 } from 'lucide-react';
import { askAIResume } from '@/app/actions/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_PROMPTS = [
  'Tell me about forecasting.',
  'Explain your recommendation engine.',
  'Have you deployed production models?',
  'Why should we hire you?',
];

export default function ChatInterface() {
  const { isChatOpen, setChatOpen } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm Abhinav's AI Resume Assistant. 

Ask me anything about his work experience, MLOps pipeline setups, or the time series forecasting models he built. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isChatOpen) return null;

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Next.js Server Action
      const ans = await askAIResume([...messages, userMsg]);
      setMessages((prev) => [...prev, { role: 'assistant', content: ans }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please feel free to reach Abhinav directly at abhi9v2204@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black/60 backdrop-blur-sm">
        {/* Backdrop close trigger */}
        <div className="absolute inset-0" onClick={() => setChatOpen(false)} />

        {/* Chat Drawer container */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg h-[90vh] flex flex-col bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849]">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-800 font-sans leading-tight">AI Resume Assistant</h3>
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping mr-1" />
                  <span>Interactive Agent</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-zinc-400 hover:text-[#782849] p-1 rounded-md border border-transparent hover:border-zinc-200 hover:bg-zinc-100 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {messages.map((msg, i) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div key={i} className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                  {isAssistant && (
                    <div className="h-7 w-7 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849] shrink-0">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`rounded-md p-4 text-xs leading-relaxed max-w-[80%] font-sans whitespace-pre-wrap ${
                      isAssistant
                        ? 'bg-zinc-50 border border-zinc-200 text-zinc-700'
                        : 'bg-[#782849] text-white border border-[#782849]'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {!isAssistant && (
                    <div className="h-7 w-7 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bouncing typing loader */}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="h-7 w-7 rounded-md bg-[#782849]/5 border border-[#782849]/15 flex items-center justify-center text-[#782849] shrink-0">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-md p-4 bg-zinc-50 border border-zinc-200 flex items-center space-x-2">
                  <Loader2 className="h-3.5 w-3.5 text-[#782849] animate-spin" />
                  <span className="font-mono text-[10px] text-zinc-500">Retrieving RAG chunks...</span>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Prompt Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50/50">
              <span className="text-[10px] font-mono text-zinc-400 block mb-2">Suggested Topics</span>
              <div className="flex flex-wrap gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] font-mono text-zinc-600 hover:text-[#782849] bg-white border border-zinc-200 hover:border-[#782849]/40 px-2.5 py-1 rounded-md cursor-pointer transition-all duration-300 shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Input */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about forecasting, recommendations, MLOps..."
                className="flex-1 bg-white border border-zinc-200 rounded-md py-2.5 px-4 text-xs text-zinc-850 placeholder-zinc-400 focus:outline-none focus:border-[#782849] focus:ring-1 focus:ring-[#782849] transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 rounded-md bg-[#782849] text-white flex items-center justify-center hover:bg-[#5d1f38] disabled:opacity-40 disabled:hover:bg-[#782849] border border-[#782849] transition-all duration-150 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
