import { Player } from '@server/classes/player';
import { payloadTypes } from '@shared/payload-types';

interface IMessage {
  type: payloadTypes;
  payload?: any;
}

export const broadCastToAllUsers = (
  players: Map<string, Player>,
  { type, payload }: IMessage
) => {
  players.forEach((player) => {
    player.send(type, payload);
  });
};
