import React from 'react';

import './Caution.scss';
import { IconCaution } from '@components/icon';

interface CautionProps extends React.PropsWithChildren {}

export default function Caution({ children, ...rest }: CautionProps) {
  return (
    <aside className="caution" {...rest}>
      <IconCaution color={'white'} viewBox="0 0 64 64" />
      <p>{children}</p>
    </aside>
  );
}
