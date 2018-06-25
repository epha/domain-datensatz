const tape = require('tape');
const puppeteer = require('puppeteer');
const fetch = require("isomorphic-fetch")
const express = require("express")
const os = require("os")
const path = require("path")

// ============================
// Provide Server
// ============================
// //localhost:13457/assets
// //localhost:13457/datensatz
const app = express()

app.use('/assets', express.static( path.join(__dirname, '../../../', '/domain-assets/assets') ) )
app.use('/datensatz', express.static( path.join(__dirname, '../../', '/datensatz') ) )

const hosting = app.listen(13457)

tape.only('html button download', async (t) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //await page.goto('https://epha.io/datensatz/#/docs/einleitung', { waitUntil: 'networkidle2'});
  await page.goto('http://localhost:13457/datensatz/#/docs/einleitung', { waitUntil: 'networkidle2' });
  await page.screenshot({path: './test/html/screenshot.png'});

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
     const href = document.querySelector('a.download').href
     return fetch(href).then(res=>res.json())
  });

  t.equals(file['V10XX03'],'[223Ra]Radiumdichlorid', "Wirkstoff download and valid file")

  await browser.close()
  await hosting.close()

  t.end();

});
