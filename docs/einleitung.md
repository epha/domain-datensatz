# Einleitung

Die Schweiz digitalisiert mit den elektronsichen Patientendossiers das Gesundheitswesen, um die
Patientensicherheit zu fördern. Die Grundlage eines Erfolges bilden neue, offene und moderne Services.

Die Referenzdaten werden jeden Monat auf den aktuellsten Stand gebracht und von Ärzten und Apothekern manuell aufbereitet und ergänzt. Wir publizieren neben den Stammdaten auch weitere [Applikationen](https://epha.ch) wie z.B. die [Visualisierung von Interaktionen](https://epha.ch/matrix) und die [Suche von Fachinformationen](https://epha.ch/kompendium).

## Download

<p>
  <a class='download' href="data/wirkstoffe.json" download="wirkstoffe.json">wirkstoffe.json</a>
  <a class='download' href="data/artikel.json" download="artikel.json">artikel.json</a>
</p>

## Repository

Wir empfehlen [node.js](https://nodejs.org/en/) um mit den Referenzdaten zu arbeiten. Mit folgenden Schritten kann ein eigenes Projekt gestartet werden.

```bash
$ mkdir projekt
$ cd projekt
$ npm init
$ npm i domain-datensatz --save
```

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

> Die Datei [Wirkstoffe](data/wirkstoffe.json ":ignore") listet alle Wirkstoffe nach einer überarbeiteten ATC-Klassifikation auf. Die verfügbaren Felder werden im Kapitel [Wirkstoffe](docs/wirkstoffe.md) näher beschrieben. Auszug der vorhandenen Felder in der Datei Wirkstoffe

```javascript
{
  // 1st Level - Anatomical Main Group
  "A": "Alimentäres System und Stoffwechsel",
  ...,
  // 2nd Level - Therapeutic subgroup
  "A01": "Stomatologika",
  ...,
  // 3rd Level - Pharmacological Subgroup
  "A01A": "Stomatologika",
  ...,
  // 4th Level - Chenical Subgroup
  "A01AA": "Mittel zur Kariesprophylaxe",
  ...,
  // 5th Level - Chemical Substance
  "A01AA01": "Natriumfluorid",
  ...
}
```

> Die Datei [Artikel](data/artikel.json ":ignore") listet alle in der Schweiz zugelassenen Arzneimittel auf. Folgend ein Auszug der vorhanden Felder in der Datei Artikel.

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

    // Datum des letzten Aktualisierung, bei der Status erfasst wurde
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
    // Unter applw ist der Applikationsweg für den Artikel beschrieben. Sine mehrere
    // Applikationswege möglich (z.B. subkutane und/oder imtramuskuläre Gabe) so ist
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
    // - das Volumen des Gesamtproduktes innerhalb einer Packung, ausgedrückt in unterschiedlichen Dosierungeinheiten
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
    // eingesetzt wird ist.
    "gebiet": "senkt den Blutzucker",


    // ------------------
    // Zulassungsinhaber
    // ------------------
    // Unter Inhaber ist der Inhaber der Genehmigung zum in Verkehr bringen
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

Auf den Build Status klicken, um Details der Tests zu sehen.
