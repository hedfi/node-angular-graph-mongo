const { schemaComposer } = require('graphql-compose')

require('../graphql/types')

const { authMiddleware: middleware } = require('../middleware')
const { userValidator, eventValidator } = require('../validator')
const { UserTC } = require('./auth')
const { EventTC } = require('./event')
const { BookingTC } = require('./booking')

schemaComposer.Query.addFields({
  event: EventTC.getResolver('event', [middleware.isAuth]),
  events: EventTC.getResolver('events', [middleware.isAuth]),
  privateEvents: EventTC.getResolver('privateEvents', [middleware.isAuth]),
  bookings: BookingTC.getResolver('bookings', [middleware.isAuth])
})

schemaComposer.Mutation.addFields({
  signIn: UserTC.getResolver('signIn', [middleware.isGuest, userValidator.signIn]),
  signUp: UserTC.getResolver('signUp', [middleware.isGuest, userValidator.signUp]),
  createEvent: EventTC.getResolver('createEvent', [middleware.isAuth, eventValidator.createEvent]),
  deleteEvent: EventTC.getResolver('deleteEvent', [middleware.isAuth, eventValidator.deleteEvent]),
  editEvent: EventTC.getResolver('editEvent', [middleware.isAuth, eventValidator.editEvent]),
  bookEvent: BookingTC.getResolver('bookEvent', [middleware.isAuth]),
  cancelBooking: BookingTC.getResolver('cancelBooking', [middleware.isAuth])
})

const schema = schemaComposer.buildSchema()

module.exports = schema
