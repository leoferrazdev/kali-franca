import { trilhas } from "./catalogo.js";
import { resultados } from "./resultados.js";

const checkouts = {
  abundancia: "https://pay.kiwify.com.br/Q9Q6VVG",
  "amor-proprio": "https://pay.kiwify.com.br/nGbHQLH",
  oportunidades: "https://pay.kiwify.com.br/SAG1h8P",
  leveza: "https://pay.kiwify.com.br/SCgFVpU",
};

const etapa = document.querySelector("#etapa");
let foco = 0;
let passo = 0;
let respostas = [];

function texto(tag, conteudo, destino = etapa) {
  const elemento = document.createElement(tag);
  elemento.textContent = conteudo;
  destino.append(elemento);
  return elemento;
}

function tela(titulo) {
  etapa.replaceChildren();
  const cabecalho = texto("h2", titulo);
  cabecalho.tabIndex = -1;
  return cabecalho;
}

function botao(rotulo, acao, selecionado) {
  const elemento = texto("button", rotulo);
  elemento.type = "button";
  if (selecionado !== undefined) elemento.setAttribute("aria-pressed", String(selecionado));
  elemento.addEventListener("click", acao);
  return elemento;
}

function progresso(cabecalho, rotulo, respondidas, total) {
  const status = texto("p", rotulo);
  status.id = "progresso-quiz";
  status.className = "quiz-status";

  const barra = texto("progress", "");
  barra.className = "quiz-progress";
  barra.max = total;
  barra.value = respondidas;
  barra.setAttribute("aria-label", "Perguntas concluídas");

  cabecalho.before(status, barra);
  cabecalho.setAttribute("aria-describedby", status.id);
}

function inicio() {
  const cabecalho = tela("Qual área você quer cultivar nos próximos 30 dias?");
  texto("p", "Escolha um foco e responda a quatro perguntas sobre a sua rotina.");
  trilhas.forEach((trilha, indice) => botao(trilha.name, () => {
    if (foco !== indice) respostas = [];
    foco = indice;
    passo = 0;
    pergunta();
  }, respostas.length > 0 && foco === indice));
  cabecalho.focus();
}

function pergunta() {
  const trilha = trilhas[foco];
  const atual = trilha.questions[passo];
  const cabecalho = tela(atual.text);
  const total = trilha.questions.length;
  const voltar = botao(passo === 0 ? "Voltar à escolha de foco" : "Voltar uma pergunta", () => {
    if (passo === 0) {
      inicio();
      return;
    }
    passo -= 1;
    pergunta();
  });
  voltar.className = "quiz-back";
  cabecalho.before(voltar);
  progresso(cabecalho, `${trilha.name} · Pergunta ${passo + 1} de ${total}`, passo, total);
  texto("p", "Selecione uma opção para avançar automaticamente.").className = "quiz-hint";

  atual.options.forEach((opcao, indice) => botao(opcao, () => {
    respostas[passo] = indice;
    passo += 1;
    if (passo === total) resultado();
    else pergunta();
  }, respostas[passo] === indice));
  cabecalho.focus();
}

function resultado() {
  const contagem = [0, 0, 0, 0];
  respostas.forEach(resposta => contagem[resposta]++);
  // A primeira ocorrência do máximo resolve empates pela ordem A, B, C e D.
  const trilha = trilhas[foco];
  const oferta = resultados[trilha.id];
  const perfil = oferta.profiles[contagem.indexOf(Math.max(...contagem))];
  const cabecalho = tela("Seu diagnóstico Nova Eu");
  const total = trilha.questions.length;
  progresso(cabecalho, `Quiz concluído · ${total} de ${total} perguntas`, total, total);

  texto("p", trilha.name + " · " + perfil.pattern).className = "quiz-status";
  texto("h3", perfil.title);
  texto("h4", "Uma crença para observar");
  texto("blockquote", perfil.belief);
  texto("h4", "Como esse padrão pode aparecer no dia a dia");
  texto("p", perfil.reflection);
  texto("h4", "O que trabalhar nos próximos 30 dias");
  texto("p", perfil.practice);

  const revisar = botao("Revisar a última resposta", () => {
    passo = total - 1;
    pergunta();
  });
  revisar.className = "quiz-back";

  const painel = texto("section", "");
  painel.className = "quiz-offer";
  texto("p", "Seu próximo passo", painel).className = "quiz-status";
  texto("h3", oferta.title, painel);
  const capa = texto("img", "", painel);
  capa.src = `./capas/${trilha.id}.webp`;
  capa.alt = "";
  capa.loading = "lazy";
  texto("p", oferta.description, painel);
  const [diario, audioNovaEu, audioBastaPermitir] = oferta.materials;
  const entregaveis = texto("section", "", painel);
  entregaveis.className = "quiz-deliverables";
  texto("h4", "Você recebe 2 áudios de reprogramação + Diário Nova Eu", entregaveis);
  texto("p", "Os áudios são as ativações da sua Nova Eu e servem de âncora para a prática. No diário, a escrita guiada ajuda a fixar o que você pratica e a levar essa intenção para o dia a dia.", entregaveis);
  const materiais = texto("ul", "", entregaveis);
  [audioNovaEu, audioBastaPermitir, diario].forEach(item => texto("li", item, materiais));
  lista("O que você vai praticar", oferta.benefits, painel);
  texto("p", "R$ 88,00 em pagamento único", painel).className = "quiz-status";
  const checkout = texto("a", oferta.cta, painel);
  checkout.className = "checkout";
  checkout.href = checkouts[trilha.id];
  botao("Escolher outro foco", () => {
    respostas = [];
    inicio();
  });
  cabecalho.focus();
}

function lista(titulo, itens, destino) {
  texto("h4", titulo, destino);
  const lista = texto("ul", "", destino);
  itens.forEach(item => texto("li", item, lista));
}

inicio();
