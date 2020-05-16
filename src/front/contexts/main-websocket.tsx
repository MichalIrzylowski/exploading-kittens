import React, { useContext } from 'react';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';

import { mainSocketRoute } from '@shared/urls';

const WebsocketContext = React.createContext<ReconnectingWebsocket | null>(
  null
);

export const MainWebsocketProvider: React.FC = (props) => {
  const ws = new ReconnectingWebsocket(mainSocketRoute);
  ws._connect();

  return <WebsocketContext.Provider value={ws} {...props} />;
};

export const useMainWebsocket = () => {
  const value = useContext(WebsocketContext);

  if (!value) {
    throw new Error(
      'useMainWebsocket hook has to be used inside MainWebsocketProvider'
    );
  }

  return value;
};