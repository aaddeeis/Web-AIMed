import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Compass, 
  ExternalLink, 
  Activity,
  Check,
  X
} from 'lucide-react';
import { Language } from '../types';

interface CollaborationMapProps {
  lang: Language;
}

interface CollabNode {
  id: string;
  country: string;
  xPct: number; // coordinates mapped to fit standard display
  yPct: number;
  institution: string;
  focus: {
    en: string;
    id: string;
  };
  details: {
    en: string;
    id: string;
  };
}

export default function CollaborationMap({ lang }: CollaborationMapProps) {
  const [selectedCollab, setSelectedCollab] = useState<CollabNode | null>(null);

  const collaborations: CollabNode[] = [
    {
      id: 'id-unri',
      country: 'Indonesia (Host)',
      xPct: 75,
      yPct: 68,
      institution: 'Universitas Sriwijaya / RSMH Palembang',
      focus: {
        en: 'Clinical Trial Site and Fetal Ultrasound Screening Core',
        id: 'Pusat Uji Klinis dan Skrining Ultrasound Janin'
      },
      details: {
        en: 'Deploying deep learning edge diagnostic algorithms on site inside obstetric screening rooms at RSMH Palembang.',
        id: 'Menerapkan algoritma diagnostik edge deep learning secara langsung di ruang pemeriksaan kebidanan di RSMH Palembang.'
      }
    },
    {
      id: 'aus-uq',
      country: 'Australia',
      xPct: 82,
      yPct: 76,
      institution: 'University of Queensland',
      focus: {
        en: 'Super-Resolution Acoustic Image Reconstruction',
        id: 'Rekonstruksi Citra Akustik Resolusi Super'
      },
      details: {
        en: 'Joint fellowship examining generative noise reduction layers on low-contrast liver scans.',
        id: 'Beasiswa bersama yang menguji lapisan pengurangan kebisingan generatif pada pemindaian hati kontras rendah.'
      }
    },
    {
      id: 'my-um',
      country: 'Malaysia',
      xPct: 71,
      yPct: 62,
      institution: 'Universiti Malaya',
      focus: {
        en: 'Tropical Disease Deep Radiograph Classification',
        id: 'Klasifikasi Radiograf Mendalam Penyakit Tropis'
      },
      details: {
        en: 'Training robust active-learning models to screen dengue pleural effusion patterns on sparse clinics data.',
        id: 'Melatih model active-learning yang kokoh untuk menyaring pola efusi pleura demam berdarah pada data klinik yang jarang.'
      }
    },
    {
      id: 'us-stan',
      country: 'United States',
      xPct: 22,
      yPct: 38,
      institution: 'Stanford Medical Center',
      focus: {
        en: 'Explainable AI Clinical Attribution Models',
        id: 'Model Atribusi Klinis AI Terjelaskan'
      },
      details: {
        en: 'Sharing benchmark dataset layers and assessing Layer-wise Relevance Propagation against expert diagnostic confidence.',
        id: 'Berbagi lapisan dataset tolok ukur dan menilai Layer-wise Relevance Propagation terhadap kepercayaan diagnostik ahli.'
      }
    },
    {
      id: 'tw-ntu',
      country: 'Taiwan',
      xPct: 76,
      yPct: 48,
      institution: 'National Taiwan University',
      focus: {
        en: 'CHDxAI Cardiac Chamber Sequence Tracking',
        id: 'Pelacakan Urutan Ruang Jantung CHDxAI'
      },
      details: {
        en: 'Designing high-frequency obstetric temporal networks to trace ventricular volume metrics over operating video feeds.',
        id: 'Merancang jaringan temporal obstetrik frekuensi tinggi untuk melacak metrik volume ventrikel pada umpan video operasi.'
      }
    },
    {
      id: 'jp-nag',
      country: 'Japan',
      xPct: 79,
      yPct: 40,
      institution: 'Nagoya University',
      focus: {
        en: 'Fetal Echocardiography Multi-Attention Networks',
        id: 'Jaringan Multi-Attention Ekokardiografi Janin'
      },
      details: {
        en: 'Exchanging researchers to build hybrid Swin-Transformers capable of detecting congenital septal defects.',
        id: 'Pertukaran peneliti untuk membangun Swin-Transformers hibrida yang mampu mendeteksi cacat septum bawaan.'
      }
    }
  ];

  return (
    <section id="collaborations" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'GLOBAL RESEARCH NETWORK' : 'JEJARING RISET GLOBAL'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'International Collaborations' : 'Kolaborasi Internasional'}
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Click the pulsing network nodes across our global projection grid to explore joint clinical investigations and allied institutions.'
              : 'Klik simpul jaringan yang berdenyut di peta proyeksi global kami untuk menjelajahi investigasi klinis bersama dan institusi sekutu.'}
          </p>
        </div>

        {/* Dynamic Vector Projection Map Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive mapped region (8 columns) */}
          <div className="lg:col-span-8 glass-panel p-4 sm:p-6 relative overflow-hidden min-h-[320px] sm:min-h-[460px]">
            {/* World outline simulated backing grids lines */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            {/* Custom high-tech abstract continent shapes plotted as SVG paths for visual stunning */}
            <svg viewBox="0 0 1000 500" className="w-full h-full opacity-35 dark:opacity-15 pointer-events-none fill-slate-400 dark:fill-slate-600">
              {/* North America */}
              <path d="M 50 150 Q 80 120 120 110 T 220 140 T 300 120 T 320 220 T 150 280 Z" />
              {/* South America */}
              <path d="M 180 290 Q 220 310 240 380 T 220 480 T 180 390 Z" />
              {/* Eurasia / Africa */}
              <path d="M 450 100 Q 520 80 650 90 T 780 110 T 820 200 T 750 280 T 600 240 Z" />
              <path d="M 450 150 Q 480 220 520 280 T 510 400 T 420 300 Z" />
              {/* Australia */}
              <path d="M 750 340 Q 820 330 850 380 T 780 430 Z" />
            </svg>

            {/* Pulsing Nodes overlays */}
            {collaborations.map((collab) => {
              const isSelected = selectedCollab?.id === collab.id;

              return (
                <button
                  key={collab.id}
                  onClick={() => setSelectedCollab(collab)}
                  className="absolute group z-20"
                  style={{ left: `${collab.xPct}%`, top: `${collab.yPct}%` }}
                >
                  <span className="relative flex h-4 w-4">
                    {/* Ring ripple animation */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    {/* Core bullet */}
                    <span className={`relative inline-flex rounded-full h-4 w-4 shadow-md transition-colors ${
                      isSelected ? 'bg-sky-500' : 'bg-teal-500'
                    }`}>
                      <MapPin className="w-2.5 h-2.5 text-white m-auto" />
                    </span>
                  </span>

                  {/* Tiny floating tooltip on hover */}
                  <span className="absolute left-1/2 -translate-x-1/2 -top-10 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded transition-all whitespace-nowrap shadow-md pointer-events-none">
                    {collab.institution}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Allied Institution detailed cards (4 columns) */}
          <div className="lg:col-span-4">
            {selectedCollab ? (
              <div className="glass-card p-6 rounded-3xl space-y-5 animate-in fade-in slide-in-from-right-3 duration-250">
                <div className="flex justify-between items-start pb-4 border-b border-black/5 dark:border-white/10">
                  <div>
                    <span className="text-[9px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded">
                      {selectedCollab.country}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-2 leading-tight">
                      {selectedCollab.institution}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCollab(null)}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Joint focus */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                      {lang === 'en' ? 'Joint Focus Area' : 'Area Fokus Bersama'}
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-bold leading-snug">
                      {lang === 'en' ? selectedCollab.focus.en : selectedCollab.focus.id}
                    </p>
                  </div>

                  {/* Investigation detail */}
                  <div className="space-y-1 p-4 bg-black/5 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-xl">
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                      {lang === 'en' ? 'Investigation Summary' : 'Ringkasan Investigasi'}
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {lang === 'en' ? selectedCollab.details.en : selectedCollab.details.id}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-end space-x-1">
                    <Activity className="w-3.5 h-3.5 text-teal-500 animate-pulse" />
                    <span>{lang === 'en' ? 'Active Collaboration' : 'Kolaborasi Aktif'}</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="glass-card border-dashed p-8 rounded-3xl text-center space-y-4">
                <div className="p-4 bg-black/5 dark:bg-white/[0.04] text-slate-400 rounded-full inline-block">
                  <Globe className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {lang === 'en' ? 'Select Pulse Node' : 'Pilih Simpul Jaringan'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-[200px] mx-auto">
                    {lang === 'en' 
                      ? 'Select any pulsing coordinates on the map projection grid to view joint research details.' 
                      : 'Pilih koordinat berdenyut pada kisi proyeksi peta untuk melihat detail riset bersama.'}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
