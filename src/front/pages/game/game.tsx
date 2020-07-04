import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useRouteMatch, Route, Switch } from 'react-router-dom';

import { useWebSocket } from '@front/contexts/main-websocket';
import { sessionStorageItems } from '@front/shared/types';
import { LayoutWrapper } from '@front/components/layout-wrapper';

import { payloadTypes } from '@shared/payload-types';
import { _new, id, homePage } from '@shared/urls';

import { BoardCreator } from './board-creator';
import { Board } from './board';

export const Game = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const ws = useWebSocket();

  const handleLeaveGame = () => {
    const boardId = sessionStorage.getItem(sessionStorageItems.currentGame);

    if (boardId) {
      const player = sessionStorage.getItem(sessionStorageItems.user) as string;
      const playerId = JSON.parse(player).id;
      ws.send(payloadTypes.leaveGame, { playerId, boardId });

      sessionStorage.removeItem(sessionStorageItems.currentGame);
    }
  };

  useEffect(() => {
    history.listen(({ pathname }) => {
      if (pathname === homePage) handleLeaveGame();
    });
    return () => {
      history.listen(({ pathname }) => {
        if (pathname === homePage) handleLeaveGame();
      });
    };
  }, []);

  useEffect(() => {
    if (history.location.state) {
      const playerId = sessionStorage.getItem(sessionStorageItems.user) as string;
      ws.send(payloadTypes.joinGame, {
        boardId: history.location.state,
        userId: JSON.parse(playerId).id,
      });
    }
  }, [history.location.pathname]);

  return (
    <main>
      <LayoutWrapper>
        <Switch>
          <Route path={match.path + _new}>
            <BoardCreator />
          </Route>
          <Route path={match.path + id}>
            <Board />
          </Route>
        </Switch>
      </LayoutWrapper>
    </main>
  );
};
