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
    }, 250); // tempo reduzido para resposta mais ágil
  }
  
  /* ======= Gerenciamento de parceiros (localStorage) ======= */
  
  const STORAGE_KEY = 'parceiros_setembro_amarelo';
  
  /**
   * Padrão de parceiros iniciais (podem ser substituídos por quem adicionar)
   */
  const parceirosPadrao = [
    { nome: 'CVV - Centro de Valorização da Vida', url: 'https://www.cvv.org.br/' },
    { nome: 'Setembro Amarelo Oficial', url: 'https://www.setembroamarelo.org.br/' }
  ];
  
  function carregarParceiros() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // salva padrão se ainda não existir
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parceirosPadrao));
      return parceirosPadrao.slice();
    }
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('formato inválido');
      return parsed;
    } catch (e) {
      // se estiver corrompido, substitui pelo padrão
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
    ul.innerHTML = ''; // limpa
  
    lista.forEach((p, idx) => {
      const li = document.createElement('li');
  
      const a = document.createElement('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = p.nome;
  
      li.appendChild(a);
  
      // botão pequeno de remover (apenas no mesmo navegador)
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
  
  /**
   * Função chamada no submit do formulário
   */
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
  
    // garante que a URL comece com http(s)
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
  
    const parceiros = carregarParceiros();
    parceiros.push({ nome, url });
    salvarParceiros(parceiros);
    renderizarParceiros();
  
    // limpa o formulário e foco novamente
    nomeInput.value = '';
    urlInput.value = '';
    nomeInput.focus();
  
    return false;
  }
  
  // inicializa quando a página carrega
  document.addEventListener('DOMContentLoaded', () => {
    renderizarParceiros();
  });
  
