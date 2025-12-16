import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

const ThreeCircle: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    // Full screen renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Circle logic from the book (adapted to three.js)
    const radius = 2 // 원 반지름 (조정 가능)
    const currentPosition = new THREE.Vector3(0, 0, 0) // 원 중심 위치
    const positions = [] // 점 위치 배열 (Float32Array로 변환할 거임)

    // for 루프: x from -radius to radius (step 0.01 for smoother circle)
    for (let x = -radius; x <= radius; x += 0.01) {
      for (let y = -radius; y <= radius; y += 0.01) {
        if (x * x + y * y <= radius * radius) {
          positions.push(x, y, 0)
        }
      }
    }

    // BufferGeometry 생성
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )

    // PointsMaterial: 점 스타일 (크기, 색상)
    const material = new THREE.PointsMaterial({
      color: 0x00ff00, // 녹색
      size: 0.02, // 점 크기 (조정 가능)
      sizeAttenuation: true, // 거리에 따라 크기 감소
    })

    // Points 객체 생성 및 scene 추가
    const circlePoints = new THREE.Points(geometry, material)
    scene.add(circlePoints)

    camera.position.z = 5 // 카메라 위치

    // Stats for performance monitoring (top-right)
    const stats = new Stats()
    stats.dom.style.left = '' // Reset left to move to right
    stats.dom.style.right = '0px' // Position to top-right
    document.body.appendChild(stats.dom)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      //circlePoints.rotation.x += 0.01 // 원 회전 (x축) - 필요시 주석 해제
      //circlePoints.rotation.y += 0.01 // 원 회전 (y축) - 필요시 주석 해제
      stats.update() // Update stats
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize for full screen (already included, but ensures re-render)
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera) // Explicit re-render after resize
    }
    window.addEventListener('resize', handleResize)

    const updated2D = () => {
      const moveSpeed = 100
      const inputVector = new THREE.Vector3(1, 1, 0).normalize()
      const deltaPosition = inputVector
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      document.body.removeChild(stats.dom) // Remove stats on cleanup
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    />
  )
}

export default ThreeCircle
