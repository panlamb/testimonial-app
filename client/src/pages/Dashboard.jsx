import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import TestimonialCard from '../components/TestimonialCard'

const FILTERS = ['all', 'pending', 'approved', 'rejected', 'hidden']

export default function Dashboard() {
  const [business, setBusiness] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')
  const [branding, setBranding] = useState({ brand_name: '', brand_logo_url: '' })
  const [brandingSaved, setBrandingSaved] = useState(false)
  const [widgetSettings, setWidgetSettings] = useState({
    cardBg: '#ffffff', textColor: '#374151', nameColor: '#111827', starsColor: '#f59e0b', borderColor: '#e5e7eb',
  })
  const [widgetSaved, setWidgetSaved] = useState(false)
  const navigate = useNavigate()

  const loadData = useCallback(async () => {
    try {
      const [biz, tests] = await Promise.all([api.dashboard.me(), api.dashboard.testimonials()])
      setBusiness(biz)
      setBranding({ brand_name: biz.brand_name || '', brand_logo_url: biz.brand_logo_url || '' })
      if (biz.widget_settings) {
        setWidgetSettings((prev) => ({ ...prev, ...biz.widget_settings }))
      }
      setTestimonials(tests)
    } catch {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  async function handleWidgetSettingsSave(e) {
    e.preventDefault()
    await api.dashboard.updateWidgetSettings(widgetSettings)
    setWidgetSaved(true)
    setTimeout(() => setWidgetSaved(false), 2000)
  }

  async function handleBrandingSave(e) {
    e.preventDefault()
    await api.dashboard.updateBranding(branding)
    setBusiness((prev) => ({ ...prev, ...branding }))
    setBrandingSaved(true)
    setTimeout(() => setBrandingSaved(false), 2000)
  }

  useEffect(() => { loadData() }, [loadData])

  async function handleStatusChange(id, status) {
    await api.dashboard.updateStatus(id, status)
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  async function handleDelete(id) {
    if (!window.confirm('Permanently delete this testimonial?')) return
    await api.dashboard.delete(id)
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">Loading…</div>
    )
  }

  const origin = window.location.origin
  const collectUrl = `${origin}/collect/${business.slug}`
  const wallUrl = `${origin}/wall/${business.slug}`
  const widgetScript = `<script src="${origin}/widget/${business.slug}.js"></script>`

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'all' ? testimonials.length : testimonials.filter((t) => t.status === f).length
    return acc
  }, {})

  const filtered = filter === 'all' ? testimonials : testimonials.filter((t) => t.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{business.name}</h1>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                business.plan === 'paid'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {business.plan === 'paid' ? 'Pro' : 'Free'}
            </span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('business')
              navigate('/login')
            }}
            className="text-sm text-gray-500 hover:text-gray-800 shrink-0"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Links / sharing */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Your Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ShareCard
              title="Collection Page"
              subtitle="Send to customers"
              value={collectUrl}
              href={collectUrl}
              onCopy={() => copy(collectUrl, 'collect')}
              copied={copied === 'collect'}
            />
            <ShareCard
              title="Wall of Love"
              subtitle="Public testimonial page"
              value={wallUrl}
              href={wallUrl}
              onCopy={() => copy(wallUrl, 'wall')}
              copied={copied === 'wall'}
            />
            <ShareCard
              title="Embed Widget"
              subtitle="Paste into any website"
              value={widgetScript}
              onCopy={() => copy(widgetScript, 'widget')}
              copied={copied === 'widget'}
              isCode
            />
          </div>
        </section>

        {/* White Label Branding */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            White Label Branding
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-4">
              Αντικατάστησε το "Fimi" με το δικό σου brand στις σελίδες των πελατών σου.
            </p>
            <form onSubmit={handleBrandingSave} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Όνομα brand (π.χ. Acme Agency)"
                value={branding.brand_name}
                onChange={(e) => setBranding({ ...branding, brand_name: e.target.value })}
                className="input flex-1"
              />
              <input
                type="url"
                placeholder="URL logo (προαιρετικό)"
                value={branding.brand_logo_url}
                onChange={(e) => setBranding({ ...branding, brand_logo_url: e.target.value })}
                className="input flex-1"
              />
              <button type="submit" className="btn-primary shrink-0">
                {brandingSaved ? 'Αποθηκεύτηκε!' : 'Αποθήκευση'}
              </button>
            </form>
          </div>
        </section>

        {/* Widget Appearance */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Widget Appearance
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-4">
              Customize the widget colors to match your site's branding.
            </p>
            <form onSubmit={handleWidgetSettingsSave}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                {[
                  { key: 'cardBg', label: 'Card background' },
                  { key: 'borderColor', label: 'Border' },
                  { key: 'textColor', label: 'Text' },
                  { key: 'nameColor', label: 'Name' },
                  { key: 'starsColor', label: 'Stars' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex flex-col items-center gap-2">
                    <input
                      type="color"
                      value={widgetSettings[key]}
                      onChange={(e) => setWidgetSettings((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                    />
                    <span className="text-xs text-gray-500 text-center">{label}</span>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn-primary">
                {widgetSaved ? 'Αποθηκεύτηκε!' : 'Αποθήκευση'}
              </button>
            </form>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', val: counts.all, color: 'text-gray-900' },
            { label: 'Pending', val: counts.pending, color: 'text-amber-600' },
            { label: 'Approved', val: counts.approved, color: 'text-green-600' },
            { label: 'Rejected', val: counts.rejected, color: 'text-red-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className={`text-3xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Free tier nudge */}
        {business.plan === 'free' && counts.approved > 3 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 text-sm text-indigo-700">
            <strong>Free plan:</strong> Only the 3 most recent approved testimonials show publicly.
            Upgrade to Pro to display all of them.
          </div>
        )}

        {/* Testimonials */}
        <section>
          <div className="flex gap-2 flex-wrap mb-5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}&nbsp;({counts[f]})
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              {filter === 'all'
                ? 'No testimonials yet — share your collection link!'
                : `No ${filter} testimonials.`}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((t) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  showActions
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function ShareCard({ title, subtitle, value, href, onCopy, copied, isCode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-gray-900 text-sm">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-600 hover:underline shrink-0"
          >
            Open →
          </a>
        )}
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1.5 truncate text-gray-500">
          {value}
        </code>
        <button
          onClick={onCopy}
          className="shrink-0 text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
