const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const Promise = require('bluebird')

let _app
let _port
let _session

const initialize = (settings) => {
  _app = express()
  _app.use(bodyParser.urlencoded({extended: false}))
  _app.use(bodyParser.json())
  _app.use(cookieParser())
  if (settings.enableLogging) _app.use(morgan('dev'))

  _app.use(express.static(path.join(__dirname, '..', 'public')))
  _app.set('view engine', 'jade')
  _app.set('views', path.join(__dirname, '..', 'public', 'views'))
  _app.use(require('./middleware/decodeToken')(settings.secret))

  _app.get('/', (req, res) => {
    if (req.decoded) {
      res.redirect('/game')
    } else {
      res.render('index')
    }
  })

  _app.get('/game', (req, res) => {
    if (req.decoded) {
      res.render('game')
    } else {
      res.redirect('/')
    }
  })
}

const start = (port) => {
  const deferred = Promise.defer()
  _port = port
  _session = _app.listen(port, () => {
    console.log(`megaspace-website listening on ${_port}`)
    deferred.resolve()
  })
  deferred.promise
}

const stop = () => {
  const deferred = Promise.defer()
  console.log('Stopping megaspace-website')
  _session.close()
  deferred.resolve()
  deferred.promise
}

module.exports.initialize = initialize
module.exports.start = start
module.exports.stop = stop
