import React, { useState } from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  FolderKanban,
  Network,
  History,
  MessageSquareCode,
  LineChart,
  UserCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useCareerStore } from '../../store/useCareerStore';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { artifacts, nodes, recruiterViewActive } = useCareerStore();

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Studio', icon: UploadCloud, badge: 'AI OCR' },
    { id: 'documents', label: 'Documents Hub', icon: FolderKanban, count: artifacts.length },
    { id: 'graph', label: 'Knowledge Graph', icon: Network, count: nodes.length, highlight: true },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'search', label: 'AI Search & Q&A', icon: MessageSquareCode, badge: 'RAG' },
    { id: 'analytics', label: 'Skill Analytics', icon: LineChart },
    { id: 'profile', label: 'Portfolio Exporter', icon: UserCheck, badge: '1-Click' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`relative sticky top-16 h-[calc(100vh-4rem)] bg-[#09090b]/90 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Logo & Header */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-glow-indigo group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center">
                <Network className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            {!collapsed && (
              <div>
                <div className="text-base font-extrabold tracking-tight gradient-text font-sans">
                  CareerGraph AI
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400 inline" /> Intelligence Hub
                </div>
              </div>
            )}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Recruiter Mode Alert Banner */}
        {!collapsed && recruiterViewActive && (
          <div className="m-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold">Recruiter Mode</div>
              <div className="text-[10px] text-emerald-400/80">Showing verified candidate evidence</div>
            </div>
          </div>
        )}

        {/* Navigation Item List */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-14rem)]">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id === 'graph' && (currentRoute === 'graph' || currentRoute === 'knowledge-graph'));

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-300 border border-indigo-500/40 shadow-[0_0_15px_-4px_rgba(99,102,241,0.4)]'
                    : 'hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && (
                  <div className="flex items-center gap-1.5">
                    {item.count !== undefined && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-slate-400 border border-white/5">
                        {item.count}
                      </span>
                    )}
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Status */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Knowledge Graph</span>
            <span className="text-emerald-400 font-semibold">100% Synced</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-full animate-pulse" />
          </div>
        </div>
      )}
    </aside>
  );
};
