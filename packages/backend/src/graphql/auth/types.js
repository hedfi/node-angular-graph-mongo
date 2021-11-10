const { schemaComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')

const UserModel = require('../../module/user')

const UserTC = composeWithMongoose(UserModel).removeField('password')

schemaComposer.createObjectTC({
  name: 'AccessToken',
  fields: { token: 'String!', user: 'User!' }
})

schemaComposer.createEnumTC({
  name: 'Locale',
  values: {
    en: { value: 'en' },
    ge: { value: 'ge' }
  }
})

module.exports = UserTC
