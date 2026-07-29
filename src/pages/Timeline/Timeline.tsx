import React, { useState } from 'react';
import { Calendar, Network, FileText, Sparkles, Filter, Volume2, ArrowRight, ShieldCheck, Play, CheckCircle2, ChevronRight, User, Award } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface TimelineProps {
  onNavigate: (route: string) => void;
}

export const TimelineView: React.FC<TimelineProps> = ({ onNavigate }) => {
  const { milestones, activeTimelineSkillFilter, clearTimelineFilter, selectNode, selectDocAndHighlightGraph } = useCareerStore();
  const [activeStoryMode, setActiveStoryMode] = useState<'my_story' | 'recruiter_pitch' | 'interview_response'>('my_story');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const filteredMilestones = activeTimelineSkillFilter
    ? milestones.filter(m => m.skillsUsed.some(s => s.toLowerCase().includes(activeTimelineSkillFilter.toLowerCase())))
    : milestones;

  const handleAudioNarration = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  const getStoryText = () => {
    switch (activeStoryMode) {
      case 'recruiter_pitch':
        return "30-Second Recruiter Pitch: Rishi Sharma is a Full-Stack AI Engineer with proven expertise in Microsoft TrOCR document recognition, OpenCV preprocessing, FastAPI async backends, and React. He architected HDRS (99.4% accuracy) and EvalSync automated grading platform.";
      case 'interview_response':
        return "Interview Response ('Tell Me About Yourself'): My journey started in 2023 studying BCA at Satyug Darshan Institute. By 2024, I developed EvalSync for automated academic evaluation. In 2025, I built LeafSense AI for crop disease classification, culminating in 2026 with HDRS Document AI.";
      case 'my_story':
      default:
        return "My AI Career Story: Starting with Python fundamentals during my BCA degree in 2023, I progressed from student projects to production-grade AI systems, mastering FastAPI, React, Docker, and Microsoft TrOCR Document AI.";
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header (⭐ Priority 10: Scaled Down Heading) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                📖 Visual Storytelling Timeline Flow
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Chronological Narrative
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              AI Career Story & Chronological Timeline
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Year-by-year journey from college enrollment (2023) to HDRS Document AI architecture (2026).
            </p>
          </div>

          <button
            onClick={() => onNavigate('graph')}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
          >
            <Network className="w-4 h-4" /> Explore Knowledge Graph
          </button>
        </div>

        {/* Active Skill Filter Banner */}
        {activeTimelineSkillFilter && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-purple-400" />
              <span className="text-slate-300">Filtered by Graph Skill Node:</span>
              <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                🟣 {activeTimelineSkillFilter}
              </span>
            </div>
            <button onClick={clearTimelineFilter} className="text-xs text-slate-400 hover:text-white underline font-mono">
              Clear Filter
            </button>
          </div>
        )}

        {/* AI Story Narrative Mode Hero Box */}
        <GlassCard glowColor="amber" className="p-6 md:p-8 border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">AI Story Narrative Engine</h3>
                <p className="text-xs text-slate-400">Synthesized narrative story modes powered by graph entity timeline data</p>
              </div>
            </div>

            {/* Mode Switchers */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 p-1 rounded-2xl">
              <button
                onClick={() => setActiveStoryMode('my_story')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStoryMode === 'my_story' ? 'bg-amber-500 text-white shadow-glow-amber' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📖 My AI Story
              </button>
              <button
                onClick={() => setActiveStoryMode('recruiter_pitch')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStoryMode === 'recruiter_pitch' ? 'bg-amber-500 text-white shadow-glow-amber' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                💼 30s Recruiter Pitch
              </button>
              <button
                onClick={() => setActiveStoryMode('interview_response')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStoryMode === 'interview_response' ? 'bg-amber-500 text-white shadow-glow-amber' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🎤 Interview Response
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              "{getStoryText()}"
            </p>

            <button
              onClick={handleAudioNarration}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isPlayingAudio ? 'bg-amber-500 text-white animate-pulse' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Playing AI Narration...' : 'Listen to Audio Narration'}</span>
            </button>
          </div>
        </GlassCard>

        {/* ⭐ PRIORITY 6: VISUAL STORYTELLING TIMELINE FLOW (2023 -> 2026) */}
        <div className="relative border-l-2 border-purple-500/40 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10 py-4">
          {filteredMilestones.map((ms, idx) => (
            <div key={ms.id} className="relative group">
              {/* Year Connector Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-purple-400 group-hover:scale-125 group-hover:border-cyan-400 transition-all flex items-center justify-center text-[10px] text-purple-300 font-extrabold font-mono">
                {idx + 1}
              </div>

              <GlassCard className="p-6 border-white/10 hover:border-purple-500/40 transition-all space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2 inline-block">
                      {ms.year} • {ms.date}
                    </span>
                    <h3 className="text-base font-extrabold text-white">{ms.title}</h3>
                    <p className="text-xs text-purple-300 font-semibold">{ms.organization}</p>
                  </div>

                  <Badge variant="cyan" size="sm">
                    {ms.impactMetric}
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {ms.description}
                </p>

                {/* Skills Used Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Skills Used:</span>
                  {ms.skillsUsed.map((sk, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-purple-300">
                      • {sk}
                    </span>
                  ))}
                </div>

                {/* ⭐ PRIORITY 4: 360° INTERCONNECTED CLICK ANYWHERE */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (ms.verifiedDocId) {
                        selectDocAndHighlightGraph(ms.verifiedDocId);
                        onNavigate('graph');
                      } else {
                        onNavigate('graph');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-purple"
                  >
                    <Network className="w-3.5 h-3.5 text-purple-400" /> Highlight Graph Node
                  </button>

                  {ms.verifiedDocTitle && (
                    <button
                      onClick={() => onNavigate('documents')}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" /> Proof: {ms.verifiedDocTitle}
                    </button>
                  )}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CareerTimeline = TimelineView;
