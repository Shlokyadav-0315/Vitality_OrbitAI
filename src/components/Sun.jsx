import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SunMesh() {
  const sunRef = useRef()
  const corona1Ref = useRef()
  const corona2Ref = useRef()
  const corona3Ref = useRef()

  // Animated pulsing glow
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (corona1Ref.current) {
      corona1Ref.current.material.opacity = 0.25 + Math.sin(t * 1.5) * 0.08
      corona1Ref.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.02)
    }
    if (corona2Ref.current) {
      corona2Ref.current.material.opacity = 0.12 + Math.sin(t * 0.8 + 1) * 0.05
      corona2Ref.current.scale.setScalar(1 + Math.sin(t * 0.9 + 2) * 0.03)
    }
    if (corona3Ref.current) {
      corona3Ref.current.material.opacity = 0.05 + Math.sin(t * 0.5 + 2) * 0.03
      corona3Ref.current.scale.setScalar(1 + Math.sin(t * 0.6 + 1) * 0.04)
    }
    // Slowly rotate sun surface
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001
    }
  })

  // Procedural sun texture using canvas
  const sunTexture = (() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    // Base orange gradient
    const baseGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    baseGrad.addColorStop(0, '#ffffff')
    baseGrad.addColorStop(0.1, '#fff5c0')
    baseGrad.addColorStop(0.3, '#ffdd00')
    baseGrad.addColorStop(0.6, '#ffaa00')
    baseGrad.addColorStop(0.85, '#ff6600')
    baseGrad.addColorStop(1, '#cc3300')
    ctx.fillStyle = baseGrad
    ctx.fillRect(0, 0, 512, 512)

    // Add solar surface texture blobs
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const r = Math.random() * 40 + 10
      const opacity = Math.random() * 0.4 + 0.1
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      const bright = Math.random() > 0.4
      grad.addColorStop(0, bright ? `rgba(255, 255, 150, ${opacity})` : `rgba(200, 60, 0, ${opacity})`)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }

    // Add bright solar flare spots
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const r = Math.random() * 25 + 8
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.3, 'rgba(255, 240, 100, 0.7)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  })()

  return (
    <group>
      {/* Main sun surface */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          map={sunTexture}
          toneMapped={false}
        />
      </mesh>

      {/* Inner corona - bright orange */}
      <mesh ref={corona1Ref}>
        <sphereGeometry args={[2.25, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.4}
          toneMapped={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Mid corona - deep orange */}
      <mesh ref={corona2Ref}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.2}
          toneMapped={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona - wide glow */}
      <mesh ref={corona3Ref}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa33"
          transparent
          opacity={0.08}
          toneMapped={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Sun light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={5}
        color="#ffcc44"
        distance={80}
        decay={1.5}
      />
    </group>
  )
}

export default function Sun() {
  return (
    <group position={[20, 5, -15]}>
      <SunMesh />
    </group>
  )
}
