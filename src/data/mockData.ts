// @ts-ignore
import teleotivaBanner from '../assets/images/teleotiva_banner_1784011617621.jpg';
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
  SDGContent
} from '../types';

export const RESEARCH_GROUPS: ResearchGroup[] = [
  {
    id: 'med-imaging',
    name: { en: 'Medical Imaging', id: 'Pencitraan Medis' },
    description: {
      en: 'Developing deep learning algorithms to analyze, enhance, and segment 2D/3D medical scans including MRI, CT, and Ultrasound.',
      id: 'Mengembangkan algoritma deep learning untuk menganalisis, menyempurnakan, dan mensegmentasi pemindaian medis 2D/3D termasuk MRI, CT, dan Ultrasonografi.'
    },
    lead: 'Prof. Ir. Siti Nurmaini, M.T, Ph.D',
    keywords: ['MRI', 'Ultrasound', 'CT Scans', 'Segmentation', 'Reconstruction'],
    icon: 'Activity'
  },
  {
    id: 'comp-vision',
    name: { en: 'Computer Vision in Healthcare', id: 'Visi Komputer dalam Kesehatan' },
    description: {
      en: 'Applying object detection, visual tracking, and anatomical analysis on surgery videos and real-time diagnostic feeds.',
      id: 'Menerapkan deteksi objek, pelacakan visual, dan analisis anatomi pada video bedah dan umpan diagnostik real-time.'
    },
    lead: 'Dr. Sukemi, M.T.',
    keywords: ['Object Detection', 'Video Analysis', 'Surgical AI', 'Optical Flow'],
    icon: 'Eye'
  },
  {
    id: 'explainable-ai',
    name: { en: 'Explainable AI (XAI)', id: 'Kecerdasan Buatan Terjelaskan' },
    description: {
      en: 'Bridging the trust gap in clinical settings by providing Grad-CAM visual heatmaps, decision trees, and counterfactual explanations for neural models.',
      id: 'Menjembatani celah kepercayaan dalam pengaturan klinis dengan menyediakan peta panas visual Grad-CAM, pohon keputusan, dan penjelasan kontra-faktual untuk model saraf.'
    },
    lead: 'Dr. Pacu Putra, M.T.',
    keywords: ['Grad-CAM', 'Feature Attribution', 'Clinical Trust', 'Model Interpretability'],
    icon: 'FileText'
  },
  {
    id: 'biomedical-ai',
    name: { en: 'Biomedical AI & Signals', id: 'AI Biomedis & Sinyal' },
    description: {
      en: 'Processing ECG, EEG, and genomic sequences to identify early biomarkers of cardiovascular and neural diseases.',
      id: 'Memproses sinyal ECG, EEG, dan urutan genomik untuk mengidentifikasi biomarker awal dari penyakit kardiovaskular dan saraf.'
    },
    lead: 'Dr. Eng. Muhammad Fachrurrozi, M.T.',
    keywords: ['ECG Processing', 'EEG Analysis', 'Genomics', 'Signal Denoising'],
    icon: 'HeartPulse'
  },
  {
    id: 'health-analytics',
    name: { en: 'Healthcare Analytics & Digital Health', id: 'Analisis Kesehatan & Kesehatan Digital' },
    description: {
      en: 'Using predictive modeling on Electronic Health Records (EHR) to optimize hospital workflows and patient risk assessment.',
      id: 'Menggunakan pemodelan prediktif pada Rekam Medis Elektronik (EHR) untuk mengoptimalkan alur kerja rumah sakit dan penilaian risiko pasien.'
    },
    lead: 'Dr. Novi Yusliani, M.T.',
    keywords: ['EHR Analytics', 'Risk Scoring', 'Workflow Optimization', 'Epidemic Forecasting'],
    icon: 'LineChart'
  }
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'chdxai',
    name: 'CHDxAI',
    tagline: {
      en: 'AI for Congenital Heart Disease Detection',
      id: 'AI untuk Deteksi Penyakit Jantung Bawaan'
    },
    description: {
      en: 'An advanced deep learning framework designed to analyze fetal echocardiography videos, segment cardiac chambers, and detect early markers of Congenital Heart Disease (CHD) with unprecedented accuracy.',
      id: 'Kerangka kerja deep learning tingkat lanjut yang dirancang untuk menganalisis video ekokardiografi janin, mensegmentasi ruang jantung, dan mendeteksi penanda awal Penyakit Jantung Bawaan (PJB) dengan akurasi yang belum pernah ada sebelumnya.'
    },
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1200',
    demoUrl: '#demo',
    publicationUrl: 'https://www.chdx-ai.com/#publications',
    websiteUrl: 'https://www.chdx-ai.com/',
    videoUrl: 'https://youtu.be/6o9N1ondUs0?si=qPHqcBbz-YH-69xx',
    features: {
      en: ['4-Chamber View Auto-alignment', 'Real-time Cardiac Cycle Phase Gating', 'Explainable Bi-ventricular Diameter Ratios', 'Q1-Grade Segmenter Engine'],
      id: ['Penyelarasan Otomatis Tampilan 4-Ruang', 'Gating Fase Siklus Jantung Real-time', 'Rasio Diameter Bi-ventrikular Terjelaskan', 'Mesin Segmentasi Kelas-Q1']
    }
  },
  {
    id: 'teleotiva',
    name: 'TeleOTIVA',
    tagline: {
      en: 'AI for Cervical Cancer Screening',
      id: 'AI untuk Skrining Kanker Serviks'
    },
    description: {
      en: 'A mobile-compatible cloud-assisted AI diagnostic system using visual inspection with acetic acid (VIA) images to detect early cervical abnormalities. Built for low-resource community health centers (Puskesmas).',
      id: 'Sistem diagnostik AI berbantuan cloud yang kompatibel dengan seluler menggunakan gambar inspeksi visual dengan asam asetat (IVA) untuk mendeteksi kelainan serviks sejak dini. Dirancang untuk Puskesmas dengan sumber daya terbatas.'
    },
    image: teleotivaBanner,
    demoUrl: '#demo',
    publicationUrl: 'https://teleotiva.com/id/publications',
    websiteUrl: 'https://teleotiva.com/',
    videoUrl: 'https://www.youtube.com/watch?v=HHvP1IBIaBU',
    features: {
      en: ['Dual-attention VIA Lesion Detection', 'Medical Records', 'Dashboard Monitoring', 'Telemedicine'],
      id: ['Deteksi Lesi IVA Dual-attention', 'Rekam Medis', 'Dashboard Monitoring', 'Telemedisin']
    }
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound',
    authors: 'Samsuryadi, S., Putra, P., Pratama, A. R., & Takahashi, M.',
    journal: 'Biomedical Signal Processing and Control',
    year: 2025,
    area: 'Medical Imaging',
    type: 'journal',
    quartile: 'Q1',
    publisher: 'Elsevier',
    doi: '10.1016/j.bspc.2025.105432',
    pdfUrl: '#',
    bibtex: `@article{samsuryadi2025deep,
  title={Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound},
  author={Samsuryadi, S. and Putra, P. and Pratama, A. R. and Takahashi, M.},
  journal={Biomedical Signal Processing and Control},
  volume={94},
  pages={105432},
  year={2025},
  publisher={Elsevier}
}`,
    citation: 'Samsuryadi, S., et al. "Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound." Biomedical Signal Processing and Control, vol. 94, 2025, p. 105432.',
    relatedDataset: 'AIMed-CHD-Ultrasound',
    abstract: 'Fetal chamber segmentation from echocardiography is pivotal for detecting congenital heart anomalies. However, low contrast and severe speckle noise in fetal ultrasound pose massive challenges. We present a deep multi-attention U-Net framework that leverages squeeze-and-excitation layers and dual-spatial attention pathways to lock onto cardiac borders. Tested across 4,500 annotated frames, our engine delivers a Dice Similarity Coefficient of 91.2%, significantly outperforming standard U-Net variants.'
  },
  {
    id: 'pub-2',
    title: 'Cervical Cancer Lesion Detection on Visual Inspection Images with Acetic Acid using Edge-Cloud Collaborative Deep Models',
    authors: 'Sukemi, S., Fachrurrozi, M., Yusliani, N., & O’Connor, J.',
    journal: 'IEEE Access',
    year: 2024,
    area: 'Computer Vision',
    type: 'journal',
    quartile: 'Q1',
    publisher: 'IEEE',
    doi: '10.1109/ACCESS.2024.3392812',
    pdfUrl: '#',
    bibtex: `@article{sukemi2024cervical,
  title={Cervical Cancer Lesion Detection on Visual Inspection Images with Acetic Acid using Edge-Cloud Collaborative Deep Models},
  author={Sukemi, S. and Fachrurrozi, M. and Yusliani, N. and O’Connor, J.},
  journal={IEEE Access},
  volume={12},
  pages={55410-55425},
  year={2024},
  publisher={IEEE}
}`,
    citation: 'Sukemi, S., et al. "Cervical Cancer Lesion Detection on Visual Inspection Images with Acetic Acid using Edge-Cloud Collaborative Deep Models." IEEE Access, vol. 12, 2024, pp. 55410-55425.',
    relatedDataset: 'TeleOTIVA-Cervicography',
    abstract: 'Regular screenings are a cornerstone of early cervical cancer eradication. In remote areas of Indonesia, skilled gynecologists are sparse. This paper introduces an edge-cloud collaborative Deep Convolutional Network. A lightweight MobileNet-V4 model runs locally on rural healthcare smartphones to filter bad images, while a heavy Swin-Transformer backbone runs on the center cloud to diagnose lesions with a 94.6% sensitivity rating.'
  },
  {
    id: 'pub-3',
    title: 'Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression and Edge Sharpening',
    authors: 'Putra, P., Samsuryadi, S., & Rosana, L.',
    journal: 'International Journal of Computer Assisted Radiology and Surgery',
    year: 2025,
    area: 'Deep Learning',
    type: 'journal',
    quartile: 'Q2',
    publisher: 'Springer',
    doi: '10.1007/s11548-025-03102-1',
    pdfUrl: '#',
    bibtex: `@article{putra2025dual,
  title={Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression and Edge Sharpening},
  author={Putra, P. and Samsuryadi, S. and Rosana, L.},
  journal={International Journal of Computer Assisted Radiology and Surgery},
  pages={1--14},
  year={2025},
  publisher={Springer}
}`,
    citation: 'Putra, P., et al. "Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression and Edge Sharpening." International Journal of Computer Assisted Radiology and Surgery, 2025, pp. 1-14.',
    relatedDataset: 'AIMed-Denoised-US',
    abstract: 'We introduce a Dual-Discriminator GAN architecture optimized specifically for ultrasound imagery. Unlike traditional filters that blur tissue edges, our framework integrates a gradient-guided discriminator alongside a traditional patch-based GAN discriminator. This results in the suppression of high-frequency acoustic noise while boosting local structural borders by 4.2 dB in Peak Signal-to-Noise Ratio.'
  },
  {
    id: 'pub-4',
    title: 'Explainable AI Pathways in Tropical Disease Radiographs using Grad-CAM and Layer-wise Relevance Propagation',
    authors: 'Fachrurrozi, M., Yusliani, N., & Widjaja, H.',
    journal: 'Journal of Digital Imaging',
    year: 2023,
    area: 'Explainable AI',
    type: 'journal',
    quartile: 'Q2',
    publisher: 'Springer',
    doi: '10.1007/s10278-023-00812-y',
    pdfUrl: '#',
    bibtex: `@article{fachrurrozi2023explainable,
  title={Explainable AI Pathways in Tropical Disease Radiographs using Grad-CAM and Layer-wise Relevance Propagation},
  author={Fachrurrozi, M. and Yusliani, N. and Widjaja, H.},
  journal={Journal of Digital Imaging},
  volume={36},
  number={4},
  pages={811--824},
  year={2023},
  publisher={Springer}
}`,
    citation: 'Fachrurrozi, M., et al. "Explainable AI Pathways in Tropical Disease Radiographs using Grad-CAM and Layer-wise Relevance Propagation." Journal of Digital Imaging, vol. 36, no. 4, 2023, pp. 811-824.',
    abstract: 'Explainability is vital for AI adoption in clinical settings. We propose a comparative audit of explainability paradigms—specifically Grad-CAM, Integrated Gradients, and Layer-wise Relevance Propagation (LRP)—across radiographs of tropical lung diseases like severe tuberculosis. Our study establishes that LRP isolates microscopic infiltrations with higher correlation to radiologists\' consensus.'
  }
];

export const RESEARCHERS: Researcher[] = [
  {
    id: 'samsuryadi',
    name: 'Prof. Dr. Ir. Samsuryadi, M.T.',
    position: {
      en: 'Executive Director & Professor of AI',
      id: 'Direktur Eksekutif & Profesor AI'
    },
    email: 'samsuryadi@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=Yl6eE7kAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=36611417500',
    orcid: 'https://orcid.org/0000-0002-3631-0162',
    researchGate: 'https://www.researchgate.net/profile/Samsuryadi-Samsuryadi',
    linkedIn: 'https://linkedin.com/in/samsuryadi',
    website: 'https://aimed.unsri.ac.id/samsuryadi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Medical Image Analysis', 'Deep Learning Architecture', 'Pattern Recognition'],
      id: ['Analisis Citra Medis', 'Arsitektur Deep Learning', 'Pengenalan Pola']
    },
    keywords: ['Medical Imaging', 'Pattern Recognition', 'Neural Networks', 'Echocardiography'],
    latestPublications: [
      'Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound (2025)',
      'Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression (2025)'
    ],
    currentProjects: [
      'Indonesian National Fetal Heart Screening AI Registry (Funding: BRIN)',
      'International Collaborative US Speckle Suppression Framework (with Tohoku University)'
    ]
  },
  {
    id: 'sukemi',
    name: 'Dr. Sukemi, M.T.',
    position: {
      en: 'Director of Healthcare Computer Vision',
      id: 'Direktur Visi Komputer Kesehatan'
    },
    email: 'sukemi@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=vj2mS-MAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57201140900',
    orcid: 'https://orcid.org/0000-0001-9981-2241',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Cervical Imaging', 'Embedded Edge AI', 'Object Detection Systems'],
      id: ['Pencitraan Serviks', 'Edge AI Tertanam', 'Sistem Deteksi Objek']
    },
    keywords: ['Cervical Screening', 'Edge Devices', 'Real-Time Inference', 'VIA Image Analysis'],
    latestPublications: [
      'Cervical Cancer Lesion Detection on Visual Inspection Images with Acetic Acid using Edge-Cloud Collaborative Deep Models (2024)'
    ],
    currentProjects: [
      'TeleOTIVA Rural Rollout Phase II: Mobile AI in South Sumatra Villages',
      'Intelligent Surgical Assistant using Low-Latency Edge Processors'
    ]
  },
  {
    id: 'pacu-putra',
    name: 'Dr. Pacu Putra, M.T.',
    position: {
      en: 'Lead Researcher in Explainable AI (XAI)',
      id: 'Peneliti Utama dalam Explainable AI (XAI)'
    },
    email: 'pacuputra@unsri.ac.id',
    scholar: 'https://scholar.google.com/citations?user=Y4gT-bYAAAAJ',
    scopus: 'https://www.scopus.com/authid/detail.uri?authorId=57211130600',
    orcid: 'https://orcid.org/0000-0002-8812-4432',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
    interests: {
      en: ['Model Explainability', 'Medical Image Optimization', 'Adversarial Defense in Healthcare'],
      id: ['Keterjelasan Model', 'Optimalisasi Citra Medis', 'Pertahanan Adversarial dalam Kesehatan']
    },
    keywords: ['Explainable AI', 'Grad-CAM', 'Medical Safety', 'Reliable Models'],
    latestPublications: [
      'Dual-Discriminator Generative Adversarial Networks for Ultrasound Speckle Suppression and Edge Sharpening (2025)',
      'Deep Multi-Attention U-Net for Chamber Segmentation in Fetal Echocardiography Ultrasound (2025)'
    ],
    currentProjects: [
      'Explainable AI Dashboards for ICU Medical Image Diagnostic Assistants',
      'Robustifying AI Diagnostic Models Against Adversarial Inputs in Radiology'
    ]
  }
];

export const DATASETS: Dataset[] = [
  {
    id: 'AIMed-CHD-Ultrasound',
    name: 'AIMed-CHD-Ultrasound Dataset',
    description: {
      en: 'A hand-annotated multi-view fetal echocardiography ultrasound dataset. Contains 4,500 expert-labeled frames isolating left/right ventricles and atriums to train cardiac chamber segmentations.',
      id: 'Dataset ultrasound ekokardiografi janin multi-view yang dianotasi manual. Berisi 4.500 bingkai berlabel ahli yang mengisolasi ventrikel kiri/kanan dan atrium untuk melatih segmentasi ruang jantung.'
    },
    size: '12.4 GB',
    downloadUrl: '#',
    license: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)',
    paperRef: 'Echocardiography (Fetal)',
    benchmark: 'Universitas Sriwijaya & Palembang Central Hospital',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'TeleOTIVA-Cervicography',
    name: 'TeleOTIVA Cervical VIA Dataset',
    description: {
      en: 'A benchmark dataset containing 1,800 clinical VIA (Visual Inspection with Acetic Acid) images from cervical screenings. Anonymized and fully vetted by gynecological consultants.',
      id: 'Dataset tolok ukur yang berisi 1.800 gambar klinis VIA (Inspeksi Visual dengan Asam Asetat) dari skrining serviks. Anonim dan diperiksa sepenuhnya oleh konsultan ginekologi.'
    },
    size: '3.8 GB',
    downloadUrl: '#',
    license: 'Research Only Agreement (Non-Commercial)',
    paperRef: 'Cervicography / VIA Images',
    benchmark: 'Provincial Health Office, South Sumatra',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'AIMed-Denoised-US',
    name: 'AIMed-Denoised Ultrasound Bench',
    description: {
      en: 'A comparative dataset of original and machine-denoised ultrasound scans of human kidneys, gallbladder, and liver. Specifically curated for medical image enhancement validation.',
      id: 'Dataset komparatif pemindaian ultrasonografi asli dan yang dihilangkan noise-nya oleh mesin pada ginjal, kantung empedu, dan hati manusia. Dikuratori khusus untuk validasi peningkatan citra medis.'
    },
    size: '8.2 GB',
    downloadUrl: '#',
    license: 'MIT License (Open Access Academic)',
    paperRef: 'Comparative Ultrasound Scans',
    benchmark: 'UNSRI Central Lab & Tohoku University',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'AIMed-Thyroid-Ultrasound',
    name: 'AIMed Thyroid Ultrasound Classification Dataset',
    description: {
      en: 'A curated dataset of 2,400 ultrasound scans of thyroid nodules with expert-annotated benign/malignant classifications and bounding boxes based on TI-RADS guidelines.',
      id: 'Dataset terkurasi dari 2.400 pemindaian ultrasound nodul tiroid dengan klasifikasi jinak/ganas berlabel ahli dan kotak pembatas berdasarkan pedoman TI-RADS.'
    },
    size: '5.1 GB',
    downloadUrl: '#',
    license: 'Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)',
    paperRef: 'Thyroid Ultrasound Images',
    benchmark: 'Palembang Public Health Center',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'AIMed-ECG-Arrhythmia',
    name: 'AIMed ECG Arrhythmia Signal Database',
    description: {
      en: 'High-resolution multi-lead ECG signal recordings of 1,200 rural cardiac patients in South Sumatra, annotated for 5 distinct arrhythmia classes by local cardiologists.',
      id: 'Rekaman sinyal ECG multi-lead resolusi tinggi dari 1.200 pasien jantung pedesaan di Sumatra Selatan, dianotasi untuk 5 kelas aritmia berbeda oleh kardiolog lokal.'
    },
    size: '1.9 GB',
    downloadUrl: '#',
    license: 'Open Access Research Use Agreement',
    paperRef: 'Arrhythmia Signal ECG',
    benchmark: 'South Sumatra Rural Cardiac Patient Study',
    image: 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'AIMed-COVID-Radiographs',
    name: 'AIMed Chest X-Ray & Radiograph Database',
    description: {
      en: 'A dataset of 3,500 chest X-ray images compiled from regional clinics in Sumatra, meticulously annotated with lung opacity maps and consolidations for pulmonary pathology training.',
      id: 'Dataset berisi 3.500 gambar rontgen dada yang dikumpulkan dari klinik regional di Sumatra, dianotasi secara cermat dengan peta opasitas paru dan konsolidasi untuk pelatihan patologi paru.'
    },
    size: '15.6 GB',
    downloadUrl: '#',
    license: 'MIT Academic License',
    paperRef: 'Chest X-Ray / Radiographs',
    benchmark: 'Regional Clinics, South Sumatra',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'AIMed-Retinal-Vessels',
    name: 'AIMed Retinal Fundus Image Database',
    description: {
      en: 'A collection of 850 high-resolution fundus images of diabetic retinopathy patients, complete with pixel-level segmentation masks for retinal vessels and microaneurysms.',
      id: 'Koleksi 850 gambar fundus resolusi tinggi dari pasien retinopati diabetik, lengkap dengan masker segmentasi tingkat piksel untuk pembuluh darah retina dan mikroaneurisma.'
    },
    size: '4.2 GB',
    downloadUrl: '#',
    license: 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0',
    paperRef: 'Retinal Fundus Images',
    benchmark: 'Dr. Mohammad Hoesin Hospital, Palembang',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=600'
  }
];

export const TIMELINE_PROJECTS: TimelineProject[] = [
  {
    id: 'tp-1',
    title: {
      en: 'Indonesian Fetal Cardiac Diagnostic AI Suite',
      id: 'Rangkaian AI Diagnostik Jantung Janin Indonesia'
    },
    funding: 'IDR 1.2 Billion (Indonesian Ministry of Research / BRIN)',
    collaborators: ['Universitas Sriwijaya', 'RSUP Dr. Mohammad Hoesin Palembang', 'Tohoku University'],
    progress: 85,
    year: 2024,
    status: 'ongoing',
    outputs: ['CHDxAI chamber segmentation system', '2 Q1 Elsevier publications', 'Patent filed IDP000084310'],
    description: {
      en: 'Developing deep learning technologies to bring automated 4-chamber ultrasound screening to maternal clinics throughout rural Sumatra.',
      id: 'Mengembangkan teknologi deep learning untuk menghadirkan skrining ultrasound 4-ruang otomatis ke klinik bersalin di seluruh pedesaan Sumatra.'
    }
  },
  {
    id: 'tp-2',
    title: {
      en: 'Edge Cervicography VIA Network Deploy',
      id: 'Penerapan Jaringan VIA Servikografi Edge'
    },
    funding: 'IDR 850 Million (Bakti Endowment)',
    collaborators: ['Universitas Sriwijaya', 'Palembang Central Oncology Group', 'National University Hospital Singapore'],
    progress: 100,
    year: 2023,
    status: 'completed',
    outputs: ['TeleOTIVA Android Client App', 'IEEE Access Publication', 'Cloud Classification Server'],
    description: {
      en: 'Creating a highly portable, smart phone-based, low-cost VIA image analysis application for early cervical cancer detection.',
      id: 'Membuat aplikasi analisis gambar VIA berbiaya rendah yang sangat portabel dan berbasis ponsel pintar untuk deteksi dini kanker serviks.'
    }
  },
  {
    id: 'tp-3',
    title: {
      en: 'Clinical XAI Platforms for Radiology Safety',
      id: 'Platform XAI Klinis untuk Keamanan Radiologi'
    },
    funding: 'IDR 600 Million (Faculty of Computer Science Internal Grant)',
    collaborators: ['Universitas Sriwijaya', 'Universitas Indonesia Medical Center'],
    progress: 35,
    year: 2025,
    status: 'ongoing',
    outputs: ['Grad-CAM UI widget', '1 Springer Manuscript Draft'],
    description: {
      en: 'Researching neural explainability maps that highlight spatial diagnostics in tuberculosis scans to verify clinical confidence.',
      id: 'Meneliti peta keterjelasan saraf yang menyoroti diagnostik spasial pada pemindaian tuberkulosis untuk memverifikasi kepercayaan klinis.'
    }
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: {
      en: 'AIMed CoE Mengamankan Hibah Penelitian BRIN Bergengsi untuk Pencitraan AI Janin',
      id: 'AIMed CoE Mengamankan Hibah Penelitian BRIN Bergengsi untuk Pencitraan AI Janin'
    },
    date: '2026-05-18',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'
    ],
    content: {
      en: 'Badan Riset dan Inovasi Nasional (BRIN) telah menganugerahi AIMed CoE hibah pendanaan penelitian utama sebesar Rp 1,2 Miliar untuk memperluas rangkaian CHDxAI. Pendanaan ini akan mendanai penambahan perangkat keras server GPU, uji klinis multi-pusat di klinik pedesaan Palembang, dan beasiswa asisten mahasiswa pascasarjana selama dua tahun ke depan.',
      id: 'Badan Riset dan Inovasi Nasional (BRIN) telah menganugerahi AIMed CoE hibah pendanaan penelitian utama sebesar Rp 1,2 Miliar untuk memperluas rangkaian CHDxAI. Pendanaan ini akan mendanai penambahan perangkat keras server GPU, uji klinis multi-pusat di klinik pedesaan Palembang, dan beasiswa asisten mahasiswa pascasarjana selama dua tahun ke depan.'
    }
  },
  {
    id: 'news-2',
    title: {
      en: 'Prof. Ir. Siti Nurmaini, M.T, Ph.D Masuk dalam Daftar 2% Ilmuwan Teratas Dunia dalam Bidang AI',
      id: 'Prof. Ir. Siti Nurmaini, M.T, Ph.D Masuk dalam Daftar 2% Ilmuwan Teratas Dunia dalam Bidang AI'
    },
    date: '2025-11-10',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
    ],
    content: {
      en: 'Ketua AIMed CoE, Prof. Ir. Siti Nurmaini, M.T, Ph.D, telah diakui oleh pengindeksan tahunan Universitas Stanford sebagai bagian dari 2% ilmuwan paling banyak dikutip di seluruh dunia dalam subbidang Kecerdasan Buatan, Visi Komputer, dan Rekayasa Biomedis. Karyanya yang memelopori deep learning medis dan klasifikasi sinyal jantung terus mendorong komputasi medis Indonesia maju.',
      id: 'Ketua AIMed CoE, Prof. Ir. Siti Nurmaini, M.T, Ph.D, telah diakui oleh pengindeksan tahunan Universitas Stanford sebagai bagian dari 2% ilmuwan paling banyak dikutip di seluruh dunia dalam subbidang Kecerdasan Buatan, Visi Komputer, dan Rekayasa Biomedis. Karyanya yang memelopori deep learning medis dan klasifikasi sinyal jantung terus mendorong komputasi medis Indonesia maju.'
    }
  },
  {
    id: 'news-3',
    title: {
      en: 'Seminar Hibrida Internasional tentang Model Deep Learning Terjelaskan untuk Keselamatan Pasien',
      id: 'Seminar Hibrida Internasional tentang Model Deep Learning Terjelaskan untuk Keselamatan Pasien'
    },
    date: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    ],
    content: {
      en: 'AIMed CoE menyelenggarakan seminar hibrida global yang menyoroti \'Kepercayaan Klinis dan Sistem XAI\' yang menampilkan pembicara terhormat dari Universitas Tohoku dan Rumah Sakit Universitas Nasional Singapura. Lebih dari 500 peneliti online bergabung untuk menguji penggunaan Layer-wise Relevance Propagation pada pipa pencitraan klinis.',
      id: 'AIMed CoE menyelenggarakan seminar hibrida global yang menyoroti \'Kepercayaan Klinis dan Sistem XAI\' yang menampilkan pembicara terhormat dari Universitas Tohoku dan Rumah Sakit Universitas Nasional Singapura. Lebih dari 500 peneliti online bergabung untuk menguji penggunaan Layer-wise Relevance Propagation pada pipa pencitraan klinis.'
    }
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: {
      en: 'AIMed Hackathon 2026: AI Solutions for Maternal Health in Southeast Asia',
      id: 'AIMed Hackathon 2026: Solusi AI untuk Kesehatan Ibu di Asia Tenggara'
    },
    date: '2026-08-20',
    time: '09:00 - 17:00 WIB',
    location: {
      en: 'Faculty of Computer Science Hall, Universitas Sriwijaya, Indralaya & Zoom',
      id: 'Aula Fakultas Ilmu Komputer, Universitas Sriwijaya, Indralaya & Zoom'
    },
    type: 'upcoming',
    registerUrl: '#register',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'A 48-hour development challenge for students and medical professionals to devise innovative AI screening tools, segmentation models, or diagnostics targeting maternal and newborn care. GPU resources provided.',
      id: 'Tantangan pengembangan 48 jam bagi mahasiswa dan profesional medis untuk merancang alat skrining AI inovatif, model segmentasi, atau diagnostik yang menargetkan perawatan ibu dan bayi baru lahir. Sumber daya GPU disediakan.'
    }
  },
  {
    id: 'evt-2',
    title: {
      en: 'Deep Learning for Medical Image Segmentation - Intensive Workshop',
      id: 'Deep Learning untuk Segmentasi Citra Medis - Lokakarya Intensif'
    },
    date: '2026-04-12',
    time: '13:00 - 16:30 WIB',
    location: {
      en: 'Digital Diagnostic Lab, Unsri Bukit Palembang Campus',
      id: 'Lab Diagnostik Digital, Kampus Unsri Bukit Palembang'
    },
    type: 'past',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    description: {
      en: 'Hands-on training session on customizing U-Net, Attention Gates, and SegFormer backends using PyTorch and the AIMed-CHD dataset. Led by Dr. Pacu Putra.',
      id: 'Sesi pelatihan langsung tentang penyesuaian backend U-Net, Attention Gates, dan SegFormer menggunakan PyTorch dan dataset AIMed-CHD. Dipimpin oleh Dr. Pacu Putra.'
    }
  }
];

export const COLLABORATIONS: Collaboration[] = [
  {
    id: 'col-1',
    country: { en: 'Indonesia', id: 'Indonesia' },
    countryCode: 'ID',
    institutes: ['RSUP Dr. Mohammad Hoesin Palembang', 'Rumah Sakit Cipto Mangunkusumo (RSCM)', 'Kementerian Kesehatan RI'],
    type: 'hospital',
    projects: [
      { en: 'TeleOTIVA Cervical VIA Rural Trials', id: 'Uji Coba Pedesaan VIA Serviks TeleOTIVA' },
      { en: 'Clinical Echocardiography Ultrasound Validation Registry', id: 'Registri Validasi Ultrasound Ekokardiografi Klinis' }
    ],
    coordinates: { x: 74, y: 73 } // custom positioning coordinates on SVG map
  },
  {
    id: 'col-2',
    country: { en: 'Japan', id: 'Jepang' },
    countryCode: 'JP',
    institutes: ['Tohoku University', 'RIKEN Center for Advanced Intelligence Project'],
    type: 'university',
    projects: [
      { en: 'Anatomical Cycle-GAN Ultrasound Speckel Supression', id: 'Supresi Speckle Ultrasound Cycle-GAN Anatomis' },
      { en: 'Joint Graduate PhD Exchange Fellowships', id: 'Beasiswa Pertukaran Doktor Pascasarjana Bersama' }
    ],
    coordinates: { x: 86, y: 38 }
  },
  {
    id: 'col-3',
    country: { en: 'Singapore', id: 'Singapura' },
    countryCode: 'SG',
    institutes: ['National University Hospital (NUH)', 'NUS School of Computing'],
    type: 'university',
    projects: [
      { en: 'Active Learning Pipelines for Cervical Lesion Classifiers', id: 'Pipa Pembelajaran Aktif untuk Klasifikasi Lesi Serviks' }
    ],
    coordinates: { x: 70, y: 65 }
  },
  {
    id: 'col-4',
    country: { en: 'United States', id: 'Amerika Serikat' },
    countryCode: 'US',
    institutes: ['Stanford AI Lab (SAIL)', 'Massachusetts General Hospital (MGH) AI'],
    type: 'university',
    coordinates: { x: 18, y: 35 },
    projects: [
      { en: 'Transfer Learning Benchmarks in Low-Resource Diagnostics', id: 'Tolok Ukur Transfer Learning dalam Diagnostik Sumber Daya Terbatas' }
    ]
  },
  {
    id: 'col-5',
    country: { en: 'United Kingdom', id: 'Inggris' },
    countryCode: 'GB',
    institutes: ['Oxford Visual Geometry Group (VGG)', 'University College London (UCL) Healthcare AI'],
    type: 'university',
    coordinates: { x: 46, y: 28 },
    projects: [
      { en: 'Interpretable Attention Weights for Fetal Medical Scans', id: 'Bobot Perhatian Terjelaskan untuk Pemindaian Medis Janin' }
    ]
  },
  {
    id: 'col-6',
    country: { en: 'Germany', id: 'Jerman' },
    countryCode: 'DE',
    institutes: ['DKFZ German Cancer Research Center Heidelberg', 'Technical University of Munich (TUM)'],
    type: 'institute',
    coordinates: { x: 50, y: 30 },
    projects: [
      { en: 'Segmenting Microvascular Tumor Borders via GANs', id: 'Segmentasi Batas Tumor Mikrovaskular Melalui GAN' }
    ]
  }
];

export const IMPACT_METRICS = {
  scopusCitations: 1480,
  scholarCitations: 3120,
  publicationsCount: 112,
  patentsCount: 6,
  grantsAmountIDR: '4.5 Billion',
  studentsGraduated: 125,
  internationalCooperations: 15,
  technologyTransfers: 3
};

export const LAB_RESOURCES = {
  gpuCluster: {
    title: { en: 'AIMed Core GPU Cluster', id: 'Kluster GPU Utama AIMed' },
    nodes: [
      { name: 'Node-Alpha (Primary Training)', spec: '4x NVIDIA H100 (80GB SXM5), 1TB RAM, 10Gbps Fiber-link', status: 'active', temp: 68, load: 92 },
      { name: 'Node-Beta (Inference & Host)', spec: '4x NVIDIA A100 (80GB PCIe), 512GB RAM, NVLink Enabled', status: 'active', temp: 64, load: 45 },
      { name: 'Node-Gamma (Medical Segmenters)', spec: '8x NVIDIA RTX 4090 (24GB), 256GB RAM, Dev Box', status: 'idle', temp: 42, load: 5 }
    ]
  },
  medicalDevices: [
    { name: { en: 'Voluson E10 Obstetric Ultrasound System', id: 'Sistem Ultrasound Voluson E10' }, desc: '4D electronic curved matrix probe integration.' },
    { name: { en: 'E-Cervix VIA Digital Video Colposcope', id: 'Kolposkop Video Digital VIA E-Cervix' }, desc: 'High resolution digital optical zooming probe.' },
    { name: { en: 'Mindray DC-80 Ultrasound Station', id: 'Stasiun Ultrasound Mindray DC-80' }, desc: 'Real-time diagnostic stream mirroring.' }
  ]
};

export const OPEN_POSITIONS = [
  {
    id: 'pos-1',
    title: { en: 'PhD Research Fellowship: Explainable Cardiac Deep Learning', id: 'Beasiswa Penelitian PhD: Explainable Cardiac Deep Learning' },
    supervisor: 'Prof. Ir. Siti Nurmaini, M.T, Ph.D',
    scholarship: 'BRIN National Fellowship / Faculty Support',
    requirements: {
      en: ['M.Sc. in Computer Science or Biomedical Eng', 'Proficient in PyTorch, CNNs, Transformers', 'First-author paper in indexed proceedings'],
      id: ['S2 dalam Ilmu Komputer atau Teknik Biomedis', 'Mahir dalam PyTorch, CNN, Transformer', 'Makalah penulis pertama di prosiding terindeks']
    }
  },
  {
    id: 'pos-2',
    title: { en: 'Graduate Research Assistant: Cervical VIA Edge Inference', id: 'Asisten Peneliti Pascasarjana: Inferensi Tepi Cervical VIA' },
    supervisor: 'Dr. Sukemi, M.T.',
    scholarship: 'TeleOTIVA Project Grant Stipend',
    requirements: {
      en: ['B.Sc. in Computer Science (Top 15% class)', 'Solid experience with TensorFlow Lite or ONNX Runtime', 'Indonesian citizenship (mandatory for Kemenkes field trials)'],
      id: ['S1 dalam Ilmu Komputer (15% kelas teratas)', 'Pengalaman solid dengan TensorFlow Lite atau ONNX Runtime', 'Kewarganegaraan Indonesia (wajib untuk uji lapangan Kemenkes)']
    }
  }
];

export const RESEARCH_GUIDES = [
  { name: { en: 'AIMed Publication BibTeX Style Guide', id: 'Panduan Gaya BibTeX Publikasi AIMed' }, size: '1.2 MB', type: 'PDF' },
  { name: { en: 'Fetal US Segmentation Training Notebook', id: 'Notebook Pelatihan Segmentasi US Janin' }, size: '4.8 MB', type: 'IPYNB' },
  { name: { en: 'TeleOTIVA VIA Specular Correct API Blueprint', id: 'Cetak Biru API Koreksi Spekular VIA TeleOTIVA' }, size: '850 KB', type: 'JSON' }
];

export const PARTNERS: Partner[] = [
  {
    id: 'partner-unsri',
    name: 'Universitas Sriwijaya',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Logo_Universitas_Sriwijaya.png',
    websiteUrl: 'https://unsri.ac.id'
  },
  {
    id: 'partner-rsmh',
    name: 'RSUP Dr. Mohammad Hoesin Palembang',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Logo_dr_Mohammad_Hoesin_Hospital.png',
    websiteUrl: 'https://rsmh.co.id'
  },
  {
    id: 'partner-kemenkes',
    name: 'Kementerian Kesehatan Republik Indonesia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Logo_Kementerian_Kesehatan_Republik_Indonesia.png',
    websiteUrl: 'https://kemkes.go.id'
  },
  {
    id: 'partner-brin',
    name: 'Badan Riset dan Inovasi Nasional (BRIN)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Logo_BRIN.png',
    websiteUrl: 'https://brin.go.id'
  },
  {
    id: 'partner-nvidia',
    name: 'NVIDIA Deep Learning Institute',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
    websiteUrl: 'https://nvidia.com'
  },
  {
    id: 'partner-google',
    name: 'Google AI Studio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    websiteUrl: 'https://ai.google'
  }
];

export const SDG_CONTENT: SDGContent = {
  title: {
    en: 'Empowering Global Sustainable Development',
    id: 'Memberdayakan Pembangunan Berkelanjutan Global'
  },
  subtitle: {
    en: 'SDG ALIGNMENT',
    id: 'KESELARASAN SDG'
  },
  sdg3Title: {
    en: 'SDG 3: Good Health & Well-being',
    id: 'SDG 3: Kehidupan Sehat & Sejahtera'
  },
  sdg3Text: {
    en: 'The AIMed Center of Excellence supports SDG 3 (Good Health and Well-being) by developing AI-driven solutions for better disease detection and healthcare delivery.',
    id: 'AIMed Center of Excellence mendukung SDG 3 (Kehidupan Sehat dan Sejahtera) dengan mengembangkan solusi bertenaga AI untuk deteksi penyakit dan pemberian layanan kesehatan yang lebih baik.'
  },
  sdg3Image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sustainable_Development_Goal_03.svg',
  sdg9Title: {
    en: 'SDG 9: Industry, Innovation & Infrastructure',
    id: 'SDG 9: Industri, Inovasi & Infrastruktur'
  },
  sdg9Text: {
    en: 'It also contributes to SDG 9 (Industry, Innovation and Infrastructure) by fostering technological innovation through research in intelligent systems, promoting sustainable healthcare infrastructure, and collaborating with industry to accelerate the adoption of cutting-edge technologies.',
    id: 'Kami juga berkontribusi pada SDG 9 (Industri, Inovasi, dan Infrastruktur) dengan mendorong inovasi teknologi melalui penelitian pada sistem cerdas, mempromosikan infrastruktur layanan kesehatan yang berkelanjutan, dan berkolaborasi dengan industri untuk mempercepat adopsi teknologi mutakhir.'
  },
  sdg9Image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Sustainable_Development_Goal_09.svg'
};

export const CONFERENCES_ORGANIZED = [
  {
    id: 'conf-icaitech',
    title: 'International Conference on Artificial Intelligence & Technology (ICAITech)',
    role: 'Main Organizer',
    date: 'Annual Event',
    location: 'Palembang, Indonesia (Hybrid)',
    stats: 'Global platform for AI & Emerging Technologies research and publications',
    url: 'https://icaitech.org/',
    desc: {
      en: 'In addition to research and innovation, our research group also manages the International Conference on Artificial Intelligence and Technology (ICAITech). This annual conference serves as a global platform for researchers, academics, and industry professionals to present their latest findings, exchange ideas, and explore emerging technological advancements.\n\nThrough ICAITech, we oversee the full conference lifecycle — including call for papers, peer-review coordination, scientific sessions, keynote talks, and proceedings publication — ensuring academic excellence, international collaboration, and impactful contributions to the global research community.',
      id: 'Selain penelitian dan inovasi, kelompok riset kami juga mengelola International Conference on Artificial Intelligence and Technology (ICAITech). Konferensi tahunan ini berfungsi sebagai platform global bagi para peneliti, akademisi, dan profesional industri untuk mempresentasikan temuan terbaru mereka, bertukar ide, dan mengeksplorasi kemajuan teknologi yang berkembang.\n\nMelalui ICAITech, kami mengawasi seluruh siklus konferensi — termasuk panggilan makalah, koordinasi peer-review, sesi ilmiah, ceramah utama, dan publikasi prosiding — memastikan keunggulan akademis, kolaborasi internasional, dan kontribusi berdampak bagi komunitas riset global.'
    }
  }
];

export const JOURNALS_ORGANIZED = [
  {
    id: 'journ-comengapp',
    title: 'Computer Engineering and Applications Journal (ComEngApp)',
    publisher: 'Universitas Sriwijaya',
    issn: 'E-ISSN: 2252-5459; P-ISSN: 2252-4274',
    frequency: '3 issues per year (Feb, Jun, Oct)',
    indexing: 'Scopus (390+ citations), SINTA',
    url: 'https://comengapp.unsri.ac.id/index.php/comengapp/index',
    desc: {
      en: 'The Computer Engineering and Applications Journal (ComEngApp) (E-ISSN: 2252-5459; P-ISSN: 2252-4274) publishes original papers in computer engineering with a strong emphasis on AI-driven engineering and applications. The journal focuses on the development and implementation of Artificial Intelligence (AI), machine learning, deep learning, intelligent systems, computer vision, natural language processing, robotics, embedded systems, and the Internet of Things (IoT) to solve complex engineering and real-world problems.\n\nComEngApp particularly encourages interdisciplinary research that applies AI-driven technologies in areas such as smart engineering systems, healthcare technologies and medical decision support, environmental monitoring, climate and sustainability analysis, smart agriculture, and disaster prediction and management.\n\nThe Computer Engineering and Applications (ComEngApp) Journal continues to demonstrate its growing academic influence as reflected in its citation performance. Based on the latest citation data extracted from the Scopus citing documents report, articles published in ComEngApp have been cited more than 390 times by international scholarly publications.',
      id: 'Computer Engineering and Applications Journal (ComEngApp) (E-ISSN: 2252-5459; P-ISSN: 2252-4274) mempublikasikan makalah asli di bidang teknik komputer dengan penekanan kuat pada rekayasa dan aplikasi berbasis AI. Jurnal ini berfokus pada pengembangan dan implementasi Kecerdasan Buatan (AI), pembelajaran mesin, deep learning, sistem cerdas, visi komputer, pemrosesan bahasa alami, robotika, sistem tertanam, dan Internet of Things (IoT) untuk menyelesaikan masalah teknik dan dunia nyata yang kompleks.\n\nComEngApp sangat mendorong penelitian lintas disiplin yang menerapkan teknologi berbasis AI di bidang-bidang seperti sistem rekayasa cerdas, teknologi kesehatan dan dukungan keputusan medis, pemantauan lingkungan, analisis iklim dan keberlanjutan, pertanian cerdas, serta prediksi dan manajemen bencana.\n\nJurnal Computer Engineering and Applications (ComEngApp) terus menunjukkan pengaruh akademisnya yang terus berkembang sebagaimana tercermin dalam kinerja sitasinya. Berdasarkan data sitasi terbaru yang diekstrak dari laporan dokumen sitasi Scopus, artikel yang dipublikasikan di ComEngApp telah disitasi lebih dari 390 times oleh publikasi ilmiah internasional.'
    }
  }
];

export const PROMOTIONS: any[] = [];

