const { schemaComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')

const Booking = require('../../module/booking')

const BookingTC = composeWithMongoose(Booking)

schemaComposer.createObjectTC({
  name: 'Bookings',
  fields: { count: 'Int!', bookings: '[Booking!]!' }
})

module.exports = BookingTC