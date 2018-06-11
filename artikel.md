# Artikel

Unsere Referenzdaten bestehen aus aggregierten Kenndaten zu den zugelassenen Arzneimitteln in der Schweiz.

Als Grundlage dienen die offiziellen Tabellen zu den zugelassenen Packungen bzw. die Spezialitätenliste, die vom Bundesamt für Gesundheit (BAG) und der Swissmedic herausgegeben werden. Diese Daten werden manuell durch anwendungsbezogene Informationen wie Applikationsweg oder Anwendungsgebiet ergänzt.

Die Stammdaten werden jeden Monat auf den aktuellsten Stand gebracht und von Ärzten und Apothekern manuell aufbereitet und ergänzt. 

### Beispiel der Datenstruktur

```JSON
"7680553510015": {
  "ihStat": true,
  "ihLast": "2018-05-07",
  "ihFrom": "2000-08-08",
  "ihEnds": "2020-08-17",
  "slStat": true,
  "slLast": "2018-05-07",
  "slFrom": "2017-04-01",
  "slEnds": "9999-12-31",
  "gtin": "7680553510015",
  "name1": "Metfin  500, Filmtabletten",
  "name2": "50 Tablette(n)",
  "applw": "p.o.",
  "form": "Tablette",
  "atcCode": "A10BA02",
  "atcName": "Metformin",
  "brandName": "Metfin",
  "brandForms": "Tablette",
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
  "gebiet": "senkt den Blutzucker",
  "inhaber": "Sandoz Pharmaceuticals",
  "exfPreis": "2.25",
  "pubPreis": "6.70"
}
```
|**Abkürzung**| **Bedeutung Abkürzung**| **Erläuterung**|
|--------|---------------|--------------|
|**ihStat**|im Handel: Status|**true:** der Artikel befindet sich im Handel; **false:** der Artikel ist ausser Handel
|**ihLast** | letzer Status | Datum des letzten Aktualisierung, bei der Status erfasst wurde |
|**ihFrom** | zugelassen seit | Startdatum Zulassung für die Dosisstärke des Artikels  |
|**ihEnds** | Ende der Zulassung  | Enddatum der Zulassung |
|**slStat** |Spezialitätenliste: Status |**true:** der Artikel befindet sich auf der Spezialitätenliste; **false:** der Artikel steht nicht auf der Spezialitätenliste
|**slLast** | letzer Status | Datum des letzten Aktualisierung, bei der Status erfasst wurde |
|**slFrom** | Spezialitätenliste seit | Startdatum des Artikels (Spezialitätenliste)        |
|**slEnds** | Enddatum Spezialitätenliste | Enddatum des Artikels auf der Spezialitätenliste |
|**gtin**| GTIN|packungsspezifische, 13-stellige Identifikationsnummer |
|**name1** |Packungsname | Name des Artikels (Teil 1)
|**name2** |Packungsname | Name des Artikels (Teil 2, Bezeichnung der in der Packung enthaltenen Menge)
|**applw** |Applikationsweg | Auswahl des (häufigsten) Applikationsweges fpr den Artikel |
|**form** |Darreichungsform | Darreichungsform, standardisiert |
|**atcCode** |ATC-Code | ATC-Code des Wirkstoffes im Artikel |
|**atcName** |Name des ATC-Codes | Name des ATC-Codes/Wirkstoffname |
|**brandName** |Bezeichnung der Marke |Alle Artikel, welche unter derselben Marke geführt werden (z.B. verschiedene Dosisstärken, Packungsgrössen), sind zu Marken-Gruppen zusammengefasst|
|**brandForms**| Darreichungsformen der Marke | mögliche verschiedene Darreichungsformen, die innerhalb der Marke vorkommen |
|**unit** & **type** |Zahl & Einheit |Die Einträge in **unit** und **type** gehören jeweils zusammen (unit1 & type1, unit2 & type2...). Es bezeichnet die Menge an Wirkstoff innerhalb einer Packung, ausgedrückt in unterschiedlichen Einheiten bzw. das Volumen des Gesamtproduktes innerhalb einer Packung, ausgedrückt in unterschiedlichen Einheiten oder die Anzahl der Dosiseinheiten (z.B. Stückzahl der Tabletten) in einer Packung |
|**gebiet**| Anwendungsgebiet | Patientenfreundlicher Informationstext über medizinische Wirkung des Artikels/Indikationsgebiet, in dem der Artikel eingesetzt wird |
|**Inhaber**| Zulassungsinhaber | Inhaber der Genehmigung zum in Handel bringen des Artikels|
|**exfPreis** | Ex-Factory-Preis | Ex-Factory-Preis |
|**pubPreis** | Publikumspreis | Publikumspreis|