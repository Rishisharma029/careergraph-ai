import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Film, CheckCircle2, Award, Calendar } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface CareerMovieReplayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const CareerMovieReplay: React.FC<CareerMovieReplayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const movieFrames = [
    {
      year: '2023',
      title: 'College Enrollment & Core Python Foundations',
      location: 'Satyug Darshan Institute of Engineering & Technology',
      highlightText: 'Started BCA degree. Mastered Python algorithms, object-oriented programming, and baseline data structures.',
      unlockedEntity: '🟣 Python (95% Match)',
      badgeColor: 'purple' as const
    },
    {
      year: '2024',
      title: 'EvalSync Automated Evaluation Platform',
      location: 'Academic Systems AI Lab',
      highlightText: 'Engineered automated assignment grading platform using Python AST parsing rules and React UI.',
      unlockedEntity: '🟠 EvalSync Project',
      badgeColor: 'amber' as const
    },
    {
      year: '2025',
      title: 'LeafSense AI & Cloud Certifications',
      location: 'Amazon Web Services Testing Center',
      highlightText: 'Built computer vision crop disease classifier & earned AWS Certified Cloud Practitioner credential (890/1000).',
      unlockedEntity: '🔵 AWS Cloud Practitioner',
      badgeColor: 'cyan' as const
    },
    {
      year: '2026',
      title: 'HDRS Document AI Architecture',
      location: 'Enterprise Document Recognition Suite',
      highlightText: 'Pioneered Microsoft TrOCR + OpenCV Document AI System delivering 99.4% precision with zero PDF metadata junk.',
      unlockedEntity: '👑 HDRS Flagship System',
      badgeColor: 'emerald' as const
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentFrameIndex(prev => {
          if (prev >= movieFrames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen) return null;

  const frame = movieFrames[currentFrameIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <GlassCard glowColor="purple" className="max-w-3xl w-full p-8 border-purple-500/50 shadow-2xl space-y-6 relative border-2">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold">
          ✕
        </button>

        {/* Cinematic Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Film className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="purple" size="sm">
                  🎥 Cinematic Career Replay Movie Mode
                </Badge>
                <span className="text-xs font-mono text-purple-300 font-bold">Frame {currentFrameIndex + 1} of {movieFrames.length}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">Rishi Sharma's AI Career Evolution (2023 ➔ 2026)</h2>
            </div>
          </div>
        </div>

        {/* Movie Frame Showcase Screen */}
        <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-[#09090b] to-purple-950/80 border border-white/10 shadow-inner space-y-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-extrabold font-mono text-purple-400 tracking-tighter">
              {frame.year}
            </span>
            <Badge variant={frame.badgeColor} size="md">
              {frame.unlockedEntity}
            </Badge>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-white">{frame.title}</h3>
            <p className="text-xs text-purple-300 font-semibold mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {frame.location}
            </p>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-mono bg-white/5 p-4 rounded-2xl border border-white/10">
            "{frame.highlightText}"
          </p>

          {/* Frame Scrubber Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${((currentFrameIndex + 1) / movieFrames.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                isPlaying ? 'bg-amber-500 text-white shadow-glow-amber' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-glow-purple'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Replay' : 'Play Cinematic Movie'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentFrameIndex(0);
              }}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-bold"
              title="Restart from 2023"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onNavigate('graph');
            }}
            className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/10"
          >
            Explore Knowledge Graph →
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
