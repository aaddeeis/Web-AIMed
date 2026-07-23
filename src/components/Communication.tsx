import React, { useState } from 'react';
import { 
  Youtube, 
  Instagram, 
  Globe, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  TrendingUp, 
  Newspaper, 
  Check, 
  X, 
  ExternalLink, 
  Send,
  Sliders,
  ChevronRight,
  ChevronLeft,
  Images,
  Tv,
  Rss,
  Activity,
  Heart,
  MessageCircle,
  Eye,
  Info,
  Play,
  Filter
} from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

export function getInstagramShortcode(url: string): string | null {
  if (!url) return null;
  if (!url.includes('instagram.com')) {
    return url.trim();
  }
  const match = url.match(/(?:instagram\.com\/(?:p|reel|tv)\/)([a-zA-Z0-9-_]+)/i);
  return match ? match[1] : url.trim();
}

function UpcomingCalendarSlide({ 
  events, 
  lang, 
  onRegister 
}: { 
  events: any[]; 
  lang: Language; 
  onRegister: (id: string) => void; 
}) {
  const [slideIndex, setSlideIndex] = useState(0);

  if (!events || events.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center border border-black/5 dark:border-white/5">
        <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
        <p className="text-xs text-slate-400">{lang === 'en' ? 'No upcoming events found.' : 'Tidak ada acara mendatang.'}</p>
      </div>
    );
  }

  const currentEvent = events[slideIndex % events.length];
  const dateParts = (currentEvent.date || '').split(' ');
  const monthStr = dateParts[0] ? dateParts[0].substring(0, 3).toUpperCase() : 'JUL';
  const dayStr = dateParts[1] ? dateParts[1].replace(',', '') : '28';
  const yearStr = dateParts[2] || '2026';

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % events.length);
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-md flex flex-col justify-between space-y-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
      {/* Slide Header */}
      <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-sky-500" />
          <h4 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? 'Upcoming Calendar' : 'Kalender Acara'}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-md">
            {slideIndex + 1} / {events.length}
          </span>
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={lang === 'en' ? 'Previous Event' : 'Acara Sebelumnya'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={lang === 'en' ? 'Next Event' : 'Acara Selanjutnya'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Event Content */}
      <div key={currentEvent.id} className="animate-in fade-in zoom-in-98 duration-300 space-y-4">
        <div className="flex items-start space-x-4">
          {/* Calendar Badge */}
          <div className="w-16 h-18 flex-shrink-0 bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 text-center flex flex-col shadow-sm">
            <div className="bg-sky-500 dark:bg-sky-600 text-white text-[10px] font-extrabold uppercase py-1 tracking-wider">
              {monthStr}
            </div>
            <div className="flex-1 flex flex-col justify-center bg-white dark:bg-slate-900 p-1">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tighter">
                {dayStr}
              </span>
              <span className="text-[8px] font-mono font-bold text-slate-400 leading-none mt-1">
                {yearStr}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center space-x-1.5 text-[10px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-widest font-mono">
              <Clock className="w-3 h-3" />
              <span>{currentEvent.time}</span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
              {lang === 'en' ? currentEvent.title.en : currentEvent.title.id}
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-black/5 dark:border-white/5">
          <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
          <span className="line-clamp-2">{lang === 'en' ? currentEvent.location.en : currentEvent.location.id}</span>
        </div>

        <button
          onClick={() => onRegister(currentEvent.id)}
          className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'en' ? 'Reserve A Seat' : 'Ambil Tempat Duduk'}</span>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center space-x-1.5 pt-1">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlideIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === slideIndex
                ? 'w-6 bg-sky-500'
                : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface CommunicationProps {
  lang: Language;
  setActiveSection?: (section: string) => void;
  initialTab?: 'activities' | 'social' | 'mass' | 'calendar';
}

export default function Communication({ lang, setActiveSection, initialTab = 'activities' }: CommunicationProps) {
  const { youtubeVideos, instagramPosts, massMedia, news, events } = useData();
  const [activeTab, setActiveTab] = useState<'activities' | 'social' | 'mass' | 'calendar'>(initialTab || 'activities');

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleShowAll = (tab: 'activities' | 'social' | 'mass') => {
    setActiveTab(tab);
    if (tab === 'activities') {
      setVisibleNewsCount(news.length || 100);
      setVisibleEventsCount(events.length || 100);
    } else if (tab === 'social') {
      setVisibleYoutubeCount(youtubeVideos.length || 100);
      setVisibleInstagramCount(instagramPosts.length || 100);
    } else if (tab === 'mass') {
      setVisibleMassMediaCount(massMedia.length || 100);
    }
    if (setActiveSection) {
      setActiveSection('communication');
    }
    const commElem = document.getElementById('communication');
    if (commElem) {
      commElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [newsList, setNewsList] = useState(news);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  // Search and Category filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('all');

  // YouTube modal state
  const [selectedYoutubeId, setSelectedYoutubeId] = useState<string | null>(null);
  const [selectedYoutubeTitle, setSelectedYoutubeTitle] = useState<string>('');

  // Pagination states for progressive data scaling
  const [visibleYoutubeCount, setVisibleYoutubeCount] = useState(4);
  const [visibleInstagramCount, setVisibleInstagramCount] = useState(4);
  const [visibleMassMediaCount, setVisibleMassMediaCount] = useState(3);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);
  const [visibleEventsCount, setVisibleEventsCount] = useState(3);

  const handleLoadMoreYoutube = () => {
    setVisibleYoutubeCount(prev => prev + 4);
    if (setActiveSection) {
      setActiveSection('communication');
    }
    setActiveTab('social');
    const commElem = document.getElementById('communication');
    if (commElem) {
      commElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadMoreInstagram = () => {
    setVisibleInstagramCount(prev => prev + 4);
    if (setActiveSection) {
      setActiveSection('communication');
    }
    setActiveTab('social');
    const commElem = document.getElementById('communication');
    if (commElem) {
      commElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadMoreMassMedia = () => {
    setVisibleMassMediaCount(prev => prev + 3);
    if (setActiveSection) {
      setActiveSection('communication');
    }
    setActiveTab('mass');
    const commElem = document.getElementById('communication');
    if (commElem) {
      commElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShowAllActivities = () => {
    if (setActiveSection) {
      setActiveSection('communication');
    }
    setActiveTab('activities');
    if (visibleNewsCount >= filteredNews.length) {
      setVisibleNewsCount(3);
    } else {
      setVisibleNewsCount(filteredNews.length);
    }
    const commElem = document.getElementById('communication');
    if (commElem) {
      commElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    setNewsList(news);
  }, [news]);

  // AI News Generator state
  const [newsTopic, setNewsTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  // Social stats state
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [postLikes, setPostLikes] = useState<Record<string, number>>({
    'ig-1': 142,
    'ig-2': 98,
    'ig-3': 210,
    'ig-4': 115,
    'ig-5': 84,
    'ig-6': 156,
    'ig-7': 112,
    'ig-8': 204,
    'ig-9': 176,
    'ig-10': 130,
  });

  const handleLikePost = (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setPostLikes(prev => ({
      ...prev,
      [postId]: isLiked ? (prev[postId] || 0) - 1 : (prev[postId] || 0) + 1
    }));
  };

  const handleRegisterEvent = (eventId: string) => {
    setRegisteredEventId(eventId);
    setTimeout(() => {
      setRegisteredEventId(null);
      alert(lang === 'en' 
        ? 'Successfully registered! Event invitation sent to your email.' 
        : 'Berhasil mendaftar! Undangan acara dikirim ke email Anda.'
      );
    }, 1000);
  };

  const handleGenerateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTopic.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);
    setGenerationSuccess(false);

    try {
      const response = await fetch('/api/news/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: newsTopic })
      });

      if (!response.ok) {
        throw new Error(lang === 'en' ? 'Failed to generate news' : 'Gagal menghasilkan berita');
      }

      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        // Prepend the generated news items to our list
        setNewsList(prev => [...data.articles, ...prev]);
        setGenerationSuccess(true);
        setNewsTopic('');
        // Auto scroll to news grid
        setTimeout(() => {
          document.getElementById('news-grid')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        throw new Error(lang === 'en' ? 'No news articles generated' : 'Tidak ada artikel berita yang dihasilkan');
      }
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || 'Error communicating with AI server');
    } finally {
      setIsGenerating(false);
    }
  };

  // Live query-based filtering & statistics
  const filteredYoutube = youtubeVideos.filter(vid => {
    const title = lang === 'en' ? vid.title.en : vid.title.id;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredInstagram = instagramPosts.filter(post => {
    const caption = lang === 'en' ? post.caption.en : post.caption.id;
    return caption.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredMassMedia = massMedia.filter(newsItem => {
    const title = lang === 'en' ? newsItem.title.en : newsItem.title.id;
    const publisher = newsItem.publisher || '';
    const summary = lang === 'en' ? newsItem.summary.en : newsItem.summary.id;
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredNews = newsList
    .filter(art => {
      const title = typeof art.title === 'object' ? (lang === 'en' ? (art.title.en || art.title.id) : (art.title.id || art.title.en)) : (art.title || '');
      const content = typeof art.content === 'object' ? (lang === 'en' ? (art.content.en || art.content.id) : (art.content.id || art.content.en)) : (art.content || '');
      const matchesSearch = (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchesSearch;
    })
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      if (isNaN(timeA) || isNaN(timeB)) return (b.date || '').localeCompare(a.date || '');
      return timeB - timeA;
    });

  const filteredEvents = events.filter(evt => {
    const title = lang === 'en' ? evt.title.en : evt.title.id;
    const location = lang === 'en' ? evt.location.en : evt.location.id;
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Unique news categories for sub-filtering
  const newsCategories: string[] = [];

  // Paginated slices
  const paginatedYoutube = filteredYoutube.slice(0, visibleYoutubeCount);
  const paginatedInstagram = filteredInstagram.slice(0, visibleInstagramCount);
  const paginatedMassMedia = filteredMassMedia.slice(0, visibleMassMediaCount);
  const paginatedNews = filteredNews.slice(0, visibleNewsCount);
  const paginatedEvents = filteredEvents.slice(0, visibleEventsCount);

  // Total matching sum across all tabs
  const totalMatchesCount = filteredYoutube.length + filteredInstagram.length + filteredMassMedia.length + filteredNews.length + filteredEvents.length;

  return (
    <section id="communication" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'COMMUNICATION & PUBLIC RELATIONS' : 'KOMUNIKASI & HUBUNGAN MASYARAKAT'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'CoE Communication Hub' : 'Pusat Komunikasi CoE'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Connecting research breakthroughs to the public across social channels, national press, and academic events.'
              : 'Menghubungkan terobosan penelitian ke publik melalui saluran sosial, pers nasional, dan acara akademik.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs max-w-2xl w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'activities' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-extrabold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? 'Activities' : 'Aktivitas'}</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {filteredNews.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'social' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-extrabold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? 'Social' : 'Medsos'}</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {filteredYoutube.length + filteredInstagram.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('mass')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'mass' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-extrabold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? 'Mass Media' : 'Media Massa'}</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {filteredMassMedia.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'calendar' 
                  ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm font-extrabold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? 'Upcoming Calendar' : 'Kalender Acara'}</span>
              <span className="text-[10px] bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full font-mono font-bold">
                {filteredEvents.length}
              </span>
            </button>
          </div>

          {/* Elegant Unified Search Filter */}
          <div className="max-w-md w-full relative">
            <input
              type="text"
              placeholder={
                activeTab === 'social' 
                  ? (lang === 'en' ? 'Search videos and posts...' : 'Cari video dan postingan...')
                  : activeTab === 'mass'
                  ? (lang === 'en' ? 'Search mass media coverage...' : 'Cari berita media massa...')
                  : activeTab === 'calendar'
                  ? (lang === 'en' ? 'Search upcoming academic events...' : 'Cari acara/konferensi mendatang...')
                  : (lang === 'en' ? 'Search center activities & news...' : 'Cari aktivitas & berita pusat...')
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-xs rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 1. ACTIVITIES (CENTER ANNOUNCEMENTS & ACTIVITIES) */}
        {activeTab === 'activities' && (
          <div className="space-y-8 mb-20 animate-in fade-in duration-300">
            {/* Header with Title on Left & Top Right Attractive Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/5 dark:border-white/10 pb-4 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Newspaper className="w-5 h-5 text-teal-500" />
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Center Announcements & Activities' : 'Kabar & Aktivitas Pusat'}
                </h3>
              </div>

              {/* Top Right Corner Button - Plain Text Only */}
              <div className="flex items-center space-x-3">
                {filteredNews.length > 3 && (
                  <button
                    onClick={handleShowAllActivities}
                    className="px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg hover:shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {visibleNewsCount >= filteredNews.length
                      ? (lang === 'en' ? 'Show Compact' : 'Tampilkan Ringkas')
                      : (lang === 'en' ? 'Show All Activities' : 'Lihat Semua Aktivitas')}
                  </button>
                )}
              </div>
            </div>

            {/* Activities 3 per row Grid */}
            {paginatedNews.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center border border-black/5 dark:border-white/5">
                <Newspaper className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs text-slate-400">{lang === 'en' ? 'No announcements matches criteria.' : 'Tidak ada kabar/pengumuman yang cocok.'}</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="news-grid">
                  {paginatedNews.map((art) => (
                    <div 
                      key={art.id}
                      className="group glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-950">
                        <img 
                          src={art.image} 
                          alt={typeof art.title === 'object' ? (lang === 'en' ? (art.title.en || art.title.id) : (art.title.id || art.title.en)) : (art.title || '')} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        {art.images && art.images.length > 1 && (
                          <div className="absolute top-4 right-4 px-2 py-1 bg-slate-950/85 backdrop-blur-md text-teal-400 font-extrabold text-[10px] rounded-md flex items-center gap-1.5 border border-white/10 shadow-sm z-10">
                            <Images className="w-3.5 h-3.5" />
                            <span>{art.images.length}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 font-mono">
                            {art.date}
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {typeof art.title === 'object' ? (lang === 'en' ? (art.title.en || art.title.id) : (art.title.id || art.title.en)) : (art.title || '')}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-medium text-justify">
                            {typeof art.content === 'object' ? (lang === 'en' ? (art.content.en || art.content.id) : (art.content.id || art.content.en)) : (art.content || '')}
                          </p>
                        </div>

                        <button
                          onClick={() => { setSelectedArticle(art); setActiveImageIndex(0); }}
                          className="text-xs font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1.5 cursor-pointer hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                        >
                          <span>{lang === 'en' ? 'Read Announcement' : 'Baca Pengumuman'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. SOCIAL MEDIA SECTION */}
        {activeTab === 'social' && (
          <div className="space-y-12 mb-20 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/5 dark:border-white/10 pb-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Rss className="w-5 h-5 text-red-500" />
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'Social Channels & Video Streams' : 'Saluran Sosial & Streaming Video'}
                </h3>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-md">
                {lang === 'en' ? `Showing ${paginatedYoutube.length + paginatedInstagram.length} of ${filteredYoutube.length + filteredInstagram.length} items` : `Menampilkan ${paginatedYoutube.length + paginatedInstagram.length} dari ${filteredYoutube.length + filteredInstagram.length} item`}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* YouTube Library Grid (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-extrabold text-xs uppercase tracking-wider">
                    <Youtube className="w-5 h-5" />
                    <span>YouTube Channel Hub</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded-full">
                    {filteredYoutube.length} {lang === 'en' ? 'Videos' : 'Video'}
                  </span>
                </div>

                {paginatedYoutube.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center border border-black/5 dark:border-white/5">
                    <Youtube className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{lang === 'en' ? 'No videos found.' : 'Tidak ada video ditemukan.'}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paginatedYoutube.map((vid) => (
                      <div 
                        key={vid.id}
                        onClick={() => { setSelectedYoutubeId(vid.embedId); setSelectedYoutubeTitle(lang === 'en' ? vid.title.en : vid.title.id); }}
                        className="glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-red-500/20 hover:shadow-md transition-all flex flex-col sm:flex-row shadow-2xs group cursor-pointer"
                      >
                        <div className="relative w-full sm:w-44 h-28 flex-shrink-0 bg-slate-900 overflow-hidden">
                          <img 
                            src={vid.thumbnail} 
                            alt={lang === 'en' ? vid.title.en : vid.title.id} 
                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                            <div className="p-2.5 bg-red-600 text-white rounded-full shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all">
                              <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                            </div>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white">
                            {vid.duration}
                          </span>
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
                            {lang === 'en' ? vid.title.en : vid.title.id}
                          </h4>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mt-2">
                            <span className="flex items-center bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-sm">
                              <Eye className="w-3 h-3 mr-1 text-slate-400" />
                              {vid.views}
                            </span>
                            <span>{lang === 'en' ? 'AIMed CoE Channel' : 'Saluran AIMed CoE'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* YouTube Load More */}
                    {filteredYoutube.length > visibleYoutubeCount && (
                      <div className="text-center pt-2">
                        <button
                          onClick={handleLoadMoreYoutube}
                          className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800/80 text-teal-600 dark:text-teal-400 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5"
                        >
                          <span>{lang === 'en' ? 'Load More Videos' : 'Muat Video Lainnya'}</span>
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Instagram Activity Grid (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-pink-600 dark:text-pink-400 font-extrabold text-xs uppercase tracking-wider">
                    <Instagram className="w-5 h-5" />
                    <span>Instagram Activity Feed (@aimed.coe)</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-pink-500/10 text-pink-600 dark:text-pink-400 px-2.5 py-0.5 rounded-full">
                    {filteredInstagram.length} {lang === 'en' ? 'Posts' : 'Kiriman'}
                  </span>
                </div>

                {paginatedInstagram.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center border border-black/5 dark:border-white/5">
                    <Instagram className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{lang === 'en' ? 'No posts found.' : 'Tidak ada kiriman ditemukan.'}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {paginatedInstagram.map((post) => {
                        const shortcode = getInstagramShortcode(post.link);
                        
                        return (
                          <div 
                            key={post.id}
                            className="glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-lg transition-all flex flex-col group bg-white dark:bg-slate-900/60 p-2 relative min-h-[460px]"
                          >
                            {shortcode ? (
                              <div className="relative w-full h-[450px] overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
                                <iframe
                                  src={`https://www.instagram.com/p/${shortcode}/embed/?utm_source=ig_embed`}
                                  className="w-full h-full border-0 rounded-xl"
                                  allowtransparency="true"
                                  allow="encrypted-media"
                                  scrolling="no"
                                ></iframe>
                                
                                {/* Quick Direct Open Link Overlay */}
                                <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <a 
                                    href={post.link || `https://www.instagram.com/p/${shortcode}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 bg-slate-950/95 hover:bg-black backdrop-blur-md text-white rounded-xl shadow-xl border border-white/10 flex items-center space-x-1.5 transition-all text-[10px] font-extrabold cursor-pointer"
                                  >
                                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                                    <span>{lang === 'en' ? 'Open Post' : 'Buka Postingan'}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            ) : (
                              /* Fallback Card in case link is invalid or missing */
                              <div className="flex flex-col justify-between h-full p-4">
                                <div className="flex items-center space-x-2.5 mb-4">
                                  <div className="w-7 h-7 rounded-full bg-linear-to-tr from-yellow-500 via-pink-500 to-purple-600 p-0.5 flex items-center justify-center">
                                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-extrabold text-teal-400">
                                      AM
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">aimed.coe</span>
                                    <p className="text-[9px] text-slate-400">Instagram Feed</p>
                                  </div>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-black/10 dark:border-white/10 mb-4">
                                  <Instagram className="w-8 h-8 text-pink-500 mb-2 animate-pulse" />
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    {lang === 'en' ? 'Instagram Feed Post' : 'Postingan Feed Instagram'}
                                  </span>
                                  <p className="text-[10px] text-slate-400 max-w-[200px]">
                                    {lang === 'en' ? 'Click the button below to view the live content on Instagram.' : 'Klik tombol di bawah untuk melihat konten langsung di Instagram.'}
                                  </p>
                                </div>
                                <a 
                                  href={post.link || "https://instagram.com/aimed.coe"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-2.5 bg-linear-to-r from-pink-500 via-purple-600 to-teal-500 hover:opacity-95 text-white rounded-xl text-center font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer"
                                >
                                  <Instagram className="w-4 h-4" />
                                  <span>{lang === 'en' ? 'View on Instagram' : 'Lihat di Instagram'}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Instagram Load More */}
                    {filteredInstagram.length > visibleInstagramCount && (
                      <div className="text-center">
                        <button
                          onClick={handleLoadMoreInstagram}
                          className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800/80 text-teal-600 dark:text-teal-400 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5"
                        >
                          <span>{lang === 'en' ? 'Load More Posts' : 'Muat Kiriman Lainnya'}</span>
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 3. MASS MEDIA SECTION */}
        {activeTab === 'mass' && (
          <div className="space-y-8 mb-20 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/5 dark:border-white/10 pb-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Tv className="w-5 h-5 text-teal-500" />
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'National Mass Media Coverage' : 'Liputan Media Massa Nasional'}
                </h3>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-md">
                {lang === 'en' ? `Showing ${paginatedMassMedia.length} of ${filteredMassMedia.length} coverage items` : `Menampilkan ${paginatedMassMedia.length} dari ${filteredMassMedia.length} liputan berita`}
              </div>
            </div>

            {paginatedMassMedia.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center border border-black/5 dark:border-white/5">
                <Tv className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">{lang === 'en' ? 'No mass media articles match your search.' : 'Tidak ada liputan media massa yang sesuai pencarian.'}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paginatedMassMedia.map((newsItem) => (
                    <div 
                      key={newsItem.id}
                      className="glass-card rounded-2xl p-6 border border-black/5 dark:border-white/5 hover:border-teal-500/20 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 font-extrabold text-[10px] rounded-md tracking-wider uppercase">
                            {newsItem.publisher}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{newsItem.date}</span>
                        </div>

                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-3 group-hover:text-teal-500 transition-colors">
                          {lang === 'en' ? newsItem.title.en : newsItem.title.id}
                        </h4>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                          {lang === 'en' ? newsItem.summary.en : newsItem.summary.id}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/5 dark:border-white/5 mt-4 flex items-center justify-between">
                        <span className="text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                          {lang === 'en' ? 'National Press' : 'Pers Nasional'}
                        </span>
                        <a 
                          href={newsItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1 hover:underline cursor-pointer"
                        >
                          <span>{lang === 'en' ? 'Visit Article' : 'Baca Berita'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mass Media Load More */}
                {filteredMassMedia.length > visibleMassMediaCount && (
                  <div className="text-center pt-2 animate-in fade-in">
                    <button
                      onClick={handleLoadMoreMassMedia}
                      className="px-5 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800/80 text-teal-600 dark:text-teal-400 font-extrabold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5"
                    >
                      <span>{lang === 'en' ? 'Load More Coverage' : 'Muat Berita Lainnya'}</span>
                      <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 4. UPCOMING CALENDAR STANDALONE SECTION */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 mb-20 animate-in fade-in duration-300">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/5 dark:border-white/10 pb-4 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-sky-500" />
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
                    {lang === 'en' ? 'Upcoming Calendar' : 'Kalender Acara'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {lang === 'en' 
                      ? 'Explore medical AI symposia, workshop series, and scientific conferences.' 
                      : 'Jelajahi simposium AI medis, seri lokakarya, dan konferensi ilmiah mendatang.'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-xl border border-sky-500/20 self-start sm:self-auto">
                {filteredEvents.length} {lang === 'en' ? 'Upcoming Events' : 'Acara Mendatang'}
              </span>
            </div>

            {/* All Events Cards Grid */}
            <div>
              {filteredEvents.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center border border-black/5 dark:border-white/5">
                  <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 font-medium">{lang === 'en' ? 'No events found matching your search.' : 'Tidak ada acara yang cocok dengan pencarian Anda.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredEvents.map((evt) => {
                    const dateParts = evt.date.split(' ');
                    const monthStr = dateParts[0] ? dateParts[0].substring(0, 3).toUpperCase() : 'JUL';
                    const dayStr = dateParts[1] ? dateParts[1].replace(',', '') : '28';
                    const yearStr = dateParts[2] || '2026';

                    return (
                      <div 
                        key={evt.id}
                        className="glass-card rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
                      >
                        <div className="space-y-4">
                          {/* Calendar Sheet Icon & Time Header */}
                          <div className="flex items-start justify-between">
                            <div className="w-14 h-16 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 text-center flex flex-col shadow-2xs">
                              <div className="bg-sky-500 dark:bg-sky-600 text-white text-[9px] font-extrabold uppercase py-0.5 tracking-wider">
                                {monthStr}
                              </div>
                              <div className="flex-1 flex flex-col justify-center bg-white dark:bg-slate-900 p-1">
                                <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none tracking-tighter">
                                  {dayStr}
                                </span>
                                <span className="text-[7px] font-mono font-bold text-slate-400 leading-none mt-0.5">
                                  {yearStr}
                                </span>
                              </div>
                            </div>

                            <span className="text-[10px] font-mono font-extrabold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md">
                              {evt.time}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug group-hover:text-sky-500 transition-colors">
                            {lang === 'en' ? evt.title.en : evt.title.id}
                          </h4>

                          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-semibold bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-black/5 dark:border-white/5">
                            <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                            <span className="line-clamp-2">{lang === 'en' ? evt.location.en : evt.location.id}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRegisterEvent(evt.id)}
                          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center space-x-2"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{lang === 'en' ? 'Reserve A Seat' : 'Ambil Tempat Duduk'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Embedded YouTube Player watching Modal */}
      {selectedYoutubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h3 className="font-extrabold text-xs sm:text-sm text-white truncate max-w-[80%] flex items-center space-x-2">
                <span className="bg-red-600 p-1 rounded">
                  <Youtube className="w-4 h-4 fill-white text-white" />
                </span>
                <span>{selectedYoutubeTitle}</span>
              </h3>
              <button 
                onClick={() => { setSelectedYoutubeId(null); setSelectedYoutubeTitle(''); }}
                className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedYoutubeId}?autoplay=1`}
                title="YouTube Video Player"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Article Modal Drawer */}
      {selectedArticle && (() => {
        const articleImages = selectedArticle.images && selectedArticle.images.length > 0 
          ? selectedArticle.images 
          : [selectedArticle.image];
        const currentImage = articleImages[activeImageIndex] || selectedArticle.image;

        return (
          <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 overflow-y-auto animate-in fade-in duration-200 flex flex-col">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900/80 px-4 sm:px-8 py-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-900/50 rounded-xl transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back' : 'Kembali'}</span>
              </button>
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:inline">
                {lang === 'en' ? 'Announcements & News Details' : 'Detail Kabar & Pengumuman'}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full max-w-5xl mx-auto flex-1 flex flex-col pb-16 px-4 sm:px-6 md:px-8 pt-6">
              {/* Main Banner / Interactive Image Slider */}
              <div className="relative h-72 sm:h-96 md:h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden rounded-3xl shadow-lg">
                <img 
                  src={currentImage} 
                  alt={typeof selectedArticle.title === 'object' ? (lang === 'en' ? (selectedArticle.title.en || selectedArticle.title.id) : (selectedArticle.title.id || selectedArticle.title.en)) : (selectedArticle.title || '')} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Left/Right Arrows */}
                {articleImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === 0 ? articleImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white transition-all z-10 cursor-pointer shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === articleImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white transition-all z-10 cursor-pointer shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter indicator */}
                {articleImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md text-[10px] text-white font-mono font-bold z-10">
                    {activeImageIndex + 1} / {articleImages.length}
                  </div>
                )}
              </div>

              {/* Interactive Gallery Thumbnails */}
              {articleImages.length > 1 && (
                <div className="mt-4 p-2 flex gap-2 overflow-x-auto scrollbar-none justify-start sm:justify-center">
                  {articleImages.map((imgUrl: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 transition-all border-2 cursor-pointer ${
                        idx === activeImageIndex 
                          ? 'border-teal-500 scale-95 shadow-sm opacity-100' 
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Details Content */}
              <div className="space-y-6 mt-8">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {typeof selectedArticle.title === 'object' ? (lang === 'en' ? (selectedArticle.title.en || selectedArticle.title.id) : (selectedArticle.title.id || selectedArticle.title.en)) : (selectedArticle.title || '')}
                  </h3>
                </div>

                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <span>{lang === 'en' ? 'Published:' : 'Diterbitkan:'}</span>
                  <span className="ml-1.5 font-mono text-slate-800 dark:text-slate-200 font-extrabold">{selectedArticle.date}</span>
                </div>
                
                <div className="space-y-4 text-justify leading-relaxed text-slate-700 dark:text-slate-200 font-normal font-sans text-base sm:text-lg">
                  {(() => {
                    const contentStr = typeof selectedArticle.content === 'object' 
                      ? (lang === 'en' ? (selectedArticle.content.en || selectedArticle.content.id) : (selectedArticle.content.id || selectedArticle.content.en)) 
                      : (selectedArticle.content || '');
                    
                    const paragraphs = contentStr.split(/\n\s*\n/).filter(Boolean);
                    
                    if (paragraphs.length > 1) {
                      return paragraphs.map((paragraphText: string, pIdx: number) => (
                        <p key={pIdx} className="whitespace-pre-line text-justify leading-relaxed">
                          {paragraphText.trim()}
                        </p>
                      ));
                    }

                    return (
                      <p className="whitespace-pre-line text-justify leading-relaxed">
                        {contentStr}
                      </p>
                    );
                  })()}
                </div>

                {/* Grid of several photos inside the narration */}
                {articleImages.length > 1 && (
                  <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800/80">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {lang === 'en' ? 'Activity Gallery / Documentation' : 'Dokumentasi / Galeri Foto Kegiatan'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {articleImages.map((imgUrl: string, idx: number) => (
                        <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm hover:shadow-md transition-all group">
                          <img 
                            src={imgUrl} 
                            alt={`Gallery image ${idx + 1}`} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                            onClick={() => setActiveImageIndex(idx)}
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
