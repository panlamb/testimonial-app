import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 my-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 hover:underline mb-6 block"
        >
          ← Πίσω
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Πολιτική Απορρήτου</h1>
        <p className="text-sm text-gray-400 mb-8">Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}</p>

        <div className="prose prose-sm text-gray-700 space-y-6">
          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Ποια δεδομένα συλλέγουμε</h2>
            <p>Όταν υποβάλλετε ένα testimonial, συλλέγουμε:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Το όνομά σας</li>
              <li>Το email σας (προαιρετικό)</li>
              <li>Το κείμενο της κριτικής σας και η βαθμολογία</li>
              <li>Τυχόν screenshot που ανεβάσατε</li>
              <li>Ημερομηνία και ώρα υποβολής</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Γιατί τα χρησιμοποιούμε</h2>
            <p>Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για την εμφάνιση της κριτικής σας στη σελίδα της επιχείρησης, εφόσον εγκριθεί.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Νομική βάση (GDPR)</h2>
            <p>Η επεξεργασία βασίζεται στη <strong>ρητή συγκατάθεσή σας</strong> κατά την υποβολή της φόρμας (Άρθρο 6(1)(α) GDPR).</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Δικαιώματά σας</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Δικαίωμα διαγραφής:</strong> Μπορείτε να διαγράψετε την κριτική σας ανά πάσα στιγμή μέσω του προσωπικού link διαγραφής που λάβατε μετά την υποβολή.</li>
              <li><strong>Δικαίωμα πρόσβασης:</strong> Μπορείτε να ζητήσετε αντίγραφο των δεδομένων σας επικοινωνώντας μαζί μας.</li>
              <li><strong>Δικαίωμα ανάκλησης συγκατάθεσης:</strong> Μπορείτε να ανακαλέσετε τη συγκατάθεσή σας οποιαδήποτε στιγμή.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 text-base mb-2">Αποθήκευση δεδομένων</h2>
            <p>Τα δεδομένα αποθηκεύονται σε ασφαλή διακομιστή και δεν μοιράζονται με τρίτους.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
