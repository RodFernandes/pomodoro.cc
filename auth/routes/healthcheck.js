let router = require('express').Router()
if (!process.env.NOW && !process.env.now) {
  router = require('..')
}

router.get('/', function (req, res) {
  res.end()
})

module.exports = router
