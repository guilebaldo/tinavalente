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
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  await context.close();
}

await shoot("desktop-home", "#/", 1280, 900);
await shoot("mobile-home", "#/", 390, 844);
await shoot("desktop-nosotros", "#/nosotros", 1280, 900);
await shoot("mobile-nosotros", "#/nosotros", 390, 844);
await shoot("desktop-coleccion-tina", "#/coleccion-tina", 1280, 900);
await shoot("mobile-coleccion-tina", "#/coleccion-tina", 390, 844);
await shoot("desktop-piece-authorship", "#/pieza/tina-chaleco-brocado", 1280, 900);
await shoot("mobile-piece-authorship", "#/pieza/tina-chaleco-brocado", 390, 844);

await browser.close();
console.log("ok");