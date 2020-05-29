import { payloadTypes } from '@shared/payload-types';
import { ISnackMessage } from '@shared/interfaces';

export const createMessage = (type: payloadTypes, payload?: any) => {
  return JSON.stringify({
    type,
    payload,
  });
};

export const createSnackMessage = (payload: ISnackMessage) => {
  return createMessage(payloadTypes.snack, payload);
};
