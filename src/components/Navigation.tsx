import React, { useState } from 'react';
import { 
  Brain, 
  Globe, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Cpu, 
  Users, 
  Activity, 
  Network, 
  FileText,
  MessageSquare,
  Trophy,
  Settings
} from 'lucide-react';
import { Language } from '../types';

interface NavigationProps {
  lang: Language;
  setLang: (l: Language) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  onOpenChat: () => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  onOpenAdmin: () => void;
}

export default function Navigation({
  lang,
  setLang,
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  onOpenChat,
  globalSearchQuery,
  setGlobalSearchQuery,
  onOpenAdmin
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const menuItems = [
    { id: 'hero', label: { en: 'Home', id: 'Beranda' }, icon: Brain },
    { id: 'showcase', label: { en: 'Products', id: 'Produk' }, icon: Activity },
    { id: 'communication', label: { en: 'Communication', id: 'Komunikasi' }, icon: MessageSquare },
    { id: 'performance', label: { en: 'Performance', id: 'Kinerja' }, icon: Trophy },
    { id: 'datasets', label: { en: 'Datasets', id: 'Dataset' }, icon: FileText },
    { id: 'people', label: { en: 'Researchers', id: 'Peneliti' }, icon: Users },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/40 dark:bg-slate-950/40 border-b border-black/5 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" id="nav-desktop-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-teal-500/10 dark:bg-white/10 text-teal-600 dark:text-teal-300 border border-teal-500/10 dark:border-white/10' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{lang === 'en' ? item.label.en : item.label.id}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Operations Toolbar */}
        <div className="flex items-center space-x-4" id="nav-right-toolbar">
          {/* Global Search Box */}
          <div className={`relative hidden md:flex items-center rounded-xl border transition-all duration-300 ${
            searchFocused 
              ? 'border-teal-500 ring-2 ring-teal-500/20 w-56 bg-white/80 dark:bg-slate-950/80' 
              : 'border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.03] w-44'
          }`}>
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search research...' : 'Cari riset...'}
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-9 pr-3 py-1.5 bg-transparent text-xs text-slate-800 dark:text-slate-100 outline-none placeholder-slate-400"
            />
          </div>

          {/* Admin CMS Toggle */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-teal-500/20 dark:border-teal-500/10 bg-teal-500/10 dark:bg-teal-500/5 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 transition-all font-bold text-xs cursor-pointer"
            title={lang === 'en' ? 'Manage Content (CMS)' : 'Kelola Konten (CMS)'}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">CMS</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all"
            title={lang === 'en' ? 'Terjemahkan ke Bahasa Indonesia' : 'Translate to English'}
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{lang === 'en' ? 'ID' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/5 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-black/5 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-4 py-6 space-y-3 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex items-center border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search research...' : 'Cari riset...'}
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5 text-slate-400" />
                  <span>{lang === 'en' ? item.label.en : item.label.id}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onOpenAdmin();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 cursor-pointer"
          >
            <Settings className="w-5 h-5" />
            <span>{lang === 'en' ? 'Manage Content (CMS)' : 'Kelola Konten (CMS)'}</span>
          </button>

          {/* Removed AI Advisor button */}
        </div>
      )}
    </header>
  );
}
