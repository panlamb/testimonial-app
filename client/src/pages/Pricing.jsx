import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Free',
    price: '€0',
    period: 'forever',
    description: 'Perfect for getting started and testing the waters.',
    cta: 'Get started free',
    ctaTo: '/register',
    highlighted: false,
    features: [
      '3 testimonials shown publicly',
      'Collect page & Wall of Love',
      'QR Code generator',
      'Shareable image cards',
      'Basic analytics',
      '"Powered by Fimi" badge',
    ],
    missing: [
      'Embed widget',
      'White label',
      'Review request emails',
      'AI Summary',
      'Verified Customer badge',
      'Dynamic Trust Badge',
    ],
  },
  {
    name: 'Pro',
    price: '€9',
    period: 'per month',
    description: 'Everything you need to build serious social proof.',
    cta: 'Start 30-day free trial',
    ctaTo: '/register',
    highlighted: true,
    badge: 'Most popular',
    features: [
      'Unlimited testimonials',
      'Collect page & Wall of Love',
      'QR Code generator',
      'Shareable image cards',
      'Advanced analytics',
      'Embed widget',
      'White label (no Fimi badge)',
      'Widget color customization',
      'Review request emails',
      'Verified Customer badge',
      'Dynamic Trust Badge',
      'AI Summary of reviews',
    ],
    missing: [],
  },
  {
    name: 'Agency',
    price: '€29',
    period: 'per month',
    description: 'Manage testimonials for multiple clients under one roof.',
    cta: 'Start 30-day free trial',
    ctaTo: '/register',
    highlighted: false,
    features: [
      'Everything in Pro',
      'Up to 5 brands / businesses',
      'Centralized dashboard',
      'Priority support',
      'Ideal for web designers & agencies',
    ],
    missing: [],
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Fimi
          </Link>
          <div className="flex items-center gap-4">
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

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest mb-3">Pricing</p>
        <h1 className="text-4xl sm:text-6xl font-bold mb-5 tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Start free. Upgrade when you're ready. Every paid plan comes with a <strong className="text-white">30-day free trial</strong> — no credit card required.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border flex flex-col ${
                plan.highlighted
                  ? 'bg-indigo-600/10 border-indigo-500/50 shadow-xl shadow-indigo-900/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">/{plan.period}</span>
                </div>
              </div>

              <Link
                to={plan.ctaTo}
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition mb-8 ${
                  plan.highlighted
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0">✕</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ note */}
        <p className="text-center text-gray-600 text-sm mt-12">
          Not sure which plan is right for you?{' '}
          <a href="mailto:panos.lambrakis@gmail.com" className="text-indigo-400 hover:underline">
            Get in touch
          </a>{' '}
          and we'll help you decide.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
          <Link to="/login" className="hover:text-gray-300 transition">Sign in</Link>
        </div>
        <p>© {new Date().getFullYear()} Fimi. All rights reserved.</p>
      </footer>
    </div>
  )
}
