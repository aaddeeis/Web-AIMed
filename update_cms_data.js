const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cms_data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.conferencesOrganized = [
  {
    "id": "conf-icaitech",
    "title": "International Conference on Artificial Intelligence & Technology (ICAITech)",
    "role": "Main Organizer",
    "date": "Annual Event",
    "location": "Palembang, Indonesia (Hybrid)",
    "stats": "Global platform for AI & Emerging Technologies research and publications",
    "url": "https://icaitech.org/",
    "desc": {
      "en": "In addition to research and innovation, our research group also manages the International Conference on Artificial Intelligence and Technology (ICAITech). This annual conference serves as a global platform for researchers, academics, and industry professionals to present their latest findings, exchange ideas, and explore emerging technological advancements.\n\nThrough ICAITech, we oversee the full conference lifecycle — including call for papers, peer-review coordination, scientific sessions, keynote talks, and proceedings publication — ensuring academic excellence, international collaboration, and impactful contributions to the global research community.",
      "id": "Selain penelitian dan inovasi, kelompok riset kami juga mengelola International Conference on Artificial Intelligence and Technology (ICAITech). Konferensi tahunan ini berfungsi sebagai platform global bagi para peneliti, akademisi, dan profesional industri untuk mempresentasikan temuan terbaru mereka, bertukar ide, dan mengeksplorasi kemajuan teknologi yang berkembang.\n\nMelalui ICAITech, kami mengawasi seluruh siklus konferensi — termasuk panggilan makalah, koordinasi peer-review, sesi ilmiah, ceramah utama, dan publikasi prosiding — memastikan keunggulan akademis, kolaborasi internasional, dan kontribusi berdampak bagi komunitas riset global."
    }
  }
];

data.journalsOrganized = [
  {
    "id": "journ-comengapp",
    "title": "Computer Engineering and Applications Journal (ComEngApp)",
    "publisher": "Universitas Sriwijaya",
    "issn": "E-ISSN: 2252-5459; P-ISSN: 2252-4274",
    "frequency": "3 issues per year (Feb, Jun, Oct)",
    "indexing": "Scopus (390+ citations), SINTA",
    "url": "https://comengapp.unsri.ac.id/index.php/comengapp/index",
    "desc": {
      "en": "The Computer Engineering and Applications Journal (ComEngApp) (E-ISSN: 2252-5459; P-ISSN: 2252-4274) publishes original papers in computer engineering with a strong emphasis on AI-driven engineering and applications. The journal focuses on the development and implementation of Artificial Intelligence (AI), machine learning, deep learning, intelligent systems, computer vision, natural language processing, robotics, embedded systems, and the Internet of Things (IoT) to solve complex engineering and real-world problems.\n\nComEngApp particularly encourages interdisciplinary research that applies AI-driven technologies in areas such as smart engineering systems, healthcare technologies and medical decision support, environmental monitoring, climate and sustainability analysis, smart agriculture, and disaster prediction and management.\n\nThe Computer Engineering and Applications (ComEngApp) Journal continues to demonstrate its growing academic influence as reflected in its citation performance. Based on the latest citation data extracted from the Scopus citing documents report, articles published in ComEngApp have been cited more than 390 times by international scholarly publications.",
      "id": "Computer Engineering and Applications Journal (ComEngApp) (E-ISSN: 2252-5459; P-ISSN: 2252-4274) mempublikasikan makalah asli di bidang teknik komputer dengan penekanan kuat pada rekayasa dan aplikasi berbasis AI. Jurnal ini berfokus pada pengembangan dan implementasi Kecerdasan Buatan (AI), pembelajaran mesin, deep learning, sistem cerdas, visi komputer, pemrosesan bahasa alami, robotika, sistem tertanam, dan Internet of Things (IoT) untuk menyelesaikan masalah teknik dan dunia nyata yang kompleks.\n\nComEngApp sangat mendorong penelitian lintas disiplin yang menerapkan teknologi berbasis AI di bidang-bidang seperti sistem rekayasa cerdas, teknologi kesehatan dan dukungan keputusan medis, pemantauan lingkungan, analisis iklim dan keberlanjutan, pertanian cerdas, serta prediksi dan manajemen bencana.\n\nJurnal Computer Engineering and Applications (ComEngApp) terus menunjukkan pengaruh akademisnya yang terus berkembang sebagaimana tercermin dalam kinerja sitasinya. Berdasarkan data sitasi terbaru yang diekstrak dari laporan dokumen sitasi Scopus, artikel yang dipublikasikan di ComEngApp telah disitasi lebih dari 390 kali oleh publikasi ilmiah internasional."
    }
  }
];

data.promotions = [
  {
    "id": "promo-rural",
    "title": {
      "en": "Rural Clinic Telehealth Roadshow & Deployment",
      "id": "Roadshow & Penyebaran Teledokter Klinik Pedesaan"
    },
    "category": "Community Empowerment",
    "date": "March - May 2025",
    "coverage": {
      "en": "15 community health centers in Ogan Ilir & Banyuasin regions equipped with edge-AI portable diagnostic aids.",
      "id": "15 pusat kesehatan masyarakat di wilayah Ogan Ilir & Banyuasin dilengkapi dengan alat bantu diagnostik portabel edge-AI."
    },
    "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    "url": "#"
  },
  {
    "id": "promo-flagship",
    "title": {
      "en": "Flagship National Innovation Gold Award 2024",
      "id": "Penghargaan Emas Inovasi Nasional Unggulan 2024"
    },
    "category": "Recognition",
    "date": "October 2024",
    "coverage": {
      "en": "Awarded by the Ministry of Education & Research for AIMed Ultrasound Denoising Engine. Recognised for high clinical applicability.",
      "id": "Dianugerahi oleh Kementerian Pendidikan & Riset untuk Mesin Ultrasound Denoising AIMed. Diakui karena aplikabilitas klinis yang tinggi."
    },
    "image": "https://images.unsplash.com/photo-1496469888073-80de7e9b97cb?auto=format&fit=crop&q=80&w=800",
    "url": "#"
  },
  {
    "id": "promo-ai-seminar",
    "title": {
      "en": "AI Seminar & Workshop for Medical Students",
      "id": "Seminar & Workshop AI untuk Mahasiswa Kedokteran"
    },
    "category": "Education Promotion",
    "date": "Bi-annual Events",
    "coverage": {
      "en": "Educated over 300+ medical and engineering students in South Sumatra about clinical diagnostics pipelines using deep learning tools.",
      "id": "Mendidik lebih dari 300+ mahasiswa kedokteran dan teknik di Sumatera Selatan tentang saluran diagnostik klinis menggunakan alat pembelajaran mendalam."
    },
    "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    "url": "#"
  }
];

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated cms_data.json with conferencesOrganized, journalsOrganized, and promotions!');
