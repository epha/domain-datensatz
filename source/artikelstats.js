const {artikel} = require('./app.js')

//console.log('artikel: ', artikel)

const artikelArray = Object.values(artikel)

const stats = artikelArray.reduce((acc, artikel, idx) => {

  //if(idx == 0) console.log(Object.entries(artikel))

  const entries = Object.entries(artikel)

  entries.forEach((entry) => {

  	//no prop available add to object
  	if(!acc[entry[0]] && acc[entry[0]] !== 0) {
  
      acc[entry[0]] = 0

  	} else {
  	  //property available add if value
  	  if(!!entry[1]) {
  	  	acc[entry[0]]++
  	  }
  	}

  })

  return acc


}, {})

//setTimeout(() => {
  console.log(stats)
//}, 4000)


//wieviel verschiedene

//wieviel oral, iv