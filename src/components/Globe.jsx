import { useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function GlobeMesh() {
  const meshRef = useRef()
  const earthTexture = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg'
  )

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={earthTexture} roughness={0.5} metalness={0.1} />
    </mesh>
  )
}

export default function Globe() {
  return (
    <Suspense fallback={
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#1a6fa8" />
      </mesh>
    }>
      <GlobeMesh />
    </Suspense>
  )
}
