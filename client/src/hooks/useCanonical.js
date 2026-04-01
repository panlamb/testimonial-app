import { useEffect } from 'react'

const BASE = 'https://get-fimi.com'
const DEFAULT_TITLE = 'Fimi — Testimonial & Review Collection Software for Small Businesses'
const DEFAULT_DESC = 'Fimi helps small businesses collect customer testimonials, display them on their website, and handle negative reviews privately. Free plan. Pro from €7/mo. No credit card required.'

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (el) el.setAttribute('content', content)
}

function setOg(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (el) el.setAttribute('content', content)
}

export function usePageMeta({ path, title, description }) {
  useEffect(() => {
    // Canonical
    let link = document.querySelector("link[rel='canonical']")
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', `${BASE}${path}`)

    // Title
    if (title) {
      document.title = title
      setOg('og:title', title)
      setMeta('twitter:title', title)
    }

    // Description
    if (description) {
      setMeta('description', description)
      setOg('og:description', description)
      setMeta('twitter:description', description)
    }

    return () => {
      link.setAttribute('href', BASE)
      document.title = DEFAULT_TITLE
      setMeta('description', DEFAULT_DESC)
      setOg('og:title', DEFAULT_TITLE)
      setOg('og:description', DEFAULT_DESC)
      setMeta('twitter:title', DEFAULT_TITLE)
      setMeta('twitter:description', DEFAULT_DESC)
    }
  }, [path, title, description])
}

// Backwards compat for pages that only need canonical
export function useCanonical(path) {
  usePageMeta({ path })
}
