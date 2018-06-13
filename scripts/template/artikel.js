const fs = require('fs')

module.exports = (artikel) => {

const template = `

# Artikel

Unsere Referenzdaten enthalten neben technischen Kenndaten auch anwendungsbezogene Informationen wie
Applikationsweg oder Anwendungsgebiet, welche durch Ärzte und Apotheker manuell hinzugefügt werden.

Die Grundstruktur der Referenzdaten ist in der [Einleitung](/README.md) aufgeführt.

## Bubble Chart Form
[Bubble Chart](form-bubble.html ':include :type=iframe width=100% height=800px')
`

return template

}
