const pck = require("../package.json")
const fs = require("fs")

const { coverpage, wirkstoffe, artikel } = require("./template")
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
  console.time("> Template Coverpage")
  fs.writeFileSync('./_coverpage.md', coverpage(pck) )
  console.timeEnd("> Template Coverpage")

  console.time("> Template Wirkstoffe")
  fs.writeFileSync('./docs/wirkstoffe.md', wirkstoffe(await wirkstoff()) )
  console.timeEnd("> Template Wirkstoffe")

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
