const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  apikey: {type: String, required: true},
  id: {type: Number, required: true},
  avatar: {type: String, required: true},
  username: {type: String, required: true}
}, {collection: 'users'})

module.exports = mongoose.model('User', UserSchema)
