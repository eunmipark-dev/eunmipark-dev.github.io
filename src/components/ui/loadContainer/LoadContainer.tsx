import * as React from 'react';

import './LoadContainer.scss';
import { CircleProgress } from '../progress/circle';

interface LoadContainerProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
}

export default function LoadContainer({ children, isLoading, isError }: LoadContainerProps) {
  return (
    <section className="load-section">
      {isLoading ? <CircleProgress className="spinner" height={360} /> : isError ? <div>Error</div> : children}
    </section>
  );
}
