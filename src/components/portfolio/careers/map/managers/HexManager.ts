// map/managers/HexManager.ts
import * as THREE from 'three'
import { getCubeSpiral, cubeToCartesian } from '../utils'
import { _VS_scale, _FS_scale } from '../shader_bw'

export default class HexManager {
  public mesh: THREE.InstancedMesh

  constructor(rings: number, uniforms: any) {
    const points = getCubeSpiral({ q: 0, r: 0, s: 0 }, rings)
    const geometry = new THREE.CircleGeometry(2, 6)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: _VS_scale,
      fragmentShader: _FS_scale,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.InstancedMesh(geometry, material, points.length)
    this.mesh.frustumCulled = false

    const dummy = new THREE.Object3D()
    points.forEach((p, i) => {
      const pos = cubeToCartesian(p, 2.2, 0.06)
      dummy.position.copy(pos)
      dummy.rotation.set(0, 0, Math.PI / 6)
      dummy.updateMatrix()
      this.mesh.setMatrixAt(i, dummy.matrix)
    })
  }
}
