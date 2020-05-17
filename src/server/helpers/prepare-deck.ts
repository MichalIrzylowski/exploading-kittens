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

const cardNames = {
  attack: Object.keys(attackNames),
  cats: Object.keys(catsNames),
  diffuse: Object.keys(diffuseNames),
  favor: Object.keys(favorNames),
  nope: Object.keys(nopeNames),
  seeTheFuture: Object.keys(seeTheFutureNames),
  shuffle: Object.keys(shuffleNames),
  skip: Object.keys(skipNames),
  exploading: Object.keys(exploadingNames),
};

export const prepareDeck = () => {
  const deck: Card[] = [];

  const types = Object.keys(cardNames);

  types.forEach((type) => {
    if (type !== 'cats') {
      cardNames[type as keyof typeof cardNames].forEach((name) => {
        const cardType = cardTypes[type as keyof typeof cardTypes];
        const cardName = name as cardNames;
        const color = cardColors[type as keyof typeof cardColors];

        deck.push(new Card({ type: cardType, name: cardName, color }));
      });
    } else {
      for (let i = 0; i < 4; i++) {
        cardNames.cats.forEach((name) => {
          deck.push({
            type: cardTypes.cats,
            name: name as cardNames,
            color: cardColors.cats,
          });
        });
      }
    }
  });

  return deck;
};
