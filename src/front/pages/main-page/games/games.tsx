import React, { useState, useEffect } from 'react';

import { useWebSocket } from '@front/contexts/main-websocket';
import { translate } from '@front/utils/translate';
import { BrowserPaper } from '@front/components/browser-paper';

import { payloadTypes } from '@shared/payload-types';
import { TBoard } from '@shared/types';

import { GamesList } from './games-list/';
import * as localizations from './resources/localizations';
import css from './games.scss';

export const Games = () => {
  const ws = useWebSocket();
  const [games, setGames] = useState<TBoard[]>([]);
  const translations = translate(localizations);

  const settingBoards = (boards: TBoard[]) => setGames(boards);
  const creatingGame = (board: TBoard) => setGames([...games, board]);
  const deleteBoard = (boardId: string) => setGames((prevGames) => prevGames.filter((board) => board.id !== boardId));
  const removePlayer = (boardId: string) => {
    setGames((prevGames) =>
      prevGames.map((board) => {
        if (board.id === boardId) board.players--;
        return board;
      })
    );
  };
  const addPlayer = (boardId: string) => {
    setGames((prevGames) =>
      prevGames.map((board) => {
        if (board.id === boardId) board.players++;

        return board;
      })
    );
  };

  useEffect(() => {
    ws.on(payloadTypes.boardDeleted, deleteBoard);
    ws.on(payloadTypes.createBoard, creatingGame);
    ws.on(payloadTypes.currentBoards, settingBoards);
    ws.on(payloadTypes.playerLeftBoard, removePlayer);
    ws.on(payloadTypes.newPlayer, addPlayer);

    return () => {
      ws.off(payloadTypes.boardDeleted, deleteBoard);
      ws.off(payloadTypes.createBoard, creatingGame);
      ws.off(payloadTypes.currentBoards, settingBoards);
      ws.off(payloadTypes.playerLeftBoard, removePlayer);
      ws.off(payloadTypes.newPlayer, addPlayer);
    };
  }, []);

  const handleClick = () => ws.send(payloadTypes.refreshBoards);

  return (
    <div className={css.wrapper}>
      <h3>{translations.currentGames}</h3>
      <BrowserPaper
        addressHref="https://explodingkittens.com/"
        onRefreshButtonClick={handleClick}
        paperClassName={css.paper}
      >
        <div className={css.gamesListWrapper}>
          <div className={css.listHead}>
            <h6>Nazwa Gry</h6>
            <h6>Ilość graczy / Maksymalna ilość</h6>
            <h6>Dołącz</h6>
          </div>
          <GamesList games={games} />
        </div>
      </BrowserPaper>
    </div>
  );
};
