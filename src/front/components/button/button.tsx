import React from 'react';
import classNames from 'classnames';

import css from './button.scss';

export enum buttonAppearance {
  none = 'none',
}

interface IButton {
  appearance: buttonAppearance;
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<IButton> = (props) => {
  return (
    <button
      className={classNames(css[props.appearance], props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
