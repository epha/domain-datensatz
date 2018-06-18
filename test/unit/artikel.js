const tape = require("tape")

const { artikel } = require('../..')

tape("Unit Artikel", async (t) => {

  const result = Object.values(artikel).filter(item => {
    return item.applw == 'aural'
  })
  .map(item => {
    return item.name1
  })

  t.deepEquals(result,
    [
      'Otalgan, solution',
      'Otothricinol, Suspension',
      'Cerumenex, Tropfen',
      'Panotile, gocce otologiche',
      'Otipax, liquido',
      'Polydexa, Ohrentropfen',
      'Cerumenol, Tropfen',
      'Otofa, Ohrentropfen',
      'Otidolo, homöopathisch-spagyrische Tropfen',
      'Similasan Ohrentropfen, Tropfen',
      'Ciproxin HC, Ohrensuspension'
    ]
  , "Einleitung.md Beispiel")

  t.end()

})
