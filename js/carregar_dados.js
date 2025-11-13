const tabelaCorpo = document.getElementById('corpo-tabela-arcos');
const urlDados = 'data/dados.json';

function carregarArcos() {
    fetch(urlDados)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            renderizarArcos(data);
        })
        .catch(error => {
            console.error('Houve um erro ao carregar os arcos:', error);
            tabelaCorpo.innerHTML = `<tr><td colspan="4">Erro ao carregar os arcos.</td></tr>`;
        });
        
}

function renderizarArcos(arcos) {
    tabelaCorpo.innerHTML = arcos.map(arco => `
    <tr>
      <td><img class="imagens__tabela" src="${arco.imagem.src}" alt="${arco.imagem.alt}"></td>
      <td>${arco.arco}</td>
      <td>${arco.votos}</td>
      <td>${arco.posicao}</td>
    </tr>
  `).join('');
}

carregarArcos();