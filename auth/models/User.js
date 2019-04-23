const db = require('../init/mongo')()

module.exports = db.get('users')
