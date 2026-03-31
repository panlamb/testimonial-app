import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import { api } from '../api'
import TestimonialCard from '../components/TestimonialCard'

const FILTERS = ['all', 'pending', 'approved', 'rejected', 'hidden']

export default function Dashboard() {
  const [business, setBusiness] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')
  const [branding, setBranding] = useState({ brand_name: '', brand_logo_url: '', google_review_url: '' })
  const [brandingSaved, setBrandingSaved] = useState(false)
  const [analytics, setAnalytics] = useState(null)
  const [aiSummary, setAiSummary] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [widgetSettings, setWidgetSettings] = useState({
    cardBg: '#ffffff', textColor: '#374151', nameColor: '#111827', starsColor: '#f59e0b', borderColor: '#e5e7eb',
  })
  const [widgetSaved, setWidgetSaved] = useState(false)
  const [reviewRequest, setReviewRequest] = useState({ customer_email: '', customer_name: '' })
  const [reviewRequestStatus, setReviewRequestStatus] = useState('')
  const [aiReplies, setAiReplies] = useState({})
  const [aiReplyLoading, setAiReplyLoading] = useState({})
  const qrRef = useRef(null)
  const navigate = useNavigate()

  const loadData = useCallback(async () => {
    try {
      const [biz, tests, analyticsData] = await Promise.all([api.dashboard.me(), api.dashboard.testimonials(), api.dashboard.analytics()])
      setBusiness(biz)
      setAnalytics(analyticsData)
      setBranding({ brand_name: biz.brand_name || '', brand_logo_url: biz.brand_logo_url || '', google_review_url: biz.google_review_url || '' })
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

  async function handleAiSummary() {
    setAiLoading(true)
    setAiError('')
    try {
      const { summary } = await api.dashboard.aiSummary()
      setAiSummary(summary)
    } catch (err) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }

  async function handleReviewRequest(e) {
    e.preventDefault()
    setReviewRequestStatus('sending')
    try {
      await api.dashboard.requestReview(reviewRequest)
      setReviewRequestStatus('sent')
      setReviewRequest({ customer_email: '', customer_name: '' })
      setTimeout(() => setReviewRequestStatus(''), 3000)
    } catch {
      setReviewRequestStatus('error')
      setTimeout(() => setReviewRequestStatus(''), 3000)
    }
  }

  async function handleAiReply(id) {
    setAiReplyLoading((prev) => ({ ...prev, [id]: true }))
    try {
      const { reply } = await api.dashboard.aiReply(id)
      setAiReplies((prev) => ({ ...prev, [id]: reply }))
    } catch (err) {
      console.error('AI reply error:', err)
    } finally {
      setAiReplyLoading((prev) => ({ ...prev, [id]: false }))
    }
  }

  function downloadQR() {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `fimi-qr-${business.slug}.png`
    a.click()
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

        {/* Request a Review */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Request a Review
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-4">
              Send a review request via email — or share a WhatsApp message directly from your phone.
            </p>
            <form onSubmit={handleReviewRequest} className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                placeholder="Customer name (optional)"
                value={reviewRequest.customer_name}
                onChange={(e) => setReviewRequest({ ...reviewRequest, customer_name: e.target.value })}
                className="input flex-1"
              />
              <input
                type="email"
                placeholder="Customer email"
                value={reviewRequest.customer_email}
                onChange={(e) => setReviewRequest({ ...reviewRequest, customer_email: e.target.value })}
                className="input flex-1"
              />
              <button
                type="submit"
                disabled={reviewRequestStatus === 'sending'}
                className="btn-primary shrink-0"
              >
                {reviewRequestStatus === 'sending' ? 'Sending…'
                  : reviewRequestStatus === 'sent' ? 'Sent!'
                  : reviewRequestStatus === 'error' ? 'Failed — retry'
                  : '✉️ Send Email'}
              </button>
            </form>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hi${reviewRequest.customer_name ? ' ' + reviewRequest.customer_name : ''}! We'd love to hear about your experience with ${business.brand_name || business.name}. It only takes 30 seconds 🙏\n\n${collectUrl}?v=1`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.855L.057 23.998l6.306-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.721.976.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
              Send via WhatsApp
            </a>
            <p className="text-xs text-gray-400 mt-2">WhatsApp opens on your device with a pre-written message ready to send.</p>
          </div>
        </section>

        {/* QR Code */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            QR Code
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row items-center gap-6">
            <div ref={qrRef} className="shrink-0">
              <QRCodeCanvas value={collectUrl} size={140} includeMargin />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                Print this QR code and place it at your counter, on receipts, or business cards. Customers scan it and leave a review instantly.
              </p>
              <button onClick={downloadQR} className="btn-primary self-start">
                Download PNG
              </button>
            </div>
          </div>
        </section>

        {/* White Label Branding */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            White Label Branding
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-4">
              Replace "Fimi" with your own brand on your customers' pages.
            </p>
            <form onSubmit={handleBrandingSave} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Brand name (e.g. Acme Agency)"
                  value={branding.brand_name}
                  onChange={(e) => setBranding({ ...branding, brand_name: e.target.value })}
                  className="input flex-1"
                />
                <input
                  type="url"
                  placeholder="Logo URL (optional)"
                  value={branding.brand_logo_url}
                  onChange={(e) => setBranding({ ...branding, brand_logo_url: e.target.value })}
                  className="input flex-1"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  placeholder="Google Review URL (optional) — e.g. https://g.page/r/..."
                  value={branding.google_review_url}
                  onChange={(e) => setBranding({ ...branding, google_review_url: e.target.value })}
                  className="input flex-1"
                />
                <button type="submit" className="btn-primary shrink-0">
                  {brandingSaved ? 'Saved!' : 'Save'}
                </button>
              </div>
              <p className="text-xs text-gray-400">Google Review URL: happy customers (3+ stars) will be prompted to also leave a Google review after submitting.</p>
            </form>
          </div>
        </section>

        {/* AI Summary */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            AI Summary
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-4">
              Generate a ready-to-use marketing paragraph from all your approved testimonials — perfect for your website, LinkedIn, or email campaigns.
            </p>
            {aiSummary && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 mb-4 text-sm text-indigo-900 leading-relaxed">
                "{aiSummary}"
                <button
                  onClick={() => navigator.clipboard.writeText(aiSummary)}
                  className="ml-3 text-xs text-indigo-500 hover:text-indigo-700 underline"
                >
                  Copy
                </button>
              </div>
            )}
            {aiError && (
              <p className="text-sm text-red-500 mb-4">{aiError}</p>
            )}
            <button onClick={handleAiSummary} disabled={aiLoading} className="btn-primary">
              {aiLoading ? 'Generating…' : aiSummary ? 'Regenerate' : 'Generate Summary'}
            </button>
          </div>
        </section>

        {/* Trust Badge */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Dynamic Trust Badge
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-4">
              Embed a live badge on your website that automatically shows your current rating and review count — like Trustpilot, but yours.
            </p>
            <ShareCard
              title="Trust Badge"
              subtitle="Paste into any website"
              value={`<script src="${origin}/badge/${business.slug}.js"></script>`}
              onCopy={() => copy(`<script src="${origin}/badge/${business.slug}.js"></script>`, 'badge')}
              copied={copied === 'badge'}
              isCode
            />
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
                {widgetSaved ? 'Saved!' : 'Save'}
              </button>
            </form>
          </div>
        </section>

        {/* Analytics */}
        {analytics && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Analytics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Collect Views', val: analytics.collect_views, color: 'text-indigo-600' },
                { label: 'Wall Views', val: analytics.wall_views, color: 'text-violet-600' },
                { label: 'Widget Loads', val: analytics.widget_loads, color: 'text-purple-600' },
                { label: 'Submissions', val: analytics.submissions, color: 'text-blue-600' },
                { label: 'Approved', val: analytics.approved, color: 'text-green-600' },
                { label: 'Conversion', val: `${analytics.conversion_rate}%`, color: 'text-amber-600' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  businessName={business.brand_name || business.name}
                  onAiReply={handleAiReply}
                  aiReply={aiReplies[t.id]}
                  aiReplyLoading={aiReplyLoading[t.id]}
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
