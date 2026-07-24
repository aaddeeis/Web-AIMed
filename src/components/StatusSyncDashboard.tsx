import React, { useState, useEffect } from 'react';
import { 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  Loader2, 
  RefreshCw, 
  ArrowDown, 
  ArrowUp, 
  Github, 
  Globe, 
  Activity,
  FileText
} from 'lucide-react';
import { safeLocalStorage } from '../lib/safeStorage';
import { useData } from '../context/DataContext';

interface StatusSyncDashboardProps {
  lang: 'en' | 'id';
}

export const StatusSyncDashboard: React.FC<StatusSyncDashboardProps> = ({ lang }) => {
  const { exportData } = useData();
  const [status, setStatus] = useState<any>({
    localUpdated: true,
    githubSynced: false,
    vercelDeploySuccess: false,
    vercelDeployStatus: "Idle", // Idle, Building, Success, Failed
    lastPublish: "",
    lastCommit: "",
    lastDeploy: "",
    lastError: "",
    repoStatus: "Local Only", // Synced, Out of Sync, Conflict, Local Only
    lastSyncTime: "",
    loadedSha: "",
    productionUrl: "https://aimedcoe.vercel.app/"
  });

  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [pushing, setPushing] = useState(false);
  const [actionMsg, setActionMsg] = useState({ text: '', type: '' });

  const getSyncHeaders = () => {
    const token = safeLocalStorage.getItem('cms_github_token') || '';
    const owner = safeLocalStorage.getItem('cms_github_owner') || 'aaddeeis';
    const repo = safeLocalStorage.getItem('cms_github_repo') || 'Web-AIMed';
    const branch = safeLocalStorage.getItem('cms_github_branch') || 'main';
    return {
      'X-GitHub-Token': token,
      'X-GitHub-Owner': owner,
      'X-GitHub-Repo': repo,
      'X-GitHub-Branch': branch
    };
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/sync/status', {
        headers: getSyncHeaders()
      });
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
    // Refresh status every 12 seconds to monitor Vercel build transitions
    const interval = setInterval(fetchStatus, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleTestConnections = async () => {
    setTesting(true);
    setActionMsg({ text: '', type: '' });
    try {
      const res = await fetch('/api/sync/test-connections', { 
        method: 'POST',
        headers: getSyncHeaders()
      });
      if (res.ok) {
        const result = await res.json();
        if (result.status === 'success' && result.syncStatus) {
          setStatus(result.syncStatus);
          setActionMsg({
            text: lang === 'en' ? 'Connection test complete!' : 'Uji koneksi selesai!',
            type: 'success'
          });
        }
      }
    } catch (err) {
      console.error('Failed testing connections:', err);
    } finally {
      setTesting(false);
    }
  };

  const handlePullData = async () => {
    const confirmMsg = lang === 'en'
      ? 'Are you sure you want to pull the latest file from GitHub? This will overwrite your local unsaved changes with the version from GitHub.'
      : 'Apakah Anda yakin ingin menarik data terbaru dari GitHub? Ini akan menimpa perubahan lokal Anda yang belum disimpan dengan versi dari GitHub.';
    
    if (!window.confirm(confirmMsg)) return;

    setPulling(true);
    setActionMsg({ text: '', type: '' });
    try {
      const res = await fetch('/api/sync/pull', { 
        method: 'POST',
        headers: getSyncHeaders()
      });
      const result = await res.json();
      if (res.ok && result.status === 'success') {
        setStatus(result.syncStatus);
        setActionMsg({
          text: lang === 'en' ? 'Successfully pulled data from GitHub repository!' : 'Berhasil mengambil data dari repositori GitHub!',
          type: 'success'
        });
        // Force refresh page after a small delay to load new data
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setActionMsg({
          text: result.error || (lang === 'en' ? 'Failed to pull data from GitHub.' : 'Gagal menarik data dari GitHub.'),
          type: 'error'
        });
      }
    } catch (err: any) {
      setActionMsg({
        text: err.message || String(err),
        type: 'error'
      });
    } finally {
      setPulling(false);
    }
  };

  const handlePushData = async () => {
    const confirmMsg = lang === 'en'
      ? 'Force push local cms_data.json to GitHub repository? This will overwrite the version on GitHub branch and trigger a Vercel rebuild.'
      : 'Paksa kirim cms_data.json lokal ke repositori GitHub? Ini akan menimpa versi di branch GitHub dan memicu bangun ulang Vercel.';

    if (!window.confirm(confirmMsg)) return;

    setPushing(true);
    setActionMsg({ text: '', type: '' });
    try {
      const dataStr = exportData();
      let parsedData = null;
      try {
        parsedData = JSON.parse(dataStr);
      } catch (e) {}

      const res = await fetch('/api/sync/push', { 
        method: 'POST',
        headers: {
          ...getSyncHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: parsedData
        })
      });
      const result = await res.json();
      if (res.ok && result.status === 'success') {
        setStatus(result.syncStatus);
        setActionMsg({
          text: lang === 'en' ? 'Successfully pushed data and triggered Vercel redeployment!' : 'Berhasil mengirim data dan memicu rilis ulang Vercel!',
          type: 'success'
        });
      } else {
        setActionMsg({
          text: result.error || (lang === 'en' ? 'Failed to push data to GitHub.' : 'Gagal mengirim data ke GitHub.'),
          type: 'error'
        });
      }
    } catch (err: any) {
      setActionMsg({
        text: err.message || String(err),
        type: 'error'
      });
    } finally {
      setPushing(false);
    }
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
          {lang === 'en' ? 'Fetching sync metrics...' : 'Mengambil metrik sinkronisasi...'}
        </p>
      </div>
    );
  }

  const checklistItems = [
    {
      key: 'localUpdated',
      title: lang === 'en' ? 'Local cms_data.json Updated' : 'cms_data.json Lokal Diperbarui',
      desc: lang === 'en' ? 'Durable local file write status' : 'Status penulisan file lokal yang awet',
      status: status.localUpdated,
      icon: FileText
    },
    {
      key: 'githubSynced',
      title: lang === 'en' ? 'GitHub Synced' : 'GitHub Tersinkron',
      desc: lang === 'en' ? 'GitHub push status & token permission' : 'Status push GitHub & izin akses token',
      status: status.githubSynced,
      icon: Github
    },
    {
      key: 'vercelDeploySuccess',
      title: lang === 'en' ? 'Vercel Deployment Success' : 'Rilis Web Vercel Sukses',
      desc: lang === 'en' ? 'Redeployment build status on production server' : 'Status bangun rilis ulang di server produksi',
      status: status.vercelDeploySuccess,
      icon: Globe
    }
  ];

  return (
    <div className="space-y-6 pb-10">
      
      {/* Banner Error if exists */}
      {status.lastError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-3 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Sync Transaction Warning' : 'Peringatan Transaksi Sinkronisasi'}
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
                  {lang === 'en' ? 'Synchronization Pipeline Health' : 'Kesehatan Jalur Sinkronisasi'}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {lang === 'en' ? 'Status checks of local-to-GitHub data pipelines' : 'Pengecekan status pipa data lokal-ke-GitHub'}
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
                <span>{lang === 'en' ? 'Check Now' : 'Periksa Sekarang'}</span>
              </button>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5">
              {checklistItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
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
                          <span>{lang === 'en' ? 'Success' : 'Sukses'}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[9px] font-bold bg-red-500/10 text-red-500 border border-red-500/10 rounded-full flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>{lang === 'en' ? 'Pending' : 'Tertunda'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Helper: Pull or Push Manual */}
          <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                {lang === 'en' ? 'Manual Sync Controllers' : 'Kontrol Sinkronisasi Manual'}
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {lang === 'en' 
                  ? 'Resolve conflicts or force update the data flow manually' 
                  : 'Selesaikan konflik atau paksa pembaruan alur data secara manual'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tarik Data */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3 border border-black/5 dark:border-white/5">
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {lang === 'en' ? 'Pull Latest Data' : 'Tarik Data Terbaru'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {lang === 'en'
                    ? 'Pull the newest cms_data.json from GitHub, replacing your local cache. Helps resolve conflict state.'
                    : 'Tarik cms_data.json terbaru dari GitHub untuk menimpa cache lokal. Membantu menyelesaikan status konflik.'}
                </p>
                <button
                  onClick={handlePullData}
                  disabled={pulling || status.repoStatus === 'Local Only'}
                  className="px-3 py-2 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-[11px] rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  {pulling ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5" />
                  )}
                  <span>{lang === 'en' ? 'Pull & Refresh' : 'Tarik & Refresh'}</span>
                </button>
              </div>

              {/* Kirim Data */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3 border border-black/5 dark:border-white/5">
                <div className="flex items-center space-x-2">
                  <ArrowUp className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {lang === 'en' ? 'Push Local Changes' : 'Kirim Perubahan Lokal'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {lang === 'en'
                    ? 'Force push local cms_data.json to GitHub repository, overwriting remote and triggering Vercel build.'
                    : 'Paksa push cms_data.json lokal ke repositori GitHub, menimpa data jarak jauh dan memicu build Vercel.'}
                </p>
                <button
                  onClick={handlePushData}
                  disabled={pushing || status.repoStatus === 'Local Only'}
                  className="px-3 py-2 w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-[11px] rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  {pushing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ArrowUp className="w-3.5 h-3.5" />
                  )}
                  <span>{lang === 'en' ? 'Force Push & Deploy' : 'Paksa Push & Rilis'}</span>
                </button>
              </div>
            </div>

            {actionMsg.text && (
              <div className={`p-3 rounded-xl border text-[11px] font-semibold flex items-center space-x-2 animate-fade-in ${
                actionMsg.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                  : 'bg-red-500/10 border-red-500/20 text-red-500'
              }`}>
                <span>{actionMsg.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sync Times & Info Panel (Right 1 col) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded-2xl p-5 space-y-4 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider border-b border-black/5 dark:border-white/5 pb-3">
              {lang === 'en' ? 'Deployment & Repository Logs' : 'Log Rilis & Repositori'}
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Repository Status' : 'Status Repositori'}
                </span>
                <span className={`inline-flex self-start items-center space-x-1 px-2 py-0.5 mt-1 rounded text-[10px] font-bold uppercase ${
                  status.repoStatus === 'Synced' 
                    ? 'bg-emerald-500/10 text-emerald-600' 
                    : status.repoStatus === 'Conflict'
                    ? 'bg-red-500/10 text-red-500 animate-pulse'
                    : status.repoStatus === 'Out of Sync'
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  <span>{status.repoStatus}</span>
                </span>
              </div>

              {status.loadedSha && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {lang === 'en' ? 'Loaded File SHA' : 'SHA File yang Terbuka'}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5 font-mono text-[11px]">
                    {status.loadedSha.slice(0, 10)}...
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Last Local Save' : 'Penyimpanan Lokal Terakhir'}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
                  {formatDate(status.lastPublish)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Last GitHub Push' : 'Push GitHub Terakhir'}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5 font-mono text-[11px]">
                  {status.githubSynced ? formatDate(status.lastSyncTime) : '-'}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Vercel Deployment Build' : 'Status Membangun Vercel'}
                </span>
                <span className={`font-semibold mt-0.5 ${
                  status.vercelDeployStatus === 'Building' ? 'text-amber-500 animate-pulse' : 'text-slate-700 dark:text-slate-200'
                }`}>
                  {status.vercelDeployStatus || 'Idle'}
                </span>
              </div>

              <div className="flex flex-col border-t border-black/5 dark:border-white/5 pt-3.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {lang === 'en' ? 'Production Website URL' : 'Link Web Produksi'}
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
        </div>
      </div>

    </div>
  );
};
