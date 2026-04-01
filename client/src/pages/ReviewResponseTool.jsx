import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ReviewResponseTool() {
  const [review, setReview] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!review.trim()) return
    setLoading(true)
    setError('')
    setResponse('')
    try {
      const res = await fetch('/api/tools/review-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, businessName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResponse(data.response)
    } catch (err) {
      setError(err.message || 'Failed to generate response')
    } finally {
      setLoading(false)
    }
  }

  function copy() {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Try free →
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-800 rounded-full px-3 py-1">
            Free Tool
          </div>
          <h1 className="text-3xl font-bold">Negative Review Response Generator</h1>
          <p className="text-gray-400">
            Paste a negative review and get a professional, empathetic response in seconds.
            Free — no account needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Your business name (optional)</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Acme Restaurant"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Paste the negative review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              placeholder="The service was slow and the food was cold. Not impressed at all."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 resize-y"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !review.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Generating…' : 'Generate response →'}
          </button>
        </form>

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {response && (
          <div className="space-y-3">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Your response</p>
                <button
                  onClick={copy}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">{response}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-2xl p-6 text-center space-y-3">
          <p className="font-bold text-lg">Want to catch negative reviews before they go public?</p>
          <p className="text-gray-400 text-sm">
            Fimi filters 1-2 star reviews privately — so unhappy customers reach you, not Google.
            Free to start.
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            Try Fimi free →
          </Link>
        </div>
      </main>
    </div>
  )
}
