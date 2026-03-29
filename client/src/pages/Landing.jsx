import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '⭐', title: 'Συλλογή κριτικών', desc: 'Στείλε έναν σύνδεσμο στους πελάτες σου. Γράφουν την κριτική τους σε 30 δευτερόλεπτα.' },
  { icon: '✅', title: 'Εσύ αποφασίζεις', desc: 'Κάθε κριτική περνά πρώτα από σένα. Εγκρίνεις ό,τι θέλεις να δημοσιευτεί.' },
  { icon: '🌐', title: 'Wall of Love', desc: 'Αυτόματη δημόσια σελίδα με όλες τις εγκεκριμένες κριτικές σου.' },
  { icon: '🔌', title: 'Embed σε οποιοδήποτε site', desc: 'Αντιγράφεις ένα κομμάτι κώδικα και οι κριτικές εμφανίζονται στο site σου.' },
  { icon: '📸', title: 'Screenshots Google & Facebook', desc: 'Οι πελάτες ανεβάζουν screenshot από την κριτική τους απευθείας.' },
  { icon: '🔒', title: 'GDPR compliant', desc: 'Συγκατάθεση, δικαίωμα διαγραφής, πολιτική απορρήτου. Όλα έτοιμα.' },
]

const TESTIMONIALS = [
  { name: 'Μαρία Παπαδοπούλου', business: 'Κομμωτήριο Μαρία', text: 'Πριν το Fimi, οι κριτικές μου ήταν μόνο στο Google. Τώρα τις βλέπουν όλοι στο site μου.', stars: 5 },
  { name: 'Νίκος Αλεξίου', business: 'Personal Trainer', text: 'Έστειλα τον σύνδεσμο σε 10 πελάτες και σε 2 μέρες είχα 8 κριτικές στο site μου. Απίστευτα εύκολο.', stars: 5 },
  { name: 'Ελένη Κωστοπούλου', business: 'Εστιατόριο Η Ελένη', text: 'Το widget λειτουργεί τέλεια. Οι πελάτες μου λένε ότι τους κάνει να εμπιστεύονται περισσότερο.', stars: 5 },
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
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
              Σύνδεση
            </Link>
            <Link
              to="/register"
              className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition font-medium"
            >
              Ξεκίνα δωρεάν
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
            Ξεκίνα δωρεάν — χωρίς πιστωτική κάρτα
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Οι κριτικές σου στο Google
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              να δουλεύουν για σένα
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Το Fimi μαζεύει τις κριτικές από τους πελάτες σου και τις εμφανίζει
            στο site σου αυτόματα. Σε 5 λεπτά. Χωρίς τεχνικές γνώσεις.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-indigo-900/50"
            >
              Ξεκίνα δωρεάν →
            </Link>
            <a
              href="#how-it-works"
              className="border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Πώς λειτουργεί
            </a>
          </div>

          <p className="text-sm text-gray-600 mt-5">Δεν χρειάζεται πιστωτική κάρτα. Ξεκίνα δωρεάν σήμερα.</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Απλή διαδικασία</p>
            <h2 className="text-4xl font-bold text-white">Τρία βήματα και είσαι έτοιμος</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />

            {[
              { step: '01', title: 'Δημιουργείς λογαριασμό', desc: 'Εγγράφεσαι δωρεάν και παίρνεις έναν μοναδικό σύνδεσμο για την επιχείρησή σου.' },
              { step: '02', title: 'Στέλνεις τον σύνδεσμο', desc: 'Οι πελάτες σου κάνουν κλικ, γράφουν την κριτική τους και εσύ την εγκρίνεις.' },
              { step: '03', title: 'Εμφανίζεται στο site σου', desc: 'Με ένα κομμάτι κώδικα, οι κριτικές εμφανίζονται αυτόματα στο site σου.' },
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

      {/* Features */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Δυνατότητες</p>
            <h2 className="text-4xl font-bold text-white">Όλα όσα χρειάζεσαι</h2>
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

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Κριτικές</p>
            <h2 className="text-4xl font-bold text-white">Τι λένε οι χρήστες μας</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition">
                <div className="text-amber-400 text-base mb-4 tracking-wide">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Έτοιμος να δείξεις<br />τη φήμη σου;
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Ξεκίνα δωρεάν σήμερα. Χωρίς πιστωτική κάρτα.
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-indigo-900/50"
          >
            Δημιούργησε δωρεάν λογαριασμό →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/privacy" className="hover:text-gray-300 transition">Πολιτική Απορρήτου</Link>
          <Link to="/login" className="hover:text-gray-300 transition">Σύνδεση</Link>
          <Link to="/register" className="hover:text-gray-300 transition">Εγγραφή</Link>
        </div>
        <p>© {new Date().getFullYear()} Fimi. Όλα τα δικαιώματα διατηρούνται.</p>
      </footer>
    </div>
  )
}
