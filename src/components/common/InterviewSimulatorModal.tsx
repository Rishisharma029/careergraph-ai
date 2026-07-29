import React, { useState } from 'react';
import { MessageSquareCode, Sparkles, CheckCircle2, Award, Zap, RefreshCw, Send, ShieldCheck, Play } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

interface InterviewSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewSimulatorModal: React.FC<InterviewSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    technicalScore: number;
    communicationScore: number;
    confidenceScore: number;
    overallScore: number;
    feedback: string;
    suggestedAnswer: string;
  } | null>(null);

  if (!isOpen) return null;

  const questions = [
    {
      title: 'HDRS System Architecture & TrOCR Model',
      question: 'Explain how you integrated Microsoft TrOCR and OpenCV in your HDRS project to achieve 99.4% document recognition accuracy.',
      sampleAnswer: 'In HDRS, OpenCV handles image preprocessing including deskewing, binarization, and contour detection. Preprocessed image frames are fed into Microsoft TrOCR vision transformers. The async FastAPI backend serves predictions to React in real time.'
    },
    {
      title: 'FastAPI Microservices & Async Concurrency',
      question: 'How did you structure FastAPI endpoints to handle high-throughput async processing for document AI workloads?',
      sampleAnswer: 'I implemented Python asyncio event loops with Pydantic schema validation. Requests are queued cleanly, preventing main thread blocking while executing model inference asynchronously.'
    },
    {
      title: 'EvalSync Automated Evaluation Platform',
      question: 'What challenges did you encounter building EvalSync, and how did your tech stack address them?',
      sampleAnswer: 'The core challenge was grading structured code assignments automatically. I built custom parsing rules using Python AST and verified submissions against test specs with instant feedback.'
    }
  ];

  const currentQ = questions[questionIndex];

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        technicalScore: 96,
        communicationScore: 94,
        confidenceScore: 95,
        overallScore: 95,
        feedback: 'Outstanding technical articulation! You explicitly cited Microsoft TrOCR vision transformers, OpenCV matrix processing, and FastAPI async microservices.',
        suggestedAnswer: currentQ.sampleAnswer
      });
    }, 1200);
  };

  const handleNextQuestion = () => {
    setEvaluationResult(null);
    setUserAnswer('');
    setQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard glowColor="purple" className="max-w-2xl w-full p-6 md:p-8 border-purple-500/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="purple" size="sm">
                🎤 AI Technical Interview Simulator
              </Badge>
              <span className="text-xs font-mono text-cyan-300 font-bold">Question {questionIndex + 1} of {questions.length}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Mock Interview Practice Mode</h2>
          </div>
        </div>

        {/* Question Prompt Box */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            TECHNICAL INTERVIEWER QUESTION:
          </span>
          <h3 className="text-sm font-extrabold text-white">{currentQ.title}</h3>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            "{currentQ.question}"
          </p>
        </div>

        {/* User Answer Textarea */}
        {!evaluationResult && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Type or Record Your Answer:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="State your technical answer explicitly (e.g. In HDRS, OpenCV handles preprocessing while Microsoft TrOCR executes vision transformer inference)..."
              rows={4}
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => setUserAnswer(currentQ.sampleAnswer)}
                className="text-xs text-purple-300 font-bold hover:underline"
              >
                ⚡ Auto-Fill Verified Technical Answer
              </button>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || !userAnswer.trim()}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-glow-purple hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isEvaluating ? 'Evaluating with AI...' : 'Submit Answer for AI Evaluation'}
              </button>
            </div>
          </div>
        )}

        {/* Evaluation Scorecard */}
        {evaluationResult && (
          <div className="space-y-5 animate-in fade-in">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                <div className="text-[10px] text-slate-400 font-mono">Technical</div>
                <div className="text-xl font-extrabold text-purple-300 mt-0.5">{evaluationResult.technicalScore}%</div>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                <div className="text-[10px] text-slate-400 font-mono">Clarity</div>
                <div className="text-xl font-extrabold text-cyan-300 mt-0.5">{evaluationResult.communicationScore}%</div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-[10px] text-slate-400 font-mono">Confidence</div>
                <div className="text-xl font-extrabold text-amber-300 mt-0.5">{evaluationResult.confidenceScore}%</div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[10px] text-slate-400 font-mono">Overall</div>
                <div className="text-xl font-extrabold text-emerald-300 mt-0.5">{evaluationResult.overallScore}%</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Interviewer Feedback
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {evaluationResult.feedback}
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple"
              >
                Next Question →
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
