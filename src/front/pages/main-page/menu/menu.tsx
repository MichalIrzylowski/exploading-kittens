import React from 'react';
import { Link } from 'react-router-dom';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';

import { translate } from '@front/utils/translate';

import { guide, newGame } from '@shared/urls';

import * as localizations from './resources/localizations';
import css from './menu.scss';

export const Menu: React.FC = () => {
  const translations = translate(localizations);

  return (
    <nav>
      <List type="ul">
        <ListItem noBorder={true}>
          <Link to={guide} className={css.link}>
            {translations.guide}
          </Link>
        </ListItem>
        <ListItem noBorder={true}>
          <Link to={newGame} className={css.link}>
            {translations.board}
          </Link>
        </ListItem>
      </List>
    </nav>
  );
};
