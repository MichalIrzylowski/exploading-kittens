import { IObject } from '@front/shared/types';

type TTranslations = 'en-US' | 'pl-PL';

export type TranslationToken = { 'en-US': string; 'pl-PL': string };

type TranslationTokens = {
  [key: string]: TranslationToken;
};

export const translate = (translationTokens: TranslationTokens) => {
  const translations: IObject<string> = {};

  const { language } = navigator;

  Object.keys(translationTokens).forEach((token) => {
    translations[token] = translationTokens[token][language as TTranslations];
  });

  return translations;
};
