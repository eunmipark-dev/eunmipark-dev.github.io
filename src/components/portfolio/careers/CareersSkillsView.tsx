import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { landmarkInfos } from './map/data'
import SkillRadar from '../skills/SkillRadar'
import './careers.scss'

// Default to the most recent career (last entry in the data).
const DEFAULT_IDX = landmarkInfos.length - 1

const CareersSkillsView: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(DEFAULT_IDX)
  const active = landmarkInfos[activeIdx]

  return (
    <div className="cskl">
      {/* ================= LEFT : career nodes + tasks ================= */}
      <div className="cskl__left">
        {/* depth-1 career list */}
        <div className="cy-card cskl__nodes">
          <div className="cy-card__label">CAREER NODES</div>
          <div className="cskl__node-list">
            {landmarkInfos.map((info, idx) => (
              <button
                key={info.name}
                type="button"
                className={`cskl__node ${activeIdx === idx ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <span className="cskl__node-idx">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="cskl__node-body">
                  <span className="cskl__node-name">{info.name}</span>
                  <span className="cskl__node-meta">
                    {info.desc} · {info.period}
                  </span>
                </span>
                <span className="cskl__node-arrow">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* selected career's task tree */}
        <div className="cy-card cskl__tasks">
          <div className="cy-card__label">
            ASSIGNED OPERATIONS · <span className="hl">{active.name}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              className="cskl__task-scroll"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              {active.tasks?.length ? (
                active.tasks.map((task, i) => (
                  <div className="cskl__task" key={i}>
                    <div className="cskl__task-title">
                      <span className="cskl__task-bullet" />
                      {task.title}
                    </div>
                    {task.subTasks && (
                      <ul className="cskl__sub">
                        {task.subTasks.map((sub, j) => (
                          <li key={j}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p className="cskl__empty">No operation data.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ================= RIGHT : skills radar ================= */}
      <div className="cy-card cskl__skills">
        <div className="cy-card__label">
          TECHNICAL PROFICIENCY · <span className="hl">{active.name}</span>
        </div>
        <div className="cskl__radar-wrap">
          {active.skills?.length ? (
            <SkillRadar skills={active.skills} animationKey={activeIdx} />
          ) : (
            <p className="cskl__empty">No skill data.</p>
          )}
        </div>
        {active.skills?.length ? (
          <ul className="cskl__legend">
            {active.skills.map(s => (
              <li key={s.name}>
                <span className="cskl__legend-name">{s.name}</span>
                <span className="cskl__legend-val">{s.level}%</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default CareersSkillsView
