import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Compass, 
  Laptop, 
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Language } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface LaboratoryProps {
  lang: Language;
}

interface PCItem {
  id: string;
  room: 'room1' | 'room2';
  name: string;
  image: string;
  role: { en: string; id: string };
  specs: {
    gpu: string;
    cpu: string;
    ram: string;
    storage: string;
  };
}

interface LabGeneralContent {
  subtitle: { en: string; id: string };
  title: { en: string; id: string };
  desc: { en: string; id: string };
  room1: {
    name: { en: string; id: string };
    title: { en: string; id: string };
    desc: { en: string; id: string };
    image: string;
  };
  room2: {
    name: { en: string; id: string };
    title: { en: string; id: string };
    desc: { en: string; id: string };
    image: string;
  };
}

const DEFAULT_GENERAL_CONTENT: LabGeneralContent = {
  subtitle: {
    en: 'ENTERPRISE AI INFRASTRUCTURE',
    id: 'INFRASTRUKTUR AI PERUSAHAAN'
  },
  title: {
    en: 'Enterprise GPU Computing Lab',
    id: 'Lab Komputasi GPU Perusahaan'
  },
  desc: {
    en: 'Our center operates an enterprise-grade computing cluster driving parallel deep learning models for complex clinical testing across two dedicated rooms.',
    id: 'Pusat kami mengoperasikan kluster komputasi tingkat perusahaan yang menggerakkan model pembelajaran mendalam paralel untuk pengujian klinis kompleks di dua ruangan khusus.'
  },
  room1: {
    name: { en: 'Data & Communication Center', id: 'Pusat Data & Komunikasi' },
    title: { en: 'Data and Communication Center Room', id: 'Ruang Pusat Data dan Komunikasi' },
    desc: {
      en: 'The Data & Communication Center Room serves as the center for infrastructure management and data storage.',
      id: 'Ruang Pusat Data & Komunikasi berperan sebagai pusat pengelolaan infrastruktur dan penyimpanan data.'
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200'
  },
  room2: {
    name: { en: 'Lab Room 02', id: 'Ruang Lab 02' },
    title: { en: 'Lab Room 2: Edge Diagnostic & Simulation Room', id: 'Ruang Lab 2: Ruang Diagnostik Tepi & Simulasi' },
    desc: {
      en: 'Staging area built to mimic standard hospital clinics, equipped with physical diagnostic hardware and edge computers.',
      id: 'Area uji coba yang dibangun untuk meniru klinik rumah sakit standar, dilengkapi dengan perangkat diagnostik fisik dan komputer tepi.'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200'
  }
};

const DEFAULT_PCS: PCItem[] = [
  {
    id: 'dgx-h100',
    room: 'room1',
    name: 'NVIDIA DGX H100 Supercomputing Node',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
    role: { en: 'Primary Core Supercomputer', id: 'Superkomputer Inti Utama' },
    specs: {
      gpu: '4x NVIDIA H100 Tensor Core (80GB HBM3, SXM5)',
      cpu: 'Dual AMD EPYC 9654 (192 Cores, 384 Threads)',
      ram: '1.5 TB DDR5 ECC Server Memory',
      storage: '30.72 TB PCIe Gen5 Enterprise NVMe RAID-0',
    }
  },
  {
    id: 'node-beta',
    room: 'room1',
    name: 'AIMed Node-Beta Deep Learner',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=600',
    role: { en: 'Inference and Dataset Validation Server', id: 'Server Inferensi & Validasi Dataset' },
    specs: {
      gpu: '4x NVIDIA A100 Tensor Core (80GB PCIe Gen4)',
      cpu: 'AMD Ryzen Threadripper PRO 5995WX (64 Cores)',
      ram: '512 GB DDR4-3200 ECC Registered RAM',
      storage: '15.36 TB PCIe Gen4 NVMe U.2 Enterprise SSD',
    }
  },
  {
    id: 'node-gamma',
    room: 'room1',
    name: 'AIMed Node-Gamma Development Box',
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=600',
    role: { en: 'Prototyping & Medical Rendering Unit', id: 'Unit Prototipe & Rendering Medis' },
    specs: {
      gpu: '2x NVIDIA GeForce RTX 4090 (24GB GDDR6X, Custom Liquid-Cooled)',
      cpu: 'Intel Xeon W9-3495X (56 Cores, Max 4.8 GHz)',
      ram: '256 GB DDR5 4800MHz Quad-Channel RAM',
      storage: '8 TB (2x 4TB Gen5 SSD RAID-1 Mirroring)',
    }
  },
  {
    id: 'workstation-delta',
    room: 'room2',
    name: 'AIMed Workstation-Delta Diagnostic Host',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600',
    role: { en: 'Real-Time Inference Host Workstation', id: 'Workstation Host Inferensi Real-Time' },
    specs: {
      gpu: '1x NVIDIA RTX 4080 Super (16GB GDDR6X, Ada Lovelace)',
      cpu: 'Intel Core i9-14900K (24 Cores, Max 6.0 GHz)',
      ram: '128 GB DDR5 6000MHz Dual-Channel RAM',
      storage: '4 TB NVMe Gen4 High-Speed SSD',
    }
  },
  {
    id: 'node-epsilon',
    room: 'room2',
    name: 'AIMed Edge Jetson Sandbox (Orin Box)',
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&q=80&w=600',
    role: { en: 'Embedded Edge Sandbox Node', id: 'Node Sandbox Tepi Tertanam' },
    specs: {
      gpu: '2x NVIDIA Jetson AGX Orin Dev Kit (64GB Module, Ampere Architecture)',
      cpu: '12-core Arm Cortex-A78AE v8.2 64-bit CPU',
      ram: '64 GB 256-bit LPDDR5 Memory (204.8 GB/s bandwidth)',
      storage: '64 GB eMMC 5.1 + 1 TB M.2 NVMe SSD expansion',
    }
  }
];

export default function Laboratory({ lang }: LaboratoryProps) {
  const [selectedRoom, setSelectedRoom] = useState<'room1' | 'room2'>('room1');
  const [pcs, setPcs] = useState<PCItem[]>([]);
  const [generalContent, setGeneralContent] = useState<LabGeneralContent>(DEFAULT_GENERAL_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Load Content from Firestore or Fallback
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, 'cms_data', 'laboratory_content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.general) {
            setGeneralContent(data.general);
          }
          if (data.pcs && Array.isArray(data.pcs)) {
            const sanitized = data.pcs.map((pc: any) => ({
              id: pc.id,
              room: pc.room,
              name: pc.name,
              image: pc.image,
              role: pc.role,
              specs: {
                gpu: pc.specs?.gpu || '',
                cpu: pc.specs?.cpu || '',
                ram: pc.specs?.ram || '',
                storage: pc.specs?.storage || ''
              }
            }));
            setPcs(sanitized);
          } else {
            setPcs(DEFAULT_PCS);
          }
        } else {
          // Check local storage fallback
          const savedLocalPcs = localStorage.getItem('aimed_laboratory_pcs');
          const savedLocalGen = localStorage.getItem('aimed_laboratory_general');
          
          setPcs(savedLocalPcs ? JSON.parse(savedLocalPcs) : DEFAULT_PCS);
          setGeneralContent(savedLocalGen ? JSON.parse(savedLocalGen) : DEFAULT_GENERAL_CONTENT);
        }
      } catch (error) {
        console.error('Error loading Laboratory content from Firestore:', error);
        const savedLocalPcs = localStorage.getItem('aimed_laboratory_pcs');
        const savedLocalGen = localStorage.getItem('aimed_laboratory_general');
        
        setPcs(savedLocalPcs ? JSON.parse(savedLocalPcs) : DEFAULT_PCS);
        setGeneralContent(savedLocalGen ? JSON.parse(savedLocalGen) : DEFAULT_GENERAL_CONTENT);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Reset Carousel Index when switching rooms
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedRoom]);

  // Filter PCs for current room (Public view)
  const activePCs = pcs.filter(pc => pc.room === selectedRoom);

  // Carousel Navigation Helpers
  const handlePrev = () => {
    if (activePCs.length === 0) return;
    setCarouselIndex((prev) => (prev === 0 ? activePCs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (activePCs.length === 0) return;
    setCarouselIndex((prev) => (prev === activePCs.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="laboratory" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-4 py-1.5 rounded-full shadow-sm">
            {lang === 'en' ? generalContent.subtitle.en : generalContent.subtitle.id}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-5 mb-4">
            {lang === 'en' ? generalContent.title.en : generalContent.title.id}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-sky-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'en' ? generalContent.desc.en : generalContent.desc.id}
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 max-w-3xl mx-auto">
          <button
            onClick={() => { setSelectedRoom('room1'); }}
            className={`w-full sm:w-1/2 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start space-x-4 ${
              selectedRoom === 'room1'
                ? 'bg-gradient-to-br from-teal-500/10 to-sky-500/10 border-teal-500 dark:border-teal-400 shadow-lg ring-2 ring-teal-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className={`p-3 rounded-xl ${selectedRoom === 'room1' ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
              <Server className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider">
                {lang === 'en' ? generalContent.room1.name.en : generalContent.room1.name.id}
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                {lang === 'en' ? generalContent.room1.title.en : generalContent.room1.title.id}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {lang === 'en' ? generalContent.room1.desc.en : generalContent.room1.desc.id}
              </p>
            </div>
          </button>

          <button
            onClick={() => { setSelectedRoom('room2'); }}
            className={`w-full sm:w-1/2 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start space-x-4 ${
              selectedRoom === 'room2'
                ? 'bg-gradient-to-br from-teal-500/10 to-sky-500/10 border-teal-500 dark:border-teal-400 shadow-lg ring-2 ring-teal-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className={`p-3 rounded-xl ${selectedRoom === 'room2' ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-sky-600 dark:text-sky-400 tracking-wider">
                {lang === 'en' ? generalContent.room2.name.en : generalContent.room2.name.id}
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                {lang === 'en' ? generalContent.room2.title.en : generalContent.room2.title.id}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {lang === 'en' ? generalContent.room2.desc.en : generalContent.room2.desc.id}
              </p>
            </div>
          </button>
        </div>

        {/* Selected Room Details - Maximized Photo with overlay description */}
        <div className="w-full mb-20">
          <div className="relative overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-2xl group h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px]">
            <img
              src={selectedRoom === 'room1' ? generalContent.room1.image : generalContent.room2.image}
              alt={selectedRoom === 'room1' ? generalContent.room1.title.en : generalContent.room2.title.en}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
            />
            
            {/* Overlay Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent" />
            
            {/* Bottom Overlay Info box */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16 space-y-4">
              <span className="inline-block px-3 py-1 text-[10px] font-extrabold tracking-widest bg-teal-500 text-white rounded-lg uppercase shadow-sm">
                {selectedRoom === 'room1' ? 'ACTIVE INFRASTRUCTURE CORE' : 'EDGE TRIAL CLINIC'}
              </span>
              <h3 className="font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                {selectedRoom === 'room1' 
                  ? (lang === 'en' ? generalContent.room1.title.en : generalContent.room1.title.id) 
                  : (lang === 'en' ? generalContent.room2.title.en : generalContent.room2.title.id)}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-semibold">
                {selectedRoom === 'room1' 
                  ? (lang === 'en' ? generalContent.room1.desc.en : generalContent.room1.desc.id)
                  : (lang === 'en' ? generalContent.room2.desc.en : generalContent.room2.desc.id)}
              </p>
            </div>
          </div>
        </div>

        {/* PCs & Workstations Title */}
        <div className="space-y-8 mb-16">
          <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2 bg-indigo-500/10 rounded-xl">
              <Laptop className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? 'PCs & High-Performance Workstations' : 'PC & Workstation Berkinerja Tinggi'}
            </h3>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              <span className="text-sm font-semibold text-slate-400">
                {lang === 'en' ? 'Loading laboratory computer specs...' : 'Memuat spesifikasi komputer lab...'}
              </span>
            </div>
          ) : (
            /* --- PUBLIC VIEW: PREMIUM CAROUSEL LAYOUT --- */
            <div className="relative max-w-5xl mx-auto">
              {activePCs.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
                  <Laptop className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-400">
                    {lang === 'en' ? 'No PCs available in this room yet.' : 'Belum ada PC tersedia di ruangan ini.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Carousel Main Stage */}
                  <div className="glass-panel overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-2xl relative">
                    
                    {/* Active PC Wrapper */}
                    {activePCs.map((pc, idx) => {
                      if (idx !== carouselIndex) return null;
                      return (
                        <div key={pc.id} className="flex flex-col md:flex-row gap-8 p-6 sm:p-10 transition-opacity duration-300">
                          
                          {/* Left: Beautiful PC Showcase Photo Frame */}
                          <div className="md:w-5/12 flex flex-col justify-between space-y-4">
                            <div className="relative overflow-hidden rounded-2xl h-56 sm:h-72 shadow-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 flex items-center justify-center group">
                              {pc.image ? (
                                <img
                                  src={pc.image}
                                  alt={pc.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center text-center p-4">
                                  <Laptop className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-2" />
                                  <span className="text-xs text-slate-400">{lang === 'en' ? 'No Image' : 'Belum Ada Foto'}</span>
                                </div>
                              )}
                            </div>

                            {/* PC Metadata */}
                            <div className="space-y-1">
                              <span className="inline-block px-2.5 py-0.5 text-[8px] sm:text-[9px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 rounded-md uppercase">
                                {lang === 'en' ? pc.role.en : pc.role.id}
                              </span>
                              <h4 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight leading-snug">
                                {pc.name}
                              </h4>
                            </div>
                          </div>

                          {/* Right: Technical Specifications Sheet */}
                          <div className="md:w-7/12 flex flex-col justify-between bg-slate-500/5 dark:bg-slate-950/20 p-5 sm:p-8 rounded-2xl border border-black/5 dark:border-white/5">
                            <div className="space-y-6">
                              <div className="flex items-center space-x-2 pb-3 border-b border-black/5 dark:border-white/5">
                                <Laptop className="w-4 h-4 text-indigo-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  {lang === 'en' ? 'Technical Specifications' : 'Spesifikasi Teknis'}
                                </span>
                              </div>

                              {/* Specs Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                <div className="p-3 bg-white dark:bg-slate-900/40 rounded-xl border border-black/[0.02] dark:border-white/[0.02] space-y-1">
                                  <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 block uppercase tracking-wider">GPU / Graphics</span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-normal">{pc.specs?.gpu || '-'}</p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900/40 rounded-xl border border-black/[0.02] dark:border-white/[0.02] space-y-1">
                                  <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider">Processor (CPU)</span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-normal">{pc.specs?.cpu || '-'}</p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900/40 rounded-xl border border-black/[0.02] dark:border-white/[0.02] space-y-1">
                                  <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 block uppercase tracking-wider">Memory (RAM)</span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-normal">{pc.specs?.ram || '-'}</p>
                                </div>

                                <div className="p-3 bg-white dark:bg-slate-900/40 rounded-xl border border-black/[0.02] dark:border-white/[0.02] space-y-1">
                                  <span className="text-[10px] font-extrabold text-sky-600 dark:text-sky-400 block uppercase tracking-wider">Storage Capacity</span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-normal">{pc.specs?.storage || '-'}</p>
                                </div>

                              </div>
                            </div>

                            {/* Node indicator / index tracker */}
                            <div className="pt-6 flex justify-between items-center text-[10px] font-black text-slate-400 tracking-wider border-t border-black/5 dark:border-white/5 mt-6 sm:mt-0">
                              <span>NODE ID: {pc.id.toUpperCase()}</span>
                              <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md">
                                {carouselIndex + 1} OF {activePCs.length}
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4">
                      <button
                        onClick={handlePrev}
                        className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:scale-105 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg cursor-pointer flex items-center justify-center"
                        aria-label="Previous Computer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4">
                      <button
                        onClick={handleNext}
                        className="p-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:scale-105 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg cursor-pointer flex items-center justify-center"
                        aria-label="Next Computer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                  </div>

                  {/* Indicators / Dot Selectors under Carousel */}
                  <div className="flex justify-center items-center gap-2.5 mt-6">
                    {activePCs.map((pc, idx) => (
                      <button
                        key={pc.id}
                        onClick={() => setCarouselIndex(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === carouselIndex 
                            ? 'w-7 h-2 bg-indigo-500' 
                            : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                        title={pc.name}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
