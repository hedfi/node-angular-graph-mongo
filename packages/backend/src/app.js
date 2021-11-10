require('./common/module-alias');

const express = require('express')
const cors = require('cors')


require('dotenv').config()

const { i18next, i18nextMiddleware } = require('./i18n')

const authentication = require('./middleware/authentication')
const graphql = require('./graphql')

const LoggerService = require('./services/logger.service');
const logger = new LoggerService('app')


const app = express()

app.use(
  '/graphql',
  express.json(),
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
  }),
  i18nextMiddleware.handle(i18next),
  authentication,
  graphql
)

app.use('*', (req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(process.env.APP_PORT, () => {
  logger.info('Initializing express')
})