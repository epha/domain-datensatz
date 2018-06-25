# Domain Datensatz
[![Build Status](https://travis-ci.com/epha/domain-datensatz.svg?branch=master)](https://travis-ci.com/epha/domain-datensatz)

The following sources publish information about
the available pharmaceutical products in Switzerland.

- [Bundesamt für Gesundheit](https://www.bag.admin.ch)
- [Swissmedic](https://www.swissmedic.ch)

The files have been parsed and harmonized into json files.
The [documentation](https://epha.ch/datensatz) is
available in German.

## Get started

```javascript
const { artikel } = require('domain-datensatz')

const result = Object.values(artikel).filter(item => {
  return item.applw == 'aural'
})
.map(item => {
  return item.name1
})

// [
//   'Otalgan, solution',
//   'Otothricinol, Suspension',
//   'Cerumenex, Tropfen',
//   'Panotile, gocce otologiche',
//   'Otipax, liquido',
//   'Polydexa, Ohrentropfen',
//   'Cerumenol, Tropfen',
//   'Otofa, Ohrentropfen',
//   'Otidolo, homöopathisch-spagyrische Tropfen',
//   'Similasan Ohrentropfen, Tropfen',
//   'Ciproxin HC, Ohrensuspension'
// ]
console.log(result)
```
