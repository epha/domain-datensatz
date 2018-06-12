const insertToDocs = require('./wirkstoffe')

const { wirkstoffe } = require('../../source/app.js')

const stats = {
  total: 0,
  amounts: [['Stellig', 'Anzahl'], ['1', 0], ['2', 0], ['3', 0], ['4', 0], ['5', 0], ['6', 0], ['7', 0]]
}

const keys = Object.keys(wirkstoffe)

keys.forEach((key) => {
  stats.total++
  stats.amounts[key.length][1]++ 
})

insertToDocs(stats)