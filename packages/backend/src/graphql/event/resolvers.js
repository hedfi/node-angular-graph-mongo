const Event = require('../../module/event');
const utils = require('../../common/utils')

const events = {
  name: 'events',
  type: 'Events!',
  resolve: async ({ context: { variables } }) => {
    try {
      const newVariables = utils.getVariables(variables)
      const methodSort = { [newVariables.orderField]: newVariables.orderBy };
      const query = {}
      if (newVariables.searchText) {
        query['$or'] = [
          { 'title': { '$regex': new RegExp(newVariables.searchText, 'i') } },
          { 'description': { '$regex': new RegExp(newVariables.searchText, 'i') } }
        ]
      }
      const count = await Event.count(query);
      const events = await Event.find(query).sort(methodSort).skip(newVariables.skip).limit(newVariables.limit);
      return { count, events }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const privateEvents = {
  name: 'privateEvents',
  type: 'Events!',
  resolve: async ({ context: { user, variables } }) => {
    try {
      const newVariables = utils.getVariables(variables)
      const methodSort = { [newVariables.orderField]: newVariables.orderBy };
      const query = { creator : user._id }
      const count = await Event.count(query);
      if (newVariables.searchText) {
        query['$or'] = [
          { 'title': { '$regex': new RegExp(newVariables.searchText.toLowerCase(), 'i') } },
          { 'description': { '$regex': new RegExp(newVariables.searchText.toLowerCase(), 'i') } }
        ]
      }
      const events = await Event.find(query).sort(methodSort).skip(newVariables.skip).limit(newVariables.limit);
      return { count, events }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const event = {
  name: 'event',
  type: 'Event!',
  args: {
    eventId: 'ID!',
  },
  resolve: async ({ args: { eventId } }) => {
    try {
      return await Event.findById(eventId)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const createEvent = {
  name: 'createEvent',
  type: 'Event!',
  args: {
    title: 'String!',
    description: 'String!',
    price: 'Float!',
    date: 'String!',
  },
  resolve: async ({ args: { title, description, price, date }, context: { user } }) => {
    try {
      const event = new Event({
        title,
        description,
        price,
        date: new Date(parseInt(date)).toUTCString(),
        creator: user._id
      });
      return await event.save();
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const deleteEvent = {
  name: 'deleteEvent',
  type: 'Event!',
  args: {
      eventId: 'ID!'
  },
  resolve: async ({ args: { eventId }, context: { user } }) => {
    try {
      let currentEvent = await Event.findOne({ _id: eventId, creator: user._id})
      if(!currentEvent) {
        return Promise.reject(new Error('The resource was not found!'))
      }
      return await Event.findByIdAndDelete(eventId)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
const editEvent = {
  name: 'editEvent',
  type: 'Event!',
  args: {
    eventId: 'ID!',
    title: 'String',
    description: 'String',
    price: 'Float',
    date: 'String',
  },
  resolve: async ({ args: { eventId, title, description, price, date }, context: { user } }) => {
    try {
      let currentEvent = await Event.findOne({ _id: eventId, creator: user._id})
      if(!currentEvent) {
        return Promise.reject(new Error('The resource was not found!'))
      }
      const payload = {}
      if(title) payload.title = title
      if(description) payload.description = description
      if(price) payload.price = price
      if(date) payload.date = date
      return await Event.findByIdAndUpdate(eventId, payload, {
        new: true
      });
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = {
  event,
  events,
  privateEvents,
  createEvent,
  deleteEvent,
  editEvent
}