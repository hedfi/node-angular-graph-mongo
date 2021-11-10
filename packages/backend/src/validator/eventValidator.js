const validator = require('validator')
const mongoose = require('mongoose')

const eventValidator = {
  createEvent: async (resolve, source, args, context, info) => {
    let { title, description, price } = args

    if (!validator.isLength(title, { min: 4 })) {
      return Promise.reject(new Error('Error: title'))
    }
    if (!validator.isLength(description, { min: 4 })) {
      return Promise.reject(new Error('Error: description'))
    }
    if (!validator.isFloat(price.toString())) {
      return Promise.reject(new Error('Error: price'))
    }

    return resolve(source, args, context, info)
  },
  deleteEvent: async (resolve, source, args, context, info) => {
    let { eventId } = args

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return Promise.reject(new Error('Error: eventId'))
    }

    return resolve(source, args, context, info)
  },
  editEvent: async (resolve, source, args, context, info) => {
    let { eventId, title, description, price } = args
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return Promise.reject(new Error('Error: eventId'))
    }
    if (title && !validator.isLength(title, { min: 4 })) {
      return Promise.reject(new Error('Error: title'))
    }
    if (description && !validator.isLength(description, { min: 4 })) {
      return Promise.reject(new Error('Error: description'))
    }
    if (price && !validator.isFloat(price.toString())) {
      return Promise.reject(new Error('Error: price'))
    }
    return resolve(source, args, context, info)
  },
}

module.exports = { eventValidator }
