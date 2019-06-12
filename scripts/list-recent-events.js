#!/usr/bin/env node

const Event = require('../api/models/Event')
const chalk = require('chalk')
const stringToColor = require('string-to-color')

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
      const createdAt = e.createdAt
      const username = e.user && e.user.username
      const eventName = e.name
      let additionalInfo = ''

      if (e.name === 'createUserSucceeded') {
        additionalInfo = e.user && e.user.username
      }
      if (e.name === 'userAuthenticated') {
        additionalInfo = e.user && e.user.username
      }
      if (e.name === 'createPomodoro') {
        additionalInfo = e.user && e.user.username
      }
      if (e.name === 'pomodoroFailedValidation') {
        additionalInfo = `${e.user && e.user.username}\n\terrors: ${(e.errors || []).join(', ')}\n\tpomodoro: ${JSON.stringify(e.pomodoro || {})}`
      }

      console.log(`${chalk.blue(createdAt)} ${chalk.white(e._id)} ${chalk.hex(stringToColor(eventName)).bold(eventName)} by user ${chalk.yellow(username)} ${additionalInfo}`)
    })
}
