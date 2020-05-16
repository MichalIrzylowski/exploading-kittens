import React, { useState, useEffect } from 'react';

import { useMainWebsocket } from '@front/contexts/main-websocket';
import { translate } from '@front/utils/translate';
import { BrowserPaper } from '@front/components/browser-paper';

import { payloadTypes } from '@shared/payload-types';
import { TBoard } from '@shared/types';

import { GamesList } from './games-list/';
import * as localizations from './resources/localizations';
import css from './games.scss';

export const Games = () => {
  const ws = useMainWebsocket();
  const [games, setGames] = useState<TBoard[]>([]);
  const translations = translate(localizations);

  const settingBoards = (boards: TBoard[]) => setGames(boards);
  const creatingGame = (board: TBoard) => setGames([...games, board]);

  useEffect(() => {
    ws.on(payloadTypes.currentBoards, settingBoards);
    ws.on(payloadTypes.createGame, creatingGame);

    return () => {
      ws.off(payloadTypes.currentBoards, settingBoards);
      ws.off(payloadTypes.createGame, creatingGame);
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
