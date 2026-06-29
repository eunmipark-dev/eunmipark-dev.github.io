import React, { useEffect, useState } from 'react'
import { SECTIONS, SectionId } from './nav'
import './shell.scss'

interface NavBarProps {
  active: SectionId
  onSelect: (id: SectionId) => void
}

// Live HH:MM:SS clock for the right-side HUD readout.
const useClock = (): string => {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const pad = (n: number) => String(n).padStart(2, '0')
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

const NavBar: React.FC<NavBarProps> = ({ active, onSelect }) => {
  const clock = useClock()

  return (
    <header className="cy-nav">
      {/* left — identity */}
      <div className="cy-nav__brand">
        <span className="cy-nav__brand-mark" aria-hidden />
        <span className="cy-nav__brand-name">PARK EUNMI</span>
        <span className="cy-nav__brand-sub">VISUALIZATION ENGINEER</span>
      </div>

      {/* center — section menu */}
      <nav className="cy-nav__menu" aria-label="Sections">
        {SECTIONS.map(section => {
          const isActive = section.id === active
          return (
            <button
              key={section.id}
              type="button"
              className={`cy-nav__item ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelect(section.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="cy-nav__item-index">{section.index}</span>
              <span className="cy-nav__item-label">{section.label}</span>
            </button>
          )
        })}
      </nav>

      {/* right — HUD status readout */}
      <div className="cy-nav__hud">
        <span className="cy-nav__hud-dot" aria-hidden />
        <span className="cy-nav__hud-status">SYS ONLINE</span>
        <span className="cy-nav__hud-clock">{clock}</span>
      </div>
    </header>
  )
}

export default NavBar
