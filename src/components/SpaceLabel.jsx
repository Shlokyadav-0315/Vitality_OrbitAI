import { useState } from 'react'

export default function SpaceLabel({ children, label }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {children}

      {hovered && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00d4ff',
          fontFamily: 'Space Mono, monospace',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(0, 212, 255, 0.4)',
          pointerEvents: 'none',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {label}
        </div>
      )}
    </group>
  )
}
