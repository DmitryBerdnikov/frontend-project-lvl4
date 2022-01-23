import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import App from './components/App/App.jsx';
import store from './slices/store.js';

const rollbarConfig = {
  accessToken: 'dc8ee9e9772d4043bf6f9899faa16ed9',
  environment: 'production',
};

export default async () => {
  const i18nInstance = i18n.createInstance();

  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    resources,
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <I18nextProvider>
            <App />
          </I18nextProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
