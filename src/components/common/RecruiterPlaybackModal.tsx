import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface RecruiterPlaybackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const RecruiterPlaybackModal: React.FC<RecruiterPlaybackModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);

  const frames = [
    {
      year: '2023',
      title: 'BCA Enrollment & Baseline Foundations',
      text: 'Candidate Rishi Sharma enrolled in BCA at Satyug Darshan Institute. Developed strong core fundamentals in Python algorithms and data structures.'
    },
    {
      year: '2024',
      title: 'Built EvalSync Automated Evaluation System',
      text: 'Architected automated academic grading suite using Python AST parsing rules and React interface.'
    },
    {
      year: '2025',
      title: 'LeafSense AI & AWS Cloud Practitioner Certification',
      text: 'Engineered computer vision crop disease classifier and earned AWS Cloud Practitioner credential with 890/1000 score.'
    },
    {
      year: '2026',
      title: 'HDRS Flagship Document AI Architecture',
      text: 'Pioneered Microsoft TrOCR + OpenCV Document AI engine achieving 99.4% precision with 100% clean entity whitelisting.'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setFrameIndex(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen) return null;

  const current = frames[frameIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <GlassCard glowColor="purple" className="max-w-2xl w-full p-8 border-purple-500/50 shadow-2xl space-y-6 relative border-2">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold">
          ✕
        </button>

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="emerald" size="sm">
                  🏆 Recruiter Auto-Play Narrator
                </Badge>
                <span className="text-xs font-mono text-purple-300 font-bold">{current.year}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">{current.title}</h2>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed font-mono">
            "{current.text}"
          </p>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${((frameIndex + 1) / frames.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-purple"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Auto-Play' : '▶ Play Recruiter Story'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigate('graph');
            }}
            className="px-4 py-2 rounded-2xl bg-white/10 text-slate-200 text-xs font-bold"
          >
            Open Knowledge Graph →
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
