import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function DeleteTestimonial() {
  const { token } = useParams()
  const [status, setStatus] = useState('confirm') // confirm | loading | done | error

  async function handleDelete() {
    setStatus('loading')
    try {
      const res = await fetch(`/api/collect/delete/${token}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('done')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <Screen>
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Η κριτική σας διαγράφηκε</h2>
        <p className="text-gray-500 text-sm">Τα δεδομένα σας έχουν αφαιρεθεί οριστικά.</p>
      </Screen>
    )
  }

  if (status === 'error') {
    return (
      <Screen>
        <div className="text-4xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Αδύνατη η διαγραφή</h2>
        <p className="text-gray-500 text-sm">Ο σύνδεσμος δεν είναι έγκυρος ή η κριτική έχει ήδη διαγραφεί.</p>
      </Screen>
    )
  }

  return (
    <Screen>
      <div className="text-4xl mb-4">🗑️</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Διαγραφή κριτικής</h2>
      <p className="text-gray-500 text-sm mb-6">
        Είστε σίγουροι ότι θέλετε να διαγράψετε την κριτική σας; Η ενέργεια είναι μη αναστρέψιμη.
      </p>
      <button
        onClick={handleDelete}
        disabled={status === 'loading'}
        className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
      >
        {status === 'loading' ? 'Διαγραφή…' : 'Ναι, διάγραψε την κριτική μου'}
      </button>
    </Screen>
  )
}

function Screen({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-sm w-full text-center">
        {children}
      </div>
    </div>
  )
}
