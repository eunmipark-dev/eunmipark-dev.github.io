// map/managers/BuildingManager.ts
import * as THREE from 'three'
import { _VS_building, _FS_building } from '../shader_bw'

export default class BuildingManager {
  public meshes: THREE.Mesh[] = []
  private materials: THREE.ShaderMaterial[] = []

  constructor(landmarkPositions: THREE.Vector3[], uniforms: any) {
    // 육각 기둥 지오메트리 정의
    const height = 12 // 빌딩 높이
    const bldgGeom = new THREE.CylinderGeometry(2, 2.5, height, 6)
    bldgGeom.translate(0, height / 2, 0)
    bldgGeom.rotateX(Math.PI / 2)

    landmarkPositions.forEach(pos => {
      const bldgMat = new THREE.ShaderMaterial({
        uniforms: {
          ...uniforms, // 전역 유니폼 공유 (uTime, uScale 등)
          uIsActive: { value: 0.0 }, // 각 건물별 개별 활성화 상태
        },
        vertexShader: _VS_building,
        fragmentShader: _FS_building,
        transparent: true,
      })

      const mesh = new THREE.Mesh(bldgGeom, bldgMat)

      const box = new THREE.Box3().setFromObject(mesh)

      // 2. 크기 계산 (Vector3 형태로 반환: x, y, z)
      const size = new THREE.Vector3()
      box.getSize(size)

      console.log('pos:', pos, size.z)
      mesh.position.copy(pos)

      this.meshes.push(mesh)
      this.materials.push(bldgMat)
    })
  }

  // 특정 인덱스의 건물만 하이라이트
  public setHighlight(index: number | null) {
    this.materials.forEach((m, i) => {
      m.uniforms.uIsActive.value = i === index ? 1.0 : 0.0
    })
  }

  // 매 프레임 시간 업데이트 (스캔라인 애니메이션용)
  public updateTime(time: number) {
    this.materials.forEach(m => {
      m.uniforms.uTime.value = time
    })
  }
}
