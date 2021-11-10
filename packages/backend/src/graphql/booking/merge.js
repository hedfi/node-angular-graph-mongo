const BookingTC = require('./types')
const resolvers = require('./resolvers')

for (const resolver in resolvers) {
  BookingTC.addResolver(resolvers[resolver])
}

module.exports = BookingTC
