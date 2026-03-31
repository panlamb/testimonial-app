import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import StarRating from '../components/StarRating'

export default function WallPage() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    api.wall.get(slug).then(setData).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Η σελίδα δεν βρέθηκε</h2>
          <p className="text-gray-400">Αυτό το wall δεν υπάρχει.</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-gray-400">
        Φόρτωση…
      </div>
    )
  }

  const { business, testimonials } = data

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          {business.brand_logo_url ? (
            <img src={business.brand_logo_url} alt={business.brand_name || business.name} className="h-10 mx-auto object-contain mb-8" />
          ) : (
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent block mb-8">
              {business.brand_name || 'Fimi'}
            </span>
          )}
          <p className="text-indigo-400 text-sm font-semibold tracking-widest mb-4">Wall of Love</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Τι λένε για{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {business.name}
            </span>
          </h1>
          {testimonials.length > 0 && (
            <p className="text-gray-500 mt-4">
              {testimonials.length} ικανοποιημένοι{' '}
              {testimonials.length === 1 ? 'πελάτης' : 'πελάτες'}
            </p>
          )}
        </div>

        {/* Testimonials */}
        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⭐</div>
            <p className="text-gray-500">Δεν υπάρχουν εγκεκριμένες κριτικές ακόμα.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="break-inside-avoid mb-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition"
              >
                {t.screenshot_url && (
                  <img
                    src={t.screenshot_url}
                    alt="Review screenshot"
                    className="w-full rounded-xl mb-4 object-cover opacity-90"
                  />
                )}
                <StarRating value={t.rating} readonly />
                <p className="text-gray-300 mt-3 mb-5 leading-relaxed text-sm">
                  &ldquo;{t.review_text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm shrink-0">
                    {t.customer_name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white text-sm">{t.customer_name}</p>
                      {t.verified === 1 && (
                        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full">✓ Verified</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(t.created_at).toLocaleDateString('el-GR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {business.plan === 'free' && !business.brand_name && (
          <p className="text-center text-xs text-gray-600 mt-16">
            Powered by{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-semibold">
              Fimi
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
