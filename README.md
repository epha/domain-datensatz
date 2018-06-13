# Einleitung

Unsere Referenzdaten bestehen aus aggregierten Kenndaten zu den zugelassenen Arzneimitteln in der Schweiz.

Als Grundlage dienen die offiziellen Tabellen zu den zugelassenen Packungen bzw. die Spezialitätenliste, die vom Bundesamt für Gesundheit (BAG) und der Swissmedic herausgegeben werden. Diese Daten werden manuell durch anwendungsbezogene Informationen wie Applikationsweg oder Anwendungsgebiet ergänzt.

Die Referenzdaten werden jeden Monat auf den aktuellsten Stand gebracht und von Ärzten und Apothekern manuell aufbereitet und ergänzt.

## Downloads

<section class='downloads-wrapper'>

  <a class='download' href="data/wirkstoffe.json" download="wirkstoffe.json">wirkstoffe.json</a>

  <a class='download' href="data/artikel.json" download="artikel.json">artikel.json</a>

</section>

## Prerequisites

Wir empfehlen [node.js](https://nodejs.org/en/) um mit den Referenzdaten zu arbeiten. Mit folgenden Schritten kann ein eigenes Projekt gestartet werden.

```bash
$ mkdir projekt
$ cd projekt
$ npm init
$ npm i epha/domain-datensatz --save
```

## Anwendung
Folgende Code-Snippets zeigen, wie die Daten in einem eigenen Projekt verwendet werden können.

> Alle Artikel filtern, welche den Applikationsweg (applw) Aural beinhalten.

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

> Alle Wirkstoffe filtern, in denen Paracetamol vorkommt.

```javascript
const { wirkstoffe } = require('domain-datensatz')

const result = Object.values(wirkstoffe).filter(w => {
  return w.toLowerCase().includes('paracetamol')
})
.map(item => {
  return item.name1
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


## Datenstruktur

Die Daten sind in zwei Dateien aufgeteilt. Die Datei [Wirkstoffe](data/wirkstoffe.json ":ignore") listet alle Wirkstoffe nach einer überarbeiteten ATC-Klassifikation auf. Die verfügbaren Felder werden im Kapitel [Wirkstoffe](docs/wirkstoffe.md) näher beschrieben. Die Datei [Artikel](data/artikel.json ":ignore") listet alle in der Schweiz zugelassenen Arzneimittel auf. Die Felder sind im Kapitel [Artikel](docs/artikel.md) näher beschrieben sind.

Folgend ein Auszug der vorhanden Felder in der Datei Artikel.

```javascript
{
  "7680553510015": {

    // Status im Handel: true/false (siehe Kapitel Artikel)
    "ihStat": true,

    // Datum der letzten Aktualisierung
    "ihLast": "2018-05-07",

    // Startdatum der Zulassung
    "ihFrom": "2000-08-08",

    // Enddatum der Zulassung
    "ihEnds": "2020-08-17",

    // Status "Spezialitätenliste": true/false (siehe Kapitel Artikel)
    "slStat": true,

    // Datum des letzten Aktualisierung, bei der Status erfasst wurde
    "slLast": "2018-05-07",

    // Startdatum des Artikels (Spezialitätenliste)     
    "slFrom": "2017-04-01",

    // Enddatum des Artikels (Spezialitätenliste)
    "slEnds": "9999-12-31",

    // Packungsspezifische, 13-stellige Identifikationsnummer
    "gtin": "7680553510015",

    // Bezeichnung Artikel
    "name1": "Metfin  500, Filmtabletten",
    "name2": "50 Tablette(n)",

    // Applikationsweg (siehe Kapitel Artikel)
    "applw": "p.o.",

    // Darreichungsform (siehe Kapitel Artikel)
    "form": "Tablette",

    // ATC-Code und Wirkstoffname (see "Wirkstoffe")
    "atcCode": "A10BA02",
    "atcName": "Metformin",

    // Marke und möfliche Darreichungsformen (siehe Kapitel Artikel)
    "brandName": "Metfin",
    "brandForms": "Tablette",

    // Charakterisierung des Inhaltes pro Packung (siehe Kapitel Artikel)
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

    // Patientenfreundlicher Informationstext (siehe Kapitel Artikel)
    "gebiet": "senkt den Blutzucker",

    // Zulassungsinhaber (siehe Kapitel Artikel)
    "inhaber": "Sandoz Pharmaceuticals",

    // Preise
    "exfPreis": "2.25",
    "pubPreis": "6.70"
  },
  ...  
}

```
