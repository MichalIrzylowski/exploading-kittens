export interface IObject<T> {
  [key: string]: T;
}

export enum sessionStorageItems {
  user = 'user',
  currentGame = 'currentGame',
}
