import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App/App.jsx';
import initI18n from './i18n';
import store from './slices/store.js';

const renderApp = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default async () => {
  await initI18n();
  renderApp();
};
