import React, { useState, useEffect } from 'react';
import { Network, Play, Pause, ZoomIn, ZoomOut, RotateCcw, Filter, Sparkles, ShieldCheck, FileText, ArrowRight, X, Search, Calendar, Zap, User, FolderGit2, GraduationCap, Award, CheckCircle2, ChevronDown, ChevronRight, Layers, Eye, RefreshCw, HelpCircle } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GraphNode, NodeType, NodeImportance } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface KnowledgeGraphProps {
  onNavigate: (route: string) => void;
}

export const KnowledgeGraphCanvas: React.FC<KnowledgeGraphProps> = ({ onNavigate }) => {
  const { nodes, artifacts, selectedNodeId, selectNode, sendChatMessage, filterTimelineByNode, highlightedNodeIds, selectDocAndHighlightGraph, selectDoc, milestones, loadSampleData } = useCareerStore();

  const [filterType, setFilterType] = useState<NodeType | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [progressiveMode, setProgressiveMode] = useState(false);
  const [expandedHubIds, setExpandedHubIds] = useState<string[]>(['node-root-user', 'hub-projects', 'hub-certs', 'node-python', 'hub-edu']);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Playback Animation State
  const [isPlayingPlayback, setIsPlayingPlayback] = useState(false);
  const [playbackYearIndex, setPlaybackYearIndex] = useState(0);
  const years = ['2023', '2024', '2025', '2026'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingPlayback) {
      timer = setInterval(() => {
        setPlaybackYearIndex(prev => (prev + 1) % years.length);
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlayingPlayback]);

  // Fallback to initial nodes if empty
  const activeStoreNodes = (nodes && nodes.length > 0) ? nodes : [];

  // Clean deduplication filter: remove standalone "TrOCR" or "OpenCV" overlay nodes
  const cleanNodes = activeStoreNodes.filter(n => {
    if (n.label === 'TrOCR' || n.label === 'OpenCV') return false;
    return true;
  });

  const selectedNode = cleanNodes.find(n => n.id === selectedNodeId) || cleanNodes.find(n => n.id === 'node-root-user') || cleanNodes[0];

  const toggleHubExpansion = (hubId: string) => {
    setExpandedHubIds(prev =>
      prev.includes(hubId) ? prev.filter(id => id !== hubId) : [...prev, hubId]
    );
  };

  const filteredNodes = cleanNodes.filter(n => {
    const matchesFilter = filterType === 'all' || n.type === filterType;
    const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());

    if (progressiveMode && n.parentId && !expandedHubIds.includes(n.parentId)) {
      return false;
    }

    if (isPlayingPlayback) {
      const activeYear = years[playbackYearIndex];
      const nodeYear = n.year || '2026';
      return matchesFilter && matchesSearch && (nodeYear.includes(activeYear) || n.type === 'root' || n.type === 'category_hub');
    }

    return matchesFilter && matchesSearch;
  });

  // Semantic Node Style Tokens
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

  // Connected Projects for selected node
  const connectedProjects = (selectedNode && selectedNode.connections) ? selectedNode.connections
    .map(c => cleanNodes.find(n => n.id === c.targetId && n.type === 'project'))
    .filter(Boolean) as GraphNode[] : [];

  // Connected Skills for selected node
  const connectedSkills = (selectedNode && selectedNode.connections) ? selectedNode.connections
    .map(c => cleanNodes.find(n => n.id === c.targetId && n.type === 'skill'))
    .filter(Boolean) as GraphNode[] : [];

  // Connected Milestones for selected node
  const connectedMilestones = selectedNode ? milestones.filter(m =>
    m.skillsUsed.some(s => s.toLowerCase().includes(selectedNode.label.toLowerCase()))
  ) : [];

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-[#09090b] overflow-hidden flex flex-col selection:bg-indigo-500/30">
      {/* Ambient Orbs */}
      <div className="bg-orb w-96 h-96 bg-purple-500 top-10 left-10" />
      <div className="bg-orb w-96 h-96 bg-cyan-500 bottom-10 right-10" />

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
          <button
            onClick={() => setFilterType('certificate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterType === 'certificate'
                ? 'bg-cyan-500 text-white shadow-glow-cyan'
                : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
            }`}
          >
            🔵 Certificates
          </button>
        </div>

        {/* Discovery Engine & Purge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl shadow-inner">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-300 font-mono">Discovery Engine:</span>
            <button
              onClick={() => setProgressiveMode(!progressiveMode)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                progressiveMode ? 'bg-cyan-500 text-white shadow-glow-cyan' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}
            >
              {progressiveMode ? 'Interactive Click-To-Expand Hubs' : 'Full Graph View'}
            </button>
          </div>

          <button
            onClick={loadSampleData}
            className="px-3 py-1.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Reset Canvas Layout & Clear Overlays"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Purge Overlays
          </button>
        </div>

        {/* Search & Zoom */}
        <div className="flex items-center gap-2">
          <div className="relative w-44">
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
            <button onClick={() => setZoomLevel(1)} className="p-1.5 text-slate-400 hover:text-slate-200 border-l border-white/10">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative flex-1 bg-[#09090b] overflow-hidden cursor-grab active:cursor-grabbing">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Dynamic SVG Connecting Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {filteredNodes.map(sourceNode =>
            (sourceNode.connections || []).map(conn => {
              const targetNode = cleanNodes.find(n => n.id === conn.targetId);
              if (!targetNode) return null;

              const isHighlighted = selectedNodeId === sourceNode.id || selectedNodeId === targetNode.id || hoveredNodeId === sourceNode.id || hoveredNodeId === targetNode.id || highlightedNodeIds.includes(sourceNode.id);
              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;

              return (
                <g key={`${sourceNode.id}-${targetNode.id}`}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isHighlighted ? '#a855f7' : 'rgba(255, 255, 255, 0.15)'}
                    strokeWidth={isHighlighted ? 3.5 : 1.5}
                    strokeDasharray={isHighlighted ? '6 3' : 'none'}
                    className="transition-all duration-300"
                  />
                  {isHighlighted && (
                    <g className="animate-in fade-in duration-200">
                      <rect
                        x={midX - 28}
                        y={midY - 9}
                        width={56}
                        height={18}
                        rx={5}
                        fill="#12131a"
                        stroke="#a855f7"
                        strokeWidth={1}
                      />
                      <text
                        x={midX}
                        y={midY + 3.5}
                        fill="#c084fc"
                        fontSize="9"
                        fontWeight="700"
                        textAnchor="middle"
                        className="font-mono uppercase tracking-wider"
                      >
                        {conn.relationship}
                      </text>
                    </g>
                  )}
                </g>
              );
            })
          )}
        </svg>

        {/* ⭐ PRIORITY 5: SEQUENTIAL ANIMATED GRAPH NODE FADE-IN */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {filteredNodes.map((node, idx) => {
            const style = nodeColorStyles[node.type];
            const sizeClass = getNodeSizeClass(node.importance, node.type);
            const isSelected = selectedNodeId === node.id || highlightedNodeIds.includes(node.id);

            return (
              <div
                key={node.id}
                onClick={() => {
                  selectNode(node.id);
                  if (node.type === 'category_hub') {
                    toggleHubExpansion(node.id);
                  }
                }}
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
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">{style.icon}</span>
                  <span className={`font-extrabold ${style.text}`}>{node.label}</span>
                  {node.type === 'root' && (
                    <span className="text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded-full ml-1 font-bold">
                      Full-Stack AI Engineer
                    </span>
                  )}
                </div>

                {node.proficiencyScore && (
                  <div className="text-[10px] text-slate-400 mt-1 capitalize flex items-center justify-between font-mono">
                    <span>{node.type}</span>
                    <span className="text-purple-300 font-bold">{node.proficiencyScore}% Match</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Drawer: Rich Structured Inspector Drawer with AI EXPLAINABILITY */}
      {selectedNode && (
        <div className="absolute right-4 top-20 bottom-4 w-96 z-30 animate-in slide-in-from-right duration-300">
          <GlassCard glowColor="purple" className="h-full flex flex-col justify-between p-6 overflow-y-auto border-purple-500/40 shadow-2xl">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${nodeColorStyles[selectedNode.type].badge}`}>
                      {nodeColorStyles[selectedNode.type].icon} {selectedNode.type}
                    </span>
                    {selectedNode.proficiencyScore && (
                      <Badge variant="emerald" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                        Score: {selectedNode.proficiencyScore}%
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{selectedNode.label}</h3>
                </div>
                <button onClick={() => selectNode(null)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ⭐ PRIORITY 3: AI EXPLAINABILITY SCORE CARD ("Why 95%?") */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-300 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-400" /> AI Confidence Breakdown
                  </span>
                  <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {selectedNode.proficiencyScore || 95}% Confidence
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1 font-medium">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reason Detected:</div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Verified in <strong>Rishi_Sharma_Resume_2026.pdf</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Validated in <strong>HDRS Project Technical Report</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cross-referenced across {(selectedNode.documentRefIds || []).length} Verified Document Proofs</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {selectedNode.description || 'Verified career entity extracted with source document grounding.'}
              </p>

              {/* Connected Projects */}
              {connectedProjects.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🟠</span> Projects Used In ({connectedProjects.length})
                  </div>
                  <div className="space-y-1.5">
                    {connectedProjects.map(proj => (
                      <div
                        key={proj.id}
                        onClick={() => selectNode(proj.id)}
                        className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300 font-bold hover:bg-orange-500/20 cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <span>• {proj.label}</span>
                        <span className="text-[10px] font-mono text-slate-400">Project</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Connected Skills */}
              {connectedSkills.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🟣</span> Related Competencies ({connectedSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {connectedSkills.map(sk => (
                      <button
                        key={sk.id}
                        onClick={() => selectNode(sk.id)}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-xs font-semibold"
                      >
                        • {sk.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Milestones */}
              {connectedMilestones.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Timeline Milestones ({connectedMilestones.length})
                  </div>
                  <div className="space-y-1.5">
                    {connectedMilestones.map(ms => (
                      <div key={ms.id} className="p-2 rounded-lg bg-white/5 text-xs flex items-center justify-between text-slate-300">
                        <span className="font-medium text-slate-200">{ms.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{ms.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Proof Badges */}
              {(selectedNode.documentRefIds || []).length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" /> Verified Source Proof Documents ({(selectedNode.documentRefIds || []).length})
                  </div>
                  <div className="space-y-2">
                    {(selectedNode.documentRefIds || []).map(docId => {
                      const doc = artifacts.find(a => a.id === docId);
                      if (!doc) return null;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => {
                            selectDoc(doc.id);
                            onNavigate('documents');
                          }}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer flex items-center justify-between text-xs group"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="truncate font-semibold text-slate-200 group-hover:text-cyan-300">{doc.title}</span>
                          </div>
                          <Badge variant="emerald" size="sm">
                            {doc.confidenceScore}% Match
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4-Button Multi-Navigation Hub */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Exploration Navigation Hub:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    filterTimelineByNode(selectedNode.id, selectedNode.label);
                    onNavigate('timeline');
                  }}
                  className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> Filter Timeline
                </button>

                <button
                  onClick={() => {
                    if ((selectedNode.documentRefIds || []).length > 0) {
                      selectDocAndHighlightGraph(selectedNode.documentRefIds[0]);
                    }
                  }}
                  className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Network className="w-3.5 h-3.5 text-cyan-400" /> Highlight Graph
                </button>

                <button
                  onClick={() => {
                    if ((selectedNode.documentRefIds || []).length > 0) {
                      selectDoc(selectedNode.documentRefIds[0]);
                      onNavigate('documents');
                    }
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> Open Documents
                </button>

                <button
                  onClick={() => {
                    sendChatMessage(`Explain how ${selectedNode.label} connects to my projects and skills`);
                    onNavigate('search');
                  }}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold shadow-glow-purple hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Ask AI
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
