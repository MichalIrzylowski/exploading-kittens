import React from 'react';

import { PlayersList, IPlayer } from './players-list';
import { PlayerPanel } from './player-panel';

export { IPlayer };

interface IGameArea {
  players: IPlayer[];
}

export const GameArea: React.FC<IGameArea> = (props) => {
  return (
    <>
      <PlayersList players={props.players} />
      <PlayerPanel />
    </>
  );
};
