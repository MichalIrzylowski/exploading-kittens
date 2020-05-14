import React from 'react';
import ReactDOM from 'react-dom';
import injectFonts from 'typography-inject-fonts';

import { typography } from '@front/utils/typography';

import { App } from './app';

ReactDOM.hydrate(<App />, document.getElementById('app'));

typography.injectStyles();
injectFonts(typography);
