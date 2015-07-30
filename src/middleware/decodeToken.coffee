jwt = require 'jsonwebtoken'

module.exports = (secret) ->
  (req, res, next) ->
    token = req.body.token if not token? and req.body?
    token = req.query.token if not token? and req.query?
    token = req.cookies.token if not token? and req.cookies?
    token = req.headers['x-access-token'] if not token? and req.headers?

    if token
      jwt.verify token, secret, (err, decoded) ->
        req.decoded = decoded unless err?
        next()
    else
      next()
