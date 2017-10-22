const db = require('../init/mongo')()

// const UserSchema = new mongoose.Schema({
//   apikey: {type: String, required: true},
//   id: {type: Number, required: true},
//   avatar: {type: String, required: true},
//   username: {type: String, required: true}
// }, {collection: 'users'})

module.exports = db.get('User')
