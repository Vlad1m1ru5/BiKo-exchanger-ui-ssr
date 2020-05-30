import '@babel/polyfill'
import App from './app'
import GlobalStyles from 'static/global-styles'
import React from 'react'
import theme from 'static/theme'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createAppStore } from 'store/index'
import { hydrate } from 'react-dom'

const store = createAppStore()

hydrate(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <GlobalStyles />
          </BrowserRouter>
      </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)