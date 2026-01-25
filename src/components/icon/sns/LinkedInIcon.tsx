// src/components/icons/LinkedInIcon.tsx (새 파일: 링크드인 아이콘 SVG 컴포넌트)
import React from 'react'

interface LinkedInIconProps {
  size?: number // 크기 (기본 24px)
}

const LinkedInIcon: React.FC<LinkedInIconProps> = ({ size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor" // currentColor로 hover 상속
    >
      <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zm-3 19h-3v-7.5c0-1.656-1.344-3-3-3s-3 1.344-3 3V19H8V10h3v1.5c.828-1.137 2.172-1.5 3.5-1.5 2.484 0 4.5 2.016 4.5 4.5V19zM7 8.5A1.5 1.5 0 115.5 7 1.5 1.5 0 017 8.5z" />
    </svg>
  )
}

export default LinkedInIcon
