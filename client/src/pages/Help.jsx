import { useState } from 'react'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    items: [
      {
        q: 'How do I set up Fimi?',
        a: 'Create a free account at /register. You\'ll instantly get a unique collection link (e.g. fimi.app/collect/your-slug). Share it with your customers and they can leave a review in under 30 seconds — no account needed on their end.',
      },
      {
        q: 'How do I get my first review?',
        a: 'Go to your Dashboard → "Request a Review". Enter a customer\'s email and click Send Email, or click "Send via WhatsApp" to open a pre-written message on your phone. You can also print the QR code and place it at your counter or on receipts.',
      },
      {
        q: 'Do I need any technical skills?',
        a: 'No. The collect page, Wall of Love, and review requests work out of the box. The embed widget and trust badge require pasting one line of code into your website — that\'s the most technical it gets.',
      },
    ],
  },
  {
    id: 'collecting',
    title: 'Collecting Reviews',
    icon: '⭐',
    items: [
      {
        q: 'What ways can I collect reviews?',
        a: 'Four ways: (1) Share your collection link directly. (2) Send a personalised email from the dashboard. (3) Send a WhatsApp message with one tap. (4) Print the QR code for in-person collection at your counter, on receipts, or business cards.',
      },
      {
        q: 'What is a Verified Customer badge?',
        a: 'When you send a review request via email from the dashboard, the link includes a verification flag. If the customer submits through that link, their review is automatically marked "✓ Verified" — which shows on your Wall of Love and widget, boosting trust.',
      },
      {
        q: 'Can customers attach a screenshot?',
        a: 'Yes. The collection form has an optional file upload field. Customers can attach a screenshot of a Google or Facebook review, which will appear on the testimonial card.',
      },
      {
        q: 'What happens with 1-2 star reviews?',
        a: 'They are never published. Instead, you receive a private email with the customer\'s contact details and review text so you can reach out and resolve the issue. You can also generate an AI-written reply directly from your dashboard.',
      },
    ],
  },
  {
    id: 'managing',
    title: 'Managing Reviews',
    icon: '✅',
    items: [
      {
        q: 'How do I approve or reject a review?',
        a: 'Go to your Dashboard and find the testimonial under the "Pending" filter. Click Approve to publish it, or Reject to hide it permanently. You can also Reset a review back to Pending at any time.',
      },
      {
        q: 'What do the status labels mean?',
        a: 'Pending — waiting for your review. Approved — published on your Wall of Love and widget. Rejected — hidden, not published. Hidden — automatically set for 1-2 star reviews; private, only visible to you.',
      },
      {
        q: 'How do I reply to a negative review?',
        a: 'Filter by "Hidden" in your dashboard. On any hidden testimonial, click "🤖 Generate Reply". Fimi\'s AI writes an empathetic, professional reply in seconds. Click Copy to copy it, or Send Email to open your email client with the reply pre-filled.',
      },
    ],
  },
  {
    id: 'widget',
    title: 'Embed Widget',
    icon: '🔌',
    items: [
      {
        q: 'How do I embed testimonials on my website?',
        a: 'Copy the script tag from Dashboard → "Your Links → Embed Widget" and paste it into your website\'s HTML, just before the closing </body> tag. Testimonials will appear automatically wherever the script is loaded.',
      },
      {
        q: 'Can I control where the widget appears?',
        a: 'Yes. Add a div with the attribute data-testimonial-widget="your-slug" or id="testimonial-widget" where you want the testimonials to render. If no target element is found, the widget appends itself to the bottom of the page.',
      },
      {
        q: 'Can I customize the widget colors?',
        a: 'Yes. Go to Dashboard → "Widget Appearance" and use the color pickers to set the card background, border, text, name, and star colors. Save and the widget updates immediately across all pages it\'s embedded on.',
      },
      {
        q: 'What is exit intent capture?',
        a: 'When a visitor moves their cursor toward the top of the browser (about to close the tab or switch), a subtle popup appears asking them to rate their experience. Clicking a star takes them to your review page. It only shows once per visit and only on pages where your widget is embedded.',
      },
    ],
  },
  {
    id: 'trust-badge',
    title: 'Dynamic Trust Badge',
    icon: '📊',
    items: [
      {
        q: 'What is the Trust Badge?',
        a: 'A small embeddable badge that shows your live average rating and total review count — similar to a Trustpilot badge, but 100% yours. It updates automatically as you approve new reviews.',
      },
      {
        q: 'How do I add it to my website?',
        a: 'Copy the script tag from Dashboard → "Dynamic Trust Badge" and paste it anywhere in your website\'s HTML. The badge will render inline at that location.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI Features',
    icon: '🤖',
    items: [
      {
        q: 'What is AI Summary?',
        a: 'Go to Dashboard → "AI Summary" and click Generate. Fimi reads your last 50 approved reviews and writes a polished 2-3 sentence marketing paragraph you can paste on your website, LinkedIn, or email campaigns. You need at least 3 approved reviews to use it.',
      },
      {
        q: 'What is AI Reply?',
        a: 'For hidden (negative) testimonials, click "🤖 Generate Reply" on the card. The AI writes a short, empathetic, professional response addressed to the customer by name. You can copy it or send it directly via email.',
      },
      {
        q: 'Do AI features cost extra?',
        a: 'No. AI Summary and AI Reply are included in all paid plans at no extra cost.',
      },
    ],
  },
  {
    id: 'branding',
    title: 'White Label & Branding',
    icon: '🏷️',
    items: [
      {
        q: 'How do I remove the "Powered by Fimi" badge?',
        a: 'Upgrade to a paid plan. Then go to Dashboard → "White Label Branding", enter your brand name and optionally a logo URL. The Fimi badge is replaced with your brand on the collection page and widget.',
      },
      {
        q: 'Can I use my own logo?',
        a: 'Yes. Paste a public image URL in the "Logo URL" field under White Label Branding. The logo appears at the top of your collection page.',
      },
      {
        q: 'How does the Google Review redirect work?',
        a: 'Paste your Google Review link in Dashboard → "White Label Branding → Google Review URL". After a customer submits a 3+ star review, they\'ll see a prompt to also leave a Google Review with one tap — doubling your public presence.',
      },
    ],
  },
  {
    id: 'milestones',
    title: 'Milestone Posts',
    icon: '🏆',
    items: [
      {
        q: 'What are milestone celebration emails?',
        a: 'Every time you hit 10, 25, 50, 100, 250, or 500 approved reviews, Fimi automatically sends you an email with a ready-to-post LinkedIn caption. Just copy and paste — no writing needed.',
      },
    ],
  },
  {
    id: 'gdpr',
    title: 'GDPR & Privacy',
    icon: '🔒',
    items: [
      {
        q: 'Is Fimi GDPR compliant?',
        a: 'Yes. Every review submission requires explicit consent via a checkbox. Customers are shown a link to the Privacy Policy. All stored data can be deleted at any time.',
      },
      {
        q: 'How can a customer delete their review?',
        a: 'After submitting a review, the customer receives a unique deletion link. Clicking it permanently removes their review and all associated personal data. They should save this link — it\'s the only way to delete without contacting you.',
      },
      {
        q: 'Can I delete a review from the dashboard?',
        a: 'Yes. Click the "Delete" button on any testimonial card in your dashboard. This permanently removes the review and all associated data.',
      },
    ],
  },
]

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-start justify-between gap-4 group"
      >
        <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition leading-relaxed">{q}</span>
        <span className={`text-gray-500 shrink-0 transition-transform mt-0.5 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <p className="text-sm text-gray-400 leading-relaxed pb-4">{a}</p>
      )}
    </div>
  )
}

export default function Help() {
  const [activeSection, setActiveSection] = useState('getting-started')

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Fimi
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition">
              Dashboard
            </Link>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition">
              Pricing
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest mb-3">Help & Documentation</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">How does Fimi work?</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Everything you need to collect, manage, and showcase customer reviews.
        </p>
      </section>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <nav className="sticky top-24 flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                  activeSection === s.id
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>{s.icon}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-12">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{s.icon}</span>
                <h2 className="text-2xl font-bold text-white">{s.title}</h2>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6">
                {s.items.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}

          {/* Contact */}
          <section className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-gray-400 text-sm mb-4">We're happy to help. Send us an email and we'll get back to you.</p>
            <a
              href="mailto:panos.lambrakis@gmail.com"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition"
            >
              Contact support →
            </a>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/pricing" className="hover:text-gray-300 transition">Pricing</Link>
          <Link to="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
          <Link to="/login" className="hover:text-gray-300 transition">Sign in</Link>
        </div>
        <p>© {new Date().getFullYear()} Fimi. All rights reserved.</p>
      </footer>
    </div>
  )
}
