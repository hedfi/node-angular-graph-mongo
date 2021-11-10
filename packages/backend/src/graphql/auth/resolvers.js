const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = require('../../module/user')

const signIn = {
  name: 'signIn',
  type: 'AccessToken!',
  args: {
    email: 'String!',
    password: 'String!'
  },
  resolve: async ({ args: { email, password } }) => {
    try {
      const user = await UserModel.emailExist(email)
      if (!user) {
        return Promise.reject(new Error('User not found.'))
      }

      const comparePassword = await user.comparePassword(password)
      if (!comparePassword) {
        return Promise.reject(new Error('Password is incorrect.'))
      }


      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
      })

      return { token, user }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const signUp = {
  name: 'signUp',
  type: 'AccessToken!',
  args: {
    email: 'String!',
    password: 'String!',
    firstName: 'String!',
    lastName: 'String!',
  },
  resolve: async ({ args: { email, password, firstName, lastName }, context: { i18n } }) => {
    try {
      let user = await UserModel.emailExist(email)
      if (user) {
        return Promise.reject(new Error('Email has already been taken.'))
      }

      const hash = bcrypt.hashSync(password, 10)

      user = await new UserModel({
        email,
        firstName,
        lastName,
        password: hash,
        locale: i18n.language
      }).save()

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
      })


      return { token, user }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}


module.exports = {
  signIn,
  signUp
}
