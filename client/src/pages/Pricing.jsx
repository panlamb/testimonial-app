import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCanonical } from '../hooks/useCanonical'

const MONTHLY = {
  pro: 9,
  agency: 29,
}
const YEARLY = {
  pro: 7,    // €84/yr — save €24
  agency: 23, // €276/yr — save €72
}

const plans = (billing) => [
  {
    name: 'Free',
    price: '€0',
    sub: 'forever',
    yearlyNote: null,
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
      'Email & WhatsApp review requests',
      'Private negative review handling',
      'AI reply to negative reviews',
      'Google Review redirect',
      'Exit intent capture',
      'Milestone LinkedIn posts',
      'AI Summary',
      'Verified Customer badge',
      'Dynamic Trust Badge',
    ],
  },
  {
    name: 'Pro',
    price: billing === 'yearly' ? `€${YEARLY.pro}` : `€${MONTHLY.pro}`,
    sub: billing === 'yearly' ? 'per month, billed €84/yr' : 'per month',
    yearlyNote: billing === 'yearly' ? 'Save €24 vs monthly' : null,
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
      'Email & WhatsApp review requests',
      'Verified Customer badge',
      'Private negative review handling',
      'AI reply to negative reviews',
      'Google Review redirect',
      'Exit intent capture',
      'Milestone LinkedIn posts',
      'Dynamic Trust Badge',
      'AI Summary of reviews',
    ],
    missing: [],
  },
  {
    name: 'Agency',
    price: billing === 'yearly' ? `€${YEARLY.agency}` : `€${MONTHLY.agency}`,
    sub: billing === 'yearly' ? 'per month, billed €276/yr' : 'per month',
    yearlyNote: billing === 'yearly' ? 'Save €72 vs monthly' : null,
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
  useCanonical('/pricing')
  const [billing, setBilling] = useState('monthly')
  const currentPlans = plans(billing)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Fimi" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-bold text-white">Fimi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">Sign in</Link>
            <Link to="/register" className="text-sm bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-semibold">
              Try free →
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
        <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-3">Pricing</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Start free. Upgrade when you're ready. Every paid plan comes with a <strong className="text-white">30-day free trial</strong> — no credit card required.
        </p>
      </section>

      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              billing === 'monthly' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              billing === 'yearly' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              2 months free
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border flex flex-col ${
                plan.highlighted
                  ? 'bg-indigo-600/10 border-indigo-500/40 shadow-xl shadow-indigo-950/50'
                  : 'bg-[#0f0f17] border-white/[0.07]'
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
                <h2 className="text-lg font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== '€0' && (
                    <span className="text-gray-500 text-xs mb-2">/ mo</span>
                  )}
                </div>
                <p className="text-gray-600 text-xs">{plan.sub}</p>
                {plan.yearlyNote && (
                  <p className="text-green-400 text-xs font-medium mt-1">{plan.yearlyNote}</p>
                )}
              </div>

              <Link
                to={plan.ctaTo}
                className={`block text-center py-2.5 px-6 rounded-xl font-semibold text-sm transition mb-7 ${
                  plan.highlighted
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-white/8 hover:bg-white/15 text-white'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 shrink-0">✕</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">
          All prices exclude VAT. VAT may apply depending on your country.
        </p>

        <p className="text-center text-gray-600 text-sm mt-5">
          Not sure which plan?{' '}
          <Link to="/contact" className="text-indigo-400 hover:underline">Get in touch</Link>
          {' '}and we'll help you decide.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} Fimi. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/help" className="hover:text-gray-300 transition">Help</Link>
            <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
