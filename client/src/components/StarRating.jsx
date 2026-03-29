export default function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          className={`text-2xl leading-none transition-colors ${
            star <= value ? 'text-amber-400' : 'text-gray-300'
          } ${!readonly ? 'hover:text-amber-400 cursor-pointer' : 'cursor-default'}`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
