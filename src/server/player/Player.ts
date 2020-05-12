import { IPlayerID, PlayerIdentification } from './PlayerIdentification';

interface IPlayer {
  data: PlayerIdentification;
}

export class Player implements IPlayer {
  constructor(playerId: IPlayerID) {
    this.data = new PlayerIdentification(playerId);
  }

  data: PlayerIdentification;
}
