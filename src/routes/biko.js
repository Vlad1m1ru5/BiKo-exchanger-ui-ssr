import express from "express";
import App from "client/biko/app";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";
import { ServerStyleSheet } from "styled-components";
import { createAppStore } from "store";
import { Provider } from "react-redux";

const router = express.Router();

router.get("/", async (req, res) => {
  const template = `
    <html>
    <head>
      <title>biko</title>
      {{{styles}}}
    </head>
    <body>
      <div id="app">{{{app}}}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML: https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = {{{preloadedState}}};
      </script>
      <script src="/app.js" charset="utf-8"></script>
      <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
  `;

  const sheet = new ServerStyleSheet();
  const store = createAppStore();

  const app = renderToString(sheet.collectStyles(
    <Provider store={store}>
      <App />
    </Provider>
  ));

  const preloadedState = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const styles = sheet.getStyleTags();
  const hbsTemplate = hbs.compile(template);

  const htmlToSend = hbsTemplate({ 
    app,
    preloadedState,
    styles
  });

  res.send(htmlToSend);
});

export default router;