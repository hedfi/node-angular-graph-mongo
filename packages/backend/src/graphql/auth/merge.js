const UserTC = require('./types')
const resolvers = require('./resolvers')

for (const resolver in resolvers) {
  UserTC.addResolver(resolvers[resolver])
}

module.exports = UserTC
