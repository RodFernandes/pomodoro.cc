if (!process.env.NOW_REGION) { require('dotenv').config() }

const monk = require('monk')

// console.log('process.env.MONGO_URL', process.env.MONGO_URL)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = monk(process.env.MONGO_URL)