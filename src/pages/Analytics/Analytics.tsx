import React, { useState } from 'react';
import { LineChart, Award, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Zap, Target, TrendingUp, DollarSign, Cpu } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { matchJobDescription, getSalaryForecasts } from '../../utils/skillInferenceEngine';
import { JDMatchResult } from '../../types';

interface AnalyticsProps {
  onNavigate: (route: string) => void;
}

export const SkillAnalytics: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  const { nodes, skillGaps, targetRoles } = useCareerStore();
  const [jdInputText, setJdInputText] = useState('');
  const [jdResult, setJdResult] = useState<JDMatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  const userSkills = nodes.filter(n => n.type === 'skill').map(n => n.label);
  const salaryForecasts = getSalaryForecasts();

  const handleRunJDMatcher = () => {
    if (!jdInputText.trim()) return;
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setJdResult(matchJobDescription(jdInputText, userSkills));
    }, 800);
  };

  const domainHeatmaps = [
    { domain: 'Backend & Systems', percentage: 95, color: 'from-purple-500 to-indigo-600' },
    { domain: 'AI / ML & Computer Vision', percentage: 94, color: 'from-cyan-500 to-blue-600' },
    { domain: 'Cloud & Containerization', percentage: 88, color: 'from-emerald-500 to-teal-600' },
    { domain: 'Frontend & UI State', percentage: 90, color: 'from-amber-500 to-orange-600' },
    { domain: 'Security & Auth', percentage: 82, color: 'from-rose-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                📊 Career Intelligence & Role Matching Engine
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Data-Driven Trajectory
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Skill Analytics & Career Trajectory Forecast
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Benchmark technical competencies, run live AI Recruiter JD matching, and forecast multi-year career growth.
            </p>
          </div>

          <button
            onClick={() => onNavigate('graph')}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Explorable Graph
          </button>
        </div>

        {/* ⭐ PHASE 2: AI RECRUITER JD MATCHER SECTION */}
        <GlassCard glowColor="purple" className="p-6 md:p-8 border-purple-500/40 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">AI Recruiter Job Description (JD) Matcher</h3>
                <p className="text-xs text-slate-400">Paste any job description to compare your verified graph entities</p>
              </div>
            </div>
            <Badge variant="purple" size="md">
              Live JD Analyzer
            </Badge>
          </div>

          <div className="space-y-4">
            <textarea
              value={jdInputText}
              onChange={(e) => setJdInputText(e.target.value)}
              placeholder="Paste job description text here (e.g. We are seeking a Senior Backend AI Engineer proficient in Python, FastAPI, Docker, Microsoft TrOCR, OpenCV, and React)..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => setJdInputText('We are hiring a Lead Full-Stack AI Engineer experienced in Python, FastAPI, React, TypeScript, Docker, Microsoft TrOCR, OpenCV, and PostgreSQL.')}
                className="text-xs text-purple-300 font-bold hover:underline"
              >
                ⚡ Load Sample AI Engineer JD
              </button>

              <button
                onClick={handleRunJDMatcher}
                disabled={isMatching || !jdInputText.trim()}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isMatching ? 'Analyzing JD Match...' : 'Run Live JD Matcher'}
              </button>
            </div>
          </div>

          {/* Match Results */}
          {jdResult && (
            <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/30 space-y-5 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-base font-extrabold text-white">{jdResult.jobTitle}</h4>
                  <p className="text-xs text-purple-300 font-semibold">{jdResult.companyName}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 font-mono">MATCH SCORE</div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">{jdResult.overallMatchScore}%</div>
                  </div>

                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 font-mono font-bold">INTERVIEW PROBABILITY</div>
                    <div className="text-2xl font-extrabold text-purple-400 font-mono">{jdResult.interviewProbability}%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    ✓ Verified Matched Competencies ({jdResult.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {jdResult.matchedSkills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    ⚠ Skill Gaps to Address ({jdResult.missingCriticalSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {jdResult.missingCriticalSkills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                        ! {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlassCard>

        {/* ⭐ PHASE 3: CAREER GROWTH & SALARY PREDICTOR */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-extrabold text-white">Career Growth & Salary Trajectory Forecast</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {salaryForecasts.map((forecast, idx) => (
              <GlassCard key={idx} glowColor="emerald" className="p-5 border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-slate-400 uppercase">{forecast.period}</span>
                  <Badge variant="emerald" size="sm">
                    {forecast.marketReadinessIndex}% Ready
                  </Badge>
                </div>

                <div>
                  <div className="text-lg font-extrabold text-emerald-400 font-mono">{forecast.estimatedSalaryRange}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Projected Skills: {forecast.projectedSkillsCount}</p>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Key Unlocks:</div>
                  {forecast.keyUnlocks.map((u, uIdx) => (
                    <div key={uIdx} className="text-[11px] text-slate-300 flex items-center gap-1">
                      <span className="text-emerald-400">•</span> {u}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* ⭐ PHASE 3: DOMAIN PROFICIENCY HEATMAP */}
        <GlassCard glowColor="cyan" className="p-6 md:p-8 border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Domain Competency Heatmap</h3>
                <p className="text-xs text-slate-400">Technical depth distribution across core software domains</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {domainHeatmaps.map((dh, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                  <span className="text-slate-200">{dh.domain}</span>
                  <span className="text-cyan-300">{dh.percentage}% Proficiency</span>
                </div>

                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`bg-gradient-to-r ${dh.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${dh.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
