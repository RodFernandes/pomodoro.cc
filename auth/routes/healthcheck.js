let router = require('express').Router()
if (!process.env.NOW_REGION) {
  console.log('in now environment')
  router = require('..')
} else {
  console.log('not in now environment')
}

router.get('/', function (req, res) {
  res.end()
})

module.exports = router
