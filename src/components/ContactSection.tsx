import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  Send, 
  Compass,
  Check,
  Loader2
} from 'lucide-react';
import { Language } from '../types';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative z-10 transition-colors duration-300 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'CONNECT WITH AIMED' : 'TERHUBUNG DENGAN AIMED'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Contact Our Team' : 'Hubungi Tim Kami'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Reach out for research collaborations, dataset clearances, or developer API tokens.'
              : 'Hubungi kami untuk kolaborasi riset, izin dataset, atau token API pengembang.'}
          </p>
        </div>

        {/* Form and Map details grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact details & Google map iframe (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white pb-3 border-b border-black/5 dark:border-white/10 tracking-tight">
                {lang === 'en' ? 'Physical Address & Campus' : 'Alamat Fisik & Kampus'}
              </h3>

              {/* Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-teal-500 mr-2.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-400 block tracking-wider uppercase text-[9px] mb-0.5">Location</span>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        AIMed CoE Research Lab,<br />
                        Fakultas Ilmu Komputer,<br />
                        Universitas Sriwijaya, Indralaya,<br />
                        Sumatera Selatan, Indonesia
                      </p>
                      <a 
                        href="https://maps.app.goo.gl/Xcnx5VyL3Sn9wMzr9" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-teal-600 dark:text-teal-400 hover:underline text-[11px] font-bold mt-2 inline-flex items-center space-x-1"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Open in Google Maps' : 'Buka di Google Maps'}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-sky-500 mr-2.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-400 block tracking-wider uppercase text-[9px]">Email</span>
                      <a href="mailto:aimed.coe@unsri.ac.id" className="text-slate-700 dark:text-slate-300 font-bold hover:text-teal-600">
                        aimed.coe@unsri.ac.id
                      </a>
                    </div>
                  </div>

                  {/* Direct WhatsApp chat */}
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-emerald-500 mr-2.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-400 block tracking-wider uppercase text-[9px]">WhatsApp Direct Chat</span>
                      <a 
                        href="https://wa.me/6281224147003" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center"
                      >
                        <span>0812-2414-7003</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* RIGHT: Dynamic contact form (5 cols) */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between h-full">
            <div className="space-y-5">
              <div className="pb-4 border-b border-black/5 dark:border-white/10">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
                  <Send className="w-4 h-4 text-sky-500 mr-2" />
                  <span>{lang === 'en' ? 'Send Message Form' : 'Kirim Formulir Pesan'}</span>
                </h3>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="p-3 bg-teal-500/10 text-teal-500 rounded-full inline-block">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white">
                      {lang === 'en' ? 'Message Logged' : 'Pesan Masuk'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {lang === 'en' 
                        ? 'Thank you for reaching out. A scientific administrator will respond to your registered email shortly.' 
                        : 'Terima kasih telah menghubungi kami. Administrator ilmiah akan segera merespons email Anda.'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {lang === 'en' ? 'Your Name' : 'Nama Anda'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/[0.04] rounded-lg outline-none border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/20 font-semibold"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., collaborator@hospital.org"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/[0.04] rounded-lg outline-none border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/20 font-semibold"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {lang === 'en' ? 'Message' : 'Pesan'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={lang === 'en' ? 'Describe your research inquiry or custom API request...' : 'Jelaskan pertanyaan penelitian Anda atau permintaan API kustom...'}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-black/5 dark:bg-white/[0.04] rounded-lg outline-none border border-black/5 dark:border-white/5 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/20 resize-none font-semibold"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{lang === 'en' ? 'Sending Message...' : 'Mengirim Pesan...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Send Message' : 'Kirim Pesan'}</span>
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
