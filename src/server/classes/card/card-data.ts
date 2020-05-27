export enum cardTypes {
  attack = 'attack',
  cats = 'cats',
  diffuse = 'diffuse',
  exploading = 'exploding',
  favor = 'favor',
  nope = 'nope',
  seeTheFuture = 'seeTheFuture',
  shuffle = 'shuffle',
  skip = 'skip',
}

export enum attackNames {
  backHair = 'backHair',
  bearODactyl = 'bearODactyl',
  catterwocky = 'catterwocky',
  crabAPult = 'crabAPult',
}

export enum catsNames {
  bearded = 'bearded',
  catermelon = 'catermelon',
  hairyPotato = 'hairyPotato',
  rainbowRalphing = 'rainbowRalphing',
  tacocat = 'tacocat',
}

export enum diffuseNames {
  laserPointer = 'laserPointer',
  therapy = 'therapy',
  bellyRub = 'bellyRub',
  catnipSandwich = 'catnipSandwich',
  yoga = 'yoga',
  flatulence3am = 'flatulence3am',
}

export enum exploadingNames {
  earth = 'earth',
  ship = 'ship',
  boat = 'boat',
  house = 'house',
}

export enum favorNames {
  backHairShampoo = 'backHairShampoo',
  beardSailing = 'beardSailing',
  partySquirrels = 'partySquirrels',
  peanutButterBellyButton = 'peanutButterBellyButton',
}

export enum nopeNames {
  jackanope = 'jackanope',
  ninja = 'ninja',
  nopebell = 'nopebell',
  nopestradamus = 'nopestradamus',
  sandwich = 'sandwich',
}

export enum seeTheFutureNames {
  allSeeingGoat = 'allSeeingGoat',
  mantisShrimp = 'mantisShrimp',
  pigACorn = 'pigACorn',
  specialOpsBunnies = 'specialOpsBunnies',
  unicornEnchilada = 'unicornEnchilada',
}

export enum shuffleNames {
  abracrab = 'abracrab',
  batFarts = 'batFarts',
  pomeranianStorm = 'pomeranianStorm',
  transdimensionalLitterBox = 'transdimensionalLitterBox',
}

export enum skipNames {
  bunnyraptor = 'bunnyraptor',
  cheetahButt = 'cheetahButt',
  crabWalk = 'crabWalk',
  hypergoat = 'hypergoat',
}

export enum cardColors {
  attack = 'orange',
  cats = 'grey',
  diffuse = 'green',
  exploading = 'none',
  favor = 'black',
  nope = 'red',
  seeTheFuture = 'pink',
  shuffle = 'brown',
  skip = 'blue',
}

export type cardNames =
  | attackNames
  | catsNames
  | diffuseNames
  | exploadingNames
  | favorNames
  | nopeNames
  | seeTheFutureNames
  | shuffleNames
  | skipNames;

export const cardLengths = {
  exploading: 4,
  attack: 4,
  cats: 20,
  diffuse: 6,
  favor: 4,
  nope: 5,
  seeTheFuture: 5,
  shuffle: 4,
  skip: 4,
};

export const eachCatLength = 4;
