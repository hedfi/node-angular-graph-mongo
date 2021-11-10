const validator = require('validator')

const userValidator = {
  signIn: async (resolve, source, args, context, info) => {
    let { email } = args

    email = validator.normalizeEmail(email)
    email = validator.trim(email)

    Object.assign(args, { email })

    return resolve(source, args, context, info)
  },
  signUp: async (resolve, source, args, context, info) => {
    let { email } = args

    email = validator.normalizeEmail(email)
    email = validator.trim(email)

    Object.assign(args, { email })

    const { password } = args

    if (!validator.isEmail(email, { allow_utf8_local_part: false })) {
      return Promise.reject(new Error('Error: email'))
    }

    if (!validator.isLength(password, { min: 6 })) {
      return Promise.reject(new Error('Error: password'))
    }

    return resolve(source, args, context, info)
  }
}

module.exports = { userValidator }
