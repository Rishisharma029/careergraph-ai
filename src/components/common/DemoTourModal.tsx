import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Upload, Network, Calendar, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      step: '01',
      title: 'Upload Studio & TrOCR Extraction',
      description: 'Upload your PDF resume or project report. Our Microsoft TrOCR engine cleans PDF metadata junk (/Catalog, /Pages, /Kids) and extracts exact whitelisted skills.',
      icon: <Upload className="w-6 h-6 text-purple-400" />,
      route: 'upload',
      highlight: 'Whitelisted Entity OCR'
    },
    {
      step: '02',
      title: 'Explorable Knowledge Graph',
      description: 'Explore your career visually anchored by your Root Node. Click nodes to progressively reveal connected skills, projects, and certifications.',
      icon: <Network className="w-6 h-6 text-cyan-400" />,
      route: 'knowledge-graph',
      highlight: 'Root-Based Hierarchy'
    },
    {
      step: '03',
      title: 'AI Career Story & Chronological Timeline',
      description: 'Experience your personal story synthesized from college enrollment (2023) to flagship project launches (HDRS) and cloud certifications (2026).',
      icon: <Calendar className="w-6 h-6 text-amber-400" />,
      route: 'timeline',
      highlight: 'Narrative Story Engine'
    },
    {
      step: '04',
      title: 'AI Search & Evidence Citation',
      description: 'Ask deep questions about your portfolio. AI streams token-by-token responses backed by clickable document source citations.',
      icon: <Search className="w-6 h-6 text-emerald-400" />,
      route: 'search',
      highlight: 'Grounded RAG Search'
    }
  ];

  const active = tourSteps[currentStep];

  const handleNext = () => {
    onNavigate(active.route);
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard glowColor="purple" className="max-w-xl w-full p-6 md:p-8 border-purple-500/40 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> 30-Second Guided Tour
          </span>
          <span className="text-xs text-slate-400 font-mono">Step {currentStep + 1} of 4</span>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-1">Welcome to CareerGraph AI</h2>
        <p className="text-xs text-slate-400 mb-6">Your Intelligent Career Knowledge Hub & Document AI Platform</p>

        {/* Step Card */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                {active.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">Step {active.step}</span>
                <h3 className="text-lg font-bold text-white">{active.title}</h3>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {active.highlight}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{active.description}</p>
        </div>

        {/* Dots Progress */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex gap-1.5">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-8 bg-purple-500 shadow-glow-purple' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-200"
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-purple hover:opacity-90 transition-all"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
