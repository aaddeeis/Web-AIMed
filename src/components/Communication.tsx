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

interface CommunicationProps {
  lang: Language;
}

export default function Communication({ lang }: CommunicationProps) {
  const { youtubeVideos, instagramPosts, massMedia, news, events } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'mass' | 'activities'>('all');
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
  const [visibleNewsCount, setVisibleNewsCount] = useState(4);
  const [visibleEventsCount, setVisibleEventsCount] = useState(3);

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

  const filteredNews = newsList.filter(art => {
    const title = lang === 'en' ? art.title.en : art.title.id;
    const content = lang === 'en' ? art.content.en : art.content.id;
    const category = art.category || '';
    const matchesSearch = (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory = selectedNewsCategory === 'all' || art.category === selectedNewsCategory;
    return matchesSearch && matchesCategory;
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
  const newsCategories = ['all', ...Array.from(new Set(newsList.map(item => item.category)))];

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
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-xs max-w-lg w-full overflow-x-auto no-scrollbar">
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'all' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-extrabold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? 'All' : 'Semua'}</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {totalMatchesCount}
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
              onClick={() => setActiveTab('activities')}
              className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'activities' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-extrabold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? 'Activities' : 'Kegiatan'}</span>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">
                {filteredNews.length + filteredEvents.length}
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
                  : activeTab === 'activities'
                  ? (lang === 'en' ? 'Search news or events...' : 'Cari kabar atau acara...')
                  : (lang === 'en' ? 'Search anything in our hub...' : 'Cari apa pun di pusat komunikasi...')
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

        {/* 1. SOCIAL MEDIA SECTION */}
        {(activeTab === 'all' || activeTab === 'social') && (
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
                          onClick={() => setVisibleYoutubeCount(prev => prev + 4)}
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
                          onClick={() => setVisibleInstagramCount(prev => prev + 4)}
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

        {/* 2. MASS MEDIA SECTION */}
        {(activeTab === 'all' || activeTab === 'mass') && (
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
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {paginatedMassMedia.map((newsItem) => (
                    <div 
                      key={newsItem.id}
                      className="glass-card rounded-2xl p-6 border border-black/5 dark:border-white/5 hover:border-teal-500/20 hover:shadow-lg transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 font-extrabold text-[10px] rounded-md tracking-wider uppercase">
                            {newsItem.publisher}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{newsItem.date}</span>
                        </div>

                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug line-clamp-3 group-hover:text-teal-500 transition-colors">
                          {lang === 'en' ? newsItem.title.en : newsItem.title.id}
                        </h4>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4 font-medium">
                          {lang === 'en' ? newsItem.summary.en : newsItem.summary.id}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-black/5 dark:border-white/5 mt-5 flex items-center justify-between">
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
                      onClick={() => setVisibleMassMediaCount(prev => prev + 3)}
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

        {/* 3. ACTIVITIES (NEWS & SCIENTIFIC EVENTS) */}
        {(activeTab === 'all' || activeTab === 'activities') && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/5 dark:border-white/10 pb-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-sky-500" />
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? 'News & Scientific Events' : 'Berita & Acara Ilmiah'}
                </h3>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-md">
                {lang === 'en' ? `Showing ${paginatedNews.length + paginatedEvents.length} items` : `Menampilkan ${paginatedNews.length + paginatedEvents.length} item`}
              </div>
            </div>

            {/* Split Grid: News on Left, Events Calendar on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* LEFT: News Magazine (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-3">
                  <h4 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center">
                    <Newspaper className="w-5 h-5 text-teal-500 mr-2" />
                    <span>{lang === 'en' ? 'Center Announcements' : 'Kabar & Pengumuman Pusat'}</span>
                  </h4>

                  {/* News Category Selector */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
                    {newsCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedNewsCategory(cat); setVisibleNewsCount(4); }}
                        className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg capitalize whitespace-nowrap transition-all cursor-pointer ${
                          selectedNewsCategory === cat
                            ? 'bg-teal-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {cat === 'all' ? (lang === 'en' ? 'All categories' : 'Semua') : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {paginatedNews.length === 0 ? (
                  <div className="glass-card rounded-2xl p-12 text-center border border-black/5 dark:border-white/5">
                    <Newspaper className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{lang === 'en' ? 'No announcements matches criteria.' : 'Tidak ada kabar/pengumuman yang cocok.'}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="news-grid">
                      {paginatedNews.map((art) => (
                        <div 
                          key={art.id}
                          className="group glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div className="relative h-48 overflow-hidden bg-slate-950">
                            <img 
                              src={art.image} 
                              alt={lang === 'en' ? art.title.en : art.title.id} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            
                            <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-extrabold text-[9px] rounded-md uppercase tracking-wider border border-white/5">
                              {art.category}
                            </span>

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
                                {lang === 'en' ? art.title.en : art.title.id}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-medium">
                                {lang === 'en' ? art.content.en : art.content.id}
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

                    {/* News Announcements Load More */}
                    {filteredNews.length > visibleNewsCount && (
                      <div className="text-center pt-2">
                        <button
                          onClick={() => setVisibleNewsCount(prev => prev + 4)}
                          className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800/80 text-teal-600 dark:text-teal-400 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5"
                        >
                          <span>{lang === 'en' ? 'Load More News' : 'Muat Pengumuman Lainnya'}</span>
                          <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT: Upcoming Events (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
                  <h4 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center">
                    <Calendar className="w-5 h-5 text-sky-500 mr-2" />
                    <span>{lang === 'en' ? 'Upcoming Calendar' : 'Kalender Acara'}</span>
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 rounded-full">
                    {filteredEvents.length} {lang === 'en' ? 'Events' : 'Acara'}
                  </span>
                </div>

                {paginatedEvents.length === 0 ? (
                  <div className="glass-card rounded-2xl p-8 text-center border border-black/5 dark:border-white/5">
                    <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{lang === 'en' ? 'No upcoming events found.' : 'Tidak ada acara mendatang.'}</p>
                  </div>
                ) : (
                  <div className="space-y-4" id="events-stack">
                    {paginatedEvents.map((evt) => {
                      const isReg = registeredEventId === evt.id;

                      // Parse date (like "July 28, 2026") into calendar sheet UI
                      const dateParts = evt.date.split(' ');
                      const monthStr = dateParts[0] ? dateParts[0].substring(0, 3).toUpperCase() : 'JUL';
                      const dayStr = dateParts[1] ? dateParts[1].replace(',', '') : '28';
                      const yearStr = dateParts[2] || '2026';

                      return (
                        <div 
                          key={evt.id}
                          className="glass-card p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-2xs hover:-translate-y-0.5 transition-all flex items-start space-x-4"
                        >
                          {/* Calendar Sheet Icon */}
                          <div className="w-14 h-15 flex-shrink-0 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 text-center flex flex-col shadow-2xs">
                            <div className="bg-sky-500 dark:bg-sky-600 text-white text-[9px] font-extrabold uppercase py-0.5 tracking-wider">
                              {monthStr}
                            </div>
                            <div className="flex-1 flex flex-col justify-center bg-white dark:bg-slate-950 p-1">
                              <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none tracking-tighter">
                                {dayStr}
                              </span>
                              <span className="text-[7px] font-mono font-bold text-slate-400 leading-none mt-0.5">
                                {yearStr}
                              </span>
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="flex-1 space-y-3">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1.5 text-[9px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-widest font-mono">
                                <Clock className="w-3 h-3" />
                                <span>{evt.time}</span>
                              </div>

                              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                                {lang === 'en' ? evt.title.en : evt.title.id}
                              </h4>
                            </div>

                            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-semibold leading-relaxed">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span className="line-clamp-2">{lang === 'en' ? evt.location.en : evt.location.id}</span>
                            </div>

                            <button
                              onClick={() => handleRegisterEvent(evt.id)}
                              className="w-full py-2 bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-[10px] rounded-xl transition-all cursor-pointer shadow-2xs"
                            >
                              {lang === 'en' ? 'Reserve A Seat' : 'Ambil Tempat Duduk'}
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* Events Load More */}
                    {filteredEvents.length > visibleEventsCount && (
                      <div className="text-center pt-2">
                        <button
                          onClick={() => setVisibleEventsCount(prev => prev + 3)}
                          className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800/80 text-teal-600 dark:text-teal-400 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5"
                        >
                          <span>{lang === 'en' ? 'Load More Events' : 'Muat Acara Lainnya'}</span>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative glass-panel-heavy bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-200/80 dark:border-slate-800">
              {/* Header / Interactive Image Slider */}
              <div className="relative h-64 sm:h-80 bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src={currentImage} 
                  alt={lang === 'en' ? selectedArticle.title.en : selectedArticle.title.id} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Left/Right Arrows */}
                {articleImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === 0 ? articleImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-4 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white/90 hover:text-white transition-all z-10 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === articleImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-4 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white/90 hover:text-white transition-all z-10 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Close Button on Image */}
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950 text-white rounded-full transition-colors z-20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image counter indicator */}
                {articleImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] text-white/95 font-mono font-bold z-10">
                    {activeImageIndex + 1} / {articleImages.length}
                  </div>
                )}
              </div>

              {/* Interactive Gallery Thumbnails */}
              {articleImages.length > 1 && (
                <div className="px-6 pt-4 pb-1 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-teal-500/20">
                  {articleImages.map((imgUrl: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all border-2 cursor-pointer ${
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

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-5 max-h-[45vh] overflow-y-auto">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-300 bg-teal-500/15 px-2.5 py-1 rounded tracking-widest">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-3 leading-tight">
                    {lang === 'en' ? selectedArticle.title.en : selectedArticle.title.id}
                  </h3>
                </div>

                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">
                  <span>{lang === 'en' ? 'Published:' : 'Diterbitkan:'}</span>
                  <span className="ml-1.5 font-mono text-slate-700 dark:text-slate-300 font-extrabold">{selectedArticle.date}</span>
                </div>
                
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-semibold font-sans">
                  {lang === 'en' ? selectedArticle.content.en : selectedArticle.content.id}
                </p>

                {/* simulated deep read */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {lang === 'en' ? (
                    `PALEMBANG — Under the supervision of global advisory teams, AIMed researchers completed model pipelines targeting rural clinic deployments. Clinical accuracy tests held at RSMH Palembang recorded excellent performance, proving that enterprise networks can execute on standard edge ultrasound hardware without computational drops. Future phases plan to install dedicated diagnostic hubs connected directly via regional telehealth grids.`
                  ) : (
                    `PALEMBANG — Di bawah pengawasan tim penasihat global, peneliti AIMed menyelesaikan alur model yang menargetkan penerapan klinik pedesaan. Tes akurasi klinis yang diadakan di RSMH Palembang mencatat kinerja yang sangat baik, membuktikan bahwa jaringan perusahaan dapat berjalan pada perangkat keras ultrasound standar tanpa penurunan komputasi. Fase masa depan berencana untuk memasang pusat diagnostik khusus yang terhubung langsung melalui jaringan telehealth regional.`
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/5 dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5 text-right">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {lang === 'en' ? 'Close Window' : 'Tutup Jendela'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
