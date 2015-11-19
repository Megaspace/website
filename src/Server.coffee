path = require 'path'
express = require 'express'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
morgan = require 'morgan'
Q = require 'q'

class Server
  initialize: (settings) ->
    @app = express()
    @app.use bodyParser.urlencoded extended: false
    @app.use bodyParser.json()
    @app.use cookieParser()
    @app.use morgan 'dev' if settings.enableLogging

    @app.use express.static path.join(__dirname, '..', 'public')
    @app.set 'view engine', 'jade'
    @app.set 'views', path.join(__dirname, '..', 'public', 'views')
    @app.use require('./middleware/decodeToken')(settings.secret)

    @app.get '/', (req, res) ->
      if req.decoded
        res.redirect '/game'
      else
        res.render 'index'

    @app.get '/game', (req, res) ->
      if req.decoded
        res.render 'game'
      else
        res.redirect '/'

  start: (port) ->
    deferred = Q.defer()
    @port = port
    @session = @app.listen port, () =>
      console.log "megaspace-website listening on #{port}"
      deferred.resolve()
    deferred.promise

  stop: () ->
    deferred = Q.defer()
    console.log "Stopping megaspace-website"
    @session.close()
    deferred.resolve()
    deferred.promise

module.exports = Server
