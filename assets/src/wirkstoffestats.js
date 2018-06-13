const template = require('./wirkstoffe')
const { wirkstoffe } = require('../../source/app.js')

const stats = {
  total: 0,
  '1': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '7': 0 
}

const keys = Object.keys(wirkstoffe)

keys.forEach((key) => {
  stats.total++
  stats[key.length]++
})

template(stats)