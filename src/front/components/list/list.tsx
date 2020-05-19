import React from 'react';
import classNames from 'classnames';

import css from './list.scss';

interface IListStyles {
  className?: string;
  noListStyle?: boolean;
  noMargin?: boolean;
  horizontal?: boolean;
  distributed?: boolean;
}

interface IList extends IListStyles {
  type: 'ul' | 'ol';
}

const getStyles = (props: IListStyles) => {
  return classNames(
    {
      [css.noListStyle]: props.noListStyle,
      [css.noMargin]: props.noMargin,
      [css.horizontal]: props.horizontal,
      [css.horizontalDistributed]: props.distributed,
    },
    props.className
  );
};

export const List: React.FC<IList> = ({ type, children, ...restProps }) =>
  React.createElement(type, { className: getStyles(restProps) }, children);

List.defaultProps = {
  noListStyle: true,
  noMargin: true,
};
