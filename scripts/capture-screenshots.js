// Usage:  npm i playwright && npx playwright install chromium
//         node capture-screenshots.js              (all three: web19, web20, web21)
//         node capture-screenshots.js 20           (only that IMAGE number)
// Only writes web19.png, web20.png, web21.png. Other screenshots are never touched.
// Writes images/webNN.png at 2x the slot size, matching each slide's image box.
//
// Selection is by IMAGE number (the NN in webNN.png), not slide number, so it keeps working
// when slides get shuffled. "slide" below is just a label for the log output.
const { chromium } = require('playwright');
const fs = require('fs');

const OUT = 'images';
const SCALE = 2;
// slot = image box on the slide in slide pixels (1280x720). vw = browser width used for the page layout;
// vh is derived from the slot's aspect ratio so the screenshot fits the box with no crop or letterbox.
// js:false = load the page with JavaScript turned off (used for the sketchy site, see web20).
const T = [
  { slide: 13, file: 'web21.png', slot: [1100, 430], vw: 1280, url: 'https://replayweb.page/' },                         // Store & Replay
  { slide: 36, file: 'web19.png', slot: [1100, 430], vw: 1280, url: 'https://www.loc.gov/web-archives/collections/' },      // Government Documents
  { slide: 37, file: 'web20.png', slot: [1100, 430], vw: 1280, url: 'https://archive.is/', js: false },                     // Malware (JS off on purpose)
];

// "web21.png" -> 21
const num = (t) => Number(t.file.match(/web(\d+)\.png/)[1]);

(async () => {
  const only = process.argv.slice(2).map(Number);
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  for (const t of T) {
    if (only.length && !only.includes(num(t))) continue;
    const vh = Math.round(t.vw * t.slot[1] / t.slot[0]);
    const ctx = await browser.newContext({
      viewport: { width: t.vw, height: vh },
      deviceScaleFactor: SCALE,
      javaScriptEnabled: t.js !== false,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(t.url, { waitUntil: t.js === false ? 'load' : 'networkidle', timeout: 45000 }).catch(() => {});
      await page.waitForTimeout(2500);               // let late fonts/images/animations settle
      await page.screenshot({ path: `${OUT}/${t.file}`, fullPage: false });
      console.log(`${t.file}  (slide ${t.slide})  ${t.vw * SCALE}x${vh * SCALE}  <- ${t.url}`);
    } catch (e) { console.log(`${t.file}  (slide ${t.slide})  FAILED ${e.message}`); }
    await ctx.close();
  }
  await browser.close();
})();