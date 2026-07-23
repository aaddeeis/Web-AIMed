import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Laptop, Server } from 'lucide-react'

import { useData } from '../context/DataContext'
import type { Language } from '../types'

interface LaboratoryProps {
  lang: Language
}

export default function Laboratory({ lang }: LaboratoryProps) {
  const { infrastructures, isLoading } = useData()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex >= infrastructures.length) setActiveIndex(0)
  }, [activeIndex, infrastructures.length])

  const current = infrastructures[activeIndex]
  const move = (direction: -1 | 1) => {
    if (!infrastructures.length) return
    setActiveIndex((index) => (index + direction + infrastructures.length) % infrastructures.length)
  }

  return (
    <section id="laboratory" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'RESEARCH INFRASTRUCTURE' : 'INFRASTRUKTUR RISET'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4">
            {lang === 'en' ? 'Laboratory & Computing Resources' : 'Laboratorium & Sumber Daya Komputasi'}
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 py-16">{lang === 'en' ? 'Loading infrastructure…' : 'Memuat infrastruktur…'}</div>
        ) : !current ? (
          <div className="glass-card rounded-3xl p-12 text-center text-sm text-slate-500 dark:text-slate-400">
            {lang === 'en' ? 'Infrastructure information is not available yet.' : 'Informasi infrastruktur belum tersedia.'}
          </div>
        ) : (
          <div className="glass-card rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-72 bg-slate-900">
                {current.image ? <img src={current.image} alt={current.name[lang]} className="absolute inset-0 w-full h-full object-cover" /> : <Server className="absolute inset-0 m-auto w-16 h-16 text-slate-600" />}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute left-6 bottom-6 px-3 py-1 rounded-lg bg-white/10 text-white backdrop-blur text-xs font-bold uppercase">{current.type}</span>
              </div>
              <div className="p-7 sm:p-10 space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{current.name[lang]}</h3>
                    {infrastructures.length > 1 && <div className="flex gap-2">
                      <button onClick={() => move(-1)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
                      <button onClick={() => move(1)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
                    </div>}
                  </div>
                  {current.description[lang] && <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{current.description[lang]}</p>}
                </div>
                {current.specification.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.specification.map((specification) => <div key={specification.id || specification.name} className="rounded-xl border border-black/5 dark:border-white/5 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400"><Laptop className="w-3.5 h-3.5" />{specification.name}</div>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{specification.values.join(', ')}</p>
                  </div>)}
                </div>}
              </div>
            </div>
            {infrastructures.length > 1 && <div className="flex justify-center gap-2 p-5 border-t border-black/5 dark:border-white/5">
              {infrastructures.map((item, index) => <button key={item.id} onClick={() => setActiveIndex(index)} aria-label={item.name[lang]} className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-teal-500' : 'w-2 bg-slate-300 dark:bg-slate-700'}`} />)}
            </div>}
          </div>
        )}
      </div>
    </section>
  )
}
