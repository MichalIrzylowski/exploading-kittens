import React from 'react';
import classNames from 'classnames';

import css from './button.scss';

export enum buttonAppearance {
  none = 'none',
  primary = 'primary',
  success = 'success',
}

interface IButtonStyles {
  appearance: buttonAppearance;
  outlined?: boolean;
  className?: string;
}

interface IButton extends IButtonStyles {
  onClick: () => void;
}

const getStyles = (props: IButtonStyles) =>
  classNames(
    css[props.appearance],
    { [css.filled]: !props.outlined },
    props.className
  );

export const Button: React.FC<IButton> = ({
  children,
  onClick,
  ...styleProps
}) => {
  return (
    <button className={getStyles(styleProps)} onClick={onClick}>
      {children}
    </button>
  );
};
