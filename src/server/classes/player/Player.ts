import WebSocket from 'ws';

import { players, boards } from '@server/websocket';

import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';

import { IPlayerID, PlayerIdentification } from './PlayerIdentification';

interface IPlayer {
  data: PlayerIdentification;
  socket: WebSocket;
  isPlaying: string;
}

export class Player implements IPlayer {
  constructor(playerId: IPlayerID, socket: WebSocket) {
    this.data = new PlayerIdentification(playerId);
    this.socket = socket;
    this.isPlaying = '';

    this.socket.addEventListener('close', () => {
      if (this.isPlaying) {
        boards.get(this.isPlaying)?.removePlayer(this.getIdentification().id);
      }

      players.delete(this.data.id);
    });
  }

  getIdentification() {
    return this.data;
  }

  send(type: payloadTypes, payload?: any) {
    this.socket.send(createMessage(type, payload));
  }

  data: PlayerIdentification;
  isPlaying: string;
  socket: WebSocket;
}
