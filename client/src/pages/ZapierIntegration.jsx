import { Link } from 'react-router-dom'
import { useCanonical } from '../hooks/useCanonical'

const TRIGGERS = [
  { name: 'New testimonial approved', desc: 'Fires when you approve a testimonial in your dashboard.' },
]

const EXAMPLE_ZAPS = [
  { from: 'Fimi', to: 'Slack', desc: 'Get a Slack message every time a new review is approved.' },
  { from: 'Fimi', to: 'Google Sheets', desc: 'Log every approved testimonial to a spreadsheet automatically.' },
  { from: 'Fimi', to: 'Notion', desc: 'Create a new Notion page for each approved review.' },
  { from: 'Fimi', to: 'Airtable', desc: 'Build a live database of all your testimonials in Airtable.' },
  { from: 'Fimi', to: 'Gmail', desc: 'Send yourself an email when a high-rating review comes in.' },
  { from: 'Fimi', to: 'Make / n8n', desc: 'Connect to any workflow via our webhook endpoint.' },
]

export default function ZapierIntegration() {
  useCanonical('/integrations/zapier')
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-lg tracking-tight">
          Fimi <span className="text-xs text-gray-500 font-normal ml-1">φήμη · /ˈfi.mi/ · reputation</span>
        </Link>
        <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          Try free →
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-800 rounded-full px-3 py-1">
            Integrations
          </div>
          <h1 className="text-3xl font-bold">Connect Fimi to 5,000+ apps via Zapier & webhooks</h1>
          <p className="text-gray-400 text-lg">
            Use Fimi's webhook to trigger automations in Zapier, Make, n8n, or any tool that accepts HTTP POST requests.
          </p>
        </div>

        {/* How webhooks work */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">How to connect via webhook</h2>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Go to your Fimi dashboard → scroll to Integrations → paste your webhook URL.' },
              { step: '2', text: 'In Zapier: create a new Zap → choose "Webhooks by Zapier" as the trigger → copy your Zapier webhook URL.' },
              { step: '3', text: 'Every time you approve a testimonial, Fimi sends a POST request to your URL with the testimonial data.' },
              { step: '4', text: 'Connect the output to any action: Slack, Google Sheets, Notion, Airtable, email, or anything else.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {s.step}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook payload */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Webhook payload example</h2>
          <p className="text-gray-400 text-sm">When a testimonial is approved, Fimi sends this JSON to your webhook URL:</p>
          <pre className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-sm text-gray-300 overflow-x-auto font-mono">
{`{
  "event": "testimonial.approved",
  "testimonial": {
    "id": 42,
    "customer_name": "Jane Smith",
    "review_text": "Absolutely brilliant service...",
    "rating": 5,
    "status": "approved",
    "created_at": "2025-03-15T10:23:00Z"
  }
}`}
          </pre>
        </div>

        {/* Available triggers */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Available triggers</h2>
          {TRIGGERS.map((t) => (
            <div key={t.name} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-1.5" />
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{t.desc}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-600">More triggers (new submission, new private complaint) coming soon.</p>
        </div>

        {/* Example Zaps */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Popular automations</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {EXAMPLE_ZAPS.map((z) => (
              <div key={z.desc} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-indigo-400 font-medium">{z.from}</span>
                  <span>→</span>
                  <span className="text-gray-300 font-medium">{z.to}</span>
                </div>
                <p className="text-sm text-gray-300">{z.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-2xl p-6 text-center space-y-3">
          <p className="font-bold text-lg">Start connecting Fimi to your workflow</p>
          <p className="text-gray-400 text-sm">Create a free account, then set your webhook URL in the dashboard.</p>
          <Link to="/register" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition">
            Get started free →
          </Link>
        </div>
      </main>
    </div>
  )
}
