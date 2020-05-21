import React from 'react';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';
import { Avatar } from '@front/components/avatar';

import { sessionStorageItems } from '@front/shared/types';

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
  const playerId = JSON.parse(
    sessionStorage.getItem(sessionStorageItems.user) as string
  ).id;
  return (
    <List type="ul" horizontal={true} distributed={true}>
      {players.map((player) => {
        if (playerId === player.id) return null;
        return (
          <ListItem key={player.id} noBorder={true} className={css.player}>
            <h3>
              <Avatar isOnline={player.isOnline} />
              {player.name}
            </h3>
          </ListItem>
        );
      })}
    </List>
  );
};
