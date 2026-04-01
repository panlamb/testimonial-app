import { useEffect } from 'react'

const BASE = 'https://get-fimi.com'

export function useCanonical(path) {
  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']")
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', `${BASE}${path}`)
    return () => {
      link.setAttribute('href', BASE)
    }
  }, [path])
}
