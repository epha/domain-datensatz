##Einleitung

Unsere Referenzdaten bestehen aus aggregierten Kenndaten zu den zugelassenen Arzneimitteln in der Schweiz.

Als Grundlage dienen die offiziellen Tabellen zu den zugelassenen Packungen bzw. die Spezialitätenliste, die vom Bundesamt für Gesundheit (BAG) und der Swissmedic herausgegeben werden. Diese Daten werden manuell durch anwendungsbezogene Informationen wie Applikationsweg oder Anwendungsgebiet ergänzt.

Die Referenzdaten werden jeden Monat auf den aktuellsten Stand gebracht und von Ärzten und Apothekern manuell aufbereitet und ergänzt. 

### Beispiel der Datenstruktur

```JSON
"7680553510015": {

  //Status im Handel: true/false (siehe Details)
  "ihStat": true,
  
  //Datum der letzten Aktualisierung, bei der Status erfasst wurde
  "ihLast": "2018-05-07",
  
  //Startdatum der Zulassung 
  "ihFrom": "2000-08-08",
  
  //Enddatum der Zulassung
  "ihEnds": "2020-08-17",
  
  //Status "Spezialitätenliste": true/false (siehe Details)
  "slStat": true,
  
  //Datum des letzten Aktualisierung, bei der Status erfasst wurde 
  "slLast": "2018-05-07",
  
  //Startdatum des Artikels (Spezialitätenliste)     
  "slFrom": "2017-04-01",
  
  //Enddatum des Artikels (Spezialitätenliste) 
  "slEnds": "9999-12-31",
  
  //Packungsspezifische, 13-stellige Identifikationsnummer
  "gtin": "7680553510015",
  
  //Bezeichnung Artikel
  "name1": "Metfin  500, Filmtabletten",
  "name2": "50 Tablette(n)",
  
  //Applikationsweg (siehe Details)
  "applw": "p.o.",
  
  //Darreichungsform (siehe Details)
  "form": "Tablette",
  
  //ATC-Code und Wirkstoffname (see "Wirkstoffe")
  "atcCode": "A10BA02",
  "atcName": "Metformin",
  
  //Marke und möfliche Darreichungsformen (siehe Details)
  "brandName": "Metfin",
  "brandForms": "Tablette",
  
  //Charakterisierung des Inhaltes pro Packung (siehe Details)
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
  
  //Patientenfreundlicher Informationstext (siehe Details)
  "gebiet": "senkt den Blutzucker",
  
  //Zulassungsinhaber (siehe Details)
  "inhaber": "Sandoz Pharmaceuticals",
  
  //Preise
  "exfPreis": "2.25",
  "pubPreis": "6.70"
}
