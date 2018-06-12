const table = require('markdown-table')
const fs = require('fs')

const sort = (values) => {

  //sort values alphabetically
  values.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)

  //add table header
  values.unshift(['Wert', 'Anzahl'])

  return values
}

module.exports = (stats) => {

  const template = `

# Artikel

Unsere Referenzdaten enthalten neben technischen Kenndaten auch anwendungsbezogene Informationen wie Applikationsweg oder Anwendungsgebiet, welche durch Ärzte und Apotheker manuell hinzugefügt werden.

Die Grundstruktur der Referenzdaten ist in der [Einleitung](/#Einleitung) aufgeführt. Im Folgenden sind detailierte Informationen zu den einzelnen Kategorien aufgeführt.
    
## ihStat
Unter **ihStat** ist der Status im Handel bzw. ausser Handel dokumentiert:

-  **true:** der Artikel befindet sich im Handel
-  **false:** der Artikel ist ausser Handel

Total: ${stats.ihStat.total}

${table(sort(stats.ihStat.values))}

## slStat
Unter **slStat** ist hinterlegt, ob ein Artikel auf der offiziellen Spezialitätenliste aufgeführt ist:

- **true:** der Artikel befindet sich auf der Spezialitätenliste
- **false:** der Artikel steht nicht auf der Spezialitätenliste

Total: ${stats.slStat.total}

${table(sort(stats.slStat.values))}

## applw
Unter **applw** ist der Applikationsweg für den Artikel beschrieben. Sine mehrere Applikationswege möglich (z.B. subkutane und/oder imtramuskuläre Gabe) so ist der häufigste/gebräuchliste Applikationsweg für den Artikel hinterlegt. Alle im Datensatz enthaltenen Applikationswege sind in der nachfolgenden Tabelle unter "Statistik" aufgeführt.

Total: ${stats.applw.total}

${table(sort(stats.applw.values))}

## form
Unter **form** ist die jeweilige Darreichungsform in standardisierter Form für den Artikel spezifiziert. Alle im Datensatz enthaltenen Darreichungsformen sind in der nachfolgenden Tabelle unter "Statistik" aufgeführt.

Total: ${stats.form.total}

${table(sort(stats.form.values))}

## brandName & brandForms
Alle Artikel, welche unter derselben Marke geführt werden (z.B. verschiedene Dosisstärken, Packungsgrössen), sind zu Marken-Gruppen zusammengefasst. **brandName** bezeichnet die jeweilige Gruppe in die der Artikel eingruppiert wurde. Unter **brandForms** sind verschiedene Darreichungsformen, die innerhalb der jeweiligen Marke vorkommen, aufgeführt.

### brandName

Total: ${stats.brandName.total}

${table(sort(stats.brandName.values))}

## unit & type
Die Einträge in **unit** und **type** gehören jeweils zusammen (unit1 & type1, unit2 & type2...). Es bezeichnet 

- die Menge an Wirkstoff innerhalb einer Packung, ausgedrückt in unterschiedlichen Dosierungeinheiten 
- das Volumen des Gesamtproduktes innerhalb einer Packung, ausgedrückt in unterschiedlichen Dosierungeinheiten
- die Anzahl der Dosiseinheiten (z.B. Stückzahl der Tabletten, Anzahl Ampullen) in einer Packung 

### type2

Total: ${stats.type2.total}

${table(sort(stats.type2.values))}

### type3

Total: ${stats.type3.total}

${table(sort(stats.type3.values))}

### type4

Total: ${stats.type4.total}

${table(sort(stats.type4.values))}

### type5

Total: ${stats.type5.total}

${table(sort(stats.type5.values))}

## gebiet
Ein leicht verständlicher, patientenfreundlicher Informationstext über die medizinische Wirkung des Artikels bzw. zum Indikationsgebiet, in dem der Artikel eingesetzt wird ist unter **gebiet** beschrieben. 

Total: ${stats.gebiet.total}

${table(sort(stats.gebiet.values))}

## Inhaber
Unter **Inhaber** ist der Inhaber der Genehmigung zum in Verkehr bringen des Artikels (Zulassungsinhaber) aufgeführt.

Total: ${stats.inhaber.total}

${table(sort(stats.inhaber.values))}    

`

  fs.appendFile('docs/artikel.md', template, (err) => {
    if (err) throw err;
    console.log('artikel.md done')
  })

}