import React from 'react';
import classNames from 'classnames';

import css from './layout-wrapper.scss';

interface ILayoutWrapper {
  className?: string;
}

export const LayoutWrapper: React.FC<ILayoutWrapper> = (props) => (
  <div className={classNames(css.wrapper, props.className)}>
    {props.children}
  </div>
);
