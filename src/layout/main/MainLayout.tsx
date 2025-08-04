import * as React from 'react';

import './MainLayout.scss';
import { GlobalPortal } from '@components/GlobalPortal';
import { SNBOpenIcon } from '@components/float';
import { ImageLayer, PostSearchLayer } from '@components/search';
import { ScrollProgress } from '@components/ui/progress';
import { Footer } from '@module/footer';
import { Header } from '@module/header';
import { SideBarNavigation } from '@module/side';

interface MainLayoutProps {
  children: React.ReactNode;
  className: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <GlobalPortal.Provider>
      <main className={`main-layout ${className}`}>
        <Header />
        <SNBOpenIcon />
        <ScrollProgress />
        <div className="content">{children}</div>
        <Footer />
        <SideBarNavigation />
        <PostSearchLayer />
        <ImageLayer />
      </main>
    </GlobalPortal.Provider>
  );
}
