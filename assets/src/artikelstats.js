const {artikel} = require('../../source/app.js')
const artikelArray = Object.values(artikel)
const insertToDocs = require('./artikel')

//choose for which props we display a table
const indicate = (property) => {

  return property == "ihStat" ||
         property == "slStat" ||
         property == "applw" ||
         property == "form" ||
         property == "brandName" ||
         property == "type2" ||
         property == "type3" ||
         property == "type4" ||
         property == "type5" ||
         property == "gebiet" ||
         property == "inhaber"
}

//split, order and count props
const stats = artikelArray.reduce((acc, artikel, idx) => {

  const entries = Object.entries(artikel)

  entries.forEach((entry) => {

    if(indicate(entry[0])) {
      
      //no prop available add to object
      if(!acc[entry[0]]) {
    
        acc[entry[0]] = {
          name: entry[0],
          values: [['Wert', 'Anzahl']],
          amount: 0
        }
      
      //property available in acc
      } else {
        const property = acc[entry[0]]
        const value = entry[1]

        //got value assigned to prop
        if(!!value || value == false) {
        
          property.amount++

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
}, {})

insertToDocs(stats)