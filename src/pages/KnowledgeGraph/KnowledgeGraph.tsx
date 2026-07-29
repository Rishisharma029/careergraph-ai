import React, { useState } from 'react';
import { Network, Play, Pause, ZoomIn, ZoomOut, RotateCcw, Filter, Sparkles, ShieldCheck, FileText, ArrowRight, X, Search, Calendar, Zap, User, FolderGit2, GraduationCap, Award, CheckCircle2, ChevronDown, ChevronRight, Layers, Eye, RefreshCw, HelpCircle, Box, Users, Film, Pin } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GraphNode, NodeType, NodeImportance } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { EvidenceExplorerModal } from '../../components/common/EvidenceExplorerModal';
import { VoiceAISimulator } from '../../components/common/VoiceAISimulator';
import { RecruiterPlaybackModal } from '../../components/common/RecruiterPlaybackModal';
import { graphService, Teammate } from '../../services/graphService';

interface KnowledgeGraphProps {
  onNavigate: (route: string) => void;
}

export const KnowledgeGraphCanvas: React.FC<KnowledgeGraphProps> = ({ onNavigate }) => {
  const { nodes, artifacts, selectedNodeId, selectNode, sendChatMessage, filterTimelineByNode, highlightedNodeIds, selectDocAndHighlightGraph, selectDoc, milestones, loadSampleData } = useCareerStore();

  const [filterType, setFilterType] = useState<NodeType | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [progressiveMode, setProgressiveMode] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [evolutionYear, setEvolutionYear] = useState<number>(2026);
  const [pinnedNodeIds, setPinnedNodeIds] = useState<string[]>([]);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isPlaybackModalOpen, setIsPlaybackModalOpen] = useState(false);
  const [expandedHubIds, setExpandedHubIds] = useState<string[]>(['node-root-user', 'hub-projects', 'hub-certs', 'node-python', 'hub-edu']);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Fallback to initial nodes if empty
  const activeStoreNodes = (nodes && nodes.length > 0) ? nodes : [];

  const cleanNodes = activeStoreNodes.filter(n => {
    if (n.label === 'TrOCR' || n.label === 'OpenCV') return false;
    return true;
  });

  const selectedNode = cleanNodes.find(n => n.id === selectedNodeId) || cleanNodes.find(n => n.id === 'node-root-user') || cleanNodes[0];

  const togglePinNode = (id: string) => {
    setPinnedNodeIds(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const filteredNodes = cleanNodes.filter(n => {
    const matchesFilter = filterType === 'all' || n.type === filterType;
    const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
    const nodeYear = parseInt(n.year || '2026');
    const matchesEvolution = nodeYear <= evolutionYear || n.type === 'root' || n.type === 'category_hub';

    if (progressiveMode && n.parentId && !expandedHubIds.includes(n.parentId)) {
      return false;
    }

    return matchesFilter && matchesSearch && matchesEvolution;
  });

  const teammates: Teammate[] = selectedNode ? graphService.getTeammatesForProject(selectedNode.label) : [];

  const nodeColorStyles: Record<NodeType, { bg: string; border: string; text: string; aura: string; badge: string; icon: string }> = {
    root: {
      bg: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white',
      border: 'border-cyan-400',
      text: 'text-white font-extrabold',
      aura: 'shadow-[0_0_35px_rgba(99,102,241,0.7)] ring-4 ring-cyan-400/50',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      icon: '👤'
    },
    category_hub: {
      bg: 'bg-slate-900/90',
      border: 'border-purple-500/50',
      text: 'text-slate-100 font-extrabold',
      aura: 'shadow-glow-purple',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: '📁'
    },
    skill: {
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/60',
      text: 'text-purple-300',
      aura: 'node-aura-purple',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: '🟣'
    },
    education: {
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/60',
      text: 'text-emerald-300',
      aura: 'node-aura-emerald',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: '🟢'
    },
    role: {
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/60',
      text: 'text-amber-300',
      aura: 'node-aura-amber',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: '🟡'
    },
    certificate: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500/60',
      text: 'text-cyan-300',
      aura: 'node-aura-cyan',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      icon: '🔵'
    },
    project: {
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/60',
      text: 'text-orange-300',
      aura: 'node-aura-orange',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/20',
      icon: '🟠'
    }
  };

  const getNodeSizeClass = (importance: NodeImportance = 'medium', type: NodeType) => {
    if (type === 'root') return 'px-6 py-3.5 text-base font-extrabold rounded-3xl';
    if (type === 'category_hub') return 'px-5 py-2.5 text-xs font-extrabold rounded-2xl';

    switch (importance) {
      case 'large':
        return 'px-5 py-3 text-xs font-extrabold shadow-glow-purple scale-105';
      case 'small':
        return 'px-2.5 py-1.5 text-[11px] font-semibold opacity-90';
      case 'medium':
      default:
        return 'px-3.5 py-2 text-xs font-bold';
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-[#09090b] overflow-hidden flex flex-col selection:bg-indigo-500/30">
      {/* Top Toolbar */}
      <div className="z-20 p-4 bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
            <Filter className="w-4 h-4 text-purple-400" /> Filter:
          </div>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-glow-purple'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('skill')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterType === 'skill'
                ? 'bg-purple-500 text-white shadow-glow-purple'
                : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
            }`}
          >
            🟣 Skills
          </button>
          <button
            onClick={() => setFilterType('project')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterType === 'project'
                ? 'bg-orange-500 text-white shadow-glow-amber'
                : 'bg-orange-500/10 text-orange-300 border border-orange-500/20'
            }`}
          >
            🟠 Projects
          </button>
        </div>

        {/* Recruiter Story Auto-Play & 3D */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaybackModalOpen(true)}
            className="px-3.5 py-1.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold flex items-center gap-1.5 shadow-glow-amber transition-all"
          >
            <Film className="w-4 h-4 text-amber-400" /> ▶ Recruiter Auto-Play
          </button>

          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all border ${
              is3DMode
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white border-cyan-400 shadow-glow-cyan'
                : 'bg-white/5 text-slate-300 border-white/10'
            }`}
          >
            <Box className="w-4 h-4 text-cyan-400" />
            <span>{is3DMode ? '🌌 3D Orbital Graph' : '2D Graph View'}</span>
          </button>
        </div>

        {/* Search & Zoom */}
        <div className="flex items-center gap-2">
          <div className="relative w-36">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find node..."
              className="w-full pl-8 pr-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))} className="p-1.5 text-slate-400 hover:text-slate-200">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))} className="p-1.5 text-slate-400 hover:text-slate-200">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className={`relative flex-1 bg-[#09090b] overflow-hidden cursor-grab active:cursor-grabbing ${is3DMode ? 'perspective-1000' : ''}`}>
        {/* ⭐ EDGE TRACING ANIMATION CONNECTIONS */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {filteredNodes.map(sourceNode =>
            (sourceNode.connections || []).map(conn => {
              const targetNode = cleanNodes.find(n => n.id === conn.targetId);
              if (!targetNode) return null;

              const isHighlighted = selectedNodeId === sourceNode.id || selectedNodeId === targetNode.id || hoveredNodeId === sourceNode.id || hoveredNodeId === targetNode.id || highlightedNodeIds.includes(sourceNode.id);

              return (
                <line
                  key={`${sourceNode.id}-${targetNode.id}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? '#a855f7' : 'rgba(168, 85, 247, 0.25)'}
                  strokeWidth={isHighlighted ? 3.5 : 1.5}
                  className={isHighlighted ? 'edge-flow-animated' : ''}
                />
              );
            })
          )}
        </svg>

        {/* Nodes Canvas */}
        <div
          className={`absolute inset-0 transition-transform duration-300 ${is3DMode ? 'rotate-x-12 scale-105' : ''}`}
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {filteredNodes.map((node, idx) => {
            const style = nodeColorStyles[node.type];
            const sizeClass = getNodeSizeClass(node.importance, node.type);
            const isSelected = selectedNodeId === node.id || highlightedNodeIds.includes(node.id);
            const isPinned = pinnedNodeIds.includes(node.id);

            return (
              <div
                key={node.id}
                onClick={() => selectNode(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  animationDelay: `${idx * 70}ms`
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border backdrop-blur-2xl transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-2 ${
                  style.bg
                } ${style.border} ${sizeClass} ${
                  isSelected ? `${style.aura} scale-110 border-purple-400 z-30 ring-4 ring-purple-400/60` : 'hover:scale-105 z-10'
                } ${isPinned ? 'ring-2 ring-amber-400' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">{style.icon}</span>
                  <span className={`font-extrabold ${style.text}`}>{node.label}</span>
                  {isPinned && <Pin className="w-3 h-3 text-amber-400 shrink-0 fill-amber-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Drawer */}
      {selectedNode && (
        <div className="absolute right-4 top-20 bottom-4 w-96 z-30 animate-in slide-in-from-right duration-300">
          <GlassCard glowColor="purple" className="h-full flex flex-col justify-between p-6 overflow-y-auto border-purple-500/40 shadow-2xl space-y-5">
            <div className="space-y-5">
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedNode.label}</h3>
                  <span className="text-xs text-purple-300 font-mono">Grounded Node Entity</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePinNode(selectedNode.id)}
                    className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                      pinnedNodeIds.includes(selectedNode.id)
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                    }`}
                    title="Pin Node on Canvas"
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button onClick={() => selectNode(null)} className="p-1 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Collaborative Teammates Overlap */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" /> Collaborative Teammates ({teammates.length})
                </div>
                {teammates.map(tm => (
                  <div key={tm.id} className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-extrabold flex items-center justify-center text-[10px]">
                        {tm.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white">{tm.name}</div>
                        <div className="text-[10px] text-slate-400">{tm.role}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">Shared Node</span>
                  </div>
                ))}
              </div>

              {/* Evidence Explorer Button */}
              <button
                onClick={() => setIsEvidenceModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-glow-cyan"
              >
                <ShieldCheck className="w-4 h-4" /> Open Full Evidence Explorer
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Modals */}
      <EvidenceExplorerModal isOpen={isEvidenceModalOpen} onClose={() => setIsEvidenceModalOpen(false)} node={selectedNode} artifacts={artifacts} onNavigate={onNavigate} />
      <RecruiterPlaybackModal isOpen={isPlaybackModalOpen} onClose={() => setIsPlaybackModalOpen(false)} onNavigate={onNavigate} />
    </div>
  );
};
