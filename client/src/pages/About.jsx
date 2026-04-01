import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/useCanonical'

export default function About() {
  usePageMeta({
    path: '/about',
    title: 'About — Fimi | Built by Panos Lambrakis',
    description: 'Fimi is built by Panos Lambrakis, an indie developer from Greece. Learn why Fimi exists and the thinking behind it.',
  })

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/5 px-6 py-4 sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Fimi" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-bold text-white">Fimi</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition hidden sm:block">Pricing</Link>
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">Sign in</Link>
            <Link to="/register" className="text-sm bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-semibold">
              Try free →
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-20">

        {/* Founder */}
        <div className="flex items-center gap-5 mb-12">
          <img
            src="/panos.jpg"
            alt="Panos Lambrakis"
            className="w-16 h-16 rounded-2xl object-cover object-top shrink-0"
          />
          <div>
            <p className="text-white font-semibold text-lg leading-tight">Panos Lambrakis</p>
            <p className="text-gray-500 text-sm mt-0.5">Founder · Greece</p>
            <a
              href="https://www.linkedin.com/in/panos-lambrakis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 text-xs hover:underline mt-1 inline-block"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-6 text-gray-400 text-base leading-relaxed">
          <p>
            I built Fimi because I kept watching small businesses do great work — and lose customers to competitors with flashier websites full of testimonials they'd somehow collected.
          </p>
          <p>
            The tools that existed were either overpriced, too complex, or built for enterprise teams with dedicated marketing staff. A restaurant owner or freelance designer shouldn't need a 3-hour onboarding to collect a review.
          </p>
          <p>
            Fimi is my attempt at the simplest possible version of this: you get a link, your customer clicks it, leaves a review, you approve it, it shows on your website. And if they're unhappy — you hear about it privately first, so you can fix it before it goes anywhere public.
          </p>
          <p>
            I run Fimi as an indie product — no VC funding, no growth team, no dark patterns. If something's broken or you have a feature idea, you're emailing me directly.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Simple by design', desc: 'If it takes more than 5 minutes to set up, it\'s too complicated.' },
            { title: 'Founder-built', desc: 'No team, no investors. Every decision is mine — and so is every reply to your emails.' },
            { title: 'Privacy first', desc: 'Your customers\' data doesn\'t go anywhere. GDPR compliant from day one.' },
          ].map((v) => (
            <div key={v.title} className="bg-[#0f0f17] border border-white/[0.07] rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-2">{v.title}</p>
              <p className="text-gray-600 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 border-t border-white/5 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-medium text-sm">Want to talk?</p>
            <p className="text-gray-500 text-sm mt-0.5">I read and reply to every message.</p>
          </div>
          <Link
            to="/contact"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition"
          >
            Send a message →
          </Link>
        </div>

      </main>

      <footer className="border-t border-white/5 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} Fimi. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/pricing" className="hover:text-gray-300 transition">Pricing</Link>
            <Link to="/blog" className="hover:text-gray-300 transition">Blog</Link>
            <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
