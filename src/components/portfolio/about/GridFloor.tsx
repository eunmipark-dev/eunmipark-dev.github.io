import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Futuristic glowing grid floor for the About hero.
 *
 * A reflective neon grid recedes toward a foggy horizon and scrolls slowly
 * toward the viewer. An empty `robots` group is created as an extension
 * point — drop loaded robot models (GLTF) into it later to have them roam
 * the floor.
 */
const GridFloor: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Guard against SSR — Three.js needs a real DOM/WebGL context.
    if (typeof window === 'undefined') return
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const bgColor = new THREE.Color('#050a12')
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.055)

    const camera = new THREE.PerspectiveCamera(
      62,
      mount.clientWidth / mount.clientHeight,
      0.1,
      400,
    )
    camera.position.set(0, 3.2, 12)
    camera.lookAt(0, 0.4, -8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // --- grid floor (two layered grids for depth) --------------------------
    const CELL = 4 // world units between major lines
    const SIZE = 240
    const DIV = SIZE / CELL

    const makeGrid = (color: number, opacity: number) => {
      const grid = new THREE.GridHelper(SIZE, DIV, color, color)
      const mat = grid.material as THREE.LineBasicMaterial
      mat.transparent = true
      mat.opacity = opacity
      mat.fog = true
      return grid
    }

    const gridGroup = new THREE.Group()
    const gridA = makeGrid(0x19e3ff, 0.55) // cyan
    const gridB = makeGrid(0x0d6f8c, 0.25) // dim cyan underlay, offset
    gridB.position.set(CELL / 2, -0.01, CELL / 2)
    gridGroup.add(gridA, gridB)
    scene.add(gridGroup)

    // faint amber center pulse line along the depth axis
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.02, SIZE / 2),
      new THREE.Vector3(0, 0.02, -SIZE / 2),
    ])
    const axisMat = new THREE.LineBasicMaterial({
      color: 0xff9f1c,
      transparent: true,
      opacity: 0.5,
    })
    const axisLine = new THREE.Line(axisGeo, axisMat)
    scene.add(axisLine)

    // --- robot extension point --------------------------------------------
    // TODO: load GLTF robot models and add them to this group so they can
    //       roam the floor. Kept empty for now per the current design.
    const robots = new THREE.Group()
    robots.name = 'robots'
    scene.add(robots)

    // --- interaction: subtle parallax from pointer -------------------------
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    mount.addEventListener('pointermove', onPointerMove)

    // --- resize ------------------------------------------------------------
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // --- animation loop ----------------------------------------------------
    let frame = 0
    let raf = 0
    const animate = () => {
      frame += 1
      const t = frame * 0.016

      // scroll the grid toward the viewer and wrap for an infinite floor
      gridGroup.position.z = (t * 1.6) % CELL

      // gentle camera sway + pointer parallax
      const swayX = Math.sin(t * 0.25) * 0.5
      camera.position.x += (target.x * 1.4 + swayX - camera.position.x) * 0.04
      camera.position.y += (3.2 - target.y * 0.6 - camera.position.y) * 0.04
      camera.lookAt(0, 0.4, -8)

      // amber line breathing
      axisMat.opacity = 0.3 + Math.sin(t * 1.5) * 0.2

      renderer.render(scene, camera)
      raf = window.requestAnimationFrame(animate)
    }
    animate()

    // --- cleanup -----------------------------------------------------------
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('pointermove', onPointerMove)
      renderer.dispose()
      gridA.geometry.dispose()
      ;(gridA.material as THREE.Material).dispose()
      gridB.geometry.dispose()
      ;(gridB.material as THREE.Material).dispose()
      axisGeo.dispose()
      axisMat.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div className="about-canvas" ref={mountRef} aria-hidden />
}

export default GridFloor
