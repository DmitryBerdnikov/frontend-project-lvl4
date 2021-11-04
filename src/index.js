// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import init from './init.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();
