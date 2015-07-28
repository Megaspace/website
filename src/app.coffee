path = require 'path'
config = require 'yaml-config'
settings = config.readConfig path.join(__dirname, '..', 'config.yaml')

Server = require './Server'
server = new Server
server.initialize settings
server.start settings.server.port

process.on 'SIGINT', () ->
  server.stop()
  process.exit()
