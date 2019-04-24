const app = require('../app')
const passport = require('passport')
const session = require('express-session')
const TwitterStrategy = require('passport-twitter').Strategy
const MongoStore = require('connect-mongo')(session)
const UserInfo = require('../modules/UserInfo')
const User = require('../models/User')

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'foo',
  cookie: {
    domain: '.pomodoro.cc',
    sameSite: false
  },
  store: new MongoStore({
    collection: 'sessions',
    url: process.env.MONGO_URL
  })
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
}, authenticatedUser))

function authenticatedUser (token, tokenSecret, profile, done) {
  var user = new UserInfo(profile).toJSON()

  User.findOne({ id: user.id })
    .then(user => {
      if (user) return done(null, user)
      User.insert(new UserInfo(profile))
        .then(user => {
          done(null, user)
        })
        .catch(err => {
          if (err) return done(err, null)
        })
    })
}

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// app.get('*', passport.authenticate('twitter'), (req, res) => {
//   delete req.session.passport
//   console.log('twitter user', req.user)
//   req.session.user = Object.assign({}, req.user)
//   res.redirect('https://pomodoro.cc')
// })

const redirectRoutes = { failureRedirect: 'https://pomodoro.cc', successRedirect: 'https://pomodoro.cc' }

app.get('/info', (req, res) => {
  console.log('res.user', res.user)
  console.log('res.session', res.session)
  res.send(res.user)
})
app.get('/twitter', passport.authenticate('twitter'))
app.get('/twitter/callback', passport.authenticate('twitter', redirectRoutes))
app.get('/github', passport.authenticate('github'))
app.get('/github/callback', passport.authenticate('github', redirectRoutes))

module.exports = app

// const passport = require('passport')
// const developmentRedirectRoutes = { failureRedirect: 'https://dev.pomodoro.cc', successRedirect: 'https://dev.pomodoro.cc' }
// const productionRedirectRoutes = { failureRedirect: 'https://pomodoro.cc', successRedirect: 'https://pomodoro.cc' }
// const redirectRoutes = (process.env.UP_STAGE === 'development' || process.env.NODE_ENV === 'development') ? developmentRedirectRoutes : productionRedirectRoutes

// router.get('/twitter', passport.authenticate('twitter'))
// router.get('/github', passport.authenticate('github'))

// router.get('/twitter/callback',
//   passport.authenticate('twitter', redirectRoutes))
// router.get('/github/callback',
//   passport.authenticate('github', redirectRoutes))

// module.exports = router
