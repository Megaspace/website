express = require 'express'
bodyParser = require 'body-parser'
morgan = require 'morgan'
Q = require 'q'

class Server
  initialize: (settings) ->
    @app = express()
    @app.use bodyParser.urlencoded extended: false
    @app.use bodyParser.json()
    @app.use morgan 'dev' if settings.enableLogging

    @app.use(express.static('public'));
    @app.set('view engine', 'jade');
    @app.set('views', 'public/views')

    @app.get '/', (req, res) -> res.render 'index', title: 'Hey', message: 'Hello there!'

    #@app.use '/authenticate', require('./endpoints/authenticate')(settings.secret)

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
