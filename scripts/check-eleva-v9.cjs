const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

let playwright;
try { playwright = require('playwright'); } catch {
  playwright = require('C:/Users/leona/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
}
const base = process.env.ELEVA_V9_URL || 'http://127.0.0.1:4173/lp-5d/v9/';
const output = path.resolve(__dirname, '../tmp/eleva-v9-audit');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const errors = [];
  const report = { url: base, checkedAt: new Date().toISOString(), viewports: [], interactionChecks: [] };
  try {
    for (const [width, height] of [[320, 740], [375, 812], [390, 844], [591, 1280], [768, 1024], [1024, 768], [1440, 900], [1920, 1080], [844, 390]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(base, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const checks = await page.evaluate(async () => {
        document.querySelectorAll('details').forEach((detail) => { detail.open = true; });
        document.querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = 'eager'; });
        await Promise.all([...document.images].filter((image) => image.hasAttribute('src')).map((image) => image.decode().catch(() => null)));
        return {
          viewport: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          brokenImages: [...document.images].filter((image) => image.hasAttribute('src') && !image.naturalWidth).map((image) => image.src),
          overflow: [...document.querySelectorAll('main *')].filter((node) => {
            const bounds = node.getBoundingClientRect();
            return bounds.width > 0 && (bounds.right > innerWidth + 1 || bounds.left < -1);
          }).map((node) => node.className || node.tagName).slice(0, 12),
          tinyControls: [...document.querySelectorAll('a,button,summary')].filter((node) => {
            const bounds = node.getBoundingClientRect();
            return bounds.width > 0 && bounds.height > 0 && !node.closest('dialog') && node.className !== 'skip-link' && bounds.height < 43;
          }).map((node) => node.textContent.trim().slice(0, 40)),
          heroHeadingHeight: document.querySelector('h1').getBoundingClientRect().height,
          portrait: (() => { const rect = document.querySelector('.authority-photo img').getBoundingClientRect(); return { width: rect.width, height: rect.height }; })(),
          methodsSideBySide: [...document.querySelectorAll('.method-card')].map((card) => Math.round(card.getBoundingClientRect().top)),
        };
      });
      assert.ok(checks.documentWidth <= width + 1, `${width}px: overflow horizontal`);
      assert.deepEqual(checks.brokenImages, [], `${width}px: imagens não carregadas`);
      assert.deepEqual(checks.overflow, [], `${width}px: elementos fora da viewport`);
      assert.deepEqual(checks.tinyControls, [], `${width}px: alvos de toque menores que 44px`);
      assert.ok(Math.abs(checks.portrait.height / checks.portrait.width - (width >= 768 ? 4 / 3 : 5 / 4)) < 0.01, `${width}px: proporção do retrato da especialista incorreta`);
      report.viewports.push({ width, height, ...checks });
      await page.evaluate(() => { document.querySelectorAll('details').forEach((detail) => { detail.open = detail.dataset.phase === '1'; }); });
      if (width === 390 || width === 768 || width === 1440) {
        await page.screenshot({ path: path.join(output, `${width}-hero.png`) });
        for (const section of ['mechanism', 'experience', 'journey', 'proof', 'authority', 'offer']) {
          await page.locator(`[data-section="${section}"]`).evaluate((node) => {
            window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - 74, behavior: 'instant' });
          });
          await page.waitForTimeout(150);
          await page.screenshot({ path: path.join(output, `${width}-${section}.png`) });
        }
      }
      if (width === 390) {
        await page.locator('[data-proof-image]').first().click();
        assert.equal(await page.locator('dialog').evaluate((dialog) => dialog.open), true);
        await page.locator('dialog img').evaluate((image) => image.decode());
        assert.equal(await page.locator('dialog img').evaluate((image) => image.naturalWidth), 1020);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('dialog').evaluate((dialog) => dialog.open), false);
        assert.equal(await page.locator('[data-proof-image]').first().evaluate((button) => button === document.activeElement), true);
        report.interactionChecks.push('print ampliado, Escape e foco devolvido ao botão');
        await page.locator('.faq-list summary').first().click();
        assert.equal(await page.locator('.faq-list details').first().evaluate((item) => item.open), true);
        await page.locator('[data-section="recognition"]').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        assert.equal(await page.locator('[data-mobile-action]').isVisible(), true);
        await page.locator('#oferta').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        assert.equal(await page.locator('[data-mobile-action]').isVisible(), false);
        report.interactionChecks.push('FAQ abre; CTA mobile aparece após hero e se recolhe na oferta');
        assert.ok(await page.evaluate(() => window.dataLayer.some((event) => event.event === 'eleva5d_testimonial_open')));
        report.interactionChecks.push('eventos registrados sem dados pessoais');
      }
      await page.close();
    }
    const noScript = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
    await noScript.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await noScript.locator('.phase').count(), 4);
    assert.equal(await noScript.locator('.day-list li').count(), 30);
    assert.ok(await noScript.locator('[data-cta="offer-contact"]').getAttribute('href'));
    report.interactionChecks.push('conteúdo, currículo e contato disponíveis sem JavaScript');
    await noScript.close();
    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 375, height: 812 } });
    await reduced.goto(base);
    assert.equal(await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    report.interactionChecks.push('movimento reduzido respeitado');
    await reduced.close();
    assert.deepEqual(errors, [], 'erros JavaScript no navegador');
    report.javascriptErrors = errors;
    fs.writeFileSync(path.join(output, 'browser-report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
