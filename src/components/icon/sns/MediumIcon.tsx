// src/components/icons/MediumIcon.tsx (새 파일: 미디엄 아이콘 SVG 컴포넌트)
import React from 'react'

interface MediumIconProps {
  color: string // 색상 prop으로 전달 (호버 시 변경)
  size?: number // 크기 (기본 24px)
}

const MediumIcon: React.FC<MediumIconProps> = ({ color, size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 2h20v20H2z" />
      <path d="M4 4h16v16H4z" />{' '}
      {/* 미디엄 로고 간단 SVG (실제 아이콘으로 교체 가능) */}
      {/* 실제 미디엄 로고 SVG path를 여기에 넣으세요. 예시로 간단히 */}
    </svg>
  )
}

export default MediumIcon
