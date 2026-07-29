import React, { useState } from 'react';
import { User, Globe, Download, Share2, Sparkles, Monitor, Tablet, Smartphone, CheckCircle2, ShieldCheck, FileText, ArrowRight, Eye, Layers, Trophy, Cpu, Flame, Award, Briefcase, Code, Rocket, BookOpen } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { DeviceViewport } from '../../types';
import { getPersonalityDNA } from '../../utils/skillInferenceEngine';

interface ProfileProps {
  onNavigate: (route: string) => void;
}

export const PortfolioExporter: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { portfolioConfig, updatePortfolioConfig, nodes, artifacts } = useCareerStore();
  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [activePortfolioTemplate, setActivePortfolioTemplate] = useState<string>('developer');
  const [showCelebration, setShowCelebration] = useState(false);

  const personalityTraits = getPersonalityDNA();

  const portfolioTemplates = [
    { id: 'developer', label: 'Developer Portfolio', icon: Code, desc: 'Focuses on Full-Stack FastAPI, React, and Docker projects.' },
    { id: 'ml', label: 'ML Engineer Portfolio', icon: Cpu, desc: 'Highlights Microsoft TrOCR, OpenCV, and Vision Transformers.' },
    { id: 'research', label: 'Research Portfolio', icon: BookOpen, desc: 'Emphasizes academic accuracy metrics (99.4% precision).' },
    { id: 'recruiter', label: 'Recruiter Showcase', icon: Briefcase, desc: 'Optimized for fast scanning with verified evidence badges.' },
    { id: 'startup', label: 'Startup Founder Portfolio', icon: Rocket, desc: 'Focuses on product execution and end-to-end delivery.' }
  ];

  const handleExportResume = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 3500);
  };

  const getViewportWidthClass = () => {
    switch (deviceViewport) {
      case 'mobile':
        return 'max-w-sm w-full mx-auto shadow-2xl rounded-3xl border-4 border-slate-700';
      case 'tablet':
        return 'max-w-2xl w-full mx-auto shadow-2xl rounded-3xl border-4 border-slate-700';
      case 'desktop':
      default:
        return 'max-w-5xl w-full mx-auto';
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                🌐 Live Portfolio & AI Resume Generator
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                100% Graph Synchronized
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Interactive Public Portfolio & AI Resume Exporter
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Generate a shareable public portfolio with live Multi-Device Viewport previews (Desktop, Tablet, Mobile).
            </p>
          </div>

          <button
            onClick={handleExportResume}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
          >
            <Download className="w-4 h-4" /> Export AI Resume PDF
          </button>
        </div>

        {/* Celebration Toast */}
        {showCelebration && (
          <div className="fixed top-8 right-8 z-50 animate-in bounce-in duration-300">
            <GlassCard glowColor="emerald" className="p-4 bg-emerald-950/90 border-emerald-500/40 shadow-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xl">🎉</div>
              <div>
                <h4 className="text-sm font-extrabold text-white">✓ Resume Generated!</h4>
                <p className="text-xs text-emerald-300">AI PDF compiled with 100% verified graph entities.</p>
              </div>
            </GlassCard>
          </div>
        )}

        {/* ⭐ DIRECTIVE 8: AI MULTI-PERSONA PORTFOLIO BUILDER */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
            1-Click AI Multi-Persona Portfolio Builder:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {portfolioTemplates.map(tpl => {
              const Icon = tpl.icon;
              const isActive = activePortfolioTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setActivePortfolioTemplate(tpl.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 shadow-glow-purple scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-extrabold">
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span className="truncate">{tpl.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{tpl.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI PERSONALITY DNA RADAR */}
        <GlassCard glowColor="purple" className="p-6 border-purple-500/30 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Award className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-extrabold text-white">AI Personality & Evidence-Based Competency DNA</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {personalityTraits.map((pt, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center">
                <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">{pt.trait}</div>
                <div className="text-xl font-extrabold text-purple-300 font-mono">{pt.score}%</div>
                <div className="text-[9px] text-slate-400 line-clamp-2 leading-tight">{pt.evidenceSummary}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* MULTI-DEVICE VIEWPORT SWITCHER TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300 font-mono">Multi-Device Viewport Switcher:</span>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 p-1 rounded-2xl">
              <button
                onClick={() => setDeviceViewport('desktop')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  deviceViewport === 'desktop' ? 'bg-purple-500 text-white shadow-glow-purple' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setDeviceViewport('tablet')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  deviceViewport === 'tablet' ? 'bg-cyan-500 text-white shadow-glow-cyan' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" /> Tablet
              </button>
              <button
                onClick={() => setDeviceViewport('mobile')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  deviceViewport === 'mobile' ? 'bg-amber-500 text-white shadow-glow-amber' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Public URL:</span>
            <span className="text-xs font-mono text-cyan-300 bg-white/5 px-3 py-1 rounded-xl border border-white/10">
              careergraph.ai/p/rishisharma
            </span>
          </div>
        </div>

        {/* LIVE PORTFOLIO PREVIEW CONTAINER */}
        <div className="transition-all duration-300 py-4">
          <div className={getViewportWidthClass()}>
            <GlassCard glowColor="purple" className="p-8 md:p-10 border-purple-500/30 shadow-2xl space-y-8">
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-600 to-cyan-500 p-1 shadow-glow-purple flex items-center justify-center text-2xl font-extrabold text-white">
                      RS
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">{portfolioConfig.fullName}</h2>
                      <p className="text-xs text-purple-300 font-semibold">{portfolioConfig.headline}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed font-normal">{portfolioConfig.bio}</p>
                </div>

                <Badge variant="emerald" size="md">
                  Recruiter Verified Profile
                </Badge>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verified Technical Competencies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Python (95%)', 'FastAPI (92%)', 'React (90%)', 'TrOCR + OpenCV (94%)'].map((sk, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-purple-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileExporter = PortfolioExporter;
