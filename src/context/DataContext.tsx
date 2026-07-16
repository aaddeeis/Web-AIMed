import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Publication, 
  Researcher, 
  ResearchGroup, 
  Dataset, 
  ShowcaseProject, 
  NewsItem, 
  EventItem, 
  Collaboration, 
  TimelineProject,
  Partner,
  SDGContent,
  ConferenceOrganized,
  JournalOrganized,
  Promotion
} from '../types';
import { 
  RESEARCH_GROUPS as initialResearchGroups,
  SHOWCASE_PROJECTS as initialShowcaseProjects,
  DATASETS as initialDatasets,
  NEWS as initialNews,
  EVENTS as initialEvents,
  PARTNERS as initialPartners,
  SDG_CONTENT as initialSdgContent,
  CONFERENCES_ORGANIZED as initialConferencesOrganized,
  JOURNALS_ORGANIZED as initialJournalsOrganized,
  PROMOTIONS as initialPromotions,
} from '../data/mockData';


// Re-define Person interface matching Researchers.tsx
export interface Person {
  id: string;
  name: string;
  role: { en: string; id: string };
  email?: string;
  image?: string;
  institution?: { en: string; id: string };
  topic?: { en: string; id: string };
  supervisor?: string;
  interests?: { en: string[]; id: string[] };
  researchFocus?: { en: string; id: string };
  scholar?: string;
  scopus?: string;
  orcid?: string;
  currentProjects?: string[];
  latestPublications?: string[];
}

export interface PublicationsData {
  journals: any[];
  conferences: any[];
  ipr: any[];
  books: any[];
}

interface DataContextType {
  researchGroups: ResearchGroup[];
  showcaseProjects: ShowcaseProject[];
  publicationsData: PublicationsData;
  datasets: Dataset[];
  news: NewsItem[];
  events: EventItem[];
  leadership: Person[];
  assistants: Person[];
  members: Person[];
  collaborators: Person[];
  postgraduate: Person[];
  graduate: Person[];
  undergraduate: Person[];
  youtubeVideos: any[];
  instagramPosts: any[];
  massMedia: any[];
  partners: Partner[];
  sdgContent: SDGContent;
  conferencesOrganized: ConferenceOrganized[];
  journalsOrganized: JournalOrganized[];
  promotions: Promotion[];

  // Setters
  setResearchGroups: React.Dispatch<React.SetStateAction<ResearchGroup[]>>;
  setShowcaseProjects: React.Dispatch<React.SetStateAction<ShowcaseProject[]>>;
  setPublicationsData: React.Dispatch<React.SetStateAction<PublicationsData>>;
  setDatasets: React.Dispatch<React.SetStateAction<Dataset[]>>;
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  setLeadership: React.Dispatch<React.SetStateAction<Person[]>>;
  setAssistants: React.Dispatch<React.SetStateAction<Person[]>>;
  setMembers: React.Dispatch<React.SetStateAction<Person[]>>;
  setCollaborators: React.Dispatch<React.SetStateAction<Person[]>>;
  setPostgraduate: React.Dispatch<React.SetStateAction<Person[]>>;
  setGraduate: React.Dispatch<React.SetStateAction<Person[]>>;
  setUndergraduate: React.Dispatch<React.SetStateAction<Person[]>>;
  setYoutubeVideos: React.Dispatch<React.SetStateAction<any[]>>;
  setInstagramPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setMassMedia: React.Dispatch<React.SetStateAction<any[]>>;
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  setSdgContent: React.Dispatch<React.SetStateAction<SDGContent>>;
  setConferencesOrganized: React.Dispatch<React.SetStateAction<ConferenceOrganized[]>>;
  setJournalsOrganized: React.Dispatch<React.SetStateAction<JournalOrganized[]>>;
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;

  // Actions
  resetToDefault: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  saveToServer: () => Promise<{ success: boolean; error?: string; githubSync?: { enabled: boolean; success?: boolean; message?: string; error?: string } }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Core default data from PerformanceSection.tsx
const defaultPublicationsData: PublicationsData = {
  journals: [
    {
      id: 'j-1',
      title: 'Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound',
      authors: 'Samsuryadi, S., Putra, P., Pratama, A. R., & Takahashi, M.',
      journal: 'Biomedical Signal Processing and Control',
      details: 'Elsevier, Vol. 94, Article 105432',
      year: 2025,
      doi: '10.1016/j.bspc.2025.105432'
    },
    {
      id: 'j-2',
      title: 'Cervical Cancer Lesion Detection on Visual Inspection Images with Acetic Acid using Edge-Cloud Collaborative Deep Models',
      authors: 'Sukemi, S., Fachrurrozi, M., Yusliani, N., & O’Connor, J.',
      journal: 'IEEE Access',
      details: 'IEEE, Vol. 12, pp. 55410-55425',
      year: 2024,
      doi: '10.1109/ACCESS.2024.3392812'
    },
    {
      id: 'j-3',
      title: 'Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression and Edge Sharpening',
      authors: 'Putra, P., Samsuryadi, S., & Rosana, L.',
      journal: 'International Journal of Computer Assisted Radiology and Surgery',
      details: 'Springer, pp. 1-14',
      year: 2025,
      doi: '10.1007/s11548-025-03102-1'
    },
    {
      id: 'j-4',
      title: 'Explainable AI Pathways in Tropical Disease Radiographs using Grad-CAM and Layer-wise Relevance Propagation',
      authors: 'Fachrurrozi, M., Yusliani, N., & Widjaja, H.',
      journal: 'Journal of Digital Imaging',
      details: 'Springer, Vol. 36, No. 4, pp. 811-824',
      year: 2023,
      doi: '10.1007/s10278-023-00812-y'
    }
  ],
  conferences: [
    {
      id: 'c-1',
      title: 'Real-Time Edge-Inference Yolov8 for VIA Cervicography Screening in Rural South Sumatra',
      authors: 'Pratama, M. R., Sukemi, S., & Yusliani, N.',
      conference: 'IEEE International Conference on Bioinformatics and Biomedicine (BIBM)',
      details: 'Seoul, South Korea, pp. 1420-1425',
      year: 2024,
      doi: '10.1109/BIBM6234.2024'
    },
    {
      id: 'c-2',
      title: 'Multi-Probe Frequency Calibration using Cycle-Consistent Adversarial Loss in Medical Ultrasound',
      authors: 'Rosana, L., Putra, P., & Samsuryadi, S.',
      conference: 'International Conference on Medical Image Computing and Computer-Assisted Intervention (MICCAI)',
      details: 'Milan, Italy, LNCS Vol. 14892, pp. 45-54',
      year: 2025,
      doi: '10.1007/978-3-031-7230-2'
    }
  ],
  ipr: [
    {
      id: 'ipr-1',
      title: 'CHDxAI: Program Komputer Segmentasi Jantung Janin Berbasis Deep Multi-Attention U-Net',
      type: 'Hak Cipta (Computer Program)',
      regNo: 'EC00202508112',
      date: 'February 12, 2025',
      holder: 'Universitas Sriwijaya'
    },
    {
      id: 'ipr-2',
      title: 'TeleOTIVA: Sistem Aplikasi Seluler Diagnostik Kanker Serviks Metode IVA Terdistribusi',
      type: 'Paten Sederhana (Simple Patent)',
      regNo: 'S00202409412 (Pending)',
      date: 'October 05, 2024',
      holder: 'Samsuryadi, Sukemi, Muhammad Fachrurrozi'
    }
  ],
  books: [
    {
      id: 'b-1',
      title: 'Pengolahan Citra Medis Berbasis Kecerdasan Buatan: Teori dan Aplikasi Praktis',
      authors: 'Samsuryadi, S., & Putra, P.',
      publisher: 'Unsri Press',
      year: 2024,
      pages: '284 pages',
      desc: 'Buku referensi lengkap mengenai dasar-dasar Deep Learning untuk segmentasi organ dan deteksi lesi klinis, ditujukan bagi mahasiswa pascasarjana dan peneliti teknik biomedis.'
    }
  ]
};

const defaultLeadership: Person[] = [
  {
    id: 'samsuryadi',
    name: 'Prof. Dr. Ir. Samsuryadi, M.T.',
    role: {
      en: 'Chairperson / Ketua AIMed CoE',
      id: 'Ketua / Chairperson AIMed CoE'
    },
    email: 'samsuryadi@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=Yl6eE7kAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=36611417500',
    orcid: 'https://orcid.org/0000-0002-3631-0162',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Medical Image Analysis', 'Deep Learning Architecture', 'Pattern Recognition'],
      id: ['Analisis Citra Medis', 'Arsitektur Deep Learning', 'Pengenalan Pola']
    },
    currentProjects: [
      'Indonesian National Fetal Heart Screening AI Registry (Funding: BRIN)',
      'International Collaborative US Speckle Suppression Framework (with Tohoku University)'
    ],
    latestPublications: [
      'Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound (2025)',
      'Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression (2025)'
    ]
  },
  {
    id: 'sukemi',
    name: 'Dr. Sukemi, M.T.',
    role: {
      en: 'Secretary / Sekretaris AIMed CoE',
      id: 'Sekretaris / Secretary AIMed CoE'
    },
    email: 'sukemi@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=vj2mS-MAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57201140900',
    orcid: 'https://orcid.org/0000-0001-9981-2241',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Cervical Imaging Diagnostics', 'Embedded Edge AI Systems', 'Real-time Computer Vision'],
      id: ['Diagnostik Pencitraan Serviks', 'Sistem Edge AI Tertanam', 'Visi Komputer Real-time']
    },
    currentProjects: [
      'TeleOTIVA Rural Rollout Phase II: Mobile AI in South Sumatra Villages',
      'Intelligent Surgical Assistant using Low-Latency Edge Processors'
    ],
    latestPublications: [
      'Cervical Cancer Lesion Detection on Visual Inspection Images with Acetic Acid using Edge-Cloud Collaborative Deep Models (2024)'
    ]
  }
];

const defaultAssistants: Person[] = [
  {
    id: 'ade-iriani-ra',
    name: 'Ade Iriani Sapitri, S.Kom.',
    role: {
      en: 'Senior Research Assistant',
      id: 'Asisten Peneliti Senior'
    },
    email: 'adeirianisapitri13@gmail.com',
    scholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Ade+Iriani+Sapitri',
    scopus: 'https://www.scopus.com/results/authorNamesList.uri?st1=Sapitri&st2=Ade',
    orcid: 'https://orcid.org/0009-0005-2365-1510',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Fetal Echocardiography Deep Learning & Multi-Attention U-Net Core Architectures',
      id: 'Deep Learning Ekokardiografi Janin & Arsitektur Utama Multi-Attention U-Net'
    },
    interests: {
      en: ['Medical Image Segmentation', 'CNN attention gates', 'Medical Diagnostics'],
      id: ['Segmentasi Citra Medis', 'CNN attention gates', 'Diagnostik Medis']
    },
    latestPublications: [
      'Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound (Biomedical Signal Processing, 2025)'
    ]
  },
  {
    id: 'm-pratama-ra',
    name: 'Muhammad Pratama, S.Kom.',
    role: {
      en: 'Research Assistant',
      id: 'Asisten Peneliti'
    },
    email: 'm.pratama@aimed.unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Muhammad+Pratama',
    scopus: 'https://www.scopus.com/',
    orcid: 'https://orcid.org/',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Computer Vision & Mobile Edge AI Integration for Cervical VIA Screening',
      id: 'Integrasi Visi Komputer & Edge AI Seluler untuk Skrining VIA Serviks'
    },
    interests: {
      en: ['Mobile Edge Inference', 'TensorFlow Lite', 'VIA Diagnostics'],
      id: ['Inferensi Edge Seluler', 'TensorFlow Lite', 'Diagnostik VIA']
    }
  },
  {
    id: 'l-rosana-ra',
    name: 'Luthfi Rosana, S.Kom.',
    role: {
      en: 'Research Assistant',
      id: 'Asisten Peneliti'
    },
    email: 'l.rosana@aimed.unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?view_op=search_authors&mauthors=Luthfi+Rosana',
    scopus: 'https://www.scopus.com/',
    orcid: 'https://orcid.org/',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Generative Adversarial Networks for Speckle Denoising in Ultrasound Imagery',
      id: 'Generative Adversarial Network untuk Pengurangan Speckle Noise pada Citra Ultrasound'
    },
    interests: {
      en: ['GANs', 'Ultrasound Filtering', 'Contrast Optimization'],
      id: ['GAN', 'Penyaringan Ultrasound', 'Optimalisasi Kontras']
    }
  }
];

const defaultMembers: Person[] = [
  {
    id: 'pacu-putra',
    name: 'Dr. Pacu Putra, M.T.',
    role: {
      en: 'Lead Researcher in Explainable AI (XAI)',
      id: 'Peneliti Utama dalam Explainable AI (XAI)'
    },
    email: 'pacuputra@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=Y4gT-bYAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57211130600',
    orcid: 'https://orcid.org/0000-0003-2415-3211',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Grad-CAM Interpretability', 'Medical Safety', 'Adversarial Defense'],
      id: ['Interpretabilitas Grad-CAM', 'Keamanan Medis', 'Pertahanan Adversarial']
    }
  },
  {
    id: 'fachrurrozi',
    name: 'Dr. Eng. Muhammad Fachrurrozi, M.T.',
    role: {
      en: 'Senior Researcher in Biomedical Signals',
      id: 'Peneliti Senior dalam Sinyal Biomedis'
    },
    email: 'dr.ozi@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=v6n8t-EAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57190014200',
    orcid: 'https://orcid.org/0000-0001-5264-5415',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['ECG Signal Processing', 'Genomics sequence alignment', 'Signal Denoising'],
      id: ['Pemrosesan Sinyal ECG', 'Penyelarasan Urutan Genomik', 'Pengurangan Noise Sinyal']
    }
  },
  {
    id: 'yusliani',
    name: 'Dr. Novi Yusliani, M.T.',
    role: {
      en: 'Lead Researcher in Healthcare Analytics',
      id: 'Peneliti Utama dalam Analisis Kesehatan'
    },
    email: 'noviyusliani@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=X6_rt-EAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57200251100',
    orcid: 'https://orcid.org/0000-0002-3642-1524',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Predictive EHR analytics', 'Epidemic Modeling', 'Natural Language Processing'],
      id: ['Analisis Prediktif EHR', 'Pemodelan Epidemi', 'Pemrosesan Bahasa Alami']
    }
  }
];

const defaultCollaborators: Person[] = [
  {
    id: 'col-takahashi',
    name: 'Prof. Masahiro Takahashi, PhD',
    role: {
      en: 'International Collaborative Partner',
      id: 'Mitra Kolaborasi Internasional'
    },
    institution: {
      en: 'Tohoku University, Japan',
      id: 'Tohoku University, Jepang'
    },
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Advanced Speckle Suppression Filters & Ultrasound Cardiac Imaging Exchanges',
      id: 'Filter Supresi Speckle Canggih & Pertukaran Pencitraan Jantung Ultrasound'
    }
  },
  {
    id: 'col-oconnor',
    name: 'Dr. James O’Connor, MD',
    role: {
      en: 'Clinical Diagnostic Consultant',
      id: 'Konsultan Diagnostik Klinis'
    },
    institution: {
      en: 'National University Hospital, Singapore',
      id: 'National University Hospital, Singapura'
    },
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Clinical Validation of TeleOTIVA Cervical VIA Image Segmentations',
      id: 'Validasi Klinis Segmentasi Gambar VIA Serviks TeleOTIVA'
    }
  },
  {
    id: 'col-thorne',
    name: 'Prof. Alexander Thorne, PhD',
    role: {
      en: 'Academic Advisor in Transfer Learning',
      id: 'Penasihat Akademis dalam Transfer Learning'
    },
    institution: {
      en: 'Stanford AI Lab (SAIL), USA',
      id: 'Stanford AI Lab (SAIL), Amerika Serikat'
    },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Transfer Learning Benchmarks under Low-Resource Medical Diagnostics',
      id: 'Tolok Ukur Transfer Learning di bawah Diagnostik Medis Sumber Daya Terbatas'
    }
  }
];

const defaultPostgraduate: Person[] = [
  {
    id: 'pg-arian',
    name: 'Ahmad Rian, M.T.',
    role: { en: 'PhD Candidate (S3)', id: 'Kandidat Doktor (S3)' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Explainable AI Pathways for Lung Pathology Classifications in Radiographs',
      id: 'Jalur AI Terjelaskan untuk Klasifikasi Patologi Paru pada Radiografi'
    },
    supervisor: 'Prof. Dr. Ir. Samsuryadi, M.T.'
  },
  {
    id: 'pg-diana',
    name: 'Sarah Diana, M.T.',
    role: { en: 'PhD Candidate (S3)', id: 'Kandidat Doktor (S3)' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Generative Adversarial Networks for Microvascular Tumor Border Segmentations',
      id: 'Generative Adversarial Network untuk Segmentasi Batas Tumor Mikrovaskular'
    },
    supervisor: 'Dr. Pacu Putra, M.T.'
  }
];

const defaultGraduate: Person[] = [
  {
    id: 'g-ade',
    name: 'Ade Iriani Sapitri, S.Kom.',
    role: { en: 'Masters Student (S2)', id: 'Mahasiswa Magister (S2)' },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Deep Multi-Attention U-Net for Cardiac Chamber Segmentations in Fetal Echocardiography',
      id: 'Multi-Attention U-Net Mendalam untuk Segmentasi Ruang Jantung pada Ekokardiografi Janin'
    },
    supervisor: 'Prof. Dr. Ir. Samsuryadi, M.T.'
  },
  {
    id: 'g-randy',
    name: 'Randy Wijaya, S.Kom.',
    role: { en: 'Masters Student (S2)', id: 'Mahasiswa Magister (S2)' },
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Specular Reflection Correction and Illumination Enhancement for VIA Cervical Images',
      id: 'Koreksi Refleksi Spekular dan Peningkatan Iluminasi untuk Gambar VIA Serviks'
    },
    supervisor: 'Dr. Sukemi, M.T.'
  },
  {
    id: 'g-amelia',
    name: 'Amelia Syahri, S.Kom.',
    role: { en: 'Masters Student (S2)', id: 'Mahasiswa Magister (S2)' },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Explainable Attention Heatmaps for Regional Chest Tuberculosis Scans',
      id: 'Peta Panas Perhatian Terjelaskan untuk Pemindaian Tuberkulosis Dada Regional'
    },
    supervisor: 'Dr. Eng. Muhammad Fachrurrozi, M.T.'
  }
];

const defaultUndergraduate: Person[] = [
  {
    id: 'ug-denny',
    name: 'Denny Raharjo',
    role: { en: 'Undergraduate Student (S1)', id: 'Mahasiswa Sarjana (S1)' },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Android Mobile Client Application Development for TeleOTIVA Screening',
      id: 'Pengembangan Aplikasi Klien Seluler Android untuk Skrining TeleOTIVA'
    },
    supervisor: 'Dr. Sukemi, M.T.'
  },
  {
    id: 'ug-elvira',
    name: 'Elvira Salsabila',
    role: { en: 'Undergraduate Student (S1)', id: 'Mahasiswa Sarjana (S1)' },
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Web-Based Interoperable Portal for Open Access Medical Image Repositories',
      id: 'Portal Interoperabel Berbasis Web untuk Repositori Citra Medis Akses Terbuka'
    },
    supervisor: 'Dr. Novi Yusliani, M.T.'
  },
  {
    id: 'ug-kevin',
    name: 'Kevin Sanjaya',
    role: { en: 'Undergraduate Student (S1)', id: 'Mahasiswa Sarjana (S1)' },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    topic: {
      en: 'Real-time Wavelet Denoising for Multi-lead Electrocardiograph Signals',
      id: 'Pengurangan Noise Wavelet Real-time untuk Sinyal Elektrokardiograf Multi-lead'
    },
    supervisor: 'Dr. Eng. Muhammad Fachrurrozi, M.T.'
  }
];

const defaultYoutubeVideos = [
  {
    id: 'yt-1',
    title: {
      en: 'AIMed CoE Overview: Fetal Echocardiography and Maternal AI Initiatives',
      id: 'Ikhtisar AIMed CoE: Inisiatif Ekokardiografi Janin dan AI Kesehatan Ibu'
    },
    duration: '5:42',
    views: '1.2K',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-2',
    title: {
      en: 'TeleOTIVA Technical Guide: Capturing & Analyzing Cervical VIA with Mobile-AI',
      id: 'Panduan Teknis TeleOTIVA: Mengambil & Menganalisis VIA Serviks dengan Mobile-AI'
    },
    duration: '12:15',
    views: '840',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-3',
    title: {
      en: 'AI for Healthcare: Opportunities and Challenges in Developing Countries',
      id: 'AI untuk Layanan Kesehatan: Peluang dan Tantangan di Negara Berkembang'
    },
    duration: '18:40',
    views: '2.5K',
    thumbnail: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-4',
    title: {
      en: 'Workshop: Training GANs for Medical Image Enhancement and Denoising',
      id: 'Lokakarya: Melatih GAN untuk Peningkatan Citra Medis dan Pengurangan Noise'
    },
    duration: '45:10',
    views: '1.8K',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-5',
    title: {
      en: 'Introduction to Maternal-Fetal Health Monitoring Systems using Mobile Edge-AI',
      id: 'Pengenalan Sistem Pemantauan Kesehatan Ibu-Janin menggunakan Mobile Edge-AI'
    },
    duration: '8:55',
    views: '950',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-015578c77d5f?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-6',
    title: {
      en: 'How We Build Low-cost Medical Devices with Integrated AI Co-processors',
      id: 'Bagaimana Kami Membangun Alat Medis Murah dengan Ko-prosesor AI Terintegrasi'
    },
    duration: '14:22',
    views: '1.1K',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-7',
    title: {
      en: 'Collaboration Highlight: Working with Tohoku University on Smart Sensors',
      id: 'Sorotan Kolaborasi: Bekerja sama dengan Universitas Tohoku untuk Sensor Pintar'
    },
    duration: '6:30',
    views: '710',
    thumbnail: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-8',
    title: {
      en: 'Paper Presentation: Real-time Cervical Lesion Detection via Lightweight CNN',
      id: 'Presentasi Makalah: Deteksi Lesi Serviks Real-time melalui CNN Ringan'
    },
    duration: '10:15',
    views: '1.4K',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-9',
    title: {
      en: 'Behind the Scenes: A Day in the Life of an AIMed Center Researcher',
      id: 'Di Balik Layar: Sehari dalam Kehidupan Peneliti Pusat AIMed'
    },
    duration: '9:05',
    views: '3.1K',
    thumbnail: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  },
  {
    id: 'yt-10',
    title: {
      en: 'Future of Clinical AI: Generative Models in Obstetric Care Systems',
      id: 'Masa Depan AI Klinis: Model Generatif dalam Sistem Perawatan Kebidanan'
    },
    duration: '22:45',
    views: '2.0K',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    embedId: 'dQw4w9WgXcQ'
  }
];

const defaultInstagramPosts = [
  {
    id: 'ig-1',
    link: 'https://www.instagram.com/p/C-X8yJDSsD/',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '🏆 Congrats to our student developers for winning first prize in the national Biomedical AI Hackathon with their edge-based ultrasound denoiser!',
      id: '🏆 Selamat kepada pengembang mahasiswa kami karena memenangkan hadiah pertama di Hackathon AI Biomedis nasional dengan denoiser ultrasound berbasis tepi!'
    },
    date: '2 days ago'
  },
  {
    id: 'ig-2',
    link: 'https://www.instagram.com/p/C9fO4O_P7-o/',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '🎤 Prof. Samsuryadi delivering his keynote lecture on spatial transformer attention pipelines at the International Fetal Care Symposium in Tokyo.',
      id: '🎤 Prof. Samsuryadi menyampaikan kuliah utamanya tentang saluran perhatian spatial transformer di Simposium Perawatan Janin Internasional di Tokyo.'
    },
    date: '1 week ago'
  },
  {
    id: 'ig-3',
    link: 'https://www.instagram.com/p/C8v_z9pS0X5/',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '🔬 Collaborative coding session with international researchers from Tohoku University. Building next-generation speckle reduction GAN models.',
      id: '🔬 Sesi coding kolaboratif dengan peneliti internasional dari Universitas Tohoku. Membangun model GAN pengurang speckle generasi berikutnya.'
    },
    date: '2 weeks ago'
  },
  {
    id: 'ig-4',
    link: 'https://www.instagram.com/p/C6t-YIuL3Wq/',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '⚡ Running ultra-fast multi-node batch trainings on our newly installed NVIDIA H100 GPU cluster nodes inside the central laboratory room!',
      id: '⚡ Menjalankan pelatihan batch multi-node ultra-cepat pada node kluster GPU NVIDIA H100 kami yang baru dipasang di ruang laboratorium pusat!'
    },
    date: '3 weeks ago'
  },
  {
    id: 'ig-5',
    link: 'https://www.instagram.com/p/C58011gPxjZ/',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '📅 Wrapping up our monthly Research Seminar! Excellent ideas presented on multi-modal maternal databases and federated clinical networks.',
      id: '📅 Menyelesaikan Seminar Penelitian bulanan kami! Ide luar biasa dipresentasikan tentang database maternal multi-modal dan jaringan klinis terfederasi.'
    },
    date: '1 month ago'
  },
  {
    id: 'ig-6',
    link: 'https://www.instagram.com/p/C4A11Z5PuG7/',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '🏥 TeleOTIVA field testing in local community clinics. Bridging the gap between frontier AI algorithms and maternal health coverage.',
      id: '🏥 Uji coba lapangan TeleOTIVA di klinik komunitas lokal. Menjembatani kesenjangan antara algoritma AI mutakhir dan cakupan kesehatan ibu.'
    },
    date: '1 month ago'
  },
  {
    id: 'ig-7',
    link: 'https://www.instagram.com/p/C3fI1Z5PuG7/',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '💻 Brainstorming with student interns. Encouraging computational innovation to address underserved regional healthcare needs!',
      id: '💻 Curah pendapat dengan mahasiswa magang. Mendorong inovasi komputasi untuk mengatasi kebutuhan layanan kesehatan regional yang kurang terlayani!'
    },
    date: '1 month ago'
  },
  {
    id: 'ig-8',
    link: 'https://www.instagram.com/p/C2_I1Z5P_u8/',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '🏆 Celebrated the registration of our latest intellectual property (IP) for maternal fetal monitoring. Onwards and upwards!',
      id: '🏆 Merayakan pendaftaran kekayaan intelektual (KI) terbaru kami untuk pemantauan janin ibu. Terus maju dan berkembang!'
    },
    date: '2 months ago'
  },
  {
    id: 'ig-9',
    link: 'https://www.instagram.com/p/C1A11Z5PuG7/',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '👥 Honored to host the regional healthcare delegation at AIMed CoE. Discussing the integration of AI modules into regional health policy.',
      id: '👥 Kehormatan bagi kami untuk menyambut delegasi layanan kesehatan regional di AIMed CoE. Membahas integrasi modul AI ke dalam kebijakan kesehatan wilayah.'
    },
    date: '2 months ago'
  },
  {
    id: 'ig-10',
    link: 'https://www.instagram.com/p/C0A11Z5PuG7/',
    image: 'https://images.unsplash.com/photo-1504813184591-015578c77d5f?auto=format&fit=crop&q=80&w=800',
    caption: {
      en: '🌟 A sneak peek into our custom PCB prototypes built with real-time Edge-AI processors for mobile ultrasound streaming.',
      id: '🌟 Intipan prototipe PCB kustom kami yang dibuat dengan prosesor Edge-AI real-time untuk streaming ultrasound seluler.'
    },
    date: '3 months ago'
  }
];

const defaultMassMedia = [
  {
    id: 'media-1',
    publisher: 'Kompas.id',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=100',
    title: {
      en: 'Universitas Sriwijaya Pioneers Edge-AI Diagnosis for Maternal Healthcare in Remote Regions',
      id: 'Universitas Sriwijaya Pionirkan Diagnosis Edge-AI untuk Layanan Ibu di Wilayah Terpencil'
    },
    date: '2026-05-18',
    summary: {
      en: 'AIMed CoE has received national attention for deploying low-latency deep learning models directly on portable ultrasound devices, eliminating the need for robust internet connectivity in rural clinics.',
      id: 'AIMed CoE mendapatkan perhatian nasional karena menerapkan model deep learning berlatensi rendah langsung pada perangkat ultrasound portabel, menghilangkan kebutuhan akan koneksi internet yang kuat di klinik pedesaan.'
    },
    link: 'https://www.kompas.id/'
  },
  {
    id: 'media-2',
    publisher: 'Detik Health',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=100',
    title: {
      en: 'Stanford Ranks Sriwijaya University AI Professor Prof. Samsuryadi in Top 2% Global Scientists',
      id: 'Stanford Peringkat Profesor AI Universitas Sriwijaya Prof. Samsuryadi dalam 2% Ilmuwan Global Teratas'
    },
    date: '2026-04-02',
    summary: {
      en: 'The prestigious annual Stanford University index lists the AIMed CoE Director as part of the worlds top 2% highly cited scientists for his groundbreaking cardiac image processing frameworks.',
      id: 'Indeks tahunan Universitas Stanford yang bergengsi mencantumkan Direktur AIMed CoE sebagai bagian dari 2% ilmuwan yang paling banyak dikutip di dunia untuk kerangka kerja pemrosesan citra jantung yang dirintisnya.'
    },
    link: 'https://health.detik.com/'
  },
  {
    id: 'media-3',
    publisher: 'Tribun Sumsel',
    logo: 'https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&q=80&w=100',
    title: {
      en: 'South Sumatra Provincial Government Partners with AIMed CoE for Cervical Cancer Screening Drive',
      id: 'Pemerintah Provinsi Sumsel Gandeng AIMed CoE untuk Gerakan Skrining Kanker Serviks'
    },
    date: '2026-03-14',
    summary: {
      en: 'A provincial initiative aims to deploy the TeleOTIVA smartphone cervical lesion classifier to 30 village medical officers, enabling remote on-demand expert validation.',
      id: 'Inisiatif provinsi bertujuan untuk menyebarkan klasifikasi lesi serviks ponsel cerdas TeleOTIVA ke 30 petugas medis desa, memungkinkan validasi ahli jarak jauh sesuai permintaan.'
    },
    link: 'https://sumsel.tribunnews.com/'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Migration total: nonaktifkan localStorage agar database Supabase menjadi SATU-SATUNYA sumber data utama.
  const getStored = <T,>(key: string, fallback: T): T => {
    return fallback;
  };

  const [researchGroups, setResearchGroups] = useState<ResearchGroup[]>(() => 
    getStored('researchGroups', initialResearchGroups)
  );
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseProject[]>(() => {
    const loaded = getStored('showcaseProjects', initialShowcaseProjects);
    const hasDenoising = loaded.some(p => p.id === 'us-denoising');
    if (hasDenoising) {
      const filtered = loaded.filter(p => p.id !== 'us-denoising');
      localStorage.setItem('aimed_showcaseProjects', JSON.stringify(filtered));
      return filtered;
    }
    return loaded;
  });
  const [publicationsData, setPublicationsData] = useState<PublicationsData>(() => 
    getStored('publicationsData', defaultPublicationsData)
  );
  const [datasets, setDatasets] = useState<Dataset[]>(() => {
    const loaded = getStored('datasets', initialDatasets);
    const hasOldValues = loaded.some(d => d.paperRef?.includes('Samsuryadi et al.') || d.benchmark?.includes('Dice Score') || d.paperRef?.includes('Sukemi et al.'));
    if (hasOldValues) {
      localStorage.setItem('aimed_datasets', JSON.stringify(initialDatasets));
      return initialDatasets;
    }
    return loaded;
  });
  const [news, setNews] = useState<NewsItem[]>(() => 
    getStored('news', initialNews)
  );
  const [events, setEvents] = useState<EventItem[]>(() => 
    getStored('events', initialEvents)
  );
  const [leadership, setLeadership] = useState<Person[]>(() => 
    getStored('leadership', defaultLeadership)
  );
  const [assistants, setAssistants] = useState<Person[]>(() => 
    getStored('assistants', defaultAssistants)
  );
  const [members, setMembers] = useState<Person[]>(() => 
    getStored('members', defaultMembers)
  );
  const [collaborators, setCollaborators] = useState<Person[]>(() => 
    getStored('collaborators', defaultCollaborators)
  );
  const [postgraduate, setPostgraduate] = useState<Person[]>(() => 
    getStored('postgraduate', defaultPostgraduate)
  );
  const [graduate, setGraduate] = useState<Person[]>(() => 
    getStored('graduate', defaultGraduate)
  );
  const [undergraduate, setUndergraduate] = useState<Person[]>(() => 
    getStored('undergraduate', defaultUndergraduate)
  );
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>(() => {
    const loaded = getStored('youtubeVideos', defaultYoutubeVideos);
    if (loaded.length < defaultYoutubeVideos.length) {
      localStorage.setItem('aimed_youtubeVideos', JSON.stringify(defaultYoutubeVideos));
      return defaultYoutubeVideos;
    }
    return loaded;
  });
  const [instagramPosts, setInstagramPosts] = useState<any[]>(() => {
    const loaded = getStored('instagramPosts', defaultInstagramPosts);
    const needsLinks = loaded.some((p: any) => !p.link);
    if (loaded.length < defaultInstagramPosts.length || needsLinks) {
      localStorage.setItem('aimed_instagramPosts', JSON.stringify(defaultInstagramPosts));
      return defaultInstagramPosts;
    }
    return loaded;
  });
  const [massMedia, setMassMedia] = useState<any[]>(() => 
    getStored('massMedia', defaultMassMedia)
  );
  const [partners, setPartners] = useState<Partner[]>(() => 
    getStored('partners', initialPartners)
  );
  const [sdgContent, setSdgContent] = useState<SDGContent>(() => 
    getStored('sdgContent', initialSdgContent)
  );
  const [conferencesOrganized, setConferencesOrganized] = useState<ConferenceOrganized[]>(() => 
    getStored('conferencesOrganized', initialConferencesOrganized)
  );
  const [journalsOrganized, setJournalsOrganized] = useState<JournalOrganized[]>(() => 
    getStored('journalsOrganized', initialJournalsOrganized)
  );
  const [promotions, setPromotions] = useState<Promotion[]>(() => 
    getStored('promotions', initialPromotions)
  );

  // Sync to local storage disabled for Supabase single source of truth migration
  const resetToDefault = () => {
    setResearchGroups(initialResearchGroups);
    setShowcaseProjects(initialShowcaseProjects);
    setPublicationsData(defaultPublicationsData);
    setDatasets(initialDatasets);
    setNews(initialNews);
    setEvents(initialEvents);
    setLeadership(defaultLeadership);
    setAssistants(defaultAssistants);
    setMembers(defaultMembers);
    setCollaborators(defaultCollaborators);
    setPostgraduate(defaultPostgraduate);
    setGraduate(defaultGraduate);
    setUndergraduate(defaultUndergraduate);
    setYoutubeVideos(defaultYoutubeVideos);
    setInstagramPosts(defaultInstagramPosts);
    setMassMedia(defaultMassMedia);
    setPartners(initialPartners);
    setSdgContent(initialSdgContent);
    setConferencesOrganized(initialConferencesOrganized);
    setJournalsOrganized(initialJournalsOrganized);
    setPromotions(initialPromotions);
  };

  const exportData = () => {
    const data = {
      researchGroups,
      showcaseProjects,
      publicationsData,
      datasets,
      news,
      events,
      leadership,
      assistants,
      members,
      collaborators,
      postgraduate,
      graduate,
      undergraduate,
      youtubeVideos,
      instagramPosts,
      massMedia,
      partners,
      sdgContent,
      conferencesOrganized,
      journalsOrganized,
      promotions
    };
    return JSON.stringify(data, null, 2);
  };

  // Auto-load CMS data from server and subscribe to Realtime Supabase changes
  useEffect(() => {
    const applyCMSData = (parsed: any) => {
      if (!parsed) return;
      if (parsed.researchGroups) setResearchGroups(parsed.researchGroups);
      if (parsed.showcaseProjects) setShowcaseProjects(parsed.showcaseProjects);
      if (parsed.publicationsData) setPublicationsData(parsed.publicationsData);
      if (parsed.datasets) setDatasets(parsed.datasets);
      if (parsed.news) setNews(parsed.news);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.leadership) setLeadership(parsed.leadership);
      if (parsed.assistants) setAssistants(parsed.assistants);
      if (parsed.members) setMembers(parsed.members);
      if (parsed.collaborators) setCollaborators(parsed.collaborators);
      if (parsed.postgraduate) setPostgraduate(parsed.postgraduate);
      if (parsed.graduate) setGraduate(parsed.graduate);
      if (parsed.undergraduate) setUndergraduate(parsed.undergraduate);
      if (parsed.youtubeVideos) setYoutubeVideos(parsed.youtubeVideos);
      if (parsed.instagramPosts) setInstagramPosts(parsed.instagramPosts);
      if (parsed.massMedia) setMassMedia(parsed.massMedia);
      if (parsed.partners) setPartners(parsed.partners);
      if (parsed.sdgContent) setSdgContent(parsed.sdgContent);
      if (parsed.conferencesOrganized) setConferencesOrganized(parsed.conferencesOrganized);
      if (parsed.journalsOrganized) setJournalsOrganized(parsed.journalsOrganized);
      if (parsed.promotions) setPromotions(parsed.promotions);
    };

    let supabaseChannel: any = null;

    const setupRealtime = async () => {
      try {
        const configRes = await fetch('/api/config');
        if (configRes.ok) {
          const config = await configRes.json();
          if (config.supabaseUrl && config.supabaseAnonKey) {
            console.log('[Supabase Realtime] Initializing client-side subscription...', config.supabaseUrl);
            const client = createClient(config.supabaseUrl, config.supabaseAnonKey);
            
            supabaseChannel = client
              .channel('public:cms_sections')
              .on('postgres_changes', { event: '*', schema: 'public', table: 'cms_sections' }, (payload: any) => {
                console.log('[Supabase Realtime] Change received:', payload);
                const section = payload.new?.section_name;
                const updatedData = payload.new?.data;
                if (section && updatedData) {
                  if (section === 'researchGroups') setResearchGroups(updatedData);
                  else if (section === 'showcaseProjects') setShowcaseProjects(updatedData);
                  else if (section === 'publicationsData') setPublicationsData(updatedData);
                  else if (section === 'datasets') setDatasets(updatedData);
                  else if (section === 'news') setNews(updatedData);
                  else if (section === 'events') setEvents(updatedData);
                  else if (section === 'leadership') setLeadership(updatedData);
                  else if (section === 'assistants') setAssistants(updatedData);
                  else if (section === 'members') setMembers(updatedData);
                  else if (section === 'collaborators') setCollaborators(updatedData);
                  else if (section === 'postgraduate') setPostgraduate(updatedData);
                  else if (section === 'graduate') setGraduate(updatedData);
                  else if (section === 'undergraduate') setUndergraduate(updatedData);
                  else if (section === 'youtubeVideos') setYoutubeVideos(updatedData);
                  else if (section === 'instagramPosts') setInstagramPosts(updatedData);
                  else if (section === 'massMedia') setMassMedia(updatedData);
                  else if (section === 'partners') setPartners(updatedData);
                  else if (section === 'sdgContent') setSdgContent(updatedData);
                  else if (section === 'conferencesOrganized') setConferencesOrganized(updatedData);
                  else if (section === 'journalsOrganized') setJournalsOrganized(updatedData);
                  else if (section === 'promotions') setPromotions(updatedData);
                }
              })
              .subscribe();
          }
        }
      } catch (err) {
        console.warn('[Supabase Realtime] Setup error (expected if running without keys):', err);
      }
    };

    const loadData = async () => {
      try {
        console.log('Loading CMS data from server (Supabase PostgreSQL)...');
        const response = await fetch('/api/cms/load');
        
        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
          const result = await response.json();
          if (result.status === 'success' && result.data) {
            applyCMSData(result.data);
            console.log('CMS data loaded successfully from server.');
            setupRealtime();
            return;
          }
        }
        throw new Error('Not a valid JSON response from server API.');
      } catch (err) {
        console.warn('Failed to load CMS data from local server API. Attempting client-side raw GitHub fallback...', err);
        
        // Attempt to fetch from GitHub raw content
        try {
          const owner = (import.meta as any).env.VITE_GITHUB_REPO_OWNER || localStorage.getItem('cms_github_owner') || 'aaddeeis';
          const repo = (import.meta as any).env.VITE_GITHUB_REPO_NAME || localStorage.getItem('cms_github_repo') || 'Web-AIMed';
          const branch = (import.meta as any).env.VITE_GITHUB_REPO_BRANCH || localStorage.getItem('cms_github_branch') || 'main';
          
          const githubRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/cms_data.json`;
          console.log(`Attempting raw GitHub load from: ${githubRawUrl}`);
          
          const ghRes = await fetch(githubRawUrl);
          if (ghRes.ok) {
            const data = await ghRes.json();
            applyCMSData(data);
            console.log('CMS data loaded successfully from raw GitHub!');
            return;
          } else {
            console.warn(`GitHub Raw fetch returned status ${ghRes.status}`);
          }
        } catch (ghErr) {
          console.error('Failed raw GitHub load:', ghErr);
        }

        // Final fallback: try fetching local static cms_data.json
        try {
          console.log('Attempting static fallback load for cms_data.json...');
          const res = await fetch('/cms_data.json');
          if (res.ok) {
            const data = await res.json();
            applyCMSData(data);
            console.log('CMS data loaded successfully from static /cms_data.json fallback.');
          }
        } catch (staticErr) {
          console.warn('Static /cms_data.json fallback load also failed:', staticErr);
        }
      }
    };
    loadData();

    return () => {
      if (supabaseChannel) {
        console.log('[Supabase Realtime] Unsubscribing channel...');
        supabaseChannel.unsubscribe();
      }
    };
  }, []);

  const pushToGitHubClientSide = async (contentString: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    const token = (import.meta as any).env.VITE_GITHUB_TOKEN || localStorage.getItem('cms_github_token');
    const owner = (import.meta as any).env.VITE_GITHUB_REPO_OWNER || localStorage.getItem('cms_github_owner') || 'aaddeeis';
    const repo = (import.meta as any).env.VITE_GITHUB_REPO_NAME || localStorage.getItem('cms_github_repo') || 'Web-AIMed';
    const branch = (import.meta as any).env.VITE_GITHUB_REPO_BRANCH || localStorage.getItem('cms_github_branch') || 'main';
    const path = 'cms_data.json';

    if (!token) {
      return { 
        success: false, 
        error: 'GitHub Token is not configured. Please open CMS Settings (top-right gear icon) to setup GITHUB_TOKEN so you can save directly from Vercel!' 
      };
    }

    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      
      // Get existing file SHA if it exists
      let sha: string | undefined = undefined;
      try {
        const getRes = await fetch(`${url}?ref=${branch}`, {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Cache-Control': 'no-cache'
          }
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          sha = fileData.sha;
        }
      } catch (e) {
        console.log('File does not exist or fetch SHA failed:', e);
      }

      // Modern Unicode-safe base64 conversion
      const utf8Bytes = new TextEncoder().encode(contentString);
      let binary = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = btoa(binary);

      // Format Indonesian Date
      const now = new Date();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const commitMessage = `Update CMS - ${day} ${month} ${year} ${hours}:${minutes}`;

      const body: any = {
        message: commitMessage,
        content: base64Content,
        branch
      };
      if (sha) {
        body.sha = sha;
      }

      const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(body)
      });

      if (putRes.ok) {
        return { success: true, message: `Successfully committed directly to GitHub branch ${branch}: "${commitMessage}"` };
      } else {
        const errData = await putRes.json();
        return { success: false, error: errData.message || 'Failed to push to GitHub' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  };

  const saveToServer = async (): Promise<{ success: boolean; error?: string; githubSync?: { enabled: boolean; success?: boolean; message?: string; error?: string } }> => {
    try {
      const dataStr = exportData();
      
      console.log('Saving CMS data to server disk (cms_data.json)...');
      let response: Response | null = null;
      let useClientFallback = false;
      let fallbackReason = "";

      try {
        response = await fetch('/api/cms/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: dataStr
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
          useClientFallback = true;
          fallbackReason = `HTTP ${response?.status}: Server did not return JSON. This is expected if running on a static host like Vercel.`;
        }
      } catch (fetchErr) {
        useClientFallback = true;
        fallbackReason = `Fetch failed: Server API is unreachable.`;
      }

      if (useClientFallback) {
        console.log(`${fallbackReason} Falling back to Client-side Direct GitHub sync...`);
        const ghResult = await pushToGitHubClientSide(dataStr);
        if (ghResult.success) {
          return {
            success: true,
            githubSync: {
              enabled: true,
              success: true,
              message: ghResult.message || 'Updated directly via GitHub API client-side'
            }
          };
        } else {
          return {
            success: false,
            error: `Direct GitHub sync failed: ${ghResult.error}`
          };
        }
      }

      if (response) {
        const result = await response.json();
        if (result.status === 'success') {
          console.log('Saved CMS data to server disk successfully.');
          return { 
            success: true, 
            githubSync: result.githubSync
          };
        } else {
          return { 
            success: false, 
            error: result.error || 'Failed to save to server disk.' 
          };
        }
      }

      return { success: false, error: 'Unknown save state' };
    } catch (e: any) {
      console.error('Failed to save CMS data:', e);
      return { success: false, error: e?.message || String(e) };
    }
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.researchGroups) setResearchGroups(parsed.researchGroups);
      if (parsed.showcaseProjects) setShowcaseProjects(parsed.showcaseProjects);
      if (parsed.publicationsData) setPublicationsData(parsed.publicationsData);
      if (parsed.datasets) setDatasets(parsed.datasets);
      if (parsed.news) setNews(parsed.news);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.leadership) setLeadership(parsed.leadership);
      if (parsed.assistants) setAssistants(parsed.assistants);
      if (parsed.members) setMembers(parsed.members);
      if (parsed.collaborators) setCollaborators(parsed.collaborators);
      if (parsed.postgraduate) setPostgraduate(parsed.postgraduate);
      if (parsed.graduate) setGraduate(parsed.graduate);
      if (parsed.undergraduate) setUndergraduate(parsed.undergraduate);
      if (parsed.youtubeVideos) setYoutubeVideos(parsed.youtubeVideos);
      if (parsed.instagramPosts) setInstagramPosts(parsed.instagramPosts);
      if (parsed.massMedia) setMassMedia(parsed.massMedia);
      if (parsed.partners) setPartners(parsed.partners);
      if (parsed.sdgContent) setSdgContent(parsed.sdgContent);
      if (parsed.conferencesOrganized) setConferencesOrganized(parsed.conferencesOrganized);
      if (parsed.journalsOrganized) setJournalsOrganized(parsed.journalsOrganized);
      if (parsed.promotions) setPromotions(parsed.promotions);
      return true;
    } catch (e) {
      console.error('Failed to import data', e);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{
      researchGroups, showcaseProjects, publicationsData, datasets, news, events,
      leadership, assistants, members, collaborators, postgraduate, graduate, undergraduate,
      youtubeVideos, instagramPosts, massMedia, partners, sdgContent, conferencesOrganized, journalsOrganized, promotions,
      setResearchGroups, setShowcaseProjects, setPublicationsData, setDatasets, setNews, setEvents,
      setLeadership, setAssistants, setMembers, setCollaborators, setPostgraduate, setGraduate, setUndergraduate,
      setYoutubeVideos, setInstagramPosts, setMassMedia, setPartners, setSdgContent, setConferencesOrganized, setJournalsOrganized, setPromotions,
      resetToDefault, exportData, importData, saveToServer
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
