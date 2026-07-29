import React, { useState, useEffect } from 'react';
import { Search, Network, FileText, Calendar, Sparkles, Command, ArrowRight, Building2, Target, Upload } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from './GlassCard';

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
  const { nodes, artifacts, selectNode, selectDoc } = useCareerStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const matchingNodes = nodes.filter(n =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  const commandActions = [
    { label: 'Open Knowledge Graph Canvas', icon: Network, route: 'graph', badge: 'Canvas' },
    { label: 'Ask Digital Rishi (AI Twin)', icon: Sparkles, route: 'search', badge: 'AI Twin' },
    { label: 'Upload Document PDF', icon: Upload, route: 'upload', badge: 'OCR' },
    { label: 'Enterprise Recruiter Portal', icon: Building2, route: 'recruiter-portal', badge: 'Portal' },
    { label: 'Skill Analytics & JD Matcher', icon: Target, route: 'analytics', badge: 'Matcher' },
    { label: 'AI Story Timeline', icon: Calendar, route: 'timeline', badge: 'Story' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <GlassCard glowColor="purple" className="max-w-2xl w-full p-6 border-purple-500/40 shadow-2xl space-y-4 relative border-2">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
          ✕
        </button>

        {/* Command Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-purple-400 absolute left-4 top-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search nodes, docs, skills..."
            className="w-full pl-12 pr-16 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
          />
          <kbd className="absolute right-4 top-3.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-white/10 text-slate-300 rounded border border-white/10">
            Ctrl+K
          </kbd>
        </div>

        {/* Quick Command Actions */}
        {!query && (
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Quick Command Palette Actions:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {commandActions.map((cmd, idx) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onClose();
                      onNavigate(cmd.route);
                    }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 text-xs font-bold text-slate-200 hover:text-purple-300 transition-all flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span>{cmd.label}</span>
                    </div>
                    <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                      {cmd.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Matching Search Results */}
        {query && (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Matching Graph Entities ({matchingNodes.length}):
            </div>
            {matchingNodes.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  selectNode(n.id);
                  onClose();
                  onNavigate('graph');
                }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 text-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <span>• {n.label}</span>
                  <span className="text-[10px] font-mono text-purple-400 capitalize">({n.type})</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};
