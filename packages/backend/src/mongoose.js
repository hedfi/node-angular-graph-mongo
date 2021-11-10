const mongoose = require('mongoose')
const LoggerService = require('./services/logger.service')
const logger = new LoggerService('app')
mongoose.connect(`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => logger.error('Mongoose connection error:' + error))

mongoose.set("debug", (collectionName, method, query, doc) => {
  logger.mongo(`${collectionName}.${method}.${JSON.stringify(query)}.${JSON.stringify(doc)}`, JSON.stringify(query), doc);
});
mongoose.connection.on('open', () => logger.mongo('Mongoose connected to db'))

module.exports = mongoose
