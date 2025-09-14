// src/data/about_data.ts

// 타입 정의
export interface Photo {
  profileImage: string // Gatsby 쿼리에서 가져오므로 실제 경로는 생략 가능
}

export type Skill = string

export interface Company {
  name: string
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
      roles: ['Frontend Development', 'Senior Software Engineer'],
      period: '2023 ~ present',
    },
    {
      name: 'gaia3d',
      roles: ['Frontend Development', 'Senior Software Engineer'],
      period: '2022',
    },
    {
      name: 'cest',
      roles: ['Frontend Development'],
      period: '2020 ~ 2022',
    },
    {
      name: 'SHINSEGAE I&C',
      roles: ['Software Engineer'],
      period: '2017 (9 months)',
    },
  ],
}
