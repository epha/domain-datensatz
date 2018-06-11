# Einleitung

Unsere Referenzdaten bestehen aus aggregierten Kenndaten zu den zugelassenen Arzneimitteln in der Schweiz.

Als Grundlage dienen die offiziellen Tabellen zu den zugelassenen Packungen bzw. die Spezialitätenliste, die vom Bundesamt für Gesundheit (BAG) und der Swissmedic herausgegeben werden. Diese Daten werden manuell durch anwendungsbezogene Informationen wie Applikationsweg oder Anwendungsgebiet ergänzt.

Die Referenzdaten werden jeden Monat auf den aktuellsten Stand gebracht und von Ärzten und Apothekern manuell aufbereitet und ergänzt. 

## Downloads

<section class='downloads-wrapper'>

  <a class='download' href="data/wirkstoffe.json" download="wirkstoffe.json">wirkstoffe.json</a>

  <a class='download' href="data/artikel.json" download="artikel.json">artikel.json</a>

</section>

## npm prerequisite

- [node.js](https://nodejs.org/en/) installieren

- Package in Projekt via [npm](https://www.npmjs.com/) installieren.
```bash
$ npm i epha/domain-datesatz
```

## Use case Beispiel

- [Artikel](docs/artikel.md)

Alle Artikel filtern, welche den Applikationsweg Aural haben.

```javascript
const { artikel } = require('domain-datensatz')
const result = Object.values(artikel).filter((a) => a.applw == "aural")
```

- [Wirkstoffe](docs/wirkstoffe.md)


Alle Wirkstoffe filtern worin Paracetamol vorkommt.

```javascript
const { wirkstoffe } = require('domain-datensatz')
const result = Object.values(wirkstoffe).filter((w) => w.toLowerCase().includes('paracetamol'))
```