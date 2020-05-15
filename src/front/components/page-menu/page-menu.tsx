import React from 'react';

import { Link } from 'react-router-dom';

import { MyLink } from '@front/components/my-link';
import { LayoutWrapper } from '@front/components/layout-wrapper';
import { Svg } from '@front/components/svg';
import * as links from '@front/links';

import { github, linkedIn, website } from '@front/images/svg';

import css from './page-menu.scss';

const size = 30;
const iconSize = {
  height: size,
  width: size,
};

export const PageMenu = () => {
  return (
    <nav className={css.menu}>
      <LayoutWrapper className={css.wrapper}>
        <h3 className={css.logo}>
          <Link to="/">
            <span className={css.exploading}>Exploading</span> kittens
          </Link>
        </h3>
        <div className={css.outLinks}>
          <MyLink href={links.mySite}>
            <Svg className={css.icon} {...iconSize}>
              {website}
            </Svg>
          </MyLink>
          <MyLink href={links.linkedin}>
            <Svg className={css.icon} {...iconSize}>
              {linkedIn}
            </Svg>
          </MyLink>
          <MyLink href={links.github}>
            <Svg className={css.icon} {...iconSize}>
              {github}
            </Svg>
          </MyLink>
        </div>
      </LayoutWrapper>
    </nav>
  );
};
