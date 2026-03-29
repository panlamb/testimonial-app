import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('admin_token')

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/businesses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_token')
        navigate('/admin')
        return
      }
      setBusinesses(await res.json())
    } finally {
      setLoading(false)
    }
  }, [token, navigate])

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
      </main>
    </div>
  )
}
