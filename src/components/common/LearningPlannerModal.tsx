import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, BookOpen, Code, Award, ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface LearningPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearningPlannerModal: React.FC<LearningPlannerModalProps> = ({ isOpen, onClose }) => {
  const [targetGoal, setTargetGoal] = useState('Senior ML & Computer Vision Engineer');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan({
        goalTitle: targetGoal,
        durationWeeks: 4,
        weeks: [
          {
            weekNumber: 1,
            title: 'Kubernetes Cluster Deployment & Helm Charts',
            skillsFocus: ['Kubernetes', 'Helm', 'Container Orchestration'],
            projectAction: 'Deploy FastAPI + TrOCR microservices onto local Minikube cluster.',
            leetcodeTask: 'Build multi-stage Docker build pipeline with health checks.'
          },
          {
            weekNumber: 2,
            title: 'Vector Databases & Neural Embedding Search',
            skillsFocus: ['Qdrant', 'Pinecone', 'RAG Retrieval'],
            projectAction: 'Integrate Qdrant vector store into AI Search Q&A engine.',
            leetcodeTask: 'Optimize cosine similarity matrix search algorithm.'
          },
          {
            weekNumber: 3,
            title: 'LangGraph Autonomous Multi-Agent Orchestration',
            skillsFocus: ['LangGraph', 'LangChain', 'Agent Memory'],
            projectAction: 'Connect 5 Specialized AI Agents to LangGraph state graph.',
            leetcodeTask: 'Implement directed acyclic graph (DAG) cycle detector.'
          },
          {
            weekNumber: 4,
            title: 'Production AWS Cloud Architecture & Monitoring',
            skillsFocus: ['AWS EKS', 'Prometheus', 'Grafana'],
            projectAction: 'Achieve 100% role match for Lead ML Architect position.',
            leetcodeTask: 'Finalize enterprise CI/CD GitHub Actions workflow.'
          }
        ]
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard glowColor="purple" className="max-w-3xl w-full p-6 md:p-8 border-purple-500/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple" size="sm">
                ⭐ AI Career Roadmap Generator
              </Badge>
              <span className="text-xs font-mono text-cyan-300 font-bold">Execution Planner</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Target Career Goal Planner</h2>
          </div>
        </div>

        {/* Target Goal Input */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Enter Desired Target Career Role or Goal:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              placeholder="e.g. Senior ML Engineer, Cloud Architect, Lead AI Specialist..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
            />
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating || !targetGoal.trim()}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Planning Roadmap...' : 'Generate AI Roadmap'}</span>
            </button>
          </div>
        </div>

        {/* Generated Roadmap Display */}
        {generatedPlan && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">4-Week Execution Plan for {generatedPlan.goalTitle}</h3>
              <Badge variant="emerald" size="sm">
                ✓ 100% Tailored to Rishi Sharma
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedPlan.weeks.map((w: any) => (
                <div key={w.weekNumber} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-purple-400">WEEK {w.weekNumber}</span>
                    <span className="text-emerald-400 font-normal">Active Plan</span>
                  </div>

                  <h4 className="text-xs font-extrabold text-white">{w.title}</h4>

                  <div className="flex flex-wrap gap-1">
                    {w.skillsFocus.map((sk: string, sIdx: number) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                        • {sk}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-mono pt-1">
                    <strong>Project Task:</strong> {w.projectAction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
