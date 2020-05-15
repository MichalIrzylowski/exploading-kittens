import React from 'react';
import classNames from 'classnames';

import css from './paper.scss';

interface IPaper {
  className?: string;
}

export const Paper: React.FC<IPaper> = (props) => {
  return (
    <div className={classNames(css.paper, props.className)}>
      {props.children}
    </div>
  );
};
