import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import biko from 'routes/biko';

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.use('/biko', biko);

const port = process.env.PORT || 3030;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});