#!/usr/bin/env node
/**
 * Export press kit to A4 PDF via Chrome + Puppeteer.
 * Usage: npm run pdf   (dev server must be running on PORT, default 5173)
 */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'dist-print');
const outFile = resolve(outDir, 'dhyogo-press-kit.pdf');
const port = process.env.PORT || '5173';
const url = process.env.PRINT_URL || `http://localhost:${port}/`;

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter(Boolean);

function findChrome() {
  for (const c of chromeCandidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

mkdirSync(outDir, { recursive: true });
const executablePath = findChrome();
if (!executablePath) {
  console.error('Chrome/Chromium não encontrado. Defina CHROME_PATH.');
  process.exit(1);
}

console.log(`Gerando PDF A4 a partir de ${url}`);

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
});

try {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  await page.emulateMediaType('print');
  console.log('Abrindo página…');
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('Aguardando fontes e fotos…');
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const imgs = [...document.images];
    imgs.forEach((img) => { img.loading = 'eager'; });
    await Promise.all(imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((res) => {
        const done = () => res();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
        setTimeout(done, 8000);
      });
    }));
  });
  await new Promise((r) => setTimeout(r, 300));

  // Detect sheets that would overflow an A4 page before exporting
  const overflow = await page.evaluate(() => {
    const a4h = 297 * (96 / 25.4);
    return [...document.querySelectorAll('.print-sheet')].map((el) => ({
      id: el.id,
      h: Math.round(el.getBoundingClientRect().height),
      scrollH: el.scrollHeight,
      spill: el.scrollHeight - Math.round(a4h),
    }));
  });
  console.log('Pré-check overflow:', overflow);

  const pdf = await page.pdf({
    path: outFile,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  // Also write a page-metrics sidecar for debugging
  const metrics = await page.evaluate(() => {
    const mm = 96 / 25.4;
    const a4h = 297 * mm;
    return [...document.querySelectorAll('.print-sheet')].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        id: el.id || el.className,
        heightPx: Math.round(r.height),
        scrollH: el.scrollHeight,
        a4Pages: Number((r.height / a4h).toFixed(2)),
        clipped: el.scrollHeight > el.clientHeight + 4,
      };
    });
  });
  writeFileSync(resolve(outDir, 'metrics.json'), JSON.stringify(metrics, null, 2));
  console.log(`PDF salvo em ${outFile} (${Math.round(pdf.length / 1024)} KB)`);
  console.log('Métricas:', metrics);
} finally {
  await browser.close();
}
