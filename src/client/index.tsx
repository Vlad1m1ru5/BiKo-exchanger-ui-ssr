import App from './app'
import GlobalStyles from 'static/global-styles'
import React from 'react'
import theme from 'static/theme'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createAppStore } from 'store/index'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

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