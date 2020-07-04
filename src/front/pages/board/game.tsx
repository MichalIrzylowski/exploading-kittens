import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch, Route, Switch } from 'react-router-dom';

import { useWebSocket } from '@front/contexts/main-websocket';
import { sessionStorageItems } from '@front/shared/types';
import { LayoutWrapper } from '@front/components/layout-wrapper';

import { payloadTypes } from '@shared/payload-types';
import { _new } from '@shared/urls';

import { BoardCreator } from './board-creator';
import { PlayerView } from './player-view';

export const Game = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const [isBoard, setBoard] = useState(history.location.state ? history.location.state : '');
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
    history.listen((location, action) => {
      if (action === 'POP') handleLeaveGame();
    });
    return () => {
      history.listen((location, action) => {
        if (action === 'POP') handleLeaveGame();
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

    return () => {
      handleLeaveGame();
    };
  }, [history.location.pathname]);

  console.log('duppa', match);

  return (
    <main>
      <LayoutWrapper>
        <Switch>
          <Route path={match.path + _new}>
            <BoardCreator setNewBoard={setBoard} />
          </Route>
        </Switch>
        {/* {!isBoard && } make separate route for this */}
        {isBoard && <PlayerView />}
      </LayoutWrapper>
    </main>
  );
};
