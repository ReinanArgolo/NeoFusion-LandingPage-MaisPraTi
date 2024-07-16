document.addEventListener("DOMContentLoaded", function() {
    const enviar = document.getElementById("enviarBtn");
    const nome = document.getElementById('name');
    const email = document.getElementById('email');
    const erro = document.getElementById("erro");
    const enviado = document.getElementById("enviado");
    const ok = document.getElementById("ok");

    enviar.onclick = function(event) {
        event.preventDefault(); 
        if (nome.value !== '' && email.value !== '') {
            enviado.showModal();
            setTimeout(() => {
                enviado.close();
            }, 3000); 
        } else {
            erro.showModal();
            setTimeout(() => {
                erro.close();
            }, 3000); 
        }
    };

    ok.onclick = (()=>{
        erro.close()
    });


});

function requisitar(id) {
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const image = document.getElementById('img');
    
    // Remover classe 'active' de todos os botões
    const buttons = document.querySelectorAll('.buttons-container .botao');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Adicionar classe 'active' ao botão clicado
    const clickedButton = document.getElementById(`botao${id}`);
    clickedButton.classList.add('active');

    fetch('/abasContent/abas.json')
        .then(response => response.json())
        .then(data => {
            title.innerHTML = data.aba[id].title;
            content.innerHTML = data.aba[id].content;
            image.src = data.aba[id].imgUrl;
            console.log(data);
        })
        .catch(error => console.error('Error fetching the data:', error));
}

requisitar(0)