import React, { useState } from 'react';
import { LineChart, Zap, Target, TrendingUp, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Check, X } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface AnalyticsProps {
  onNavigate: (route: string) => void;
}

export const SkillAnalytics: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  const { skillGaps, targetRoles } = useCareerStore();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const activeRole = targetRoles[selectedRoleIndex] || targetRoles[0];

  const domainBreakdown = [
    { name: 'AI & Machine Learning', percent: 88, color: 'bg-purple-500' },
    { name: 'Backend Systems', percent: 92, color: 'bg-indigo-500' },
    { name: 'Cloud Architecture', percent: 85, color: 'bg-cyan-500' },
    { name: 'Frontend & UI', percent: 90, color: 'bg-emerald-500' },
    { name: 'Database & Storage', percent: 78, color: 'bg-amber-500' }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Badge variant="purple" size="md" className="mb-2" icon={<LineChart className="w-3.5 h-3.5" />}>
            Competency Growth & Role Benchmark
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Skill Analytics & Gap Engine</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time competency scoring and target job readiness benchmark analysis.
          </p>
        </div>
      </div>

      {/* Target Role Matcher Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" /> Target Role Benchmark Matcher
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {targetRoles.map((role, idx) => (
            <GlassCard
              key={role.id}
              glowColor={selectedRoleIndex === idx ? 'purple' : 'none'}
              className={`p-6 cursor-pointer transition-all ${
                selectedRoleIndex === idx ? 'border-purple-500/60 bg-purple-500/10 shadow-glow-purple' : 'opacity-80'
              }`}
              onClick={() => setSelectedRoleIndex(idx)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Target Role</span>
                <span className="text-xl font-extrabold text-purple-400">{role.matchPercentage}% Match</span>
              </div>

              <h4 className="text-base font-bold text-white mb-2">{role.title}</h4>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full"
                  style={{ width: `${role.matchPercentage}%` }}
                />
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <div>Matched Skills: <strong className="text-emerald-400">{role.matchedSkillsCount} / {role.totalSkillsCount}</strong></div>
                {role.missingSkills.length > 0 && (
                  <div>Missing: <span className="text-rose-400">{role.missingSkills.join(', ')}</span></div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Priority 8: Why Match Explanation Section */}
      <GlassCard glowColor="purple" className="p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Priority 8 Deep-Dive Analysis</div>
            <h3 className="text-lg font-bold text-white">Why {activeRole.matchPercentage}% Match for {activeRole.title}?</h3>
          </div>
          <Badge variant="purple" size="lg">
            {activeRole.matchPercentage}% Score Explanation
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matched Breakdown */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Competencies ({activeRole.matchExplanation?.matched.length || 6})
            </div>
            <div className="space-y-1.5">
              {(activeRole.matchExplanation?.matched || ['Python (92%)', 'FastAPI (88%)', 'React & TypeScript (90%)', 'PyTorch (82%)', 'AWS Cloud (85%)', 'Docker (80%)']).map(m => (
                <div key={m} className="text-xs font-medium text-slate-200 flex items-center justify-between">
                  <span>{m}</span>
                  <span className="text-emerald-400 font-bold">✓ Matched</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Breakdown */}
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-rose-400" /> Missing Required Competencies ({activeRole.matchExplanation?.missing.length || 2})
            </div>
            <div className="space-y-1.5 mb-3">
              {(activeRole.matchExplanation?.missing || ['Kubernetes (K8s)', 'Terraform (Infrastructure as Code)']).map(m => (
                <div key={m} className="text-xs font-medium text-slate-200 flex items-center justify-between">
                  <span>{m}</span>
                  <span className="text-rose-400 font-bold">❌ Missing</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-rose-500/20 text-xs text-rose-200 font-medium leading-relaxed">
              💡 <strong>Action to reach 100%:</strong> {activeRole.matchExplanation?.recommendation || 'Complete a Kubernetes hands-on project to reach 100% role match.'}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Domain Distribution */}
      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" /> Domain Competency Distribution
        </h3>

        <div className="space-y-4">
          {domainBreakdown.map(domain => (
            <div key={domain.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">{domain.name}</span>
                <span className="text-purple-400 font-mono">{domain.percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`${domain.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${domain.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
