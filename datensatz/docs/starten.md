@keywords
repository,datensatz,artikel,nodejs,download,datenstruktur,beispiel,projekt,programmierung,code

@description
Anleitung zur Programmierung, um die Referenzdaten in eigenen Projekten zu verwenden. Die Daten von Swissmedic und BAG werden von uns ohne Lizenzgebühren bereitgestellt.

@title
Starten

# Starten

Die Schweiz digitalisiert mit dem elektronischen Patientendossier (EPD) das Gesundheitswesen, um die
Patientensicherheit zu fördern. Die Grundlage eines Erfolges bilden neue, offene (ohne Lizenzgebühr) und moderne Services.

Die Referenzdaten werden jeden Monat auf den aktuellsten Stand gebracht und von Ärzten und Apothekern manuell aufbereitet und ergänzt. Wir publizieren neben den Stammdaten auch weitere
<a href="//epha.ch">Applikationen</a>
, wie z.B. die
<a href="//epha.ch/matrix/" target="_blank" rel=noopener>Visualisierung von Interaktionen</a>
und die
<a href="//epha.ch/kompendium/" target="_blank" rel=noopener>Suche von Fachinformationen</a>.

## Download

<p>
  <a class='download' href="/datensatz/data/wirkstoffe.json" download="wirkstoffe.json" target="_blank">wirkstoffe.json</a>
  <a class='download' href="/datensatz/data/artikel.json" download="artikel.json" target="_blank">artikel.json</a>
</p>

## Repository

Wir empfehlen [node.js](https://nodejs.org/en/), um mit den Referenzdaten zu arbeiten. Mit folgenden Schritten kann ein eigenes Projekt gestartet werden.

```bash
$ mkdir projekt
$ cd projekt
$ npm init
$ npm i domain-datensatz --save
```

Folgende Code-Snippets zeigen, wie die Daten in einem eigenen Projekt verwendet werden könnten.

?> Alle Artikel filtern, welche den Applikationsweg (applw) aural beinhalten.

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

?> Alle Wirkstoffe filtern, in denen Paracetamol vorkommt.

```javascript
const { wirkstoffe } = require('domain-datensatz')

const result = Object.values(wirkstoffe).filter(w => {
  return w.toLowerCase().includes('paracetamol')
})

// [
//   'Paracetamol',
//   'Paracetamol, Kombinationen exkl. Psycholeptika',
//   'Paracetamol und Codein',
//   'Paracetamol und Ascorbinsäure',
//   'Paracetamol und Coffein',
//   'Paracetamol und Pseudoephedrin',
//   'Dextromethorphan und Paracetamol, Kombinationen'
// ]
console.log(result)
```

?> Eine CSV Datei erstellen, welche alle Artikel mit der Einheit "mg" auflistet.


Für dieses Beispiel muss das Modul [iconv-lite](https://www.npmjs.com/package/iconv-lite) im Projekt Ordner installiert sein.

```bash
$ npm i iconv-lite --save
```

JS:

```javascript
//----------------------------------------
// Import iconv-lite module for correct file encoding
// Import file system module which allows
// to read and write files from disk and
// Import the latest artikels
//----------------------------------------
const iconv = require( 'iconv-lite' )
const { writeFileSync } = require( 'fs' )
const { artikel } = require( 'domain-datensatz' )

//----------------------------------------
// Get all artikels. Filter first for mg
// and then remap the values to array
//----------------------------------------
const artikelWithMg = Object.values( artikel ).filter( ( item ) => {

  // 1. Containing 'mg' in any type
  return Object.values( item ).filter( val => val == 'mg' )

} ).map( ( item, idx ) => {

  // 2. Prepare item
  const { gtin, atcCode, name1, unit2, type2, unit3, type3, unit4, type4 } = item

  // Remove commas in order to ommit
  // unwanted delimitation in file
  const name = name1.replace( ',', '' )
  const unit = ( type2 == "mg" ) ? unit2 : ( type3 == "mg" ) ? unit3 : ( type4 == "mg" ) ? unit4 : "NA"
  const type = "mg"

  return [ idx + 1, "EAN" + gtin, atcCode, name, unit, type ]

} )

//----------------------------------------
// Prepare file lines
//----------------------------------------
const lines = artikelWithMg.reduce( ( acc, item ) => {

  // Create a row for each artikel
  return acc.concat( item.join( "," ) )

}, [ 'LINE, GTIN, ATC, NAME, UNIT, TYPE' ] )

// Define correct file encoding depending on OS (windows, macOS)
const encoding = ( process.platform == 'win32' ) ? 'WINDOWS-1252' : 'macintosh'

// Write file to disc with correct encoding
writeFileSync( 'artikelWithMG.csv', iconv.encode( lines.join( "\r\n" ), encoding ) )
```

## Datenstruktur

?> Die Datei [Wirkstoffe](/datensatz/data/wirkstoffe.json ":ignore") listet alle Wirkstoffe nach einer überarbeiteten ATC-Klassifikation auf. Die verfügbaren Felder werden im Kapitel [Wirkstoffe](/datensatz/docs/wirkstoffe/) näher beschrieben. Auszug der vorhandenen Felder in der Datei Wirkstoffe

```javascript
{
  // 1st Level - Anatomical Main Group
  "A": "Alimentäres System und Stoffwechsel",
  ...,
  // 2nd Level - Therapeutic Subgroup
  "A01": "Stomatologika",
  ...,
  // 3rd Level - Pharmacological Subgroup
  "A01A": "Stomatologika",
  ...,
  // 4th Level - Chemical Subgroup
  "A01AA": "Mittel zur Kariesprophylaxe",
  ...,
  // 5th Level - Chemical Substance
  "A01AA01": "Natriumfluorid",
  ...
}
```

?> Die Datei [Artikel](/datensatz/data/artikel.json ":ignore") listet alle in der Schweiz zugelassenen Arzneimittel auf. Folgend ein Auszug der vorhandenen Felder in der Datei Artikel.

```javascript
{
  "7680553510015": {

    // Status im Handel: true/false
    "ihStat": true,

    // Datum der letzten Aktualisierung
    "ihLast": "2018-05-07",

    // Startdatum der Zulassung
    "ihFrom": "2000-08-08",

    // Enddatum der Zulassung
    "ihEnds": "2020-08-17",

    // Status "Spezialitätenliste": true/false
    "slStat": true,

    // Datum der letzten Aktualisierung, bei der Status erfasst wurde
    "slLast": "2018-05-07",

    // Startdatum des Artikels (Spezialitätenliste)     
    "slFrom": "2017-04-01",

    // Enddatum des Artikels (Spezialitätenliste)
    "slEnds": "9999-12-31",

    // Packungsspezifische, 13-stellige Identifikationsnummer
    "gtin": "7680553510015",

    // Bezeichnung Artikel gemäss Swissmedic
    "name1": "Metfin  500, Filmtabletten",
    "name2": "50 Tablette(n)",

    // -----------------
    // Applikationsweg
    // -----------------
    // Unter applw ist der Applikationsweg für den Artikel beschrieben. Sind mehrere
    // Applikationswege möglich (z.B. subkutane und/oder imtramuskuläre Gabe), so ist
    // der häufigste/gebräuchliste Applikationsweg für den Artikel hinterlegt.
    "applw": "p.o.",

    // -----------------
    // Darreichungsform
    // -----------------
    // Unter form ist die jeweilige Darreichungsform in standardisierter Form
    // für den Artikel spezifiziert.
    "form": "Tablette",

    // ---------------------------
    // ATC-Code und Wirkstoffname
    // ---------------------------
    // (siehe "Wirkstoffe")
    "atcCode": "A10BA02",
    "atcName": "Metformin",

    // ------------
    // BrandName
    // -----------
    // Alle Artikel, welche unter derselben Marke geführt werden (z.B. verschiedene
    // Dosisstärken, Packungsgrössen), sind zu Marken-Gruppen zusammengefasst.
    // BrandName bezeichnet die jeweilige Gruppe in die der Artikel eingruppiert wurde.
    "brandName": "Metfin",
    "brandForms": "Tablette",

    // --------------------------------------------
    // Charakterisierung des Inhaltes pro Packung
    // --------------------------------------------
    // Die Einträge in unit und type gehören jeweils zusammen (unit1 & type1, unit2 & type2...). Es bezeichnet
    // - die Menge an Wirkstoff innerhalb einer Packung, ausgedrückt in unterschiedlichen Dosierungeinheiten
    // - das Volumen des Gesamtproduktes innerhalb einer Packung, ausgedrückt in unterschiedlichen Dosierungseinheiten
    // - die Anzahl der Dosiseinheiten (z.B. Stückzahl der Tabletten, Anzahl Ampullen) in einer Packung
    "unit1": "1",
    "type1": "Pck",
    "unit2": "50",
    "type2": "Stk",
    "unit3": "25000",
    "type3": "mg",
    "unit4": "",
    "type4": "",
    "unit5": "",
    "type5": "",

    // ---------------------------------------
    // Patientenfreundlicher Informationstext
    // ---------------------------------------
    // Ein leicht verständlicher, patientenfreundlicher Informationstext über die
    // medizinische Wirkung des Artikels bzw. zum Indikationsgebiet, in dem der Artikel
    // eingesetzt wird, wird in gebiet angezeigt.
    "gebiet": "senkt den Blutzucker",


    // ------------------
    // Zulassungsinhaber
    // ------------------
    // Unter Inhaber ist der Inhaber der Genehmigung zum Inverkehrbringen
    // des Artikels (Zulassungsinhaber) aufgeführt.
    "inhaber": "Sandoz Pharmaceuticals",

    // Preise gemäss SL
    "exfPreis": "2.25",
    "pubPreis": "6.70"
  },
  ...  
}

```

## Testing
[![Build Status](https://travis-ci.com/epha/domain-datensatz.svg?branch=master)](https://travis-ci.com/epha/domain-datensatz)

Auf den Build Status klicken, um die Details der Tests zu sehen.
