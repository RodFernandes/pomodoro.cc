const router = require('express').Router()
const passport = require('passport')
const developmentRedirectRoutes = {failureRedirect: 'https://dev.pomodoro.cc', successRedirect: 'https://dev.pomodoro.cc'}
const productionRedirectRoutes = {failureRedirect: 'https://pomodoro.cc', successRedirect: 'https://pomodoro.cc'}
const redirectRoutes = (process.env.UP_STAGE === 'development' || process.env.NODE_ENV === 'development') ? developmentRedirectRoutes : productionRedirectRoutes
const User = require('../models/User')

router.get('/twitter', passport.authenticate('twitter'))
router.get('/github', passport.authenticate('github'))

router.get('/twitter/callback',
  passport.authenticate('twitter', redirectRoutes))
router.get('/github/callback',
  passport.authenticate('github', redirectRoutes))

router.get('/info', function (req, res) {
  console.info('req.headers', req.headers)
  console.info('redirectRoutes', redirectRoutes)
  console.log('process.env.NODE_ENV, process.env.UP_STAGE', process.env.NODE_ENV, process.env.UP_STAGE)
  if (req.user) {
    res.json(req.user)
    return res.end()
  }

  var authorizationHeader = req.get('Authorization')
  if (!authorizationHeader) return unauthorized(res)

  var apikey = authorizationHeader.match(/token (.*)/)
  apikey = apikey ? apikey[1] : apikey

  if (!apikey) return unauthorized(res)

  User.findOne({apikey: apikey}, function (err, user) {
    if (err) {
      return unauthorized(res)
    }
    res.json(user)
    return res.end()
  })
  /*
  HTTP/1.1 200 OK
  {
    "_id":"f4k31df4k31d",
    "apikey": "f4k34p1k3y",
    "id": 123456,
    "avatar": "https://avatars.githubusercontent.com/u/2662706?v=3",
    "username": "christian-fei",
    "__v":0
  }
  */
})

function unauthorized (res) {
  res.writeHead(401)
  return res.end()
}

router.get('/logout', function (req, res) {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
