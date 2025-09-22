/* ======= Mensagens motivacionais ======= */
const mensagens = [
  "Você é mais forte do que imagina.",
  "Cada dia é uma nova chance de recomeçar.",
  "Você é amado, mesmo quando não sente isso.",
  "Sua vida tem valor. Nunca duvide disso.",
  "Tudo passa, inclusive a dor. Aguente firme.",
  "Pequenos passos ainda são progresso.",
  "Você não está sozinho. Há pessoas que se importam.",
  "Pedir ajuda é um ato de coragem, não de fraqueza."
];

function novaMensagem() {
  const elemento = document.getElementById('mensagemMotivacional');
  elemento.classList.add('fade-out');

  setTimeout(() => {
    const indice = Math.floor(Math.random() * mensagens.length);
    const novaMensagem = mensagens[indice];

    elemento.innerText = novaMensagem;

    void elemento.offsetWidth; // reinicia animação
    elemento.classList.remove('fade-out');
    elemento.classList.add('fade-in');
  }, 250);
}

/* ======= Links de apoio (localStorage) ======= */
const STORAGE_KEY = 'parceiros_setembro_amarelo';

const parceirosPadrao = [
  { nome: 'CVV - Centro de Valorização da Vida', url: 'https://www.cvv.org.br/' },
  { nome: 'Setembro Amarelo Oficial', url: 'https://www.setembroamarelo.org.br/' },
  { nome: 'Projeto Desabafos', url: 'https://projetodesabafos.netlify.app/' }
];

function carregarParceiros() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parceirosPadrao));
    return parceirosPadrao.slice();
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('formato inválido');
    return parsed;
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parceirosPadrao));
    return parceirosPadrao.slice();
  }
}

function salvarParceiros(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function renderizarParceiros() {
  const lista = carregarParceiros();
  const ul = document.getElementById('parceirosList');
  ul.innerHTML = '';

  lista.forEach((p, idx) => {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = p.nome;

    li.appendChild(a);

    const removerBtn = document.createElement('button');
    removerBtn.textContent = 'Remover';
    removerBtn.style.marginLeft = '8px';
    removerBtn.style.fontSize = '0.8rem';
    removerBtn.style.padding = '3px 8px';
    removerBtn.style.borderRadius = '6px';
    removerBtn.style.border = 'none';
    removerBtn.style.cursor = 'pointer';
    removerBtn.style.background = '#f2d1d1';
    removerBtn.onclick = () => {
      if (confirm(`Remover o link "${p.nome}"?`)) {
        const atual = carregarParceiros();
        atual.splice(idx, 1);
        salvarParceiros(atual);
        renderizarParceiros();
      }
    };

    li.appendChild(removerBtn);
    ul.appendChild(li);
  });
}

function adicionarParceiro(event) {
  event.preventDefault();
  const nomeInput = document.getElementById('nomeParceiro');
  const urlInput = document.getElementById('urlParceiro');

  const nome = nomeInput.value.trim();
  let url = urlInput.value.trim();

  if (!nome || !url) {
    alert('Preencha nome e URL do site.');
    return false;
  }

  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  const parceiros = carregarParceiros();
  parceiros.push({ nome, url });
  salvarParceiros(parceiros);
  renderizarParceiros();

  nomeInput.value = '';
  urlInput.value = '';
  nomeInput.focus();

  return false;
}

/* ======= Gráficos Chart.js (dados reais da pesquisa) ======= */
function inicializarGraficos() {
  // Gráfico 1: Já ouviu falar do Setembro Amarelo?
  new Chart(document.getElementById("grafico1"), {
    type: 'pie',
    data: {
      labels: ["Sim", "Não"],
      datasets: [{
        data: [42, 177],
        backgroundColor: ["#f1c40f", "#95a5a6"]
      }]
    },
    options: { responsive: true, animation: { animateScale: true } }
  });

  // Gráfico 2: Principal tema
  new Chart(document.getElementById("grafico2"), {
    type: 'bar',
    data: {
      labels: ["Prevenção ao suicídio", "Trânsito seguro", "Combate às drogas", "Não sei"],
      datasets: [{
        label: "Respostas",
        data: [186, 9, 6, 18],
        backgroundColor: ["#f39c12", "#3498db", "#e74c3c", "#7f8c8d"]
      }]
    },
    options: { responsive: true, animation: { duration: 1500 } }
  });

  // Gráfico 3: Importância de falar sobre suicídio
  new Chart(document.getElementById("grafico3"), {
    type: 'doughnut',
    data: {
      labels: ["Muito importante", "Importante", "Pouco importante", "Não sei"],
      datasets: [{
        data: [205, 8, 2, 4],
        backgroundColor: ["#2ecc71", "#f1c40f", "#e67e22", "#95a5a6"]
      }]
    },
    options: { responsive: true, animation: { animateRotate: true } }
  });

  // Gráfico 4: Já pensou em suicídio
  new Chart(document.getElementById("grafico4"), {
    type: 'pie',
    data: {
      labels: ["Sim", "Não"],
      datasets: [{
        data: [49, 170],
        backgroundColor: ["#e74c3c", "#2ecc71"]
      }]
    },
    options: { responsive: true, animation: { animateScale: true } }
  });

  // Gráfico 5: Sabe onde buscar ajuda
  new Chart(document.getElementById("grafico5"), {
    type: 'bar',
    data: {
      labels: ["Sim", "Não"],
      datasets: [{
        label: "Respostas",
        data: [143, 76],
        backgroundColor: ["#27ae60", "#c0392b"]
      }]
    },
    options: { responsive: true, animation: { duration: 1500 } }
  });
}

/* ======= Inicialização ======= */
document.addEventListener('DOMContentLoaded', () => {
  renderizarParceiros();
  inicializarGraficos();
});
