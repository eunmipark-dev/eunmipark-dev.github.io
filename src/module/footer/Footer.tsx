import * as React from 'react'

import './Footer.scss'
import { IconGithub, IconKakao, IconMail } from '@components/icon'
import { CircleIconWrapper } from '@components/icon/wrapper'
import { Linker } from '@components/ui'
//import { useVisitor } from '@hooks/useVisitor'
import { ARIA_LABEL, OWNER_EMAIL } from '@src/constants'
import { formatWithComma } from '@utils/format.util'

export default function Footer() {
  //const { allVisitors, todayVisitors } = useVisitor()

  return (
    <footer>
      <div className="container">
        <div className="contact-box">
          <h2>Wanna get in touch?</h2>
          <div className="contact-item">
            <CircleIconWrapper color="reverse-mono">
              <Linker
                label={`${OWNER_EMAIL} 메일 ${ARIA_LABEL.SEND}`}
                url={`mailto:${OWNER_EMAIL}`}
              >
                <IconMail color="reverse-mono" />
              </Linker>
            </CircleIconWrapper>
            <CircleIconWrapper color="reverse-mono">
              <Linker
                label={`오픈 카카오톡 ${ARIA_LABEL.OPEN}`}
                target="_blank"
                url={`https://open.kakao.com/me/treefeely`}
              >
                <IconKakao color="reverse-mono" />
              </Linker>
            </CircleIconWrapper>
            <CircleIconWrapper color="reverse-mono">
              <Linker
                label={`Github ${ARIA_LABEL.OPEN}`}
                target="_blank"
                url={`https://github.com/dearlsh94`}
              >
                <IconGithub color="reverse-mono" />
              </Linker>
            </CircleIconWrapper>
          </div>
        </div>
        {/* {allVisitors !== null && todayVisitors !== null && (
          <div className="visit-box">
            <p>
              Today : {formatWithComma(todayVisitors)} / Total :{' '}
              {formatWithComma(allVisitors)}
            </p>
          </div>
        )} */}
        <div className="refer-box">
          <span>All Icons by</span>
          <Linker
            label={`iconiFy 웹 사이트로 ${ARIA_LABEL.MOVE}`}
            target={'_blank'}
            url={`https://icon-sets.iconify.design/`}
          >
            iconiFy
          </Linker>
        </div>
        <div className="copyright-box">
          <p>Copyright 2023. Ethan.lee all rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
