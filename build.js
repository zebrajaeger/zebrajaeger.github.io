const Puppeteer = require('puppeteer');
const path = require('path');
const source = path.resolve(__dirname, '_site', 'index.html');
const destination = path.resolve(__dirname, '_site', 'index.pdf');
(async () =>{
  await buildPdf(source, destination);
})();

async function buildPdf(inputFile, outputFile) {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${inputFile}`, {
    waitUntil: 'networkidle0'
  });
  await page.pdf({
    path: outputFile,
    format: 'A4',
    border: 0,
    margin: {
      top: '2.54cm',
      right: '2.54cm',
      bottom: '2.54cm',
      left: '2.54cm',
    },
  });
  await browser.close();
}
