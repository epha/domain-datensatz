const fs = require('fs')

const packungen = require('expert-packungen')
const wirkstoffe = require('expert-wirkstoffe')

const writeWirkstoffe = async () => {
  const wirk = await wirkstoffe()
  fs.writeFileSync('data/wirkstoffe.json', JSON.stringify(wirk, null, 2))
}

fs.writeFileSync('data/artikel.json', JSON.stringify(packungen, null, 2))
writeWirkstoffe()