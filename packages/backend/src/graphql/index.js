const { graphqlHTTP } = require('express-graphql')

const schema = require('../graphql/schema')

module.exports = graphqlHTTP(async request => ({
  schema,
  graphiql: true,
  context: {
    user: request.user,
    headers: request.headers,
    variables: request.body.variables,
    i18n: request.i18n
  }
}))
