import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import InnovationShowcase from './components/InnovationShowcase';
import PerformanceSection from './components/PerformanceSection';
import DatasetsGallery from './components/DatasetsGallery';
import Laboratory from './components/Laboratory';
import ImpactDashboard from './components/ImpactDashboard';
import Communication from './components/Communication';
import ContactSection from './components/ContactSection';
import Researchers from './components/Researchers';
import Partners from './components/Partners';
import AdminConsole from './components/AdminConsole';
import { Language } from './types';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Award, 
  FileCheck 
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load and apply theme class configuration on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Dynamic Scroll spy active segment highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero', 'showcase', 'communication', 'performance', 'datasets', 
        'people', 'laboratory', 'impact', 'contact'
      ];

      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const pubSection = document.getElementById('performance');
      if (pubSection) {
        pubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden">
      
      {/* Frosted Glass Background Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-500/10 dark:bg-[#0B4F6C]/20 rounded-full blur-[140px] transition-colors duration-500" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-sky-500/10 dark:bg-[#2563EB]/10 rounded-full blur-[140px] transition-colors duration-500" />
        <div className="absolute inset-0 opacity-15 dark:opacity-30" style={{ backgroundImage: 'linear-gradient(to right, rgba(120,120,120,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
      </div>

      {/* 1. Global Navigation Bar */}
      <Navigation 
        lang={lang} 
        setLang={setLang}
        darkMode={theme === 'dark'}
        setDarkMode={(isDark) => setTheme(isDark ? 'dark' : 'light')}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenChat={() => {}}
        globalSearchQuery={searchQuery}
        setGlobalSearchQuery={handleGlobalSearch}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Layout sections */}
      <main className="relative">
        
        {/* 2. Fullscreen Hero Segment */}
        <Hero 
          lang={lang} 
          setActiveSection={setActiveSection} 
        />

        {/* 4. Innovation Showcase (Flagships) */}
        <InnovationShowcase 
          lang={lang}
        />

        {/* 7. Clinical Reference Datasets */}
        <DatasetsGallery 
          lang={lang} 
        />

        {/* 12. Announcements Newsroom and Event Scheduler */}
        <Communication 
          lang={lang} 
        />

        {/* Center Performance Section */}
        <PerformanceSection 
          lang={lang}
        />

        {/* Researchers & Team */}
        <Researchers 
          lang={lang} 
        />

        {/* 8. GPU Computation Lab Monitor */}
        <Laboratory 
          lang={lang} 
        />

        {/* 11. Impact and Citations Dashboard */}
        <ImpactDashboard 
          lang={lang} 
        />

        {/* Our Partners Scrolling Logo Marquee */}
        <Partners 
          lang={lang}
        />

        {/* 15. Physical Map Contact Section */}
        <ContactSection 
          lang={lang} 
        />

      </main>

      <AdminConsole 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        lang={lang} 
      />

    </div>
  );
}
