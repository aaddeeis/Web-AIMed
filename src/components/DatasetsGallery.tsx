import React, { useState, useRef } from 'react';
import { 
  Download, 
  Database, 
  Scale, 
  FileCheck, 
  TrendingUp, 
  ExternalLink,
  Loader2,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { useData } from '../context/DataContext';

interface DatasetsGalleryProps {
  lang: Language;
}

export default function DatasetsGallery({ lang }: DatasetsGalleryProps) {
  const { datasets } = useData();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedId(id);
      setTimeout(() => {
        setDownloadedId(null);
      }, 3000);
    }, 1500);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="datasets" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
              {lang === 'en' ? 'OPEN ACCESS RESOURCES' : 'SUMBER DAYA AKSES TERBUKA'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
              {lang === 'en' ? 'Clinical Reference Datasets' : 'Dataset Referensi Klinis'}
            </h2>
            <div className="w-16 h-1 bg-sky-600 rounded-full mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              {lang === 'en' 
                ? `Supporting the global healthcare AI community with high-fidelity, expert-annotated clinical datasets for research validation (${datasets.length} curations).`
                : `Mendukung komunitas AI kesehatan global dengan dataset klinis fidelitas tinggi yang dianotasi oleh ahli untuk validasi penelitian (${datasets.length} kurasi).`}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-500 dark:hover:text-teal-400 transition-all shadow-sm cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal-500 dark:hover:text-teal-400 transition-all shadow-sm cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Datasets Scrollable Row */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 scroll-smooth pb-6 snap-x snap-mandatory no-scrollbar"
        >
          {datasets.map((dataset) => {
            const isDownloading = downloadingId === dataset.id;
            const isDownloaded = downloadedId === dataset.id;

            return (
              <div 
                key={dataset.id}
                className="w-full sm:w-[350px] md:w-[380px] lg:w-[400px] flex-shrink-0 snap-start glass-card rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-black/5 dark:border-white/5"
              >
                {/* Visual Cover */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dataset.image} 
                    alt={dataset.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Absolute Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white font-bold text-xs flex items-center">
                    <Database className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
                    <span>{dataset.size}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight line-clamp-2 h-12">
                      {dataset.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 h-15">
                      {lang === 'en' ? dataset.description.en : dataset.description.id}
                    </p>
                  </div>

                  {/* Scientific metadata specs */}
                  <div className="space-y-2.5 pt-2 border-t border-black/5 dark:border-white/5 text-xs">
                    {/* License info */}
                    <div className="flex items-start">
                      <Scale className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block tracking-wider uppercase text-[9px]">
                          {lang === 'en' ? 'License Constraint' : 'Batasan Lisensi'}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
                          {dataset.license}
                        </span>
                      </div>
                    </div>

                    {/* Benchmark info */}
                    <div className="flex items-start">
                      <TrendingUp className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block tracking-wider uppercase text-[9px]">
                          {lang === 'en' ? 'Origin' : 'Asal'}
                        </span>
                        <span className="text-teal-600 dark:text-teal-400 font-bold line-clamp-1">
                          {dataset.benchmark}
                        </span>
                      </div>
                    </div>

                    {/* Paper info */}
                    <div className="flex items-start">
                      <FileCheck className="w-4 h-4 text-sky-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block tracking-wider uppercase text-[9px]">
                          {lang === 'en' ? 'Type' : 'Tipe'}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
                          {dataset.paperRef}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleDownload(dataset.id)}
                      disabled={isDownloading}
                      className={`w-full py-3 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        isDownloaded 
                          ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{lang === 'en' ? 'Packaging Download...' : 'Menyiapkan Unduhan...'}</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{lang === 'en' ? 'Download Started' : 'Unduhan Dimulai'}</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>{lang === 'en' ? 'Request Dataset Access' : 'Minta Akses Dataset'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
