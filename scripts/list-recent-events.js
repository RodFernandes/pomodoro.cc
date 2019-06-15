#!/usr/bin/env node

const Event = require('../api/models/Event')
const chalk = require('chalk')
const stringToColor = require('string-to-color')

if (require.main === module) {
  main({ _id: process.argv[2] })
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

async function main ({ _id }) {
  if (_id) {
    return Event.findOne({ _id: _id }).then(printEvent)
  }

  const events = await Event.find({}, { limit: 250, sort: { createdAt: -1 } })
  events
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach(printEvent)
}

function printEvent (e) {
  console.log(eventToString(e))
}

function eventToString (e) {
  const createdAt = e.createdAt
  const username = e.user && e.user.username
  const eventName = e.name
  const additionalInfo = additionalInfoFor(e)
  const userId = e.user && e.user._id

  return `${chalk.blue(createdAt)} ${chalk.white(e._id)} ${chalk.hex(stringToColor(eventName)).bold(eventName)} by user ${chalk.yellow(username)} ${userId} ${additionalInfo}`
}

function additionalInfoFor (e) {
  if (e.name === 'createUserSucceeded') {
    return ''
  }
  if (e.name === 'userAuthenticated') {
    return ''
  }
  if (e.name === 'createPomodoro') {
    return ''
  }
  if (e.name === 'pomodoroFailedValidation') {
    return `\n\terrors: ${(e.errors || []).join(', ')}\n\tpomodoro: ${JSON.stringify(e.pomodoro || {})}`
  }
  return ''
}
