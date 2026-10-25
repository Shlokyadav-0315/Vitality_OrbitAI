import { useRef, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function MoonMesh() {
  const meshRef = useRef()
  const moonTexture = useLoader(
    TextureLoader,
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/moon_1024.jpg'
  )

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      meshRef.current.position.x = Math.cos(t * 0.3) * 5
      meshRef.current.position.z = Math.sin(t * 0.3) * 5
      meshRef.current.position.y = Math.sin(t * 0.15) * 0.5
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[5, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={moonTexture} roughness={0.9} />
    </mesh>
  )
}

export default function Moon() {
  return (
    <Suspense fallback={
      <mesh position={[5, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    }>
      <MoonMesh />
    </Suspense>
  )
}
