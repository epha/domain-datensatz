const table = require('markdown-table')
const fs = require('fs')
const {artikel} = require('./app.js')
const artikelArray = Object.values(artikel)

//choose for which props we display a table
const indicate = (property) => {

  return property.name == "ihStat" ||
         property.name == "slStat" ||
         property.name == "applw" ||
         property.name == "form" ||
         property.name == "brandName" ||
         property.name == "type2" ||
         property.name == "type3" ||
         property.name == "type4" ||
         property.name == "type5" ||
         property.name == "gebiet" ||
         property.name == "inhaber"
}

const stats = Object.values(artikelArray.reduce((acc, artikel, idx) => {

  const entries = Object.entries(artikel)

  entries.forEach((entry) => {

  	//no prop available add to object
  	if(!acc[entry[0]]) {
  
      acc[entry[0]] = {
      	name: entry[0],
      	values: [],
      	amount: 0
      }
    
    //property available in acc
  	} else {

  	  const property = acc[entry[0]]
  	  const value = entry[1]

  	  //got value assigned to prop
  	  if(!!value || value == false) {

  	  	//console.log('got value')
  	  	property.amount++

        if(indicate(property)) {
          
          //add none seen value to props values
          if(!property.values.some((val) => val[0] == value) || !property.values.length) {
            property.values.push([value, 1])
          } else {
          	//if already knwon increment counter
            const v = property.values.find((val) => val[0] == value)
            v[1]++
          }
        }
  	  }
  	}
  })

  return acc
}, {}))

const appendFile = (content) => {
  return new Promise((res, rej) => {
    fs.appendFile('stats.md', content, (err) => {
      if (err) throw err;
      res(content)
    })
  })
}

const writeFile = (idx, stats) => {

  if(!stats[idx]) return
  
  const property = stats[idx]
  
  if(indicate(property)) {

  	const propertyHeader = `## ${property.name} ${property.amount}`

  	appendFile(propertyHeader).then(() => {
  	  return appendFile('\n\n')
  	})
  	.then(() => {
  	  //sort values
      property.values.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)

      //add table header
      property.values.unshift(['Wert', 'Anzahl'])
      
      //construct table
  	  const statsTable = table(property.values)
  	  return appendFile(statsTable)
  	})
  	.then(() => {
  	  return appendFile('\n\n')
  	})
  	.then(() => {
  	  console.log(property.name + ' done')
  	  writeFile(idx + 1, stats)
  	})

  } else {
  	writeFile(idx + 1, stats)
  }
}

writeFile(0, stats)