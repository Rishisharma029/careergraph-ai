import React, { useState } from 'react';
import { Target, ShieldCheck, UserCheck, CheckCircle2, AlertTriangle, FileText, ArrowRight, Award, Sparkles, Filter, Search, Users } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { RadialGauge } from '../../components/common/RadialGauge';

interface RecruiterPortalProps {
  onNavigate: (route: string) => void;
}

export const RecruiterPortal: React.FC<RecruiterPortalProps> = ({ onNavigate }) => {
  const [jdText, setJdText] = useState('Senior Full-Stack AI Engineer experienced in Python, FastAPI, React, Docker, Microsoft TrOCR, OpenCV, and PostgreSQL.');
  const [shortlistedCandidateIds, setShortlistedCandidateIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'shortlisted'>('all');

  const candidates = [
    {
      id: 'c-rishi',
      name: 'Rishi Sharma',
      role: 'Full-Stack AI Engineer',
      matchScore: 96,
      interviewProbability: 95,
      verifiedSkills: ['Python', 'FastAPI', 'React', 'Docker', 'TrOCR', 'OpenCV'],
      missingSkills: ['Kubernetes'],
      proofCount: 4,
      experienceYears: '3 Years (BCA + Project Suite)',
      topProject: 'HDRS Document AI (99.4% Accuracy)'
    },
    {
      id: 'c-aarav',
      name: 'Aarav Sharma',
      role: 'Frontend & System UI Specialist',
      matchScore: 88,
      interviewProbability: 85,
      verifiedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
      missingSkills: ['TrOCR', 'OpenCV'],
      proofCount: 3,
      experienceYears: '2.5 Years',
      topProject: 'EvalSync Platform UI'
    },
    {
      id: 'c-priya',
      name: 'Priya Patel',
      role: 'Computer Vision & Deep Learning Specialist',
      matchScore: 84,
      interviewProbability: 80,
      verifiedSkills: ['Python', 'OpenCV', 'PyTorch', 'TrOCR'],
      missingSkills: ['React', 'Docker'],
      proofCount: 3,
      experienceYears: '2 Years',
      topProject: 'LeafSense Crop AI'
    }
  ];

  const toggleShortlist = (id: string) => {
    setShortlistedCandidateIds(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const displayedCandidates = activeTab === 'shortlisted'
    ? candidates.filter(c => shortlistedCandidateIds.includes(c.id))
    : candidates;

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 p-6 md:p-10 selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                🏆 Dedicated Enterprise Recruiter Portal
              </span>
              <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
                Verified Candidate Grounding
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Candidate Matching & Shortlisting Portal
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">
              Screen verified candidate knowledge graphs against job requirements with 100% document evidence citations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-purple-500 text-white' : 'text-slate-400'
              }`}
            >
              All Candidates ({candidates.length})
            </button>
            <button
              onClick={() => setActiveTab('shortlisted')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'shortlisted' ? 'bg-emerald-500 text-white' : 'text-slate-400'
              }`}
            >
              Shortlisted ({shortlistedCandidateIds.length})
            </button>
          </div>
        </div>

        {/* JD Input Area */}
        <GlassCard glowColor="purple" className="p-6 border-purple-500/30 space-y-3">
          <label className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
            Target Job Description (JD) Screening Input:
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={2}
            className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
          />
        </GlassCard>

        {/* ⭐ DIRECTIVE 2: SUBTLE EMPTY STATE FOR RECRUITER PORTAL */}
        {displayedCandidates.length === 0 && activeTab === 'shortlisted' ? (
          <GlassCard glowColor="purple" className="p-12 text-center border-purple-500/30 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto text-3xl">
              📋
            </div>
            <h3 className="text-lg font-extrabold text-white">No Shortlisted Candidates Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto font-mono">
              No shortlisted candidates yet. Select candidates from the candidate list to build your hiring shortlist.
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs inline-flex items-center gap-2 shadow-glow-purple"
            >
              Browse All Candidates →
            </button>
          </GlassCard>
        ) : (
          /* Ranked Candidate List */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white">Top Verified Candidates Ranked by Knowledge Graph Match</h3>
              <span className="text-xs font-mono text-slate-400">{displayedCandidates.length} Verified Profiles Evaluated</span>
            </div>

            <div className="space-y-4">
              {displayedCandidates.map(cand => {
                const isShortlisted = shortlistedCandidateIds.includes(cand.id);
                return (
                  <GlassCard
                    key={cand.id}
                    glowColor={cand.matchScore >= 90 ? 'purple' : 'cyan'}
                    className="p-6 border-white/10 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center font-extrabold text-white text-base shadow-glow-purple">
                          {cand.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-lg font-extrabold text-white">{cand.name}</h4>
                          <p className="text-xs text-purple-300 font-semibold">{cand.role} • {cand.experienceYears}</p>
                        </div>
                      </div>

                      {/* ⭐ DIRECTIVE 1: RADIAL GAUGE VISUALIZATION */}
                      <div className="flex items-center gap-6">
                        <RadialGauge
                          value={cand.matchScore}
                          size={54}
                          strokeWidth={5}
                          label="GRAPH MATCH"
                          color={cand.matchScore >= 90 ? 'purple' : 'cyan'}
                        />

                        <button
                          onClick={() => toggleShortlist(cand.id)}
                          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border ${
                            isShortlisted
                              ? 'bg-emerald-500 text-white border-emerald-400 shadow-glow-emerald'
                              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {isShortlisted ? '✓ Shortlisted' : '+ Shortlist Candidate'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Verified Skills Grounded in Document Proofs:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cand.verifiedSkills.map((sk, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                              • {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Flagship Project Evidence:
                        </span>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 font-mono">
                          🏆 {cand.topProject} ({cand.proofCount} Verified Proof Docs)
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
