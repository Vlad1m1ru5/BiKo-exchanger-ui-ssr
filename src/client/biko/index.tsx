import React from 'react'
import { hydrate } from 'react-dom'
import App from './app'
import { configureStore } from 'store/index'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import theme from 'static/theme'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

hydrate(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)