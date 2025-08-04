import * as React from 'react';

import { SvgController, SvgControllerProps } from '@components/icon/SvgController';

export default function IconList(props: SvgControllerProps) {
  return (
    <SvgController viewBox="0 0 512 512" {...props}>
      <path
        d="M160 144h288M160 256h288M160 368h288"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
      <circle
        cx="80"
        cy="144"
        r="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <circle
        cx="80"
        cy="256"
        r="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <circle
        cx="80"
        cy="368"
        r="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </SvgController>
  );
}
