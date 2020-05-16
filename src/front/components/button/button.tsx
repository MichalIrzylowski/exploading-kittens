import React from 'react';
import classNames from 'classnames';

import css, { cssExports } from './button.scss';

export enum buttonAppearance {
  none = 'none',
  primary = 'primary',
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
