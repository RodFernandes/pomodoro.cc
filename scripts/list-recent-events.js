#!/usr/bin/env node

const Event = require('../api/models/Event')

if (require.main === module) {
  main(process.argv[2])
    .then(res => {
      console.log(res)
      process.exit(0)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

module.exports = main

async function main (param) {
  if (param) {
    return Event.find({_id: param}).then(console.log)
  }

  const events = await Event.find({}, { limit: 50, sort: { createdAt: 1 } })
  events.forEach(e => {
    let value = e.email || e.customerId
    if (e.name === 'createUserSucceeded') {
      value = e.user && e.user.username
    }
    console.log(`${e.createdAt} ${e.name} -> ${value} (${e._id})`)
  })
}
