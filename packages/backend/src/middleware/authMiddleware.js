const authMiddleware = {
  isAuth: async (resolve, source, args, context, info) => {
    const { user } = context
    if (!user) {
      return Promise.reject(new Error('You must be authorized.'))
    }

    return resolve(source, args, context, info)
  },

  isGuest: async (resolve, source, args, context, info) => {
    const { user } = context

    if (user) {
      return Promise.reject(new Error('You have already authorized.'))
    }

    return resolve(source, args, context, info)
  },
}

module.exports = { authMiddleware }
