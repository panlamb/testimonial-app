import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/useCanonical'

const COMPETITORS = {
  senja: {
    name: 'Senja',
    tagline: 'Fimi vs Senja — which is right for your business?',
    description: 'Senja is a testimonial collection tool with a freemium model. Here\'s how Fimi compares.',
    fimiWins: [
      'Negative review filtering — keep bad reviews private by default',
      'AI-generated reply suggestions for private feedback',
      'Built-in cold outreach tools for collecting more reviews',
      'Exit-intent popup widget that captures visitors before they leave',
      'AI summary of all your reviews for marketing copy',
      'Milestone emails with pre-written LinkedIn & Twitter posts',
      'Free plan with no watermark on the Wall of Love',
    ],
    senjaWins: [
      'Larger template library for embedding styles',
      'Video testimonials on paid plans',
      'More social platform integrations',
    ],
    verdict: 'Fimi is the better choice if you care about handling negative reviews privately, growing through word-of-mouth, and getting AI tools without paying extra.',
  },
  'testimonial-to': {
    name: 'Testimonial.to',
    tagline: 'Fimi vs Testimonial.to — an honest comparison',
    description: 'Testimonial.to is a popular testimonial platform. See how Fimi stacks up.',
    fimiWins: [
      'Negative review filtering keeps unhappy customers private',
      'AI reply generation for damage control',
      'Built-in email outreach to collect reviews proactively',
      'No monthly fee to get started — genuinely free',
      'Simpler setup — under 5 minutes to your first testimonial',
      'Exit-intent popups increase conversion rate automatically',
      'Referral program to grow your account for free',
    ],
    senjaWins: [
      'Video testimonial support',
      'More embed widget designs',
      'Zapier integration',
    ],
    verdict: 'Fimi is a leaner, more affordable alternative with stronger negative review management and built-in growth tools.',
  },
  endorsal: {
    name: 'Endorsal',
    tagline: 'Fimi vs Endorsal — which tool wins?',
    description: 'Endorsal automates testimonial collection. Here\'s how Fimi compares feature for feature.',
    fimiWins: [
      'Private negative review handling — protect your reputation',
      'AI-powered reply drafts for unhappy customers',
      'Built-in email outreach from the admin dashboard',
      'Wall of Love page with dynamic Open Graph meta tags',
      'QR code generator for offline review collection',
      'Milestone celebrations with shareable social copy',
      'Free plan that actually works without upgrading',
    ],
    senjaWins: [
      'Automated request sequences',
      'More CRM integrations',
      'Review forms with more custom fields',
    ],
    verdict: 'Fimi is the simpler, more affordable option — especially if reputation management and growth tools matter to you.',
  },
  trustpilot: {
    name: 'Trustpilot',
    tagline: 'Fimi vs Trustpilot — do you need a platform you don\'t control?',
    description: 'Trustpilot is a public review platform. Fimi is a private testimonial tool you own.',
    fimiWins: [
      'You own your reviews — no public exposure of negative feedback',
      'Negative reviews stay private until you decide what to do',
      'No monthly fee to show your testimonials',
      'Your Wall of Love is branded — not a third-party URL',
      'AI tools to respond to and learn from private feedback',
      'Works for businesses of any size without a TrustScore dependency',
      'No risk of competitors gaming your public rating',
    ],
    senjaWins: [
      'Trustpilot reviews are trusted by consumers as third-party validated',
      'Trustpilot has SEO authority for brand searches',
      'Better for regulated industries that require third-party proof',
    ],
    verdict: 'Use Fimi if you want to control your reputation and display testimonials on your own site. Use Trustpilot if you need third-party credibility for regulated industries.',
  },
}

const CHECK = () => (
  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const X_ICON = () => (
  <svg className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function VsPage() {
  const { competitor } = useParams()
  const data = COMPETITORS[competitor]
  usePageMeta({
    path: `/vs/${competitor}`,
    title: data ? `Fimi vs ${data.name} — Which is better for small businesses?` : 'Fimi vs Competitors',
    description: data ? `Compare Fimi and ${data.name} side by side. Features, pricing, and key differences — so you can choose the right testimonial tool for your business.` : undefined,
  })

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400 text-sm">
        Comparison page not found. <Link to="/" className="ml-2 text-indigo-400 hover:underline">Back to Fimi →</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Try free →
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-800 rounded-full px-3 py-1">
            Fimi vs {data.name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{data.tagline}</h1>
          <p className="text-gray-400 max-w-xl mx-auto">{data.description}</p>
        </div>

        {/* Comparison table */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fimi wins */}
          <div className="bg-gray-900 border border-indigo-800/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-indigo-400 uppercase tracking-wide">Fimi advantages</span>
            </div>
            <ul className="space-y-3">
              {data.fimiWins.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-200">
                  <CHECK />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Competitor wins */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">{data.name} advantages</span>
            </div>
            <ul className="space-y-3">
              {data.senjaWins.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <X_ICON />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-2xl p-6">
          <p className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-2">Verdict</p>
          <p className="text-gray-200 leading-relaxed">{data.verdict}</p>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h2 className="text-2xl font-bold">Try Fimi free — no credit card required</h2>
          <p className="text-gray-400 text-sm">Set up in 5 minutes. 30-day free trial. No strings attached.</p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl text-base transition"
          >
            Start free →
          </Link>
        </div>

        {/* Other comparisons */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Other comparisons</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(COMPETITORS)
              .filter(([slug]) => slug !== competitor)
              .map(([slug, c]) => (
                <Link
                  key={slug}
                  to={`/vs/${slug}`}
                  className="text-sm text-indigo-400 hover:text-indigo-300 underline"
                >
                  Fimi vs {c.name}
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
