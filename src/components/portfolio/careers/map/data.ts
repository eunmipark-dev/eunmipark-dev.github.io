export interface TaskNode {
  title: string
  subTasks?: string[]
}

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
  tasks?: TaskNode[]
  skills?: Skill[] // skills는 있을 수도 있고 없을 수도 있으므로 ? 처리
}

export const landmarkInfos: Landmark[] = [
  {
    name: 'SHINSEGAE I&C',
    lnglat: [127.041619, 37.503216],
    desc: 'Smart City Solution',
    role: '담당',
    period: '2018',
    tasks: [
      {
        title: 'Managed Starfield mobile application development & maintenance',
      },
    ],
    skills: [
      { name: 'Project Mgmt', level: 90 },
      { name: 'MySQL', level: 20 },
    ],
  },
  {
    name: 'CEST',
    lnglat: [128.6106, 35.8914],
    desc: 'Embedded Research',
    role: '연구원',
    tasks: [
      {
        title:
          'Full-stack Development of 2022 Undergraduate Autonomous Driving Competition',
        subTasks: [
          'Implemented JWT-based user authentication and Bcrypt-encrypted security systems',
          'Developed multi-role dashboards for administrators, operators, judges, and real-time competition broadcasting',
        ],
      },
      {
        title: 'Lane Groups Update Control & Generation System',
        subTasks: [
          'Built a map-based simulation platform for real-time vehicle monitoring, V2X visualization, and synchronized live lane group updates',
          'Developed automated algorithms for lane group generation and interactive editing tools based on road data',
        ],
      },
      {
        title: 'Intelligent V2X Infrastructure & Control System Development',
        subTasks: [
          'Developed real-time analysis and visualization features for multi-protocol V2X messages',
        ],
      },
      {
        title: 'Standard-based (SAE J2735) MAP Message Automation System',
        subTasks: [
          'Developed a patented algorithm for automated intersection connectivity extraction using HD map data (Patent: 2021)',
        ],
      },
    ],
    period: '2021~2022',
    skills: [
      { name: 'JS', level: 70 },
      { name: 'PostgreSQL', level: 20 },
      { name: 'NODE/Express', level: 30 },
      { name: 'OpenLayers', level: 70 },
      { name: 'Mapbox', level: 80 },
    ],
  },
  {
    name: 'MORAI',
    lnglat: [127.0563, 37.5118],
    desc: 'Autonomous Platform',
    role: '선임연구원',
    period: '2023~current',
    tasks: [
      {
        title: 'Scenario Editor Development (ASAM Standards)',
        subTasks: [
          'High-Definition (HD) Map Visualization & Performance Optimization',
          'Implementation of editor framework and feature development',
        ],
      },
      {
        title:
          'Open-source based customized labeling front-end software development tailored to SAIT (Samsung) requirements',
      },
    ],
    skills: [
      { name: 'TS', level: 80 },
      { name: 'Vue', level: 60 },
      { name: 'React', level: 30 },
      { name: 'Three', level: 90 },
    ],
  },
]
