const jwt = require('jsonwebtoken')

module.exports = (secret) =>
  (req, res, next) => {
    let token
    if (!token && !req.body) token = req.body.token
    if (!token && !req.query) token = req.query.token
    if (!token && !req.cookies) token = req.cookies.token
    if (!token && !req.header) token = req.headers['x-access-token']

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) throw err
        req.decoded = decoded
        next()
      })
    }

    next()
  }
