import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const base = "http://127.0.0.1:8765";
const outDir = "/opt/cursor/artifacts";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function shoot(name, path, width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto(`${base}/${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  await context.close();
}

await shoot("desktop-home-map", "#/", 1280, 900);
await shoot("mobile-home-map", "#/", 390, 844);
await shoot("desktop-producer", "#/productor/tomas-rizo", 1280, 900);
await shoot("mobile-producer", "#/productor/tomas-rizo", 390, 844);
await shoot("desktop-piece", "#/pieza/pieza-collar-plata", 1280, 900);
await shoot("mobile-piece", "#/pieza/pieza-collar-plata", 390, 844);
await shoot("desktop-experiences", "#/experiencias", 1280, 900);
await shoot("mobile-experiences", "#/experiencias", 390, 844);

const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
await page.goto(`${base}/#/pieza/pieza-collar-plata`);
await page.click("#add-piece-btn");
await page.goto(`${base}/#/checkout`);
await page.waitForSelector("#checkout-form");
await page.screenshot({ path: `${outDir}/desktop-checkout.png`, fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: `${outDir}/mobile-checkout.png`, fullPage: true });
await context.close();

await browser.close();
console.log("ok");