export interface IObject<T> {
  [key: string]: T;
}

export enum localStorageItems {
  user = 'user',
  currentGame = 'currentGame',
}
