import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Board } from '@server/classes/board';
import { Player } from '@server/classes/player';
import { sendBoards } from '@server/utils/send-boards';
import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';

import { payloadTypes } from '@shared/payload-types';
import { createMessage } from '@shared/helpers/create-message';

export const boards = new Map<string, Board>();
export const players = new Map<string, Player>();

const fakeBoards = [uuid(), uuid(), uuid()];

fakeBoards.forEach((boardId) => {
  boards.set(boardId, new Board(boardId));
});

const fakeNames = ['Marian', 'Zenek', 'Miłosz', 'Tobiasz', 'Borys'];

export const connection = (socket: WebSocket) => {
  sendBoards(socket, boards);

  socket.on('message', (data) => {
    const message = JSON.parse(data as any);

    switch (message.type) {
      case payloadTypes.registerUser:
        let id = uuid();
        let randomNumber = Math.floor(Math.random() * fakeNames.length);
        if (randomNumber < 1) {
          randomNumber = 1;
        }
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

      case payloadTypes.createGame:
        const boardId = uuid();
        boards.set(boardId, new Board(boardId));

        broadCastToAllUsers(players, {
          type: payloadTypes.createGame,
          payload: {
            id: boardId,
            players: boards.get(boardId)?.players.length,
            name: boardId,
          },
        });

      default:
        console.error(`Unhandled message: ${message.type}`);
    }
  });
};
