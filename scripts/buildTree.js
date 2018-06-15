const fs = require("fs")
const artikel = require("expert-packungen")

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

fs.writeFileSync('./docs/tree.json', JSON.stringify(data,2,null))
