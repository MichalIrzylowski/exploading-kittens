import {
  Card,
  cardTypes,
  attackNames,
  exploadingNames,
  catsNames,
  diffuseNames,
  favorNames,
  nopeNames,
  seeTheFutureNames,
  shuffleNames,
  skipNames,
  cardColors,
  cardNames,
} from '@server/classes/card';

export const prepareDeck = () => {
  const names = {
    attack: Object.keys(attackNames),
    exploading: Object.keys(exploadingNames),
    cats: Object.keys(catsNames),
    diffuse: Object.keys(diffuseNames),
    favor: Object.keys(favorNames),
    nope: Object.keys(nopeNames),
    seeTheFuture: Object.keys(seeTheFutureNames),
    shuffle: Object.keys(shuffleNames),
    skip: Object.keys(skipNames),
  };

  const deck: Card[] = [];

  const types = Object.keys(names);

  types.forEach((type) => {
    if (type !== 'cats') {
      names[type as keyof typeof names].forEach((name) => {
        const cardType = cardTypes[type as keyof typeof cardTypes];
        const cardName = name as cardNames;
        const color = cardColors[type as keyof typeof cardColors];

        deck.push(new Card({ type: cardType, name: cardName, color }));
      });
    } else {
    }
  });

  return deck;
};
