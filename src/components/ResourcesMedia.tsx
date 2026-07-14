import React, { useState } from 'react';
import { 
  Terminal, 
  Download, 
  ExternalLink, 
  FileText, 
  Compass, 
  Cpu, 
  Github,
  Check,
  Copy
} from 'lucide-react';
import { Language } from '../types';

interface ResourcesMediaProps {
  lang: Language;
}

export default function ResourcesMedia({ lang }: ResourcesMediaProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const pythonSnippet = `import requests

# 1. Define model diagnostic endpoint (CHDxAI Chamber Segmenter)
url = "https://aimed.unsri.ac.id/api/v1/predict"
payload = {
    "model_id": "chdxai-v2",
    "image_url": "https://clinical-samples.org/scan-12.jpg"
}
headers = {
    "Authorization": "Bearer YOUR_AIMED_TOKEN"
}

# 2. Trigger server-side diagnostic inference
response = requests.post(url, json=payload, headers=headers)
result = response.json()

# 3. Print spatial predictions and Grad-CAM coordinate overlays
print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']}%")
print(f"Thermal Map Coordinates: {result['heatmap_coordinates']}")`;

  const copySnippet = () => {
    navigator.clipboard.writeText(pythonSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="resources" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'OPEN RESEARCH ASSETS' : 'ASET PENELITIAN TERBUKA'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Software & Developer Resources' : 'Sumber Daya Perangkat Lunak & Pengembang'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Access our official model APIs, download funding proposal templates, or check open-source repositories.'
              : 'Akses API model resmi kami, unduh templat proposal pendanaan, atau periksa repositori sumber terbuka.'}
          </p>
        </div>

        {/* Resources bento layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Public API Sandbox (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div className="flex items-center space-x-2.5">
                <Terminal className="w-5 h-5 text-teal-400 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    {lang === 'en' ? 'AIMed REST API v1 Sandbox' : 'Sandbox REST API AIMed v1'}
                  </h3>
                  <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest mt-0.5">
                    Python SDK Integration
                  </p>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={copySnippet}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Syntax block */}
            <pre className="overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed max-h-72 p-4 bg-black/40 rounded-xl border border-white/5">
              <code>{pythonSnippet}</code>
            </pre>

            {/* API meta info */}
            <div className="pt-4 border-t border-white/5 text-[10px] text-slate-500 flex justify-between items-center">
              <span>Endpoint: <strong className="text-slate-400 font-bold font-mono">/api/v1/predict</strong></span>
              <span className="text-teal-400 font-bold">● Rate Limit: 100 req/min</span>
            </div>
          </div>

          {/* RIGHT: Document Downloads & Software indices (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white pb-3 border-b border-black/5 dark:border-white/10 tracking-tight flex items-center">
                <Cpu className="w-4 h-4 text-sky-500 mr-2" />
                <span>{lang === 'en' ? 'Downloads & Repositories' : 'Unduhan & Repositori'}</span>
              </h3>

              {/* List links */}
              <div className="space-y-4">
                {/* Proposal Template */}
                <div className="bg-black/5 dark:bg-white/[0.03] p-4 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-between shadow-2xs hover:-translate-y-0.5 transition-all">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {lang === 'en' ? 'Research Proposal Template (Docx)' : 'Templat Proposal Riset (Docx)'}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Size: 1.2MB • PDF / MS Word</p>
                  </div>
                  <a 
                    href="#" 
                    className="p-2 bg-black/5 hover:bg-black/10 dark:bg-white/[0.04] dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 rounded-lg"
                    title="Download Template"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                {/* API Auth guide */}
                <div className="bg-black/5 dark:bg-white/[0.03] p-4 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-between shadow-2xs hover:-translate-y-0.5 transition-all">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {lang === 'en' ? 'REST API Auth Guide (PDF)' : 'Panduan Otorisasi REST API (PDF)'}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Size: 450KB • v1.4 Reference</p>
                  </div>
                  <a 
                    href="#" 
                    className="p-2 bg-black/5 hover:bg-black/10 dark:bg-white/[0.04] dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 rounded-lg"
                    title="Download Guide"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                {/* Github model zoo */}
                <div className="bg-black/5 dark:bg-white/[0.03] p-4 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-between shadow-2xs hover:-translate-y-0.5 transition-all">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {lang === 'en' ? 'AIMed Deep Model Zoo (PyTorch)' : 'Kebun Binatang Model Mendalam AIMed'}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Open source checkpoints on GitHub</p>
                  </div>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-black/5 hover:bg-black/10 dark:bg-white/[0.04] dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 rounded-lg"
                    title="Open Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Developer warning */}
            <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl text-[10px] text-slate-500 leading-normal">
              {lang === 'en' 
                ? 'To request enterprise API tokens for hospital production server endpoints, contact our lead developer in the Contact Section.'
                : 'Untuk meminta token API perusahaan bagi titik akhir server produksi rumah sakit, hubungi pengembang utama kami di Bagian Kontak.'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
