require('dotenv').config()
const server = require('express')()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

console.log('env', process.env)
const { PORT = 3000 } = process.env
if (!process.env.NOW_REGION) {
  server.listen(PORT)
}
console.log(`listening @ https://auth.pomodoro.cc (PORT ${PORT})`)

console.log('MONGO_URL', process.env.MONGO_URL)
// require('./init/mongo')(process.env.MONGO_URL)
// require('./passport.init')(server)

server.use(morgan(':status\t :method\t :response-time ms\t :date[clf]\t :url\t\t'))
server.use(cors({
  origin: ['https://pomodoro.cc', 'http://beta.pomodoro.cc', 'https://beta.pomodoro.cc', 'https://app.pomodoro.cc', 'https://dev.pomodoro.cc', 'http://dev.pomodoro.cc', 'http://dev.pomodoro.cc:9000'],
  methods: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['cookie', 'with_credentials'],
  credentials: true
}))
server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(require('./routes'))
console.log('registered routes')
server.get('/', (req, res) => {
  res.sendStatus(200)
  res.end()
})

module.exports = server
