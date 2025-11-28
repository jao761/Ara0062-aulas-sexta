document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS
    const form = document.querySelector("#formulario__post");
    const select = document.getElementById("nomes");
    const emailInput = document.getElementById("email");
    const cancelarBtn = document.getElementById("cancelarVoto");

    // ------------------------------
    // FUNÇÃO: normalizar texto (sem acentos/cedilha)
    // ------------------------------
    function normalizar(str) {
        return str
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
            .replace(/ç/g, "c").replace(/Ç/g, "C")           // troca cedilha
            .toLowerCase();
    }

    // ------------------------------
    // EVENTO: enviar voto
    // ------------------------------
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const arco = select.value.trim();
        const arcoNorm = normalizar(arco);

        if (!email) {
            alert("Digite seu email.");
            return;
        }

        // Envia o voto
        const resp = await fetch("http://localhost:8080/votar.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, arco: arcoNorm })
        });

        const data = await resp.json();

        // Se já votou → perguntar ao usuário
        if (data.jaVotou) {
            const confirmar = confirm("Você já votou antes. Deseja alterar o seu voto?");
            if (!confirmar) return;

            // Solicita alteração
            const alt = await fetch("http://localhost:8080/controller/alterar_voto.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, arco: arcoNorm })
            });

            const respAlt = await alt.json();

            if (respAlt.sucesso) {
                alert("Voto alterado com sucesso!");
            } else {
                alert(respAlt.erro || "Erro ao alterar voto.");
            }

            return;
        }

        // Caso voto seja novo
        if (data.sucesso) {
            alert("Voto registrado!");
        } else {
            alert(data.erro || "Erro ao votar.");
        }

    });

    // ------------------------------
    // EVENTO: cancelar voto
    // ------------------------------
    cancelarBtn.addEventListener("click", async () => {

        const email = emailInput.value.trim();

        if (!email) {
            alert("Digite seu email para cancelar o voto.");
            return;
        }

        const confirmar = confirm("Tem certeza que deseja cancelar seu voto?");
        if (!confirmar) return;

        const resp = await fetch("http://localhost:8080/controller/cancelar_voto.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await resp.json();

        if (data.sucesso) {
            alert("Voto cancelado com sucesso!");
        } else {
            alert(data.erro || "Erro ao cancelar o voto");
        }
    });

});
    