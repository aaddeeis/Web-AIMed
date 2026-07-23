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
  ArrowLeft 
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

  // Scroll to top whenever active view section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setActiveSection('performance');
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
        
        {/* Subpage Breadcrumb Navigation Bar for Standalone Views */}
        {activeSection !== 'hero' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 animate-fade-in">
            <button
              onClick={() => setActiveSection('hero')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'en' ? 'Back to Main Page' : 'Kembali ke Halaman Utama'}</span>
            </button>
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider bg-teal-500/10 px-3 py-1 rounded-lg">
              {activeSection === 'showcase' && (lang === 'en' ? 'Products & Innovations' : 'Produk & Inovasi')}
              {activeSection === 'communication' && (lang === 'en' ? 'CoE Communication Hub' : 'Hub Komunikasi CoE')}
              {activeSection === 'performance' && (lang === 'en' ? 'Academic & Operational Performance' : 'Kinerja Akademik & Operasional')}
              {activeSection === 'datasets' && (lang === 'en' ? 'Clinical Reference Datasets' : 'Dataset Referensi Klinis')}
              {(activeSection === 'people' || activeSection === 'students') && (lang === 'en' ? 'Expert Researchers & Scholars' : 'Peneliti Ahli & Akademisi')}
            </div>
          </div>
        )}

        {/* VIEW-BASED RENDERING */}
        {activeSection === 'hero' ? (
          /* Halaman Utama (Main Page) */
          <>
            <Hero 
              lang={lang} 
              setActiveSection={setActiveSection} 
            />
            <InnovationShowcase 
              lang={lang}
            />
            <Communication 
              lang={lang} 
            />
            <Laboratory 
              lang={lang} 
            />
            <ImpactDashboard 
              lang={lang} 
            />
            <Partners 
              lang={lang}
            />
            <ContactSection 
              lang={lang} 
            />
          </>
        ) : activeSection === 'showcase' ? (
          /* Tampilan Produk (Products View) */
          <>
            <InnovationShowcase lang={lang} />
            <ContactSection lang={lang} />
          </>
        ) : activeSection === 'communication' ? (
          /* Tampilan Komunikasi (Communication View) */
          <>
            <Communication lang={lang} />
            <ContactSection lang={lang} />
          </>
        ) : activeSection === 'performance' ? (
          /* Tampilan Performance / Kinerja (Performance View) */
          <>
            <PerformanceSection lang={lang} />
            <ContactSection lang={lang} />
          </>
        ) : activeSection === 'datasets' ? (
          /* Tampilan Dataset (Datasets View) */
          <>
            <DatasetsGallery lang={lang} />
            <ContactSection lang={lang} />
          </>
        ) : (activeSection === 'people' || activeSection === 'students') ? (
          /* Tampilan Peneliti (Researchers View) */
          <>
            <Researchers lang={lang} />
            <ContactSection lang={lang} />
          </>
        ) : (
          /* Default Fallback ke Halaman Utama */
          <>
            <Hero 
              lang={lang} 
              setActiveSection={setActiveSection} 
            />
            <InnovationShowcase 
              lang={lang}
            />
            <Communication 
              lang={lang} 
            />
            <Laboratory 
              lang={lang} 
            />
            <ImpactDashboard 
              lang={lang} 
            />
            <Partners 
              lang={lang}
            />
            <ContactSection 
              lang={lang} 
            />
          </>
        )}

      </main>

      <AdminConsole 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        lang={lang} 
      />

    </div>
  );
}
