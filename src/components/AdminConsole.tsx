import React, { useState, useRef } from 'react';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Database, 
  BookOpen, 
  Users, 
  Sparkles, 
  Calendar, 
  FileText,
  AlertTriangle,
  Globe,
  Settings,
  Images,
  Instagram,
  Lock,
  Youtube,
  Tv,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useData, Person, PublicationsData } from '../context/DataContext';
import { Language } from '../types';

interface AdminConsoleProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

type CollectionType = 
  | 'groups' 
  | 'projects' 
  | 'publications_journals' 
  | 'publications_conferences' 
  | 'publications_ipr' 
  | 'publications_books' 
  | 'datasets' 
  | 'news' 
  | 'events' 
  | 'team_leadership' 
  | 'team_assistants' 
  | 'team_members' 
  | 'team_collaborators' 
  | 'team_postgraduate' 
  | 'team_graduate' 
  | 'team_undergraduate'
  | 'social_youtube'
  | 'social_instagram'
  | 'mass_media'
  | 'partners'
  | 'sdg_alignment'
  | 'conferences_organized'
  | 'journals_organized'
  | 'promotions';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label, value, onChange, placeholder }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          onChange(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border border-dashed rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden min-h-[90px] ${
          dragActive ? 'border-teal-500 bg-teal-500/5' : 'border-black/10 dark:border-white/10'
        }`}
      >
        {value ? (
          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-black/5 dark:border-white/5 flex items-center justify-center bg-black/5 dark:bg-black/20 group">
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-[10px] font-bold rounded shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-1">
            <Upload className="w-4 h-4 text-slate-400 mb-1" />
            <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Drag image here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-teal-500 hover:underline font-bold cursor-pointer"
              >
                browse
              </button>
            </p>
            <p className="text-[9px] text-slate-400">PNG, JPG, JPEG, WEBP, SVG</p>
          </div>
        )}

        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
          className="hidden"
        />
      </div>
      
      {/* Dynamic input to also allow traditional URL pasting or showing state */}
      <input 
        type="text"
        value={value.startsWith('data:') ? '✓ Base64 Uploaded Image' : value}
        onChange={(e) => {
          if (!e.target.value.includes('✓ Base64')) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder || "Or paste direct image URL here..."}
        className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
      />
    </div>
  );
};

export default function AdminConsole({ lang, isOpen, onClose }: AdminConsoleProps) {
  const data = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<CollectionType>('projects');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // CMS Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('aimed_admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Auto-fetch loading indicator state
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const getYoutubeId = (url: string): string => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url.trim();
  };

  const handleYoutubeLinkChange = async (url: string) => {
    if (!editingItem) return;
    const embedId = getYoutubeId(url);
    
    setEditingItem((prev: any) => ({
      ...prev,
      link: url,
      embedId: embedId
    }));

    if (!embedId || embedId.length !== 11) return;

    setIsAutoFetching(true);
    try {
      const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${embedId}`)}`);
      const resData = await response.json();
      if (resData && resData.title) {
        setEditingItem((prev: any) => ({
          ...prev,
          title: {
            en: resData.title,
            id: resData.title
          },
          thumbnail: `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`,
          duration: prev.duration || '5:00',
          views: prev.views || '1.2K'
        }));
      } else {
        setEditingItem((prev: any) => ({
          ...prev,
          thumbnail: `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`
        }));
      }
    } catch (e) {
      console.error("Error fetching YouTube info:", e);
      setEditingItem((prev: any) => ({
        ...prev,
        thumbnail: `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`
      }));
    } finally {
      setIsAutoFetching(false);
    }
  };

  const handleMassMediaLinkChange = async (url: string) => {
    if (!editingItem) return;
    
    setEditingItem((prev: any) => ({
      ...prev,
      link: url
    }));

    if (!url || !url.startsWith('http')) return;

    setIsAutoFetching(true);
    try {
      const response = await fetch(`/api/fetch-metadata?url=${encodeURIComponent(url)}`);
      const resData = await response.json();
      if (resData) {
        setEditingItem((prev: any) => ({
          ...prev,
          publisher: resData.publisher || prev.publisher || 'Publisher',
          title: {
            en: resData.title || prev.title?.en || 'News Article',
            id: resData.title || prev.title?.id || 'Artikel Berita'
          },
          summary: {
            en: resData.description || prev.summary?.en || 'Full news coverage.',
            id: resData.description || prev.summary?.id || 'Liputan berita lengkap.'
          },
          logo: resData.logo || prev.logo || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=100',
          date: resData.date || prev.date || new Date().toISOString().split('T')[0]
        }));
      }
    } catch (e) {
      console.error("Error fetching article info:", e);
    } finally {
      setIsAutoFetching(false);
    }
  };

  if (!isOpen) return null;

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Export Data Handler
  const handleExport = () => {
    try {
      const jsonStr = data.exportData();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aimed_cms_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showMsg(lang === 'en' ? 'Backup file downloaded successfully!' : 'File cadangan berhasil diunduh!');
    } catch (e) {
      showMsg(lang === 'en' ? 'Export failed!' : 'Ekspor gagal!', 'error');
    }
  };

  // Import Data Handler
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const success = data.importData(result);
        if (success) {
          showMsg(lang === 'en' ? 'Database imported successfully!' : 'Database berhasil diimpor!');
        } else {
          showMsg(lang === 'en' ? 'Invalid backup file format.' : 'Format file cadangan tidak valid.', 'error');
        }
      } catch (err) {
        showMsg(lang === 'en' ? 'Failed to read backup file.' : 'Gagal membaca file cadangan.', 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Reset Database Handler
  const handleReset = () => {
    if (window.confirm(lang === 'en' ? 'Are you sure you want to reset all data to default template values?' : 'Apakah Anda yakin ingin mengatur ulang semua data ke nilai template asli?')) {
      data.resetToDefault();
      showMsg(lang === 'en' ? 'Database reset to default values.' : 'Database berhasil diatur ulang ke nilai asli.');
    }
  };

  // Delete Handler
  const handleDelete = (id: string, collection: CollectionType) => {
    if (!window.confirm(lang === 'en' ? 'Are you sure you want to delete this item?' : 'Apakah Anda yakin ingin menghapus item ini?')) return;

    try {
      if (collection === 'groups') {
        data.setResearchGroups(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'projects') {
        data.setShowcaseProjects(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'publications_journals') {
        data.setPublicationsData(prev => ({ ...prev, journals: prev.journals.filter(item => item.id !== id) }));
      } else if (collection === 'publications_conferences') {
        data.setPublicationsData(prev => ({ ...prev, conferences: prev.conferences.filter(item => item.id !== id) }));
      } else if (collection === 'publications_ipr') {
        data.setPublicationsData(prev => ({ ...prev, ipr: prev.ipr.filter(item => item.id !== id) }));
      } else if (collection === 'publications_books') {
        data.setPublicationsData(prev => ({ ...prev, books: prev.books.filter(item => item.id !== id) }));
      } else if (collection === 'datasets') {
        data.setDatasets(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'news') {
        data.setNews(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'events') {
        data.setEvents(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_leadership') {
        data.setLeadership(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_assistants') {
        data.setAssistants(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_members') {
        data.setMembers(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_collaborators') {
        data.setCollaborators(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_postgraduate') {
        data.setPostgraduate(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_graduate') {
        data.setGraduate(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'team_undergraduate') {
        data.setUndergraduate(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'social_youtube') {
        data.setYoutubeVideos(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'social_instagram') {
        data.setInstagramPosts(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'mass_media') {
        data.setMassMedia(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'partners') {
        data.setPartners(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'conferences_organized') {
        data.setConferencesOrganized(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'journals_organized') {
        data.setJournalsOrganized(prev => prev.filter(item => item.id !== id));
      } else if (collection === 'promotions') {
        data.setPromotions(prev => prev.filter(item => item.id !== id));
      }
      showMsg(lang === 'en' ? 'Item deleted successfully!' : 'Item berhasil dihapus!');
    } catch (e) {
      showMsg(lang === 'en' ? 'Delete failed' : 'Gagal menghapus', 'error');
    }
  };

  const openAddForm = () => {
    // Generate an empty schema based on activeTab
    let defaultItem: any = { id: `id-${Date.now()}` };

    if (activeTab === 'groups') {
      defaultItem = {
        ...defaultItem,
        name: { en: '', id: '' },
        description: { en: '', id: '' },
        lead: '',
        keywords: '',
        icon: 'Activity'
      };
    } else if (activeTab === 'projects') {
      defaultItem = {
        ...defaultItem,
        name: '',
        tagline: { en: '', id: '' },
        description: { en: '', id: '' },
        image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1200',
        demoUrl: '#',
        publicationUrl: '#',
        githubUrl: '#',
        websiteUrl: '#',
        videoUrl: '#',
        features: { en: '', id: '' } // will convert to array on save
      };
    } else if (activeTab === 'publications_journals') {
      defaultItem = {
        ...defaultItem,
        title: '',
        authors: '',
        journal: '',
        details: '',
        year: new Date().getFullYear(),
        doi: ''
      };
    } else if (activeTab === 'publications_conferences') {
      defaultItem = {
        ...defaultItem,
        title: '',
        authors: '',
        conference: '',
        details: '',
        year: new Date().getFullYear(),
        doi: ''
      };
    } else if (activeTab === 'publications_ipr') {
      defaultItem = {
        ...defaultItem,
        title: '',
        type: '',
        regNo: '',
        date: '',
        holder: ''
      };
    } else if (activeTab === 'publications_books') {
      defaultItem = {
        ...defaultItem,
        title: '',
        authors: '',
        publisher: '',
        year: new Date().getFullYear(),
        pages: '',
        desc: ''
      };
    } else if (activeTab === 'datasets') {
      defaultItem = {
        ...defaultItem,
        name: '',
        description: { en: '', id: '' },
        size: '',
        downloadUrl: '#',
        license: '',
        paperRef: '',
        benchmark: '',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
      };
    } else if (activeTab === 'news') {
      defaultItem = {
        ...defaultItem,
        title: { en: '', id: '' },
        category: 'research',
        date: new Date().toISOString().split('T')[0],
        image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800',
        content: { en: '', id: '' },
        tags: ''
      };
    } else if (activeTab === 'events') {
      defaultItem = {
        ...defaultItem,
        title: { en: '', id: '' },
        date: new Date().toISOString().split('T')[0],
        time: '09:00 - 17:00 WIB',
        location: { en: '', id: '' },
        type: 'upcoming',
        registerUrl: '#',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
        description: { en: '', id: '' }
      };
    } else if (activeTab.startsWith('team_')) {
      defaultItem = {
        ...defaultItem,
        name: '',
        role: { en: '', id: '' },
        email: '',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
        institution: { en: '', id: '' },
        topic: { en: '', id: '' },
        supervisor: '',
        interests: { en: '', id: '' }, // comma separated
        researchFocus: { en: '', id: '' },
        scholar: '',
        scopus: '',
        orcid: '',
        currentProjects: '', // newline separated
        latestPublications: '' // newline separated
      };
    } else if (activeTab === 'social_youtube') {
      defaultItem = {
        ...defaultItem,
        title: { en: '', id: '' },
        duration: '',
        views: '',
        thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
        embedId: '',
        link: ''
      };
    } else if (activeTab === 'social_instagram') {
      defaultItem = {
        ...defaultItem,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
        caption: { en: '', id: '' },
        date: ''
      };
    } else if (activeTab === 'mass_media') {
      defaultItem = {
        ...defaultItem,
        publisher: '',
        logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=100',
        title: { en: '', id: '' },
        date: new Date().toISOString().split('T')[0],
        summary: { en: '', id: '' },
        link: '#'
      };
    } else if (activeTab === 'partners') {
      defaultItem = {
        ...defaultItem,
        name: '',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        websiteUrl: ''
      };
    } else if (activeTab === 'conferences_organized') {
      defaultItem = {
        ...defaultItem,
        title: '',
        role: 'Main Organizer',
        date: 'Annual Event',
        location: '',
        stats: '',
        url: '',
        desc: { en: '', id: '' }
      };
    } else if (activeTab === 'journals_organized') {
      defaultItem = {
        ...defaultItem,
        title: '',
        publisher: 'Universitas Sriwijaya',
        issn: '',
        frequency: '',
        indexing: '',
        url: '',
        desc: { en: '', id: '' }
      };
    } else if (activeTab === 'promotions') {
      defaultItem = {
        ...defaultItem,
        title: { en: '', id: '' },
        category: '',
        date: '',
        coverage: { en: '', id: '' },
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
        url: '#'
      };
    }

    setEditingItem(defaultItem);
    setIsFormOpen(true);
  };

  const openEditForm = (item: any) => {
    // Make sure comma/newline lists are strings for forms
    const prepared = { ...item };
    
    // Convert arrays back to comma/newline separated strings for editing
    if (activeTab === 'projects') {
      prepared.features = {
        en: Array.isArray(item.features?.en) ? item.features.en.join(', ') : item.features?.en || '',
        id: Array.isArray(item.features?.id) ? item.features.id.join(', ') : item.features?.id || ''
      };
    } else if (activeTab === 'groups') {
      prepared.keywords = Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords || '';
    } else if (activeTab === 'news') {
      prepared.tags = Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '';
    } else if (activeTab.startsWith('team_')) {
      prepared.interests = {
        en: Array.isArray(item.interests?.en) ? item.interests.en.join(', ') : item.interests?.en || '',
        id: Array.isArray(item.interests?.id) ? item.interests.id.join(', ') : item.interests?.id || ''
      };
      prepared.researchFocus = {
        en: item.researchFocus?.en || '',
        id: item.researchFocus?.id || ''
      };
      prepared.currentProjects = Array.isArray(item.currentProjects) ? item.currentProjects.join('\n') : item.currentProjects || '';
      prepared.latestPublications = Array.isArray(item.latestPublications) ? item.latestPublications.join('\n') : item.latestPublications || '';
    } else if (activeTab === 'social_youtube') {
      if (!prepared.link && prepared.embedId) {
        prepared.link = `https://www.youtube.com/watch?v=${prepared.embedId}`;
      }
    }

    setEditingItem(prepared);
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      // Process fields back into correct formats (arrays, numbers)
      const finalized = { ...editingItem };

      if (activeTab === 'projects') {
        finalized.features = {
          en: typeof editingItem.features?.en === 'string' ? editingItem.features.en.split(',').map((f: string) => f.trim()).filter(Boolean) : [],
          id: typeof editingItem.features?.id === 'string' ? editingItem.features.id.split(',').map((f: string) => f.trim()).filter(Boolean) : []
        };
      } else if (activeTab === 'groups') {
        finalized.keywords = typeof editingItem.keywords === 'string' ? editingItem.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [];
      } else if (activeTab === 'news') {
        finalized.tags = typeof editingItem.tags === 'string' ? editingItem.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
      } else if (activeTab.startsWith('team_')) {
        finalized.interests = {
          en: typeof editingItem.interests?.en === 'string' ? editingItem.interests.en.split(',').map((i: string) => i.trim()).filter(Boolean) : [],
          id: typeof editingItem.interests?.id === 'string' ? editingItem.interests.id.split(',').map((i: string) => i.trim()).filter(Boolean) : []
        };
        finalized.currentProjects = typeof editingItem.currentProjects === 'string' ? editingItem.currentProjects.split('\n').map((p: string) => p.trim()).filter(Boolean) : [];
        finalized.latestPublications = typeof editingItem.latestPublications === 'string' ? editingItem.latestPublications.split('\n').map((p: string) => p.trim()).filter(Boolean) : [];
      }

      // Save into respective collection
      if (activeTab === 'groups') {
        data.setResearchGroups(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'projects') {
        data.setShowcaseProjects(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'publications_journals') {
        data.setPublicationsData(prev => {
          const journals = [...prev.journals];
          const idx = journals.findIndex(x => x.id === finalized.id);
          if (idx !== -1) journals[idx] = finalized;
          else journals.push(finalized);
          return { ...prev, journals };
        });
      } else if (activeTab === 'publications_conferences') {
        data.setPublicationsData(prev => {
          const conferences = [...prev.conferences];
          const idx = conferences.findIndex(x => x.id === finalized.id);
          if (idx !== -1) conferences[idx] = finalized;
          else conferences.push(finalized);
          return { ...prev, conferences };
        });
      } else if (activeTab === 'publications_ipr') {
        data.setPublicationsData(prev => {
          const ipr = [...prev.ipr];
          const idx = ipr.findIndex(x => x.id === finalized.id);
          if (idx !== -1) ipr[idx] = finalized;
          else ipr.push(finalized);
          return { ...prev, ipr };
        });
      } else if (activeTab === 'publications_books') {
        data.setPublicationsData(prev => {
          const books = [...prev.books];
          const idx = books.findIndex(x => x.id === finalized.id);
          if (idx !== -1) books[idx] = finalized;
          else books.push(finalized);
          return { ...prev, books };
        });
      } else if (activeTab === 'datasets') {
        data.setDatasets(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'news') {
        data.setNews(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'events') {
        data.setEvents(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_leadership') {
        data.setLeadership(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_assistants') {
        data.setAssistants(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_members') {
        data.setMembers(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_collaborators') {
        data.setCollaborators(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_postgraduate') {
        data.setPostgraduate(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_graduate') {
        data.setGraduate(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'team_undergraduate') {
        data.setUndergraduate(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'social_youtube') {
        data.setYoutubeVideos(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'social_instagram') {
        data.setInstagramPosts(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'mass_media') {
        data.setMassMedia(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'partners') {
        data.setPartners(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'conferences_organized') {
        data.setConferencesOrganized(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'journals_organized') {
        data.setJournalsOrganized(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      } else if (activeTab === 'promotions') {
        data.setPromotions(prev => {
          const exists = prev.some(x => x.id === finalized.id);
          return exists ? prev.map(x => x.id === finalized.id ? finalized : x) : [...prev, finalized];
        });
      }

      setIsFormOpen(false);
      setEditingItem(null);
      showMsg(lang === 'en' ? 'Data saved successfully!' : 'Data berhasil disimpan!');
    } catch (err) {
      showMsg(lang === 'en' ? 'Failed to save data' : 'Gagal menyimpan data', 'error');
    }
  };

  // Get list data to show based on activeTab
  const getList = () => {
    switch (activeTab) {
      case 'groups': return data.researchGroups;
      case 'projects': return data.showcaseProjects;
      case 'publications_journals': return data.publicationsData.journals;
      case 'publications_conferences': return data.publicationsData.conferences;
      case 'publications_ipr': return data.publicationsData.ipr;
      case 'publications_books': return data.publicationsData.books;
      case 'datasets': return data.datasets;
      case 'news': return data.news;
      case 'events': return data.events;
      case 'team_leadership': return data.leadership;
      case 'team_assistants': return data.assistants;
      case 'team_members': return data.members;
      case 'team_collaborators': return data.collaborators;
      case 'team_postgraduate': return data.postgraduate;
      case 'team_graduate': return data.graduate;
      case 'team_undergraduate': return data.undergraduate;
      case 'social_youtube': return data.youtubeVideos;
      case 'social_instagram': return data.instagramPosts;
      case 'mass_media': return data.massMedia;
      case 'partners': return data.partners;
      case 'conferences_organized': return data.conferencesOrganized;
      case 'journals_organized': return data.journalsOrganized;
      case 'promotions': return data.promotions;
      default: return [];
    }
  };

  const getLabel = (item: any) => {
    if (!item) return '';
    if (activeTab === 'social_instagram') {
      return item.link || 'No Instagram Link';
    }
    if (typeof item.name === 'string') return item.name;
    if (item.name && typeof item.name === 'object') return item.name[lang] || item.name.en || '';
    if (item.title && typeof item.title === 'string') return item.title;
    if (item.title && typeof item.title === 'object') return item.title[lang] || item.title.en || '';
    if (item.caption && typeof item.caption === 'object') return item.caption[lang] || item.caption.en || '';
    return item.id || '';
  };

  const getSubLabel = (item: any) => {
    if (!item) return '';
    if (activeTab === 'social_instagram') {
      return item.link ? `Live Feed (URL: ${item.link})` : '';
    }
    if (item.lead) return `Lead: ${item.lead}`;
    if (item.authors) return item.authors;
    if (item.category) return `Category: ${item.category}`;
    if (item.role && typeof item.role === 'object') return item.role[lang] || item.role.en;
    if (item.size) return `Size: ${item.size}`;
    if (item.views) return `Views: ${item.views} | Duration: ${item.duration}`;
    if (item.publisher) return `${item.publisher} | ${item.date}`;
    if (item.date) return item.date;
    return '';
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-3xl w-full max-w-md p-8 flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex p-3.5 bg-gradient-to-br from-teal-500 to-sky-500 text-white rounded-2xl mb-4 shadow-md">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white tracking-tight text-xl">
              AIMed CoE CMS Portal
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'en' ? 'Enter administrator credentials to proceed' : 'Masukkan kredensial administrator untuk melanjutkan'}
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (username === 'aimed' && password === 'isysrg.com') {
              setIsAuthenticated(true);
              sessionStorage.setItem('aimed_admin_authenticated', 'true');
              setLoginError('');
            } else {
              setLoginError(lang === 'en' ? 'Invalid username or password' : 'Username atau password salah');
            }
          }} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl text-center border border-red-500/10">
                {loginError}
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. aimed"
                className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-md active:scale-[0.98] mt-2 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Log In' : 'Masuk'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-sky-500 text-white rounded-xl">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white tracking-tight text-lg">
                AIMed CoE CMS Portal
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'en' ? 'Manage your research laboratory website dynamically' : 'Kelola situs web laboratorium riset Anda secara dinamis'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Database Action Buttons */}
            <button 
              onClick={handleReset} 
              title={lang === 'en' ? 'Reset to Default' : 'Atur Ulang'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={handleExport}
              title={lang === 'en' ? 'Export JSON Backup' : 'Ekspor Cadangan'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              title={lang === 'en' ? 'Import JSON Backup' : 'Impor Cadangan'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImport} 
              accept=".json" 
              className="hidden" 
            />

            <button 
              disabled={isPublishing}
              onClick={async () => {
                setIsPublishing(true);
                const result = await data.saveToServer();
                setIsPublishing(false);
                if (result.success) {
                  showMsg(lang === 'en' 
                    ? 'Changes successfully published to Cloud Database (Firebase Firestore)!' 
                    : 'Perubahan berhasil dipublikasikan ke Cloud Database (Firebase Firestore)!');
                } else {
                  const errorMsg = result.error ? String(result.error) : '';
                  const isQuota = errorMsg.toLowerCase().includes('quota') || errorMsg.toLowerCase().includes('exhausted');
                  
                  if (isQuota) {
                    showMsg(lang === 'en'
                      ? 'Failed to publish: Firebase daily Firestore quota exceeded. Free limits will reset tomorrow. Details: https://console.firebase.google.com/project/amplified-campus-76ppv/firestore/databases/ai-studio-aimedcoe-c637c20a-a67c-4631-b202-b3c68e83a2b4/data?openUpgradeDialog=true'
                      : 'Gagal mempublikasikan: Batas kuota gratis harian Firestore terlampaui. Kuota akan diatur ulang besok.',
                      'error'
                    );
                  } else {
                    showMsg(lang === 'en' 
                      ? `Failed to publish changes to server: ${errorMsg}` 
                      : `Gagal mempublikasikan perubahan ke server: ${errorMsg}`, 'error');
                  }
                }
              }}
              className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Globe className="w-3.5 h-3.5" />
              )}
              <span>
                {isPublishing 
                  ? (lang === 'en' ? 'Publishing...' : 'Mempublikasikan...') 
                  : (lang === 'en' ? 'Publish to Server' : 'Publikasikan ke Server')}
              </span>
            </button>

            <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10 mx-2" />

            <button 
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('aimed_admin_authenticated');
                setUsername('');
                setPassword('');
              }}
              className="px-3 py-1.5 text-xs font-bold text-red-500 hover:text-white hover:bg-red-600 border border-red-500/20 rounded-xl transition-all cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Log Out' : 'Keluar'}</span>
            </button>

            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className={`px-6 py-2.5 flex items-center justify-between text-xs font-bold ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/10' 
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border-b border-red-500/10'
          }`}>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Main Work Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar Nav Collections */}
          <div className="w-64 border-r border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 overflow-y-auto p-4 flex flex-col space-y-6">
            
            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-2 px-2">Core Content</span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'projects' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Showcase Projects' : 'Proyek Unggulan'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'groups' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Research Groups' : 'Grup Riset'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('datasets')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'datasets' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Clinical Datasets' : 'Dataset Klinis'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'news' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Activities - News' : 'Kegiatan - Berita'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'events' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Activities - Events' : 'Kegiatan - Agenda'}</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-2 px-2">Media & Socials</span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('social_youtube')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'social_youtube' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Social - YouTube' : 'Medsos - YouTube'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('social_instagram')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'social_instagram' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Social - Instagram' : 'Medsos - Instagram'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('mass_media')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'mass_media' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Mass Media Coverage' : 'Liputan Media Massa'}</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-2 px-2">Partners & SDGs</span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('partners')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'partners' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Our Partners' : 'Mitra Kami'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('sdg_alignment')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'sdg_alignment' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'en' ? 'SDGs Alignment' : 'Keselarasan SDG'}</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-2 px-2">Publications</span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('publications_journals')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'publications_journals' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Journals' : 'Jurnal Ilmiah'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('publications_conferences')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'publications_conferences' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Conferences' : 'Prosiding Seminar'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('publications_ipr')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'publications_ipr' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'en' ? 'IPR / Paten' : 'HAKI & Paten'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('publications_books')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'publications_books' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Books' : 'Buku Referensi'}</span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-2 px-2">Team & Researchers</span>
              <div className="space-y-1 overflow-y-auto">
                <button
                  onClick={() => setActiveTab('team_leadership')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_leadership' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Core Leadership' : 'Pimpinan Inti'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('team_assistants')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_assistants' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Research Assistants' : 'Asisten Peneliti'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('team_members')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_members' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Researchers / Dosen' : 'Dosen Peneliti'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('team_collaborators')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_collaborators' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Collaborators' : 'Kolaborator Luar'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('team_postgraduate')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_postgraduate' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'S3 PhD Students' : 'Mahasiswa S3'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('team_graduate')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_graduate' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'S2 Masters Students' : 'Mahasiswa S2'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('team_undergraduate')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeTab === 'team_undergraduate' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'en' ? 'S1 Bachelors Students' : 'Mahasiswa S1'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* List Display Panels */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            
            {/* List Actions Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-extrabold text-slate-800 dark:text-white tracking-tight uppercase text-xs">
                {activeTab === 'sdg_alignment' 
                  ? (lang === 'en' ? 'SDGs Commitment Configuration' : 'Konfigurasi Komitmen SDG')
                  : (lang === 'en' ? `List of ${activeTab.replace('_', ' ')}` : `Daftar ${activeTab.replace('_', ' ')}`)}
              </h4>
              {activeTab !== 'sdg_alignment' && (
                <button
                  onClick={openAddForm}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Add Item' : 'Tambah Item'}</span>
                </button>
              )}
            </div>

            {/* List Items Scroll Box */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
              {activeTab === 'sdg_alignment' ? (
                <div className="space-y-6 pb-8">
                  <div className="p-4 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                    <p className="text-xs font-medium text-teal-700 dark:text-teal-400 leading-normal">
                      {lang === 'en'
                        ? 'Edit the content for the "Empowering Global Sustainable Development" section below. Changes will be saved globally.'
                        : 'Edit konten untuk bagian "Memberdayakan Pembangunan Berkelanjutan Global" di bawah ini. Perubahan akan disimpan secara global.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Section Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                      <input 
                        type="text" 
                        value={data.sdgContent?.title?.en || ''} 
                        onChange={(e) => data.setSdgContent({
                          ...data.sdgContent,
                          title: { ...data.sdgContent.title, en: e.target.value }
                        })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Section Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                      <input 
                        type="text" 
                        value={data.sdgContent?.title?.id || ''} 
                        onChange={(e) => data.setSdgContent({
                          ...data.sdgContent,
                          title: { ...data.sdgContent.title, id: e.target.value }
                        })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Section Subtitle (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                      <input 
                        type="text" 
                        value={data.sdgContent?.subtitle?.en || ''} 
                        onChange={(e) => data.setSdgContent({
                          ...data.sdgContent,
                          subtitle: { ...data.sdgContent.subtitle, en: e.target.value }
                        })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Section Subtitle (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                      <input 
                        type="text" 
                        value={data.sdgContent?.subtitle?.id || ''} 
                        onChange={(e) => data.setSdgContent({
                          ...data.sdgContent,
                          subtitle: { ...data.sdgContent.subtitle, id: e.target.value }
                        })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-black/5 dark:border-white/5 pt-4 space-y-4">
                    <h5 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-tight">SDG 3: Good Health and Well-being</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 3 Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={data.sdgContent?.sdg3Title?.en || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg3Title: { ...data.sdgContent.sdg3Title, en: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 3 Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={data.sdgContent?.sdg3Title?.id || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg3Title: { ...data.sdgContent.sdg3Title, id: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SDG 3 Logo Image</label>
                      <ImageUploadField 
                        label="SDG 3 Logo"
                        value={data.sdgContent?.sdg3Image || ''}
                        onChange={(val) => data.setSdgContent({
                          ...data.sdgContent,
                          sdg3Image: val
                        })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 3 Text (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={data.sdgContent?.sdg3Text?.en || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg3Text: { ...data.sdgContent.sdg3Text, en: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 3 Text (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={data.sdgContent?.sdg3Text?.id || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg3Text: { ...data.sdgContent.sdg3Text, id: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-black/5 dark:border-white/5 pt-4 space-y-4">
                    <h5 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-tight">SDG 9: Industry, Innovation and Infrastructure</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 9 Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={data.sdgContent?.sdg9Title?.en || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg9Title: { ...data.sdgContent.sdg9Title, en: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 9 Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={data.sdgContent?.sdg9Title?.id || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg9Title: { ...data.sdgContent.sdg9Title, id: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SDG 9 Logo Image</label>
                      <ImageUploadField 
                        label="SDG 9 Logo"
                        value={data.sdgContent?.sdg9Image || ''}
                        onChange={(val) => data.setSdgContent({
                          ...data.sdgContent,
                          sdg9Image: val
                        })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 9 Text (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={data.sdgContent?.sdg9Text?.en || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg9Text: { ...data.sdgContent.sdg9Text, en: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">SDG 9 Text (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={data.sdgContent?.sdg9Text?.id || ''} 
                          onChange={(e) => data.setSdgContent({
                            ...data.sdgContent,
                            sdg9Text: { ...data.sdgContent.sdg9Text, id: e.target.value }
                          })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/5 dark:border-white/5 flex justify-end">
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={async () => {
                        setIsPublishing(true);
                        const result = await data.saveToServer();
                        setIsPublishing(false);
                        if (result.success) {
                          showMsg(lang === 'en' ? 'SDG Alignment saved successfully!' : 'Keselarasan SDG berhasil disimpan!');
                        } else {
                          const errorMsg = result.error ? String(result.error) : '';
                          const isQuota = errorMsg.toLowerCase().includes('quota') || errorMsg.toLowerCase().includes('exhausted');
                          
                          if (isQuota) {
                            showMsg(lang === 'en'
                              ? 'Failed to save: Firebase daily Firestore quota exceeded. Details: https://console.firebase.google.com/project/amplified-campus-76ppv/firestore/databases/ai-studio-aimedcoe-c637c20a-a67c-4631-b202-b3c68e83a2b4/data?openUpgradeDialog=true'
                              : 'Gagal menyimpan: Batas kuota gratis harian Firestore terlampaui.',
                              'error'
                            );
                          } else {
                            showMsg(lang === 'en' 
                              ? `Failed to save SDG Alignment: ${errorMsg}` 
                              : `Gagal menyimpan keselarasan SDG: ${errorMsg}`, 'error');
                          }
                        }
                      }}
                      className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPublishing ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span>
                        {isPublishing 
                          ? (lang === 'en' ? 'Saving...' : 'Menyimpan...') 
                          : (lang === 'en' ? 'Save SDG Alignment' : 'Simpan Keselarasan SDG')}
                      </span>
                    </button>
                  </div>
                </div>
              ) : getList().length === 0 ? (
                <div className="text-center py-16 bg-slate-50 dark:bg-slate-950 border border-dashed border-black/10 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center">
                  <Database className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-xs font-bold text-slate-500">
                    {lang === 'en' ? 'No items found in this section yet.' : 'Belum ada item di bagian ini.'}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {lang === 'en' ? 'Click "Add Item" above to create one.' : 'Klik "Tambah Item" di atas untuk membuatnya.'}
                  </span>
                </div>
              ) : (
                getList().map((item: any) => (
                  <div 
                    key={item.id} 
                    className="p-4 bg-slate-50 dark:bg-slate-950 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 rounded-2xl flex items-center justify-between transition-all"
                  >
                    <div className="flex-1 pr-6">
                      <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block mb-0.5 tracking-wider">
                        ID: {item.id}
                      </span>
                      <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs tracking-tight line-clamp-1 leading-normal">
                        {getLabel(item)}
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                        {getSubLabel(item)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/5 rounded-lg cursor-pointer transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, activeTab)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/5 rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

        {/* CMS FORM DIALOG MODAL (Overlays inside) */}
        {isFormOpen && editingItem && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <form 
              onSubmit={handleSaveForm}
              className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
            >
              {/* Form Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-950">
                <h4 className="font-extrabold text-slate-950 dark:text-white tracking-tight uppercase text-xs">
                  {editingItem.id.startsWith('id-') 
                    ? (lang === 'en' ? 'Create New Entry' : 'Buat Entri Baru') 
                    : (lang === 'en' ? 'Edit Entry' : 'Edit Entri')}
                </h4>
                <button 
                  type="button" 
                  onClick={() => { setIsFormOpen(false); setEditingItem(null); }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                
                {/* ID input (read-only for existing) */}
                <div className="grid grid-cols-1 gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Item ID</label>
                  <input 
                    type="text" 
                    value={editingItem.id}
                    onChange={(e) => setEditingItem({ ...editingItem, id: e.target.value })}
                    required
                    disabled={!editingItem.id.startsWith('id-')}
                    className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 disabled:opacity-50"
                  />
                </div>

                {/* PROJECT FORM FIELDS */}
                {activeTab === 'projects' && (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Name</label>
                      <input 
                        type="text" 
                        value={editingItem.name || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Tagline (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.tagline?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, tagline: { ...editingItem.tagline, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Tagline (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.tagline?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, tagline: { ...editingItem.tagline, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Features/Bulletpoints (EN - comma separated)</label>
                        <input 
                          type="text" 
                          value={editingItem.features?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, features: { ...editingItem.features, en: e.target.value } })}
                          placeholder="Bullet 1, Bullet 2, Bullet 3"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Features/Bulletpoints (ID - comma separated)</label>
                        <input 
                          type="text" 
                          value={editingItem.features?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, features: { ...editingItem.features, id: e.target.value } })}
                          placeholder="Poin 1, Poin 2, Poin 3"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <ImageUploadField 
                      label="Project Image" 
                      value={editingItem.image || ''} 
                      onChange={(val) => setEditingItem({ ...editingItem, image: val })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website URL</label>
                        <input 
                          type="text" 
                          value={editingItem.websiteUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, websiteUrl: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demo / Try App URL</label>
                        <input 
                          type="text" 
                          value={editingItem.demoUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, demoUrl: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Github Repository URL</label>
                        <input 
                          type="text" 
                          value={editingItem.githubUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Video Explainer URL (Youtube)</label>
                        <input 
                          type="text" 
                          value={editingItem.videoUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* RESEARCH GROUP FORM FIELDS */}
                {activeTab === 'groups' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Group Name (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.name?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, name: { ...editingItem.name, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Group Name (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.name?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, name: { ...editingItem.name, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Group Leader / Lead</label>
                        <input 
                          type="text" 
                          value={editingItem.lead || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, lead: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Keywords (comma separated)</label>
                        <input 
                          type="text" 
                          value={editingItem.keywords || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, keywords: e.target.value })}
                          placeholder="Keyword 1, Keyword 2"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lucide Icon Name</label>
                      <input 
                        type="text" 
                        value={editingItem.icon || 'Activity'} 
                        onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* CLINICAL DATASET FORM FIELDS */}
                {activeTab === 'datasets' && (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dataset Name</label>
                      <input 
                        type="text" 
                        value={editingItem.name || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dataset File Size</label>
                        <input 
                          type="text" 
                          value={editingItem.size || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, size: e.target.value })}
                          placeholder="e.g. 12.4 GB"
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">License Type</label>
                        <input 
                          type="text" 
                          value={editingItem.license || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, license: e.target.value })}
                          placeholder="e.g. MIT, CC BY-NC-SA"
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dataset Type</label>
                        <input 
                          type="text" 
                          value={editingItem.paperRef || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, paperRef: e.target.value })}
                          placeholder="e.g. Image Classification, Segmented"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Origin / Institution</label>
                        <input 
                          type="text" 
                          value={editingItem.benchmark || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, benchmark: e.target.value })}
                          placeholder="e.g. Universitas Sriwijaya, South Sumatra"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dataset Download URL</label>
                        <input 
                          type="text" 
                          value={editingItem.downloadUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, downloadUrl: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <ImageUploadField 
                        label="Preview Image" 
                        value={editingItem.image || ''} 
                        onChange={(val) => setEditingItem({ ...editingItem, image: val })}
                      />
                    </div>
                  </>
                )}

                {/* JOURNAL / CONFERENCE PUBLICATION FIELDS */}
                {(activeTab === 'publications_journals' || activeTab === 'publications_conferences') && (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publication Title</label>
                      <input 
                        type="text" 
                        value={editingItem.title || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {activeTab === 'publications_journals' ? 'Journal Name' : 'Conference Name'}
                        </label>
                        <input 
                          type="text" 
                          value={activeTab === 'publications_journals' ? (editingItem.journal || '') : (editingItem.conference || '')} 
                          onChange={(e) => setEditingItem({ 
                            ...editingItem, 
                            [activeTab === 'publications_journals' ? 'journal' : 'conference']: e.target.value 
                          })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Volume / Pages / Location</label>
                        <input 
                          type="text" 
                          value={editingItem.details || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
                          placeholder="e.g. Elsevier, Vol. 94 or Milan, Italy"
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Year of Publication</label>
                        <input 
                          type="number" 
                          value={editingItem.year || 2025} 
                          onChange={(e) => setEditingItem({ ...editingItem, year: parseInt(e.target.value) || 2025 })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DOI Identifier</label>
                        <input 
                          type="text" 
                          value={editingItem.doi || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, doi: e.target.value })}
                          placeholder="e.g. 10.1016/j.bspc.2025.105432"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Link / URL</label>
                      <input 
                        type="text" 
                        value={editingItem.link || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                        placeholder="e.g. https://example.com/publication"
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* IPR PATENT REGISTRATION FIELDS */}
                {activeTab === 'publications_ipr' && (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IPR / Patent Title</label>
                      <input 
                        type="text" 
                        value={editingItem.title || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IPR Type</label>
                        <input 
                          type="text" 
                          value={editingItem.type || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                          placeholder="e.g. Hak Cipta, Paten Sederhana"
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registration Number</label>
                        <input 
                          type="text" 
                          value={editingItem.regNo || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, regNo: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date of Issue / Filing</label>
                        <input 
                          type="text" 
                          value={editingItem.date || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Right Holder</label>
                        <input 
                          type="text" 
                          value={editingItem.holder || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, holder: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Link / URL</label>
                      <input 
                        type="text" 
                        value={editingItem.link || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                        placeholder="e.g. https://example.com/patent-link"
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* BOOKS FIELDS */}
                {activeTab === 'publications_books' && (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Book Title</label>
                      <input 
                        type="text" 
                        value={editingItem.title || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Authors / Penulis</label>
                      <input 
                        type="text" 
                        value={editingItem.authors || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, authors: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publisher</label>
                        <input 
                          type="text" 
                          value={editingItem.publisher || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, publisher: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Year</label>
                        <input 
                          type="number" 
                          value={editingItem.year || 2025} 
                          onChange={(e) => setEditingItem({ ...editingItem, year: parseInt(e.target.value) || 2025 })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page Count</label>
                        <input 
                          type="text" 
                          value={editingItem.pages || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, pages: e.target.value })}
                          placeholder="e.g. 284 pages"
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description / Deskripsi</label>
                      <textarea 
                        rows={3}
                        value={editingItem.desc || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Link / URL</label>
                      <input 
                        type="text" 
                        value={editingItem.link || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                        placeholder="e.g. https://example.com/book-link"
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* NEWS FIELDS */}
                {activeTab === 'news' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.title?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.title?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">News Category</label>
                        <select 
                          value={editingItem.category || 'research'} 
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        >
                          <option value="research">Research</option>
                          <option value="seminar">Seminar</option>
                          <option value="workshop">Workshop</option>
                          <option value="achievement">Achievement</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</label>
                        <input 
                          type="date" 
                          value={editingItem.date || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Content (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={editingItem.content?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, content: { ...editingItem.content, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Content (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={editingItem.content?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, content: { ...editingItem.content, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tags (comma separated)</label>
                        <input 
                          type="text" 
                          value={editingItem.tags || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value })}
                          placeholder="tag1, tag2, tag3"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 w-full"
                        />
                      </div>
                    </div>

                    <div className="border border-black/5 dark:border-white/5 rounded-2xl p-4 bg-slate-50 dark:bg-slate-900/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Images className="w-4 h-4 text-teal-500" />
                          <span>News Image Gallery (Multiple Images)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const currentImages = editingItem.images || (editingItem.image ? [editingItem.image] : []);
                            const updated = [...currentImages, 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800'];
                            setEditingItem({
                              ...editingItem,
                              images: updated,
                              image: updated[0] || ''
                            });
                          }}
                          className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>+ Add Image URL</span>
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-400">
                        Paste valid image URLs below. The first image in the list will be automatically used as the primary coverage/card image.
                      </p>

                      {/* Images List */}
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {(() => {
                          const currentImages = editingItem.images || (editingItem.image ? [editingItem.image] : []);
                          if (currentImages.length === 0) {
                            return (
                              <div className="text-center py-4 text-[11px] text-slate-400 italic">
                                No images added yet. Click "+ Add Image URL" to get started.
                              </div>
                            );
                          }
                          return currentImages.map((imgUrl: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-950 p-2 rounded-xl border border-black/5 dark:border-white/5">
                              {/* Thumbnail preview */}
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0">
                                <img
                                  src={imgUrl || 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=100'}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=100';
                                  }}
                                />
                              </div>

                              {/* Input URL */}
                              <input
                                type="text"
                                value={imgUrl}
                                onChange={(e) => {
                                  const updated = [...currentImages];
                                  updated[idx] = e.target.value;
                                  setEditingItem({
                                    ...editingItem,
                                    images: updated,
                                    image: updated[0] || ''
                                  });
                                }}
                                placeholder="Paste image URL here"
                                className="flex-grow px-3 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                              />

                              {/* Delete button */}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = currentImages.filter((_, i) => i !== idx);
                                  setEditingItem({
                                    ...editingItem,
                                    images: updated,
                                    image: updated[0] || ''
                                  });
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </>
                )}

                {/* EVENTS FIELDS */}
                {activeTab === 'events' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Event Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.title?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Event Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.title?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</label>
                        <input 
                          type="date" 
                          value={editingItem.date || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</label>
                        <input 
                          type="text" 
                          value={editingItem.time || '09:00 - 17:00 WIB'} 
                          onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Event Status</label>
                        <select 
                          value={editingItem.type || 'upcoming'} 
                          onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="past">Past</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Location (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.location?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, location: { ...editingItem.location, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Location (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.location?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, location: { ...editingItem.location, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.description?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <ImageUploadField 
                        label="Event Image" 
                        value={editingItem.image || ''} 
                        onChange={(val) => setEditingItem({ ...editingItem, image: val })}
                      />
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Register / RSVP URL</label>
                        <input 
                          type="text" 
                          value={editingItem.registerUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, registerUrl: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* SOCIAL MEDIA - YOUTUBE FIELDS */}
                {activeTab === 'social_youtube' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span>YouTube Video Link (URL)</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="url" 
                          value={editingItem.link || ''} 
                          onChange={(e) => handleYoutubeLinkChange(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          required
                          className="w-full pl-4 pr-10 py-3 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-all font-mono"
                        />
                        {isAutoFetching && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {lang === 'en' 
                          ? 'Paste any YouTube video link. The title, thumbnail, and media details are fetched automatically!' 
                          : 'Tempel tautan video YouTube apa saja. Judul, thumbnail, dan detail media akan diambil otomatis!'}
                      </p>
                    </div>

                    {/* YouTube Real-Time Live Preview */}
                    {editingItem.embedId && (
                      <div className="border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl space-y-3.5">
                        <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400 block">
                          {lang === 'en' ? 'Live Frontend Preview' : 'Pratinjau Langsung Frontend'}
                        </span>
                        
                        <div className="glass-card rounded-xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col sm:flex-row shadow-2xs group max-w-xl">
                          <div className="relative w-full sm:w-40 h-24 flex-shrink-0 bg-slate-900 overflow-hidden">
                            <img 
                              src={editingItem.thumbnail || `https://img.youtube.com/vi/${editingItem.embedId}/hqdefault.jpg`} 
                              alt="Thumbnail Preview" 
                              className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="p-2 bg-red-600 text-white rounded-full shadow-md">
                                <Plus className="w-3.5 h-3.5 rotate-45 fill-white text-white" />
                              </div>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/80 px-1 py-0.5 rounded text-[9px] font-mono font-bold text-white">
                              {editingItem.duration || '5:00'}
                            </span>
                          </div>
                          
                          <div className="p-3.5 flex flex-col justify-between flex-1">
                            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-snug line-clamp-2">
                              {lang === 'en' ? (editingItem.title?.en || 'Untitled Video') : (editingItem.title?.id || 'Video Tanpa Judul')}
                            </h4>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                              <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                                {editingItem.views || '1.2K'} {lang === 'en' ? 'Views' : 'X Dilihat'}
                              </span>
                              <span className="text-red-500 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                                <Youtube className="w-3 h-3" />
                                {lang === 'en' ? 'Ready to Embed' : 'Siap Disematkan'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* YouTube Advanced Override (Collapsible) */}
                    <details className="text-xs group border border-black/5 dark:border-white/5 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-950/10">
                      <summary className="font-extrabold text-slate-500 dark:text-slate-400 cursor-pointer select-none outline-none flex items-center justify-between">
                        <span>{lang === 'en' ? 'Advanced Override Fields (Optional)' : 'Kolom Manual Kustom (Opsional)'}</span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold group-open:hidden">{lang === 'en' ? 'Show' : 'Tampilkan'}</span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold hidden group-open:inline">{lang === 'en' ? 'Hide' : 'Sembunyikan'}</span>
                      </summary>
                      
                      <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Video Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                            <input 
                              type="text" 
                              value={editingItem.title?.en || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, en: e.target.value } })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Video Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                            <input 
                              type="text" 
                              value={editingItem.title?.id || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, id: e.target.value } })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration (e.g. 5:42)</label>
                            <input 
                              type="text" 
                              value={editingItem.duration || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Views count (e.g. 1.2K)</label>
                            <input 
                              type="text" 
                              value={editingItem.views || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, views: e.target.value })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">YouTube Video ID</label>
                            <input 
                              type="text" 
                              value={editingItem.embedId || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, embedId: e.target.value })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-mono"
                            />
                          </div>
                        </div>

                        <ImageUploadField 
                          label="Thumbnail Image" 
                          value={editingItem.thumbnail || ''} 
                          onChange={(val) => setEditingItem({ ...editingItem, thumbnail: val })}
                        />
                      </div>
                    </details>
                  </div>
                )}

                {/* SOCIAL MEDIA - INSTAGRAM FIELDS */}
                {activeTab === 'social_instagram' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Instagram className="w-3.5 h-3.5 text-pink-500" />
                        <span>Instagram Post / Feed Link (URL)</span>
                      </label>
                      <input 
                        type="url" 
                        value={editingItem.link || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                        placeholder="https://www.instagram.com/p/C-XYZ/"
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                      <p className="text-[10px] text-slate-400 italic font-medium">
                        {lang === 'en' 
                          ? 'Example: https://www.instagram.com/p/C-X8yJDSsD/ (the real live embedded post will render automatically!)' 
                          : 'Contoh: https://www.instagram.com/p/C-X8yJDSsD/ (postingan asli yang tersemat langsung akan ditampilkan otomatis!)'}
                      </p>
                    </div>
                  </div>
                )}

                {/* MASS MEDIA FIELDS */}
                {activeTab === 'mass_media' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Tv className="w-4 h-4 text-teal-500" />
                        <span>Mass Media Article Link (URL)</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="url" 
                          value={editingItem.link || ''} 
                          onChange={(e) => handleMassMediaLinkChange(e.target.value)}
                          placeholder="https://www.kompas.id/baca/humaniora/..."
                          required
                          className="w-full pl-4 pr-10 py-3 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 transition-all font-mono"
                        />
                        {isAutoFetching && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {lang === 'en' 
                          ? 'Paste the news coverage article link. The publisher, article title, and summary description are retrieved and parsed instantly!' 
                          : 'Tempel tautan berita nasional. Penerbit, judul artikel, dan ringkasan berita akan diambil dan diurai seketika!'}
                      </p>
                    </div>

                    {/* Mass Media Real-Time Live Preview */}
                    {editingItem.link && editingItem.link !== '#' && (
                      <div className="border border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl space-y-3.5">
                        <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400 block">
                          {lang === 'en' ? 'Live Frontend Preview' : 'Pratinjau Langsung Frontend'}
                        </span>
                        
                        <div className="glass-card rounded-2xl p-5 border border-black/5 dark:border-white/5 flex flex-col justify-between max-w-xl bg-white dark:bg-slate-900/60">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                                {editingItem.publisher || 'National Press'}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400">{editingItem.date || new Date().toISOString().split('T')[0]}</span>
                            </div>

                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                              {lang === 'en' ? (editingItem.title?.en || 'News Article Title') : (editingItem.title?.id || 'Judul Artikel Berita')}
                            </h4>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                              {lang === 'en' ? (editingItem.summary?.en || 'Full news article description summaries...') : (editingItem.summary?.id || 'Ringkasan deskripsi artikel berita lengkap...')}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-black/5 dark:border-white/5 mt-4 flex items-center justify-between text-[10px]">
                            <div className="flex items-center space-x-1.5">
                              <img src={editingItem.logo || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=100"} alt="Logo" className="w-4 h-4 rounded-full object-cover" />
                              <span className="text-slate-400 font-bold">{editingItem.publisher || 'Publisher'}</span>
                            </div>
                            <span className="text-teal-600 dark:text-teal-400 font-extrabold flex items-center space-x-1">
                              <span>{lang === 'en' ? 'Visit Link' : 'Baca Berita'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mass Media Advanced Override (Collapsible) */}
                    <details className="text-xs group border border-black/5 dark:border-white/5 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-950/10">
                      <summary className="font-extrabold text-slate-500 dark:text-slate-400 cursor-pointer select-none outline-none flex items-center justify-between">
                        <span>{lang === 'en' ? 'Advanced Override Fields (Optional)' : 'Kolom Manual Kustom (Opsional)'}</span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold group-open:hidden">{lang === 'en' ? 'Show' : 'Tampilkan'}</span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold hidden group-open:inline">{lang === 'en' ? 'Hide' : 'Sembunyikan'}</span>
                      </summary>
                      
                      <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publisher Name</label>
                            <input 
                              type="text" 
                              value={editingItem.publisher || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, publisher: e.target.value })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publication Date</label>
                            <input 
                              type="date" 
                              value={editingItem.date || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Link URL Override</label>
                            <input 
                              type="text" 
                              value={editingItem.link || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                            <input 
                              type="text" 
                              value={editingItem.title?.en || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, en: e.target.value } })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                            <input 
                              type="text" 
                              value={editingItem.title?.id || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, id: e.target.value } })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Summary (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                            <textarea 
                              rows={3}
                              value={editingItem.summary?.en || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, summary: { ...editingItem.summary, en: e.target.value } })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Summary (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                            <textarea 
                              rows={3}
                              value={editingItem.summary?.id || ''} 
                              onChange={(e) => setEditingItem({ ...editingItem, summary: { ...editingItem.summary, id: e.target.value } })}
                              className="px-4 py-2 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                            />
                          </div>
                        </div>

                        <ImageUploadField 
                          label="Publisher Logo Image" 
                          value={editingItem.logo || ''} 
                          onChange={(val) => setEditingItem({ ...editingItem, logo: val })}
                        />
                      </div>
                    </details>
                  </div>
                )}

                {/* OUR PARTNERS FIELDS */}
                {activeTab === 'partners' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Partner Name</label>
                        <input 
                          type="text" 
                          value={editingItem.name || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website URL</label>
                        <input 
                          type="url" 
                          value={editingItem.websiteUrl || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, websiteUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Partner Logo</label>
                      <ImageUploadField 
                        label="Partner Logo"
                        value={editingItem.logo || ''}
                        onChange={(val) => setEditingItem({ ...editingItem, logo: val })}
                      />
                    </div>
                  </div>
                )}

                {/* CONFERENCES ORGANIZED FIELDS */}
                {activeTab === 'conferences_organized' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conference Title</label>
                      <input 
                        type="text" 
                        value={editingItem.title || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role (e.g. Main Organizer)</label>
                        <input 
                          type="text" 
                          value={editingItem.role || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date / Frequency</label>
                        <input 
                          type="text" 
                          value={editingItem.date || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
                        <input 
                          type="text" 
                          value={editingItem.location || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stats / Influence</label>
                        <input 
                          type="text" 
                          value={editingItem.stats || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, stats: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website URL</label>
                      <input 
                        type="url" 
                        value={editingItem.url || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={editingItem.desc?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, desc: { ...editingItem.desc, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={editingItem.desc?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, desc: { ...editingItem.desc, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* JOURNALS ORGANIZED FIELDS */}
                {activeTab === 'journals_organized' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Journal Title</label>
                      <input 
                        type="text" 
                        value={editingItem.title || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publisher</label>
                        <input 
                          type="text" 
                          value={editingItem.publisher || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, publisher: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ISSN (E-ISSN / P-ISSN)</label>
                        <input 
                          type="text" 
                          value={editingItem.issn || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, issn: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Frequency</label>
                        <input 
                          type="text" 
                          value={editingItem.frequency || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, frequency: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Indexing / Citations</label>
                        <input 
                          type="text" 
                          value={editingItem.indexing || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, indexing: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website URL</label>
                      <input 
                        type="url" 
                        value={editingItem.url || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={editingItem.desc?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, desc: { ...editingItem.desc, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Description (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={4}
                          value={editingItem.desc?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, desc: { ...editingItem.desc, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PROMOTIONS FIELDS */}
                {activeTab === 'promotions' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.title?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.title?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                        <input 
                          type="text" 
                          value={editingItem.category || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date / Time</label>
                        <input 
                          type="text" 
                          value={editingItem.date || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Link URL</label>
                      <input 
                        type="text" 
                        value={editingItem.url || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Coverage / Desc (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.coverage?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, coverage: { ...editingItem.coverage, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Coverage / Desc (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <textarea 
                          rows={3}
                          value={editingItem.coverage?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, coverage: { ...editingItem.coverage, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <ImageUploadField 
                      label="Promotion / Event Poster Image" 
                      value={editingItem.image || ''} 
                      onChange={(val) => setEditingItem({ ...editingItem, image: val })}
                    />
                  </div>
                )}

                {/* TEAM MEMBERS / RESEARCHERS FIELDS */}
                {activeTab.startsWith('team_') && (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        value={editingItem.name || ''} 
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        required
                        className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Role/Position (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.role?.en || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, role: { ...editingItem.role, en: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Role/Position (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                        <input 
                          type="text" 
                          value={editingItem.role?.id || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, role: { ...editingItem.role, id: e.target.value } })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          value={editingItem.email || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <ImageUploadField 
                        label="Avatar / Photo" 
                        value={editingItem.image || ''} 
                        onChange={(val) => setEditingItem({ ...editingItem, image: val })}
                      />
                    </div>

                    {activeTab === 'team_collaborators' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Institution Name (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                          <input 
                            type="text" 
                            value={editingItem.institution?.en || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, institution: { ...editingItem.institution, en: e.target.value } })}
                            required
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Institution Name (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                          <input 
                            type="text" 
                            value={editingItem.institution?.id || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, institution: { ...editingItem.institution, id: e.target.value } })}
                            required
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    )}

                    {(activeTab === 'team_assistants' || activeTab === 'team_collaborators' || activeTab.startsWith('team_postgraduate') || activeTab.startsWith('team_graduate') || activeTab.startsWith('team_undergraduate')) && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Research Topic / Title (EN) <Globe className="w-3 h-3 text-teal-500" /></label>
                          <input 
                            type="text" 
                            value={editingItem.topic?.en || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, topic: { ...editingItem.topic, en: e.target.value } })}
                            required
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1 col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Research Topic / Title (ID) <Globe className="w-3 h-3 text-teal-500" /></label>
                          <input 
                            type="text" 
                            value={editingItem.topic?.id || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, topic: { ...editingItem.topic, id: e.target.value } })}
                            required
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    )}

                    {(activeTab.startsWith('team_postgraduate') || activeTab.startsWith('team_graduate') || activeTab.startsWith('team_undergraduate')) && (
                      <div className="grid grid-cols-1 gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Supervisor Name</label>
                        <input 
                          type="text" 
                          value={editingItem.supervisor || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, supervisor: e.target.value })}
                          required
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    )}

                    {/* Research Focus for Leadership and Core Members */}
                    {(activeTab === 'team_leadership' || activeTab === 'team_members') && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Research Focus (EN)</label>
                          <input 
                            type="text" 
                            value={editingItem.researchFocus?.en || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, researchFocus: { ...editingItem.researchFocus, en: e.target.value } })}
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Research Focus (ID)</label>
                          <input 
                            type="text" 
                            value={editingItem.researchFocus?.id || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, researchFocus: { ...editingItem.researchFocus, id: e.target.value } })}
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Interests only for other team types (NOT leadership, assistants, or members) */}
                    {activeTab !== 'team_leadership' && activeTab !== 'team_assistants' && activeTab !== 'team_members' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Interests (EN - comma separated)</label>
                          <input 
                            type="text" 
                            value={editingItem.interests?.en || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, interests: { ...editingItem.interests, en: e.target.value } })}
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">Interests (ID - comma separated)</label>
                          <input 
                            type="text" 
                            value={editingItem.interests?.id || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, interests: { ...editingItem.interests, id: e.target.value } })}
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Google Scholar URL</label>
                        <input 
                          type="text" 
                          value={editingItem.scholar || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, scholar: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scopus ID URL</label>
                        <input 
                          type="text" 
                          value={editingItem.scopus || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, scopus: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ORCID iD URL</label>
                        <input 
                          type="text" 
                          value={editingItem.orcid || ''} 
                          onChange={(e) => setEditingItem({ ...editingItem, orcid: e.target.value })}
                          className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {activeTab === 'team_leadership' && (
                      <>
                        <div className="grid grid-cols-1 gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Research Projects (One per line)</label>
                          <textarea 
                            rows={2}
                            value={editingItem.currentProjects || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, currentProjects: e.target.value })}
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest Publications (One per line)</label>
                          <textarea 
                            rows={2}
                            value={editingItem.latestPublications || ''} 
                            onChange={(e) => setEditingItem({ ...editingItem, latestPublications: e.target.value })}
                            className="px-4 py-2.5 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

              </div>

              {/* Form Actions Footer */}
              <div className="flex justify-end items-center px-6 py-4 border-t border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-950 space-x-3">
                <button 
                  type="button" 
                  onClick={() => { setIsFormOpen(false); setEditingItem(null); }}
                  className="px-5 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Save Changes' : 'Simpan Perubahan'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
