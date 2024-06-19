document.addEventListener("DOMContentLoaded", function() {
    const enviar = document.getElementById("enviarBtn");
    const nome = document.getElementById('name');
    const email = document.getElementById('email');
    const erro = document.getElementById("erro");
    const enviado = document.getElementById("enviado");
    const ok = document.getElementById("ok");

    enviar.onclick = function(event) {
        event.preventDefault(); // Previne o envio do formulário e o reload da página
        if (nome.value !== '' && email.value !== '') {
            enviado.showModal();
            setTimeout(() => {
                enviado.close();
            }, 3000); // Fecha o dialog após 3 segundos
        } else {
            erro.showModal();
            setTimeout(() => {
                erro.close();
            }, 3000); // Fecha o dialog após 3 segundos
        }
    };

    ok.onclick = (()=>{
        erro.close()
    });


});