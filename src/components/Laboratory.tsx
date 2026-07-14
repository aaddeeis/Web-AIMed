import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Thermometer, 
  Server, 
  Activity, 
  Wifi, 
  Zap, 
  HardDrive,
  Compass
} from 'lucide-react';
import { Language } from '../types';
import { LAB_RESOURCES } from '../data/mockData';

interface LaboratoryProps {
  lang: Language;
}

export default function Laboratory({ lang }: LaboratoryProps) {
  const [nodes, setNodes] = useState(LAB_RESOURCES.gpuCluster.nodes);

  // Simulate active dynamic changes in core nodes loads and temps
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (node.status === 'idle') return node;
        
        // Slightly fluctuate loads and temperatures
        const loadChange = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const tempChange = Math.floor(Math.random() * 5) - 2;   // -2 to +2

        const nextLoad = Math.max(10, Math.min(99, node.load + loadChange));
        const nextTemp = Math.max(50, Math.min(85, node.temp + tempChange));

        return {
          ...node,
          load: nextLoad,
          temp: nextTemp
        };
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="laboratory" className="py-24 bg-transparent relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 dark:text-teal-400 uppercase bg-teal-500/10 px-3.5 py-1.5 rounded-full">
            {lang === 'en' ? 'COMPUTATION LAB & INFRASTRUCTURE' : 'LABORATORIUM KOMPUTASI & INFRASTRUKTUR'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 mb-4">
            {lang === 'en' ? 'Enterprise GPU Computing Lab' : 'Lab Komputasi GPU Perusahaan'}
          </h2>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {lang === 'en' 
              ? 'Our center operates an enterprise-grade computing cluster driving parallel deep learning models for complex clinical testing.'
              : 'Pusat kami mengoperasikan kluster komputasi tingkat perusahaan yang menggerakkan model pembelajaran mendalam paralel untuk pengujian klinis yang kompleks.'}
          </p>
        </div>

        {/* Laboratory Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: GPU Cluster Monitor (8 columns) */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-500 text-white rounded-lg">
                  <Server className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white leading-tight">
                    {lang === 'en' ? LAB_RESOURCES.gpuCluster.title.en : LAB_RESOURCES.gpuCluster.title.id}
                  </h3>
                  <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mt-0.5">
                    Live Telemetry
                  </p>
                </div>
              </div>
              <span className="flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded">
                <Wifi className="w-4 h-4 mr-1.5 animate-bounce" />
                Online
              </span>
            </div>

            {/* GPU Nodes Stack */}
            <div className="space-y-4">
              {nodes.map((node, idx) => {
                const isActive = node.status === 'active';
                return (
                  <div 
                    key={idx}
                    className="bg-black/5 dark:bg-white/[0.03] p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    {/* Specs */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-teal-500 animate-ping' : 'bg-slate-400'}`} />
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {node.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold font-mono">
                        {node.spec}
                      </p>
                    </div>

                    {/* Metrics loads and dials */}
                    <div className="flex items-center space-x-8">
                      {/* load stat bar */}
                      <div className="space-y-1.5 w-24">
                        <div className="flex justify-between text-[10px] font-extrabold text-slate-400">
                          <span className="uppercase">Core Load</span>
                          <span>{node.load}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                            style={{ width: `${node.load}%` }}
                          />
                        </div>
                      </div>

                      {/* temperature meter */}
                      <div className="flex items-center space-x-1.5 text-slate-500">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Temp</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-mono">
                            {node.temp}°C
                          </span>
                        </div>
                      </div>

                      {/* power gauge */}
                      <div className="flex items-center space-x-1.5 text-slate-500">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase">Power</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-mono">
                            {isActive ? 'High' : 'Standby'}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Associated Diagnostic Devices (4 columns) */}
          <div className="lg:col-span-4 glass-panel p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="pb-4 border-b border-black/5 dark:border-white/10">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center">
                  <Compass className="w-4 h-4 text-sky-500 mr-2" />
                  <span>{lang === 'en' ? 'Clinical Imaging Hardware' : 'Perangkat Pencitraan Klinis'}</span>
                </h3>
              </div>

              {/* Hardware List */}
              <div className="space-y-4">
                {LAB_RESOURCES.medicalDevices.map((dev, idx) => (
                  <div 
                    key={idx}
                    className="bg-black/5 dark:bg-white/[0.03] p-4 rounded-xl border border-black/5 dark:border-white/5 shadow-xs space-y-1"
                  >
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {lang === 'en' ? dev.name.en : dev.name.id}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {dev.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compute allocation status */}
            <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-start space-x-3">
              <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0 animate-bounce" />
              <div>
                <span className="font-bold text-[11px] text-teal-700 dark:text-teal-400 block uppercase tracking-wider">
                  {lang === 'en' ? 'Cluster Capacity Allocator' : 'Alokator Kapasitas Kluster'}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                  {lang === 'en' 
                    ? '82% of GPU training bandwidth is actively partitioned for fetal CHD model refinement pipelines.'
                    : '82% dari bandwidth pelatihan GPU dialokasikan secara aktif untuk pemurnian model PJB janin.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
