import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Pages
import { LandingPage } from './pages/Landing/Landing';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { UploadStudio } from './pages/Upload/Upload';
import { DocumentsHub } from './pages/Documents/Documents';
import { KnowledgeGraphCanvas } from './pages/KnowledgeGraph/KnowledgeGraph';
import { CareerTimeline } from './pages/Timeline/Timeline';
import { AISearchChat } from './pages/Search/Search';
import { SkillAnalytics } from './pages/Analytics/Analytics';
import { ProfileExporter } from './pages/Profile/Profile';
import { SettingsPage } from './pages/Settings/Settings';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleNavigate = (route: string) => {
    const targetRoute = route === 'knowledge-graph' ? 'graph' : route;
    setCurrentRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Keyboard Shortcuts (/ = Search, Esc = Close, G = Graph, T = Timeline)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      } else if (e.key === 'g' || e.key === 'G') {
        if (currentRoute !== 'landing') {
          handleNavigate('graph');
        }
      } else if (e.key === 't' || e.key === 'T') {
        if (currentRoute !== 'landing') {
          handleNavigate('timeline');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoute]);

  // If on landing page, show un-shelled Landing view
  if (currentRoute === 'landing') {
    return (
      <>
        <LandingPage onEnterApp={() => handleNavigate('home')} />
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleNavigate}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Layout Shell: Sidebar + Content */}
      <div className="flex-1 flex">
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Route Render */}
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between">
          <div>
            {currentRoute === 'home' && <Dashboard onNavigate={handleNavigate} />}
            {currentRoute === 'upload' && <UploadStudio onNavigate={handleNavigate} />}
            {currentRoute === 'documents' && <DocumentsHub onNavigate={handleNavigate} />}
            {(currentRoute === 'graph' || currentRoute === 'knowledge-graph') && <KnowledgeGraphCanvas onNavigate={handleNavigate} />}
            {currentRoute === 'timeline' && <CareerTimeline onNavigate={handleNavigate} />}
            {currentRoute === 'search' && <AISearchChat onNavigate={handleNavigate} />}
            {currentRoute === 'analytics' && <SkillAnalytics onNavigate={handleNavigate} />}
            {currentRoute === 'profile' && <ProfileExporter onNavigate={handleNavigate} />}
            {currentRoute === 'settings' && <SettingsPage onNavigate={handleNavigate} />}
          </div>

          {/* ⭐ SMALL FOOTER WITH RISHI SHARMA */}
          <footer className="p-3 border-t border-white/10 text-center text-[11px] text-slate-400 font-mono flex flex-wrap items-center justify-between gap-2 px-6 bg-[#09090b]">
            <div className="flex items-center gap-1.5">
              <span>Crafted with ❤️ by</span>
              <span className="font-extrabold text-purple-400 tracking-wider">RISHI SHARMA</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>CareerGraph AI v1.0.0</span>
              <span>•</span>
              <span>Microsoft TrOCR</span>
              <span>•</span>
              <span>React & TS</span>
              <span>•</span>
              <span>FastAPI</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Search Cmd+K Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default App;
