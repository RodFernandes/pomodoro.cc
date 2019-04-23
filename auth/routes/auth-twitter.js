let router = require('express').Router()
// if (!process.env.NOW_REGION) {
//   console.log('in now environment')
//   router = require('..')
// } else {
//   console.log('not in now environment')
// }
const passport = require('passport')
const developmentRedirectRoutes = { failureRedirect: 'https://dev.pomodoro.cc', successRedirect: 'https://dev.pomodoro.cc' }
const productionRedirectRoutes = { failureRedirect: 'https://pomodoro.cc', successRedirect: 'https://pomodoro.cc' }
const redirectRoutes = (process.env.UP_STAGE === 'development' || process.env.NODE_ENV === 'development') ? developmentRedirectRoutes : productionRedirectRoutes

router.get('/twitter', passport.authenticate('twitter'))
router.get('/github', passport.authenticate('github'))

router.get('/twitter/callback',
  passport.authenticate('twitter', redirectRoutes))
router.get('/github/callback',
  passport.authenticate('github', redirectRoutes))

module.exports = router
