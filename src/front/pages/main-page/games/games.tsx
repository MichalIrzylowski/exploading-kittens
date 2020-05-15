import React, { useState } from 'react';

import { useWebsocket } from '@front/contexts/websocket';
import { translate } from '@front/utils/translate';
import { BrowserPaper } from '@front/components/browser-paper';

import { payloadTypes } from '@shared/payload-types';

import * as localizations from './resources/localizations';
import css from './games.scss';

export const Games = () => {
  const ws = useWebsocket();
  const [games, setGames] = useState<string[]>([]);
  const translations = translate(localizations);

  ws.on(payloadTypes.currentBoards, (data) => {
    console.log('boards');
    setGames(data.boards);
  });

  const handleClick = () => {
    ws.send(payloadTypes.refreshBoards);
  };

  return (
    <div>
      <h3>{translations.currentGames}</h3>
      <BrowserPaper
        addressHref="https://explodingkittens.com/"
        onRefreshButtonClick={handleClick}
      >
        <div className={css.gamesListWrapper}>{games}</div>
      </BrowserPaper>
    </div>
  );
};
