import React from 'react';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';
import { Avatar } from '@front/components/avatar';

import css from './players-list.scss';

export interface IPlayer {
  id: string;
  name: string;
  isOnline: boolean;
}

interface IPlayersList {
  players: IPlayer[];
}

export const PlayersList: React.FC<IPlayersList> = ({ players }) => {
  return (
    <List type="ul" horizontal={true} distributed={true}>
      {players.map((player) => (
        <ListItem key={player.id} noBorder={true} className={css.player}>
          <h3>
            <Avatar isOnline={player.isOnline} />
            {player.name}
          </h3>
        </ListItem>
      ))}
    </List>
  );
};
