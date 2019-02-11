const tape = require( "tape" )

const { wirkstoffe } = require( '../..' )

tape( "Unit Wirkstoff", async ( t ) => {

  const result = Object.values( wirkstoffe ).filter( w => {
    return w.toLowerCase().includes( 'paracetamol' )
  } )

  t.deepEquals( result,
    [
      'Tramadol und Paracetamol',
      'Paracetamol',
      'Paracetamol, Kombinationen exkl. Psycholeptika',
      'Paracetamol und Codein',
      'Paracetamol und Ascorbinsäure',
      'Paracetamol und Coffein',
      'Paracetamol und Pseudoephedrin',
      'Dextromethorphan und Paracetamol, Kombinationen',
      'Dextromethorphan, Paracetamol und Doxylamin, Kombinationen'
    ], "Wirkstoffe Paracetamol" )

  t.end()

} )
