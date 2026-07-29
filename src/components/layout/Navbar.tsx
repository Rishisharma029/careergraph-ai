import React, { useState } from 'react';
import { Search, Sparkles, UserCheck, ShieldCheck, ChevronDown, Check, Globe, Sliders } from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';
import { PersonaType } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onNavigate }) => {
  const { currentPersona, setPersona, recruiterViewActive, toggleRecruiterView } = useCareerStore();
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);

  const personas: { id: PersonaType; label: string; role: string; icon: string } = [
    { id: 'student', label: 'Rishi Sharma', role: 'BCA Student / Full-Stack AI Engineer', icon: '👤' },
    { id: 'jobseeker', label: 'Jobseeker Mode', role: 'Highlighting TrOCR & AI Projects', icon: '💼' },
    { id: 'freelancer', label: 'Freelancer Mode', role: 'Contract & Document AI Specialist', icon: '⚡' },
    { id: 'recruiter', label: 'Recruiter View', role: 'Verified Proof & Evidence Mode', icon: '🔍' }
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#09090b]/90 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 md:px-6">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 text-slate-400 text-xs transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
            <span className="truncate font-medium">Search graph, docs & skills...</span>
          </div>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-white/10 text-slate-300 rounded border border-white/10">
            /
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Recruiter View Toggle */}
        <button
          onClick={toggleRecruiterView}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
            recruiterViewActive
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-emerald'
              : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
          }`}
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${recruiterViewActive ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>{recruiterViewActive ? 'Recruiter Mode Active' : 'Recruiter View'}</span>
        </button>

        {/* Upload Button */}
        <button
          onClick={() => onNavigate('upload')}
          className="hidden sm:flex px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs items-center gap-1.5 shadow-glow-purple hover:opacity-90 transition-all"
        >
          <span>+ Upload Docs</span>
        </button>

        {/* User Profile Dropdown (FIXED NAME: Rishi Sharma) */}
        <div className="relative">
          <button
            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-xs font-extrabold text-white">
              RS
            </div>
            <div className="hidden md:block text-left pr-1">
              <div className="text-xs font-bold text-slate-100 leading-none">Rishi Sharma</div>
              <div className="text-[10px] text-purple-300 font-mono mt-0.5 leading-none">Full-Stack AI Engineer</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isPersonaMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1">
                Switch Persona Profile
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setPersona('student');
                    setIsPersonaMenuOpen(false);
                  }}
                  className="w-full p-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-left text-xs text-purple-300 font-bold flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span>👤</span>
                    <div>
                      <div>Rishi Sharma</div>
                      <div className="text-[10px] text-slate-400 font-normal">BCA @ Satyug Darshan</div>
                    </div>
                  </div>
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
