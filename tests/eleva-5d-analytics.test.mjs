import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const html = read('index.html');
const script = read('lp-5d/v9/app.js');

test('a home instala uma única tag GA4 da propriedade existente e seu projeto Clarity específico', () => {
  assert.equal((html.match(/googletagmanager\.com\/gtag\/js\?id=G-RZGESTEZCK/g) || []).length, 1);
  assert.match(html, /gtag\('config', 'G-RZGESTEZCK'/);
  assert.match(html, /"yr5sw9xx5z"/);
  assert.match(html, /www\.clarity\.ms\/tag\//);
  assert.doesNotMatch(html, /yaiki79vjn/);
  assert.match(html, /allow_google_signals: false/);
  assert.match(html, /allow_ad_personalization_signals: false/);
});

test('o clique no WhatsApp emite contato sem simular compra e encaminha eventos ao Clarity', () => {
  const listeners = {};
  const cta = { dataset: { cta: 'offer-contact' }, getAttribute: () => 'https://wa.me/message/R6WHM3W3SGCSE1', addEventListener: (name, fn) => { listeners[name] = fn; } };
  const commands = [];
  const clarityEvents = [];
  const window = { dataLayer: [], gtag: (...args) => commands.push(args), clarity: (...args) => clarityEvents.push(args) };
  const document = { querySelectorAll: selector => selector === '[data-cta]' ? [cta] : [], querySelector: () => null };
  vm.runInNewContext(script, { window, document });
  listeners.click();
  assert.equal(commands.filter(([_, event]) => event === 'eleva5d_contact_click').length, 1);
  assert.ok(clarityEvents.some(([command, event]) => command === 'event' && event === 'eleva5d_contact_click'));
  assert.ok(!commands.some(([_,event]) => ['purchase', 'generate_lead'].includes(event)));
  const params = commands.find(([_,event]) => event === 'eleva5d_contact_click')[2];
  assert.equal(params.version, 'v9');
  assert.equal(params.cta, 'offer-contact');
  assert.ok(!('email' in params || 'phone' in params || 'user_id' in params));
});

test('a instalação da home não modifica a tag ou o projeto Clarity da bio', () => {
  const bio = read('bio/index.html');
  assert.match(bio, /G-RZGESTEZCK/);
  assert.match(bio, /yaiki79vjn/);
  assert.doesNotMatch(bio, /yr5sw9xx5z/);
});
