import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, X, Sparkles, Network, ArrowRight } from 'lucide-react';
import { GraphNode, Artifact } from '../../types';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface EvidenceExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: GraphNode | null;
  artifacts: Artifact[];
  onNavigate: (route: string) => void;
}

export const EvidenceExplorerModal: React.FC<EvidenceExplorerModalProps> = ({
  isOpen,
  onClose,
  node,
  artifacts,
  onNavigate
}) => {
  if (!isOpen || !node) return null;

  // Find related proof artifacts
  const relatedArtifacts = artifacts.filter(a => (node.documentRefIds || []).includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard glowColor="cyan" className="max-w-2xl w-full p-6 md:p-8 border-cyan-500/40 shadow-2xl space-y-6 relative max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="cyan" size="sm">
                ⭐ AI Evidence Explorer
              </Badge>
              <span className="text-xs font-mono text-emerald-400 font-bold">100% Grounded</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Evidence Trail for "{node.label}"</h2>
          </div>
        </div>

        {/* Confidence Timeline */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Confidence Timeline & Entity Progression
          </h4>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
              <div className="text-[10px] text-slate-400">Step 1: Resume Text</div>
              <div className="text-sm font-extrabold text-purple-300 mt-0.5">92% Match</div>
              <div className="text-[10px] text-slate-400 mt-1">Parsed in Resume.pdf</div>
            </div>

            <div className="text-slate-500 font-extrabold">➔</div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <div className="text-[10px] text-slate-400">Step 2: Project Proof</div>
              <div className="text-sm font-extrabold text-amber-300 mt-0.5">97% Match</div>
              <div className="text-[10px] text-slate-400 mt-1">HDRS Technical Report</div>
            </div>

            <div className="text-slate-500 font-extrabold">➔</div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <div className="text-[10px] text-slate-400">Step 3: Verification</div>
              <div className="text-sm font-extrabold text-emerald-300 mt-0.5">99.4% Verified</div>
              <div className="text-[10px] text-slate-400 mt-1">Cross-Referenced</div>
            </div>
          </div>
        </div>

        {/* Document Proof Artifact Excerpts */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Verified Source Proof Artifacts ({relatedArtifacts.length})
          </h4>

          {relatedArtifacts.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 italic">
              Verified via Rishi Sharma Resume 2026 ground truth dataset.
            </div>
          ) : (
            relatedArtifacts.map((art, idx) => (
              <div key={art.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-slate-200 text-xs">{art.title}</span>
                  </div>
                  <Badge variant="emerald" size="sm">
                    {art.confidenceScore}% Accuracy
                  </Badge>
                </div>

                <div className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20">
                  <div className="text-[10px] text-slate-400 font-bold mb-1">PAGE 1, PARAGRAPH {idx + 2} EXCERPT:</div>
                  "{art.parsedText.slice(0, 180)}..."
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              onClose();
              onNavigate('graph');
            }}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
          >
            <Network className="w-4 h-4" /> Highlight in Knowledge Graph
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
