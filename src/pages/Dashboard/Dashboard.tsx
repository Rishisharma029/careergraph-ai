import React, { useState } from 'react';
import { Network, Calendar, Upload, FileText, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Eye, Flame, Award, HelpCircle, Film, Target, User, Building2, TrendingUp } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { DemoTourModal } from '../../components/common/DemoTourModal';
import { CareerMovieReplay } from '../../components/common/CareerMovieReplay';
import { DocumentDiffModal } from '../../components/common/DocumentDiffModal';
import { LearningPlannerModal } from '../../components/common/LearningPlannerModal';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { nodes, artifacts, milestones } = useCareerStore();
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                🚀 Welcome Back, Rishi Sharma
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Enterprise SaaS v3 Synced
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Executive Career Intelligence Hub
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Your central AI control system mapping document artifacts into an interactive career operating engine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsDiffOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 border border-cyan-500/40 shadow-glow-cyan transition-all"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Resume v1 vs v2 Diff
            </button>

            <button
              onClick={() => setIsPlannerOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-1.5 border border-purple-500/40 shadow-glow-purple transition-all"
            >
              <Target className="w-4 h-4 text-purple-400" /> AI Skill Roadmap
            </button>

            <button
              onClick={() => setIsMovieOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 shadow-glow-amber transition-all"
            >
              <Film className="w-4 h-4 text-amber-400" /> Play Story Movie
            </button>

            <button
              onClick={() => onNavigate('upload')}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
            >
              <Upload className="w-4 h-4" /> Upload PDF
            </button>
          </div>
        </div>

        {/* Top 4 Metric Cards */}
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
              <span>Neo4j Graph Database</span>
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
            onClick={() => onNavigate('recruiter-portal')}
            glowColor="emerald"
            className="p-6 space-y-2 border-emerald-500/30 hover:-translate-y-1 hover:scale-[1.01] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>RECRUITER PORTAL</span>
              <Building2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">96%</div>
            <div className="text-xs text-emerald-300 font-medium flex items-center justify-between">
              <span>Enterprise Candidate Match</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </GlassCard>
        </div>

        {/* OPERATING SYSTEM ACTION HIGHLIGHT HUB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <GlassCard
            onClick={() => onNavigate('search')}
            glowColor="purple"
            className="p-6 border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Digital Career Twin</h3>
                  <p className="text-xs text-purple-300">Ask Digital Rishi persona</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('recruiter-portal')}
            glowColor="emerald"
            className="p-6 border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Recruiter Portal</h3>
                  <p className="text-xs text-emerald-300">Shortlist candidates & match JDs</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400" />
            </div>
          </GlassCard>

          <GlassCard
            onClick={() => onNavigate('analytics')}
            glowColor="cyan"
            className="p-6 border-cyan-500/30 hover:border-cyan-500/50 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">AI JD Matcher</h3>
                  <p className="text-xs text-cyan-300">Calculate role match & interview %</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400" />
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
          </div>
        </GlassCard>
      </div>

      {/* Modals */}
      <DemoTourModal isOpen={isDemoTourOpen} onClose={() => setIsDemoTourOpen(false)} onNavigate={onNavigate} />
      <CareerMovieReplay isOpen={isMovieOpen} onClose={() => setIsMovieOpen(false)} onNavigate={onNavigate} />
      <DocumentDiffModal isOpen={isDiffOpen} onClose={() => setIsDiffOpen(false)} />
      <LearningPlannerModal isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
    </div>
  );
};
