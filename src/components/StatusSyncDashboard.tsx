import React, { useState, useEffect } from 'react';
import { 
  Check, 
  AlertTriangle, 
  Database, 
  ExternalLink, 
  Loader2, 
  RefreshCw, 
  Play, 
  Copy, 
  Server, 
  Wifi, 
  Globe, 
  Activity,
  FileText
} from 'lucide-react';

interface StatusSyncDashboardProps {
  lang: 'en' | 'id';
}

export const StatusSyncDashboard: React.FC<StatusSyncDashboardProps> = ({ lang }) => {
  const [status, setStatus] = useState<any>({
    dbConnected: false,
    supabaseConnected: false,
    githubConnected: false,
    repoSynced: false,
    vercelDeploySuccess: false,
    vercelDeployStatus: "Idle",
    lastPublish: "",
    lastCommit: "",
    lastDeploy: "",
    lastError: "",
    productionUrl: "https://web-aimed.vercel.app"
  });

  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState({ text: '', type: '' });
  const [copied, setCopied] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/sync/status');
      if (res.ok) {
        const result = await res.json();
        if (result.status === 'success' && result.syncStatus) {
          setStatus(result.syncStatus);
        }
      }
    } catch (err) {
      console.error('Failed to fetch sync status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh status every 15 seconds to monitor Vercel build transitions
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleTestConnections = async () => {
    setTesting(true);
    try {
      const res = await fetch('/api/sync/test-connections', { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        if (result.status === 'success' && result.syncStatus) {
          setStatus(result.syncStatus);
        }
      }
    } catch (err) {
      console.error('Failed testing connections:', err);
    } finally {
      setTesting(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm(lang === 'en' 
      ? 'Are you sure you want to seed the Supabase database with the current local cms_data.json backup? This will overwrite existing values in Supabase.' 
      : 'Apakah Anda yakin ingin menyemai database Supabase dengan backup local cms_data.json? Ini akan menimpa nilai yang ada di Supabase.')) {
      return;
    }

    setSeeding(true);
    setSeedMsg({ text: '', type: '' });
    try {
      const res = await fetch('/api/sync/seed', { method: 'POST' });
      const result = await res.json();
      if (res.ok && result.status === 'success') {
        setSeedMsg({
          text: lang === 'en' ? 'Database successfully seeded!' : 'Database berhasil disemai!',
          type: 'success'
        });
        fetchStatus();
      } else {
        setSeedMsg({
          text: result.error || (lang === 'en' ? 'Failed to seed database.' : 'Gagal menyemai database.'),
          type: 'error'
        });
      }
    } catch (err: any) {
      setSeedMsg({
        text: err.message || String(err),
        type: 'error'
      });
    } finally {
      setSeeding(false);
    }
  };

  const handleCopySQL = () => {
    const sql = `CREATE TABLE IF NOT EXISTS public.cms_sections (
  section_name TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_sections;`;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return '-';
    try {
      const d = new Date(isoStr);
      return d.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {lang === 'en' ? 'Fetching integration metrics...' : 'Mengambil metrik integrasi...'}
        </p>
      </div>
    );
  }

  const checklistItems = [
    {
      key: 'dbConnected',
      title: lang === 'en' ? 'Database Connected' : 'Database Terhubung',
      desc: lang === 'en' ? 'PostgreSQL schema status and table accessibility' : 'Status skema PostgreSQL dan aksesibilitas tabel',
      status: status.dbConnected,
      icon: Database
    },
    {
      key: 'supabaseConnected',
      title: lang === 'en' ? 'Supabase Connected' : 'Supabase Terhubung',
      desc: lang === 'en' ? 'REST API & websocket connection validation' : 'Validasi koneksi REST API & websocket',
      status: status.supabaseConnected,
      icon: Server
    },
    {
      key: 'githubConnected',
      title: lang === 'en' ? 'GitHub Connected' : 'GitHub Terhubung',
      desc: lang === 'en' ? 'Personal Access Token and repository handshake' : 'Personal Access Token dan persetujuan repositori',
      status: status.githubConnected,
      icon: Wifi
    },
    {
      key: 'repoSynced',
      title: lang === 'en' ? 'Repository Synced' : 'Repositori Sinkron',
      desc: lang === 'en' ? 'Backup files matched to production branch' : 'Kesesuaian file backup dengan branch produksi',
      status: status.repoSynced,
      icon: Activity
    },
    {
      key: 'vercelDeploySuccess',
      title: lang === 'en' ? 'Vercel Deploy Success' : 'Deploy Vercel Sukses',
      desc: lang === 'en' ? 'Latest deployment status of the website' : 'Status rilis kompilasi situs web terbaru',
      status: status.vercelDeploySuccess,
      icon: Globe
    }
  ];

  return (
    <div className="space-y-6 pb-10">
      
      {/* Banner Error if exists */}
      {status.lastError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Latest Transaction Error' : 'Kesalahan Transaksi Terakhir'}
            </h5>
            <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed font-mono">
              {status.lastError}
            </p>
          </div>
        </div>
      )}

      {/* Grid: Indicators and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Checklist (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Integration Health Indicators' : 'Indikator Kesehatan Integrasi'}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {lang === 'en' ? 'Status checks of full-stack data pipelines' : 'Pengecekan status pipa data full-stack'}
                </p>
              </div>
              
              <button
                onClick={handleTestConnections}
                disabled={testing}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                {testing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>{lang === 'en' ? 'Verify Now' : 'Verifikasi Sekarang'}</span>
              </button>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5">
              {checklistItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2 rounded-xl ${
                        item.status 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 dark:text-white">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.key === 'vercelDeploySuccess' && status.vercelDeployStatus === 'Building' ? (
                        <span className="px-2.5 py-1 text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/10 rounded-full flex items-center space-x-1 animate-pulse">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          <span>{lang === 'en' ? 'Building...' : 'Membangun...'}</span>
                        </span>
                      ) : item.status ? (
                        <span className="px-2.5 py-1 text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-full flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{lang === 'en' ? 'Active' : 'Aktif'}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[9px] font-bold bg-red-500/10 text-red-500 border border-red-500/10 rounded-full flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>{lang === 'en' ? 'Inactive' : 'Tidak Aktif'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sync Times & Info Panel (Right 1 col) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider border-b border-black/5 dark:border-white/5 pb-3">
              {lang === 'en' ? 'Deployment & Pipeline Logs' : 'Log Rilis & Jalur Sinkronisasi'}
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Last Publish' : 'Publikasi Terakhir'}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                  {formatDate(status.lastPublish)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Last GitHub Commit' : 'Commit GitHub Terakhir'}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                  {formatDate(status.lastCommit)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Last Vercel Trigger' : 'Pemicu Vercel Terakhir'}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                  {formatDate(status.lastDeploy)}
                </span>
              </div>

              <div className="flex flex-col border-t border-black/5 dark:border-white/5 pt-3.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Production URL' : 'Link Web Produksi'}
                </span>
                <a 
                  href={status.productionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center space-x-1 mt-1 break-all"
                >
                  <span>{status.productionUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Action Helper: Seed database */}
          <div className="bg-slate-100/60 dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-3.5 shadow-sm">
            <div>
              <h5 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                {lang === 'en' ? 'Initial DB Seeding Helper' : 'Penyemai Database Awal'}
              </h5>
              <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                {lang === 'en'
                  ? 'If Supabase is blank, use this button to populate/bootstrap it with existing backup CMS data in one click.'
                  : 'Jika Supabase masih kosong, gunakan tombol ini untuk menyemai database dengan data cadangan CMS lokal Anda dalam satu klik.'}
              </p>
            </div>

            <button
              onClick={handleSeedDatabase}
              disabled={seeding || !status.supabaseConnected}
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              {seeding ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span>{lang === 'en' ? 'Seed Supabase Data' : 'Semai Data Supabase'}</span>
            </button>

            {seedMsg.text && (
              <p className={`text-[10px] font-bold text-center ${
                seedMsg.type === 'success' ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {seedMsg.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SQL Setup Guide (Bento Box) */}
      {!status.dbConnected && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
                  {lang === 'en' ? 'Required Database Schema Setup' : 'Penyusunan Skema Database Diperlukan'}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {lang === 'en' ? 'Run this query inside your Supabase SQL Editor' : 'Jalankan kueri ini di dalam SQL Editor Supabase Anda'}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopySQL}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
              title={lang === 'en' ? 'Copy SQL' : 'Salin SQL'}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="bg-black/50 rounded-2xl p-4 font-mono text-[11px] text-teal-400 overflow-x-auto border border-white/5 whitespace-pre leading-relaxed">
{`CREATE TABLE IF NOT EXISTS public.cms_sections (
  section_name TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable realtime support for updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_sections;`}
          </div>

          <p className="text-[10px] text-slate-400 leading-normal">
            {lang === 'en' 
              ? 'By enabling realtime on the cms_sections table, all changes made in this admin panel will automatically propagate and instantly refresh any connected client or Vercel production website in real-time.'
              : 'Dengan mengaktifkan dukungan realtime di tabel cms_sections, semua perubahan yang dibuat di panel admin ini akan otomatis dikirim dan memperbarui klien yang terhubung atau situs web produksi Vercel secara instan.'}
          </p>
        </div>
      )}

    </div>
  );
};
