import App from 'client/biko/app'
import React from 'react'
import express from 'express'
import hbs from 'handlebars'
import theme from 'static/theme'
import { Provider } from 'react-redux'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { StaticRouter } from 'react-router'
import { createAppStore } from 'store/index'
import { renderToString } from 'react-dom/server'

const router = express.Router();

router.get('/', async (req, res) => {
  const template = `
    <html>
    <head>
      <title>biko</title>
      {{{styles}}}
    </head>
    <body>
      <div id='app'>{{{app}}}</div>
      <script src='/app.js' charset='utf-8'></script>
    </body>
    </html>
  `;

  const sheet = new ServerStyleSheet();
  const store = createAppStore();

  const app = renderToString(sheet.collectStyles(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StaticRouter>
          <App />
        </StaticRouter>
      </ThemeProvider>
    </Provider>
  ));

  const styles = sheet.getStyleTags();
  const hbsTemplate = hbs.compile(template);

  const htmlToSend = hbsTemplate({ 
    app,
    styles
  });

  res.send(htmlToSend);
});

export default router;