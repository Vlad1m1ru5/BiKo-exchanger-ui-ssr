import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import { MongoClient } from 'mongodb'
import { filesRouter, usersRouter } from './routes'

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.json())

app.use('/api/files', filesRouter)
app.use('/api/users', usersRouter)

const port = process.env.PORT || 3030;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});