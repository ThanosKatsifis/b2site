import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Eraser } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Γεια σου! Είμαι ο **B2 Bot** 🤖. Πώς μπορώ να σε βοηθήσω σήμερα με τα μαθήματα (ή να πω κανένα αστείο);',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessagePlaceholder: ChatMessage = {
      role: 'model',
      text: '', // Will be filled by stream
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMessagePlaceholder]);

    let fullResponse = '';

    await streamGeminiResponse(userMessage.text, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        lastMsg.text = fullResponse;
        return newMessages;
      });
    });

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
     setMessages([{
      role: 'model',
      text: 'Καθάρισα τη μνήμη μου! Πάμε πάλι από την αρχή; 🚀',
      timestamp: new Date()
    }]);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] md:h-[600px] w-full max-w-4xl mx-auto bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* Chat Header */}
      <div className="bg-dark/50 p-4 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Bot className="text-white w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white">B2 Assistant AI</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors" 
          title="Καθαρισμός"
        >
          <Eraser size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-dark to-card">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-slate-700' : 'bg-primary/20'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} className="text-primary" />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-white/5 text-slate-200 border border-white/5 rounded-bl-none'
            }`}>
              {msg.role === 'model' && msg.text === '' ? (
                 <div className="flex gap-1 h-5 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                 </div>
              ) : (
                <ReactMarkdown 
                  components={{
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    strong: ({node, ...props}) => <span className="font-bold text-white" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                    code: ({node, ...props}) => <code className="bg-black/30 px-1 py-0.5 rounded font-mono text-xs text-yellow-300" {...props} />
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-dark/80 backdrop-blur-lg border-t border-white/5">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ρώτησε κάτι για τα μαθήματα..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-500"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-primary rounded-full text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-2">
          Ο B2 Bot μπορεί να κάνει λάθη. Ελέγξτε τις πληροφορίες.
        </p>
      </div>
    </div>
  );
};