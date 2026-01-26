// map/managers/LabelManager.ts
import * as THREE from 'three'
import mapboxgl from 'mapbox-gl'

export default class LabelManager {
  private container: HTMLElement
  private svg: SVGElement
  private elements: { box: HTMLElement; line: SVGPathElement }[] = []

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div')
    this.container.id = 'labels-container'

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.setAttribute('class', 'label-line-svg')

    this.container.appendChild(this.svg)
    parent.appendChild(this.container)
  }

  // 1. 초기 라벨 엘리먼트 생성
  public createLabels(landmarkInfos: any[]) {
    landmarkInfos.forEach((info) => {
      const box = document.createElement('div')
      box.className = 'label-box'
      box.innerHTML = `
        <div class="label-title">${info.title}</div>
        <div class="label-desc">${info.desc}</div>
        <div class="label-extra-info">
          ${
            info.role
              ? `<div class="info-item"><span class="info-label">Role</span><span>${info.role}</span></div>`
              : ''
          }
          ${
            info.period
              ? `<div class="info-item"><span class="info-label">Period</span><span>${info.period}</span></div>`
              : ''
          }
        </div>
      `
      this.container.appendChild(box)

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('class', 'connector-path')
      this.svg.appendChild(path)

      this.elements.push({ box, line: path })
    })
  }

  // 2. 선택 상태 업데이트 (Highlight)
  public updateSelection(index: number | null) {
    this.elements.forEach((el, i) => {
      if (i === index) {
        el.box.classList.add('active')
        el.line.classList.add('active')
      } else {
        el.box.classList.remove('active')
        el.line.classList.remove('active')
      }
    })
  }

  // 3. 매 프레임 위치 갱신
  public updatePositions(
    landmarks: THREE.Mesh[],
    camera: THREE.Camera,
    width: number,
    height: number,
    uScale: number
  ) {
    landmarks.forEach((mesh, i) => {
      const el = this.elements[i]
      if (!el) return

      const pos = mesh.position.clone().project(camera)
      const x = (pos.x * 0.5 + 0.5) * width
      const y = -(pos.y * 0.5 - 0.5) * height

      const isVisible = pos.z < 1
      el.box.style.display = isVisible ? 'block' : 'none'
      el.line.style.display = isVisible ? 'block' : 'none'

      if (isVisible) {
        const offX_start = i === 0 ? -10 : 10
        const offY_start = -22

        // 줌 레벨에 따른 유동적 거리 보정
        const labelScale = (1 / Math.log2(uScale + 1.0)) * 13.0
        const offX = i === 0 ? -180 : 70
        const offY = -80

        const startX = x + offX_start
        const startY = y + offY_start
        const boxX = x + offX * labelScale
        const boxY = y + offY * labelScale

        el.box.style.left = `${boxX}px`
        el.box.style.top = `${boxY}px`

        const boxWidth = el.box.offsetWidth
        const lineTargetX = i === 0 ? boxX + boxWidth : boxX

        el.line.setAttribute('d', `M ${startX} ${startY} L ${lineTargetX} ${boxY}`)
      }
    })
  }
}
