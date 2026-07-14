import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Activity, 
  Sparkles, 
  HelpCircle,
  Loader2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Language } from '../types';

interface AIChatBotProps {
  lang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function AIChatBot({ lang }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const presets = [
    {
      en: "Tell me about AIMed CoE focus.",
      id: "Jelaskan fokus penelitian AIMed CoE."
    },
    {
      en: "Who is Prof. Dr. Ir. Siti Nurmaini?",
      id: "Siapa Prof. Dr. Ir. Siti Nurmaini?"
    },
    {
      en: "What clinical datasets are available?",
      id: "Dataset klinis apa saja yang tersedia?"
    }
  ];

  // Load initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: lang === 'en' 
            ? "Hello! I am the AIMed CoE Academic Assistant, powered by Gemini AI. Ask me anything about our medical research, active researchers, datasets, or computing infrastructure!"
            : "Halo! Saya Asisten Akademik AIMed CoE, didukung oleh Gemini AI. Tanyakan apa saja tentang riset medis, peneliti aktif, dataset, atau lab GPU kami!",
          timestamp: new Date()
        }
      ]);
    }
  }, [lang]);

  // Auto-scroll chat view
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!response.ok) throw new Error('Chatbot service failed to respond');
      const data = await response.json();

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'bot',
        text: data.reply,
        timestamp: new Date()
      }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'bot',
        text: lang === 'en' 
          ? "I apologize, but our server-side medical chat is experiencing network load. Rest assured, AIMed CoE is Universitas Sriwijaya's premier Artificial Intelligence Center of Excellence specializing in Obstetrics Ultrasound Analysis and Cervical Cancer Screening."
          : "Mohon maaf, layanan obrolan medis kami sedang mengalami gangguan jaringan. AIMed CoE adalah Pusat Unggulan Kecerdasan Buatan Universitas Sriwijaya yang berspesialisasi dalam Analisis Ultrasound Kebidanan dan Deteksi Kanker Serviks.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-slate-950/80 dark:bg-white/80 text-white dark:text-slate-950 backdrop-blur-md border border-white/10 dark:border-black/10 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
          id="chat-toggle-btn"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wider hidden sm:inline pr-1">
            {lang === 'en' ? 'Ask AIMed AI' : 'Tanya AI'}
          </span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div 
          className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl w-[350px] sm:w-[400px] h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 flex flex-col justify-between animate-in slide-in-from-bottom-5 duration-300"
          id="chat-drawer"
        >
          {/* Chat Header */}
          <div className="p-4 bg-slate-950/80 text-white flex items-center justify-between border-b border-white/5">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-teal-500 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs tracking-tight">AIMed Research Assistant</h4>
                <div className="flex items-center text-[9px] text-teal-400 font-bold uppercase tracking-widest mt-0.5">
                  <Activity className="w-3 h-3 mr-1 animate-pulse" />
                  <span>Powered by Gemini</span>
                </div>
              </div>
            </div>

            {/* Close */}
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Chat Body & suggestion helper chips */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-transparent">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-1 duration-200`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed shadow-3xs ${
                    isBot 
                      ? 'bg-white/60 dark:bg-slate-900/40 text-slate-800 dark:text-slate-300 rounded-tl-none border border-black/5 dark:border-white/5 backdrop-blur-xs' 
                      : 'bg-[#0F766E]/90 dark:bg-teal-500/90 text-white rounded-tr-none border border-white/10 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white/60 dark:bg-slate-900/40 border border-black/5 dark:border-white/5 max-w-[80%] rounded-2xl rounded-tl-none p-4 flex items-center space-x-2 text-slate-400 text-xs font-bold">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                  <span>{lang === 'en' ? 'Synthesizing response...' : 'Sintesis respons...'}</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Suggested Preset Chips */}
          {messages.length === 1 && !isLoading && (
            <div className="p-3 border-t border-black/5 dark:border-white/5 bg-transparent space-y-1.5 animate-in fade-in duration-300">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1" />
                <span>{lang === 'en' ? 'Suggested Inquiries' : 'Pertanyaan yang Disarankan'}</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => {
                  const label = lang === 'en' ? p.en : p.id;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(label)}
                      className="px-2.5 py-1.5 bg-black/5 dark:bg-white/[0.04] hover:bg-black/10 dark:hover:bg-white/10 text-[10px] text-slate-600 dark:text-slate-400 font-bold rounded-lg border border-black/5 dark:border-white/5 text-left truncate max-w-full cursor-pointer transition-all"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chat Footer Input */}
          <div className="p-3 bg-transparent border-t border-black/5 dark:border-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
              className="flex items-center space-x-2 bg-black/5 dark:bg-white/[0.04] rounded-xl px-3 py-2 border border-black/5 dark:border-white/5 backdrop-blur-sm"
            >
              <input
                type="text"
                placeholder={lang === 'en' ? 'Ask a research question...' : 'Ajukan pertanyaan riset...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-grow bg-transparent outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 font-semibold"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="p-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-45 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
