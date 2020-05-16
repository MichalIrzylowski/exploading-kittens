import React, { useContext } from 'react';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';

import { boardSocketRoute } from '@shared/urls';

const WebsocketContext = React.createContext<ReconnectingWebsocket | null>(
  null
);

export const BoardWebsocketProvider: React.FC = (props) => {
  const ws = new ReconnectingWebsocket(boardSocketRoute);
  ws._connect();

  return <WebsocketContext.Provider value={ws} {...props} />;
};

export const useBoardWebsocket = () => {
  const value = useContext(WebsocketContext);

  if (!value) {
    throw new Error(
      'useBoardWebsocket hook has to be used inside BoardWebsocketProvider'
    );
  }

  return value;
};
