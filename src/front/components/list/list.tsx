import React from 'react';
import classNames from 'classnames';

import css from './list.scss';

interface IList {
  className?: string;
  noListStyle?: boolean;
  noMargin?: boolean;
  type: 'ul' | 'ol';
}

export const List: React.FC<IList> = ({ type, children, ...restProps }) => {
  const { className, noListStyle, noMargin } = restProps;
  const listClassName = classNames(
    { [css.noListStyle]: noListStyle, [css.noMargin]: noMargin },
    className
  );
  return React.createElement(type, { className: listClassName }, children);
};

List.defaultProps = {
  noListStyle: true,
  noMargin: true,
};
