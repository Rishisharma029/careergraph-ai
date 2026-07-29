import React, { useState } from 'react';
import { MessageSquareCode, Send, Sparkles, Network, FileText, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface SearchProps {
  onNavigate: (route: string) => void;
}

export const AISearchChat: React.FC<SearchProps> = ({ onNavigate }) => {
  const { chatMessages, sendChatMessage, selectDocAndHighlightGraph, selectDoc } = useCareerStore();
  const [inputQuery, setInputQuery] = useState('');
  const [isTypingStream, setIsTypingStream] = useState(false);

  const handleSend = () => {
    if (!inputQuery.trim()) return;
    const q = inputQuery;
    setInputQuery('');
    setIsTypingStream(true);
    sendChatMessage(q);
    setTimeout(() => {
      setIsTypingStream(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header (⭐ Priority 10: Scaled Down Heading) */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              💬 Token-by-Token Streaming RAG Engine
            </span>
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
              100% Document Evidence Citations
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            AI Search & Knowledge Graph Q&A
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Ask natural language questions about Rishi Sharma's projects, Microsoft TrOCR skills, or AWS certifications with explicit proof citations.
          </p>
        </div>

        {/* Chat Stream Window */}
        <GlassCard glowColor="purple" className="p-6 md:p-8 border-purple-500/30 shadow-2xl min-h-[500px] flex flex-col justify-between space-y-6">
          {/* Message History */}
          <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 p-0.5 shrink-0 shadow-glow-purple flex items-center justify-center text-white font-extrabold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-2xl space-y-3 ${msg.sender === 'user' ? 'bg-purple-500/20 border border-purple-500/40 text-purple-200 p-4 rounded-3xl' : 'bg-white/5 border border-white/10 text-slate-200 p-5 rounded-3xl'}`}>
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-60">
                    <span className="font-bold">{msg.sender === 'user' ? 'Rishi Sharma (You)' : 'CareerGraph RAG AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-line leading-relaxed font-normal">{msg.text}</p>

                  {/* Document Proof Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3 h-3 text-cyan-400" /> Evidence Proof Citations ({msg.citations.length})
                      </div>
                      {msg.citations.map((cite, cIdx) => (
                        <div
                          key={cIdx}
                          onClick={() => {
                            selectDocAndHighlightGraph(cite.documentId);
                            onNavigate('graph');
                          }}
                          className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-xs transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-bold text-cyan-300 group-hover:underline">• {cite.documentTitle}</span>
                            <p className="text-[11px] text-slate-400 italic mt-0.5">"{cite.excerpt}"</p>
                          </div>
                          <button className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 text-[10px] font-bold shrink-0">
                            Highlight Graph →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Followups */}
                  {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {msg.suggestedFollowups.map((f, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => {
                            setInputQuery(f);
                          }}
                          className="px-3 py-1 rounded-xl bg-white/5 hover:bg-purple-500/20 text-slate-300 text-[11px] font-semibold border border-white/10 hover:border-purple-500/30 transition-all"
                        >
                          💡 {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* ⭐ PRIORITY 7: AI SEARCH STREAMING TYPING INDICATOR */}
            {isTypingStream && (
              <div className="flex gap-3 items-center text-xs text-purple-300 font-mono animate-pulse">
                <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <span>Synthesizing answer token-by-token from Knowledge Graph...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Rishi's HDRS TrOCR project, FastAPI endpoints, or AWS cloud credentials..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSend}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
            >
              <span>Ask AI</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
