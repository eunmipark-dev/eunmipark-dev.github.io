import * as React from 'react'

import './NParagraph.scss'
import { Linker } from '@components/ui'
import { ARIA_LABEL } from '@src/constants'

import { Caption, RichText, TextBlock, TextItem } from '@appTypes'

interface NParagraphProps {
  paragraph?: TextBlock
  richText?: RichText | Caption
  className?: string
}

export default function NParagraph({
  paragraph,
  richText,
  className,
}: NParagraphProps) {
  let blockTexts = paragraph?.rich_text || richText || []
  if (blockTexts.length === 0) {
    return <br />
  }

  const renderTextString = (text: string) => {
    return text.split('\n').map((line, index, array) => (
      <span key={`paragraph-line-${index}`}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ))
  }

  return (
    blockTexts && (
      <div className="block-paragraph">
        {blockTexts.map((t: TextItem, i: number) => {
          let classNames = ['block-paragraph-text']
          if (className) {
            classNames.push(className)
          }
          if (t?.annotations?.color) {
            classNames.push(t?.annotations?.color)
          }

          if (t?.href) {
            return (
              <Linker
                key={`paragraph-${i}`}
                label={`${t.plain_text} ${ARIA_LABEL.MOVE}`}
                target="_blank"
                url={t.href}
              >
                {t.plain_text}
              </Linker>
            )
          }

          if (t?.annotations?.bold) {
            return (
              <b key={`paragraph-${i}`} className={classNames.join(' ')}>
                {renderTextString(t.plain_text)}
              </b>
            )
          }

          if (t?.annotations?.italic) {
            return (
              <i key={`paragraph-${i}`} className={classNames.join(' ')}>
                {renderTextString(t.plain_text)}
              </i>
            )
          }

          if (t?.annotations?.strikethrough) {
            return (
              <s key={`paragraph-${i}`} className={classNames.join(' ')}>
                {renderTextString(t.plain_text)}
              </s>
            )
          }

          if (t?.annotations?.underline) {
            return (
              <u key={`paragraph-${i}`} className={classNames.join(' ')}>
                {renderTextString(t.plain_text)}
              </u>
            )
          }

          if (t?.annotations?.code) {
            return (
              <code key={`paragraph-${i}`} className={classNames.join(' ')}>
                {renderTextString(t.plain_text)}
              </code>
            )
          }

          return (
            <p key={`paragraph-${i}`} className={classNames.join(' ')}>
              {renderTextString(t.plain_text)}
            </p>
          )
        })}
      </div>
    )
  )
}
