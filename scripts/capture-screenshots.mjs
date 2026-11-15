import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const base = "http://127.0.0.1:8765";
const outDir = "/opt/cursor/artifacts";

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`${base}/#/`);
await page.waitForSelector("#mexico-map-svg path.has-producers", { timeout: 15000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${outDir}/desktop-home-map.png`, fullPage: true });

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mobile.newPage();
await mpage.goto(`${base}/#/`);
await mpage.waitForSelector("#mexico-map-svg", { timeout: 15000 });
await mpage.waitForTimeout(800);
await mpage.screenshot({ path: `${outDir}/mobile-home-map.png`, fullPage: true });

await page.goto(`${base}/#/productor/tomas-rizo`);
await page.waitForSelector("h1", { timeout: 10000 });
await page.screenshot({ path: `${outDir}/desktop-producer.png`, fullPage: true });

await page.goto(`${base}/#/pieza/pieza-collar-plata`);
await page.click("#add-piece-btn");
await page.goto(`${base}/#/checkout`);
await page.waitForSelector("#checkout-form", { timeout: 10000 });
await page.screenshot({ path: `${outDir}/desktop-checkout.png`, fullPage: true });

await browser.close();
console.log("Screenshots saved to", outDir);