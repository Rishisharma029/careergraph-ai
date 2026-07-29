import React, { useState } from 'react';
import { FileText, ShieldCheck, Download, Trash2, Search, Filter, Sparkles, Upload, ArrowRight, Eye } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface DocumentsProps {
  onNavigate: (route: string) => void;
}

export const DocumentsHub: React.FC<DocumentsProps> = ({ onNavigate }) => {
  const { artifacts, selectedDocId, selectDoc, deleteArtifact, selectDocAndHighlightGraph } = useCareerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredArtifacts = artifacts.filter(a => {
    const matchesSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.parsedText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || a.category.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const activeDoc = artifacts.find(a => a.id === selectedDocId) || filteredArtifacts[0] || artifacts[0];

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header (⭐ Priority 10: Scaled Down Heading) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                📁 Verified Evidence Repository
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Source Document Grounding
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Verified Documents & Proof Repository
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Inspect OCR parsed text, extracted entity tags, and jump directly to Knowledge Graph evidence.
            </p>
          </div>

          <button
            onClick={() => onNavigate('upload')}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
          >
            <Upload className="w-4 h-4" /> Upload New Proof PDF
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search document proof text..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            {['all', 'Resume', 'Certificate', 'Project Report'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-cyan-500 text-white shadow-glow-cyan'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Proofs' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* ⭐ PRIORITY 5: BETTER EMPTY STATES */}
        {filteredArtifacts.length === 0 ? (
          <GlassCard glowColor="purple" className="p-12 text-center border-purple-500/30 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto text-3xl">
              📄
            </div>
            <h3 className="text-xl font-extrabold text-white">Upload your first resume to build your AI Career Graph</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No matching verified document proofs found. Upload your resume or technical reports to unlock full entity extraction.
            </p>
            <button
              onClick={() => onNavigate('upload')}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs inline-flex items-center gap-2 shadow-glow-purple"
            >
              Upload Resume PDF <ArrowRight className="w-4 h-4" />
            </button>
          </GlassCard>
        ) : (
          /* Grid & Detail Drawer */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Document List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredArtifacts.map(doc => {
                const isSelected = activeDoc?.id === doc.id;
                return (
                  <GlassCard
                    key={doc.id}
                    onClick={() => selectDoc(doc.id)}
                    className={`p-5 border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-3 ${
                      isSelected ? 'border-cyan-500/60 bg-cyan-500/10 shadow-glow-cyan' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white truncate max-w-xs">{doc.title}</h4>
                          <span className="text-[11px] font-mono text-cyan-300">{doc.category}</span>
                        </div>
                      </div>
                      <Badge variant="emerald" size="sm">
                        {doc.confidenceScore}% Match
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {doc.parsedText}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-white/5">
                      <span>{doc.fileSize}</span>
                      <span>Uploaded {doc.uploadDate}</span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {/* Right: Document Inspector Detail */}
            {activeDoc && (
              <div className="lg:col-span-7">
                <GlassCard glowColor="cyan" className="p-6 md:p-8 border-cyan-500/40 shadow-2xl space-y-6 sticky top-20">
                  <div className="flex items-start justify-between border-b border-white/10 pb-4">
                    <div>
                      <Badge variant="cyan" size="sm" className="mb-2">
                        {activeDoc.category}
                      </Badge>
                      <h2 className="text-xl font-extrabold text-white">{activeDoc.title}</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Issuer: {activeDoc.issuer || 'AI Entity Extraction Engine'}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          selectDocAndHighlightGraph(activeDoc.id);
                          onNavigate('graph');
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-purple"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Highlight Graph
                      </button>

                      <button
                        onClick={() => deleteArtifact(activeDoc.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
                        title="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Extracted Entity Badges */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Extracted Whitelisted Entity Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDoc.entityTags.skills.map((s, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                          🟣 {s}
                        </span>
                      ))}
                      {activeDoc.entityTags.projects.map((p, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold">
                          🟠 {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Full Text Snippet */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      TrOCR Parsed Document Text
                    </h4>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed font-mono max-h-60 overflow-y-auto">
                      {activeDoc.parsedText}
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
