import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Stars({ rating }) {
  return (
    <span className="text-amber-400 text-sm">
      {'★'.repeat(Math.round(rating || 0))}{'☆'.repeat(5 - Math.round(rating || 0))}
    </span>
  )
}

export default function Leaderboard() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => { setBusinesses(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Get listed →
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-3xl font-bold">Most Reviewed Businesses on Fimi</h1>
          <p className="text-gray-400">
            The businesses below collect and display the most customer reviews using Fimi.
            <Link to="/register" className="text-indigo-400 hover:underline ml-1">Get your business listed →</Link>
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading…</div>
        ) : businesses.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No businesses yet. <Link to="/register" className="text-indigo-400 hover:underline">Be the first →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {businesses.map((b, i) => (
              <a
                key={b.slug}
                href={`/wall/${b.slug}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-gray-900 border border-gray-800 hover:border-indigo-700 rounded-xl px-5 py-4 transition group"
              >
                <div className="text-2xl font-bold text-gray-600 w-8 shrink-0 text-center">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white group-hover:text-indigo-300 transition truncate">
                    {b.brand_name || b.name}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Stars rating={b.avg_rating} />
                    <span className="text-xs text-gray-500">{b.avg_rating} avg</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-white">{b.approved_count}</div>
                  <div className="text-xs text-gray-500">reviews</div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12 bg-indigo-900/20 border border-indigo-700 rounded-2xl p-6 text-center space-y-3">
          <p className="font-bold">Want your business on this list?</p>
          <p className="text-gray-400 text-sm">Collect your first reviews with Fimi — free to start.</p>
          <Link to="/register" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition">
            Start collecting reviews →
          </Link>
        </div>
      </main>
    </div>
  )
}
