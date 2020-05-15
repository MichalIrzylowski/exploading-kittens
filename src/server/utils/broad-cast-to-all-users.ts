import { Player } from '@server/classes/player';
import { payloadTypes } from '@shared/payload-types';
import { createMessage } from '@shared/helpers/create-message';

interface IMessage {
  type: payloadTypes;
  payload: any;
}

export const broadCastToAllUsers = (
  players: Map<string, Player>,
  { type, payload }: IMessage
) => {
  players.forEach((player) => {
    player.socket.send(createMessage(type, payload));
  });
};
