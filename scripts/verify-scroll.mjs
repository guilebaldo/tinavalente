import { chromium } from "playwright";

const base = "http://127.0.0.1:8765";
const browser = await chromium.launch({ headless: true });

async function check(name, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${base}/#/`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.goto(`${base}/#/productor/maria-chen`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const y = await page.evaluate(() => window.scrollY);
  console.log(`${name}: scrollY=${y}`);
  if (y > 80) throw new Error(`${name} did not scroll to top`);
  await page.close();
}

await check("desktop", 1280, 900);
await check("mobile", 390, 844);
await browser.close();
console.log("scroll ok");