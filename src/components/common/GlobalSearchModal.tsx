import React, { useState, useEffect } from 'react';
import { Search, X, Network, FileText, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { Badge } from './Badge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const { nodes, artifacts, milestones, selectNode, selectDoc } = useCareerStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from navbar
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredNodes = query.trim()
    ? nodes.filter(n => n.label.toLowerCase().includes(query.toLowerCase()) || n.type.toLowerCase().includes(query.toLowerCase()))
    : nodes.slice(0, 4);

  const filteredDocs = query.trim()
    ? artifacts.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))
    : artifacts.slice(0, 3);

  const filteredMilestones = query.trim()
    ? milestones.filter(m => m.title.toLowerCase().includes(query.toLowerCase()) || m.organization.toLowerCase().includes(query.toLowerCase()))
    : milestones.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, projects, certificates, documents, or roles (Cmd+K)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-sm font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Nodes / Skills Section */}
          {filteredNodes.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-indigo-400" />
                Knowledge Graph Entities ({filteredNodes.length})
              </div>
              <div className="space-y-1">
                {filteredNodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => {
                      selectNode(node.id);
                      onNavigate('graph');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:border-indigo-500/40">
                        <Network className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-indigo-300">
                          {node.label}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span className="capitalize">{node.type}</span>
                          {node.level && <span>• {node.level}</span>}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-indigo-400 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Artifacts Section */}
          {filteredDocs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Verified Artifacts ({filteredDocs.length})
              </div>
              <div className="space-y-1">
                {filteredDocs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      selectDoc(doc.id);
                      onNavigate('documents');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:border-cyan-500/40">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-cyan-300">
                          {doc.title}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span>{doc.category}</span>
                          <span>• {doc.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                      {doc.confidenceScore}% Verified
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milestones Section */}
          {filteredMilestones.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                Career Milestones
              </div>
              <div className="space-y-1">
                {filteredMilestones.map(ms => (
                  <button
                    key={ms.id}
                    onClick={() => {
                      onNavigate('timeline');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-purple-300">
                          {ms.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          {ms.organization} ({ms.year})
                        </div>
                      </div>
                    </div>
                    {ms.impactMetric && (
                      <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        {ms.impactMetric}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Navigate with arrow keys</span>
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
