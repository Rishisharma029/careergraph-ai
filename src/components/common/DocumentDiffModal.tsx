import React from 'react';
import { FileText, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface DocumentDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentDiffModal: React.FC<DocumentDiffModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const diffData = {
    doc1Name: 'Rishi_Sharma_Resume_v1_2024.pdf',
    doc2Name: 'Rishi_Sharma_Resume_v2_2026.pdf',
    addedSkills: ['Microsoft TrOCR', 'OpenCV', 'FastAPI Async', 'AWS Certified Cloud Practitioner', 'Vector Search'],
    removedSkills: ['Generic HTML', 'Basic Scripting'],
    improvedMatchScore: '+14% Match Increase',
    roleBefore: '82% Match (Junior Dev)',
    roleAfter: '96% Match (Full-Stack AI Engineer)',
    extractedProjectsAdded: ['HDRS Document AI Suite (99.4% Accuracy)', 'EvalSync Evaluation Platform']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard glowColor="cyan" className="max-w-2xl w-full p-6 md:p-8 border-cyan-500/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="emerald" size="sm">
                ⭐ Live Document Diff Engine
              </Badge>
              <span className="text-xs font-mono text-emerald-400 font-bold">{diffData.improvedMatchScore}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Resume v1 vs Resume v2 Comparison</h2>
          </div>
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 opacity-80">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">PREVIOUS REVISION (v1)</div>
            <h4 className="text-xs font-extrabold text-slate-300">{diffData.doc1Name}</h4>
            <div className="text-xs text-amber-400 font-mono font-bold">{diffData.roleBefore}</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 shadow-glow-emerald">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">CURRENT REVISION (v2)</div>
            <h4 className="text-xs font-extrabold text-white">{diffData.doc2Name}</h4>
            <div className="text-xs text-emerald-300 font-mono font-bold">{diffData.roleAfter}</div>
          </div>
        </div>

        {/* Added & Removed Breakdown */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Competencies Added (+{diffData.addedSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {diffData.addedSkills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  + {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Outdated Tags Stripped (-{diffData.removedSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {diffData.removedSkills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold line-through">
                  - {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
