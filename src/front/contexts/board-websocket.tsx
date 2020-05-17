import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { ReconnectingWebsocket } from '@front/classes/reconnecting-websocket';
import { payloadTypes } from '@shared/payload-types';

import { boardSocketRoute, homePage } from '@shared/urls';
import { sessionStorageItems } from '@front/shared/types';

const WebsocketContext = React.createContext<ReconnectingWebsocket | null>(
  null
);

export const BoardWebsocketProvider: React.FC = (props) => {
  const history = useHistory();
  const ws = new ReconnectingWebsocket(boardSocketRoute);
  ws._connect();

  const handleLeaveGame = () => {
    const curentGame = sessionStorage.getItem(sessionStorageItems.currentGame);

    if (curentGame) {
      const playerId = sessionStorage.getItem(
        sessionStorageItems.user
      ) as string;
      const payload = {
        playerId: JSON.parse(playerId).id,
        boardId: curentGame,
      };

      ws.send(payloadTypes.leaveGame, payload);
    }

    sessionStorage.removeItem(sessionStorageItems.currentGame);
  };

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname === homePage) {
        handleLeaveGame();
      }
    });
    window.addEventListener('beforeunload', handleLeaveGame);

    return () => {
      history.listen((location) => {
        if (location.pathname === homePage) {
          handleLeaveGame();
        }
      });
      ws.removeAllListeners();
      window.removeEventListener('beforeunload', handleLeaveGame);
    };
  }, [history.location.pathname]);

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
