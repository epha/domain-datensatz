const tape = require( "tape" )

const { wirkstoffe } = require( '../..' )

tape.only( "Unit atc ziffern", async ( t ) => {

  const a1d = Object.keys( wirkstoffe ).filter( w => {
    return w.length == 1
  } )
  const a3d = Object.keys( wirkstoffe ).filter( w => {
    return w.length == 3
  } )
  const a4d = Object.keys( wirkstoffe ).filter( w => {
    return w.length == 4
  } )
  const a5d = Object.keys( wirkstoffe ).filter( w => {
    return w.length == 5
  } )
  const a7d = Object.keys( wirkstoffe ).filter( w => {
    return w.length == 7
  } )

  const missing = []
  const toomuch = []

  const relevant = {}

  a7d.forEach( code => {

    relevant[ code.substr( 0, 5 ) ] = true
    if ( !a5d.includes( code.substr( 0, 5 ) ) ) {
      missing.push( code.substr( 0, 5 ) )
    }

    relevant[ code.substr( 0, 4 ) ] = true
    if ( !a4d.includes( code.substr( 0, 4 ) ) ) {
      missing.push( code.substr( 0, 4 ) )
    }

    relevant[ code.substr( 0, 3 ) ] = true
    if ( !a3d.includes( code.substr( 0, 3 ) ) ) {
      missing.push( code.substr( 0, 3 ) )
    }

    relevant[ code.substr( 0, 1 ) ] = true
    if ( !a1d.includes( code.substr( 0, 1 ) ) ) {
      missing.push( code.substr( 0, 1 ) )
    }

  } )

  a5d.filter( code => !relevant[ code ] ).forEach( code => toomuch.push( code ) )
  a4d.filter( code => !relevant[ code ] ).forEach( code => toomuch.push( code ) )
  a3d.filter( code => !relevant[ code ] ).forEach( code => toomuch.push( code ) )
  a1d.filter( code => !relevant[ code ] ).forEach( code => toomuch.push( code ) )

  t.equals( missing.length, 0, "All substances have code up the hierarchy" )
  t.equals( toomuch.length, 0, "All codes have corresponding substances" )

  t.end()

} )