import { actionTypes } from '@shared/action-types';
import { snackMessages, TSnackSeverity } from '@shared/snack-messages';

export interface ISnackMessage {
  message: snackMessages;
  severity: TSnackSeverity;
}

export interface IGameMessagePayload {
  action: actionTypes;
  payload: {};
  snack?: ISnackMessage;
}
