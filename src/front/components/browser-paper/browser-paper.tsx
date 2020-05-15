import React from 'react';

import { Paper } from '@front/components/paper';
import { MyLink } from '@front/components/my-link';
import { Svg } from '@front/components/svg';
import { Button, buttonAppearance } from '@front/components/button';

import { refresh } from '@front/images/svg';

import css, { cssExports } from './browser-paper.scss';

const dots = ['red', 'yellow', 'green'];

interface IBrowserPaper {
  addressHref?: string;
  paperClassName?: string;
  onRefreshButtonClick?: () => void;
}

const iconSize = 15;

export const BrowserPaper: React.FC<IBrowserPaper> = (props) => {
  const addressLink = props.addressHref ? (
    <MyLink className={css.link} href={props.addressHref}>
      {props.addressHref}
    </MyLink>
  ) : null;

  const refreshButton = props.onRefreshButtonClick ? (
    <Button
      appearance={buttonAppearance.none}
      onClick={props.onRefreshButtonClick}
      className={css.refresh}
    >
      <Svg width={iconSize} height={iconSize}>
        {refresh}
      </Svg>
    </Button>
  ) : null;

  return (
    <Paper className={props.paperClassName}>
      <div className={css.browserPanel}>
        <div className={css.dotsWrapper}>
          {dots.map((color, i) => (
            <div key={i} className={css[color as keyof typeof cssExports]} />
          ))}
        </div>
        {refreshButton}
        <div className={css.browserAddress}>{addressLink}</div>
      </div>
      {props.children}
    </Paper>
  );
};
