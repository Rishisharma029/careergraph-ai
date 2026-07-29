import React from 'react';
import { Settings, ShieldCheck, Cpu, Sparkles, RefreshCw, Key, Database, Info, Award } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface SettingsProps {
  onNavigate: (route: string) => void;
}

export const SettingsPage: React.FC<SettingsProps> = ({ onNavigate }) => {
  const { loadSampleData } = useCareerStore();

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header (⭐ Priority 10: Scaled Down Heading) */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ⚙️ Engine Settings & Metadata
            </span>
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
              System v1.0.0
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            System Settings & Engine Configurations
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure entity extraction parameters, Microsoft TrOCR OCR engine options, and reset data stores.
          </p>
        </div>

        {/* ⭐ PRIORITY 6: VERSION IN SETTINGS */}
        <GlassCard glowColor="purple" className="p-6 md:p-8 border-purple-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">CareerGraph AI Application Metadata</h3>
                <p className="text-xs text-purple-300 font-mono">v1.0.0 — Hackathon Masterclass Edition</p>
              </div>
            </div>
            <Badge variant="purple" size="md">
              Release Build v1.0.0
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span>Frontend Architecture:</span>
              <span className="text-purple-300 font-bold">Vite 6 + React + TypeScript</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span>OCR & Extraction Engine:</span>
              <span className="text-cyan-300 font-bold">Microsoft TrOCR + OpenCV</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span>Knowledge Graph Engine:</span>
              <span className="text-emerald-300 font-bold">Root-Based Whitelisted Graph</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span>RAG Q&A Engine:</span>
              <span className="text-amber-300 font-bold">Token-by-Token Streaming RAG</span>
            </div>
          </div>
        </GlassCard>

        {/* Reset Store Action */}
        <GlassCard glowColor="purple" className="p-6 border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white">Reset Knowledge Graph & Proof Data</h3>
              <p className="text-xs text-slate-400">Restore initial Rishi Sharma verified sample dataset and purge custom overlays.</p>
            </div>

            <button
              onClick={() => {
                loadSampleData();
                onNavigate('graph');
              }}
              className="px-4 py-2 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-2 transition-all shadow-glow-amber"
            >
              <RefreshCw className="w-4 h-4" /> Reset Sample Dataset
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
