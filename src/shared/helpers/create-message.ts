import { payloadTypes } from '@shared/payload-types';

export const createMessage = (type: payloadTypes, payload: any) => {
  return JSON.stringify({
    type,
    payload,
  });
};
