const pck = require("../package.json")
const fs = require("fs")
const packungen = require("expert-packungen")
const wirkstoff = require("expert-wirkstoffe")

const update = async () => {

  console.log("")
  console.log("> ============")
  console.log(">  Datensatz")
  console.log("> ============")

  // -----------------------------
  // Build Markdown from Template
  // -----------------------------
  let cp = fs.readFileSync('./_coverpage.md')
  cp = cp.toString().replace(/small\\>.*\\</,`small>${pck.version}<`)
  fs.writeFileSync('./_coverpage.md', cp)

  // -----------------------------
  // Copy required assets
  // -----------------------------
  console.time("> Copy required node_modules")
  fs.writeFileSync('./assets/src/lottie.min.js', fs.readFileSync('./node_modules/lottie-web/build/player/lottie.min.js') )
  fs.writeFileSync('./assets/src/lottie_light.min.js', fs.readFileSync('./node_modules/lottie-web/build/player/lottie_light.min.js' ) )
  fs.writeFileSync('./assets/src/docsify.min.js', fs.readFileSync('./node_modules/docsify/lib/docsify.min.js' ) )
  fs.writeFileSync('./assets/css/vue.css', fs.readFileSync('./node_modules/docsify/lib/themes/vue.css' ) )
  fs.writeFileSync('./assets/css/buble.css', fs.readFileSync('./node_modules/docsify/lib/themes/buble.css' ) )
  fs.writeFileSync('./assets/src/prism-markdown.min.js', fs.readFileSync('./node_modules/prismjs/components/prism-markdown.min.js' ) )
  fs.writeFileSync('./assets/src/prism-bash.min.js', fs.readFileSync('./node_modules/prismjs/components/prism-markdown.min.js' ) )
  fs.writeFileSync('./assets/src/prism-javascript.min.js', fs.readFileSync('./node_modules/prismjs/components/prism-markdown.min.js') )
  fs.writeFileSync('./assets/src/d3.min.js', fs.readFileSync('./node_modules/d3/dist/d3.min.js') )
  fs.writeFileSync('./assets/src/d3-scale-chromatic.min.js', fs.readFileSync('./node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.min.js') )
  fs.writeFileSync('./assets/src/d3-legend.min.js', fs.readFileSync('./node_modules/d3-svg-legend/d3-legend.min.js') )
  console.timeEnd("> Copy required node_modules")

  // -----------------------------
  // Copy data Files
  // -----------------------------
  console.time("> Copy Packungen")
  fs.writeFileSync('./data/artikel.json',JSON.stringify(packungen,null,2))
  console.timeEnd("> Copy Packungen")

  console.time("> Copy Wirkstoffe")
  fs.writeFileSync('./data/wirkstoffe.json',JSON.stringify(await wirkstoff(),null,2))
  console.timeEnd("> Copy Wirkstoffe")

  console.log("")
}

update()
