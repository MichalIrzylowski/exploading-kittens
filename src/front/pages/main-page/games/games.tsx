import React from 'react';

import { translate } from '@front/utils/translate';

import { BrowserPaper } from '@front/components/browser-paper';

import * as localizations from './resources/localizations';

export const Games = () => {
  const translations = translate(localizations);
  return (
    <div>
      <h3>{translations.currentGames}</h3>
      <BrowserPaper addressHref="https://explodingkittens.com/">
        Games
      </BrowserPaper>
    </div>
  );
};
