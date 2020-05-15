import React from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';

import { Header } from './header';
import { Games } from './games';

import css from './main-page.scss';

export const MainPage = () => {
  return (
    <main>
      <LayoutWrapper className={css.main}>
        <Header />
        <Games />
      </LayoutWrapper>
    </main>
  );
};
