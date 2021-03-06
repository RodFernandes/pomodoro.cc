const { Router } = require('express')
const monk = require('monk')
const router = Router()
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(utc)
dayjs.extend(weekOfYear)

module.exports = router

const Pomodoro = require('../models/Pomodoro')
const Todo = require('../models/Todo')
const logger = require('pino')()

router.get('/analytics', async (req, res) => {
  logger.info('get analytics', req.user)
  if (!req.user) return res.sendStatus(401).end()

  const analytics = await getAnalytics(req)
  return res.json(analytics || [])
})

async function getAnalytics (req) {
  const pomodoros = await aggregate({ collection: Pomodoro, userId: req.user._id, field: 'startedAt' })
  const todos = await aggregate({ collection: Todo, userId: req.user._id, field: 'completedAt' })
  const availableDays = Array.from(new Set([...pomodoros.map(p => p.day), ...todos.map(p => p.day)]))
    .filter(Boolean)
    .filter(d => d.startsWith('2'))

  console.log('availableDays', JSON.stringify(availableDays))

  const data = availableDays.map((day) => {
    return {
      day,
      pomodoros: (pomodoros.find(d => d.day === day) || {}).docs || [],
      todos: (todos.find(d => d.day === day) || {}).docs || []
    }
  })

  const analytics = prepareAnalytics(data)

  console.log('analytics', JSON.stringify(analytics))
  logger.info('analytics', analytics)
  return analytics
}

async function aggregate ({ collection, userId, field = 'startedAt' }) {
  return collection.aggregate(
    [
      {
        $match: {
          userId: monk.id(userId)
        }
      }, {
        $project: {
          doc: '$$ROOT',
          year: { $substr: [`$${field}`, 0, 4] },
          month: { $substr: [`$${field}`, 5, 2] },
          day: { $substr: [`$${field}`, 8, 2] }
        }
      }, {
        $group: {
          _id: {
            year: '$year',
            month: '$month',
            day: '$day'
          },
          docs: {
            $push: '$doc'
          }
        }
      }, {
        $project: {
          _id: 0,
          day: {
            $concat: ['$_id.year', '-', '$_id.month', '-', '$_id.day']
          },
          docs: '$docs'
        }
      }, {
        $sort: {
          day: -1
        }
      }
    ]
  )
}

function prepareAnalytics (analytics) {
  const datesList = []
  analytics.sort((a, b) => a.day.localeCompare(b.day))
  if (analytics.length === 0) return []
  const start = dayjs(analytics[0].day)
  const end = dayjs(analytics[analytics.length - 1].day)
  const diffInDays = Math.abs(end.diff(start, 'day'))
  for (let i = 1; i <= diffInDays + 1; i++) {
    const day = start.add(i, 'days')
    datesList.push(day.toISOString().substr(0, 10))
  }
  const dataWithEmptyDays = datesList.reduce((acc, day) => {
    const daily = analytics.find(d => d.day === day) || { day: day, pomodoros: [], todos: [] }
    return acc.concat([daily])
  }, [])

  const maxPomodoros = Math.max(...dataWithEmptyDays.map(d => d.pomodoros.length))
  const maxTodos = Math.max(...dataWithEmptyDays.map(d => d.todos.length))

  return dataWithEmptyDays.map(d => Object.assign(d, {
    // todos: undefined,
    // pomodoros: undefined,
    countPomodoros: d.pomodoros.length,
    countTodos: d.todos.length,
    percentagePomodoros: d.pomodoros.length / Math.max(maxPomodoros, 1),
    percentageTodos: d.todos.length / Math.max(maxTodos, 1)
  }))
    .sort((a, b) => b.day.localeCompare(a.day))
    .filter(({ day }) => day.localeCompare(new Date().toISOString().substring(0, 10)) <= 0)
}
