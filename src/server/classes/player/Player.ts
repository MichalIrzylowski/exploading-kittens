import WebSocket from 'ws';

import { players, boards } from '@server/websocket';

import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';

import { IPlayerID, PlayerIdentification } from './PlayerIdentification';

interface IPlayer {
  data: PlayerIdentification;
  sockets: {
    main: WebSocket;
    game?: WebSocket;
  };
  isPlaying: string;
}

export type TSocket = 'main' | 'game';

export class Player implements IPlayer {
  constructor(playerId: IPlayerID, socket: WebSocket) {
    this.data = new PlayerIdentification(playerId);
    this.sockets = {
      main: socket,
    };
    this.isPlaying = '';

    this.sockets.main.addEventListener('close', () => {
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
    this.sockets.main.send(createMessage(type, payload));
  }

  gameMessage(type: payloadTypes, payload?: any) {
    this.sockets.game?.send(createMessage(type, payload));
  }

  snackMessage(type: payloadTypes, socketType: TSocket, payload?: {}) {
    const [message, severity] = type.split('-');
    const snackPayload = {
      message,
      severity,
      ...payload,
    };
    this.sockets[socketType]?.send(createMessage(type, snackPayload));
  }

  data: PlayerIdentification;
  isPlaying: string;
  sockets: {
    main: WebSocket;
    game?: WebSocket;
  };
}
