import React from 'react';

import { Series } from '@components/post';
import './SeriesFilter.scss';
import { useWeezipNotion } from '@hooks/useWeezipNotion';

export default function SeriesFilter() {
  const { everyPostsSeries } = useWeezipNotion();
  return (
    !!everyPostsSeries?.length && (
      <div className="series-filter">
        <p className="title">시리즈</p>
        <div className="series-filter__items">
          {everyPostsSeries.map(series => (
            <Series key={series} name={series} useLink />
          ))}
        </div>
      </div>
    )
  );
}
