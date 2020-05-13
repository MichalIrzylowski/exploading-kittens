import { payloadTypes } from '@shared/payload-types';

export const createMessage = (type: payloadTypes, message: any) => {
  return {
    type,
    message,
  };
};
