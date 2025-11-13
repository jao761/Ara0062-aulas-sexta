document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const btnAlternarTema = document.getElementById('alternaTema');

  // Carrega o tema salvo ou usa 'light' como padrão
  const temaSalvo = localStorage.getItem('preferenciaTema') || 'light';

  // Aplica o tema inicial
  if (temaSalvo === 'dark') {
    body.classList.add('tema-escuro');
    if (btnAlternarTema) btnAlternarTema.textContent = '🌙';
  } else {
    body.classList.remove('tema-escuro');
    if (btnAlternarTema) btnAlternarTema.textContent = '☀️';
  }

  // Se o botão existir na página, adiciona o evento de clique
  if (btnAlternarTema) {
    btnAlternarTema.addEventListener('click', function(e) {
      e.preventDefault(); // Evita que a tela pule para o topo
      
      body.classList.toggle('tema-escuro');
      
      if (body.classList.contains('tema-escuro')) {
        localStorage.setItem('preferenciaTema', 'dark');
        btnAlternarTema.textContent = '🌙';
      } else {
        localStorage.setItem('preferenciaTema', 'light');
        btnAlternarTema.textContent = '☀️';
      }
    });
  }
});