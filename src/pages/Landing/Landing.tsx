import React from 'react';
import { Network, Sparkles, ArrowRight, ShieldCheck, Zap, FileText, CheckCircle2, Play, Users, Briefcase, GraduationCap, Award } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

interface LandingProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 selection:bg-indigo-500/30">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-50 w-full h-20 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-glow-indigo">
            <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center">
              <Network className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="text-xl font-extrabold gradient-text font-sans">CareerGraph AI</div>
            <div className="text-[10px] text-slate-400">Digital Career Intelligence Platform</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onEnterApp}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all"
          >
            Sign In
          </button>
          <button
            onClick={onEnterApp}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 text-xs font-bold text-white shadow-glow-indigo transition-all flex items-center gap-2"
          >
            Launch Interactive Demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow Ambient Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <Badge variant="indigo" size="lg" className="mb-6 inline-flex" icon={<Sparkles className="w-4 h-4 text-purple-400" />}>
          Hackathon Edition • Production-Ready Spec
        </Badge>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight mb-6">
          Turn Unstructured Artifacts Into An <br />
          <span className="gradient-text">Interactive Career Knowledge Graph</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          CareerGraph AI parses resumes, certificates, offer letters, and GitHub repos into an interconnected entity graph, chronological timeline, and natural-language search engine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:opacity-90 text-white font-bold text-sm shadow-glow-indigo transition-all flex items-center justify-center gap-3 group"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            Explore Interactive Demo (Sample Data)
          </button>
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5 text-indigo-400" /> Upload Artifacts
          </button>
        </div>

        {/* Live Interactive Graph Preview Teaser Widget */}
        <GlassCard className="max-w-4xl mx-auto p-6 relative border-indigo-500/30 shadow-2xl text-left">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-400">Live Graph Preview • Aarav Sharma (BCA CS)</span>
            </div>
            <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3" />}>
              100% Verified
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Primary Skills</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-medium">Python (92%)</span>
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-medium">FastAPI (88%)</span>
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-medium">React & TS (90%)</span>
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-medium">AWS (85%)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Verified Projects</div>
              <div className="space-y-1 text-xs text-slate-300">
                <div className="font-semibold text-slate-100">🏆 MedVision Diagnostic AI</div>
                <div className="text-[11px] text-slate-400">SIH 2025 1st Place • PyTorch + FastAPI</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Credentials</div>
              <div className="space-y-1 text-xs text-slate-300">
                <div className="font-semibold text-slate-100">☁️ AWS Cloud Practitioner</div>
                <div className="text-[11px] text-slate-400">Score 890/1000 • Verified Certificate</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Target User Personas Showcase */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="purple" size="md" className="mb-3">Persona Specs</Badge>
          <h2 className="text-3xl font-extrabold text-white">Built for Every Phase of Your Tech Career</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard glowColor="indigo" className="p-6">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">College Student</h3>
            <p className="text-xs text-indigo-400 font-medium mb-3">Aarav Sharma (20, BCA/CS)</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Organizes hackathon certs, GitHub repos, and assignments into a verified career graph for campus placements.
            </p>
          </GlassCard>

          <GlassCard glowColor="purple" className="p-6">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">Job Seeker</h3>
            <p className="text-xs text-purple-400 font-medium mb-3">Priya Patel (24, Junior Dev)</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tailors resumes instantly for 20+ applications per week while highlighting verified transferable skills.
            </p>
          </GlassCard>

          <GlassCard glowColor="amber" className="p-6">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">Freelancer</h3>
            <p className="text-xs text-amber-400 font-medium mb-3">Rohan Mehta (26, Consultant)</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Presents interactive proof-of-work graphs to high-ticket clients to establish instant technical authority.
            </p>
          </GlassCard>

          <GlassCard glowColor="emerald" className="p-6">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">Recruiter</h3>
            <p className="text-xs text-emerald-400 font-medium mb-3">Sarah Jenkins (32, Recruiter)</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifies candidate project depth, metrics, and document authenticity in 10 seconds without reading long PDFs.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <Badge variant="cyan" size="md" className="mb-3">Platform Capabilities</Badge>
          <h2 className="text-3xl font-extrabold text-white">Dynamic, Queryable, and Actionable</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-4">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Interactive Knowledge Graph</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visualizes how your skills, projects, certifications, and roles interconnect. Includes Career Playback mode to watch your growth year-by-year.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">Natural Language Document Q&A</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask ChatGPT-style questions about your career memory. Answers feature interactive citation pills linking directly back to PDF source chunks.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">1-Click Web Portfolio & PDF Resume</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate hosted web portfolios with theme customization (Glass, Cyber, Minimal), QR codes, and automated resume formatting.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-white/10 text-center bg-[#09090b]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Unlock Your Career Intelligence?</h2>
          <p className="text-slate-400 text-xs mb-6">Experience CareerGraph AI with pre-loaded sample data in 1 click.</p>
          <button
            onClick={onEnterApp}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-glow-indigo hover:opacity-90 transition-all inline-flex items-center gap-2"
          >
            Launch CareerGraph AI Hub <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
