import React, { useState } from 'react';
import { Network, Calendar, Upload, FileText, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Eye, Flame, Award, HelpCircle } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { DemoTourModal } from '../../components/common/DemoTourModal';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { nodes, artifacts, milestones } = useCareerStore();
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header (⭐ Priority 10: Scaled Down Heading) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                🚀 Welcome Back, Rishi Sharma
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Knowledge Graph 100% Synced
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Executive Career Intelligence Hub
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Your central control dashboard mapping document artifacts into an interactive career knowledge graph.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs flex items-center gap-2 border border-white/10 transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-400" /> Start 30s Guided Tour
            </button>

            <button
              onClick={() => onNavigate('upload')}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
            >
              <Upload className="w-4 h-4" /> Upload Document PDF
            </button>
          </div>
        </div>

        {/* ⭐ PRIORITY 1: CLICKABLE DASHBOARD METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <GlassCard
            onClick={() => onNavigate('graph')}
            glowColor="purple"
            className="p-6 space-y-2 border-purple-500/30 hover:-translate-y-1 hover:scale-[1.01] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>EXPLORABLE NODES</span>
              <Network className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{nodes.length}</div>
            <div className="text-xs text-purple-300 font-medium flex items-center justify-between">
              <span>100% Unique Entities</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('documents')}
            glowColor="cyan"
            className="p-6 space-y-2 border-cyan-500/30 hover:-translate-y-1 hover:scale-[1.01] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>VERIFIED PROOF DOCS</span>
              <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{artifacts.length}</div>
            <div className="text-xs text-cyan-300 font-medium flex items-center justify-between">
              <span>99% OCR TrOCR Accuracy</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('timeline')}
            glowColor="amber"
            className="p-6 space-y-2 border-amber-500/30 hover:-translate-y-1 hover:scale-[1.01] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>STORY MILESTONES</span>
              <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{milestones.length}</div>
            <div className="text-xs text-amber-300 font-medium flex items-center justify-between">
              <span>2023 ➔ 2026 Timeline Stream</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('analytics')}
            glowColor="emerald"
            className="p-6 space-y-2 border-emerald-500/30 hover:-translate-y-1 hover:scale-[1.01] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>ROLE MATCH SCORE</span>
              <Award className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">94%</div>
            <div className="text-xs text-emerald-300 font-medium flex items-center justify-between">
              <span>Full-Stack AI Engineer Role</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </GlassCard>
        </div>

        {/* TODAY'S CAREER INTELLIGENCE SUGGESTIONS WIDGET */}
        <GlassCard glowColor="purple" className="p-6 md:p-8 border-purple-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Today's Career Intelligence Suggestions</h3>
                <p className="text-xs text-slate-400">Automated recommendations to reach 100% role alignment</p>
              </div>
            </div>
            <Badge variant="purple" size="md">
              4 Action Items
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-200">Acquire Kubernetes Credential</h4>
                <p className="text-xs text-slate-400">You are 1 skill away from reaching 100% role match for Full-Stack AI Engineer.</p>
                <button onClick={() => onNavigate('analytics')} className="text-xs text-purple-300 font-bold hover:underline">
                  View Skill Gaps →
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-200">Resume Updated & Verified</h4>
                <p className="text-xs text-slate-400">Rishi_Sharma_Resume_2026.pdf parsed with 99% TrOCR confidence score.</p>
                <button onClick={() => onNavigate('documents')} className="text-xs text-emerald-300 font-bold hover:underline">
                  Open Documents Hub →
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-200">Portfolio Viewed 4 Times Today</h4>
                <p className="text-xs text-slate-400">Recruiters inspected your interactive graph and HDRS project details.</p>
                <button onClick={() => onNavigate('profile')} className="text-xs text-cyan-300 font-bold hover:underline">
                  Preview Portfolio →
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-200">Missing Internship Recommendation Letter</h4>
                <p className="text-xs text-slate-400">Upload your internship proof to unlock 100% verified work credentials.</p>
                <button onClick={() => onNavigate('upload')} className="text-xs text-amber-300 font-bold hover:underline">
                  Upload Internship Letter →
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Quick Route Navigation Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <GlassCard
            onClick={() => onNavigate('graph')}
            className="p-6 border-white/10 hover:border-purple-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 group-hover:scale-110 transition-all">
                <Network className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Explorable Knowledge Graph</h3>
              <p className="text-xs text-slate-400 mt-1">Interactive Root-based graph hierarchy with progressive revelation.</p>
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('timeline')}
            className="p-6 border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:scale-110 transition-all">
                <Calendar className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">AI Story & Timeline</h3>
              <p className="text-xs text-slate-400 mt-1">Chronological story narrative from college enrollment (2023) to HDRS (2026).</p>
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('search')}
            className="p-6 border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 group-hover:scale-110 transition-all">
                <Sparkles className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">AI Search & Q&A Engine</h3>
              <p className="text-xs text-slate-400 mt-1">Token-by-token streaming responses backed by document evidence citations.</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Guided Tour Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
