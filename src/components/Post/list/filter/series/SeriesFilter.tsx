import React from 'react'

import { Series } from '@components/post'
import './SeriesFilter.scss'
import { useNotion } from '@hooks/useNotion'

export default function SeriesFilter() {
  const { everyPostsSeries } = useNotion()
  return (
    !!everyPostsSeries?.length && (
      <div className="series-filter">
        <p className="title">SERIES</p>
        <div className="series-filter__items">
          {everyPostsSeries.map(series => (
            <Series key={series} name={series} useLink />
          ))}
        </div>
      </div>
    )
  )
}
