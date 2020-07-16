import React, { useContext, useEffect } from 'react';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';

import { mainSocketRoute } from '@shared/urls';
import { payloadTypes } from '@shared/payload-types';
import { ISnackMessage } from '@shared/interfaces';

import { useSnackBar } from './snack-bar-context';

const WebsocketContext = React.createContext<ReconnectingWebsocket | null>(null);

export const WebSocketProvider: React.FC = (props) => {
  const setSnackBar = useSnackBar();
  const ws = new ReconnectingWebsocket(mainSocketRoute);
  ws._connect();

  useEffect(() => {
    const handleSnackMessage = ({ message, severity }: ISnackMessage) => {
      const snackMessage = { message: (message as unknown) as string, severity, key: Date.now() };
      setSnackBar((messages) => [...messages, snackMessage]);
    };

    ws.on(payloadTypes.snack, handleSnackMessage);
    return () => {
      ws.off(payloadTypes.snack, handleSnackMessage);
    };
  }, []);

  return <WebsocketContext.Provider value={ws} {...props} />;
};

export const useWebSocket = () => {
  const value = useContext(WebsocketContext);

  if (!value) {
    throw new Error('useMainWebsocket hook has to be used inside MainWebsocketProvider');
  }

  return value;
};
