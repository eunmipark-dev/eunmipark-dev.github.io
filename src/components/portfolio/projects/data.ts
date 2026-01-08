export type Project = {
  id: number
  title: string
  description: string
  imageFileName: string // '' 허용
  tech: string[]
  date: string // 'YYYY.MM ~ YYYY.MM' 형태
  link?: string // 일부 프로젝트에 없음
  organization?: string // '' 또는 미기입 가능
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Local Shuttle Bus Tracking',
    description: 'blabla',
    imageFileName: 'project_01.png', // GIF 예시
    tech: ['Mapbox', 'Vue', 'Three'],
    date: '2025.01 ~ 2025.02',
    link: '#',
    organization: '',
  },
  {
    id: 2,
    title: 'Scenario Editor',
    description: 'Desktop app for editing scenario data...',
    imageFileName: 'project_02.png', // GIF 예시 (기존 PNG/JPG 대신 GIF로 변경 가능)
    tech: ['React', 'Three'],
    date: '2023.12 ~ 2024.12',
    link: '#',
    organization: 'MORAI',
  },
  {
    id: 3,
    title: 'Open-source-based labeling front-end SW',
    description: '',
    imageFileName: '',
    tech: ['Vue', 'Three'],
    date: '2023.05 ~ 2023.11',
    link: '#',
    organization: 'MORAI',
  },
  {
    id: 4,
    title: '2022 University Student Autonomous Driving Contest',
    description: '',
    imageFileName: 'project_04.png',
    tech: ['Node', 'Vue', 'Mapbox', 'PostreSql'],
    date: '2022.01 ~ 2022.06',
    link: '#',
    organization: 'CEST',
  },
  {
    id: 5,
    title:
      'Development of a tool for automatic lane-block generation and editing',
    description: '',
    imageFileName: 'project_05.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'Mapbox', 'PostreSql'],
    date: '2021.08 ~ 2021.12',
    organization: 'CEST',
  },
  {
    id: 6,
    title: 'HD map update service for autonomous driving',
    description: '',
    imageFileName: 'project_06_2.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'Mapbox', 'PostreSql'],
    date: '2021.08 ~ 2021.12',
    organization: 'CEST',
  },
  {
    id: 7,
    title: 'An empirical study on the autonomous public transportation system',
    description: '',
    imageFileName: 'project_07_public_transportation.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'Mapbox', 'PostreSql'],
    date: '2020.06 ~ 2021.12',
    organization: 'CEST',
  },
  {
    id: 8,
    title: 'Automatic generation of MAP messages using HD map',
    description: '',
    imageFileName: 'project_08_MAP.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'PostreSql'],
    date: '2020.02 ~ 2021.03',
    organization: 'CEST',
  },
]
