const { wirkstoffe } = require('../../source/app.js')

const amounts = [['1', 0], ['2', 0], ['3', 0], ['4', 0], ['5', 0], ['6', 0], ['7', 0]]

const keys = Object.keys(wirkstoffe)

keys.forEach((key) => {
  amounts[key.length - 1][1]++ 
})

console.log('amounts: ', amounts)