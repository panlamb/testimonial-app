import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [outreach, setOutreach] = useState(null)
  const [outreachContacts, setOutreachContacts] = useState([])
  const [outreachSubject, setOutreachSubject] = useState('Collect customer reviews for your business — free')
  const [outreachBody, setOutreachBody] = useState(`Hi {{name}},

I noticed your business doesn't have a dedicated testimonials page — I built a tool called Fimi that makes it really easy.

With Fimi you can:
• Collect reviews via a simple link (no app needed for customers)
• Embed them on your website automatically
• Keep negative reviews private so you can handle them first

It takes 5 minutes to set up and it's free to start.

Worth a look: https://get-fimi.com

— Panos`)
  const [outreachStatus, setOutreachStatus] = useState('')
  const [outreachResult, setOutreachResult] = useState(null)
  const [quickEmail, setQuickEmail] = useState('')
  const [quickName, setQuickName] = useState('')
  const [quickStatus, setQuickStatus] = useState('')
  const fileRef = useRef(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('admin_token')

  const load = useCallback(async () => {
    try {
      const [bizRes, outRes] = await Promise.all([
        fetch('/api/admin/businesses', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/outreach', { headers: { Authorization: `Bearer ${token}` } }),
      ])
      if (bizRes.status === 401 || bizRes.status === 403) {
        localStorage.removeItem('admin_token')
        navigate('/admin')
        return
      }
      setBusinesses(await bizRes.json())
      if (outRes.ok) setOutreach(await outRes.json())
    } finally {
      setLoading(false)
    }
  }, [token, navigate])

  function handleCSV(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const lines = ev.target.result.trim().split('\n').slice(1) // skip header
      const contacts = lines.map((line) => {
        const [email, business_name] = line.split(',').map((s) => s.trim().replace(/^"|"$/g, ''))
        return { email, business_name }
      }).filter((c) => c.email?.includes('@'))
      setOutreachContacts(contacts)
    }
    reader.readAsText(file)
  }

  async function handleQuickSend() {
    if (!quickEmail || !quickEmail.includes('@')) return
    setQuickStatus('sending')
    try {
      const res = await fetch('/api/admin/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          contacts: [{ email: quickEmail.trim(), business_name: quickName.trim() || quickEmail.trim() }],
          subject: outreachSubject,
          body: outreachBody,
        }),
      })
      const data = await res.json()
      if (data.sent > 0) {
        setQuickStatus('sent')
        setQuickEmail('')
        setQuickName('')
        load()
      } else {
        setQuickStatus('skipped')
      }
    } catch {
      setQuickStatus('error')
    } finally {
      setTimeout(() => setQuickStatus(''), 3000)
    }
  }

  async function handleOutreachSend() {
    if (!outreachContacts.length) return
    setOutreachStatus('sending')
    setOutreachResult(null)
    try {
      const res = await fetch('/api/admin/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ contacts: outreachContacts, subject: outreachSubject, body: outreachBody }),
      })
      const data = await res.json()
      setOutreachResult(data)
      setOutreachContacts([])
      if (fileRef.current) fileRef.current.value = ''
      load()
    } catch {
      setOutreachStatus('error')
    } finally {
      setOutreachStatus('')
    }
  }

  useEffect(() => { load() }, [load])

  async function togglePlan(id, currentPlan) {
    const newPlan = currentPlan === 'free' ? 'paid' : 'free'
    await fetch(`/api/admin/businesses/${id}/plan`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ plan: newPlan }),
    })
    setBusinesses((prev) => prev.map((b) => b.id === id ? { ...b, plan: newPlan } : b))
  }

  function logout() {
    localStorage.removeItem('admin_token')
    navigate('/admin')
  }

  const filtered = businesses.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPaid = businesses.filter((b) => b.plan === 'paid').length
  const totalTestimonials = businesses.reduce((s, b) => s + (b.total_testimonials || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400">
        Φόρτωση…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <p className="text-xs text-gray-400">TestimonialApp</p>
        </div>
        <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition">
          Αποσύνδεση
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Σύνολο επιχειρήσεων', value: businesses.length, color: 'text-white' },
            { label: 'Paid', value: totalPaid, color: 'text-green-400' },
            { label: 'Free', value: businesses.length - totalPaid, color: 'text-gray-400' },
            { label: 'Σύνολο testimonials', value: totalTestimonials, color: 'text-indigo-400' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800 rounded-xl border border-gray-700 p-4 text-center">
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Αναζήτηση επιχείρησης ή email…"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
        />

        {/* Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-3">Επιχείρηση</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Email</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Εγγραφή</th>
                <th className="text-center px-5 py-3">Testimonials</th>
                <th className="text-center px-5 py-3">Pending</th>
                <th className="text-center px-5 py-3">Plan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    Δεν βρέθηκαν επιχειρήσεις
                  </td>
                </tr>
              )}
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition">
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">{b.name}</div>
                    <div className="text-xs text-gray-500">/collect/{b.slug}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{b.email}</td>
                  <td className="px-5 py-4 text-gray-400 hidden lg:table-cell">
                    {new Date(b.created_at).toLocaleDateString('el-GR')}
                  </td>
                  <td className="px-5 py-4 text-center text-white font-medium">
                    {b.approved || 0}
                    <span className="text-gray-500 font-normal">/{b.total_testimonials || 0}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {b.pending > 0 ? (
                      <span className="bg-amber-900/40 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                        {b.pending}
                      </span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => togglePlan(b.id, b.plan)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                        b.plan === 'paid'
                          ? 'bg-green-900/50 text-green-400 hover:bg-green-900'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      {b.plan === 'paid' ? 'Pro ✓' : 'Free'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Outreach */}
        <section className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white">Cold Outreach</h2>
            {outreach && (
              <div className="flex gap-4 text-xs text-gray-400">
                <span>Sent: <strong className="text-white">{outreach.total}</strong></span>
                <span>Unsubscribed: <strong className="text-red-400">{outreach.unsubscribed}</strong></span>
              </div>
            )}
          </div>

          {/* Quick single send */}
          <div className="bg-gray-700/40 border border-gray-600/50 rounded-xl p-4 space-y-3">
            <p className="text-xs text-gray-300 font-medium">Quick send — single email</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={quickEmail}
                onChange={(e) => setQuickEmail(e.target.value)}
                placeholder="email@example.com"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
              <input
                type="text"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                placeholder="Business name (optional)"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
              <button
                onClick={handleQuickSend}
                disabled={!quickEmail || quickStatus === 'sending'}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 rounded-lg transition whitespace-nowrap"
              >
                {quickStatus === 'sending' ? 'Sending…' : 'Send →'}
              </button>
            </div>
            {quickStatus === 'sent' && <p className="text-xs text-green-400">✓ Sent</p>}
            {quickStatus === 'skipped' && <p className="text-xs text-amber-400">Already contacted — skipped</p>}
            {quickStatus === 'error' && <p className="text-xs text-red-400">Error sending</p>}
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">
              Or upload a CSV with columns: <code className="bg-gray-700 px-1 rounded">email, business_name</code>
            </p>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleCSV}
              className="text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600/30 file:text-indigo-300 hover:file:bg-indigo-600/50 cursor-pointer" />
            {outreachContacts.length > 0 && (
              <p className="text-xs text-green-400 mt-1">{outreachContacts.length} contacts loaded</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Subject</label>
            <input type="text" value={outreachSubject} onChange={(e) => setOutreachSubject(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Body — use <code className="bg-gray-700 px-1 rounded">{"{{name}}"}</code> for personalization</label>
            <textarea value={outreachBody} onChange={(e) => setOutreachBody(e.target.value)} rows={10}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y font-mono" />
          </div>

          {outreachResult && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg px-4 py-3 text-sm text-green-300">
              ✓ Sent: {outreachResult.sent} · Skipped (already contacted): {outreachResult.skipped}
            </div>
          )}

          <button
            onClick={handleOutreachSend}
            disabled={!outreachContacts.length || outreachStatus === 'sending'}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
          >
            {outreachStatus === 'sending' ? `Sending… (${outreachContacts.length} emails)` : `Send to ${outreachContacts.length} contacts`}
          </button>
        </section>
      </main>
    </div>
  )
}
