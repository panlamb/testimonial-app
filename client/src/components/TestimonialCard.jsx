import StarRating from './StarRating'
import ShareableCard from './ShareableCard'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  hidden: 'bg-gray-100 text-gray-600',
}

export default function TestimonialCard({ testimonial: t, showActions, onStatusChange, onDelete, businessName }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col gap-3">
      {t.screenshot_url && (
        <img
          src={t.screenshot_url}
          alt="Review screenshot"
          className="w-full h-44 object-cover rounded-lg"
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <StarRating value={t.rating} readonly />
        {showActions && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_STYLES[t.status]}`}>
            {t.status}
          </span>
        )}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{t.review_text}&rdquo;</p>

      <div>
        <p className="font-semibold text-gray-900 text-sm">{t.customer_name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{new Date(t.created_at).toLocaleDateString()}</p>
      </div>

      {showActions && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {t.status !== 'approved' && (
            <ActionBtn color="green" onClick={() => onStatusChange(t.id, 'approved')}>Approve</ActionBtn>
          )}
          {t.status !== 'rejected' && (
            <ActionBtn color="red" onClick={() => onStatusChange(t.id, 'rejected')}>Reject</ActionBtn>
          )}
          {t.status !== 'hidden' && (
            <ActionBtn color="gray" onClick={() => onStatusChange(t.id, 'hidden')}>Hide</ActionBtn>
          )}
          {t.status !== 'pending' && (
            <ActionBtn color="yellow" onClick={() => onStatusChange(t.id, 'pending')}>Reset</ActionBtn>
          )}
          {t.status === 'approved' && (
            <ShareableCard testimonial={t} businessName={businessName} />
          )}
          <button
            onClick={() => onDelete(t.id)}
            className="ml-auto text-xs text-gray-400 hover:text-red-500 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

const COLOR_MAP = {
  green: 'bg-green-500 hover:bg-green-600 text-white',
  red: 'bg-red-500 hover:bg-red-600 text-white',
  gray: 'bg-gray-500 hover:bg-gray-600 text-white',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
}

function ActionBtn({ color, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded-lg transition ${COLOR_MAP[color]}`}
    >
      {children}
    </button>
  )
}
