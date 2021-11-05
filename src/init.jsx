import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.jsx';
import initI18n from './i18n';

const renderApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('chat'),
  );
};

export default async () => {
  await initI18n();
  renderApp();
};
