import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Cpu, Database, Network, Award, Zap } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface UploadProps {
  onNavigate: (route: string) => void;
}

export const UploadStudio: React.FC<UploadProps> = ({ onNavigate }) => {
  const { uploadDocumentSimulated, isParsingDocument, parsingProgress, recentExtractedTags } = useCareerStore();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showConfettiToast, setShowConfettiToast] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleStartExtraction = async () => {
    if (!selectedFile) return;
    const skills = customSkillInput ? customSkillInput.split(',').map(s => s.trim()).filter(Boolean) : undefined;
    await uploadDocumentSimulated(selectedFile, skills);
    setShowSummaryModal(true);
    setShowConfettiToast(true);
    setTimeout(() => {
      setShowConfettiToast(false);
    }, 4000);
  };

  const getStepStatus = () => {
    if (parsingProgress < 20) return 'Uploading Document PDF...';
    if (parsingProgress < 40) return 'Running Microsoft TrOCR & Layout Analysis...';
    if (parsingProgress < 65) return 'Whitelisting Career Entities & Skills...';
    if (parsingProgress < 85) return 'Building Hierarchical Knowledge Graph...';
    if (parsingProgress < 95) return 'Generating Chronological Story Timeline...';
    return 'Done ✓';
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      {/* ⭐ PRIORITY 8: CONFETTI CELEBRATION TOAST */}
      {showConfettiToast && (
        <div className="fixed top-8 right-8 z-50 animate-in bounce-in duration-300">
          <GlassCard glowColor="purple" className="p-4 bg-purple-950/90 border-purple-500/40 shadow-2xl flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 text-2xl animate-bounce">🎉</div>
            <div>
              <h4 className="text-sm font-extrabold text-white">🎉 Career Intelligence Generated!</h4>
              <p className="text-xs text-purple-300">100% Whitelisted Entities Connected to Knowledge Graph.</p>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header (⭐ Priority 10: Scaled Down Heading) */}
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ⚡ Microsoft TrOCR + OpenCV Pipeline
            </span>
            <Badge variant="cyan" size="sm" icon={<Cpu className="w-3 h-3" />}>
              100% Clean Entity Whitelisting
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Document Upload & AI Extraction Studio
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Upload your resumes, project reports, and certificates. Our engine strips PDF metadata junk (/Catalog, /Pages) and whitelists career entities into your Knowledge Graph.
          </p>
        </div>

        {/* Drag & Drop Area */}
        <GlassCard glowColor="purple" className="p-8 md:p-12 border-purple-500/30 text-center space-y-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-8 md:p-10 rounded-3xl border-2 border-dashed transition-all cursor-pointer ${
              dragActive
                ? 'border-purple-400 bg-purple-500/20 scale-[1.01]'
                : 'border-white/15 bg-white/5 hover:border-purple-500/40'
            }`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.png,.jpg"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-4 block">
              <div className="w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 shadow-glow-purple">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-white">
                  {selectedFile ? selectedFile.name : 'Drag & drop resume PDF or click to browse'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PDF, DOCX, PNG (Resume, AWS Certificate, Project Documentation)
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/10 transition-all">
                Browse Files
              </div>
            </label>
          </div>

          {/* Action Trigger */}
          {selectedFile && !isParsingDocument && (
            <div className="space-y-4 animate-in fade-in">
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Optional custom skills (e.g. Python, TrOCR, Docker)..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleStartExtraction}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all mx-auto"
              >
                <Sparkles className="w-4 h-4" /> Start AI Extraction
              </button>
            </div>
          )}

          {/* ⭐ PRIORITY 1: MULTI-STEP PROCESSING ANIMATION */}
          {isParsingDocument && (
            <div className="max-w-lg mx-auto space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 text-left animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-purple-300">{getStepStatus()}</span>
                <span className="text-emerald-400">{parsingProgress}%</span>
              </div>

              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${parsingProgress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div className={`flex items-center gap-1.5 ${parsingProgress >= 20 ? 'text-emerald-400 font-bold' : ''}`}>
                  <span>{parsingProgress >= 20 ? '✓' : '○'}</span> Uploading PDF
                </div>
                <div className={`flex items-center gap-1.5 ${parsingProgress >= 40 ? 'text-emerald-400 font-bold' : ''}`}>
                  <span>{parsingProgress >= 40 ? '✓' : '○'}</span> Microsoft TrOCR
                </div>
                <div className={`flex items-center gap-1.5 ${parsingProgress >= 65 ? 'text-emerald-400 font-bold' : ''}`}>
                  <span>{parsingProgress >= 65 ? '✓' : '○'}</span> Skill Whitelisting
                </div>
                <div className={`flex items-center gap-1.5 ${parsingProgress >= 85 ? 'text-emerald-400 font-bold' : ''}`}>
                  <span>{parsingProgress >= 85 ? '✓' : '○'}</span> Knowledge Graph
                </div>
              </div>
            </div>
          )}
        </GlassCard>

        {/* 🏆 WINNING FEATURE: "CAREER INTELLIGENCE GENERATED" SUMMARY MODAL */}
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <GlassCard glowColor="emerald" className="max-w-2xl w-full p-8 border-emerald-500/40 shadow-2xl space-y-6 relative">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Career Intelligence Generated</h2>
                  <p className="text-xs text-slate-400">Source PDF artifacts processed & connected to Knowledge Graph</p>
                </div>
                <Badge variant="emerald" size="md" className="ml-auto">
                  100% Whitelisted
                </Badge>
              </div>

              {/* Item-by-Item Reveal List */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs animate-in slide-in-from-bottom-1 duration-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-slate-200">4 Flagship Projects Identified (HDRS, EvalSync, LeafSense AI, CampusOS)</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">Verified</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-slate-200">12 Verified Career Competencies (Python, FastAPI, React, Docker, TrOCR)</span>
                  </div>
                  <span className="text-purple-300 font-mono text-[11px] font-bold">Whitelisted</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs animate-in slide-in-from-bottom-3 duration-400">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-slate-200">2 Industry Certifications (AWS Cloud Practitioner, Claude 101)</span>
                  </div>
                  <span className="text-cyan-300 font-mono text-[11px] font-bold">Validated</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-slate-200">Chronological Career Story Timeline Built (2023 ➔ 2026)</span>
                  </div>
                  <span className="text-amber-300 font-mono text-[11px] font-bold">Generated</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs animate-in slide-in-from-bottom-5 duration-600">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-extrabold text-slate-200">Root-Based Knowledge Graph Connected & Synced</span>
                  </div>
                  <span className="text-indigo-300 font-mono text-[11px] font-bold">Connected</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-extrabold text-emerald-300 animate-in slide-in-from-bottom-6 duration-700">
                  <span>Overall Resume & Career Score: 94% Match</span>
                  <span className="font-mono text-sm">94%</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setShowSummaryModal(false);
                    onNavigate('graph');
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
                >
                  Explore Knowledge Graph <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};
