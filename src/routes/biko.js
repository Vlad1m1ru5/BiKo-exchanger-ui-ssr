import express from "express";
import App from "../client/app";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";
import { ServerStyleSheet } from "styled-components";

const router = express.Router();

const template = `
    <html>
    <head>
      <title>biko</title>
      {{{styles}}}
    </head>
    <body>
      <div id="app">{{{app}}}</div>
      <script src="/app.js" charset="utf-8"></script>
      <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
  `;

router.get("/", async (req, res) => {
  const hbsTemplate = hbs.compile(template);
  const sheet = new ServerStyleSheet()
  const app = renderToString(sheet.collectStyles(<App />));
  const styles = sheet.getStyleTags()
  const htmlToSend = hbsTemplate({ app, styles });

  res.send(htmlToSend);
});

export default router;