import * as React from 'react';

import { SvgController, SvgControllerProps } from '@components/icon/SvgController';

export default function IconCaution(props: SvgControllerProps) {
  return (
    <SvgController {...props}>
      <defs>
        <mask id="ipSCaution0">
          <g fill="none" strokeWidth="4">
            <path
              clipRule="evenodd"
              d="M24 5L2 43h44L24 5Z"
              fill={props.color}
              fillRule="evenodd"
              stroke={props.color}
              strokeLinejoin="round"
            />
            <path d="M24 35v1m0-17l.008 10" stroke="#000" strokeLinecap="round" />
          </g>
        </mask>
      </defs>
      <path d="M0 0h48v48H0z" fill="currentColor" mask="url(#ipSCaution0)" />
    </SvgController>
  );
}
