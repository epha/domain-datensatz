const table = require('markdown-table')
const fs = require('fs')

const {artikel} = require('./app.js')

//console.log('artikel: ', artikel)

const artikelArray = Object.values(artikel)

const stats = artikelArray.reduce((acc, artikel, idx) => {

  //if(idx == 0) console.log(Object.entries(artikel))

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
  	  if(!!value) {

  	  	//console.log('got value')
  	  	property.amount++

        //add none seen value to props values
        if(property.name !== 'pubPreis' && property.name !== 'exfPreis') {

          if(!property.values.some((val) => val[0] == value) || !property.values.length) {
            property.values.push([value, 1])
          } else {
            const v = property.values.find((val) => val[0] == value)
            v[1]++
          }
        }
  	  }
  	}
  })

  return acc


}, {})

//console.log(stats)


Object.values(stats).forEach((property) => {
  property.values.unshift(['value', 'amount'])
  //console.log(table(property.values))

  fs.appendFile('stats.md', table(property.values), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

})



//wieviel verschiedene

//wieviel oral, iv