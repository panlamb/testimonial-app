import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/useCanonical'

export default function Contact() {
  usePageMeta({
    path: '/contact',
    title: 'Contact — Fimi | Get in Touch',
    description: 'Have a question or feedback? Send us a message and we\'ll get back to you within 24 hours.',
  })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('') // '' | 'sending' | 'sent' | 'error'

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Fimi" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-bold text-white">Fimi</span>
          </Link>
          <Link to="/register" className="text-sm bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-semibold">
            Try free →
          </Link>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-3">Contact</p>
          <h1 className="text-4xl font-bold text-white mb-3">Get in touch</h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Have a question, a feature idea, or just want to say hi? We read every message and reply within 24 hours.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="border border-white/[0.07] rounded-2xl p-8 bg-[#0f0f17] text-center space-y-3">
            <div className="text-3xl">✓</div>
            <p className="text-white font-semibold">Message sent</p>
            <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
            <button
              onClick={() => setStatus('')}
              className="text-indigo-400 text-sm hover:underline mt-2 block mx-auto"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                required
                placeholder="Your name"
                className="w-full bg-[#0f0f17] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-700"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                placeholder="you@example.com"
                className="w-full bg-[#0f0f17] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-700"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={set('message')}
                required
                rows={6}
                placeholder="What's on your mind?"
                className="w-full bg-[#0f0f17] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-700 resize-y"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs">Something went wrong — try emailing us directly at hello@get-fimi.com</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
