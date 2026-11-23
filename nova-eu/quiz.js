import { trilhas } from "./catalogo.js";

const checkouts = {
  abundancia: "https://pay.kiwify.com.br/Q9Q6VVG",
  "amor-proprio": "https://pay.kiwify.com.br/nGbHQLH",
  oportunidades: "https://pay.kiwify.com.br/SAG1h8P",
  leveza: "https://pay.kiwify.com.br/SCgFVpU",
};

const perfis = [
  ["Alerta e culpa financeira", "Controle e esforço", "Oscilação financeira", "Abertura para receber"],
  ["Medo da rejeição", "Busca por aprovação", "Oscilação afetiva", "Reciprocidade"],
  ["Receio de aparecer e errar", "Esforço e perfeccionismo", "Oscilação profissional", "Impacto e reconhecimento"],
  ["Culpa ao descansar", "Mente acelerada e controle", "Oscilação no cuidado pessoal", "Vitalidade e leveza"],
];

const etapa = document.querySelector("#etapa");
let foco = 0;
let passo = 0;
let respostas = [];

function texto(tag, conteudo) {
  const elemento = document.createElement(tag);
  elemento.textContent = conteudo;
  etapa.append(elemento);
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
  const perfil = contagem.indexOf(Math.max(...contagem));
  const cabecalho = tela("Seu foco para os próximos 30 dias");
  const total = trilhas[foco].questions.length;
  progresso(cabecalho, `Quiz concluído · ${total} de ${total} perguntas`, total, total);
  texto("p", trilhas[foco].name);
  texto("p", "Tema para refletir a partir das suas respostas — " + perfis[foco][perfil] + ".");
  texto("h3", "Diário Nova Eu — " + trilhas[foco].book);
  texto("p", "Uma jornada de 30 dias com exercícios de escrita e áudios de acompanhamento.");
  const checkout = texto("a", "Ir para o checkout · R$ 88,00");
  checkout.className = "checkout";
  checkout.href = checkouts[trilhas[foco].id];
  botao("Revisar a última resposta", () => {
    passo = trilhas[foco].questions.length - 1;
    pergunta();
  });
  botao("Escolher outro foco", () => {
    respostas = [];
    inicio();
  });
  cabecalho.focus();
}

inicio();
