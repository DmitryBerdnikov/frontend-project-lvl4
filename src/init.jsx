import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import App from './App.jsx';
import store from './slices/store.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
};

console.log(process.env.NODE_ENV);

export default async (socket) => {
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
            <App socket={socket} />
          </I18nextProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
