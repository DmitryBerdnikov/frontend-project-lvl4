import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/App/App.jsx';
import initI18n from './i18n';
import store from './slices/store.js';

const rollbarConfig = {
  accessToken: 'dc8ee9e9772d4043bf6f9899faa16ed9',
  environment: 'production',
};

const renderApp = () => {
  render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>,
    document.getElementById('chat'),
  );
};

export default async () => {
  await initI18n();
  renderApp();
};
