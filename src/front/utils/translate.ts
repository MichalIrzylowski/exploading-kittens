import { IObject } from '@front/shared/types';

type TTranslations = 'en-US' | 'pl-PL';

export type TranslationToken = { 'en-US': string; 'pl-PL': string };

type TranslationTokens = {
  [key: string]: TranslationToken;
};

type Translations<T> = {
  [key in keyof T]: string;
};

export const translate = (translationTokens: TranslationTokens): Translations<TranslationTokens> => {
  const translations: IObject<string> = {};

  let { language } = navigator;
  if (language !== 'pl-PL') language = 'en-US';

  Object.keys(translationTokens).forEach((token) => {
    translations[token] = translationTokens[token][language as TTranslations];
  });

  return translations;
};
