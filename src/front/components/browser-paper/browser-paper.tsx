import React from 'react';

import { Paper } from '@front/components/paper';
import { MyLink } from '@front/components/my-link';

import css, { cssExports } from './browser-paper.scss';

const dots = ['red', 'yellow', 'green'];

interface IBrowserPaper {
  addressHref?: string;
}

export const BrowserPaper: React.FC<IBrowserPaper> = (props) => {
  const addressLink = props.addressHref ? (
    <MyLink className={css.link} href={props.addressHref}>
      {props.addressHref}
    </MyLink>
  ) : null;

  return (
    <Paper>
      <div className={css.browserPanel}>
        <div className={css.dotsWrapper}>
          {dots.map((color, i) => (
            <div key={i} className={css[color as keyof typeof cssExports]} />
          ))}
        </div>
        <div className={css.browserAddress}>{addressLink}</div>
      </div>
      {props.children}
    </Paper>
  );
};
