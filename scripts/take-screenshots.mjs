import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('docs/screenshots/v2');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const targets = [
    // Little Explorers (Kids Mode)
    { name: 'kids-home-1440x900.png', url: 'http://localhost:3000/?mode=kids', width: 1440, height: 900 },
    { name: 'kids-home-390x844.png', url: 'http://localhost:3000/?mode=kids', width: 390, height: 844 },
    { name: 'kids-opportunity-1440x900.png', url: 'http://localhost:3000/machines/opportunity?mode=kids', width: 1440, height: 900 },
    { name: 'kids-opportunity-390x844.png', url: 'http://localhost:3000/machines/opportunity?mode=kids', width: 390, height: 844 },
    { name: 'kids-ingenuity-1440x900.png', url: 'http://localhost:3000/machines/ingenuity?mode=kids', width: 1440, height: 900 },
    { name: 'kids-laser-mirror-1440x900.png', url: 'http://localhost:3000/machines/apollo-11-laser-reflector?mode=kids', width: 1440, height: 900 },

    // Mission Control (Detailed Mode)
    { name: 'control-home-1440x900.png', url: 'http://localhost:3000/?mode=control', width: 1440, height: 900 },
    { name: 'control-home-390x844.png', url: 'http://localhost:3000/?mode=control', width: 390, height: 844 },
    { name: 'control-opportunity-1440x900.png', url: 'http://localhost:3000/machines/opportunity?mode=control', width: 1440, height: 900 },
    { name: 'control-opportunity-390x844.png', url: 'http://localhost:3000/machines/opportunity?mode=control', width: 390, height: 844 },

    // Teachers with coloring sheets
    { name: 'teachers-coloring-1440x900.png', url: 'http://localhost:3000/teachers', width: 1440, height: 900 }
  ];

  for (const t of targets) {
    const page = await browser.newPage();
    await page.setViewport({ width: t.width, height: t.height });
    await page.goto(t.url, { waitUntil: 'networkidle0', timeout: 15000 });
    // small settle delay for fonts/animations
    await new Promise((r) => setTimeout(r, 600));
    const file = path.join(outDir, t.name);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`Saved screenshot: ${t.name}`);
    await page.close();
  }

  await browser.close();
  console.log('All v2 screenshots captured successfully!');
}

takeScreenshots().catch(console.error);
