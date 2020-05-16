import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';
import { payloadTypes } from '@shared/payload-types';

import { boardSocketRoute } from '@shared/urls';
import { localStorageItems } from '@front/shared/types';

const WebsocketContext = React.createContext<ReconnectingWebsocket | null>(
  null
);

export const BoardWebsocketProvider: React.FC = (props) => {
  const history = useHistory();
  const ws = new ReconnectingWebsocket(boardSocketRoute);
  ws._connect();

  const handleCloseConnection = () => {
    const curentGame = localStorage.getItem(localStorageItems.currentGame);

    if (curentGame) {
      const playerId = localStorage.getItem(localStorageItems.user) as string;
      const payload = {
        playerId: JSON.parse(playerId).id,
        boardId: curentGame,
      };

      ws.send(payloadTypes.leaveGame, payload);
    }

    localStorage.removeItem(localStorageItems.currentGame);
    ws.close();
  };

  useEffect(() => {
    history.listen(handleCloseConnection);

    return () => {
      history.listen(handleCloseConnection);
    };
  }, []);

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
