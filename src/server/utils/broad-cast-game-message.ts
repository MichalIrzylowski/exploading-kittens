import { Player } from '@server/classes/player';
import { payloadTypes } from '@shared/payload-types';

interface IMessage {
  type: payloadTypes;
  payload?: any;
}

export const broadCastGameMessage = (
  players: Player[],
  { type, payload }: IMessage
) => {
  players.forEach((player) => {
    player.gameMessage(type, payload);
  });
};
