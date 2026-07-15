import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Users, 
  Award, 
  Book, 
  Calendar, 
  Search, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles,
  Bookmark,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';

interface ImpactDashboardProps {
  lang: Language;
}

type CategoryType = 'journals' | 'conferences' | 'ipr' | 'books';

export default function ImpactDashboard({ lang }: ImpactDashboardProps) {
  const { publicationsData } = useData();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('journals');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract arrays safely
  const journals = useMemo(() => publicationsData?.journals || [], [publicationsData]);
  const conferences = useMemo(() => publicationsData?.conferences || [], [publicationsData]);
  const ipr = useMemo(() => publicationsData?.ipr || [], [publicationsData]);
  const books = useMemo(() => publicationsData?.books || [], [publicationsData]);

  // Aggregate stats
  const totalJournals = journals.length;
  const totalConferences = conferences.length;
  const totalIPR = ipr.length;
  const totalBooks = books.length;

  // Selected list
  const currentList = useMemo(() => {
    switch (activeCategory) {
      case 'journals': return journals;
      case 'conferences': return conferences;
      case 'ipr': return ipr;
      case 'books': return books;
      default: return [];
    }
  }, [activeCategory, journals, conferences, ipr, books]);

  // Filter list by search query
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return currentList;
    const query = searchQuery.toLowerCase();
    return currentList.filter((item: any) => {
      const title = (item.title || '').toLowerCase();
      const authors = (item.authors || '').toLowerCase();
      const venue = (item.journal || item.conference || item.publisher || item.type || '').toLowerCase();
      return title.includes(query) || authors.includes(query) || venue.includes(query);
    });
  }, [currentList, searchQuery]);

  // Calculate year-by-year trend for the active category
  const yearTrendData = useMemo(() => {
    const counts: Record<number, number> = {};
    currentList.forEach((item: any) => {
      const year = Number(item.year);
      if (year) {
        counts[year] = (counts[year] || 0) + 1;
      }
    });

    // Generate last 5 years dynamically
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i); // e.g. 2022 to 2026
    
    return years.map(y => ({
      year: y,
      count: counts[y] || 0
    }));
  }, [currentList]);

  const maxYearCount = useMemo(() => {
    const max = Math.max(...yearTrendData.map(d => d.count), 0);
    return max === 0 ? 1 : max;
  }, [yearTrendData]);

  // UI definitions for categories
  const categoriesConfig = {
    journals: {
      title: { en: 'Journal Articles', id: 'Artikel Jurnal' },
      desc: { en: 'Peer-reviewed scientific journal publications indexed in reputable databases.', id: 'Publikasi jurnal ilmiah peer-reviewed yang terindeks di database reputasi.' },
      icon: FileText,
      color: 'teal',
      bgGrad: 'from-teal-500/10 to-teal-500/5 dark:from-teal-500/20 dark:to-teal-500/5',
      border: 'border-teal-500/20 dark:border-teal-500/30',
      activeBorder: 'border-teal-500 shadow-teal-500/10 dark:shadow-teal-500/20',
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
      textAccent: 'text-teal-600 dark:text-teal-400',
      badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
      count: totalJournals,
    },
    conferences: {
      title: { en: 'Conference Papers', id: 'Makalah Konferensi' },
      desc: { en: 'International and national conference proceedings showcasing innovative research.', id: 'Prosiding konferensi internasional dan nasional yang menampilkan riset inovatif.' },
      icon: Users,
      color: 'sky',
      bgGrad: 'from-sky-500/10 to-sky-500/5 dark:from-sky-500/20 dark:to-sky-500/5',
      border: 'border-sky-500/20 dark:border-sky-500/30',
      activeBorder: 'border-sky-500 shadow-sky-500/10 dark:shadow-sky-500/20',
      iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      textAccent: 'text-sky-600 dark:text-sky-400',
      badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
      count: totalConferences,
    },
    ipr: {
      title: { en: 'Intellectual Property (IPR)', id: 'Kekayaan Intelektual (HAKI)' },
      desc: { en: 'Registered patents, copyrights, and software certificates protecting novel methodologies.', id: 'Paten terdaftar, hak cipta, dan sertifikat program komputer pelindung metodologi baru.' },
      icon: Award,
      color: 'indigo',
      bgGrad: 'from-indigo-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-indigo-500/5',
      border: 'border-indigo-500/20 dark:border-indigo-500/30',
      activeBorder: 'border-indigo-500 shadow-indigo-500/10 dark:shadow-indigo-500/20',
      iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      textAccent: 'text-indigo-600 dark:text-indigo-400',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
      count: totalIPR,
    },
    books: {
      title: { en: 'Books & Chapters', id: 'Buku & Bab Buku' },
      desc: { en: 'Academic reference books, textbook monographs, and research book chapters.', id: 'Buku referensi akademik, monograf buku ajar, dan bab buku hasil riset.' },
      icon: Book,
      color: 'amber',
      bgGrad: 'from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/5',
      border: 'border-amber-500/20 dark:border-amber-500/30',
      activeBorder: 'border-amber-500 shadow-amber-500/10 dark:shadow-amber-500/20',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      textAccent: 'text-amber-600 dark:text-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
      count: totalBooks,
    }
  };

  const activeConfig = categoriesConfig[activeCategory];

  return (
    <section id="impact" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'SCIENTIFIC INFLUENCE' : 'PENGARUH ILMIAH'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Research Impact & Metrics' : 'Metrik & Dampak Riset'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Real-time performance dashboard displaying publication metrics, intellectual property portfolios, and scientific monographs.'
              : 'Dasbor kinerja waktu nyata yang menampilkan metrik publikasi, portofolio hak kekayaan intelektual, dan monograf ilmiah.'}
          </p>
        </div>

        {/* 4-Column Metric Cards (Total Counts) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(Object.keys(categoriesConfig) as CategoryType[]).map((key) => {
            const config = categoriesConfig[key];
            const IconComponent = config.icon;
            const isSelected = activeCategory === key;

            return (
              <motion.div
                key={key}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => {
                  setActiveCategory(key);
                  setSearchQuery('');
                }}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isSelected 
                    ? `bg-gradient-to-br ${config.bgGrad} ${config.activeBorder} shadow-lg ring-1 ring-slate-400/10` 
                    : 'bg-white/40 dark:bg-slate-900/40 hover:bg-white/70 dark:hover:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80'
                }`}
              >
                {/* Background decorative accent */}
                {isSelected && (
                  <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-40 bg-${config.color}-500`} />
                )}

                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${config.iconBg}`}>
                    <IconComponent className="w-6 h-6 animate-pulse" />
                  </div>
                  {isSelected && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center gap-0.5">
                      {lang === 'en' ? 'Selected' : 'Terpilih'}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight leading-none">
                    {config.count}
                  </p>
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-2">
                    {config.title[lang]}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 font-medium">
                    {config.desc[lang]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Breakdown Panel with Trend and List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Trend Chart Column (5 cols) */}
          <div className="lg:col-span-4 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={`w-5 h-5 ${activeConfig.textAccent}`} />
                <h4 className="font-extrabold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {lang === 'en' ? 'Growth Trend' : 'Tren Pertumbuhan'}
                </h4>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                {activeConfig.title[lang]}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                {activeConfig.desc[lang]}
              </p>
            </div>

            {/* Dynamic Custom Chart */}
            <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 flex flex-col justify-between flex-grow min-h-[220px]">
              <div className="flex items-end justify-between flex-grow gap-4 h-full relative">
                {/* Gridlines */}
                <div className="absolute inset-x-0 bottom-1/4 border-b border-slate-200/30 dark:border-slate-800/40 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-2/4 border-b border-slate-200/30 dark:border-slate-800/40 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-3/4 border-b border-slate-200/30 dark:border-slate-800/40 pointer-events-none" />

                {yearTrendData.map((data, idx) => {
                  const heightPct = (data.count / maxYearCount) * 80; // cap at 80%
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative z-10">
                      {/* Hover tooltip */}
                      <span className="absolute -top-9 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none transition-all duration-200">
                        {data.count} {lang === 'en' ? 'items' : 'item'}
                      </span>

                      {/* Bar */}
                      <div 
                        className={`w-6 sm:w-8 rounded-t-md transition-all duration-500 ${
                          activeCategory === 'journals' ? 'bg-gradient-to-t from-teal-600 to-teal-400 group-hover:from-teal-500 group-hover:to-teal-300' :
                          activeCategory === 'conferences' ? 'bg-gradient-to-t from-sky-600 to-sky-400 group-hover:from-sky-500 group-hover:to-sky-300' :
                          activeCategory === 'ipr' ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-300' :
                          'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-500 group-hover:to-amber-300'
                        }`}
                        style={{ height: `${Math.max(heightPct, 5)}%` }} // minimum 5% visual bar
                      />

                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 font-mono">
                        {data.year}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex justify-between text-[10px] font-semibold text-slate-400">
                <span>{lang === 'en' ? 'Output count' : 'Jumlah output'}</span>
                <span className="flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-teal-500" />
                  {lang === 'en' ? 'Live Synced' : 'Sinkron Aktif'}
                </span>
              </div>
            </div>
          </div>

          {/* List Database Column (8 cols) */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6">
            
            {/* Search Bar / List Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/10">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Bookmark className={`w-4 h-4 ${activeConfig.textAccent}`} />
                <span>
                  {lang === 'en' 
                    ? `${activeConfig.title.en} List` 
                    : `Daftar ${activeConfig.title.id}`}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${activeConfig.badgeColor}`}>
                  {filteredList.length}
                </span>
              </h3>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'en' ? 'Search entries...' : 'Cari entri...'}
                  className="w-full text-xs pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-slate-800 dark:text-slate-200 transition-all"
                />
              </div>
            </div>

            {/* Scrollable list of publications */}
            <div className="overflow-y-auto max-h-[380px] pr-2 space-y-4 custom-scrollbar flex-grow">
              {filteredList.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-900/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                  <Search className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {lang === 'en' ? 'No records found' : 'Tidak ada catatan ditemukan'}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
                    {lang === 'en' ? 'Try adjusting your search criteria.' : 'Coba ubah kriteria pencarian Anda.'}
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredList.map((item: any, idx) => (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="group p-5 bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/50 rounded-2xl transition-all duration-300 flex items-start justify-between gap-4 shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-1.5 flex-grow">
                        {/* Title */}
                        <h5 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {item.title}
                        </h5>
                        
                        {/* Authors */}
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {item.authors}
                        </p>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                          {/* Category Details */}
                          {(item.journal || item.conference || item.publisher || item.type) && (
                            <span className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                activeCategory === 'journals' ? 'bg-teal-500' :
                                activeCategory === 'conferences' ? 'bg-sky-500' :
                                activeCategory === 'ipr' ? 'bg-indigo-500' : 'bg-amber-500'
                              }`} />
                              <span className="text-slate-700 dark:text-slate-300">
                                {item.journal || item.conference || item.publisher || item.type}
                              </span>
                            </span>
                          )}

                          {item.details && (
                            <span className="border-l border-slate-200 dark:border-slate-800 pl-3">
                              {item.details}
                            </span>
                          )}

                          {item.regNo && (
                            <span className="border-l border-slate-200 dark:border-slate-800 pl-3">
                              No. Reg: <span className="font-mono text-slate-700 dark:text-slate-300">{item.regNo}</span>
                            </span>
                          )}

                          {item.year && (
                            <span className="border-l border-slate-200 dark:border-slate-800 pl-3 flex items-center gap-0.5">
                              <Calendar className="w-3 h-3" />
                              {item.year}
                            </span>
                          )}

                          {item.date && (
                            <span className="border-l border-slate-200 dark:border-slate-800 pl-3">
                              {item.date}
                            </span>
                          )}
                        </div>

                        {/* Optional Description / Book Monograph Details */}
                        {item.desc && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal pt-2 italic border-t border-slate-100 dark:border-slate-900 mt-2">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      {/* External Action Link */}
                      {(item.doi || item.regNo) && (
                        <a
                          href={item.doi ? `https://doi.org/${item.doi}` : '#'}
                          target={item.doi ? "_blank" : undefined}
                          rel="noreferrer"
                          className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg text-slate-400 transition-colors self-start mt-0.5"
                          title={item.doi ? `DOI: ${item.doi}` : 'IPR Registration'}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
