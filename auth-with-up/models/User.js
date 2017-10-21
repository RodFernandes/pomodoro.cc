const {model, Schema} = require('mongoose')

const UserSchema = new Schema({
  apikey: {type: String, required: true},
  id: {type: Number, required: true},
  avatar: {type: String, required: true},
  username: {type: String, required: true}
}, {collection: 'users'})

module.exports = model('User', UserSchema)
