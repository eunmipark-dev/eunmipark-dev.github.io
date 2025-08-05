import * as React from 'react'

import './NImage.scss'
//import { useShowImageLayerStore } from '@store/config'

import { NParagraph } from '../paragraph'

import { ImageChildren } from '@appTypes/notion.type'

interface NImageProps {
  imageBlock: ImageChildren
}

export default function NImage({ imageBlock }: NImageProps) {
  const { id, image } = imageBlock
  const url = image
    ? `https://treefeely.notion.site/image/${encodeURIComponent(image.file.url)}?table=block&id=${id}&cache=v2`
    : ``
  const captionText = image?.caption.reduce((acc, item) => {
    return acc + ` ${item.plain_text}`
  }, '')

  //const { show: showImageLayer } = useShowImageLayerStore()

  return (
    <>
      {id && image && (
        <figure className={`block-image`}>
          <img
            alt={captionText}
            sizes="100vw"
            src={`${url}`}
            srcSet={`${url}&width=540 380w,
            ${url}&width=1140 760w,
            ${url}&width=1536 1024w,`}
            onClick={() => {}}
          />
          <figcaption className="caption-box">
            <NParagraph richText={image.caption} />
          </figcaption>
        </figure>
      )}
    </>
  )
}
