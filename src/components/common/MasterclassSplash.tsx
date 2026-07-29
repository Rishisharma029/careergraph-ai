import React, { useState, useEffect } from 'react';
import { Network, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface MasterclassSplashProps {
  onComplete: () => void;
}

export const MasterclassSplash: React.FC<MasterclassSplashProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: 'Reading Resume PDF & Technical Artifacts', icon: '📄' },
    { label: 'Understanding Skills & Technical Stack', icon: '🧠' },
    { label: 'Connecting Knowledge Graph Entities', icon: '🕸️' },
    { label: 'Building Visual Story Timeline (2023-2026)', icon: '📖' },
    { label: 'Generating Digital Twin & Recruiter Portfolio', icon: '👤' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090b] text-slate-100 selection:bg-purple-500/30">
      {/* Background Orbs */}
      <div className="bg-orb w-96 h-96 bg-purple-500 top-1/4 left-1/4 animate-pulse" />
      <div className="bg-orb w-96 h-96 bg-cyan-500 bottom-1/4 right-1/4 animate-pulse" />

      <GlassCard glowColor="purple" className="max-w-xl w-full p-8 md:p-10 border-purple-500/40 shadow-2xl space-y-8 text-center relative border-2">
        {/* Brand Header */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-500 via-indigo-600 to-cyan-400 p-0.5 shadow-glow-purple mx-auto animate-bounce">
            <div className="w-full h-full bg-[#09090b] rounded-[22px] flex items-center justify-center">
              <Network className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight gradient-text">
            CareerGraph AI
          </h1>
          <p className="text-sm text-purple-300 font-mono font-bold">
            Building your Career Intelligence...
          </p>
        </div>

        {/* Step-by-Step Checkmark Sequence */}
        <div className="space-y-3 max-w-md mx-auto text-left">
          {steps.map((st, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between text-xs font-mono font-bold ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isCurrent
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 shadow-glow-purple scale-[1.02]'
                    : 'bg-white/5 border-white/5 text-slate-500 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{st.icon}</span>
                  <span>{st.label}</span>
                </div>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="text-slate-600 text-[10px]">○</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Welcome Message */}
        {stepIndex >= steps.length - 1 && (
          <div className="pt-2 animate-in fade-in zoom-in-95 duration-300 space-y-3">
            <div className="text-base font-extrabold text-emerald-400 font-mono">
              Welcome back, Rishi.
            </div>
            <button
              onClick={onComplete}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs inline-flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
            >
              Enter Intelligence Hub <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
