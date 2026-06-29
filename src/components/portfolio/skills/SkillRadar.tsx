import React from 'react'
import { motion } from 'framer-motion'

export interface RadarSkill {
  name: string
  level: number // 0 - 100
}

interface SkillRadarProps {
  skills: RadarSkill[]
  /** changes whenever the selected career changes, to retrigger animation */
  animationKey: React.Key
}

const SIZE = 320
const C = SIZE / 2
const R = 118
const RINGS = [0.25, 0.5, 0.75, 1]

const angleFor = (i: number, n: number) => (Math.PI * 2 * i) / n - Math.PI / 2

const pointAt = (i: number, n: number, radius: number): [number, number] => [
  C + Math.cos(angleFor(i, n)) * radius,
  C + Math.sin(angleFor(i, n)) * radius,
]

const toPolygon = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

/**
 * Futuristic SVG radar (spider) chart. Falls back to animated bars when there
 * are fewer than three axes (a radar needs ≥3 to form a polygon).
 */
const SkillRadar: React.FC<SkillRadarProps> = ({ skills, animationKey }) => {
  const n = skills.length

  if (n < 3) {
    return (
      <div className="skill-bars" key={animationKey}>
        {skills.map((s, i) => (
          <div className="skill-bar" key={s.name}>
            <div className="skill-bar__head">
              <span className="skill-bar__name">{s.name}</span>
              <span className="skill-bar__pct">{s.level}%</span>
            </div>
            <div className="skill-bar__track">
              <motion.div
                className="skill-bar__fill"
                initial={{ width: 0 }}
                animate={{ width: `${s.level}%` }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const dataPts = skills.map((s, i) => pointAt(i, n, (R * s.level) / 100))

  return (
    <svg
      className="skill-radar"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Technical proficiency radar"
    >
      <defs>
        <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(25,227,255,0.45)" />
          <stop offset="100%" stopColor="rgba(25,227,255,0.05)" />
        </radialGradient>
      </defs>

      {/* concentric grid rings */}
      {RINGS.map(ring => (
        <polygon
          key={ring}
          className="skill-radar__ring"
          points={toPolygon(skills.map((_, i) => pointAt(i, n, R * ring)))}
        />
      ))}

      {/* axes + outer labels */}
      {skills.map((s, i) => {
        const [ax, ay] = pointAt(i, n, R)
        const [lx, ly] = pointAt(i, n, R + 22)
        const anchor =
          Math.abs(lx - C) < 8 ? 'middle' : lx > C ? 'start' : 'end'
        return (
          <g key={s.name}>
            <line
              className="skill-radar__axis"
              x1={C}
              y1={C}
              x2={ax}
              y2={ay}
            />
            <text
              className="skill-radar__label"
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              {s.name}
            </text>
          </g>
        )
      })}

      {/* animated data polygon */}
      <motion.g
        key={animationKey}
        style={{ transformOrigin: `${C}px ${C}px` }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <polygon
          className="skill-radar__data"
          points={toPolygon(dataPts)}
          fill="url(#radar-fill)"
        />
        {dataPts.map(([x, y], i) => (
          <circle
            key={skills[i].name}
            className="skill-radar__node"
            cx={x}
            cy={y}
            r={3.5}
          />
        ))}
      </motion.g>
    </svg>
  )
}

export default SkillRadar
