const jwt = require('jsonwebtoken')

const User = require('../module/user')

const authentication = async (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req
    if (!authorization) {
      return next()
    }

    const token = authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return next()
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return next()
    }

    Object.assign(req, {
      user,
      token
    })

    return next()
  } catch (error) {
    return next()
  }
}

module.exports = authentication
