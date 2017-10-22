var router = require('express').Router()

if (process.env.ENV === 'DEV' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  var fakeSession = require('./helpers/fakeSession')
  router.use(fakeSession.middleware)
  router.get('/fake', fakeSession.route)
}

module.exports = router
  .use('/', require('./auth'))
  .use('/healthcheck', require('./healthcheck'))
