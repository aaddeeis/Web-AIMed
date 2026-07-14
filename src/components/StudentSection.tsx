import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Upload, 
  Users, 
  Award, 
  Compass, 
  GraduationCap,
  Loader2,
  Check,
  X
} from 'lucide-react';
import { Language } from '../types';
import { RESEARCHERS } from '../data/mockData';

interface StudentSectionProps {
  lang: Language;
}

export default function StudentSection({ lang }: StudentSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: 'phd',
    supervisorId: RESEARCHERS[0]?.id || '',
    statement: '',
    cvName: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCvDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setFormData(prev => ({ ...prev, cvName: file.name }));
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleCvSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setFormData(prev => ({ ...prev, cvName: file.name }));
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.cvName) {
      alert(lang === 'en' ? 'Please complete all fields and upload your CV.' : 'Harap lengkapi semua bidang dan unggah CV Anda.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        program: 'phd',
        supervisorId: RESEARCHERS[0]?.id || '',
        statement: '',
        cvName: ''
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="students" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'ACADEMIC FELLOWSHIPS' : 'BEASISWA AKADEMIK'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Admissions & Fellowship Hub' : 'Hub Penerimaan & Beasiswa'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'AIMed CoE offers fully funded PhD positions, Master research lines, and undergraduate research fellowships guided by leading AI experts.'
              : 'AIMed CoE menawarkan posisi PhD yang didanai penuh, jalur penelitian Magister, dan beasiswa penelitian sarjana yang dipandu oleh pakar AI terkemuka.'}
          </p>
        </div>

        {/* Layout split: Open fellowships on Left (7 cols), Interactive App on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Open positions & supervision roles (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white pb-3 border-b border-black/5 dark:border-white/10 tracking-tight flex items-center">
              <GraduationCap className="w-5 h-5 text-teal-500 mr-2" />
              <span>{lang === 'en' ? 'Open Research Pathways' : 'Jalur Penelitian Terbuka'}</span>
            </h3>

            {/* Opportunities cards list */}
            <div className="space-y-4" id="fellowship-roles">
              {[
                {
                  id: 'phd-fellowship',
                  title: { en: 'Fully-Funded PhD Fellowships', id: 'Beasiswa PhD Didanai Penuh' },
                  duration: '3-4 Years',
                  stipend: 'Kemenristek-BRIN / LPDP supported packages',
                  desc: {
                    en: 'Conduct core research on fetal ultrasound deep segmentation or colposcopy VIA anomaly detection. Requires strong Python foundation.',
                    id: 'Melakukan penelitian utama tentang segmentasi mendalam ultrasound janin atau deteksi anomali kolposkopi VIA. Memerlukan dasar Python yang kuat.'
                  }
                },
                {
                  id: 'master-thesis',
                  title: { en: 'Master Research Fellowships (Fasilkom)', id: 'Beasiswa Penelitian Magister (Fasilkom)' },
                  duration: '2 Years',
                  stipend: 'Universitas Sriwijaya research grant schemes',
                  desc: {
                    en: 'Join active project pipelines as lead implementers, managing GPU training runs and writing indexed Scopus papers.',
                    id: 'Bergabung dengan alur proyek aktif sebagai pelaksana utama, mengelola pelatihan GPU dan menulis makalah Scopus terindeks.'
                  }
                },
                {
                  id: 'undergrad-intern',
                  title: { en: 'Undergrad Research Assistantship', id: 'Asisten Penelitian Sarjana' },
                  duration: '6-12 Months',
                  stipend: 'Project incentive models',
                  desc: {
                    en: 'For high-performing Sriwijaya computer science undergrads looking to study deep spatial architectures and data processing.',
                    id: 'Untuk mahasiswa sarjana ilmu komputer Sriwijaya berprestasi tinggi yang ingin mempelajari arsitektur spasial mendalam dan pemrosesan data.'
                  }
                }
              ].map((pos) => (
                <div 
                  key={pos.id}
                  className="glass-card p-6 rounded-2xl shadow-sm space-y-3 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <h4 className="font-extrabold text-slate-900 dark:text-white leading-tight">
                      {lang === 'en' ? pos.title.en : pos.title.id}
                    </h4>
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[9px] font-black rounded uppercase">
                      {pos.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'en' ? pos.desc.en : pos.desc.id}
                  </p>

                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {lang === 'en' ? 'Stipend Support:' : 'Dukungan Dana:'} <strong className="text-slate-600 dark:text-slate-300 font-bold">{pos.stipend}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Direct Admissions application form (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="pb-4 border-b border-black/5 dark:border-white/10">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
                  <Send className="w-4 h-4 text-sky-500 mr-2" />
                  <span>{lang === 'en' ? 'Apply for Fellowship' : 'Daftar Beasiswa'}</span>
                </h3>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-250">
                  <div className="p-3 bg-teal-500/10 text-teal-500 rounded-full inline-block">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white">
                      {lang === 'en' ? 'Application Received' : 'Aplikasi Diterima'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {lang === 'en' 
                        ? 'Thank you for applying to AIMed CoE. Our admissions committee will review your proposal and matching advisor shortly.' 
                        : 'Terima kasih telah mendaftar di AIMed CoE. Komite penerimaan kami akan segera meninjau proposal Anda.'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {lang === 'en' ? 'Full Name' : 'Nama Lengkap'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sriwijaya Student"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/[0.03] rounded-lg outline-none border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., student@unsri.ac.id"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/[0.03] rounded-lg outline-none border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Matching supervisor selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {lang === 'en' ? 'Requested Supervisor' : 'Pembimbing yang Diminta'}
                    </label>
                    <select
                      value={formData.supervisorId}
                      onChange={(e) => setFormData(prev => ({ ...prev, supervisorId: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/[0.03] rounded-lg outline-none border border-black/5 dark:border-white/5 text-slate-750 dark:text-slate-300"
                    >
                      {RESEARCHERS.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* CV file drag and drop area */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {lang === 'en' ? 'Research Proposal / CV (PDF)' : 'Proposal Riset / CV (PDF)'}
                    </label>

                    {formData.cvName ? (
                      <div className="flex items-center justify-between p-3 bg-teal-500/10 border border-teal-500/25 rounded-lg text-teal-700 dark:text-teal-400">
                        <div className="flex items-center space-x-2 truncate">
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          <span className="font-bold text-[11px] truncate">{formData.cvName}</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({ ...prev, cvName: '' }))}
                          className="p-0.5 hover:bg-teal-500/20 rounded text-teal-700 dark:text-teal-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleCvDrop}
                        onClick={() => document.getElementById('cv-file-picker')?.click()}
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                          dragOver 
                            ? 'border-teal-500 bg-teal-500/5' 
                            : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        {isUploading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-slate-400 mx-auto" />
                        ) : (
                          <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        )}
                        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-1">
                          {lang === 'en' ? 'Click or drop CV/Proposal PDF' : 'Klik atau seret PDF CV/Proposal'}
                        </p>
                        <input
                          id="cv-file-picker"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleCvSelect}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{lang === 'en' ? 'Submitting Form...' : 'Mengirim Formulir...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Submit Fellowship Proposal' : 'Kirim Proposal Beasiswa'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
