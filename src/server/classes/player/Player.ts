import WebSocket from 'ws';

import { players, boards } from '@server/websocket';

import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';
import { IGameMessagePayload, ISnackMessage } from '@shared/interfaces';

import { IPlayerID, PlayerIdentification } from './PlayerIdentification';
import { Card } from '../card';

interface IPlayer {
  data: PlayerIdentification;
  socket: WebSocket;
  isPlaying: string;
  hand?: Card[];
}

export class Player implements IPlayer {
  constructor(playerId: IPlayerID, socket: WebSocket) {
    this.data = new PlayerIdentification(playerId);
    this.socket = socket;
    this.isPlaying = '';

    this.socket.addEventListener('close', () => {
      console.warn('Player.ts closing', this.isPlaying.length);
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

  gameMessage(payload: IGameMessagePayload) {
    this.socket.send(createMessage(payloadTypes.game, payload));
  }

  snackMessage(payload: ISnackMessage) {
    this.socket.send(createMessage(payloadTypes.snack, payload));
  }

  data: PlayerIdentification;
  isPlaying: string;
  socket: WebSocket;
  hand?: Card[];
}
