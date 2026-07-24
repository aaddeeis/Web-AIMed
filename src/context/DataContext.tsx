import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type {
  Dataset,
  EventItem,
  NewsItem,
  Partner,
  Promotion,
  ShowcaseProject,
} from '../types'
import { getCollection, getYouTubeId, localized, mediaURL, textFromLexical, yearFromDate } from '../lib/payload'

export interface Person {
  id: string
  name: string
  role: { en: string; id: string }
  email?: string
  image?: string
  institution?: { en: string; id: string }
  topic?: { en: string; id: string }
  supervisor?: string
  interests?: { en: string[]; id: string[] }
  researchFocus?: { en: string; id: string }
  scholar?: string
  scopus?: string
  orcid?: string
}

export interface PublicationsData {
  journals: any[]
  conferences: any[]
  ipr: any[]
  books: any[]
}

export interface InfrastructureItem {
  id: string
  name: { en: string; id: string }
  description: { en: string; id: string }
  type: string
  image: string
  specification: { id?: string; name: string; values: string[] }[]
}

type CmsData = {
  showcaseProjects: ShowcaseProject[]
  publicationsData: PublicationsData
  datasets: Dataset[]
  news: NewsItem[]
  events: EventItem[]
  leadership: Person[]
  assistants: Person[]
  members: Person[]
  collaborators: Person[]
  postgraduate: Person[]
  graduate: Person[]
  undergraduate: Person[]
  youtubeVideos: any[]
  instagramPosts: any[]
  massMedia: any[]
  partners: Partner[]
  conferencesOrganized: any[]
  journalsOrganized: any[]
  promotions: Promotion[]
  infrastructures: InfrastructureItem[]
}

type DataContextType = CmsData & {
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const emptyData: CmsData = {
  showcaseProjects: [], publicationsData: { journals: [], conferences: [], ipr: [], books: [] }, datasets: [], news: [], events: [],
  leadership: [], assistants: [], members: [], collaborators: [], postgraduate: [], graduate: [], undergraduate: [],
  youtubeVideos: [], instagramPosts: [], massMedia: [], partners: [], conferencesOrganized: [], journalsOrganized: [], promotions: [], infrastructures: [],
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
const text = (value: unknown): string => typeof value === 'string' ? value : ''
const localizedStrings = (value: unknown): { id: string[]; en: string[] } => {
  if (Array.isArray(value)) return { id: strings(value), en: strings(value) }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const id = strings(record.id)
    const en = strings(record.en)
    return { id: id.length ? id : en, en: en.length ? en : id }
  }
  return { id: [], en: [] }
}

const person = (doc: any, role: Person['role'], options: { topic?: unknown } = {}): Person => ({
  id: text(doc.id),
  name: text(doc.name),
  role,
  email: text(doc.email) || undefined,
  image: mediaURL(doc.image) || undefined,
  scholar: text(doc.googleScholarUrl) || undefined,
  scopus: text(doc.scopusUrl) || undefined,
  orcid: text(doc.orcidUrl) || undefined,
  researchFocus: localized(strings(doc.researchFocuses).join(', ')),
  topic: options.topic ? localized(options.topic) : undefined,
})

const loadCmsData = async (): Promise<CmsData> => {
  const [
    products, datasets, activities, events, youtubeVideos, instagramFeeds, massMedia, partners, journals, conferences, ipr, books,
    organizingConferences, organizingJournals, promotions, leadership, assistants, members, collaborators, postgraduate, graduate, undergraduate, infrastructures,
  ] = await Promise.all([
    getCollection<any>('products'), getCollection<any>('datasets'), getCollection<any>('activities'), getCollection<any>('events'),
    getCollection<any>('youtube-videos'), getCollection<any>('instagram-feeds'), getCollection<any>('mass-media'), getCollection<any>('partners'),
    getCollection<any>('international-journals'), getCollection<any>('international-conferences'), getCollection<any>('intellectual-property-rights'), getCollection<any>('books'),
    getCollection<any>('organizing-conferences'), getCollection<any>('organizing-journals'), getCollection<any>('promotions'), getCollection<any>('leadership'),
    getCollection<any>('research-assistants'), getCollection<any>('core-members'), getCollection<any>('external-collaborators'),
    getCollection<any>('postgraduate-students'), getCollection<any>('graduate-students'), getCollection<any>('undergraduate-students'), getCollection<any>('infrastructures'),
  ])

  return {
    showcaseProjects: products.map((item): ShowcaseProject => ({
      id: text(item.id), name: localized(item.title).id, tagline: localized(item.shortDescription), description: localized(item.longDescription || item.shortDescription),
      image: mediaURL(item.image), websiteUrl: text(item.websiteUrl) || undefined, videoUrl: text(item.demoVideoUrl) || undefined,
      publicationUrl: text(item.publicationUrl) || undefined, features: localizedStrings(item.features),
    })),
    datasets: datasets.map((item): Dataset => ({
      id: text(item.id), name: localized(item.name).id, description: localized(item.description), size: [text(item.sizeValue), text(item.sizeUnit)].filter(Boolean).join(' '),
      downloadUrl: text(item.downloadUrl), license: text(item.license), paperRef: text(item.paperRef), benchmark: text(item.origin), image: mediaURL(item.sampleImages?.[0]),
    })),
    news: activities.map((item): NewsItem => ({
      id: text(item.id), title: localized(item.title), category: localized(item.category).id || undefined, date: text(item.date), content: localized({ id: textFromLexical(item.content?.id || item.content), en: textFromLexical(item.content?.en || item.content) }),
      image: mediaURL(item.headerImage), tags: strings(item.tags),
    })),
    events: events.map((item): EventItem => ({
      id: text(item.id), title: localized(item.title), date: text(item.date), time: text(item.time), location: localized(item.location), type: item.type === 'past' ? 'past' : 'upcoming',
      registerUrl: text(item.registerUrl) || undefined, image: mediaURL(item.image), description: localized(item.description),
    })),
    youtubeVideos: youtubeVideos.map((item) => {
      const url = text(item.url)
      const embedId = getYouTubeId(url)
      return { id: text(item.id), title: localized(item.title), link: url, embedId, thumbnail: embedId ? `https://img.youtube.com/vi/${embedId}/hqdefault.jpg` : '', duration: '', views: '' }
    }),
    instagramPosts: instagramFeeds.map((item) => ({ id: text(item.id), caption: localized(item.title), link: text(item.url) })),
    massMedia: massMedia.map((item) => ({ id: text(item.id), title: localized(item.title), publisher: text(item.publisher), date: text(item.date), summary: localized(item.summary), link: text(item.url), image: mediaURL(item.image) })),
    partners: partners.map((item): Partner => ({ id: text(item.id), name: text(item.name), logo: mediaURL(item.logo), websiteUrl: text(item.websiteUrl) || undefined })),
    publicationsData: {
      journals: journals.map((item) => ({ id: text(item.id), title: localized(item.title).id, authors: strings(item.authors).join(', '), journal: text(item.journalName), year: yearFromDate(item.publicationDate), details: text(item.articleNumber), doi: text(item.doi), impact: text(item.quartile), link: text(item.url) })),
      conferences: conferences.map((item) => ({ id: text(item.id), title: localized(item.title).id, authors: strings(item.authors).join(', '), conference: text(item.conferenceName), year: yearFromDate(item.publicationDate), details: text(item.articleNumber), doi: text(item.doi), link: text(item.url), location: '' })),
      ipr: ipr.map((item) => ({ id: text(item.id), title: localized(item.title).id, type: text(item.type), date: text(item.dateIssued), regNo: text(item.registrationNumber), holder: strings(item.holders).join(', '), link: text(item.url) })),
      books: books.map((item) => ({ id: text(item.id), title: localized(item.title).id, authors: strings(item.authors).join(', '), publisher: text(item.publisher), year: item.yearPublished, pages: item.pageCount ? `${item.pageCount} pages` : '', desc: localized(item.description).id, link: text(item.url) })),
    },
    conferencesOrganized: organizingConferences.map((item) => ({ id: text(item.id), title: localized(item.title).id, role: text(item.role), date: text(item.dateLabel), location: text(item.location), stats: localized(item.shortDescription).id, desc: localized(item.longDescription), url: text(item.websiteUrl) })),
    journalsOrganized: organizingJournals.map((item) => ({ id: text(item.id), title: localized(item.title).id, publisher: text(item.publisher), frequency: text(item.frequency), indexing: text(item.indexRanking), issn: [text(item.eissn) && `E-ISSN: ${item.eissn}`, text(item.pissn) && `P-ISSN: ${item.pissn}`].filter(Boolean).join('; '), desc: localized(item.description), url: '' })),
    promotions: promotions.map((item): Promotion => ({ id: text(item.id), title: localized(item.title), category: text(item.category), date: text(item.date), coverage: localized(item.coverage), image: mediaURL(item.image), url: text(item.url) })),
    leadership: leadership.map((item) => person(item, item.role === 'secretary' ? { en: 'Secretary', id: 'Sekretaris' } : { en: 'Head', id: 'Ketua' })),
    assistants: assistants.map((item) => person(item, { en: 'Research Assistant', id: 'Asisten Peneliti' })),
    members: members.map((item) => person(item, { en: 'Core Member', id: 'Anggota Inti' })),
    collaborators: collaborators.map((item) => person(item, { en: 'External Collaborator', id: 'Kolaborator Eksternal' })),
    postgraduate: postgraduate.map((item) => person(item, { en: 'Postgraduate Student', id: 'Mahasiswa Pascasarjana' }, { topic: item.thesisTitle })),
    graduate: graduate.map((item) => person(item, { en: 'Graduate Student', id: 'Mahasiswa Lulusan' }, { topic: item.thesisTitle })),
    undergraduate: undergraduate.map((item) => person(item, { en: 'Undergraduate Student', id: 'Mahasiswa Sarjana' }, { topic: item.thesisTitle })),
    infrastructures: infrastructures.map((item): InfrastructureItem => ({ id: text(item.id), name: localized(item.name), description: localized(item.description), type: text(item.type), image: mediaURL(item.image), specification: Array.isArray(item.specification) ? item.specification.map((spec: any) => ({ id: text(spec.id), name: text(spec.name), values: strings(spec.values) })) : [] })),
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(emptyData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      setData(await loadCmsData())
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load CMS content')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { void refetch() }, [])

  const value = useMemo(() => ({ ...data, isLoading, error, refetch }), [data, isLoading, error])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within a DataProvider')
  return context
}
