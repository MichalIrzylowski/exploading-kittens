export interface IPlayerID {
  id: string;
  name: string;
  isOnline?: boolean;
}

export class PlayerIdentification implements IPlayerID {
  id: string;
  name: string;
  isOnline?: boolean;

  constructor({ id, name }: IPlayerID) {
    this.id = id;
    this.name = name;
  }
}
