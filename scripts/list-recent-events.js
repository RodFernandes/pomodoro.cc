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
    return Event.find({ _id: param }).then(console.log)
  }

  const events = await Event.find({}, { limit: 250, sort: { createdAt: -1 } })
  events
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach(e => {
      let value = e.email || e.customerId || (e.user && e.user.username)
      if (e.name === 'createUserSucceeded') {
        value = e.user && e.user.username
      }
      if (e.name === 'userAuthenticated') {
        value = e.user && e.user.username
      }
      if (e.name === 'createPomodoro') {
        value = e.user && e.user.username
      }
      if (e.name === 'pomodoroFailedValidation') {
        value = `${e.user && e.user.username}\n\terrors ${(e.errors || []).join(', ')}\n\tpomodoro: ${JSON.stringify(e.pomodoro || {})}`
      }

      console.log(`${e.createdAt} ${e.name} -> ${value} (${e._id})`)
    })
}
