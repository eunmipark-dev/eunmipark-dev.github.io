import * as React from 'react';

import './PostsFilter.scss';
import { Divider } from '@components/ui';

import { SeriesFilter } from './series';
import { TagsFilter } from './tags';

export default function PostsFilter() {
  return (
    <div className="post-filter">
      <SeriesFilter />
      <Divider color={'primary'} margin={8} />
      <TagsFilter />
    </div>
  );
}
