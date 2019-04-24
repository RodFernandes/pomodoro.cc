const db = require('../mongo.init')(process.env.MONGO_URL)

module.exports = db.get('users')
