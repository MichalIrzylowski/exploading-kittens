import React, { useState } from 'react';

import { useWebsocket } from '@front/contexts/websocket';
import { translate } from '@front/utils/translate';
import { BrowserPaper } from '@front/components/browser-paper';

import { payloadTypes } from '@shared/payload-types';
import { TBoard } from '@shared/types';

import { GamesList } from './games-list/';
import * as localizations from './resources/localizations';
import css from './games.scss';

export const Games = () => {
  const ws = useWebsocket();
  const [games, setGames] = useState<TBoard[]>([]);
  const translations = translate(localizations);

  ws.on(payloadTypes.currentBoards, (boards: TBoard[]) => setGames(boards));
  ws.on(payloadTypes.createGame, (board: TBoard) =>
    setGames([...games, board])
  );

  const handleClick = () => ws.send(payloadTypes.refreshBoards);

  return (
    <div>
      <h3>{translations.currentGames}</h3>
      <BrowserPaper
        addressHref="https://explodingkittens.com/"
        onRefreshButtonClick={handleClick}
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
