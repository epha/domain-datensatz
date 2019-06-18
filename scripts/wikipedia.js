const wirks = require( "expert-wirkstoffe/data/ch/atc7d" )

const fetch = require( "isomorphic-fetch" )
const files = require( "fs" )
const slowy = ( ms ) => new Promise( r => setTimeout( r, ms ) )

const askWikipedia = async ( wirks, file ) => {

  console.time( "> Done asking wikipedia" )

  const wikipedia = JSON.parse( files.readFileSync( './datensatz/docs/wikipedia.json' ), null, 2 )

  const items = Object.keys( wirks ).map( key => {
    return { code: key, name: wirks[ key ] }
  } )

  const stats = {
    total: items.length,
    okays: 0,
    error: 0
  }

  console.log( "> ========================================= " )
  console.log( "> Check if some more substances " )
  console.log( "> are available. We only query  " )
  console.log( "> stuff we haven't found yet    " )
  console.log( "> ========================================= " )

  for ( const item of items ) {

    const url = `https://de.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.name)}&format=json`

    // Skip the unlikely names
    if ( wikipedia[ item.code ] || /[(),.+-:]+| und | andere |Kombination|Verschiede/i.test( item.name ) ) {
      continue
    }

    await fetch( url ).then( raw => raw.json() ).then( ( json ) => {

        const pageId = Object.keys( json.query.pages ).pop()

        if ( pageId != '-1' ) {
          wikipedia[ item.code ] = `https://de.wikipedia.org/?curid=${pageId}`
          stats.okays++
        } else {
          stats.error++
        }

      } )
      .then( () => {
        console.log( `> ${item.code} ${item.name}` )

        return slowy( 1000 )
      } )
      .catch( err => {
        console.log( err )
      } )

  }

  files.writeFileSync( file, JSON.stringify( wikipedia, null, 2 ) )

  console.log( `> Total: ${stats.total} Okays: ${stats.okays} Error: ${stats.error}` )
  console.time( "> Done asking wikipedia" )
}

askWikipedia( wirks, './datensatz/docs/wikipedia.json' )