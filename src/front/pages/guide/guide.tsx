import React from 'react';

import { LayoutWrapper } from '@front/components/layout-wrapper';

import { translate } from '@front/utils/translate';

import * as localizations from './resources/localizations';

export const Guide: React.FC = () => {
  const translations = translate(localizations);
  return (
    <main>
      <LayoutWrapper>
        <h1>{translations.heading}</h1>
        <h2>{translations.howItWorks}</h2>
        <p>{translations.howItWorksText}</p>
        <p>{translations.whenThatHappens}</p>
        <p>{translations.process}</p>
        <p>{translations.drawCards}</p>
      </LayoutWrapper>
    </main>
  );
};
