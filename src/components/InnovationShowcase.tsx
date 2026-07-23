import React, { useState } from 'react';
import { 
  Activity, 
  Github, 
  FileText, 
  Video, 
  Play, 
  Layers, 
  Search, 
  Eye, 
  ExternalLink,
  X,
  Globe
} from 'lucide-react';
import { Language, ShowcaseProject } from '../types';
import { useData } from '../context/DataContext';

interface InnovationShowcaseProps {
  lang: Language;
  hideSdg?: boolean;
}

export default function InnovationShowcase({ lang, hideSdg = false }: InnovationShowcaseProps) {
  const { showcaseProjects, sdgContent } = useData();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

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
        <div className="text-center max-w-3xl mx-auto mb-20">
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

        {/* Flagship Systems List */}
        <div className="space-y-24" id="showcase-projects-list">
          {extendedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={project.id}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Large Project Image with Hover effects */}
                <div className="w-full lg:w-1/2 relative group rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                  />

                  {/* Play video overlay if video is supported */}
                  {project.videoUrl && (
                    <button 
                      onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                      className="absolute inset-0 m-auto w-16 h-16 bg-white/90 backdrop-blur-md text-[#0F766E] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-20"
                      title={lang === 'en' ? 'Play Video Demonstration' : 'Putar Demonstrasi Video'}
                    >
                      <Play className="w-6 h-6 fill-[#0F766E] translate-x-0.5" />
                    </button>
                  )}
                </div>

                {/* Project Description Details */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded">
                      {lang === 'en' ? project.tagline.en : project.tagline.id}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'en' ? project.description.en : project.description.id}
                  </p>

                  {/* Key Features Bullet Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-black/5 dark:bg-white/[0.02] p-5 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    {((lang === 'en' ? project.features.en : project.features.id) || []).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                        <Activity className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Project Action CTA Buttons */}
                  <div className="flex flex-wrap gap-3.5 pt-3">
                    {project.publicationUrl && (
                      <a
                        href={project.publicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 bg-white/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>{lang === 'en' ? 'Read Paper' : 'Baca Makalah'}</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 bg-white/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all"
                      >
                        <Github className="w-4 h-4 text-slate-400" />
                        <span>Source Code</span>
                      </a>
                    )}

                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 bg-white/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1.5 transition-all"
                      >
                        <Globe className="w-4 h-4 text-slate-400" />
                        <span>Website</span>
                      </a>
                    )}

                    {project.videoUrl && (
                      <button
                        onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                        className="px-4 py-3 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-xl hover:bg-black/10 dark:hover:bg-white/5 flex items-center space-x-1.5 transition-all"
                      >
                        {isImageUrl(project.videoUrl) ? (
                          <>
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span>{lang === 'en' ? 'View Image' : 'Lihat Gambar'}</span>
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4 text-slate-400" />
                            <span>{lang === 'en' ? 'Watch Demo' : 'Tonton Demo'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
