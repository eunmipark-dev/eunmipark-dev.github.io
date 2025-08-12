import { Link } from 'gatsby'
import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'
import { useLocation } from '@reach/router'

import './Linker.scss'

interface LinkerProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string
  label: string
  target?: '_blank' | '_parent' | '_self' | '_top'
  children?: React.ReactNode
}

export default function Linker({
  url,
  label,
  target,
  children,
  ...rest
}: LinkerProps) {
  const location = useLocation()

  // 현재 URL 경로 (예: /about, /posts)
  const currentPath = location.pathname

  // active 클래스 동적 추가
  const isActive = currentPath == url
  const className = isActive ? 'active-link' : ''

  return url.startsWith('/') ? (
    <Link aria-label={label} to={url} className={className} {...rest}>
      {children}
    </Link>
  ) : (
    <a
      aria-label={label}
      href={url}
      rel="noopener noreferrer"
      target={target}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}
