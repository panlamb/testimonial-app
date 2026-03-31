import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
    if (consent === 'accepted') loadGA()
  }, [])

  function loadGA() {
    if (window._gaLoaded) return
    window._gaLoaded = true
    const s = document.createElement('script')
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-GV9K4ZNQS9'
    s.async = true
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', 'G-GV9K4ZNQS9')
  }

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    loadGA()
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-white/10 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-gray-400 flex-1">
          We use analytics cookies to understand how visitors use Fimi. Read our{' '}
          <Link to="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white transition"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
