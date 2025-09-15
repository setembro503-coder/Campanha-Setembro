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
    }, 500); // Tempo do fade-out
  }