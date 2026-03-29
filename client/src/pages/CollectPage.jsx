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

  if (notFound) return <NotFound />

  if (!business) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Φόρτωση…</div>
  }

  if (submitted) {
    const deleteUrl = `${window.location.origin}/delete/${deleteToken}`
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ευχαριστούμε!</h2>
          <p className="text-gray-500 mb-8">Η κριτική σας υποβλήθηκε και αναμένει έγκριση.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Δικαίωμα διαγραφής (GDPR)
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Μπορείτε να διαγράψετε την κριτική σας ανά πάσα στιγμή μέσω του παρακάτω συνδέσμου.
              <strong className="text-gray-700"> Αποθηκεύστε τον τώρα</strong> — δεν θα σας αποσταλεί email.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-white border border-gray-200 rounded px-2 py-1.5 truncate text-gray-500">
                {deleteUrl}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(deleteUrl)}
                className="shrink-0 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Αντιγραφή
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex items-start justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mt-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Μοιραστείτε την εμπειρία σας</h1>
        <p className="text-gray-500 mb-6">
          Αφήστε μια κριτική για <strong>{business.name}</strong>
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Όνομα</label>
            <input
              type="text"
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              className="input"
              placeholder="Μαρία Παπαδοπούλου"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email{' '}
              <span className="font-normal text-gray-400">(προαιρετικό — μόνο για επικοινωνία σχετικά με τα δεδομένα σας)</span>
            </label>
            <input
              type="email"
              value={form.customer_email}
              onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
              className="input"
              placeholder="maria@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Αξιολόγηση</label>
            <StarRating value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Η κριτική σας</label>
            <textarea
              value={form.review_text}
              onChange={(e) => setForm({ ...form, review_text: e.target.value })}
              className="input resize-none"
              placeholder="Τι πιστεύετε;"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Screenshot{' '}
              <span className="font-normal text-gray-400">(προαιρετικό)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {preview && (
              <img src={preview} alt="Προεπισκόπηση" className="mt-3 rounded-lg max-h-48 object-cover w-full" />
            )}
          </div>

          {/* GDPR Consent */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                Συμφωνώ τα στοιχεία μου (όνομα, κριτική) να αποθηκευτούν και ενδεχομένως να δημοσιευτούν
                από την επιχείρηση. Μπορώ να ζητήσω διαγραφή ανά πάσα στιγμή. Διαβάστε την{' '}
                <Link to="/privacy" target="_blank" className="text-indigo-600 underline">
                  Πολιτική Απορρήτου
                </Link>
                .
              </span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Υποβολή…' : 'Υποβολή Κριτικής'}
          </button>
        </form>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Η σελίδα δεν βρέθηκε</h2>
        <p className="text-gray-500">Αυτή η σελίδα συλλογής δεν υπάρχει.</p>
      </div>
    </div>
  )
}
