const winston = require('winston')
require('winston-daily-rotate-file');
const colors = require('colors');

dateFormat = () => {
  return new Date(Date.now()).toUTCString()
}
const transportConsole = new winston.transports.Console()
let transports = [
  transportConsole
]
const myCustomLevels = {
  levels: {
    info: 0,
    debug: 1,
    warn: 2,
    error: 3,
    mongo: 4
  }
};
let customColor = (level, message) => {
  switch(level) {
    case 'info':
      return colors.blue(message)
    case 'debug':
      return colors.cyan(message)
    case 'warn':
      return colors.yellow(message)
    case 'error':
      return colors.red(message)
    case 'mongo':
      return colors.cyan(message)
  }
};
let customBackground = (level, message) => {
  if(level === 'error') {
    return colors.inverse.red(message)
  }
  return colors.inverse(message)
};

class LoggerService {
  constructor(route) {
    let customFormat = winston.format.combine(
      winston.format.printf((info) => {
        let message = `${customBackground(info.level, dateFormat())} | ${customColor(info.level, info.level.toUpperCase())} | ${route}.log | ${info.message} | `
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
        message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
        return message
      })
    )
    if (process.env.NODE_ENV === 'production') {
      const transportFile = new winston.transports.DailyRotateFile({
        format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
        filename: `./logs/events-%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      });
      transports.push(transportFile)
      customFormat = winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
        message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
        return message
      })
    }
    this.log_data = null
    this.route = route
    const logger = winston.createLogger({
      level: 'mongo',
      levels: myCustomLevels.levels,
      transports: transports,
      format: customFormat,
      prettyPrint: true
    });
    this.logger = logger
  }
  setLogData(log_data) {
    this.log_data = log_data
  }
  async info(message) {
    this.logger.log('info', message);
  }
  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    })
  }
  async debug(message) {
    this.logger.log('debug', message);
  }
  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj
    })
  }
  async error(message) {
    this.logger.log('error', message);
  }
  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    })
  }
  async warn(message) {
    this.logger.log('warn', message);
  }
  async warn(message, obj) {
    this.logger.log('warn', message, {
      obj
    })
  }
  async mongo(message) {
    this.logger.log('mongo', message);
  }
  async mongo(message, obj) {
    this.logger.log('mongo', message, {
      obj
    })
  }
}
module.exports = LoggerService