import { useEffect } from 'react'

const SITE = 'The AI Flywheel'
const ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'https://aiflywheel.example'
const DEFAULT_DESC = 'The standard for turning AI into compounding value — four stages, the DRIVE method, CORE governance. Run the free diagnostic. One framework, three scales, four actors.'
const OG_IMAGE = '/og-image.png' // PNG renders reliably across social platforms (SVG retained as source)

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

interface Props {
  title?: string
  description?: string
  path?: string // canonical path; defaults to current
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object | object[]
  noindex?: boolean
}

export function Seo({ title, description, path, image = OG_IMAGE, type = 'website', jsonLd, noindex }: Props) {
  const fullTitle = title ? `${title} · ${SITE}` : `${SITE} — Turn AI into compounding value, at any scale`
  const desc = description || DEFAULT_DESC
  const canonical = ORIGIN + (path ?? (typeof window !== 'undefined' ? window.location.pathname : '/'))
  const img = image.startsWith('http') ? image : ORIGIN + image

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow')
    upsertLink('canonical', canonical)
    // Open Graph
    upsertMeta('property', 'og:site_name', SITE)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:type', 'image/png')
    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', img)

    // JSON-LD structured data
    const existing = document.getElementById('seo-jsonld')
    if (existing) existing.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'seo-jsonld'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [fullTitle, desc, canonical, img, type, noindex, JSON.stringify(jsonLd)])

  return null
}

// Helpers for common structured-data shapes
export const breadcrumbLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: ORIGIN + url,
  })),
})

export const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE,
  url: ORIGIN,
  slogan: 'Add 1. Become the one.',
  description: DEFAULT_DESC,
  sameAs: [
    'https://www.youtube.com/@aiflywheel',
    'https://www.linkedin.com/company/aiflywheel',
    'https://x.com/aiflywheel',
  ],
})
