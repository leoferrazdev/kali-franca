import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const brandbookRoot = resolve(repositoryRoot, 'brandbook');
const indexPath = resolve(brandbookRoot, 'index.html');
const tokensPath = resolve(brandbookRoot, 'tokens.css');
const stylesPath = resolve(brandbookRoot, 'styles.css');

function readIfPresent(filePath) {
  return existsSync(filePath) ? readFileSync(filePath, 'utf8') : '';
}

test('a rota estática do brandbook possui entrada pública semântica', () => {
  const html = readIfPresent(indexPath);

  assert.ok(existsSync(indexPath), 'brandbook/index.html deve existir');
  assert.match(html, /<html[^>]+lang=["']pt-BR["']/i);
  assert.match(html, /<title>[^<]*Brandbook[^<]*Kali França/i);
  assert.match(html, /<a[^>]+href=["']#conteudo["'][^>]*>[^<]*Pular/i);
  assert.match(html, /<main[^>]+id=["']conteudo["']/i);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.doesNotMatch(html, /503|Service Unavailable|novo espaço está sendo preparado/i);
});

test('o índice aponta para todas as seções consultáveis do brandbook', () => {
  const html = readIfPresent(indexPath);
  const sectionIds = [
    'essencia',
    'direcao-visual',
    'cores',
    'tipografia',
    'vocabulario-grafico',
    'imagem',
    'interface',
    'aplicacoes',
    'do-dont',
    'evolucao'
  ];

  for (const sectionId of sectionIds) {
    assert.match(html, new RegExp(`id=["']${sectionId}["']`, 'i'));
    assert.match(html, new RegExp(`href=["']#${sectionId}["']`, 'i'));
  }
});

test('a página explicita o conceito, as fontes tipográficas e a origem do sistema', () => {
  const html = readIfPresent(indexPath);

  assert.match(html, /Expansão da Potência/i);
  assert.match(html, /Cormorant Garamond/i);
  assert.match(html, /Jost/i);
  assert.match(html, /IBM Plex Mono/i);
  assert.match(html, /Kali Franca - Design System\.dc\.html/i);
});

test('os tokens preservam as três camadas do design system', () => {
  const tokens = readIfPresent(tokensPath);

  assert.ok(existsSync(tokensPath), 'brandbook/tokens.css deve existir');
  assert.match(tokens, /--kf-color-umbra-500:\s*#0E0B0A/i);
  assert.match(tokens, /--kf-color-vinho-profundo-500:\s*#3A1424/i);
  assert.match(tokens, /--kf-color-ouro-fosco-500:\s*#C9A66B/i);
  assert.match(tokens, /--kf-color-alabastro-500:\s*#F4EDE4/i);
  assert.match(tokens, /--kf-color-bg-canvas:\s*var\(--kf-color-umbra-500\)/i);
  assert.match(tokens, /--kf-color-text-primary:\s*var\(--kf-color-alabastro-500\)/i);
  assert.match(tokens, /--kf-component-card-bg:\s*var\(--kf-color-bg-surface\)/i);
  assert.match(tokens, /--kf-component-button-primary-bg:\s*var\(--kf-color-accent\)/i);
});

test('o CSS documenta foco, responsividade e movimento reduzido', () => {
  const html = readIfPresent(indexPath);
  const styles = readIfPresent(stylesPath);

  assert.match(html, /tokens\.css/i);
  assert.match(html, /styles\.css/i);
  assert.ok(existsSync(stylesPath), 'brandbook/styles.css deve existir');
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media\s*\([^)]*prefers-reduced-motion/i);
  assert.match(styles, /@media\s*\([^)]*max-width/i);
  assert.match(styles, /min-height:\s*44px/);
});
