import React, { useCallback } from 'react';

import { Card, ICard } from '@front/components/card';
import { sessionStorageItems } from '@front/shared/types';
import { translate } from '@front/utils/translate';
import { useWebSocket } from '@front/contexts/main-websocket';

import { payloadTypes } from '@shared/payload-types';

import * as localizations from './resources/localizations';
import css from './player-panel.scss';

interface IPlayerPanel {
  cards: ICard[];
}

export { ICard };

export const PlayerPanel: React.FC<IPlayerPanel> = ({ cards }) => {
  const translations = translate(localizations);
  const ws = useWebSocket();
  const boardId = sessionStorage.getItem(sessionStorageItems.currentGame);
  const { id } = JSON.parse(sessionStorage.getItem(sessionStorageItems.user) as string);

  const handlePlayCard = useCallback(
    (card: ICard) => () => {
      ws.send(payloadTypes.playCard, { ...card, boardId, playerId: id });
    },
    [boardId, id]
  );

  return (
    <div>
      Player panel
      <div className={css.cardsWrapper}>
        {cards.map((card, i) => (
          <Card
            key={`${card.name}-${i}`}
            name={card.name}
            color={card.color}
            type={translations[card.type]}
            onPlayCard={handlePlayCard(card)}
          />
        ))}
      </div>
    </div>
  );
};
