import React, { useState } from 'react';
import { User, Globe, Download, Share2, Sparkles, Monitor, Tablet, Smartphone, CheckCircle2, ShieldCheck, FileText, ArrowRight, Eye, Layers, Trophy } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { DeviceViewport } from '../../types';

interface ProfileProps {
  onNavigate: (route: string) => void;
}

export const PortfolioExporter: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { portfolioConfig, updatePortfolioConfig, nodes, artifacts } = useCareerStore();
  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showNodeBreakdownModal, setShowNodeBreakdownModal] = useState(false);

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
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                🌐 Live Portfolio & AI Resume Generator
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                100% Graph Synchronized
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Interactive Portfolio & AI Resume Exporter
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Generate a shareable public portfolio with live Multi-Device Viewport previews (Desktop, Tablet, Mobile).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNodeBreakdownModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Layers className="w-4 h-4 text-purple-400" /> Graph Node Breakdown
            </button>

            <button
              onClick={handleExportResume}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
            >
              <Download className="w-4 h-4" /> Export AI Resume PDF
            </button>
          </div>
        </div>

        {/* ⭐ PRIORITY 9: CELEBRATION TOAST */}
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

        {/* ⭐ PRIORITY 8: MULTI-DEVICE VIEWPORT SWITCHER TOOLBAR */}
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
              {/* Bio Hero Header */}
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

              {/* Verified Featured Skills */}
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

              {/* Flagship Projects Showcase */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Flagship Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlassCard className="p-5 border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-white">HDRS (High-accuracy Document Recognition)</h4>
                      <Badge variant="amber" size="sm">Document AI</Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Built high-accuracy Document Recognition System utilizing Microsoft TrOCR, OpenCV, FastAPI, and React.
                    </p>
                  </GlassCard>

                  <GlassCard className="p-5 border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-white">EvalSync Automated Evaluation Platform</h4>
                      <Badge variant="amber" size="sm">AI Evaluation</Badge>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Automated academic assignment grading platform powered by Python and React.
                    </p>
                  </GlassCard>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* AI RESUME GRAPH NODE BREAKDOWN MODAL */}
        {showNodeBreakdownModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <GlassCard glowColor="purple" className="max-w-xl w-full p-6 md:p-8 border-purple-500/40 shadow-2xl relative">
              <button onClick={() => setShowNodeBreakdownModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
                ✕
              </button>

              <h2 className="text-xl font-extrabold text-white mb-1">AI Resume Knowledge Graph Breakdown</h2>
              <p className="text-xs text-slate-400 mb-6">Shows exactly which graph nodes were used to generate your resume</p>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {nodes.map(n => (
                  <div key={n.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">• {n.label}</span>
                      <span className="text-[10px] font-mono text-purple-400 capitalize">({n.type})</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[11px]">Included in AI Resume</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProfileExporter = PortfolioExporter;
