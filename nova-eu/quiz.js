import { trilhas } from "./catalogo-v2.js";
import { resultados } from "./resultados-v2.js";

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
const painelQuiz = etapa.closest("main");
const contato = { nome: "", email: "", celular: "" };

function cadastro({ veioDaEtapaSeguinte = false } = {}) {
  painelQuiz.classList.add("quiz-intro");
  const titulo = tela("Preencha seus dados para começar");
  const form = texto("form", "");
  const campos = [
    ["nome", "Nome", "text", "name", 100],
    ["email", "E-mail", "email", "email", 254],
    ["celular", "Celular com DDD", "tel", "tel", 24],
  ];
  for (const [chave, rotulo, tipo, autocomplete, limite] of campos) {
    const label = texto("label", rotulo, form);
    const input = texto("input", "", label);
    input.name = chave;
    input.type = tipo;
    input.autocomplete = autocomplete;
    input.maxLength = limite;
    input.required = true;
    input.value = contato[chave];
    input.addEventListener("input", () => input.setCustomValidity(""));
  }
  texto("p", "Seus dados de contato serão registrados junto com a informação de que você já fez ou não o teste.", form).className = "quiz-hint";
  texto("button", "Continuar", form).type = "submit";
  form.addEventListener("submit", evento => {
    evento.preventDefault();
    const telefone = form.elements.celular;
    const digitos = telefone.value.replace(/\D/g, "");
    if (!/^(?:55)?[1-9]\d9\d{8}$/.test(digitos)) {
      telefone.setCustomValidity("Informe um celular válido com DDD.");
      telefone.reportValidity();
      return;
    }
    for (const chave of Object.keys(contato)) contato[chave] = form.elements[chave].value.trim();
    historico();
  });
  if (veioDaEtapaSeguinte) titulo.focus();
}

function historico() {
  painelQuiz.classList.add("quiz-intro");
  const titulo = tela("Você já fez o Teste de Bloqueio Emocional Invisível antes?", true);
  const escolhas = [
    botao("Sim", () => registrar(true)),
    botao("Não", () => registrar(false)),
    botao("Voltar aos meus dados", () => cadastro({ veioDaEtapaSeguinte: true })),
  ];
  escolhas[0].className = "quiz-history-choice quiz-history-choice--yes";
  escolhas[1].className = "quiz-history-choice quiz-history-choice--no";
  escolhas[2].className = "quiz-back";
  const status = texto("p", "");
  status.setAttribute("role", "status");
  titulo.focus();

  async function registrar(jaFez) {
    escolhas.forEach(botao => { botao.disabled = true; });
    status.textContent = "Registrando seus dados…";
    try {
      const resposta = await fetch("./cadastro.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contato, jaFez }),
      });
      if (resposta.status !== 204) throw new Error("Cadastro indisponível");
    } catch {
      status.textContent = "Não foi possível registrar seus dados. Tente novamente.";
      escolhas.forEach(botao => { botao.disabled = false; });
      escolhas[jaFez ? 0 : 1].focus();
      return;
    }
    painelQuiz.classList.remove("quiz-intro");
    if (jaFez) escolherBloqueio();
    else inicio();
  }
}

function escolherBloqueio() {
  const titulo = tela("Qual é o seu bloqueio?");
  const voltar = botao("Voltar", historico);
  voltar.className = "quiz-back";
  titulo.before(voltar);
  progresso(titulo, "Etapa 3 de 3", 3, 3);

  texto("p", "Selecione seu bloqueio abaixo para abrir o checkout correspondente.");
  const opcoes = texto("div", "");
  opcoes.className = "quiz-block-options";
  for (const trilha of trilhas) {
    const opcao = texto("a", trilha.name, opcoes);
    opcao.href = checkouts[trilha.id];
  }
  botao("Ainda não sei. Quero fazer o teste.", inicio).className = "quiz-back";
  titulo.focus();
}

function texto(tag, conteudo, destino = etapa) {
  const elemento = document.createElement(tag);
  elemento.textContent = conteudo;
  destino.append(elemento);
  return elemento;
}

function tela(titulo, tituloPrincipal = false) {
  painelQuiz.querySelector(":scope > h1").hidden = tituloPrincipal;
  etapa.replaceChildren();
  const cabecalho = texto(tituloPrincipal ? "h1" : "h2", titulo);
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
  const cabecalho = tela("Se você pudesse destravar UMA área da sua vida nos próximos 30 dias com leveza, qual escolheria hoje?");
  const voltar = botao("Voltar", historico);
  voltar.className = "quiz-back";
  cabecalho.before(voltar);
  progresso(cabecalho, "Pergunta 1 de 7", 0, 7);
  trilhas.forEach((trilha, indice) => botao(`${trilha.name} — ${trilha.intro}`, () => {
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
  progresso(cabecalho, `${trilha.name} · Pergunta ${passo + 2} de ${total + 1}`, passo + 1, total + 1);
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
  const cabecalho = tela("Seu diagnóstico hoje");
  const total = trilha.questions.length;
  progresso(cabecalho, `Quiz concluído · ${total + 1} de ${total + 1} perguntas`, total + 1, total + 1);

  texto("p", trilha.name + " · " + perfil.pattern).className = "quiz-status";
  texto("h3", perfil.title);
  const verOferta = botao("O caminho para a NOVA EU realizada", () => {
    checkout.focus({ preventScroll: true });
    valorEspecial.scrollIntoView({ block: "center" });
  });
  verOferta.className = "checkout checkout--inicio";
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
  capa.src = `./capas/resultado-${trilha.id}.webp`;
  capa.width = 1200;
  capa.height = 675;
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
  const checkoutIntermediario = texto("a", "Quero meu Diário Nova Eu", painel);
  checkoutIntermediario.className = "checkout checkout--meio";
  checkoutIntermediario.href = checkouts[trilha.id];
  lista("O que você vai praticar", oferta.benefits, painel);
  const valorEspecial = texto("p", "", painel);
  texto("strong", "Valor Especial:", valorEspecial);
  valorEspecial.append(" De ");
  texto("s", "R$197", valorEspecial).className = "quiz-preco-anterior";
  valorEspecial.append(" por apenas ");
  texto("strong", "R$ 88 (pagamento único, acesso imediato)", valorEspecial);
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

cadastro();
