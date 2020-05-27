import React from 'react';

import { PlayersList, IPlayer } from './players-list';
import { PlayerPanel, ICard } from './player-panel';

export { IPlayer, ICard };

interface IGameArea {
  players: IPlayer[];
  cards: ICard[];
}

export const GameArea: React.FC<IGameArea> = (props) => {
  return (
    <>
      <PlayersList players={props.players} />
      <PlayerPanel cards={props.cards} />
    </>
  );
};
