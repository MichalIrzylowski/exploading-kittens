import React, { useState } from 'react';

import { useWebsocket } from '@front/contexts/websocket';
import { translate } from '@front/utils/translate';
import { BrowserPaper } from '@front/components/browser-paper';

import { payloadTypes } from '@shared/payload-types';

import { GamesList } from './games-list/';
import * as localizations from './resources/localizations';
import css from './games.scss';

export const Games = () => {
  const ws = useWebsocket();
  const [games, setGames] = useState<TBoard[]>([]);
  const translations = translate(localizations);

  ws.on(payloadTypes.currentBoards, (boards) => setGames(boards));

  const handleClick = () => ws.send(payloadTypes.refreshBoards);

  return (
    <div>
      <h3>{translations.currentGames}</h3>
      <BrowserPaper
        addressHref="https://explodingkittens.com/"
        onRefreshButtonClick={handleClick}
      >
        <div className={css.gamesListWrapper}>
          <GamesList games={games} />
        </div>
      </BrowserPaper>
    </div>
  );
};
