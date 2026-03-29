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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-500">This wall doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>
    )
  }

  const { business, testimonials } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <p className="text-indigo-600 font-medium uppercase tracking-widest text-xs mb-3">
            Wall of Love
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            What people say about{' '}
            <span className="text-indigo-600">{business.name}</span>
          </h1>
          {testimonials.length > 0 && (
            <p className="text-gray-500 mt-4 text-lg">
              {testimonials.length} happy{' '}
              {testimonials.length === 1 ? 'customer' : 'customers'}
            </p>
          )}
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⭐</div>
            <p className="text-gray-400">No approved testimonials yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="break-inside-avoid mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
              >
                {t.screenshot_url && (
                  <img
                    src={t.screenshot_url}
                    alt="Review screenshot"
                    className="w-full rounded-lg mb-4 object-cover"
                  />
                )}
                <StarRating value={t.rating} readonly />
                <p className="text-gray-700 mt-3 mb-5 leading-relaxed">
                  &ldquo;{t.review_text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                    {t.customer_name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.customer_name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(t.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {business.plan === 'free' && (
          <p className="text-center text-sm text-gray-400 mt-12">
            Powered by <span className="font-medium text-gray-500">TestimonialApp</span>
          </p>
        )}
      </div>
    </div>
  )
}
