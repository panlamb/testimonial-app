import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4 group"
      >
        <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition leading-relaxed">{q}</span>
        <span className={`text-gray-500 shrink-0 transition-transform mt-0.5 text-lg leading-none ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-2xl">{a}</p>}
    </div>
  )
}

const UNIQUE = [
  {
    icon: '🔴',
    title: 'Full negative review management',
    desc: '1-2 star reviews never go public. You get a private email with the customer\'s contact details — and Fimi\'s AI writes you an empathetic reply with one click. Turn critics into fans before any damage is done.',
  },
  {
    icon: '🚪',
    title: 'Exit intent review capture',
    desc: 'When a visitor is about to leave your site, a subtle popup invites them to rate their experience. Most tools wait for customers to come to you — Fimi catches them on the way out.',
  },
  {
    icon: '🏆',
    title: 'Milestone posts — automated',
    desc: 'Hit 10, 25, 50, or 100 reviews? Fimi emails you a ready-to-post LinkedIn caption. Celebrate your social proof publicly without writing the post yourself.',
  },
  {
    icon: '🔗',
    title: 'Google Review redirect',
    desc: 'After submitting, happy customers are prompted to also leave a Google Review with one tap. One action, two reviews — automatically.',
  },
]

const FEATURES = [
  { icon: '⭐', title: 'Review collection', desc: 'Send a link. Customers review in 30 sec — no app needed.' },
  { icon: '✅', title: 'Full approval control', desc: 'Nothing goes public without your say.' },
  { icon: '🌐', title: 'Wall of Love', desc: 'Automatic public page of your approved reviews.' },
  { icon: '🔌', title: 'Embed widget', desc: 'One line of code. Reviews live on your website.' },
  { icon: '🤖', title: 'AI reply generator', desc: 'One click — professional reply to any unhappy customer.' },
  { icon: '🧠', title: 'AI marketing summary', desc: 'Generate a marketing paragraph from all your reviews.' },
  { icon: '💬', title: 'WhatsApp requests', desc: 'Send a review request from your phone in one tap.' },
  { icon: '📧', title: 'Email requests', desc: 'Personalised email requests. Verified badge on replies.' },
  { icon: '📊', title: 'Dynamic Trust Badge', desc: 'Live rating badge for your site — like Trustpilot, but yours.' },
  { icon: '✓', title: 'Verified Customer badge', desc: 'Reviews via email are auto-marked Verified.' },
  { icon: '📱', title: 'QR Code generator', desc: 'Print at the counter, receipts, or business cards.' },
  { icon: '🖼️', title: 'Shareable image cards', desc: 'Turn any testimonial into a card for Instagram or LinkedIn.' },
  { icon: '📈', title: 'Analytics', desc: 'Track views, submissions, and conversion rate.' },
  { icon: '🎨', title: 'Widget customization', desc: 'Match widget colors to your brand.' },
  { icon: '🏷️', title: 'White Label', desc: 'Replace Fimi branding with your own. Ideal for agencies.' },
  { icon: '⚡', title: 'Webhooks', desc: 'Connect to Zapier, Make, or n8n on every approved review.' },
  { icon: '📸', title: 'Screenshot uploads', desc: 'Customers can attach screenshots of existing Google reviews.' },
  { icon: '🔒', title: 'GDPR compliant', desc: 'Consent, deletion rights, and privacy policy — built in.' },
  { icon: '🔗', title: 'Google Review redirect', desc: 'Happy customers are prompted to also leave a Google Review.' },
  { icon: '🚪', title: 'Exit intent capture', desc: 'Catch visitors leaving your site with a star-rating popup.' },
]

function ProductMockup() {
  return (
    <div className="relative w-full max-w-md ml-auto select-none">
      {/* Browser window */}
      <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
        {/* Chrome bar */}
        <div className="bg-[#1c1c28] px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 bg-white/5 rounded px-3 py-1 text-xs text-gray-600 font-mono truncate">
            get-fimi.com/collect/acme-cafe
          </div>
        </div>

        {/* Page inside browser */}
        <div className="bg-gray-50 p-7">
          <div className="text-center mb-5">
            <div className="w-11 h-11 bg-indigo-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold">
              A
            </div>
            <p className="text-gray-400 text-xs mb-0.5">Acme Café</p>
            <p className="text-gray-800 font-semibold text-sm">How was your experience?</p>
          </div>
          <div className="flex justify-center gap-1.5 mb-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-2xl text-yellow-400 leading-none">★</span>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-400 leading-relaxed h-14 mb-4">
            The coffee was amazing and the staff were incredibly friendly…
          </div>
          <button className="w-full bg-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl">
            Submit review
          </button>
        </div>
      </div>

      {/* Floating review card */}
      <div className="absolute -bottom-5 -left-8 bg-[#13131f] border border-white/10 rounded-xl p-4 shadow-2xl w-52 z-10">
        <div className="flex gap-0.5 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="text-yellow-400 text-sm leading-none">★</span>
          ))}
        </div>
        <p className="text-white text-xs leading-relaxed mb-2.5">"Best decision I made for my business this year."</p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs">Maria K.</p>
          <span className="text-green-400 text-xs font-medium">✓ Verified</span>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -top-3 -right-4 bg-indigo-600 border border-indigo-500/50 rounded-xl px-3.5 py-2.5 shadow-xl z-10">
        <p className="text-white text-xs font-semibold">+3 new reviews</p>
        <p className="text-indigo-300 text-[10px]">this week</p>
      </div>
    </div>
  )
}

export default function Landing() {
  const [searchParams] = useSearchParams()
  const isFromPH = searchParams.get('ref') === 'producthunt'

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {isFromPH && (
        <div className="bg-indigo-600 text-white text-sm text-center py-2.5 px-4">
          👋 Hey Product Hunter! 30-day free trial, no credit card required.{' '}
          <Link to="/register" className="underline font-semibold hover:text-indigo-200">Get started →</Link>
        </div>
      )}

      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Fimi" className="h-8 w-8 rounded-lg" />
            <div>
              <span className="text-lg font-bold text-white">Fimi</span>
              <span className="text-[10px] text-gray-600 tracking-wide ml-2 hidden sm:inline">φήμη · reputation</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition hidden sm:block">Pricing</Link>
            <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition hidden sm:block">Blog</Link>
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">Sign in</Link>
            <Link to="/register" className="text-sm bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-semibold">
              Try free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
                30-day free trial · No credit card
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
                Your customers<br />
                trust you.<br />
                <span className="text-gray-500">Now prove it.</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                Fimi collects testimonials from your customers, displays them on your website automatically, and keeps negative reviews private — so you handle them before any damage is done.
              </p>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition shadow-lg shadow-indigo-950/60"
              >
                Start for free →
              </Link>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-gray-600">
                <span>✓ 5-minute setup</span>
                <span>✓ No technical skills needed</span>
                <span>✓ GDPR compliant</span>
              </div>
            </div>

            {/* Right */}
            <div className="hidden lg:block">
              <ProductMockup />
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-3">How it works</p>
            <h2 className="text-3xl font-bold text-white">Up and running in three steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up and get your unique review link instantly. No setup wizard, no waiting.' },
              { step: '02', title: 'Share the link', desc: 'Send it via email, WhatsApp, or QR code. Customers review in 30 seconds — no login needed.' },
              { step: '03', title: 'It goes live on your site', desc: 'Approve it in your dashboard. It appears on your Wall of Love and embedded widget automatically.' },
            ].map((s) => (
              <div key={s.step} className="bg-[#0f0f17] p-8 hover:bg-[#12121e] transition">
                <div className="text-5xl font-bold text-white/[0.06] font-mono mb-5 tabular-nums">{s.step}</div>
                <h3 className="font-semibold text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-3">Why Fimi</p>
            <h2 className="text-3xl font-bold text-white">Built for things<br className="hidden sm:block" /> other tools ignore</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UNIQUE.map((u) => (
              <div key={u.title} className="border border-white/[0.07] rounded-2xl p-7 hover:border-white/15 transition bg-[#0f0f17]">
                <div className="text-2xl mb-4">{u.icon}</div>
                <h3 className="font-bold text-white text-base mb-2">{u.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-3xl font-bold text-white">Everything in one place</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-[#0f0f17] p-5 hover:bg-[#12121e] transition group">
                <div className="text-xl mb-3">{f.icon}</div>
                <h3 className="font-medium text-white text-sm mb-1.5">{f.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-500 transition">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-white">Common questions</h2>
          </div>
          <div>
            {[
              {
                q: 'Do I need technical skills to set up Fimi?',
                a: 'No. Your collection page and Wall of Love are ready the moment you register. Embedding the widget requires pasting one line of code — that\'s the most technical it gets.',
              },
              {
                q: 'What happens if a customer leaves a 1 or 2 star review?',
                a: 'It never goes public. You receive a private email with the customer\'s contact details so you can reach out and fix the issue. You can also generate an AI-written reply directly from your dashboard.',
              },
              {
                q: 'How does the 30-day free trial work?',
                a: 'Sign up and get full Pro access for 30 days — no credit card required. At the end of the trial, upgrade to keep your features, or stay on the free plan.',
              },
              {
                q: 'Can I use my own brand instead of "Fimi"?',
                a: 'Yes, on any paid plan. Go to Dashboard → White Label Branding, enter your brand name and logo URL. The "Powered by Fimi" badge disappears everywhere customer-facing.',
              },
              {
                q: 'How does the Google Review redirect work?',
                a: 'Paste your Google Review link in the dashboard. After a happy customer (3+ stars) submits their testimonial, they\'re prompted to also leave a Google Review with one tap. Two reviews, one action.',
              },
              {
                q: 'Is my customers\' data GDPR compliant?',
                a: 'Yes. Every submission requires explicit consent. Customers receive a unique deletion link so they can remove their data at any time.',
              },
            ].map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-10">
            More questions?{' '}
            <Link to="/help" className="text-indigo-400 hover:underline">Read the full docs →</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-white/[0.07] rounded-3xl p-12 sm:p-16 text-center bg-[#0f0f17]">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              Ready to collect your<br />first testimonial?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              30-day free trial. No credit card. Cancel anytime.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition shadow-xl shadow-indigo-950/60"
            >
              Start for free →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} Fimi. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
            <Link to="/pricing" className="hover:text-gray-300 transition">Pricing</Link>
            <Link to="/blog" className="hover:text-gray-300 transition">Blog</Link>
            <Link to="/help" className="hover:text-gray-300 transition">Help</Link>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy</Link>
            <Link to="/login" className="hover:text-gray-300 transition">Sign in</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
