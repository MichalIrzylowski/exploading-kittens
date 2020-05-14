import React from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';

export const MainPage = () => {
  return (
    <main>
      <LayoutWrapper>
        <header>
          <h1>Exploading kittens</h1>
          <h2>
            A card game
            <br />
            for people who are into
            <br />
            kittens and explosions
            <br /> and laster beams
            <br /> and sometimes goats
          </h2>
        </header>
      </LayoutWrapper>
    </main>
  );
};
