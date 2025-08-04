import * as React from 'react';

import './ImageLayer.scss';
import { GlobalPortal } from '@components/GlobalPortal';
import { NParagraph } from '@components/notion';
import { DimLayout } from '@layout/dim';
import { useShowImageLayerStore } from '@store/config';

export default function ImageLayer() {
  const { isVisibility, imageBlock, hide: handleHideImageLayer } = useShowImageLayerStore();

  let url = '',
    captionText = '';
  if (imageBlock) {
    const { id, image } = imageBlock;

    url = imageBlock.image
      ? `https://treefeely.notion.site/image/${encodeURIComponent(image.file.url)}?table=block&id=${id}&cache=v2`
      : ``;
    captionText = image?.caption.reduce((acc, item) => {
      return acc + ` ${item.plain_text}`;
    }, '');
  }

  return (
    isVisibility &&
    imageBlock && (
      <GlobalPortal.Consumer>
        <DimLayout handleClose={handleHideImageLayer}>
          <figure className={`block-full-image`} onClick={handleHideImageLayer}>
            <figcaption className="caption-box">
              <NParagraph richText={imageBlock.image.caption} />
            </figcaption>
            <img
              alt={captionText}
              sizes="100vw"
              src={`${url}`}
              srcSet={`${url}&width=540 380w,
            ${url}&width=1140 760w,
            ${url}&width=1536 1024w,`}
            />
          </figure>
        </DimLayout>
      </GlobalPortal.Consumer>
    )
  );
}
