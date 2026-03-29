import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api'
import StarRating from '../components/StarRating'

export default function CollectPage() {
  const { slug } = useParams()
  const [business, setBusiness] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({ customer_name: '', customer_email: '', review_text: '', rating: 0, consent: false })
  const [screenshot, setScreenshot] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [deleteToken, setDeleteToken] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.collect.getPage(slug).then(setBusiness).catch(() => setNotFound(true))
  }, [slug])

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setScreenshot(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.rating === 0) return setError('Παρακαλώ επιλέξτε αξιολόγηση αστεριών.')
    if (!form.consent) return setError('Πρέπει να αποδεχτείτε τους όρους για να υποβάλετε κριτική.')
    setError('')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('customer_name', form.customer_name)
      fd.append('customer_email', form.customer_email)
      fd.append('review_text', form.review_text)
      fd.append('rating', form.rating)
      fd.append('consent', 'true')
      if (screenshot) fd.append('screenshot', screenshot)
      const result = await api.collect.submit(slug, fd)
      setDeleteToken(result.deleteToken)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (notFound) {
    return (
      <Dark>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Η σελίδα δεν βρέθηκε</h2>
          <p className="text-gray-400">Αυτή η σελίδα συλλογής δεν υπάρχει.</p>
        </div>
      </Dark>
    )
  }

  if (!business) {
    return <Dark><p className="text-gray-400">Φόρτωση…</p></Dark>
  }

  if (submitted) {
    const deleteUrl = `${window.location.origin}/delete/${deleteToken}`
    return (
      <Dark>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ευχαριστούμε!</h2>
          <p className="text-gray-400 mb-8">Η κριτική σας υποβλήθηκε και αναμένει έγκριση.</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
            <p className="text-xs font-semibold text-indigo-400 mb-2">Δικαίωμα διαγραφής (GDPR)</p>
            <p className="text-xs text-gray-400 mb-3">
              Αποθηκεύστε τον παρακάτω σύνδεσμο για να διαγράψετε την κριτική σας ανά πάσα στιγμή.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-black/30 border border-white/10 rounded px-2 py-1.5 truncate text-gray-400">
                {deleteUrl}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(deleteUrl)}
                className="shrink-0 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
              >
                Αντιγραφή
              </button>
            </div>
          </div>
        </div>
      </Dark>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-4">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-lg mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Fimi
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Μοιραστείτε την εμπειρία σας</h1>
          <p className="text-gray-400 mb-8">
            Αφήστε μια κριτική για <span className="text-white font-medium">{business.name}</span>
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Όνομα">
              <input
                type="text"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                className="dark-input"
                placeholder="Μαρία Παπαδοπούλου"
                required
              />
            </Field>

            <Field label="Email" sublabel="(προαιρετικό)">
              <input
                type="email"
                value={form.customer_email}
                onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                className="dark-input"
                placeholder="maria@example.com"
              />
            </Field>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Αξιολόγηση</label>
              <StarRating value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
            </div>

            <Field label="Η κριτική σας">
              <textarea
                value={form.review_text}
                onChange={(e) => setForm({ ...form, review_text: e.target.value })}
                className="dark-input resize-none"
                placeholder="Τι πιστεύετε;"
                rows={4}
                required
              />
            </Field>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Screenshot <span className="text-gray-500 font-normal">(προαιρετικό)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30"
              />
              {preview && (
                <img src={preview} alt="Προεπισκόπηση" className="mt-3 rounded-xl max-h-48 object-cover w-full opacity-80" />
              )}
            </div>

            {/* Consent */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-white/10 text-indigo-600 focus:ring-indigo-500 shrink-0"
                />
                <span className="text-xs text-gray-400 leading-relaxed">
                  Συμφωνώ τα στοιχεία μου να αποθηκευτούν και ενδεχομένως να δημοσιευτούν.
                  Μπορώ να ζητήσω διαγραφή ανά πάσα στιγμή. Διαβάστε την{' '}
                  <Link to="/privacy" target="_blank" className="text-indigo-400 underline">
                    Πολιτική Απορρήτου
                  </Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition disabled:opacity-50 shadow-lg shadow-indigo-900/40"
            >
              {loading ? 'Υποβολή…' : 'Υποβολή Κριτικής'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Powered by{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-semibold">
            Fimi
          </span>
        </p>
      </div>
    </div>
  )
}

function Field({ label, sublabel, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}{' '}
        {sublabel && <span className="text-gray-500 font-normal">{sublabel}</span>}
      </label>
      {children}
    </div>
  )
}

function Dark({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      {children}
    </div>
  )
}
