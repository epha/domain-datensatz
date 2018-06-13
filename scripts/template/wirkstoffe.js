module.exports = (wirkstoffe) => {

  const stats = {
    total: 0,
    '1': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '7': 0
  }

  const keys = Object.keys(wirkstoffe)

  keys.forEach((key) => {
    stats.total++
    stats[key.length]++
  })

return `

# Wirkstoffe

**ATC** steht für **Anatomic-Therapeutic Classification**. Im ATC-Klassifikationssystem werden Wirkstoffe
hierarchisch gruppiert. Unsere Liste der ATC-Codes enthält alle ATC-Codes mit den dazugehörigen Wirkstoffbezeichnungen,
welche zur Klassifikation der in der Schweiz zugelassenen Artikeln angewendet werden. Die Grundlage der gelisteten ATC-Codes
sind die von der Swissmedic herausgegebenen Codes. Für den Fall, dass Swissmedic einem Artikel nur einen 4- oder 5-stelligen ATC-Code
zuteilt und für den Wirkstoff des Präparates ein offizieller 7-stelliger Code existiert (z.B. publiziert durch die WHO) kann dieser
stattdessen übernommen werden. Existiert kein offizieller ATC-Code werden falls nötig für einzelne Wirkstoffe 7-stellige ACT-Codes kreiert.

http://mbostock.github.io/d3/talk/20111116/pack-hierarchy.html

[Wirkstoffe Stats](/pack.html ':include :type=iframe width=100% height=800px')

`

}
