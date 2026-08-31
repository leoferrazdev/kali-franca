import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pagePath = resolve(root, 'mentoria-frequencia-da-abundancia', 'index.html');
const stylesPath = resolve(root, 'mentoria-frequencia-da-abundancia', 'styles.css');
const scriptPath = resolve(root, 'mentoria-frequencia-da-abundancia', 'app.js');

const read = (filePath) => (existsSync(filePath) ? readFileSync(filePath, 'utf8') : '');

const questions = [
  'full_name', 'age_range', 'sex', 'email', 'whatsapp', 'city_state', 'challenge', 'beliefs',
  'energy_tools_experience', 'priority_area', 'current_state', 'predominant_feeling',
  'previous_support', 'perceived_block', 'desired_wins', 'commitment_score', 'investment_readiness'
];

test('a aplicação pública possui a rota e o shell de formulário', () => {
  const html = read(pagePath);
  const script = read(scriptPath);

  assert.ok(existsSync(pagePath), 'a página pública deve existir');
  assert.ok(existsSync(stylesPath), 'os estilos da aplicação devem existir');
  assert.ok(existsSync(scriptPath), 'o comportamento da aplicação deve existir');
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /mentoria-frequencia-da-abundancia/i);
  assert.match(html, /Mentoria Frequência da Abundância/i);
  assert.match(html, /id=["']application-form["']/i);
  assert.match(html, /data-step=["']intro["']/i);
  assert.match(html, /data-step=["']success["']/i);
  assert.equal((html.match(/data-question/gi) || []).length, 17);
});

test('a aplicação publica as 17 respostas aprovadas e o consentimento mínimo', () => {
  const html = read(pagePath);

  for (const question of questions) {
    assert.match(html, new RegExp(`name=["']${question}["']`, 'i'), question);
  }

  assert.match(html, /Concordo que os dados informados sejam usados para analisar minha aplicação e entrar em contato comigo\./i);
  assert.match(html, /type=["']checkbox["'][^>]+required/i);
  assert.match(html, /Gratidão pela sua Presença e Honestidade\./i);
  assert.doesNotMatch(html, /\.\.\.|…/);
});

test('a aplicação preserva acessibilidade, tokens e privacidade no navegador', () => {
  const html = read(pagePath);
  const styles = read(stylesPath);
  const script = read(scriptPath);

  assert.match(html, /brandbook[\\/]tokens\.css/i);
  assert.match(html, /aria-live/i);
  assert.match(html, /aria-label/i);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /@media[^{]+(?:max-width|min-width)/);
  assert.match(script, /client_submission_id/i);
  assert.doesNotMatch(script, /localStorage|sessionStorage/i);
  assert.match(script, /membros\.kalifranca\.com\.br\/api\/mentoria-frequencia-da-abundancia\/applications/i);
});
