import React from 'react';

import './TagsFilter.scss';
import { Tag } from '@components/post/tags';
import { useWeezipNotion } from '@hooks/useWeezipNotion';

export default function TagsFilter() {
  const { everyPostsTags } = useWeezipNotion();
  return (
    !!everyPostsTags?.length && (
      <div className="tag-filter">
        <p className="title">태그</p>
        <div className="tag-filter__items">
          {everyPostsTags.map(name => (
            <Tag key={name} name={name} useLink />
          ))}
        </div>
      </div>
    )
  );
}
