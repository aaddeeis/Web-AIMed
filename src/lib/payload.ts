const payloadBaseURL = import.meta.env.DEV
  ? '/cms-api'
  : (import.meta.env.VITE_PAYLOAD_URL || 'https://admin.aimed.durianworks.my.id').replace(/\/$/, '')

type PayloadList<T> = { docs?: T[] }

export type LocalizedValue = { id: string; en: string }

export const emptyLocalized = (): LocalizedValue => ({ id: '', en: '' })

export const localized = (value: unknown): LocalizedValue => {
  if (typeof value === 'string') return { id: value, en: value }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const id = typeof record.id === 'string' ? record.id : ''
    const en = typeof record.en === 'string' ? record.en : id
    return { id: id || en, en: en || id }
  }
  return emptyLocalized()
}

export const mediaURL = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  const url = (value as { url?: unknown }).url
  if (typeof url !== 'string' || !url) return ''
  return /^https?:\/\//.test(url) ? url : `${payloadBaseURL}${url}`
}

export const textFromLexical = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  const root = (value as { root?: unknown }).root
  if (!root || typeof root !== 'object') return ''

  const visit = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const record = node as { text?: unknown; children?: unknown[]; type?: unknown }
    if (typeof record.text === 'string') return record.text
    const content = Array.isArray(record.children) ? record.children.map(visit).join('') : ''
    return record.type === 'paragraph' && content ? `${content}\n\n` : content
  }

  const children = (root as { children?: unknown[] }).children
  return Array.isArray(children) ? children.map(visit).join('').trim() : ''
}

export const yearFromDate = (value: unknown): number | undefined => {
  if (typeof value !== 'string') return undefined
  const year = new Date(value).getFullYear()
  return Number.isNaN(year) ? undefined : year
}

export const getYouTubeId = (url: string): string => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1)
    if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v') || parsed.pathname.split('/').pop() || ''
  } catch {
    return ''
  }
  return ''
}

export async function getCollection<T>(collection: string): Promise<T[]> {
  const query = new URLSearchParams({ depth: '1', limit: '0', locale: 'all', fallbackLocale: 'false' })
  const response = await fetch(`${payloadBaseURL}/api/${collection}?${query}`, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new Error(`Unable to load ${collection} (${response.status})`)
  const body = (await response.json()) as PayloadList<T>
  return body.docs || []
}
