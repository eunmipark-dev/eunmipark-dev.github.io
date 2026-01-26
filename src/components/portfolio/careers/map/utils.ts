// HexUtils.ts
import * as THREE from 'three'

export interface CubeCoords {
  q: number
  r: number
  s: number
}

// 큐브 좌표 방향 (Pointy-top 기준)
const directions = [
  { q: 1, r: 0, s: -1 },
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 }
]

export function getCubeSpiral(center: CubeCoords, rings: number): CubeCoords[] {
  const results: CubeCoords[] = [center]
  for (let k = 1; k <= rings; k++) {
    const cube = {
      q: center.q + directions[4].q * k,
      r: center.r + directions[4].r * k,
      s: center.s + directions[4].s * k
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < k; j++) {
        results.push({ ...cube })
        cube.q += directions[i].q
        cube.r += directions[i].r
        cube.s += directions[i].s
      }
    }
  }
  return results
}

// 큐브 좌표를 Three.js 3D 좌표(Vector3)로 변환
export function cubeToCartesian(cube: CubeCoords, radius: number, padding: number): THREE.Vector3 {
  const r = radius + padding
  const x = r * Math.sqrt(3) * (cube.q + cube.r / 2)
  const z = r * 1.5 * cube.r
  return new THREE.Vector3(x, z, 0)
}
