const Booking = require('../../module/booking');
const Event = require('../../module/event');
const utils = require('../../common/utils')

const bookings = {
  name: 'bookings',
  type: 'Bookings!',
  resolve: async ({ context: { user, variables } }) => {
    try {
      const newVariables = utils.getVariables(variables)
      const methodSort = { [newVariables.orderField]: newVariables.orderBy };
      const query = { user : user._id }
      const count = await Booking.count(query);
      const bookings = await Booking.find(query).sort(methodSort).skip(newVariables.skip).limit(newVariables.limit);
      return { count, bookings }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const bookEvent = {
  name: 'bookEvent',
  type: 'Booking!',
  args: {
    eventId: 'ID!'
  },
  resolve: async ({ args: { eventId }, context: { user } }) => {
    try {
      const fetchedEvent = await Event.findById(eventId);
      if (!fetchedEvent) {
        return Promise.reject(new Error('The resource was not found!'))
      }
      const booking = new Booking({
        user: user._id,
        event: fetchedEvent
      });
      return await booking.save();
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const cancelBooking = {
  name: 'cancelBooking',
  type: 'Booking!',
  args: {
    bookingId: 'ID!'
  },
  resolve: async ({ args: { bookingId }, context: { user } }) => {
    try {
      const query = { _id : bookingId, user: user._id }
      const fetchedBooking = await Booking.findOne(query);
      if (!fetchedBooking) {
        return Promise.reject(new Error('The resource was not found!'))
      }
      await Booking.deleteOne(query);
      return fetchedBooking
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = {
  bookings,
  bookEvent,
  cancelBooking
}