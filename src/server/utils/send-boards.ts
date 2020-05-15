import ws from 'ws';

import { createMessage } from '@shared/helpers/create-message';
import { payloadTypes } from '@shared/payload-types';
import { TBoard } from '@shared/types';

import { Board } from '@server/classes/board';

export const sendBoards = (socket: ws, boardsMap: Map<string, Board>) => {
  const boards: TBoard[] = [];

  boardsMap.forEach((board, boardId) => {
    boards.push({ id: boardId, players: board.players.length, name: boardId });
  });

  socket.send(createMessage(payloadTypes.currentBoards, boards));
};
