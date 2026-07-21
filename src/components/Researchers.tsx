import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Globe, 
  ExternalLink, 
  BookOpen, 
  Compass, 
  ChevronDown, 
  ChevronUp,
  Award,
  Bookmark,
  Users,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Search,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

interface ResearchersProps {
  lang: Language;
}

interface Person {
  id: string;
  name: string;
  role: { en: string; id: string };
  email?: string;
  image?: string;
  institution?: { en: string; id: string }; // for collaborators
  topic?: { en: string; id: string }; // for assistants / students
  supervisor?: string; // for students
  interests?: { en: string[]; id: string[] };
  researchFocus?: { en: string; id: string };
  scholar?: string;
  scopus?: string;
  orcid?: string;
  currentProjects?: string[];
  latestPublications?: string[];
}

export default function Researchers({ lang }: ResearchersProps) {
  const {
    leadership,
    assistants,
    members,
    collaborators,
    postgraduate,
    graduate,
    undergraduate
  } = useData();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeIndices, setActiveIndices] = useState<{ [key: string]: number }>({});
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const scroll = (key: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[key];
    if (container) {
      const { scrollLeft, clientWidth } = container;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (key: string) => {
    const container = scrollRefs.current[key];
    if (container) {
      const scrollLeft = container.scrollLeft;
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length > 0) {
        let closestIndex = 0;
        let minDistance = Infinity;
        cards.forEach((card, idx) => {
          const cardOffset = card.offsetLeft - container.offsetLeft;
          const distance = Math.abs(cardOffset - scrollLeft);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });
        if (activeIndices[key] !== closestIndex) {
          setActiveIndices(prev => ({ ...prev, [key]: closestIndex }));
        }
      }
    }
  };

  const scrollToItem = (key: string, index: number) => {
    const container = scrollRefs.current[key];
    if (container) {
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards && cards[index]) {
        const card = cards[index];
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
        setActiveIndices(prev => ({ ...prev, [key]: index }));
      }
    }
  };

  // Automatic slideshow autoplay for team categories with multiple members
  useEffect(() => {
    const keys = ['assistants', 'members', 'collaborators', 'postgraduate', 'graduate', 'undergraduate'];
    const intervals: { [key: string]: NodeJS.Timeout } = {};

    keys.forEach((key) => {
      let dataLength = 0;
      if (key === 'assistants') dataLength = assistants?.length || 0;
      else if (key === 'members') dataLength = members?.length || 0;
      else if (key === 'collaborators') dataLength = collaborators?.length || 0;
      else if (key === 'postgraduate') dataLength = postgraduate?.length || 0;
      else if (key === 'graduate') dataLength = graduate?.length || 0;
      else if (key === 'undergraduate') dataLength = undergraduate?.length || 0;

      if (dataLength <= 1) return;

      intervals[key] = setInterval(() => {
        if ((activeTab === 'all' || activeTab === key) && hoveredKey !== key) {
          const currentIndex = activeIndices[key] || 0;
          const nextIndex = (currentIndex + 1) % dataLength;
          scrollToItem(key, nextIndex);
        }
      }, 4000); // 4 seconds auto-slide
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [activeTab, hoveredKey, activeIndices, assistants, members, collaborators, postgraduate, graduate, undergraduate]);

  const tabs = [
    { id: 'all', label: { en: 'All Team', id: 'Semua Tim' } },
    { id: 'leadership', label: { en: 'Leadership', id: 'Pimpinan' } },
    { id: 'assistants', label: { en: 'Research Assistants', id: 'Asisten Peneliti' } },
    { id: 'members', label: { en: 'Members', id: 'Anggota' } },
    { id: 'collaborators', label: { en: 'External Collaborators', id: 'Kolaborator Eksternal' } },
    { id: 'postgraduate', label: { en: 'Postgraduate (S3)', id: 'Pascasarjana (S3)' } },
    { id: 'graduate', label: { en: 'Graduate (S2)', id: 'Magister (S2)' } },
    { id: 'undergraduate', label: { en: 'Undergraduate (S1)', id: 'Sarjana (S1)' } }
  ];

  return (
    <section id="people" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-4 py-1.5 rounded-full shadow-sm">
            {lang === 'en' ? 'AIMed RESEARCH TEAM' : 'TIM PENELITI AIMed'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-5 mb-4">
            {lang === 'en' ? 'Our Expert Researchers & Scholars' : 'Peneliti Ahli & Akademisi Kami'}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-sky-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' 
              ? 'Meet the brilliant minds steering clinical AI innovation, from executive directors to passionate graduate and undergraduate scholars.'
              : 'Temui para pemikir brilian yang mengarahkan inovasi AI klinis, mulai dari direktur eksekutif hingga akademisi sarjana dan magister yang berdedikasi.'}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-20 max-w-5xl mx-auto" id="team-category-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all duration-300 cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white border-transparent shadow-lg shadow-teal-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-[1.02]'
              }`}
            >
              {lang === 'en' ? tab.label.en : tab.label.id}
            </button>
          ))}
        </div>

        {/* Team Display Panels */}
        <div className="space-y-28">
          
          {/* CATEGORY: Leadership (Ketua & Sekretaris) */}
          {(activeTab === 'all' || activeTab === 'leadership') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-teal-500/10 rounded-xl">
                  <UserCheck className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'CoE Leadership' : 'Pimpinan Pusat Unggulan (CoE)'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {leadership.map((leader) => {
                  return (
                    <div 
                      key={leader.id}
                      className="glass-card bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between items-center text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] group hover:border-teal-500/20"
                    >
                      <div className="space-y-5 flex flex-col items-center w-full">
                        {leader.image && (
                          <div className="relative overflow-hidden rounded-3xl w-40 h-40 sm:w-44 sm:h-44 shadow-lg border-4 border-slate-100 dark:border-slate-800/80 group-hover:border-teal-500/20">
                            <img 
                              src={leader.image} 
                              alt={leader.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <span className="inline-block px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-teal-600 dark:text-teal-400 bg-teal-500/10 rounded-lg uppercase">
                            {lang === 'en' ? leader.role.en : leader.role.id}
                          </span>
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                            {leader.name}
                          </h4>
                        </div>
                        
                        {/* Scholar links */}
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {leader.scholar && (
                            <a 
                              href={leader.scholar} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                            >
                              <span>Google Scholar</span>
                            </a>
                          )}
                          {leader.scopus && (
                            <a 
                              href={leader.scopus} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                            >
                              <span>Scopus ID</span>
                            </a>
                          )}
                          {leader.orcid && (
                            <a 
                              href={leader.orcid} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                            >
                              <span>ORCID</span>
                            </a>
                          )}
                        </div>

                        {/* Core research focus */}
                        {(leader.researchFocus || leader.interests) && (
                          <div className="bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 w-full mt-3 text-left">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              {lang === 'en' ? 'Research Focus' : 'Fokus Riset'}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                              {leader.researchFocus 
                                ? (lang === 'en' ? leader.researchFocus.en : leader.researchFocus.id)
                                : (lang === 'en' ? leader.interests.en.join(', ') : leader.interests.id.join(', '))
                              }
                            </p>
                          </div>
                        )}
                      </div>

                      {leader.email && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-5 w-full flex justify-center">
                          <a 
                            href={`mailto:${leader.email}`}
                            className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center space-x-1.5 hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{leader.email}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CATEGORY: Research Assistants */}
          {(activeTab === 'all' || activeTab === 'assistants') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-sky-500/10 rounded-xl">
                  <Briefcase className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Research Assistants' : 'Asisten Peneliti'}
                </h3>
              </div>
              
              <div 
                className="relative group/carousel max-w-6xl mx-auto"
                onMouseEnter={() => setHoveredKey('assistants')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Scroll Navigation Buttons */}
                {assistants.length > 1 && (
                  <>
                    <button 
                      onClick={() => scroll('assistants', 'left')}
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('assistants', 'right')}
                      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div 
                  ref={el => { scrollRefs.current['assistants'] = el; }}
                  onScroll={() => handleScroll('assistants')}
                  className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {assistants.map((assistant) => {
                    const isUser = assistant.name.includes("Ade Iriani");
                    return (
                      <div 
                        key={assistant.id}
                        className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start glass-card p-6 flex flex-col justify-between items-center text-center rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] group ${
                          isUser 
                            ? 'bg-gradient-to-br from-teal-500/[0.03] to-sky-500/[0.03] border-teal-500/30 dark:border-teal-400/30 shadow-md ring-2 ring-teal-500/10' 
                            : 'bg-white/80 dark:bg-slate-900/80 border-slate-100 dark:border-slate-800 hover:border-teal-500/20'
                        }`}
                      >
                        <div className="space-y-5 flex flex-col items-center w-full">
                          {assistant.image && (
                            <div className={`relative overflow-hidden rounded-3xl w-40 h-40 sm:w-44 sm:h-44 shadow-lg border-4 transition-all duration-500 ${
                              isUser 
                                ? 'border-teal-500/20 group-hover:border-teal-500/40' 
                                : 'border-slate-100 dark:border-slate-800/80 group-hover:border-teal-500/20'
                            }`}>
                              <img 
                                src={assistant.image} 
                                alt={assistant.name} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                              />
                              {isUser && (
                                <div className="absolute top-2 right-2 p-1.5 bg-teal-500 text-white rounded-xl shadow-md">
                                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <span className={`inline-block px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider rounded-lg uppercase ${
                              isUser 
                                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' 
                                : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                            }`}>
                              {lang === 'en' ? assistant.role.en : assistant.role.id}
                            </span>
                            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                              {assistant.name}
                            </h4>
                          </div>

                          {/* Scholar links */}
                          <div className="flex flex-wrap justify-center gap-1.5">
                            {assistant.scholar && (
                              <a 
                                href={assistant.scholar} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                              >
                                <span>Google Scholar</span>
                              </a>
                            )}
                            {assistant.scopus && (
                              <a 
                                href={assistant.scopus} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                              >
                                <span>Scopus ID</span>
                              </a>
                            )}
                            {assistant.orcid && (
                              <a 
                                href={assistant.orcid} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                              >
                                <span>ORCID</span>
                              </a>
                            )}
                          </div>

                          {assistant.topic && (
                            <div className="bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 w-full mt-3 text-left">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                {lang === 'en' ? 'Research Portfolio' : 'Portofolio Riset'}
                              </span>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                                {lang === 'en' ? assistant.topic.en : assistant.topic.id}
                              </p>
                            </div>
                          )}
                        </div>

                        {assistant.email && (
                          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-5 w-full flex justify-center">
                            <a 
                              href={`mailto:${assistant.email}`}
                              className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center space-x-1.5 hover:underline"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{assistant.email}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Carousel Indicators */}
                {assistants.length > 1 && (
                  <div className="flex justify-center space-x-1.5 mt-4">
                    {assistants.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToItem('assistants', idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          (activeIndices['assistants'] || 0) === idx
                            ? 'w-5 bg-teal-500'
                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CATEGORY: Members */}
          {(activeTab === 'all' || activeTab === 'members') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-teal-500/10 rounded-xl">
                  <Users className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Core Members' : 'Anggota Inti'}
                </h3>
              </div>
              
              <div 
                className="relative group/carousel max-w-6xl mx-auto"
                onMouseEnter={() => setHoveredKey('members')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Scroll Navigation Buttons */}
                {members.length > 1 && (
                  <>
                    <button 
                      onClick={() => scroll('members', 'left')}
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('members', 'right')}
                      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div 
                  ref={el => { scrollRefs.current['members'] = el; }}
                  onScroll={() => handleScroll('members')}
                  className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {members.map((member) => (
                    <div 
                      key={member.id}
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start glass-card p-6 flex flex-col justify-between items-center text-center rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-teal-500/20 hover:shadow-2xl transition-all duration-500 group"
                    >
                      <div className="space-y-5 flex flex-col items-center w-full">
                        {member.image && (
                          <div className="relative overflow-hidden rounded-3xl w-40 h-40 sm:w-44 sm:h-44 shadow-lg border-4 border-slate-100 dark:border-slate-800/80 group-hover:border-teal-500/20">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <span className="inline-block px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg uppercase">
                            {lang === 'en' ? 'Member' : 'Anggota'}
                          </span>
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                            {member.name}
                          </h4>
                        </div>

                        {/* Scholar links */}
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {member.scholar && (
                            <a 
                              href={member.scholar} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                            >
                              <span>Google Scholar</span>
                            </a>
                          )}
                          {member.scopus && (
                            <a 
                              href={member.scopus} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                            >
                              <span>Scopus ID</span>
                            </a>
                          )}
                          {member.orcid && (
                            <a 
                              href={member.orcid} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 hover:border-teal-500/20 dark:hover:bg-teal-400/5 border border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl transition-all"
                            >
                              <span>ORCID</span>
                            </a>
                          )}
                        </div>

                        {(member.researchFocus || member.topic || member.interests) && (
                          <div className="bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 w-full mt-3 text-left">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              {lang === 'en' ? 'Research Focus' : 'Fokus Riset'}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                              {member.researchFocus 
                                ? (lang === 'en' ? member.researchFocus.en : member.researchFocus.id)
                                : member.topic 
                                  ? (lang === 'en' ? member.topic.en : member.topic.id)
                                  : (lang === 'en' ? member.interests.en.join(', ') : member.interests.id.join(', '))
                              }
                            </p>
                          </div>
                        )}
                      </div>

                      {member.email && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-5 w-full flex justify-center">
                          <a 
                            href={`mailto:${member.email}`}
                            className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center space-x-1.5 hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{member.email}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                {members.length > 1 && (
                  <div className="flex justify-center space-x-1.5 mt-4">
                    {members.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToItem('members', idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          (activeIndices['members'] || 0) === idx
                            ? 'w-5 bg-teal-500'
                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CATEGORY: External Collaborators */}
          {(activeTab === 'all' || activeTab === 'collaborators') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-indigo-500/10 rounded-xl">
                  <Globe className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'External Collaborators' : 'Kolaborator Eksternal'}
                </h3>
              </div>
              
              <div 
                className="relative group/carousel max-w-6xl mx-auto"
                onMouseEnter={() => setHoveredKey('collaborators')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Scroll Navigation Buttons */}
                {collaborators.length > 1 && (
                  <>
                    <button 
                      onClick={() => scroll('collaborators', 'left')}
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('collaborators', 'right')}
                      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div 
                  ref={el => { scrollRefs.current['collaborators'] = el; }}
                  onScroll={() => handleScroll('collaborators')}
                  className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {collaborators.map((col) => (
                    <div 
                      key={col.id}
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start glass-card p-6 flex flex-col justify-between items-center text-center rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/20 hover:shadow-2xl transition-all duration-500 group"
                    >
                      <div className="space-y-5 flex flex-col items-center w-full">
                        {col.image && (
                          <div className="relative overflow-hidden rounded-3xl w-40 h-40 sm:w-44 sm:h-44 shadow-lg border-4 border-slate-100 dark:border-slate-800/80 group-hover:border-indigo-500/20">
                            <img 
                              src={col.image} 
                              alt={col.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                            {col.name}
                          </h4>
                          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            {lang === 'en' ? col.role.en : col.role.id}
                          </p>
                        </div>

                        {col.institution && (
                          <div className="px-3.5 py-2 bg-indigo-500/5 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-xl border border-indigo-500/10 inline-block">
                            {lang === 'en' ? col.institution.en : col.institution.id}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                {collaborators.length > 1 && (
                  <div className="flex justify-center space-x-1.5 mt-4">
                    {collaborators.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToItem('collaborators', idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          (activeIndices['collaborators'] || 0) === idx
                            ? 'w-5 bg-indigo-500'
                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STUDENTS SECTIONS (Postgraduate, Graduate, Undergraduate) */}
          
          {/* CATEGORY: Postgraduate Students */}
          {(activeTab === 'all' || activeTab === 'postgraduate') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-teal-500/10 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Postgraduate Students (S3 / Doctoral)' : 'Mahasiswa Pascasarjana (S3 / Doktor)'}
                </h3>
              </div>
              
              <div 
                className="relative group/carousel max-w-6xl mx-auto"
                onMouseEnter={() => setHoveredKey('postgraduate')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Scroll Navigation Buttons */}
                {postgraduate.length > 1 && (
                  <>
                    <button 
                      onClick={() => scroll('postgraduate', 'left')}
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('postgraduate', 'right')}
                      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div 
                  ref={el => { scrollRefs.current['postgraduate'] = el; }}
                  onScroll={() => handleScroll('postgraduate')}
                  className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {postgraduate.map((student) => (
                    <div 
                      key={student.id}
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start glass-card p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 hover:border-teal-500/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
                    >
                      <div className="space-y-5 flex flex-col items-center">
                        {student.image && (
                          <div className="relative overflow-hidden rounded-3xl w-36 h-36 sm:w-40 sm:h-40 shadow-lg border-4 border-slate-100 dark:border-slate-800/80 group-hover:border-teal-500/20">
                            <img 
                              src={student.image} 
                              alt={student.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        
                        <div className="text-center space-y-1">
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                            {student.name}
                          </h4>
                          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-lg inline-block uppercase tracking-wider">
                            {lang === 'en' ? student.role.en : student.role.id}
                          </span>
                        </div>
                        
                        <div className="mt-4 space-y-3 text-xs w-full bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                          <p className="text-slate-600 dark:text-slate-300 font-medium">
                            <strong className="text-slate-400 dark:text-slate-500 uppercase text-[9px] tracking-wider block mb-1">
                              {lang === 'en' ? 'Dissertation Focus:' : 'Fokus Disertasi:'}
                            </strong> 
                            <span className="font-semibold">{lang === 'en' ? student.topic?.en : student.topic?.id}</span>
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-900">
                            <strong>{lang === 'en' ? 'Primary Advisor:' : 'Pembimbing Utama:'}</strong> <span className="font-semibold">{student.supervisor}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                {postgraduate.length > 1 && (
                  <div className="flex justify-center space-x-1.5 mt-4">
                    {postgraduate.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToItem('postgraduate', idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          (activeIndices['postgraduate'] || 0) === idx
                            ? 'w-5 bg-teal-500'
                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CATEGORY: Graduate Students */}
          {(activeTab === 'all' || activeTab === 'graduate') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-teal-500/10 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Graduate Students (S2 / Masters)' : 'Mahasiswa Magister (S2)'}
                </h3>
              </div>
              
              <div 
                className="relative group/carousel max-w-6xl mx-auto"
                onMouseEnter={() => setHoveredKey('graduate')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Scroll Navigation Buttons */}
                {graduate.length > 1 && (
                  <>
                    <button 
                      onClick={() => scroll('graduate', 'left')}
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('graduate', 'right')}
                      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div 
                  ref={el => { scrollRefs.current['graduate'] = el; }}
                  onScroll={() => handleScroll('graduate')}
                  className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {graduate.map((student) => {
                    const isUser = student.name.includes("Ade Iriani");
                    return (
                      <div 
                        key={student.id}
                        className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start glass-card p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between group ${
                          isUser
                            ? 'bg-gradient-to-br from-teal-500/[0.03] to-sky-500/[0.03] border-teal-500/30 dark:border-teal-400/30 shadow-md hover:shadow-2xl ring-2 ring-teal-500/10 scale-[1.01]'
                            : 'bg-white/80 dark:bg-slate-900/80 border-slate-100 dark:border-slate-800 hover:border-teal-500/20 hover:shadow-2xl'
                        }`}
                      >
                        <div className="space-y-5 flex flex-col items-center">
                          {student.image && (
                            <div className={`relative overflow-hidden rounded-3xl w-36 h-36 sm:w-40 sm:h-40 shadow-lg border-4 transition-all duration-500 ${
                              isUser 
                                ? 'border-teal-500/20 group-hover:border-teal-500/45' 
                                : 'border-slate-100 dark:border-slate-800/80 group-hover:border-teal-500/20'
                            }`}>
                              <img 
                                src={student.image} 
                                alt={student.name} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                              />
                              {isUser && (
                                <div className="absolute top-2 right-2 p-1.5 bg-teal-500 text-white rounded-xl shadow-md">
                                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="text-center space-y-1">
                            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight flex items-center justify-center">
                              {student.name}
                              {isUser && <span className="w-2 h-2 bg-teal-500 rounded-full ml-2 animate-ping" />}
                            </h4>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg inline-block uppercase tracking-wider ${
                              isUser 
                                ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' 
                                : 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
                            }`}>
                              {lang === 'en' ? student.role.en : student.role.id}
                            </span>
                          </div>
                          
                          <div className="mt-4 space-y-3 text-xs w-full bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                            <p className="text-slate-600 dark:text-slate-300 font-medium">
                              <strong className="text-slate-400 dark:text-slate-500 uppercase text-[9px] tracking-wider block mb-1">
                                {lang === 'en' ? 'Thesis Focus:' : 'Fokus Tesis:'}
                              </strong> 
                              <span className="font-semibold">{lang === 'en' ? student.topic?.en : student.topic?.id}</span>
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-900">
                              <strong>{lang === 'en' ? 'Supervisor:' : 'Pembimbing:'}</strong> <span className="font-semibold">{student.supervisor}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Carousel Indicators */}
                {graduate.length > 1 && (
                  <div className="flex justify-center space-x-1.5 mt-4">
                    {graduate.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToItem('graduate', idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          (activeIndices['graduate'] || 0) === idx
                            ? 'w-5 bg-teal-500'
                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CATEGORY: Undergraduate Students */}
          {(activeTab === 'all' || activeTab === 'undergraduate') && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-sky-500/10 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Undergraduate Students (S1 / Bachelors)' : 'Mahasiswa Sarjana (S1)'}
                </h3>
              </div>
              
              <div 
                className="relative group/carousel max-w-6xl mx-auto"
                onMouseEnter={() => setHoveredKey('undergraduate')}
                onMouseLeave={() => setHoveredKey(null)}
              >
                {/* Scroll Navigation Buttons */}
                {undergraduate.length > 1 && (
                  <>
                    <button 
                      onClick={() => scroll('undergraduate', 'left')}
                      className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('undergraduate', 'right')}
                      className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 transition-all duration-300 focus:outline-none"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                <div 
                  ref={el => { scrollRefs.current['undergraduate'] = el; }}
                  onScroll={() => handleScroll('undergraduate')}
                  className="flex overflow-x-auto gap-6 sm:gap-8 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {undergraduate.map((student) => (
                    <div 
                      key={student.id}
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start glass-card p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 hover:border-sky-500/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
                    >
                      <div className="space-y-5 flex flex-col items-center">
                        {student.image && (
                          <div className="relative overflow-hidden rounded-3xl w-36 h-36 sm:w-40 sm:h-40 shadow-lg border-4 border-slate-100 dark:border-slate-800/80 group-hover:border-sky-500/20">
                            <img 
                              src={student.image} 
                              alt={student.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        
                        <div className="text-center space-y-1">
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                            {student.name}
                          </h4>
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-lg inline-block uppercase tracking-wider">
                            {lang === 'en' ? student.role.en : student.role.id}
                          </span>
                        </div>
                        
                        <div className="mt-4 space-y-3 text-xs w-full bg-slate-50/80 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                          <p className="text-slate-600 dark:text-slate-300 font-medium">
                            <strong className="text-slate-400 dark:text-slate-500 uppercase text-[9px] tracking-wider block mb-1">
                              {lang === 'en' ? 'Project Focus:' : 'Fokus Proyek:'}
                            </strong> 
                            <span className="font-semibold">{lang === 'en' ? student.topic?.en : student.topic?.id}</span>
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-900">
                            <strong>{lang === 'en' ? 'Advisor:' : 'Pembimbing:'}</strong> <span className="font-semibold">{student.supervisor}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                {undergraduate.length > 1 && (
                  <div className="flex justify-center space-x-1.5 mt-4">
                    {undergraduate.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToItem('undergraduate', idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          (activeIndices['undergraduate'] || 0) === idx
                            ? 'w-5 bg-sky-500'
                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
