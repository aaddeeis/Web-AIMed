import React, { useState, useRef } from 'react';
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
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  const {
    leadership,
    assistants,
    members,
    collaborators,
    postgraduate,
    graduate,
    undergraduate
  } = useData();

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
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'AIMed RESEARCH TEAM' : 'TIM PENELITI AIMed'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Our Expert Researchers & Students' : 'Peneliti Ahli & Mahasiswa Kami'}
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Meet the brilliant minds steering clinical AI innovation, from executive directors to passionate graduate and undergraduate scholars.'
              : 'Temui para pemikir brilian yang mengarahkan inovasi AI klinis, mulai dari direktur eksekutif hingga akademisi sarjana dan magister yang berdedikasi.'}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-5xl mx-auto" id="team-category-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-500/15 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {lang === 'en' ? tab.label.en : tab.label.id}
            </button>
          ))}
        </div>

        {/* Team Display Panels */}
        <div className="space-y-20">
          
          {/* CATEGORY: Leadership (Ketua & Sekretaris) */}
          {(activeTab === 'all' || activeTab === 'leadership') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-5 h-5 text-teal-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'CoE Leadership' : 'Pimpinan Pusat Unggulan (CoE)'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('leadership', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('leadership', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['leadership'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {leadership.map((leader) => {
                  return (
                    <div 
                      key={leader.id}
                      className="w-full sm:w-[480px] md:w-[500px] flex-shrink-0 snap-start glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-black/5 dark:border-white/5 hover:border-teal-500/20 dark:hover:border-teal-400/20"
                    >
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                          {leader.image && (
                            <img 
                              src={leader.image} 
                              alt={leader.name} 
                              referrerPolicy="no-referrer"
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-4 border-teal-500/20 shadow-sm bg-white hover:scale-105 transition-all duration-300 flex-shrink-0"
                            />
                          )}
                          <div className="space-y-3 text-center sm:text-left flex-grow">
                            <div>
                              <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                                {leader.name}
                              </h4>
                              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-1 uppercase tracking-wider">
                                {lang === 'en' ? leader.role.en : leader.role.id}
                              </p>
                            </div>
                            
                            {leader.email && (
                              <a 
                                href={`mailto:${leader.email}`}
                                className="inline-flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                              >
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span>{leader.email}</span>
                              </a>
                            )}

                            {/* Academic index handles row */}
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                              {leader.scholar && (
                                <a 
                                  href={leader.scholar} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-2.5 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                  <span>Google Scholar</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              {leader.scopus && (
                                <a 
                                  href={leader.scopus} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-2.5 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                  <span>Scopus ID</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              {leader.orcid && (
                                <a 
                                  href={leader.orcid} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-2.5 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                  <span>ORCID</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Core research focus */}
                        {(leader.researchFocus || leader.interests) && (
                          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
                              {lang === 'en' ? 'Research Focus' : 'Fokus Riset'}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                              {leader.researchFocus 
                                ? (lang === 'en' ? leader.researchFocus.en : leader.researchFocus.id)
                                : (lang === 'en' ? leader.interests.en.join(', ') : leader.interests.id.join(', '))
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CATEGORY: Research Assistants */}
          {(activeTab === 'all' || activeTab === 'assistants') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-sky-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'Research Assistants' : 'Asisten Peneliti'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('assistants', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('assistants', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['assistants'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {assistants.map((assistant) => (
                  <div 
                    key={assistant.id}
                    className="w-full sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start glass-card rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-black/5 dark:border-white/5 hover:border-sky-500/20"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        {assistant.image && (
                          <img 
                            src={assistant.image} 
                            alt={assistant.name} 
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full border-2 border-sky-500/20 object-cover shadow-sm bg-slate-50 hover:scale-105 transition-all duration-300 flex-shrink-0"
                          />
                        )}
                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                            {assistant.name}
                          </h4>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-md inline-block mt-1">
                            {lang === 'en' ? assistant.role.en : assistant.role.id}
                          </span>
                        </div>
                      </div>

                      {/* Academic index handles row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {assistant.scholar && (
                          <a 
                            href={assistant.scholar} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Google Scholar"
                          >
                            <span>Scholar</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {assistant.scopus && (
                          <a 
                            href={assistant.scopus} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Scopus ID"
                          >
                            <span>Scopus</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {assistant.orcid && (
                          <a 
                            href={assistant.orcid} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="ORCID"
                          >
                            <span>ORCID</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>

                      {assistant.topic && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            {lang === 'en' ? 'Research Focus' : 'Fokus Riset'}
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {lang === 'en' ? assistant.topic.en : assistant.topic.id}
                          </p>
                        </div>
                      )}
                    </div>

                    {assistant.email && (
                      <div className="pt-4 border-t border-black/5 dark:border-white/5 mt-4 flex items-center">
                        <a 
                          href={`mailto:${assistant.email}`}
                          className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center space-x-1.5 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Contact ({assistant.email})</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: Members */}
          {(activeTab === 'all' || activeTab === 'members') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-teal-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'Core Members' : 'Anggota Inti'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('members', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('members', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['members'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {members.map((member) => (
                  <div 
                    key={member.id}
                    className="w-full sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start glass-card rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-black/5 dark:border-white/5 hover:border-teal-500/20"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        {member.image && (
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full border-2 border-teal-500/20 object-cover shadow-sm bg-slate-50 hover:scale-105 transition-all duration-300 flex-shrink-0"
                          />
                        )}
                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                            {member.name}
                          </h4>
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md inline-block mt-1">
                            {lang === 'en' ? 'Faculty Researcher' : 'Peneliti Fakultas'}
                          </span>
                        </div>
                      </div>

                      {/* Academic index handles row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {member.scholar && (
                          <a 
                            href={member.scholar} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Google Scholar"
                          >
                            <span>Scholar</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {member.scopus && (
                          <a 
                            href={member.scopus} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Scopus ID"
                          >
                            <span>Scopus</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {member.orcid && (
                          <a 
                            href={member.orcid} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-600 dark:text-slate-400 rounded-lg flex items-center space-x-1 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="ORCID"
                          >
                            <span>ORCID</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {lang === 'en' ? member.role.en : member.role.id}
                      </p>

                      {(member.researchFocus || member.topic || member.interests) && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                            {lang === 'en' ? 'Research Focus' : 'Fokus Riset'}
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
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
                      <div className="pt-4 border-t border-black/5 dark:border-white/5 mt-4 flex items-center">
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center space-x-1.5 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Contact ({member.email})</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: External Collaborators */}
          {(activeTab === 'all' || activeTab === 'collaborators') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'External Collaborators' : 'Kolaborator Eksternal'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('collaborators', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('collaborators', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['collaborators'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {collaborators.map((col) => (
                  <div 
                    key={col.id}
                    className="w-full sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start glass-card rounded-2xl p-6 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all duration-300 border border-black/5 dark:border-white/5 hover:border-indigo-500/20"
                  >
                    <div className="space-y-4 flex flex-col items-center w-full">
                      {col.image && (
                        <img 
                          src={col.image} 
                          alt={col.name} 
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-indigo-500/20 object-cover shadow-md bg-slate-50 hover:scale-105 transition-all duration-300 flex-shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight leading-snug">
                          {col.name}
                        </h4>
                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1.5 uppercase tracking-wider">
                          {lang === 'en' ? col.role.en : col.role.id}
                        </p>
                      </div>

                      {col.institution && (
                        <div className="px-3 py-1.5 bg-indigo-500/5 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg border border-indigo-500/10 inline-block">
                          {lang === 'en' ? col.institution.en : col.institution.id}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STUDENTS SECTIONS (Postgraduate, Graduate, Undergraduate) */}
          
          {/* CATEGORY: Postgraduate Students */}
          {(activeTab === 'all' || activeTab === 'postgraduate') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'Postgraduate Students (S3 / Doctoral)' : 'Mahasiswa Pascasarjana (S3 / Doktor)'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('postgraduate', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('postgraduate', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['postgraduate'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {postgraduate.map((student) => (
                  <div 
                    key={student.id}
                    className="w-full sm:w-[350px] md:w-[380px] flex-shrink-0 snap-start p-6 bg-white dark:bg-slate-950 border border-black/5 dark:border-white/5 rounded-2xl hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-4">
                        {student.image && (
                          <img 
                            src={student.image} 
                            alt={student.name} 
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full border-2 border-indigo-500/20 object-cover shadow-sm bg-slate-50 hover:scale-105 transition-all duration-300 flex-shrink-0"
                          />
                        )}
                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                            {student.name}
                          </h4>
                          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md inline-block mt-1">
                            {lang === 'en' ? student.role.en : student.role.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2 text-xs">
                        <p className="text-slate-600 dark:text-slate-300 font-medium">
                          <strong>{lang === 'en' ? 'Dissertation Focus:' : 'Fokus Disertasi:'}</strong> {lang === 'en' ? student.topic?.en : student.topic?.id}
                        </p>
                        <p className="text-slate-400 dark:text-slate-500">
                          <strong>{lang === 'en' ? 'Primary Advisor:' : 'Pembimbing Utama:'}</strong> {student.supervisor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY: Graduate Students */}
          {(activeTab === 'all' || activeTab === 'graduate') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-teal-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'Graduate Students (S2 / Masters)' : 'Mahasiswa Magister (S2)'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('graduate', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('graduate', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['graduate'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {graduate.map((student) => {
                  const isSpecial = student.name.includes("Ade Iriani");
                  return (
                    <div 
                      key={student.id}
                      className={`w-full sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start p-6 border rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                        isSpecial
                          ? 'bg-teal-500/[0.03] border-teal-500/20 dark:border-teal-400/20 shadow-sm'
                          : 'bg-white dark:bg-slate-950 border-black/5 dark:border-white/5 hover:border-teal-500/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-4">
                          {student.image && (
                            <img 
                              src={student.image} 
                              alt={student.name} 
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-full border-2 border-teal-500/20 object-cover shadow-sm bg-slate-50 hover:scale-105 transition-all duration-300 flex-shrink-0"
                            />
                          )}
                          <div>
                            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight flex items-center">
                              {student.name}
                              {isSpecial && <span className="w-1.5 h-1.5 bg-teal-500 rounded-full ml-1.5 animate-ping" />}
                            </h4>
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md inline-block mt-1">
                              {lang === 'en' ? student.role.en : student.role.id}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2 text-xs">
                          <p className="text-slate-600 dark:text-slate-300 font-medium">
                            <strong>{lang === 'en' ? 'Thesis Focus:' : 'Fokus Tesis:'}</strong> {lang === 'en' ? student.topic?.en : student.topic?.id}
                          </p>
                          <p className="text-slate-400 dark:text-slate-500">
                            <strong>{lang === 'en' ? 'Supervisor:' : 'Pembimbing:'}</strong> {student.supervisor}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CATEGORY: Undergraduate Students */}
          {(activeTab === 'all' || activeTab === 'undergraduate') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-sky-500" />
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'Undergraduate Students (S1 / Bachelors)' : 'Mahasiswa Sarjana (S1)'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scroll('undergraduate', 'left')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('undergraduate', 'right')}
                    className="p-1.5 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={(el) => { scrollRefs.current['undergraduate'] = el; }}
                className="flex overflow-x-auto gap-6 scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {undergraduate.map((student) => (
                  <div 
                    key={student.id}
                    className="w-full sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start p-6 bg-white dark:bg-slate-950 border border-black/5 dark:border-white/5 rounded-2xl hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-4">
                        {student.image && (
                          <img 
                            src={student.image} 
                            alt={student.name} 
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-full border-2 border-sky-500/20 object-cover shadow-sm bg-slate-50 hover:scale-105 transition-all duration-300 flex-shrink-0"
                          />
                        )}
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
                            {student.name}
                          </h4>
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md inline-block mt-1">
                            {lang === 'en' ? student.role.en : student.role.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2 text-xs">
                        <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                          <strong>{lang === 'en' ? 'Project Focus:' : 'Fokus Proyek:'}</strong> {lang === 'en' ? student.topic?.en : student.topic?.id}
                        </p>
                        <p className="text-slate-400 dark:text-slate-500">
                          <strong>{lang === 'en' ? 'Advisor:' : 'Pembimbing:'}</strong> {student.supervisor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
