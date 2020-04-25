import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';
import { createAppStore } from 'store/index';
import { Provider } from 'react-redux';

// const preloadedState = window.__PRELOADED_STATE__;
// delete window.__PRELOADED_STATE__;

// const store = configureStore(preloadedState)
const store = createAppStore()

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);