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
    id: 9,
    title: 'CROMS Monitoring & Analytics Enhancement',
    description:
      'Enhancement of CROMS, a heterogeneous robot fleet control platform: a new Three.js-based 3D visualization mode, folder/tree task management UI, and Konva-based heatmap statistics.',
    imageFileName: '',
    tech: ['Vue', 'Konva', 'Three'],
    date: '2026.04 ~ Present',
    organization: 'CLOBOT',
  },
  {
    id: 1,
    title: 'Local Shuttle Bus Tracking',
    description:
      'A service that shows the real-time location of the Geumcheon 01 village bus on a list and map, color-coding routes (red/blue) so residents no longer wait without accurate arrival info.',
    imageFileName: 'project_01.png', // GIF 예시
    tech: ['Mapbox', 'Vue', 'Three'],
    date: '2025.01 ~ 2025.02',
    link: 'https://bus-01.netlify.app/',
    organization: '',
  },
  {
    id: 2,
    title: 'Scenario Editor',
    description:
      'An ASAM OpenSCENARIO-standard editing tool serving HD maps on the web, with a manager-based architecture, optimized 3D rendering, and virtualized list editing.',
    imageFileName: 'project_02.png', // GIF 예시 (기존 PNG/JPG 대신 GIF로 변경 가능)
    tech: ['React', 'Three'],
    date: '2023.12 ~ 2024.12',
    //link: '#',
    organization: 'MORAI',
  },
  {
    id: 3,
    title: 'Open-source-based labeling front-end SW',
    description:
      'A custom labeling front-end tailored to SAIT (Samsung) requirements: improved dataset interface, faster data queries, and segmentation data loading/editing.',
    imageFileName: '',
    tech: ['Vue', 'Three'],
    date: '2023.05 ~ 2023.11',
    organization: 'MORAI',
  },
  {
    id: 10,
    title: 'Multi-dimensional Disaster Risk Map Visualization',
    description:
      'A multi-dimensional geospatial platform for disaster risk analysis: real-time risk data collection, GeoTIFF risk-grade pre-processing, and 2D/3D visualization (OpenLayers, CesiumJS).',
    imageFileName: '',
    tech: ['Vue', 'OpenLayers', 'CesiumJS', 'Spring', 'PostgreSQL'],
    date: '2022.07 ~ 2022.12',
    organization: 'Gaia3D',
  },
  {
    id: 4,
    title: '2022 University Student Autonomous Driving Contest',
    description:
      'Communication technology and operation programs for the 2022 autonomous driving contest, including admin/operator/judge dashboards and a real-time competition broadcasting view.',
    imageFileName: 'project_04.png',
    tech: ['Node', 'Vue', 'Mapbox', 'PostgreSQL'],
    date: '2022.01 ~ 2022.06',
    organization: 'CEST',
  },
  {
    id: 5,
    title:
      'Development of a tool for automatic lane-block generation and editing',
    description:
      'Real-time partial download and application of HD maps for autonomous vehicles (LDM Level 1), with automatic lane-block generation algorithms and a web-based editing tool.',
    imageFileName: 'project_05.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'Mapbox', 'PostgreSQL'],
    date: '2021.08 ~ 2021.12',
    organization: 'CEST',
  },
  {
    id: 6,
    title: 'HD map update service for autonomous driving',
    description:
      'A lane-block simulation web that visualizes create/update/delete of HD-map segments with animation and provides vehicle-position-based lane-block details from real-time PVD messages.',
    imageFileName: 'project_06_2.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'Mapbox', 'PostgreSQL'],
    date: '2021.08 ~ 2021.12',
    organization: 'CEST',
  },
  {
    id: 7,
    title: 'An empirical study on the autonomous public transportation system',
    description:
      'An intelligent infrastructure-linked autonomous driving control system: real-time multi-protocol V2X message analysis with 2D server monitoring and 3D HD-map-based vehicle HMI.',
    imageFileName: 'project_07_public_transportation.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'Mapbox', 'PostgreSQL'],
    date: '2020.06 ~ 2021.12',
    organization: 'CEST',
  },
  {
    id: 8,
    title: 'Automatic generation of MAP messages using HD map',
    description:
      'Automatic generation and editing of SAE J2735 MAP messages from HD maps: intersection data management, automated lane connectivity generation, and standard-based message export.',
    imageFileName: 'project_08_MAP.gif',
    tech: ['Node', 'Vue', 'OpenLayers', 'PostgreSQL'],
    date: '2020.02 ~ 2021.03',
    organization: 'CEST',
  },
]
