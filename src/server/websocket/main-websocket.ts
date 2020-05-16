import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Player } from '@server/classes/player';
import { sendBoards } from '@server/utils/send-boards';

import { payloadTypes } from '@shared/payload-types';
import { createMessage } from '@shared/helpers/create-message';

import { boards, players } from './ws-data';

const fakeNames = ['Marian', 'Zenek', 'Miłosz', 'Tobiasz', 'Borys'];

export const mainConnection = (socket: WebSocket) => {
  sendBoards(socket, boards);

  socket.on('message', (data) => {
    const message = JSON.parse(data as any);

    switch (message.type) {
      case payloadTypes.registerUser:
        let id = uuid();
        let randomNumber = Math.floor(Math.random() * fakeNames.length);
        let name = fakeNames[randomNumber];

        let playerId = { id, name };

        if (message.payload) {
          playerId = message.payload;
        }

        players.set(playerId.id, new Player(playerId, socket));

        socket.send(createMessage(payloadTypes.registerUser, playerId));
        break;

      case payloadTypes.refreshBoards:
        sendBoards(socket, boards);
        break;

      default:
        throw new Error(`Unhandled message (main websocket): ${message.type}`);
    }
  });
};
