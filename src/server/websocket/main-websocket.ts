import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

import { Player } from '@server/classes/player';
import { Board } from '@server/classes/board';
import { sendBoards } from '@server/utils/send-boards';
import { broadCastToAllUsers } from '@server/utils/broad-cast-to-all-users';

import { payloadTypes } from '@shared/payload-types';
import { createMessage } from '@shared/helpers/create-message';

import { boards, players } from './ws-data';

const fakeNames = ['Marian', 'Zenek', 'Miłosz', 'Tobiasz', 'Borys', 'Angelini', 'Michałek'];

export const mainConnection = (socket: WebSocket) => {
  sendBoards(socket, boards);

  socket.on('message', (data) => {
    const message = JSON.parse(data as any);

    switch (message.type) {
      case payloadTypes.registerUser:
        let newId = uuid();
        let randomNumber = Math.floor(Math.random() * fakeNames.length);
        let name = fakeNames[randomNumber];

        let playerId = { id: newId, name };

        if (message.payload) {
          playerId = message.payload;
        }

        players.set(playerId.id, new Player(playerId, socket));

        socket.send(createMessage(payloadTypes.registerUser, playerId));
        break;

      case payloadTypes.refreshBoards:
        sendBoards(socket, boards);
        break;

      case payloadTypes.createBoard:
        const boardId = uuid();
        const { id } = message.payload;

        const player = players.get(id);
        if (!player) {
          socket.send(createMessage(payloadTypes.error, 'player not registered'));
          break;
        }

        player.isPlaying = boardId;
        boards.set(boardId, new Board(boardId, player));

        const snackData = payloadTypes.boardCreatedSnackSuccess.split('-');

        socket.send(createMessage(payloadTypes.boardCreated, boardId));
        socket.send(
          createMessage(payloadTypes.boardCreatedSnackSuccess, {
            message: snackData[0],
            severity: snackData[1],
          })
        );

        broadCastToAllUsers(players, {
          type: payloadTypes.createBoard,
          payload: {
            id: boardId,
            players: boards.get(boardId)?.players.length,
            name: boardId,
          },
        });
        break;

      case payloadTypes.leaveGame:
        boards.get(message.payload.boardId)?.removePlayer(message.payload.playerId);
        break;

      case payloadTypes.joinGame:
        const joiningPlayer = players.get(message.payload.userId) as Player;
        boards.get(message.payload.boardId)?.addPlayer(joiningPlayer);
        break;

      case payloadTypes.startGame:
        boards.get(message.payload)?.startGame();
        break;

      default:
        throw new Error(`Unhandled message (main websocket): ${message.type}`);
    }
  });
};
