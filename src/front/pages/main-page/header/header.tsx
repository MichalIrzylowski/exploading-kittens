import React from 'react';

import { translate } from '@front/utils/translate';
import * as localizations from './resources/localizations';

export const Header = () => {
  const translations = translate(localizations);

  return (
    <header>
      <h1>{translations.explodingKittens}</h1>
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
  );
};
