const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;


function validarEmail(campo) {

    const email = campo.value;

    if(emailRegex.test(email)) {
        campo.style.border = '1px solid green';
        campo.setCunstomValidity('');
        return true;
    } else {
            campo.style.border = '2px solid red';
            const mensagemErro = 'Por favor, insira um endereço de e-mail válido.'
            campo.setCustomValidity(mensagemErro);
            campo.reportValidity();
            return false;
    }
}

function validarCpf(campo) {

    const cpf = campo.value;

    if(cpfRegex.test(cpf)) {
        campo.style.border = '1px solid green';
        campo.setCunstomValidity('');
        return true;
    } else {
        campo.style.border = '2px solid red';
        const mensagemErro = 'Por favor, insira um cpf válido.'
        campo.setCustomValidity(mensagemErro);
        campo.reportValidity();
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const campoEmail = document.getElementById('id_email');
    const campoCpf = document.getElementById('id_cpf');
    const formulario = document.querySelector('form');

    campoEmail.addEventListener("blur", function() {
        validarEmail(campoEmail);
    });

    campoCpf.addEventListener("blur", function() {
        validarCpf(campoCpf);
    });

    formulario.addEventListener("submit", function() {
        if(!validarEmail(campoEmail) || !validarCpf(campoCpf)) {
            event.preventDefault();
        }
    })

})