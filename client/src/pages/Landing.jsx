import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '⭐',
    title: 'Συλλογή κριτικών',
    desc: 'Στείλε έναν σύνδεσμο στους πελάτες σου. Γράφουν την κριτική τους σε 30 δευτερόλεπτα.',
  },
  {
    icon: '✅',
    title: 'Εσύ αποφασίζεις τι δημοσιεύεται',
    desc: 'Κάθε κριτική περνά πρώτα από σένα. Εγκρίνεις, απορρίπτεις ή κρύβεις ό,τι θέλεις.',
  },
  {
    icon: '🌐',
    title: 'Wall of Love',
    desc: 'Αυτόματη δημόσια σελίδα με όλες τις εγκεκριμένες κριτικές σου. Μοιράσου τον σύνδεσμο παντού.',
  },
  {
    icon: '🔌',
    title: 'Embed σε οποιοδήποτε site',
    desc: 'Αντιγράφεις ένα μόνο κομμάτι κώδικα και οι κριτικές εμφανίζονται απευθείας στο site σου.',
  },
  {
    icon: '📸',
    title: 'Screenshots από Google & Facebook',
    desc: 'Οι πελάτες μπορούν να ανεβάσουν screenshot από την κριτική τους στο Google ή το Facebook.',
  },
  {
    icon: '🔒',
    title: 'GDPR compliant',
    desc: 'Συγκατάθεση πελάτη, δικαίωμα διαγραφής, πολιτική απορρήτου. Όλα έτοιμα.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Μαρία Παπαδοπούλου',
    business: 'Κομμωτήριο Μαρία',
    text: 'Πριν το Fimi, οι κριτικές μου ήταν μόνο στο Google και κανείς δεν τις έβλεπε στο site μου. Τώρα τις βλέπουν όλοι.',
    stars: 5,
  },
  {
    name: 'Νίκος Αλεξίου',
    business: 'Personal Trainer',
    text: 'Έστειλα τον σύνδεσμο σε 10 πελάτες μου και σε 2 μέρες είχα 8 κριτικές στο site μου. Απίστευτα εύκολο.',
    stars: 5,
  },
  {
    name: 'Ελένη Κωστοπούλου',
    business: 'Εστιατόριο Η Ελένη',
    text: 'Το widget λειτουργεί τέλεια στο site μου. Οι πελάτες μου λένε ότι τους κάνει να εμπιστεύονται περισσότερο.',
    stars: 5,
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">Fimi</span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800 transition">
              Σύνδεση
            </Link>
            <Link
              to="/register"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Ξεκίνα δωρεάν
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide">
          Ξεκίνα δωρεάν — χωρίς πιστωτική κάρτα
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Οι κριτικές σου στο Google<br />
          <span className="text-indigo-600">να φαίνονται και στο site σου</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Το Fimi μαζεύει τις κριτικές από τους πελάτες σου και τις εμφανίζει στο site σου αυτόματα.
          Σε 5 λεπτά. Χωρίς τεχνικές γνώσεις.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Ξεκίνα δωρεάν →
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-200 text-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition"
          >
            Πώς λειτουργεί
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">Δεν χρειάζεται πιστωτική κάρτα. Ξεκίνα δωρεάν σήμερα.</p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Πώς λειτουργεί</h2>
          <p className="text-gray-500 text-center mb-14">Τρία βήματα και είσαι έτοιμος</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Δημιουργείς λογαριασμό', desc: 'Εγγράφεσαι δωρεάν και παίρνεις έναν μοναδικό σύνδεσμο για την επιχείρησή σου.' },
              { step: '2', title: 'Στέλνεις τον σύνδεσμο', desc: 'Οι πελάτες σου κάνουν κλικ, γράφουν την κριτική τους και εσύ την εγκρίνεις.' },
              { step: '3', title: 'Εμφανίζεται στο site σου', desc: 'Με ένα κομμάτι κώδικα, οι κριτικές εμφανίζονται αυτόματα στο site σου.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Όλα όσα χρειάζεσαι</h2>
        <p className="text-gray-500 text-center mb-14">Χωρίς περιττά. Μόνο ό,τι χρειάζεσαι.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Τι λένε οι χρήστες μας</h2>
          <p className="text-gray-500 text-center mb-14">Επιχειρήσεις που ήδη χρησιμοποιούν το Fimi</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-amber-400 text-lg mb-3">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Έτοιμος να δείξεις τη φήμη σου;
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Ξεκίνα δωρεάν σήμερα. Χωρίς πιστωτική κάρτα.
        </p>
        <Link
          to="/register"
          className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
        >
          Δημιούργησε δωρεάν λογαριασμό →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/privacy" className="hover:text-gray-600 transition">Πολιτική Απορρήτου</Link>
          <Link to="/login" className="hover:text-gray-600 transition">Σύνδεση</Link>
          <Link to="/register" className="hover:text-gray-600 transition">Εγγραφή</Link>
        </div>
        <p>© {new Date().getFullYear()} Fimi. Όλα τα δικαιώματα διατηρούνται.</p>
      </footer>
    </div>
  )
}
