const fs = require("fs")
const artikel = require("expert-packungen")

// -------------------------------
// Unique List of Forms and Applw
// -------------------------------
const group = Object.values(artikel).reduce((acc, cur) => {

  acc[`${cur.form}=${cur.applw}`] = acc[`${cur.form}=${cur.applw}`] || []
  acc[`${cur.form}=${cur.applw}`].push(cur)

  return acc
}, {})


let data = Object.keys(group).map(key => {

  const units = group[key].reduce((acc, cur) => {

    if (cur.type1) {
      acc[cur.type1] = acc[cur.type1] || 0
      acc[cur.type1]++
    }
    if (cur.type2) {
      acc[cur.type2] = acc[cur.type2] || 0
      acc[cur.type2]++
    }
    if (cur.type3) {
      acc[cur.type3] = acc[cur.type3] || 0
      acc[cur.type3]++
    }
    if (cur.type4) {
      acc[cur.type4] = acc[cur.type4] || 0
      acc[cur.type4]++
    }
    if (cur.type5) {
      acc[cur.type5] = acc[cur.type5] || 0
      acc[cur.type5]++
    }

    return acc
  }, {})

  const rows = Object.keys(units).map(key2 => {
    return `${key2.padStart(6,"\u00A0")} - ${String( (units[key2]/group[key].length*100).toFixed(1)+"% ").padStart(7,"\u00A0")}`
  })

  return {
    // Tablette
    cat: key.split("=")[0],
    // Applw p.o.
    name: `${key.split("=")[1]}`,
    // 30
    value: 100 + 0.7 * group[key].length, //Math.log(1.2),
    // p.o.
    icon: key.split("=")[1],
    // Description
    desc: `
    Form ${key.split("=")[0]}<br>
    n = ${group[key].length}<br>
    <br>
    Verfügbare Einheiten<br>
    <br>
    ${rows.join("<br>")}<br>
  `
  }
})

fs.writeFileSync('./docs/bubble.json', JSON.stringify(data,null,2))
