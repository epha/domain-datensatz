const fs = require('fs')
const { version } = require('../../package')

const template =  `
<div class='animation'></div>

# Epha Datensatz <small>${version}</small>

> Referenzdaten (Arzneimittel) für die Schweiz

[GitHub](https://github.com/epha/domain-datensatz)
[Starten](#Einleitung)

![color](#21374b)
`

fs.appendFile('_coverpage.md', template, (err) => {
  if (err) throw err
  console.log('_coverpage.md done')
})