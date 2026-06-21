/**
 * EcoPulse AI — Chatbot Page
 * Full-page AI sustainability coach chat interface with
 * message bubbles, quick-reply suggestions, and typing indicator.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Sparkles } from 'lucide-react';
import { Card } from '../components/common/Card';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { useAICoach } from '../hooks/useAICoach';
import { formatTime } from '../utils/formatters';
import { MessageSender } from '../types';

export function ChatbotPage() {
  const { messages, isTyping, sendMessage, clearChat } = useAICoach();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
      inputRef.current?.focus();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <PageContainer
      title="AI Sustainability Coach"
      subtitle="Get personalized advice to reduce your carbon footprint"
      action={
        <Button variant="ghost" size="sm" onClick={clearChat} icon={<Trash2 size={14} />}>
          Clear Chat
        </Button>
      }
    >
      <Card padding="none" className="max-w-4xl mx-auto overflow-hidden" glow>
        {/* Chat Messages */}
        <div className="h-[calc(100vh-20rem)] overflow-y-auto p-4 sm:p-6 space-y-6" role="log" aria-label="Chat messages" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === MessageSender.User ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${message.sender === MessageSender.User
                  ? 'bg-gradient-to-br from-blue-400 to-cyan-500'
                  : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                }
              `}>
                {message.sender === MessageSender.User
                  ? <User size={14} className="text-white" />
                  : <Bot size={14} className="text-white" />
                }
              </div>

              {/* Message Content */}
              <div className={`max-w-[80%] ${message.sender === MessageSender.User ? 'text-right' : ''}`}>
                <div
                  className={`
                    inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${message.sender === MessageSender.User
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-md'
                      : 'bg-white/10 text-slate-200 rounded-bl-md border border-white/10'
                    }
                  `}
                >
                  {/* Render markdown-like formatting */}
                  {message.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line.startsWith('•') || line.startsWith('-') ? (
                        <p className="ml-2">{line}</p>
                      ) : line.match(/^\d+\./) ? (
                        <p className="ml-2 mt-1">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                      ) : (
                        <p className={i > 0 ? 'mt-2' : ''}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Timestamp */}
                <p className={`text-xs text-slate-500 mt-1 ${message.sender === MessageSender.User ? 'text-right' : ''}`}>
                  {formatTime(message.timestamp)}
                </p>

                {/* Suggestion Chips */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium
                          bg-emerald-500/10 text-emerald-300 border border-emerald-500/20
                          hover:bg-emerald-500/20 hover:border-emerald-500/30
                          transition-all duration-200 active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-emerald-400 animate-pulse" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4 bg-slate-900/50">
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask about sustainability, habits, or your carbon footprint..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white
                placeholder-slate-500 text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50
                transition-all"
              maxLength={500}
              aria-label="Chat message input"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              icon={<Send size={16} />}
              size="md"
              aria-label="Send message"
            >
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
