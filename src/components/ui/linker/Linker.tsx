import { Link } from 'gatsby';

import * as React from 'react';
import { AnchorHTMLAttributes } from 'react';

interface LinkerProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  label: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  children?: React.ReactNode;
}

export default function Linker({ url, label, target, children, ...rest }: LinkerProps) {
  return url.startsWith('/') ? (
    <Link aria-label={label} to={url} {...rest}>
      {children}
    </Link>
  ) : (
    <a aria-label={label} href={url} rel="noopener noreferrer" target={target} {...rest}>
      {children}
    </a>
  );
}
