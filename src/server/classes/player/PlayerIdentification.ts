export interface IPlayerID {
  id: string;
  name: string;
}

export class PlayerIdentification implements IPlayerID {
  id: string;
  name: string;

  constructor({ id, name }: IPlayerID) {
    this.id = id;
    this.name = name;
  }
}
