import React, { useEffect, useRef, useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  BookOpen, 
  Award, 
  ChevronDown, 
  Users, 
  Network, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import { Language } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
  lang: Language;
  setActiveSection: (s: string) => void;
}

export default function Hero({ lang, setActiveSection }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stats, setStats] = useState({
    pubs: 0,
    projects: 0,
    researchers: 0,
    students: 0,
    collabs: 0,
    awards: 0
  });

  // Smooth stat counter increments on load
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        pubs: Math.min(Math.round((112 / steps) * step), 112),
        projects: Math.min(Math.round((28 / steps) * step), 28),
        researchers: Math.min(Math.round((50 / steps) * step), 50),
        students: Math.min(Math.round((100 / steps) * step), 100),
        collabs: Math.min(Math.round((15 / steps) * step), 15),
        awards: Math.min(Math.round((20 / steps) * step), 20)
      });

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Neural network particle background simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }[] = [];

    // Initialize random biological-like floating nodes
    const numParticles = 45;
    const colors = ['rgba(15, 118, 110, 0.4)', 'rgba(11, 79, 108, 0.4)', 'rgba(37, 99, 235, 0.3)', 'rgba(20, 184, 166, 0.4)'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with thin webbing
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Connection thresholds
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(15, 118, 110, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCtaClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-b border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      {/* Network Connectome Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
      />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full filter blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/10 w-[450px] h-[450px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full filter blur-3xl -z-10 animate-bounce duration-10000" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 lg:pt-28 pb-8 z-10 flex-grow flex flex-col justify-center">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag / Institution Subtext */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-full text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-teal-500 animate-pulse" />
            <span>Fakultas Ilmu Komputer • Universitas Sriwijaya</span>
          </div>

          {/* Premium Headline */}
          <div className="tracking-tight mb-8">
            {lang === 'en' ? (
              <div className="flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, y: -30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 15,
                    duration: 0.8 
                  }}
                  className="block text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
                >
                  Artificial Intelligence-Medical
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 15,
                    delay: 0.2,
                    duration: 0.8 
                  }}
                  className="block text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600 bg-clip-text text-transparent filter drop-shadow-xs leading-[1.15]"
                >
                  Center of Excellence
                </motion.span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, y: -30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 15,
                    duration: 0.8 
                  }}
                  className="block text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
                >
                  Kecerdasan Buatan-Medis
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 15,
                    delay: 0.2,
                    duration: 0.8 
                  }}
                  className="block text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600 bg-clip-text text-transparent filter drop-shadow-xs leading-[1.15]"
                >
                  Pusat Unggulan
                </motion.span>
              </div>
            )}
          </div>

          {/* Animated Tagline Block */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 my-8 font-sans text-xs sm:text-sm tracking-wider uppercase font-semibold"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }} 
              className="flex items-center space-x-2 px-4 py-2 bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/10 dark:border-teal-500/20 rounded-xl shadow-xs hover:scale-105 transition-all duration-300"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-200">We Learn.</span>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }} 
              className="flex items-center space-x-2 px-4 py-2 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/10 dark:border-sky-500/20 rounded-xl shadow-xs hover:scale-105 transition-all duration-300"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-200">We Collaborate.</span>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }} 
              className="flex items-center space-x-2 px-4 py-2 bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/10 dark:border-violet-500/20 rounded-xl shadow-xs hover:scale-105 transition-all duration-300"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-200">We Discover.</span>
            </motion.div>
          </motion.div>

          {/* Dynamic Subtitle */}
          <div className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-4xl mx-auto mb-10 leading-relaxed">
            {lang === 'en' ? (
              <>
                The Artificial Intelligence-Medical Center of Excellence (AIMed CoE) is a leading center of excellence composed of researchers and members from diverse academic levels, including lecturers, undergraduate students, graduate students, and postgraduate scholars from the Faculty of Computer Science, Universitas Sriwijaya, Indonesia. AIMed CoE was established in 2018, which houses the{' '}
                <a 
                  href="http://isysrg.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center font-semibold"
                >
                  Intelligent System research group (ISys RG)
                </a>{' '}
                and the{' '}
                <a 
                  href="https://fasilkom.unsri.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center font-semibold"
                >
                  Medical Immersive Technology RG (MIT RG)
                </a>.
              </>
            ) : (
              <>
                Artificial Intelligence-Medical Center of Excellence (AIMed CoE) adalah pusat unggulan terkemuka yang terdiri dari peneliti dan anggota dari berbagai jenjang akademik, termasuk dosen, mahasiswa sarjana, mahasiswa magister, dan akademisi pascasarjana dari Fakultas Ilmu Komputer, Universitas Sriwijaya, Indonesia. AIMed CoE didirikan pada tahun 2018, yang menaungi{' '}
                <a 
                  href="http://isysrg.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center font-semibold"
                >
                  Intelligent System research group (ISys RG)
                </a>{' '}
                dan{' '}
                <a 
                  href="https://fasilkom.unsri.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center font-semibold"
                >
                  Medical Immersive Technology RG (MIT RG)
                </a>.
              </>
            )}
          </div>

          {/* Action Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => handleCtaClick('showcase')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0B4F6C] to-[#0F766E] text-white font-semibold rounded-xl shadow-xl shadow-[#0B4F6C]/20 hover:shadow-[#0B4F6C]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{lang === 'en' ? 'View Products' : 'Lihat Produk'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleCtaClick('performance')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold rounded-xl backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>{lang === 'en' ? 'View Publications' : 'Lihat Publikasi'}</span>
            </button>

            <button
              onClick={() => handleCtaClick('students')}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/20 hover:bg-teal-500/25 text-teal-700 dark:text-teal-300 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{lang === 'en' ? 'Join Our Team' : 'Gabung Bersama'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Counter Segment */}
      <div className="w-full z-10 border-t border-black/5 dark:border-white/5 bg-white/30 dark:bg-slate-950/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            {/* Stat Item 1 */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                {stats.pubs}+
              </p>
              <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {lang === 'en' ? 'Publications' : 'Publikasi'}
              </p>
            </div>

            {/* Stat Item 2 */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                {stats.projects}+
              </p>
              <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {lang === 'en' ? 'Research Projects' : 'Proyek Riset'}
              </p>
            </div>

            {/* Stat Item 3 */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                {stats.researchers}+
              </p>
              <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {lang === 'en' ? 'Researchers' : 'Peneliti'}
              </p>
            </div>

            {/* Stat Item 4 */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                {stats.students}+
              </p>
              <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {lang === 'en' ? 'Students' : 'Mahasiswa'}
              </p>
            </div>

            {/* Stat Item 5 */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                {stats.collabs}+
              </p>
              <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {lang === 'en' ? 'Collaborations' : 'Kolaborasi'}
              </p>
            </div>

            {/* Stat Item 6 */}
            <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-sm">
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                {stats.awards}+
              </p>
              <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                {lang === 'en' ? 'Awards' : 'Penghargaan'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animated scroll indicator */}
      <div 
        onClick={() => handleCtaClick('research')}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300 hidden md:flex"
      >
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">
          {lang === 'en' ? 'Scroll Down' : 'Gulir Bawah'}
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center p-1.5 animate-bounce">
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
