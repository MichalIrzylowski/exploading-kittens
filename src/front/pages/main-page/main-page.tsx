import React from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';
import { Paper } from '@front/components/paper';

import { translate } from '@front/utils/translate';

import * as localizations from './resources/localizations';

export const MainPage = () => {
  const translations = translate(localizations);
  return (
    <main>
      <LayoutWrapper>
        <header>
          <h1>{translations.exploadingKittens}</h1>
          <h2>
            {translations.cardGame}
            <br />
            {translations.forPeople}
            <br />
            {translations.catsAndExplosions}
            <br /> {translations.laserBeams}
            <br /> {translations.goats}
          </h2>
        </header>
        <Paper>Paper here</Paper>
      </LayoutWrapper>
    </main>
  );
};
