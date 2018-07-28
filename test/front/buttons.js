const tape = require('tape');
const puppeteer = require('puppeteer');
const fetch = require("isomorphic-fetch")
//const express = require("express")
//const os = require("os")

// ============================
// Provide Server
// ============================
// //localhost:13457/assets
// //localhost:13457/datensatz

//const app = express()

//app.use("/", express.static('./node_modules/domain-akte'))
//app.use('/assets', express.static( './node_modules/domain-assets/assets') )
//app.use('/datensatz', express.static( './datensatz')  )
//app.use('/datensatz/docs/starten', express.static( './datensatz/index.html')  )

//const hosting = app.listen(13457)

tape('front buttons', async (t) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://epha.ch/datensatz/docs/starten/', { waitUntil: 'networkidle2'});
  //page.goto(`http:///${os.hostname()}:13457/datensatz/docs/starten`, { waitUntil: 'networkidle2' });
  //page.screenshot({path: './test/front/screenshot.png'});

  // Get the "viewport" of the page, as reported by the page.
  // const dimensions = await page.evaluate(() => {
  //   return {
  //     width: document.documentElement.clientWidth,
  //     height: document.documentElement.clientHeight,
  //     deviceScaleFactor: window.devicePixelRatio
  //   };
  // });
  // console.log('Dimensions:', dimensions);

  const file = await page.evaluate(() => {
     //console.log(document.body.innerHTML)
     const href = document.querySelector('a.download').href
     return fetch(href).then(res=>res.json())
  });

  t.equals(file['V10XX03'],'[223Ra]Radiumdichlorid', "Download valid file")

  await browser.close()
  //await hosting.close()

  t.end();

});
