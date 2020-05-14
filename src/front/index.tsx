import React from 'react';
import ReactDOM from 'react-dom';
// import injectFonts from 'typography-inject-fonts';

import { App } from './app';

ReactDOM.hydrate(<App />, document.getElementById('app'));
