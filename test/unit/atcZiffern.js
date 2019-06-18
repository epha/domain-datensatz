const tape = require( "tape" )

const { wirkstoffe, artikel } = require( '../..' )

tape.only( "Unit atc ziffern", async ( t ) => {

  // -----------------------------------------
  // Build object with used keys in packungen
  // and build up the hierarchy
  // -----------------------------------------
  const relevant = Object.values( artikel ).reduce( ( acc, cur ) => {
    acc[ cur.atcCode.substr( 0, 7 ) ] = true
    acc[ cur.atcCode.substr( 0, 5 ) ] = true
    acc[ cur.atcCode.substr( 0, 4 ) ] = true
    acc[ cur.atcCode.substr( 0, 3 ) ] = true
    acc[ cur.atcCode.substr( 0, 1 ) ] = true
    return acc
  }, {} )


  // -----------------------------------------
  // Wirkstoffe has defined codes noone needs
  // (except) maybe Swissmedic
  // -----------------------------------------
  const toomuch = Object.keys( wirkstoffe ).filter( code => {
    return !relevant[ code ]
  } ).sort( ( a, b ) => a.localeCompare( b ) )

  // --------------------------------------------------
  // Wirkstoffe has not defined necessary code needed
  // in artikel (packungen)
  // --------------------------------------------------
  const missing = Object.keys( relevant ).filter( code => {
    return !wirkstoffe[ code ]
  } )

  if ( toomuch.length > 0 || missing.length > 0 ) {
    t.fail( "Codes imperfect" )
  }

  if ( toomuch.length > 0 ) {
    console.log( "---" )
    console.log( "Wirkstoffe provides codes not used in artikel (packungen)" )
    console.log( "(except maybe Swissmedic)" )
    console.log( "---" )
    toomuch.forEach( ( code, idx ) => console.log( `${String(idx).padStart(3)} ${code}` ) )
  } else {
    t.ok( "All wirkstoffe codes are used in artkel" )
  }

  if ( missing.length > 0 ) {
    console.log( "---" )
    console.log( "These codes (also checks for completness of hierarchy)" )
    console.log( " in artikel (packungen) are not provided in wirkstoffe" )
    console.log( "---" )
    missing.forEach( ( code, idx ) => console.log( `${String(idx).padStart(3)} ${code}` ) )
  } else {
    t.ok( "All artikel codes are provided in wirkstoffe" )
  }

  t.end()

} )