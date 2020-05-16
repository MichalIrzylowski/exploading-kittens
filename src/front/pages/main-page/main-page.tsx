import React from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';

import { Header } from './header';
import { Games } from './games';
import { Menu } from './menu';

import css from './main-page.scss';

export const MainPage: React.FC = () => {
  return (
    <main>
      <LayoutWrapper className={css.main}>
        <Header />
        <Games />
        <Menu />
      </LayoutWrapper>
    </main>
  );
};
