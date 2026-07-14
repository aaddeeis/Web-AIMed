import React, { useState } from 'react';
import { 
  Activity, 
  Eye, 
  FileText, 
  HeartPulse, 
  LineChart, 
  Cpu, 
  ShieldAlert, 
  Video, 
  Signal, 
  Settings, 
  Layers, 
  Compass, 
  User, 
  BookOpen, 
  X 
} from 'lucide-react';
import { Language, ResearchGroup } from '../types';
import { useData } from '../context/DataContext';

interface ResearchGroupsProps {
  lang: Language;
}

interface ResearchAreaItem {
  id: string;
  title: { en: string; id: string };
  icon: React.ComponentType<any>;
  image: string;
  desc: {
    en: string;
    id: string;
  };
  details: {
    en: string;
    id: string;
    activeProjects: string[];
    papers: string[];
  };
}

export default function ResearchGroups({ lang }: ResearchGroupsProps) {
  const { researchGroups } = useData();
  const [selectedArea, setSelectedArea] = useState<ResearchAreaItem | null>(null);

  const researchAreas: ResearchAreaItem[] = [
    {
      id: 'img-enhancement',
      title: { en: 'Medical Image Enhancement', id: 'Penyempurnaan Citra Medis' },
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Noise reduction, deblurring, and image reconstruction of low-contrast abdominal ultrasound and CT scans.',
        id: 'Pengurangan noise, deblurring, dan rekonstruksi citra dari ultrasound perut dan pemindaian CT kontras rendah.'
      },
      details: {
        en: 'Our enhancement systems focus on reducing ultrasonic speckle noise using Cycle-Consistent Adversarial Generative networks without losing fine tissue borders.',
        id: 'Sistem peningkatan kami berfokus pada pengurangan ultrasonic speckle noise menggunakan jaringan Cycle-Consistent Adversarial Generative tanpa kehilangan batas jaringan yang halus.',
        activeProjects: ['Ultrasound Denoising AI Platform', 'MRI Super-Resolution Reconstruction'],
        papers: ['Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression (2025)']
      }
    },
    {
      id: 'img-analysis',
      title: { en: 'Medical Image Analysis', id: 'Analisis Citra Medis' },
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Volumetric organ segmentation, tissue quantification, and automatic measurement of anatomical landmarks.',
        id: 'Segmentasi organ volumetrik, kuantifikasi jaringan, dan pengukuran otomatis marka anatomi.'
      },
      details: {
        en: 'We develop multi-task segmentation architectures to map anatomical systems, enabling physicians to monitor tumor boundaries and cardiac chamber dimensions.',
        id: 'Kami mengembangkan arsitektur segmentasi multi-tugas untuk memetakan sistem anatomi, memungkinkan dokter memantau batas tumor dan dimensi ruang jantung.',
        activeProjects: ['Fetal Echocardiography Chamber Segmenter', 'Glaucoma Retinal Layer Tracker'],
        papers: ['Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography (2025)']
      }
    },
    {
      id: 'comp-vision-health',
      title: { en: 'Computer Vision', id: 'Visi Komputer' },
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Real-time camera tracking, facial palsy detection, and surgical workflow monitoring.',
        id: 'Pelacakan kamera real-time, deteksi kelumpuhan wajah, dan pemantauan alur kerja bedah.'
      },
      details: {
        en: 'By analyzing subtle structural motion, our computer vision models assess motor nerve impairment and provide surgical tool position feedbacks to operating assistants.',
        id: 'Dengan menganalisis gerakan struktural yang halus, model visi komputer kami menilai gangguan saraf motorik dan memberikan umpan balik posisi alat bedah kepada asisten operasi.',
        activeProjects: ['Intelligent Surgical Navigation Tool', 'Facial Nerve Paralysis Tracker'],
        papers: ['Cervical Cancer Lesion Detection using Edge-Cloud Collaborative Deep Models (2024)']
      }
    },
    {
      id: 'deep-learning-core',
      title: { en: 'Deep Learning', id: 'Deep Learning' },
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Training customized transformers and attention networks for highly accurate medical spatial detection.',
        id: 'Melatih transformer kustom dan jaringan perhatian untuk deteksi spasial medis yang sangat akurat.'
      },
      details: {
        en: 'Our primary research focuses on optimizing neural weights under sparse and highly unbalanced medical datasets, leveraging hybrid spatial attention blocks.',
        id: 'Penelitian utama kami berfokus pada pengoptimalan bobot saraf di bawah dataset medis yang jarang dan sangat tidak seimbang, memanfaatkan blok perhatian spasial hibrida.',
        activeProjects: ['Swin-Transformer Medical Backends', 'Attention-Guided U-Net Customizers'],
        papers: ['Deep Multi-Attention U-Net for Chamber Segmentation (2025)']
      }
    },
    {
      id: 'machine-learning-core',
      title: { en: 'Machine Learning', id: 'Machine Learning' },
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Active learning and federated training frameworks for multi-hospital privacy compliance.',
        id: 'Kerangka kerja pembelajaran aktif dan pelatihan federasi untuk kepatuhan privasi multi-rumah sakit.'
      },
      details: {
        en: 'We build privacy-preserving machine learning frameworks where neural weight training is shared across hospitals, keeping local clinical data completely secure.',
        id: 'Kami membangun kerangka kerja pembelajaran mesin yang menjaga privasi di mana pelatihan bobot saraf dibagikan di berbagai rumah sakit, menjaga data klinis lokal tetap aman.',
        activeProjects: ['Federated Medical Ledger', 'Semi-Supervised Active Annotator'],
        papers: ['Cervical Cancer Lesion Detection using Collaborative Edge-Cloud Models (2024)']
      }
    },
    {
      id: 'explainable-ai-core',
      title: { en: 'Explainable AI', id: 'Kecerdasan Buatan Terjelaskan' },
      icon: FileText,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Generating pixel-level neural attention maps and Grad-CAM layers to verify diagnostic confidence.',
        id: 'Menghasilkan peta perhatian saraf tingkat piksel dan lapisan Grad-CAM untuk memverifikasi kepercayaan diagnostik.'
      },
      details: {
        en: 'We address the clinical "black box" dilemma by developing attribution overlays and Layer-wise Relevance Propagation, tracing output nodes directly back to raw scans.',
        id: 'Kami mengatasi dilema "kotak hitam" klinis dengan mengembangkan overlay atribusi dan Layer-wise Relevance Propagation, melacak simpul keluaran langsung kembali ke pemindaian mentah.',
        activeProjects: ['Clinical Grad-CAM Dashboard Widget', 'Interactive Model Feature Auditor'],
        papers: ['Explainable AI Pathways in Tropical Disease Radiographs using LRP (2023)']
      }
    },
    {
      id: 'ultrasound-ai',
      title: { en: 'Ultrasound AI', id: 'Ultrasound AI' },
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Pioneering intelligent obstetric ultrasound screening for congenital cardiac heart diseases.',
        id: 'Merintis skrining ultrasonografi obstetrik cerdas untuk penyakit jantung bawaan.'
      },
      details: {
        en: 'Ultrasound AI is our leading research division. We specialize in automated cardiac axis alignment, plane extraction, and septal defect localized tagging.',
        id: 'Ultrasound AI adalah divisi penelitian terkemuka kami. Kami berspesialisasi dalam penyelarasan sumbu jantung otomatis, ekstraksi bidang, dan penandaan terlokalisasi cacat septum.',
        activeProjects: ['CHDxAI Fetal Diagnostic Suite', 'Cardiac Cycle Gating Pipeline'],
        papers: ['Deep Multi-Attention U-Net for Chamber Segmentation (2025)']
      }
    },
    {
      id: 'disease-detection',
      title: { en: 'Disease Detection', id: 'Deteksi Penyakit' },
      icon: ShieldAlert,
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Early cervical and tropical disease screening suites engineered for rural clinics.',
        id: 'Rangkaian skrining penyakit serviks dan tropis dini yang dirancang untuk klinik pedesaan.'
      },
      details: {
        en: 'We target diseases with severe public health impacts in tropical regions, using computer vision to detect acetowhite lesions, tuberculosis scars, and malaria biomarkers.',
        id: 'Kami menargetkan penyakit dengan dampak kesehatan masyarakat yang parah di wilayah tropis, menggunakan visi komputer untuk mendeteksi lesi asetowhite, bekas luka tuberkulosis, dan biomarker malaria.',
        activeProjects: ['TeleOTIVA Cervical Cancer Screening Mobile App', 'Tropical Radiograph Diagnostics Hub'],
        papers: ['Cervical Cancer Lesion Detection on Visual Inspection Images (2024)']
      }
    },
    {
      id: 'video-analysis',
      title: { en: 'Medical Video Analysis', id: 'Analisis Video Medis' },
      icon: Video,
      image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Temporal sequence tracking of cardiac cycles and laparoscopic surgical streams.',
        id: 'Pelacakan urutan temporal siklus jantung dan aliran bedah laparoskopi.'
      },
      details: {
        en: 'We utilize LSTM, GRU, and 3D Convolutional layers to analyze multi-frame videos, capturing anatomical mechanics over time to evaluate blood ejection fractions.',
        id: 'Kami menggunakan lapisan LSTM, GRU, dan Konvolusi 3D untuk menganalisis video multi-bingkai, menangkap mekanika anatomi dari waktu ke waktu untuk mengevaluasi fraksi ejeksi darah.',
        activeProjects: ['Cardiac Valve Cycle Phase Tracker', 'Laparoscopic Action Sequence Identifier'],
        papers: ['Deep Multi-Attention U-Net for Chamber Segmentation in Ultrasound (2025)']
      }
    },
    {
      id: 'signal-processing',
      title: { en: 'Biomedical Signal Processing', id: 'Pemrosesan Sinyal Biomedis' },
      icon: Signal,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Spectral analysis and deep denoising of continuous ECG waveforms and EEG brain signals.',
        id: 'Analisis spektral dan deep denoising dari bentuk gelombang ECG kontinu dan sinyal otak EEG.'
      },
      details: {
        en: 'By processing 12-lead ECG signals with convolutional network backends, we isolate early markers of ischemic cardiac diseases prior to clinical symptom presentation.',
        id: 'Dengan memproses sinyal ECG 12-lead dengan backend jaringan konvolusional, kami mengisolasi penanda awal penyakit jantung iskemik sebelum presentasi gejala klinis.',
        activeProjects: ['12-lead Smart ECG Monitor', 'Neurological EEG Artifact Filter'],
        papers: ['Dual-Discriminator Generative Adversarial Networks for Signal Suppression (2025)']
      }
    },
    {
      id: 'health-analytics-feat',
      title: { en: 'Healthcare Analytics', id: 'Analisis Kesehatan' },
      icon: LineChart,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Predictive readmission models and epidemiological trajectory forecasts in regional health networks.',
        id: 'Model pematuhan masuk kembali prediktif dan prakiraan lintasan epidemi di jaringan kesehatan regional.'
      },
      details: {
        en: 'We analyze Electronic Health Records (EHR) using graph neural networks to predict clinical bottlenecks, patient readmission risks, and dengue fever epidemic directions.',
        id: 'Kami menganalisis Rekam Medis Elektronik (EHR) menggunakan jaringan saraf graf untuk memprediksi kemacetan klinis, risiko masuk kembali pasien, dan arah epidemi demam berdarah.',
        activeProjects: ['Regional Dengue Forecast Registry', 'EHR Patient Flow Neural Optimizer'],
        papers: ['Explainable AI Pathways in Tropical Disease Radiographs (2023)']
      }
    },
    {
      id: 'digital-health',
      title: { en: 'Digital Health', id: 'Kesehatan Digital' },
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
      desc: {
        en: 'Deploying cloud diagnostic platforms connecting regional Puskesmas directly to elite medical hubs.',
        id: 'Menerapkan platform diagnostik cloud yang menghubungkan Puskesmas daerah secara langsung ke pusat medis elit.'
      },
      details: {
        en: 'Through telehealth portals, we link local doctors with high-fidelity server diagnostics, delivering specialist-grade evaluation in moments to remote patients.',
        id: 'Melalui portal telehealth, kami menghubungkan dokter setempat dengan diagnostik server fidelitas tinggi, memberikan evaluasi tingkat spesialis dalam hitungan detik kepada pasien jarak jauh.',
        activeProjects: ['TeleOTIVA Regional Cervical Health Network', 'Ultrasound Cloud Assist Teleconsultant'],
        papers: ['Cervical Cancer Lesion Detection on Visual Inspection Images using Edge-Cloud Models (2024)']
      }
    }
  ];

  return (
    <section id="research" className="py-24 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {lang === 'en' ? 'Core Research Groups' : 'Grup Riset Utama'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'en' 
              ? 'Our research center is organized into specialized divisions advancing the frontiers of computational clinical medicine.'
              : 'Pusat penelitian kami diorganisasikan ke dalam divisi khusus yang memajukan batas-batas kedokteran klinis komputasional.'}
          </p>
        </div>

        {/* 1. Core Research Groups Tabulated display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24" id="research-groups-grid">
          {researchGroups.map((group) => {
            return (
              <div 
                key={group.id}
                className="glass-card p-8 rounded-2xl shadow-sm hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3.5 mb-6">
                  <div className="p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                      {lang === 'en' ? group.name.en : group.name.id}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-1">
                      Lead: {group.lead}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {lang === 'en' ? group.description.en : group.description.id}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {group.keywords.map((kw, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Featured Research (The 12 premium cards grid) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {lang === 'en' ? 'Featured Research Areas' : 'Bidang Penelitian Unggulan'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'en' 
              ? 'Click "Read More" on any research area card to view clinical trial details, active papers, and projects.'
              : 'Klik "Baca Selengkapnya" pada kartu bidang penelitian untuk melihat detail uji klinis, makalah, dan proyek aktif.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="featured-areas-grid">
          {researchAreas.map((area) => {
            const AreaIcon = area.icon;
            return (
              <div 
                key={area.id}
                className="group relative glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Thumbnail image with dark gradient mask */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={area.title.en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Absolute positioning Icon */}
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-lg text-white">
                    <AreaIcon className="w-5 h-5" />
                  </div>

                  {/* Absolute title */}
                  <h4 className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm tracking-tight leading-tight">
                    {lang === 'en' ? area.title.en : area.title.id}
                  </h4>
                </div>

                {/* Short Description */}
                <div className="p-5 flex-grow flex flex-col justify-between items-start">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {lang === 'en' ? area.desc.en : area.desc.id}
                  </p>

                  <button
                    onClick={() => setSelectedArea(area)}
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Read More' : 'Baca Selengkapnya'}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Expansion Slide-Over/Modal Drawer details */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-white/80 dark:bg-slate-950/80 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 backdrop-blur-xl animate-in zoom-in-95 duration-200">
            {/* Image Header banner */}
            <div className="relative h-48">
              <img 
                src={selectedArea.image} 
                alt={selectedArea.title.en} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <button 
                onClick={() => setSelectedArea(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2 py-1 rounded">
                  {lang === 'en' ? 'RESEARCH DOMAIN' : 'DOMAIN PENELITIAN'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-2">
                  {lang === 'en' ? selectedArea.title.en : selectedArea.title.id}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-2">
                  {lang === 'en' ? 'Overview' : 'Ikhtisar'}
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'en' ? selectedArea.details.en : selectedArea.details.id}
                </p>
              </div>

              {/* Active Projects */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-teal-500" />
                  <span>{lang === 'en' ? 'Active Projects' : 'Proyek Aktif'}</span>
                </h5>
                <ul className="space-y-2">
                  {selectedArea.details.activeProjects.map((proj, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                      <span className="font-medium">{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Active Publications */}
              <div>
                <h5 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>{lang === 'en' ? 'Highlighted Publication' : 'Publikasi Unggulan'}</span>
                </h5>
                <ul className="space-y-2">
                  {selectedArea.details.papers.map((paper, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300 bg-black/5 dark:bg-white/[0.03] p-3 rounded-xl border border-black/5 dark:border-white/5">
                      <span className="font-semibold text-sky-600 dark:text-sky-400">{paper}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 text-right">
              <button
                onClick={() => setSelectedArea(null)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl hover:scale-105 active:scale-95 transition-transform"
              >
                {lang === 'en' ? 'Close Window' : 'Tutup Jendela'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
