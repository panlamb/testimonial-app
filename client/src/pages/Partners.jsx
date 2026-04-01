import { Link } from 'react-router-dom'
import { useCanonical } from '../hooks/useCanonical'

const BENEFITS = [
  { icon: '💰', title: '20% recurring commission', desc: 'Earn 20% of every payment made by clients you refer — for as long as they stay subscribed.' },
  { icon: '🔗', title: 'Your own referral link', desc: 'Get a unique referral link from your Fimi dashboard. Every signup through it is tracked automatically.' },
  { icon: '📊', title: 'Real-time tracking', desc: 'See exactly how many people you\'ve referred and how much you\'ve earned from your dashboard.' },
  { icon: '🏷️', title: 'White-label ready', desc: 'Offer Fimi under your own brand to your clients — we stay invisible if you want us to.' },
  { icon: '🚀', title: 'No limit on referrals', desc: 'Refer 1 client or 100 — there\'s no cap on how much you can earn.' },
  { icon: '🤝', title: 'Priority support', desc: 'Partners get priority email support and early access to new features.' },
]

const WHO = [
  'Web designers & developers',
  'Marketing agencies',
  'Business consultants',
  'Social media managers',
  'SEO agencies',
  'Virtual assistants',
  'Anyone with small business clients',
]

export default function Partners() {
  useCanonical('/partners')
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Join as partner →
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-800 rounded-full px-3 py-1">
            Partner Program
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Earn 20% recurring commission by recommending Fimi
          </h1>
          <p className="text-gray-400 text-lg">
            If you work with small businesses, your clients need testimonials. Refer them to Fimi — and earn a recurring commission for every month they stay subscribed.
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-base transition"
          >
            Create your free account & get your referral link →
          </Link>
        </div>

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">How it works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Create a free Fimi account', desc: 'Your unique referral link is automatically generated in your dashboard.' },
              { step: '2', title: 'Share your referral link with clients', desc: 'Send it via email, add it to your proposals, or include it in your onboarding materials.' },
              { step: '3', title: 'They sign up and upgrade', desc: 'Every client who upgrades to Pro earns you 20% of their monthly payment — automatically, every month.' },
              { step: '4', title: 'Track and get paid', desc: 'See your referral count in your dashboard. Payments are processed monthly.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Partner benefits</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-2">
                <div className="text-2xl">{b.icon}</div>
                <p className="font-semibold text-white">{b.title}</p>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is this for */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Who is this for?</h2>
          <ul className="space-y-2">
            {WHO.map((w) => (
              <li key={w} className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Example earnings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">Example earnings</h2>
          <p className="text-gray-400 text-sm">Pro plan: £15/month. Your commission: £3/month per client.</p>
          <div className="space-y-2">
            {[
              { clients: 5, monthly: 15 },
              { clients: 20, monthly: 60 },
              { clients: 50, monthly: 150 },
              { clients: 100, monthly: 300 },
            ].map((e) => (
              <div key={e.clients} className="flex items-center justify-between border-b border-gray-800 py-2 text-sm">
                <span className="text-gray-400">{e.clients} referred clients</span>
                <span className="font-semibold text-white">£{e.monthly}/month recurring</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to start?</h2>
          <p className="text-gray-400">Create a free account — your referral link is waiting in your dashboard.</p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-base transition"
          >
            Join the partner program →
          </Link>
          <p className="text-xs text-gray-600">No monthly fee. No minimum referrals. Start earning immediately.</p>
        </div>
      </main>
    </div>
  )
}
