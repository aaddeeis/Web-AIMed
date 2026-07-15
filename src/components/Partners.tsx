import React from 'react';
import { useData } from '../context/DataContext';
import { Handshake } from 'lucide-react';

interface PartnersProps {
  lang: 'en' | 'id';
}

export default function Partners({ lang }: PartnersProps) {
  const { partners } = useData();

  if (!partners || partners.length === 0) return null;

  // Duplicate the list of partners to create a seamless infinite loop
  const doublePartners = [...partners, ...partners, ...partners];

  return (
    <section id="partners" className="py-16 bg-transparent relative z-10 border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <Handshake size={14} />
          {lang === 'en' ? 'Collaborators & Sponsors' : 'Kolaborator & Sponsor'}
        </div>
        <h2 className="text-3xl font-bold tracking-tight font-display text-gray-900 dark:text-white sm:text-4xl">
          {lang === 'en' ? 'Our Partners' : 'Mitra Kerja Kami'}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-400">
          {lang === 'en' 
            ? 'We collaborate with leading medical institutions, universities, and technology enterprises to pioneer healthcare innovations.'
            : 'Kami berkolaborasi dengan lembaga medis, universitas, dan perusahaan teknologi terkemuka untuk merintis inovasi layanan kesehatan.'}
        </p>
      </div>

      {/* Marquee Logo Container */}
      <div className="relative w-full flex overflow-x-hidden py-4 bg-gray-50/50 dark:bg-black/20 border-y border-gray-100 dark:border-white/5">
        {/* Left and right fade gradients to blend the marquee edges beautifully */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-16 md:gap-24">
          {doublePartners.map((partner, index) => {
            return (
              <a
                key={`${partner.id}-${index}`}
                href={partner.websiteUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center h-16 w-auto min-w-[120px] opacity-100 hover:scale-105 transition-all duration-300 transform"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized lettermark if the URL fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.logo-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'logo-fallback flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold font-display text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900';
                      fallback.innerText = partner.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
