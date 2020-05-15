import React from 'react';
import classNames from 'classnames';

import css from './list-item.scss';

interface IListItem {
  className?: string;
}

export const ListItem: React.FC<IListItem> = (props) => {
  return (
    <li className={classNames(css.listItem, props.className)}>
      {props.children}
    </li>
  );
};
