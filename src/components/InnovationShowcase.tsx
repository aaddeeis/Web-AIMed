import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Github, 
  FileText, 
  Video, 
  Play, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  X,
  Globe,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

interface InnovationShowcaseProps {
  lang: Language;
  hideSdg?: boolean;
  isVertical?: boolean;
}

export default function InnovationShowcase({ lang, hideSdg = false, isVertical = false }: InnovationShowcaseProps) {
  const { showcaseProjects, sdgContent } = useData();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSdg = sdgContent || {
    title: { en: 'Empowering Global Sustainable Development', id: 'Memberdayakan Pembangunan Berkelanjutan Global' },
    subtitle: { en: 'SDG ALIGNMENT', id: 'KESELARASAN SDG' },
    sdg3Title: { en: 'SDG 3: Good Health & Well-being', id: 'SDG 3: Kehidupan Sehat & Sejahtera' },
    sdg3Text: {
      en: 'The AIMed Center of Excellence supports SDG 3 (Good Health and Well-being) by developing AI-driven solutions for better disease detection and healthcare delivery.',
      id: 'AIMed Center of Excellence mendukung SDG 3 (Kehidupan Sehat dan Sejahtera) dengan mengembangkan solusi bertenaga AI untuk deteksi penyakit dan pemberian layanan kesehatan yang lebih baik.'
    },
    sdg3Image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sustainable_Development_Goal_03.svg',
    sdg9Title: { en: 'SDG 9: Industry, Innovation & Infrastructure', id: 'SDG 9: Industri, Inovasi & Infrastruktur' },
    sdg9Text: {
      en: 'It also contributes to SDG 9 (Industry, Innovation and Infrastructure) by fostering technological innovation through research in intelligent systems, promoting sustainable healthcare infrastructure, and collaborating with industry to accelerate the adoption of cutting-edge technologies.',
      id: 'Kami juga berkontribusi pada SDG 9 (Industri, Inovasi, dan Infrastruktur) dengan mendorong inovasi teknologi melalui penelitian pada sistem cerdas, mempromosikan infrastruktur layanan kesehatan yang berkelanjutan, dan berkolaborasi dengan industri untuk mempercepat adopsi teknologi mutakhir.'
    },
    sdg9Image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Sustainable_Development_Goal_09.svg'
  };

  const isImageUrl = (url?: string) => {
    if (!url) return false;
    return url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.includes('teleotiva_banner') || url.startsWith('data:') || url.includes('blob:');
  };

  const getEmbedUrl = (url: string | null) => {
    if (!url) return '';
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      const rest = parts[1] || '';
      const idAndQuery = rest.split('?');
      const id = idAndQuery[0];
      const query = idAndQuery[1] ? `?${idAndQuery[1]}` : '';
      return `https://www.youtube.com/embed/${id}${query}`;
    }
    if (url.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(url);
        const id = urlObj.searchParams.get('v');
        urlObj.searchParams.delete('v');
        const queryParams = urlObj.searchParams.toString();
        const query = queryParams ? `?${queryParams}` : '';
        return `https://www.youtube.com/embed/${id}${query}`;
      } catch (e) {
        return url;
      }
    }
    return url;
  };

  // Filter and order showcase projects as requested: TeleOTIVA first, CHDxAI second, then any newly added ones
  const teleotiva = showcaseProjects.find(p => p.id === 'teleotiva');
  const chdxai = showcaseProjects.find(p => p.id === 'chdxai');
  const others = showcaseProjects.filter(p => p.id !== 'teleotiva' && p.id !== 'chdxai');
  const extendedProjects = [
    ...(teleotiva ? [teleotiva] : []),
    ...(chdxai ? [chdxai] : []),
    ...others
  ];

  // Auto-advance slideshow continuously every 2 seconds without pause (only in home slideshow mode)
  useEffect(() => {
    if (isVertical || extendedProjects.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % extendedProjects.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [extendedProjects.length, isVertical]);

  // Keep index within range if items change
  useEffect(() => {
    if (currentIndex >= extendedProjects.length && extendedProjects.length > 0) {
      setCurrentIndex(0);
    }
  }, [extendedProjects.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + extendedProjects.length) % extendedProjects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % extendedProjects.length);
  };

  const currentProject = extendedProjects[currentIndex] || extendedProjects[0];

  return (
    <section id="showcase" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SDGs Commitment Section */}
        {!hideSdg && (
          <div className="mb-24 border-b border-slate-100 dark:border-slate-800 pb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full">
                {currentSdg.subtitle ? (currentSdg.subtitle[lang] || 'SDG ALIGNMENT') : 'SDG ALIGNMENT'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4">
                {currentSdg.title ? (currentSdg.title[lang] || 'Empowering Global Sustainable Development') : 'Empowering Global Sustainable Development'}
              </h2>
              <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* SDG 3 */}
              <div className="group bg-white/45 dark:bg-slate-900/40 hover:bg-white/60 dark:hover:bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-400/30 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 flex-shrink-0 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-2">
                  <img 
                    src={currentSdg.sdg3Image || "https://upload.wikimedia.org/wikipedia/commons/e/ec/Sustainable_Development_Goal_03.svg"}
                    alt="SDG 3 Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/b/b4/Sustainable_Development_Goal_3.png";
                    }}
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {currentSdg.sdg3Title ? (currentSdg.sdg3Title[lang] || 'SDG 3: Good Health & Well-being') : 'SDG 3: Good Health & Well-being'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {currentSdg.sdg3Text ? (currentSdg.sdg3Text[lang] || '') : ''}
                  </p>
                </div>
              </div>

              {/* SDG 9 */}
              <div className="group bg-white/45 dark:bg-slate-900/40 hover:bg-white/60 dark:hover:bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md hover:shadow-xl hover:border-amber-500/30 dark:hover:border-amber-400/30 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 flex-shrink-0 bg-orange-50 dark:bg-orange-950/20 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-2">
                  <img 
                    src={currentSdg.sdg9Image || "https://upload.wikimedia.org/wikipedia/commons/b/b8/Sustainable_Development_Goal_09.svg"}
                    alt="SDG 9 Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sustainable_Development_Goal_9.png";
                    }}
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {currentSdg.sdg9Title ? (currentSdg.sdg9Title[lang] || 'SDG 9: Industry, Innovation & Infrastructure') : 'SDG 9: Industry, Innovation & Infrastructure'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {currentSdg.sdg9Text ? (currentSdg.sdg9Text[lang] || '') : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'PRODUCTS' : 'PRODUK'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Flagship AI Medical Systems' : 'Sistem Medis AI Unggulan'}
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'en' 
              ? 'Translating frontier neural research into robust, clinician-tested systems deployable in low-resource settings.'
              : 'Menerjemahkan riset saraf terdepan menjadi sistem kokoh yang teruji klinis dan dapat diterapkan di lingkungan terbatas.'}
          </p>
        </div>

        {/* CONDITIONAL RENDERING: Vertical Downward Stack for Dedicated Products Page vs Slideshow for Home */}
        {isVertical ? (
          /* Vertical Stacked Products View (Tampilan ke Bawah) */
          <div className="space-y-16 sm:space-y-20">
            {extendedProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={project.id}
                  className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                    
                    {/* Product Image */}
                    <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-md bg-slate-950 flex-shrink-0">
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 z-10" />
                      
                      <img 
                        src={project.image} 
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-[300px] sm:h-[360px] object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                      />

                      {/* Top Badge Overlay */}
                      <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-extrabold text-teal-400">
                        <Sparkles className="w-3 h-3 text-teal-400" />
                        <span>PRODUCT #{String(idx + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Play video overlay */}
                      {project.videoUrl && (
                        <button 
                          onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                          className="absolute inset-0 m-auto w-16 h-16 bg-white/90 backdrop-blur-md text-[#0F766E] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-20 cursor-pointer"
                          title={lang === 'en' ? 'Play Video Demonstration' : 'Putar Demonstrasi Video'}
                        >
                          <Play className="w-6 h-6 fill-[#0F766E] translate-x-0.5" />
                        </button>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3.5 py-1 rounded-full border border-teal-500/20">
                          {lang === 'en' ? project.tagline.en : project.tagline.id}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {project.name}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-normal">
                        {lang === 'en' ? project.description.en : project.description.id}
                      </p>

                      {/* Key Features Bullet Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
                        {((lang === 'en' ? project.features.en : project.features.id) || []).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                            <Activity className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="font-semibold">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Project Action CTA Buttons */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {project.publicationUrl && (
                          <a
                            href={project.publicationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-all flex items-center space-x-1.5"
                          >
                            <FileText className="w-4 h-4 text-teal-500" />
                            <span>{lang === 'en' ? 'Read Paper' : 'Baca Makalah'}</span>
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-all flex items-center space-x-1.5"
                          >
                            <Github className="w-4 h-4 text-teal-500" />
                            <span>Source Code</span>
                          </a>
                        )}

                        {project.websiteUrl && (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-all flex items-center space-x-1.5"
                          >
                            <Globe className="w-4 h-4 text-teal-500" />
                            <span>Website</span>
                          </a>
                        )}

                        {project.videoUrl && (
                          <button
                            onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                            className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-xl hover:bg-teal-500/20 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                          >
                            {isImageUrl(project.videoUrl) ? (
                              <>
                                <Eye className="w-4 h-4 text-teal-500" />
                                <span>{lang === 'en' ? 'View Image' : 'Lihat Gambar'}</span>
                              </>
                            ) : (
                              <>
                                <Video className="w-4 h-4 text-teal-500" />
                                <span>{lang === 'en' ? 'Watch Demo' : 'Tonton Demo'}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Single-Item Auto-Looping Slideshow Container for Home Page */
          extendedProjects.length > 0 && currentProject && (
            <div className="relative transition-all duration-300 py-4">
              
              {/* Navigation Arrow Controls */}
              {extendedProjects.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white shadow-lg hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 transition-all flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:scale-105 active:scale-95"
                    title={lang === 'en' ? 'Previous Product' : 'Produk Sebelumnya'}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white shadow-lg hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 transition-all flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:scale-105 active:scale-95"
                    title={lang === 'en' ? 'Next Product' : 'Produk Selanjutnya'}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Slide Content Card - Open Clean Design */}
              <div key={currentProject.id} className="animate-in fade-in zoom-in-98 duration-300 px-2 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
                  
                  {/* Large Product Image with Clean Rounded Frame */}
                  <div className="w-full lg:w-1/2 relative group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-lg bg-slate-950">
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 z-10" />
                    
                    <img 
                      src={currentProject.image} 
                      alt={currentProject.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                    />

                    {/* Top Badge Overlay */}
                    <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-extrabold text-teal-400">
                      <Sparkles className="w-3 h-3 text-teal-400" />
                      <span>{lang === 'en' ? 'FLAGSHIP PRODUCT' : 'PRODUK UNGGULAN'}</span>
                    </div>

                    {/* Play video overlay if video is supported */}
                    {currentProject.videoUrl && (
                      <button 
                        onClick={() => setActiveVideoUrl(currentProject.videoUrl || null)}
                        className="absolute inset-0 m-auto w-16 h-16 bg-white/90 backdrop-blur-md text-[#0F766E] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-20 cursor-pointer"
                        title={lang === 'en' ? 'Play Video Demonstration' : 'Putar Demonstrasi Video'}
                      >
                        <Play className="w-6 h-6 fill-[#0F766E] translate-x-0.5" />
                      </button>
                    )}
                  </div>

                  {/* Product Description Details - Unboxed Clean Layout */}
                  <div className="w-full lg:w-1/2 space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3.5 py-1 rounded-full border border-teal-500/20">
                        {lang === 'en' ? currentProject.tagline.en : currentProject.tagline.id}
                      </span>
                      <div className="flex items-center space-x-1 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-md">
                        <span className="text-teal-600 dark:text-teal-400">{String(currentIndex + 1).padStart(2, '0')}</span>
                        <span>/</span>
                        <span>{String(extendedProjects.length).padStart(2, '0')}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {currentProject.name}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-normal">
                      {lang === 'en' ? currentProject.description.en : currentProject.description.id}
                    </p>

                    {/* Key Features Bullet Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
                      {((lang === 'en' ? currentProject.features.en : currentProject.features.id) || []).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                          <Activity className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Project Action CTA Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {currentProject.publicationUrl && (
                        <a
                          href={currentProject.publicationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-all flex items-center space-x-1.5"
                        >
                          <FileText className="w-4 h-4 text-teal-500" />
                          <span>{lang === 'en' ? 'Read Paper' : 'Baca Makalah'}</span>
                        </a>
                      )}

                      {currentProject.githubUrl && (
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-all flex items-center space-x-1.5"
                        >
                          <Github className="w-4 h-4 text-teal-500" />
                          <span>Source Code</span>
                        </a>
                      )}

                      {currentProject.websiteUrl && (
                        <a
                          href={currentProject.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-all flex items-center space-x-1.5"
                        >
                          <Globe className="w-4 h-4 text-teal-500" />
                          <span>Website</span>
                        </a>
                      )}

                      {currentProject.videoUrl && (
                        <button
                          onClick={() => setActiveVideoUrl(currentProject.videoUrl || null)}
                          className="px-4 py-2.5 bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-xl hover:bg-teal-500/20 transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                        >
                          {isImageUrl(currentProject.videoUrl) ? (
                            <>
                              <Eye className="w-4 h-4 text-teal-500" />
                              <span>{lang === 'en' ? 'View Image' : 'Lihat Gambar'}</span>
                            </>
                          ) : (
                            <>
                              <Video className="w-4 h-4 text-teal-500" />
                              <span>{lang === 'en' ? 'Watch Demo' : 'Tonton Demo'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Slideshow Bottom Pagination Indicator Bars */}
              {extendedProjects.length > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-10">
                  {extendedProjects.map((proj, pIdx) => (
                    <button
                      key={proj.id}
                      onClick={() => setCurrentIndex(pIdx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        pIdx === currentIndex 
                          ? 'w-10 bg-teal-600 dark:bg-teal-400 shadow-xs' 
                          : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                      }`}
                      title={proj.name}
                    />
                  ))}
                </div>
              )}

            </div>
          )
        )}

      </div>

      {/* Embedded High-tech Video Demonstration Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-black w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-950 text-white rounded-full z-10 hover:scale-105 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
            {isImageUrl(activeVideoUrl) ? (
              <img
                src={activeVideoUrl}
                alt="Product Demonstration"
                className="w-full h-full object-contain bg-slate-950"
              />
            ) : (
              <iframe
                title="Clinical Demonstration Walkthrough"
                src={getEmbedUrl(activeVideoUrl)}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

