import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { render } from 'react-dom';
import init from './init.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const run = async () => {
  const ReactElement = await init();
  render(ReactElement, document.getElementById('chat'));
};

run();
