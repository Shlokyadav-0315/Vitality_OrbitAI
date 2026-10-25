import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#000',
          border: '1px solid #00d4ff33',
          maxWidth: '500px',
          width: '90%',
          padding: '40px',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff'
          }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: '24px',
              padding: 0,
              lineHeight: 1,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ color: '#999', fontSize: '15px', lineHeight: 1.7 }}>
          {children}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '32px',
            width: '100%',
            padding: '12px',
            background: '#00d4ff11',
            border: '1px solid #00d4ff33',
            color: '#00d4ff',
            cursor: 'pointer',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.1em',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#00d4ff22'
            e.target.style.borderColor = '#00d4ff'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#00d4ff11'
            e.target.style.borderColor = '#00d4ff33'
          }}
        >
          CLOSE
        </button>
      </div>
    </div>
  )
}
