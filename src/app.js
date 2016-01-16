'use strict'
require('use-strict')

require('service-registry-js')({
  name: 'website'
})

const path = require('path')
const config = require('yaml-config')
const settings = config.readConfig(path.join(__dirname, '..', 'config.yaml'))

const server = require('./server')
server.initialize(settings)
server.start(settings.server.port)

process.on('SIGINT', () => {
  server.stop()
  process.exit()
})
