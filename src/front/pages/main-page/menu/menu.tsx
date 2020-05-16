import React from 'react';
import { Link } from 'react-router-dom';

import { List } from '@front/components/list';
import { ListItem } from '@front/components/list-item';

import { translate } from '@front/utils/translate';

import { guide } from '@shared/urls';

import * as localizations from './resources/localizations';
import css from './menu.scss';

export const Menu: React.FC = (props) => {
  const translations = translate(localizations);

  return (
    <nav>
      <List type="ul">
        <ListItem>
          <Link to={guide} className={css.link}>
            {translations.guide}
          </Link>
        </ListItem>
      </List>
    </nav>
  );
};
