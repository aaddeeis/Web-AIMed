export type Language = 'en' | 'id';

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  area: string;
  type: 'journal' | 'conference';
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  publisher: string;
  doi: string;
  pdfUrl: string;
  bibtex: string;
  citation: string;
  relatedDataset?: string;
  abstract: string;
}

export interface Researcher {
  id: string;
  name: string;
  position: {
    en: string;
    id: string;
  };
  email: string;
  scholar: string;
  scopus: string;
  orcid: string;
  researchGate?: string;
  linkedIn?: string;
  website?: string;
  image: string;
  interests: {
    en: string[];
    id: string[];
  };
  keywords: string[];
  latestPublications: string[];
  currentProjects: string[];
}

export interface ResearchGroup {
  id: string;
  name: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  lead: string;
  keywords: string[];
  icon: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: {
    en: string;
    id: string;
  };
  size: string;
  downloadUrl: string;
  license: string;
  paperRef: string;
  benchmark: string;
  image: string;
}

export interface ShowcaseProject {
  id: string;
  name: string;
  tagline: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  image: string;
  demoUrl?: string;
  publicationUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
  features: {
    en: string[];
    id: string[];
  };
}

export interface NewsItem {
  id: string;
  title: {
    en: string;
    id: string;
  };
  category?: string;
  date: string;
  content: {
    en: string;
    id: string;
  };
  image: string;
  images?: string[];
  tags?: string[];
}

export interface EventItem {
  id: string;
  title: {
    en: string;
    id: string;
  };
  date: string;
  time: string;
  location: {
    en: string;
    id: string;
  };
  type: 'upcoming' | 'past';
  registerUrl?: string;
  image: string;
  description: {
    en: string;
    id: string;
  };
}

export interface Collaboration {
  id: string;
  country: {
    en: string;
    id: string;
  };
  countryCode: string; // ISO 2-letter or map code
  institutes: string[];
  type: 'university' | 'hospital' | 'institute' | 'industry';
  projects: {
    en: string;
    id: string;
  }[];
  coordinates: { x: number; y: number }; // Percentage coordinate for our custom SVG map
}

export interface TimelineProject {
  id: string;
  title: {
    en: string;
    id: string;
  };
  funding: string;
  collaborators: string[];
  progress: number; // 0-100 percentage
  year: number;
  status: 'planning' | 'ongoing' | 'completed';
  outputs: string[];
  description: {
    en: string;
    id: string;
  };
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  websiteUrl?: string;
}

export interface SDGContent {
  title: { en: string; id: string };
  subtitle: { en: string; id: string };
  sdg3Title: { en: string; id: string };
  sdg3Text: { en: string; id: string };
  sdg3Image: string;
  sdg9Title: { en: string; id: string };
  sdg9Text: { en: string; id: string };
  sdg9Image: string;
}

export interface ConferenceOrganized {
  id: string;
  title: string;
  role: string;
  date: string;
  location: string;
  stats: string;
  url: string;
  desc: {
    en: string;
    id: string;
  };
}

export interface JournalOrganized {
  id: string;
  title: string;
  publisher: string;
  issn: string;
  frequency: string;
  indexing: string;
  url: string;
  desc: {
    en: string;
    id: string;
  };
}

export interface Promotion {
  id: string;
  title: {
    en: string;
    id: string;
  };
  category: string;
  date: string;
  coverage: {
    en: string;
    id: string;
  };
  image: string;
  url: string;
}

