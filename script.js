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

  // Aplica o efeito de fade-out
  elemento.classList.add('fade-out');

  // Aguarda o fade-out antes de trocar a mensagem
  setTimeout(() => {
    const indice = Math.floor(Math.random() * mensagens.length);
    const novaMensagem = mensagens[indice];

    elemento.innerText = novaMensagem;

    // Força o reflow para reiniciar a animação
    void elemento.offsetWidth;

    // Aplica fade-in
    elemento.classList.remove('fade-out');
    elemento.classList.add('fade-in');
  }, 250);
}

/* ======= Gerenciamento de parceiros (localStorage) ======= */
const STORAGE_KEY = 'parceiros_setembro_amarelo';

const parceirosPadrao = [
  { nome: 'CVV - Centro de Valorização da Vida', url: 'https://www.cvv.org.br/' },
  { nome: 'Setembro Amarelo Oficial', url: 'https://www.setembroamarelo.org.br/' }
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

/* ======= Gráficos interativos (Chart.js) ======= */
function criarGraficos() {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutBounce'
    }
  };

  new Chart(document.getElementById("grafico1"), {
    type: "pie",
    data: {
      labels: ["Sim", "Não"],
      datasets: [{ data: [70, 30], backgroundColor: ["#fdd835", "#ef5350"] }]
    },
    options
  });

  new Chart(document.getElementById("grafico2"), {
    type: "bar",
    data: {
      labels: ["Baixa", "Média", "Alta"],
      datasets: [{ label: "Estresse", data: [20, 50, 30], backgroundColor: ["#81c784", "#fdd835", "#e57373"] }]
    },
    options
  });

  new Chart(document.getElementById("grafico3"), {
    type: "doughnut",
    data: {
      labels: ["Feliz", "Triste", "Ansioso"],
      datasets: [{ data: [40, 35, 25], backgroundColor: ["#4fc3f7", "#ba68c8", "#ffb74d"] }]
    },
    options
  });

  new Chart(document.getElementById("grafico4"), {
    type: "line",
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      datasets: [{ label: "Bem-estar", data: [3, 4, 2, 5, 4], borderColor: "#fdd835", backgroundColor: "rgba(253, 216, 53, 0.3)", tension: 0.4, fill: true }]
    },
    options
  });

  new Chart(document.getElementById("grafico5"), {
    type: "radar",
    data: {
      labels: ["Sono", "Alimentação", "Exercício", "Lazer", "Trabalho"],
      datasets: [{
        label: "Equilíbrio",
        data: [6, 5, 7, 4, 6],
        backgroundColor: "rgba(255, 202, 40, 0.3)",
        borderColor: "#ffca28"
      }]
    },
    options
  });
}

/* ======= Animação de entrada dos cards ======= */
function animarGraficos() {
  const cards = document.querySelectorAll(".grafico-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animar");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

/* ======= Inicialização ======= */
document.addEventListener('DOMContentLoaded', () => {
  renderizarParceiros();
  criarGraficos();
  animarGraficos();
});
