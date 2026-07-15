import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  FileText, 
  Shield, 
  Globe, 
  Users, 
  Calendar, 
  Megaphone, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Building,
  Download
} from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

interface PerformanceSectionProps {
  lang: Language;
}

type MainTab = 'publications' | 'conference' | 'journal' | 'promotion';
type PubSubTab = 'journals' | 'conferences' | 'ipr' | 'books';

export default function PerformanceSection({ lang }: PerformanceSectionProps) {
  const [activeTab, setActiveTab] = useState<MainTab>('publications');
  const [activePubTab, setActivePubTab] = useState<PubSubTab>('journals');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleMainTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setExpandedItem(null);
  };

  const handlePubSubTabChange = (tab: PubSubTab) => {
    setActivePubTab(tab);
    setExpandedItem(null);
  };

  // Multi-lingual translation maps
  const t = {
    sectionTitle: {
      en: 'Center Performance',
      id: 'Kinerja Pusat'
    },
    sectionSubtitle: {
      en: 'Translating research excellence, scientific publications, intellectual properties, and academic operations into measurable global impact.',
      id: 'Menerjemahkan keunggulan riset, publikasi ilmiah, kekayaan intelektual, dan tata kelola akademis menjadi dampak global nyata.'
    },
    publications: {
      en: 'Publications',
      id: 'Publikasi'
    },
    conferenceOrganizer: {
      en: 'Conference Organizer',
      id: 'Penyelenggara Konferensi'
    },
    journalOrganizer: {
      en: 'Journal Organizer',
      id: 'Pengelola Jurnal'
    },
    promotion: {
      en: 'Promotion',
      id: 'Promosi'
    },
    journals: {
      en: 'International Journals',
      id: 'Jurnal Internasional'
    },
    conferences: {
      en: 'International Conference (Proceedings)',
      id: 'Prosiding Konferensi Internasional'
    },
    ipr: {
      en: 'Intellectual Property Rights (IPR)',
      id: 'Hak Kekayaan Intelektual (HKI)'
    },
    books: {
      en: 'Books',
      id: 'Buku'
    }
  };

  const { publicationsData } = useData();

  const sortedJournals = [...(publicationsData?.journals || [])].sort((a, b) => {
    const yearA = parseInt(String(a.year)) || 0;
    const yearB = parseInt(String(b.year)) || 0;
    return yearB - yearA;
  });

  const sortedConferences = [...(publicationsData?.conferences || [])].sort((a, b) => {
    const yearA = parseInt(String(a.year)) || 0;
    const yearB = parseInt(String(b.year)) || 0;
    return yearB - yearA;
  });

  const conferencesOrganized = [
    {
      title: 'ICAIM 2025: International Conference on Artificial Intelligence in Medicine',
      role: 'Main Host / Organizer',
      date: 'August 12-14, 2025',
      location: 'Palembang, Indonesia (Hybrid)',
      stats: '120+ accepted research papers, proceedings published by Springer LNCS',
      desc: {
        en: 'The premium academic event bridging AI researchers and medical practitioners, co-sponsored by the Indonesian Association for AI in Health.',
        id: 'Acara akademik utama yang mempertemukan peneliti AI dengan praktisi medis, didukung oleh Asosiasi AI Kesehatan Indonesia.'
      }
    },
    {
      title: 'Sriwijaya International Conference on Information Technology (SICONIAN) 2024',
      role: 'Biomedical AI & Telehealth Track Organizer',
      date: 'November 6-7, 2024',
      location: 'Palembang, Indonesia',
      stats: '45 papers in the dedicated biomedical track, published in IEEE Xplore',
      desc: {
        en: 'Unsri flagship computing conference where AIMed hosted the special track focusing on Deep Learning for Medical Diagnostics.',
        id: 'Konferensi unggulan ilmu komputer Unsri di mana AIMed mengelola track khusus berfokus pada Deep Learning untuk Diagnosis Medis.'
      }
    }
  ];

  const journalsOrganized = [
    {
      title: 'Journal of Biomedical Intelligence & Telehealth (JBIT)',
      publisher: 'Universitas Sriwijaya & AIMed CoE',
      issn: 'ISSN 2988-1234 (Online)',
      frequency: 'Bi-annual (June & December)',
      indexing: 'SINTA 3, progressing to Scopus',
      desc: {
        en: 'A dedicated open-access peer-reviewed outlet publishing breakthroughs in computational biology, medical informatics, and regional telemedicine implementation.',
        id: 'Wadah publikasi peer-review akses terbuka khusus untuk terobosan dalam biologi komputasi, informatika medis, dan telemedisin regional.'
      }
    },
    {
      title: 'Sriwijaya Journal of Computer Science (SJCS)',
      publisher: 'Faculty of Computer Science, Universitas Sriwijaya',
      issn: 'ISSN 2302-3456 (Online)',
      frequency: 'Special Medical AI Issue Guest Editorial Board',
      indexing: 'SINTA 2 Accredited',
      desc: {
        en: 'AIMed researchers serve as guest editors and permanent reviewers for special issues exploring neural architectures for diagnostics.',
        id: 'Peneliti AIMed bertindak sebagai editor tamu dan reviewer tetap untuk edisi khusus yang mengeksplorasi arsitektur saraf untuk diagnostik.'
      }
    }
  ];

  const promotionsData = [
    {
      title: {
        en: 'Rural Clinic Telehealth Roadshow & Deployment',
        id: 'Roadshow & Implementasi Telehealth di Klinik Pedesaan'
      },
      category: 'Community Empowerment (Pengabdian Masyarakat)',
      date: 'March - May 2025',
      coverage: {
        en: '15 community health centers in Ogan Ilir & Banyuasin regions equipped with edge-AI portable diagnostic aids.',
        id: '15 puskesmas di wilayah Ogan Ilir & Banyuasin dilengkapi dengan alat bantu diagnostik portabel berbasis edge-AI.'
      },
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: {
        en: 'Outstanding National Innovation Gold Award 2024',
        id: 'Penghargaan Emas Inovasi Nasional Unggulan 2024'
      },
      category: 'Recognition (Rekognisi Akademik & Industri)',
      date: 'October 2024',
      coverage: {
        en: 'Awarded by the Ministry of Education & Research for AIMed Ultrasound Denoising Engine. Recognised for high clinical applicability.',
        id: 'Dianugerahi oleh Kementerian Pendidikan & Ristek atas AIMed Ultrasound Denoising Engine. Diakui karena aplikabilitas klinis yang tinggi.'
      },
      image: 'https://images.unsplash.com/photo-1496469888073-80de7e9b97cb?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: {
        en: 'Medical Students AI Workshop & Seminar',
        id: 'Seminar & Workshop AI untuk Mahasiswa Kedokteran'
      },
      category: 'Education Promotion (Promosi Akademik)',
      date: 'Bi-annual Events',
      coverage: {
        en: 'Educated over 300+ medical and engineering students in South Sumatra about clinical diagnostics pipelines using deep learning tools.',
        id: 'Mengedukasi lebih dari 300+ mahasiswa kedokteran dan teknik di Sumatra Selatan tentang proses diagnostik klinis menggunakan AI.'
      },
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="performance" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 mr-1" />
            <span>{lang === 'en' ? t.sectionTitle.en : t.sectionTitle.id}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? 'Our Academic & Operational Performance' : 'Kinerja Akademik & Operasional Kami'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'en' ? t.sectionSubtitle.en : t.sectionSubtitle.id}
          </p>
        </div>

        {/* Outer Tabs container */}
        <div className="space-y-8">
          
          {/* Main navigation tabs */}
          <div className="flex flex-wrap justify-center gap-2 pb-2 border-b border-black/5 dark:border-white/10" id="performance-tabs">
            <button
              onClick={() => handleMainTabChange('publications')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'publications'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'en' ? t.publications.en : t.publications.id}</span>
            </button>

            <button
              onClick={() => handleMainTabChange('conference')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'conference'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === 'en' ? t.conferenceOrganizer.en : t.conferenceOrganizer.id}</span>
            </button>

            <button
              onClick={() => handleMainTabChange('journal')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'journal'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{lang === 'en' ? t.journalOrganizer.en : t.journalOrganizer.id}</span>
            </button>

            <button
              onClick={() => handleMainTabChange('promotion')}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'promotion'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>{lang === 'en' ? t.promotion.en : t.promotion.id}</span>
            </button>
          </div>

          {/* Tab contents */}
          <div className="transition-all duration-300" id="performance-tab-content">
            
            {/* 1. PUBLICATIONS TAB */}
            {activeTab === 'publications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Sub-tabs for publications breakdown */}
                <div className="flex flex-wrap gap-2 p-1.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl max-w-fit mx-auto">
                  <button
                    onClick={() => handlePubSubTabChange('journals')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      activePubTab === 'journals'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? t.journals.en : t.journals.id}
                  </button>

                  <button
                    onClick={() => handlePubSubTabChange('conferences')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      activePubTab === 'conferences'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? t.conferences.en : t.conferences.id}
                  </button>

                  <button
                    onClick={() => handlePubSubTabChange('ipr')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      activePubTab === 'ipr'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? t.ipr.en : t.ipr.id}
                  </button>

                  <button
                    onClick={() => handlePubSubTabChange('books')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      activePubTab === 'books'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? t.books.en : t.books.id}
                  </button>
                </div>

                {/* Subtab Contents list */}
                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto pt-4">
                  
                  {/* International Journals */}
                  {activePubTab === 'journals' && sortedJournals.map((item, idx) => {
                    return (
                      <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold rounded">
                                {item.year}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase">
                                JOURNAL ARTICLE
                              </span>
                              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded flex items-center">
                                <Award className="w-3 h-3 mr-0.5 animate-pulse" />
                                {item.impact}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                                {item.journal}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>

                            <p className="text-xs italic text-slate-400 dark:text-slate-500">
                              {item.journal} • {item.details}
                            </p>
                          </div>

                          <div className="flex sm:flex-col gap-2.5 flex-shrink-0">
                            {item.doi && (
                              <a
                                href={`https://doi.org/${item.doi}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Link</span>
                              </a>
                            )}
                            {!item.doi && item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Link</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* International Conference */}
                  {activePubTab === 'conferences' && sortedConferences.map((item, idx) => {
                    return (
                      <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold rounded">
                                {item.year}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase">
                                CONFERENCE PROCEEDINGS
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 flex items-center">
                                <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                {item.location}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>

                            <p className="text-xs italic text-slate-400 dark:text-slate-500">
                              {item.conference} • {item.details}
                            </p>
                          </div>

                          <div className="flex sm:flex-col gap-2.5 flex-shrink-0">
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Link</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Intellectual Property Rights (IPR) */}
                  {activePubTab === 'ipr' && publicationsData.ipr.map((item, idx) => {
                    return (
                      <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded">
                                {item.date}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase">
                                {item.type}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                                Holder: {item.holder}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>

                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                              Registration No: {item.regNo}
                            </p>
                          </div>

                          <div className="flex sm:flex-col gap-2.5 flex-shrink-0">
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Link</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Books */}
                  {activePubTab === 'books' && publicationsData.books.map((item, idx) => {
                    return (
                      <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-bold rounded">
                                {item.year}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase">
                                ACADEMIC BOOK
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold">{item.pages}</span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>

                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                              {item.authors}
                            </p>

                            <p className="text-xs italic text-slate-400 dark:text-slate-500">
                              Publisher: {item.publisher}
                            </p>

                            {item.desc && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed pt-3 border-t border-black/5 dark:border-white/5">
                                {item.desc}
                              </p>
                            )}
                          </div>

                          <div className="flex sm:flex-col gap-2.5 flex-shrink-0">
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg flex items-center space-x-1 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Link</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            )}

            {/* 2. CONFERENCE ORGANIZER TAB */}
            {activeTab === 'conference' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 gap-6">
                  {conferencesOrganized.map((item, idx) => {
                    const itemId = `conf-org-${idx}`;
                    const isExpanded = expandedItem === itemId;

                    return (
                      <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold rounded">
                                {item.date}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase">
                                {item.role}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 flex items-center">
                                <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                {item.location}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>

                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                              {item.stats}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-50 dark:border-slate-900 flex flex-wrap gap-3 items-center justify-between">
                          <button
                            onClick={() => setExpandedItem(isExpanded ? null : itemId)}
                            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center space-x-1 cursor-pointer"
                          >
                            <span>{isExpanded ? (lang === 'en' ? 'Hide Details' : 'Sembunyikan Detail') : (lang === 'en' ? 'Show Details & Description' : 'Tampilkan Detail & Deskripsi')}</span>
                            <span>{isExpanded ? '↑' : '↓'}</span>
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-900 space-y-4 animate-in fade-in duration-200">
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                                {lang === 'en' ? 'Conference Description' : 'Deskripsi Konferensi'}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {lang === 'en' ? item.desc.en : item.desc.id}
                              </p>
                            </div>

                            <div className="p-3.5 bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl text-xs text-slate-500 flex items-center justify-between">
                              <span><strong>{lang === 'en' ? 'Scientific Impact' : 'Dampak Ilmiah'}:</strong> {item.stats}</span>
                              <span className="text-sky-500 flex items-center text-[10px] font-bold uppercase tracking-wider">
                                {lang === 'en' ? 'Official Event Page' : 'Halaman Resmi Acara'} <ExternalLink className="w-3.5 h-3.5 ml-1" />
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. JOURNAL ORGANIZER TAB */}
            {activeTab === 'journal' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 gap-6">
                  {journalsOrganized.map((item, idx) => {
                    const itemId = `journal-org-${idx}`;
                    const isExpanded = expandedItem === itemId;

                    return (
                      <div key={idx} className="glass-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-bold rounded">
                                Editorial Management
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded uppercase">
                                {item.indexing}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400">
                                {item.issn}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                              {item.title}
                            </h3>

                            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                              Publisher: {item.publisher}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-50 dark:border-slate-900 flex flex-wrap gap-3 items-center justify-between">
                          <button
                            onClick={() => setExpandedItem(isExpanded ? null : itemId)}
                            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center space-x-1 cursor-pointer"
                          >
                            <span>{isExpanded ? (lang === 'en' ? 'Hide Details' : 'Sembunyikan Detail') : (lang === 'en' ? 'Show Details & Editorial Information' : 'Tampilkan Detail & Informasi Editorial')}</span>
                            <span>{isExpanded ? '↑' : '↓'}</span>
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-900 space-y-4 animate-in fade-in duration-200">
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                                {lang === 'en' ? 'Journal Scope & Description' : 'Ruang Lingkup & Deskripsi Jurnal'}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {lang === 'en' ? item.desc.en : item.desc.id}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                              <div className="p-3 bg-black/5 dark:bg-white/[0.02] rounded-xl border border-black/5 dark:border-white/5 text-center">
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-1">Publisher</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.publisher}</span>
                              </div>
                              <div className="p-3 bg-black/5 dark:bg-white/[0.02] rounded-xl border border-black/5 dark:border-white/5 text-center">
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-1">Frequency</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.frequency}</span>
                              </div>
                              <div className="p-3 bg-black/5 dark:bg-white/[0.02] rounded-xl border border-black/5 dark:border-white/5 text-center">
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-1">Index Ranking</span>
                                <span className="text-xs font-bold text-teal-500">{item.indexing}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. PROMOTION TAB */}
            {activeTab === 'promotion' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {promotionsData.map((item, idx) => (
                    <div key={idx} className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all">
                      <div>
                        {/* News/Promo banner image */}
                        <div className="h-44 w-full relative overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={lang === 'en' ? item.title.en : item.title.id} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-4">
                            <span className="px-2 py-0.5 bg-teal-500 text-white text-[9px] font-bold rounded-md uppercase">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Text description */}
                        <div className="p-5 space-y-2.5">
                          <div className="text-[10px] font-semibold text-slate-400">
                            {item.date}
                          </div>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                            {lang === 'en' ? item.title.en : item.title.id}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {lang === 'en' ? item.coverage.en : item.coverage.id}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer detail */}
                      <div className="p-5 pt-0">
                        <button className="w-full py-2.5 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[10px] font-bold text-slate-700 dark:text-slate-300 rounded-xl transition-all flex items-center justify-center space-x-1 uppercase">
                          <span>View Outreach Article</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
