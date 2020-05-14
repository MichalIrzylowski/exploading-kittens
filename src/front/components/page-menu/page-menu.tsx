import React from 'react';

import { Link } from 'react-router-dom';

import { MyLink } from '@front/components/my-link';
import { LayoutWrapper } from '@front/components/layout-wrapper';
import { Svg } from '@front/components/svg';
import github from '@front/images/svg/github.svg';
import linkedIn from '@front/images/linkedin.svg';

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
        <h3>
          <Link to="/">Exploading kittends</Link>
        </h3>
        <MyLink href="https://github.com/MichalIrzylowski">
          <Svg className={css.icon} {...iconSize}>
            {github}
          </Svg>
        </MyLink>
      </LayoutWrapper>
    </nav>
  );
};
