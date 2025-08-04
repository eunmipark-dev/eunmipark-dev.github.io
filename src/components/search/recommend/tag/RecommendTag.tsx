import * as React from 'react';

import './RecommendTag.scss';
import { Linker } from '@components/ui';
import { HelpText } from '@components/ui/text';
import { ARIA_LABEL, RECOMMEND_TAGS } from '@src/constants';
import { useShowSearchStore } from '@store/config';

export default function RecommendTag() {
  const { hide: handleHideSearch } = useShowSearchStore();

  return (
    <div className="recommend-post-tag">
      <HelpText text={'이런 건 어때요?'} />
      {RECOMMEND_TAGS.map(tag => (
        <Linker
          key={`recommend-item-${tag.name}`}
          className="item"
          label={`${tag.name} 목록으로 ${ARIA_LABEL.MOVE}`}
          url={tag.url}
          onClick={handleHideSearch}
        >
          #{tag.name}
        </Linker>
      ))}
    </div>
  );
}
