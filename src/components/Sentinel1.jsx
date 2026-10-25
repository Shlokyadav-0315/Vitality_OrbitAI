import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Sentinel1() {
  const groupRef = useRef()

  // Polar orbit animation (passes over poles, not equator)
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      const orbitSpeed = 0.5 // Faster than Moon (90-min orbit vs Moon's slower orbit)
      const orbitRadius = 2.8 // Closer to Earth than Moon

      // Polar orbit: rotates around Y-axis (vertical) instead of horizontal
      const angle = time * orbitSpeed
      groupRef.current.position.x = Math.cos(angle) * orbitRadius
      groupRef.current.position.z = Math.sin(angle) * orbitRadius
      groupRef.current.position.y = Math.sin(angle * 2) * 0.3 // Slight vertical motion

      // Rotate satellite to face Earth
      groupRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={groupRef} position={[2.8, 0, 0]}>
      {/* Main satellite body (rectangular bus) */}
      <mesh castShadow>
        <boxGeometry args={[0.08, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* SAR Antenna (large rectangular panel - the key feature) */}
      <mesh position={[0, 0, -0.15]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.25, 0.02]} />
        <meshStandardMaterial
          color="#2a2a3e"
          metalness={0.6}
          roughness={0.3}
          emissive="#00d4ff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Solar Panel - Left */}
      <mesh position={[-0.15, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.18, 0.01]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#1a4d6f"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Solar Panel - Right */}
      <mesh position={[0.15, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.18, 0.01]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#1a4d6f"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Communication antenna (small cylinder on top) */}
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.05]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Point light for satellite glow */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#00d4ff" distance={0.5} />
    </group>
  )
}
