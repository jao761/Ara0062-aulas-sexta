const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarEmail(campo) {

    const email = campo.value;

    if (emailRegex.test(email)) {
        campo.style.border = '1px solid green';
        campo.setCustomValidity('');
        return true;
    } else {
        campo.style.border = '2px solid red';
        const mensagemErro = 'Por favor, insira um endereço de e-mail válido.';
        campo.setCustomValidity(mensagemErro);
        campo.reportValidity();
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function() {

    const campoEmail = document.getElementById('email');
    const formulario = document.getElementById('formulario__post');

    // Validação ao perder o foco
    campoEmail.addEventListener("blur", function() {
        validarEmail(campoEmail);
    });

    // Validação ao enviar o formulário
    formulario.addEventListener("submit", function(event) {
        if (!validarEmail(campoEmail)) {
            event.preventDefault();
        }
    });
});
