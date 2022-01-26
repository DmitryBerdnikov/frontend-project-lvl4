import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import io from 'socket.io-client';
import { render } from 'react-dom';
import initApp from './init.jsx';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const socket = io();
  const ReactElement = await initApp(socket);
  render(ReactElement, document.getElementById('chat'));
};

runApp();
