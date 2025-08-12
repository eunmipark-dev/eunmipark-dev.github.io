// src/data/about_data.ts

// 타입 정의
export interface Photo {
  profileImage: string // Gatsby 쿼리에서 가져오므로 실제 경로는 생략 가능
}

export type Skill = string

export interface Company {
  name: string
  description: string
  roles: string[]
  period: string
}

export interface Project {
  title: string
  company: string
  period: string
  roles: string[]
  tech: string
  etc: string[]
}

export interface Award {
  title: string
  year: string
}

export interface Patent {
  title: string
  year: string
}

export interface Paper {
  title: string
  period: string
  purpose: string
  tech: string
  contents: string[]
  etc: string[]
}

export interface AboutData {
  photos: Photo
  skills: Skill[]
  companies: Company[]
  projects: Project[]
  awards: Award[]
  patents: Patent[]
  papers: Paper[]
}

// 데이터 정의
export const aboutData: AboutData = {
  photos: {
    profileImage: 'path/to/profile.jpg', // 또는 gatsby 쿼리에서 가져오므로 필요 시 생략
  },
  skills: [
    'TypeScript',
    'Vue',
    'Mapbox',
    'Three',
    'PostgreSql',
    'Vite',
    'Node',
    'OpenLayers',
    'React',
    'Next',
  ],
  companies: [
    {
      name: 'MORAI',
      description: 'Simulation Platform for Autonomous Vehicle',
      roles: ['Frontend Development', 'Senior Software Engineer'],
      period: '2023 ~ present',
    },
    {
      name: 'gaia3d',
      description: 'Geospatial technology company',
      roles: ['Frontend Development', 'Senior Software Engineer'],
      period: '2022',
    },
    {
      name: 'cest',
      description: 'Autonomous driving research company',
      roles: ['Frontend Development'],
      period: '2020 ~ 2022',
    },
    {
      name: 'SHINSEGAE I&C',
      description: 'Software engineering company',
      roles: ['Software Engineer'],
      period: '2017 (9 months)',
    },
  ],
  projects: [
    {
      title: 'Development of a scenario editor',
      company: 'MORAI',
      period: '2023.09 ~ present',
      roles: [
        'Developed an autonomous driving scenario editor based on the ASAM standard',
        'Built functionality to provide MGeo (MORAI Geometry), MORAI’s proprietary high-definition map, via a web-based platform',
      ],
      tech: 'FE(VUE → React)',
      etc: [],
    },
    {
      title:
        'Development of Custom Labeling Front-end Software Based on Open Source',
      company: 'MORAI',
      period: '2023.05 ~ 2023.11',
      roles: [
        'Providing SAIT-customized features based on open source',
        'UI/usability enhancement, development of customized features, modification of existing features',
      ],
      tech: 'Full Stack(VUE + Spring)',
      etc: [`Dispatched to Samsung Electronics (SI)`],
    },
    {
      title:
        'Development of multi-dimensional visualization technology for disaster risk maps to support disaster situation management',
      company: 'gaia3d',
      period: '2022.07 ~ 2022.12',
      roles: [
        '사용자 인증 기능/관리자 페이지 개발 (Spring Security + JWT)',
        '실시간 재난위험정보 데이터 수집 및 가시화',
        '재난위험분석 모델(python)로부터 추출된 재난위험등급(tif 이미지) 전처리 및 DB 적재, 맵 표출',
      ],
      tech: 'BE(Spring) / FE(VUE, OpenLayers, Cesium) / DB(PostgreSql) / GeoServer',
      etc: [],
    },
    {
      title: '2022 대학생 자율주행 경진대회 예선전',
      company: 'cest',
      period: '2022.01 ~ 2022.06',
      roles: [
        '경진대회 웹 개발(로그인 페이지, 관리자 페이지, 운영자 페이지, 심판 페이지, 대회 중계 페이지)',
      ],
      tech: 'BE(Node) / FE(VUE, Mapbox) / DB(PostgreSql)',
      etc: [],
    },
    {
      title: '자율주행을 위한 정밀지도(HD MAP) 업데이트 서비스',
      company: 'cest',
      period: '2021.08 ~ 2021.12',
      roles: [
        '레인블록 자동 생성 및 편집 웹 개발',
        '레인블록 시뮬레이션 웹 개발',
      ],
      tech: 'BE(Node) / FE(VUE, Mapbox) / DB(PostgreSql)',
      etc: ['자율협력주행 기술서비스 공모전 최우수상 수상'],
    },
    {
      title: '자율주행기반 대중교통시스템 실증 연구',
      company: 'cest',
      period: '2020.06 ~ 2021.12',
      roles: ['V2X 서버관제 웹 개발', '차량 HMI 정밀지도기반 표출 웹 개발'],
      tech: 'BE(Node) / FE(VUE, Mapbox, OpenLayers) / DB(PostgreSql)',
      etc: [],
    },
    {
      title: '정밀도로지도 기반 MAP 메시지 자동 생성 프로그램 개발',
      company: 'cest',
      period: '2020.02 ~ 2021.03',
      roles: ['MAP 메시지 자동 생성 프로그램 개발'],
      tech: 'BE(Node) / FE(VUE, Mapbox, OpenLayers) / DB(PostgreSql)',
      etc: [
        'C# → 웹 (환경이전/리팩토링)',
        '전자지도를 이용한 교차로 차로정보 생성방법 특허 출원 완료 (2021)',
      ],
    },
  ],
  awards: [
    {
      title: 'Excellent Paper Award (2019 ICCT)',
      year: '2019',
    },
    {
      title: '한국방송미디어공학회 학부생 논문 최우수상',
      year: '2018',
    },
    {
      title: '청소년활동정보제공 모바일 앱 개발 공모전 대상',
      year: '2016',
    },
    {
      title: '2015 공공데이터 활용 아이디어 공모전 우수상',
      year: '2015',
    },
    {
      title: '경상북도 공공데이터 앱 공모전 우수상',
      year: '2015',
    },
  ],
  patents: [
    {
      title: '전자지도를 이용한 교차로 차로정보 생성방법',
      year: '2021',
    },
  ],
  papers: [
    {
      title: 'Sample Paper Title 1',
      period: '2019',
      purpose: 'Research on autonomous driving visualization',
      tech: 'Python, OpenLayers',
      contents: [
        'Developed visualization algorithms',
        'Published in ICCT conference',
      ],
      etc: ['Received Excellent Paper Award'],
    },
    {
      title: 'Sample Paper Title 2',
      period: '2018',
      purpose: 'Media broadcasting technology',
      tech: 'Node, Vue',
      contents: [
        'Proposed new broadcasting framework',
        'Presented at 한국방송미디어공학회',
      ],
      etc: ['Received 최우수상'],
    },
  ],
}
