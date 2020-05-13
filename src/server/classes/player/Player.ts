import WebSocket from 'ws';
import { IPlayerID, PlayerIdentification } from './PlayerIdentification';

interface IPlayer {
  data: PlayerIdentification;
  socket: WebSocket;
}

export class Player implements IPlayer {
  constructor(playerId: IPlayerID, socket: WebSocket) {
    this.data = new PlayerIdentification(playerId);
    this.socket = socket;
  }

  getIdentification() {
    return this.data;
  }

  data: PlayerIdentification;
  socket: WebSocket;
}
