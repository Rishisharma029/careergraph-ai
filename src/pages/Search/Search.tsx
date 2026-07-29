import React, { useState } from 'react';
import { MessageSquareCode, Send, Sparkles, Network, FileText, ArrowRight, ShieldCheck, User, Bot, Award, Target, BookOpen, Mic } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { AgentType } from '../../types';
import { InterviewSimulatorModal } from '../../components/common/InterviewSimulatorModal';

interface SearchProps {
  onNavigate: (route: string) => void;
}

export const AISearchChat: React.FC<SearchProps> = ({ onNavigate }) => {
  const { chatMessages, sendChatMessage, selectDocAndHighlightGraph } = useCareerStore();
  const [inputQuery, setInputQuery] = useState('');
  const [activeAgent, setActiveAgent] = useState<AgentType>('twin');
  const [isTypingStream, setIsTypingStream] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);

  const agentsList: { id: AgentType; label: string; icon: string; desc: string }[] = [
    { id: 'twin', label: 'Ask Digital Rishi (Career Twin)', icon: '👤', desc: '1st-person digital twin trained on Rishi\'s resume and project proof artifacts.' },
    { id: 'resume', label: 'Resume Optimizer Agent', icon: '📄', desc: 'Analyzes bullet verb impact and quantifies metrics.' },
    { id: 'portfolio', label: 'Portfolio Showcase Agent', icon: '🌐', desc: 'Optimizes recruiter showcase presentation.' },
    { id: 'advisor', label: 'Career Advisor Agent', icon: '🎯', desc: 'Recommends next role transitions and skill unlocks.' },
    { id: 'interview', label: 'Mock Interview Agent', icon: '🎤', desc: 'Simulates technical Q&A with real-time scoring.' },
    { id: 'learning', label: 'Learning Roadmap Agent', icon: '📚', desc: 'Generates targeted skill acquisition roadmaps.' }
  ];

  const handleSend = () => {
    if (!inputQuery.trim()) return;
    const q = inputQuery;
    setInputQuery('');
    setIsTypingStream(true);
    sendChatMessage(activeAgent === 'twin' ? `[Career Twin Persona]: ${q}` : `[${activeAgent.toUpperCase()} Agent]: ${q}`);
    setTimeout(() => {
      setIsTypingStream(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                👤 Digital Career Twin & Multi-Agent Engine
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                100% Document Evidence Grounding
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              AI Search & Career Twin Engine
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Chat directly with Digital Rishi or engage 5 specialized AI Agents for resume tuning, career advice, and interview simulation.
            </p>
          </div>

          <button
            onClick={() => setIsInterviewModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-2 shadow-glow-purple transition-all"
          >
            <Mic className="w-4 h-4 text-purple-400" /> Start AI Interview Practice
          </button>
        </div>

        {/* ⭐ PHASE 5: SPECIALIZED AI AGENTS SELECTOR TOOLBAR */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {agentsList.map(ag => (
            <button
              key={ag.id}
              onClick={() => setActiveAgent(ag.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeAgent === ag.id
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 shadow-glow-purple scale-[1.01]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-extrabold">
                <span>{ag.icon}</span>
                <span className="truncate">{ag.label}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 font-normal">{ag.desc}</p>
            </button>
          ))}
        </div>

        {/* Chat Stream Window */}
        <GlassCard glowColor="purple" className="p-6 md:p-8 border-purple-500/30 shadow-2xl min-h-[480px] flex flex-col justify-between space-y-6">
          {/* Message History */}
          <div className="space-y-6 overflow-y-auto max-h-[480px] pr-2">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 p-0.5 shrink-0 shadow-glow-purple flex items-center justify-center text-white font-extrabold">
                    {activeAgent === 'twin' ? 'RS' : <Sparkles className="w-4 h-4" />}
                  </div>
                )}

                <div className={`max-w-2xl space-y-3 ${msg.sender === 'user' ? 'bg-purple-500/20 border border-purple-500/40 text-purple-200 p-4 rounded-3xl' : 'bg-white/5 border border-white/10 text-slate-200 p-5 rounded-3xl'}`}>
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-60">
                    <span className="font-bold">
                      {msg.sender === 'user' ? 'Recruiter / User' : activeAgent === 'twin' ? '👤 Digital Rishi (Career Twin)' : '🤖 Career AI Agent'}
                    </span>
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
                </div>
              </div>
            ))}

            {isTypingStream && (
              <div className="flex gap-3 items-center text-xs text-purple-300 font-mono animate-pulse">
                <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <span>{activeAgent === 'twin' ? 'Digital Rishi is synthesizing response from career graph...' : 'Specialized AI Agent is executing reasoning...'}</span>
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
              placeholder={activeAgent === 'twin' ? 'Ask Digital Rishi: "How did you build HDRS?" or "What are your core strengths?"...' : 'Ask specialized agent...'}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
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

      {/* Mock Interview Simulator Modal */}
      <InterviewSimulatorModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
      />
    </div>
  );
};
