const pck = require("../package.json")
const fs = require("fs")

const artikel = require("expert-packungen")
const wirkstoff = require("expert-wirkstoffe")

console.log("")
console.log("> ============")
console.log(">  Datensatz")
console.log("> ============")

const update = async () => {

  // -----------------------------
  // Copy data Files
  // -----------------------------
  console.time("> Copy artikel")
  fs.writeFileSync('./datensatz/data/artikel.json',JSON.stringify(artikel,null,2))
  console.timeEnd("> Copy artikel")

  console.time("> Copy Wirkstoffe")
  fs.writeFileSync('./datensatz/data/wirkstoffe.json',JSON.stringify(await wirkstoff(),null,2))
  console.timeEnd("> Copy Wirkstoffe")
  

  // -----------------------------
  // Build Markdown from Template
  // -----------------------------

  let cp = fs.readFileSync('./datensatz/index.html')
  cp = cp.toString().replace(/small>.*</,`small>${pck.version}<`)
  fs.writeFileSync('./datensatz/index.html', cp)

  updateTree()
  updateBubble()
}

update()


//---
// Update charts
//---

const updateTree = () => {
  // ---------------
  // Create Data
  // for Graph tree
  // ---------------
  const group = Object.values(artikel).reduce((acc,cur) => {

    acc[cur.inhaber] = acc[cur.inhaber] || {}
    acc[cur.inhaber][cur.brandName] = acc[cur.inhaber][cur.brandName] || []
    acc[cur.inhaber][cur.brandName].push(cur)

    return acc
  }, {})

  const data = {
    name: '',
    children: []
  }

  Object.keys(group).sort((a,b) => a.localeCompare(b)).forEach(key1 => {

    // Inhaber
    const inhaber = {
      name: key1,
      children: []
    }

    // BrandName
    const brandNames = Object.keys(group[key1]).forEach(key2 => {

      // Artikel
      const artikel = Array.from( new Set( group[key1][key2].map(item => item.name1) ) ).map(name1 => {
        return { name:`${name1}`}
      })

      inhaber.children.push({ name: key2, children: Array.from(new Set(artikel)) })
    })

    if(inhaber.children.length > 20) {
      data.children.push(inhaber)
    }

  })

  fs.writeFileSync('./datensatz/docs/tree.json', JSON.stringify(data,2,null))
}

const updateBubble = () => {
  // -------------------------------
  // Graph Bubble
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

  fs.writeFileSync('./datensatz/docs/bubble.json', JSON.stringify(data,null,2))
}