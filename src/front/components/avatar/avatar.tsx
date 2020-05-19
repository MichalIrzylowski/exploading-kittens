import React from 'react';

import classNames from 'classnames';

import css from './avatar.scss';

interface IAvatar {
  onlineIndicator?: boolean;
  isOnline: boolean;
  avatarClassName?: string;
  onlineIndicatorClassName?: string;
}

export const Avatar: React.FC<IAvatar> = (props) => {
  return (
    <div className={classNames(css.avatar, props.avatarClassName)}>
      {props.onlineIndicator && (
        <div
          className={classNames(
            css.online,
            { [css.notOnline]: !props.isOnline },
            props.onlineIndicatorClassName
          )}
        ></div>
      )}
    </div>
  );
};

Avatar.defaultProps = {
  onlineIndicator: true,
};
