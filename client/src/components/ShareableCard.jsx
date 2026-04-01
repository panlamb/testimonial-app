import { useRef } from 'react'
import { toPng } from 'html-to-image'

export default function ShareableCard({ testimonial: t, businessName }) {
  const cardRef = useRef(null)

  async function handleDownload() {
    if (!cardRef.current) return
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `testimonial-${t.id}.png`
    a.click()
  }

  const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating)

  return (
    <>
      {/* Hidden card used for image capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div
          ref={cardRef}
          style={{
            width: '600px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
            padding: '56px 48px',
            borderRadius: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            color: '#ffffff',
            boxSizing: 'border-box',
          }}
        >
          {/* Quote mark */}
          <div style={{ fontSize: '80px', lineHeight: 1, color: 'rgba(255,255,255,0.15)', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
            "
          </div>

          {/* Stars */}
          <div style={{ fontSize: '28px', letterSpacing: '4px', color: '#fbbf24', marginBottom: '24px' }}>
            {stars}
          </div>

          {/* Review text */}
          <p style={{ fontSize: '22px', lineHeight: 1.6, color: '#e0e7ff', margin: '0 0 32px', fontStyle: 'italic' }}>
            {t.review_text}
          </p>

          {/* Customer name */}
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#c7d2fe', margin: 0 }}>
            — {t.customer_name}
          </p>

          {/* Business + Fimi badge */}
          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{businessName}</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(165,180,252,0.9)', letterSpacing: '0.5px' }}>Powered by Fimi</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>getfimi.com</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="text-xs px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
      >
        Share
      </button>
    </>
  )
}
