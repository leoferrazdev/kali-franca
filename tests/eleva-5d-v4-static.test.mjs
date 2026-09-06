import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v4Path = path.join(root, 'lp-5d', 'v4', 'index.html');
const v4CssPath = path.join(root, 'lp-5d', 'v4', 'styles.css');

test('a V4 publica a nova primeira dobra do Eleva 5D', () => {
  assert.ok(fs.existsSync(v4Path), 'A rota lp-5d/v4 deve existir');
  const html = fs.readFileSync(v4Path, 'utf8');

  assert.match(html, /https:\/\/kalifranca\.com\.br\/lp-5d\/v4\//);
  assert.match(html, /styles\.css\?v=v4-3/);
  assert.match(html, /data-v4="true"/);
  assert.match(html, /<p class="eyebrow">ELEVA 5D<\/p>/);
  assert.match(html, /<h1 id="hero-title">Pare de acessar a sua melhor versão por alguns momentos e voltar ao medo logo depois\.<\/h1>/);
  assert.match(html, /Em 20 minutos por dia, o Eleva 5D te guia por uma prática de 30 dias para reprogramar a forma como você se enxerga, voltar ao seu centro e começar a agir a partir da mulher que já sabe a vida que quer viver\./);
  assert.match(html, /Sem transformar o seu desenvolvimento pessoal em mais uma obrigação\./);
  assert.match(html, /<p class="hero-steps"><strong>Reprogramar\. Alinhar\. Manifestar\.<\/strong> Três movimentos diários para você sair da oscilação entre “eu sei que sou capaz” e “será que isso é mesmo para mim\?” — até confiança, presença e realização deixarem de ser momentos isolados e começarem a fazer parte da sua identidade\.<\/p>/);
  assert.match(html, /<li><strong>20 minutos por dia<\/strong><\/li>/);
  assert.match(html, /<li><strong>30 dias guiados<\/strong><\/li>/);
  assert.match(html, /<li><strong>aplicativo personalizado<\/strong><\/li>/);
  assert.match(html, /QUERO COMEÇAR MINHA JORNADA NO ELEVA 5D/);
});

test('a V4 mantém as demais seções da jornada', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const expectedSections = ['method', 'routine', 'spaces', 'cut', 'authority', 'offer', 'faq'];

  for (const section of expectedSections) {
    assert.match(html, new RegExp(`data-scroll-marker="${section}"`));
  }
  assert.doesNotMatch(html, /id="eusoul"|Eu Soul|sua guia particular/);
});

test('a V4 mantém a sequência editorial contínua após a nova seção', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const indices = [...html.matchAll(/<p class="section-index">(\d{2}) \/ /g)].map((match) => match[1]);

  assert.deepEqual(indices, ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
});

test('a oferta V4 não promete a guia de IA removida temporariamente', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  assert.doesNotMatch(html, /IA Eu Soul|Eu Soul/);
});

test('a oferta V4 apresenta a nova narrativa de transformação', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const offerSection = html.slice(html.indexOf('id="oferta"'), html.indexOf('id="faq"'));

  assert.match(offerSection, /09 \/ agora você não precisa depender apenas de motivação/);
  assert.match(offerSection, /Tudo o que você precisa para transformar um novo estado em uma nova identidade\./);
  assert.match(offerSection, /O Eleva 5D não foi criado para ser mais um conteúdo que você consome, se inspira por alguns dias e depois deixa de lado\./);
  assert.equal((offerSection.match(/class="offer-pillar(?:\s|\")/g) || []).length, 5);
  assert.match(offerSection, /30 dias de áudios de reprogramação \+ Caderno da Criadora/);
  assert.match(offerSection, /Âncoras Divinas/);
  assert.match(offerSection, /Mapa da Realização \+ Habitar guiado/);
  assert.match(offerSection, /Sustentar \+ Elevar/);
  assert.match(offerSection, /Corte Energético/);
  assert.match(offerSection, /Sua jornada acontece dentro do aplicativo Eleva 5D\./);
  assert.match(offerSection, /<strong>R\$497<\/strong>/);
  assert.match(offerSection, /acesso anual ao Método, pelo seu aplicativo personalizado/);
  assert.match(offerSection, /QUERO COMEÇAR MINHA JORNADA/);
});

test('a V4 reduz fricção de compra com risco, preço, FAQ e CTA móvel', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const css = fs.readFileSync(v4CssPath, 'utf8');
  const offerSection = html.slice(html.indexOf('id="oferta"'), html.indexOf('id="faq"'));
  const faqSection = html.slice(html.indexOf('id="faq"'), html.indexOf('class="final-cta'));

  assert.match(offerSection, /7 dias de garantia\./);
  assert.match(offerSection, /Se em uma semana você não sentir nenhuma mudança, devolvemos seu dinheiro — sem perguntas\./);
  assert.match(faqSection, /Quanto custa o acesso ao Eleva 5D\?/);
  assert.match(faqSection, /Existe garantia para experimentar o Método\?/);
  assert.match(html, /class="mobile-cta" data-cta="mobile"/);
  assert.match(css, /\.v4-flow \.mobile-cta\s*\{[\s\S]*?display:\s*none;/);
  assert.match(css, /@media \(max-width:\s*900px\)[\s\S]*?\.v4-flow \.mobile-cta\s*\{[\s\S]*?position:\s*fixed;/);
});

test('a V4 posiciona a seção de prova entre O mecanismo e O método', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const mechanismPosition = html.indexOf('id="mecanismo"');
  const proofPosition = html.indexOf('id="prova"');
  const methodPosition = html.indexOf('id="metodo"');

  assert.ok(mechanismPosition < proofPosition, 'A prova deve vir depois de O mecanismo');
  assert.ok(proofPosition < methodPosition, 'A prova deve vir antes de O método');
  assert.match(html, /<p class="section-index">03 \/ quando deixa de ser teoria<\/p>/);
  assert.match(html, /<h2 id="proof-title">Você não precisa acreditar antes de viver\.<\/h2>/);
  assert.match(html, /Existe um momento em que aquilo que você entende sobre si deixa de ser apenas conhecimento e começa a aparecer na forma como você sente, escolhe e vive\./);
  assert.match(html, /Foi assim para mulheres que também conheciam o caminho, mas ainda voltavam ao medo, à dúvida e ao controle\./);
  assert.match(html, /\[DEPOIMENTO REAL 1\]/);
  assert.match(html, /\[DEPOIMENTO REAL 2\]/);
  assert.match(html, /\[DEPOIMENTO REAL 3\]/);
  assert.match(html, /De oscilação para sustentação/);
  assert.match(html, /De entendimento para movimento/);
  assert.match(html, /De esforço para confiança/);
  assert.match(html, /<h3>O objetivo não é nunca mais sentir medo\.<\/h3>/);
  assert.match(html, /É perceber mais rápido quando você saiu de si e saber o caminho de volta\./);
  assert.match(html, /E é exatamente para transformar esse retorno em uma prática diária que existe o Eleva 5D\./);
});

test('a seção de prova usa estrutura editorial acessível sem fabricar depoimentos', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const proofSection = html.slice(html.indexOf('id="prova"'), html.indexOf('id="metodo"'));

  assert.match(proofSection, /aria-labelledby="proof-title"/);
  assert.match(proofSection, /aria-label="Depoimentos reais pendentes de inserção"/);
  assert.equal((proofSection.match(/data-proof-status="pending-real-testimonial"/g) || []).length, 3);
  assert.equal((proofSection.match(/class="proof-highlight"/g) || []).length, 3);
});

test('a seção de prova V4 usa o espaço desktop para hierarquia e leitura horizontal', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const css = fs.readFileSync(v4CssPath, 'utf8');

  assert.equal((html.match(/class="proof-card-number"/g) || []).length, 3);
  assert.match(css, /\.v4-flow \.proof-intro > div:last-child\s*\{[\s\S]*?display:\s*grid;/);
  assert.match(css, /\.v4-flow \.proof-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.v4-flow \.proof-card\s*\{[\s\S]*?border:\s*1px solid var\(--v3-line\);/);
  assert.match(css, /\.v4-flow \.proof-card-number\s*\{[\s\S]*?color:\s*var\(--v3-gold\);/);
});

test('a V4 organiza a primeira dobra desktop para leitura, imagem e CTA', () => {
  const css = fs.readFileSync(v4CssPath, 'utf8');

  assert.match(css, /@media \(min-width:\s*64rem\)[\s\S]*?\.v4-flow \.hero-grid\s*\{[\s\S]*?align-items:\s*start;/);
  assert.match(css, /\.v4-flow h1\s*\{[\s\S]*?max-width:\s*14ch;[\s\S]*?font-size:\s*clamp\(/);
  assert.match(css, /\.v4-flow \.hero-image\s*\{[\s\S]*?align-self:\s*start;/);
  assert.match(css, /\.v4-flow \.hero-actions\s*\{[\s\S]*?margin:\s*1\.75rem 0 1\.5rem;/);
});

test('a V4 preserva leitura e decisão nos breakpoints intermediários', () => {
  const css = fs.readFileSync(v4CssPath, 'utf8');

  assert.match(css, /\.v4-flow h1,\s*\.v4-flow h2,\s*\.v4-flow h3\s*\{[\s\S]*?text-wrap:\s*balance;/);
  assert.match(css, /\.v4-flow p,\s*\.v4-flow li\s*\{[\s\S]*?overflow-wrap:\s*anywhere;/);
  assert.match(css, /@media \(min-width:\s*56\.3125rem\) and \(max-width:\s*68\.75rem\)[\s\S]*?\.v4-flow \.hero-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\) minmax\(18rem,\s*\.8fr\);/);
  assert.match(css, /@media \(min-width:\s*56\.3125rem\) and \(max-width:\s*68\.75rem\)[\s\S]*?\.v4-flow \.offer-decision\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /@media \(min-width:\s*56\.3125rem\) and \(max-width:\s*68\.75rem\)[\s\S]*?\.v4-flow \.offer-journey \.button\s*\{[\s\S]*?grid-column:\s*1 \/ -1;/);
  assert.match(css, /@media \(max-width:\s*37\.5rem\)[\s\S]*?\.v4-flow \.offer-decision\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
});

test('a V4 tem uma composição visual distinta por etapa da jornada', () => {
  const html = fs.readFileSync(v4Path, 'utf8');
  const css = fs.readFileSync(v4CssPath, 'utf8');

  assert.match(html, /class="shell hero-grid hero-composition"/);
  assert.match(html, /class="shell recognition-grid recognition-cards"/);
  assert.match(html, /class="shell state-grid mechanism-track"/);
  assert.match(html, /class="shell movement-list movement-timeline"/);
  assert.match(html, /class="shell routine-grid routine-cards"/);
  assert.match(html, /class="shell spaces-grid spaces-sequence"/);
  assert.match(css, /\.v4-flow \.site-header\s*\{[\s\S]*?position:\s*fixed;/);
  assert.match(css, /\.v4-flow \.recognition-cards\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.v4-flow \.mechanism-track\s*\{[\s\S]*?gap:\s*1rem;/);
  assert.match(css, /\.v4-flow \.proof-card:first-child\s*\{[\s\S]*?grid-row:\s*span 2;/);
  assert.match(css, /\.v4-flow \.movement-timeline\s*\{[\s\S]*?display:\s*grid;[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(css, /\.v4-flow \.offer-decision\s*\{[\s\S]*?background:\s*var\(--v3-wine\);/);
  assert.match(css, /\.v4-flow \.offer-journey p strong\s*\{[\s\S]*?color:\s*var\(--v4-gold\);/);
  assert.match(css, /\.v4-flow \.faq \.faq-list details\s*\{[\s\S]*?border-radius:/);
  assert.match(css, /@media \(max-width:\s*56\.25rem\)[\s\S]*?\.v4-flow \.proof-card:first-child\s*\{[\s\S]*?grid-row:\s*auto;/);
});

test('a V4 aplica exclusivamente a paleta cromática aprovada nas seções ajustadas', () => {
  const css = fs.readFileSync(v4CssPath, 'utf8');

  assert.match(css, /--v4-umbra:\s*#0E0B0A;/);
  assert.match(css, /--v4-wine:\s*#3A1424;/);
  assert.match(css, /--v4-plum:\s*#7A2B44;/);
  assert.match(css, /--v4-gold:\s*#C9A66B;/);
  assert.match(css, /\.v4-flow \.section-paper,[\s\S]*?\.v4-flow \.section-warm[\s\S]*?background:\s*var\(--v4-umbra\);/);
  assert.match(css, /\.v4-flow \.movement-timeline \.movement-row\s*\{[\s\S]*?background:\s*var\(--v4-wine\);/);
  assert.match(css, /\.v4-flow \.spaces-sequence article\s*\{[\s\S]*?background:\s*var\(--v4-wine\);/);
  assert.match(css, /\.v4-flow \.cut\s*\{[\s\S]*?background:\s*var\(--v4-umbra\);/);
  assert.match(css, /\.v4-flow \.offer\s*\{[\s\S]*?background:\s*var\(--v4-umbra\);/);
});
