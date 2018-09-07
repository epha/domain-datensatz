//---
// Import file system module
//---
const fs = require( 'fs' )

//---
// Import artikels
//---
const artikel = require( './data/artikel' )

//---
// Get all artikels containing 'mg'
//---
const mgArtikels = Object.values( artikel ).filter( ( a ) => a.type3 == 'mg' )

//---
// Set the file header
//---
let content = ' , GTIN, ATC, name_x, unit, einheit \r\n'

//---
// Iterate over fildered artikels
//---
const result = mgArtikels.reduce( ( acc, artikel, idx ) => {

  //---
  // Append a row to csvContent for each artikel
  // Add the correct number depending on the idx
  // Replace commas with nothing, in order to ommit unwanted delimitation in file
  //---
  return acc += `${idx + 1}, ${artikel.gtin}, ${artikel.atcCode}, ${artikel.name1.replace(',', '')}, ${artikel.unit3}, ${artikel.type3} \r\n`

}, content )

//---
// Write UTF-8 encoded csv file with the result as content
//---
fs.writeFileSync( 'example.csv', result, 'utf8' )