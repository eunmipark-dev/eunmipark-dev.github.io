import * as React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import './NCode.scss'

import { IconCopyLink } from '@components/icon'
import { NParagraph } from '@components/notion'
import useClipboard from '@hooks/useClipboard'
import { ARIA_LABEL } from '@src/constants'
import { getPlainTextByRichText } from '@utils/notion'

import { Code } from '@appTypes'

interface NCodeProps {
  code: Code
}

export default function NCode({ code }: NCodeProps) {
  const codeString = getPlainTextByRichText(code.rich_text)
  const { copyToClipboard } = useClipboard()
  const handleCodeCopy = async () => {
    await copyToClipboard(codeString)
    alert('해당 코드가 복사되었습니다.')
  }

  return (
    <figure
      className={`block-code ${code.caption && 'caption'} ${code.language && 'language'}`}
    >
      <div className="code-header">
        <small className="language">{code.language}</small>
        <IconCopyLink
          aria-label={`현재 코드 블럭 ${ARIA_LABEL.COPY}`}
          color={'base'}
          size={20}
          onClick={handleCodeCopy}
        />
      </div>
      <SyntaxHighlighter
        language={code.language}
        style={vscDarkPlus}
        showLineNumbers
      >
        {codeString}
      </SyntaxHighlighter>
      {!!code.caption.length && (
        <figcaption className="caption">
          <NParagraph richText={code.caption} />
        </figcaption>
      )}
    </figure>
  )
}
