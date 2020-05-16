import React from 'react';
import classNames from 'classnames';

import css from './list-item.scss';

interface IListItem {
  className?: string;
  noBorder?: boolean;
}

export const ListItem: React.FC<IListItem> = (props) => {
  const cssClasses = {
    [css.noBorder]: props.noBorder,
  };
  return (
    <li className={classNames(css.listItem, cssClasses, props.className)}>
      {props.children}
    </li>
  );
};
