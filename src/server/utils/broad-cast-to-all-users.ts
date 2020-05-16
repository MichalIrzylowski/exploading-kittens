import { Player } from '@server/classes/player';
import { payloadTypes } from '@shared/payload-types';
import { createMessage } from '@shared/helpers/create-message';

interface IMessage {
  type: payloadTypes;
  payload?: any;
}

export const broadCastToAllUsers = (
  players: Map<string, Player> | Player[],
  { type, payload }: IMessage
) => {
  if (Array.isArray(players)) {
    players.forEach((player) => {
      console.log(player);
      player.send(type, payload);
    });
  } else {
    players.forEach((player) => {
      player.send(type, payload);
    });
  }
};
