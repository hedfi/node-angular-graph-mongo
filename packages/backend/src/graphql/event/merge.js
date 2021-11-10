const EventTC = require('./types')
const resolvers = require('./resolvers')

for (const resolver in resolvers) {
  EventTC.addResolver(resolvers[resolver])
}

module.exports = EventTC
