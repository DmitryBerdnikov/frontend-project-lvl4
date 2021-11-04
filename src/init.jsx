import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App.jsx';

const renderApp = () => {
  render(
    <App />,
    document.getElementById('chat'),
  );
};

export default () => {
  renderApp();
};
