import { useState } from 'react'

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false)

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            background: 'rgba(0, 212, 255, 0.95)',
            color: '#000',
            fontSize: '11px',
            fontFamily: 'Space Mono, monospace',
            whiteSpace: 'nowrap',
            borderRadius: '2px',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out',
            pointerEvents: 'none'
          }}
        >
          {text}
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid rgba(0, 212, 255, 0.95)'
            }}
          />
        </div>
      )}
    </div>
  )
}
