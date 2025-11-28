document.addEventListener("DOMContentLoaded", function() {    
  const select = document.getElementById('nomes');
    
    // dispara quando a opção muda
    select.addEventListener('change', () => {
      esconderImagens()  
      const value = select.options[select.selectedIndex];  
      const id = value.getAttribute("data-alvo");
      const img = document.getElementById(id);
      if (img.style.display === "none") {
        img.style.display = "block"
      }
      
      
    });
});    


    function esconderImagens() {
      const imagens = document.querySelectorAll(".imagens__tabela"); // pega todas as imagens
      imagens.forEach(img => {
        img.style.display = "none"; // aplica display: none
      });
    }
