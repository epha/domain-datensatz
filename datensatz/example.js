//----------------------------------------
// import iconv-lite for correct file encoding
// import file system module which allows
// to read and write files from disk and
// import the latest artikel
//----------------------------------------
const iconv = require( 'iconv-lite' )
const { writeFileSync } = require( 'fs' )
const artikel = require( './data/artikel' )


//----------------------------------------
// Get all artikels. Filter first for mg
// and then remap the values to array
//----------------------------------------
const artikelWithMg = Object.values( artikel ).filter( ( item ) => {

  // 1. Containing 'mg' in any type
  return Object.values( item ).filter( val => val == 'mg' )

} ).map( ( item, idx ) => {

  // 2. Prepare item
  const { gtin, atcCode, name1, unit2, type2, unit3, type3, unit4, type4 } = item

  // Remove commas in order to ommit
  // unwanted delimitation in file
  const name = name1.replace( ',', '' )
  const unit = ( type2 == "mg" ) ? unit2 : ( type3 == "mg" ) ? unit3 : ( type4 == "mg" ) ? unit4 : "NA"
  const type = "mg"

  return [ idx + 1, "EAN" + gtin, atcCode, name, unit, type ]

} )


//----------------------------------------
// Create CSV with weird default encoding
// for Excel-files (windows) and write
// to disk
//----------------------------------------
const lines = artikelWithMg.reduce( ( acc, item ) => {

  // Create a row for each artikel
  return acc.concat( item.join( "," ) )

}, [ 'LINE, GTIN, ATC, NAME, UNIT, TYPE' ] )

const encoding = 'latin1' //( process.platform == 'win32' ) ? 'ISO-8859-1' : 'macintosh'

writeFileSync( 'example.csv', iconv.encode( lines.join( "\r\n" ), encoding ) )