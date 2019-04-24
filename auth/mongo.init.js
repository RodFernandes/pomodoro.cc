require('dotenv').config()
const monk = require('monk')
let db

module.exports = function (url) {
  if (!db) db = monk(url)
  return db
}
