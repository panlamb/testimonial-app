import { useState } from 'react'
import { Link } from 'react-router-dom'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4 group"
      >
        <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition leading-relaxed">{q}</span>
        <span className={`text-gray-500 shrink-0 transition-transform mt-0.5 text-lg leading-none ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <p className="text-sm text-gray-400 leading-relaxed mt-3">{a}</p>
      )}
    </div>
  )
}

const FEATURES = [
  { icon: '⭐', title: 'Collect reviews', desc: 'Send a link to your customers. They leave a review in 30 seconds.' },
  { icon: '✅', title: 'You decide', desc: 'Every review goes through you first. Approve only what you want published.' },
  { icon: '🌐', title: 'Wall of Love', desc: 'Automatic public page showcasing all your approved testimonials.' },
  { icon: '🔌', title: 'Embed widget', desc: 'One line of code and testimonials appear live on your website.' },
  { icon: '🔴', title: 'Private negative review handling', desc: '1-2 star reviews are kept private and sent to you directly — so you can fix the issue before it ever goes public.' },
  { icon: '🤖', title: 'AI reply to negative reviews', desc: 'Generate an empathetic, professional reply to any unhappy customer with one click — then send it straight from your dashboard.' },
  { icon: '🔗', title: 'Google Review redirect', desc: 'Happy customers are prompted to also leave a Google Review right after submitting — doubling your public presence.' },
  { icon: '💬', title: 'WhatsApp review requests', desc: 'Send a pre-written review request directly from your phone via WhatsApp — no email needed.' },
  { icon: '📧', title: 'Email review requests', desc: 'Send a personalised review request to a customer\'s inbox with one click. Replied-via-email reviews are automatically marked Verified.' },
  { icon: '🚪', title: 'Exit intent capture', desc: 'When a visitor is about to leave your site, a subtle popup invites them to rate their experience — without interrupting their visit.' },
  { icon: '🏆', title: 'Milestone celebration posts', desc: 'Hit 10, 25, 50 or 100 reviews? Fimi emails you a ready-to-post LinkedIn caption so you can celebrate publicly in seconds.' },
  { icon: '🧠', title: 'AI Summary', desc: 'Generate a ready-to-use marketing paragraph from all your reviews. Perfect for LinkedIn and your website.' },
  { icon: '📊', title: 'Dynamic Trust Badge', desc: 'Embeddable badge showing your live rating and review count — like Trustpilot, but yours.' },
  { icon: '✓', title: 'Verified Customer badge', desc: 'Reviews submitted via email request are automatically marked as Verified — boosting trust.' },
  { icon: '📱', title: 'QR Code generator', desc: 'Print your QR code at the counter, on receipts, or business cards for instant in-person reviews.' },
  { icon: '🖼️', title: 'Shareable image cards', desc: 'Turn any testimonial into a beautiful image card ready to share on Instagram or LinkedIn.' },
  { icon: '📈', title: 'Analytics', desc: 'Track collect page views, widget loads, submissions, and your conversion rate.' },
  { icon: '📸', title: 'Screenshot uploads', desc: 'Customers can attach a screenshot of their Google or Facebook review directly.' },
  { icon: '🎨', title: 'Widget customization', desc: 'Match the widget\'s colors to your brand with a simple color picker.' },
  { icon: '🏷️', title: 'White Label', desc: 'Replace Fimi with your own brand. Ideal for web designers and agencies.' },
  { icon: '🔒', title: 'GDPR compliant', desc: 'Consent checkbox, right to deletion, and privacy policy — all built in.' },
]

const UNIQUE = [
  {
    icon: '🔴',
    title: 'Full negative review management',
    desc: '1-2 star reviews never go public. Instead, you get a private email with the customer\'s contact details — and with one click, Fimi\'s AI writes you an empathetic reply ready to send. Turn critics into fans before any damage is done.',
  },
  {
    icon: '🚪',
    title: 'Exit intent review capture',
    desc: 'When a visitor is about to leave a page where your widget is embedded, Fimi shows a subtle star-rating popup. One tap and they\'re on your review page. Most tools wait for customers to come to you — Fimi catches them on the way out.',
  },
  {
    icon: '🏆',
    title: 'Milestone LinkedIn posts — automated',
    desc: 'Every time you hit 10, 25, 50, 100, 250 or 500 approved reviews, Fimi emails you a ready-to-post LinkedIn caption. Celebrate your social proof publicly without spending 20 minutes writing the post yourself.',
  },
  {
    icon: '🔗',
    title: 'Google Review redirect',
    desc: 'After a happy customer submits their testimonial, Fimi prompts them to also leave a Google Review with one tap. You get the testimonial on your site and a real Google review that boosts your SEO — automatically.',
  },
]


export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Fimi
          </span>
          <div className="flex items-center gap-4">
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition">
              Pricing
            </Link>
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition font-medium"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-32 left-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            30-day free trial — no credit card required
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Turn your customer reviews
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              into social proof
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fimi collects testimonials from your customers, displays them on your website automatically, and uses AI to turn them into marketing copy — and to handle unhappy customers. In 5 minutes. No technical skills needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-indigo-900/50"
            >
              Start free trial →
            </Link>
            <Link
              to="/pricing"
              className="border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              See pricing
            </Link>
          </div>

          <p className="text-sm text-gray-600 mt-5">30-day free trial. No credit card required. Cancel anytime.</p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-14">
            {[
              { val: '21+', label: 'features' },
              { val: '30', label: 'day free trial' },
              { val: '5min', label: 'setup time' },
              { val: '100%', label: 'GDPR compliant' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest mb-3">Simple process</p>
            <h2 className="text-4xl font-bold text-white">Three steps and you're ready</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />

            {[
              { step: '01', title: 'Create an account', desc: 'Sign up for free and get a unique link for your business.' },
              { step: '02', title: 'Send the link', desc: 'Your customers click it, leave a review, and you approve it.' },
              { step: '03', title: 'It appears on your site', desc: 'With one line of code, testimonials show up on your website automatically.' },
            ].map((s) => (
              <div key={s.step} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition group">
                <div className="text-4xl font-bold text-white/10 group-hover:text-indigo-500/30 transition mb-4 font-mono">
                  {s.step}
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique differentiators */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold tracking-widest mb-3">What sets us apart</p>
            <h2 className="text-4xl font-bold text-white">Features you won't find elsewhere</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UNIQUE.map((u) => (
              <div key={u.title} className="bg-gradient-to-b from-indigo-600/10 to-transparent border border-indigo-500/20 rounded-2xl p-8 hover:border-indigo-500/40 transition">
                <div className="text-3xl mb-4">{u.icon}</div>
                <h3 className="font-bold text-white text-lg mb-3">{u.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest mb-3">Features</p>
            <h2 className="text-4xl font-bold text-white">Everything you need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-indigo-500/30 transition group"
              >
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-white">Common questions</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: 'Do I need technical skills to set up Fimi?',
                a: 'No. Your collection page and Wall of Love are ready the moment you register. Embedding the widget on your website requires pasting one line of code — that\'s the most technical it gets.',
              },
              {
                q: 'What happens if a customer leaves a 1 or 2 star review?',
                a: 'It never goes public. You receive a private email with the customer\'s contact details so you can reach out and fix the issue. You can also generate an AI-written reply directly from your dashboard.',
              },
              {
                q: 'How does the 30-day free trial work?',
                a: 'Sign up and you get full Pro access for 30 days — no credit card required. At the end of the trial you can upgrade to keep your features, or stay on the free plan.',
              },
              {
                q: 'Can I use my own brand instead of "Fimi"?',
                a: 'Yes, on any paid plan. Go to Dashboard → White Label Branding, enter your brand name and logo URL. The "Powered by Fimi" badge disappears and your brand replaces it on all customer-facing pages.',
              },
              {
                q: 'How does the Google Review redirect work?',
                a: 'Paste your Google Review link in the dashboard. After a happy customer (3+ stars) submits their testimonial, they\'re prompted to also leave a Google Review with one tap — doubling your public presence automatically.',
              },
              {
                q: 'Is my customers\' data GDPR compliant?',
                a: 'Yes. Every submission requires explicit consent. Customers receive a unique deletion link so they can remove their data at any time. You can also delete any review from the dashboard.',
              },
            ].map((item) => <FaqItem key={item.q} {...item} />)}
          </div>
          <p className="text-center text-gray-600 text-sm mt-10">
            More questions?{' '}
            <Link to="/help" className="text-indigo-400 hover:underline">Read the full documentation →</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to show off<br />your reputation?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join and get 30 days of full access — free. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-indigo-900/50"
            >
              Start your free trial →
            </Link>
            <Link
              to="/pricing"
              className="inline-block border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 px-10 py-4 rounded-xl font-semibold text-lg transition"
            >
              See pricing
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-5">30-day free trial · No credit card · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/pricing" className="hover:text-gray-300 transition">Pricing</Link>
          <Link to="/help" className="hover:text-gray-300 transition">Help</Link>
          <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
          <Link to="/login" className="hover:text-gray-300 transition">Sign in</Link>
          <Link to="/register" className="hover:text-gray-300 transition">Sign up</Link>
        </div>
        <p>© {new Date().getFullYear()} Fimi. All rights reserved.</p>
      </footer>
    </div>
  )
}
