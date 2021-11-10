const { schemaComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')

const Event = require('../../module/event')

const EventTC = composeWithMongoose(Event)

schemaComposer.createObjectTC({
  name: 'Events',
  fields: { count: 'Int!', events: '[Event!]!' }
})

module.exports = EventTC