interface Skill {
  name: string
  level: number
}

export interface Landmark {
  name: string
  lnglat: [number, number] // 위도, 경도는 고정된 두 숫자의 배열(튜플)로 정의
  desc: string
  role: string
  period: string
  tasks?: string[]
  skills?: Skill[] // skills는 있을 수도 있고 없을 수도 있으므로 ? 처리
}

export const landmarkInfos: Landmark[] = [
  {
    name: 'SHINSEGAE I&C',
    lnglat: [127.041619, 37.503216],
    desc: 'Smart City Solution',
    role: 'Junior developer',
    period: '2018',
    tasks: [
      'Scenario Editor Development (ASAM Standards)',
      'High-Definition (HD) Map Visualization & Performance Optimization',
    ],
    skills: [
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 70 },
      { name: 'Three.js', level: 50 },
    ],
  },
  {
    name: 'CEST',
    lnglat: [128.6106, 35.8914],
    desc: 'Embedded Research',
    role: 'Developer',
    period: '2021~2022',
  },
  {
    name: 'MORAI',
    lnglat: [127.0563, 37.5118],
    desc: 'Autonomous Platform',
    role: 'Senior developer',
    period: '2023~current',
  },
]
