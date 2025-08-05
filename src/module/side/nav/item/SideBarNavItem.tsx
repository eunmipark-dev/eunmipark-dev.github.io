import React from 'react';

import { IconOutLink } from '@components/icon';
import './SideBarNavItem.scss';
import { Linker } from '@components/ui';
import { ARIA_LABEL } from '@src/constants';

interface SideBarNavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  url: string;
  title: string;
  isOutLink?: boolean;
  Icon?: React.ElementType;
}

export default function SideBarNavItem({ url, title, isOutLink, Icon, ...props }: SideBarNavItemProps) {
  return (
    <li className="side-bar-nav-item" {...props}>
      <Linker label={`${title} ${ARIA_LABEL.MOVE}`} target={isOutLink ? '_blank' : '_parent'} url={url}>
        <div className="title-box">
          {Icon && <Icon />}
          {isOutLink && <IconOutLink />}
          <span>{title}</span>
        </div>
      </Linker>
    </li>
  );
}
