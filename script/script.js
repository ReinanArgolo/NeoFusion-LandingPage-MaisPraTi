document.addEventListener("DOMContentLoaded", function () {
    const enviar = document.getElementById("enviarBtn");
    const nome = document.getElementById('name');
    const email = document.getElementById('email');
    const erro = document.getElementById("erro");
    const enviado = document.getElementById("enviado");
    const ok = document.getElementById("ok");

    enviar.onclick = function (event) {
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

    ok.onclick = (() => {
        erro.close()
    });


});

async function requisitar(id) {
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const image = document.getElementById('img');


    const buttons = document.querySelectorAll('.buttons-container .botao');
    buttons.forEach(button => button.classList.remove('active'));
    const clickedButton = document.getElementById(`botao${id}`);
    clickedButton.classList.add('active');

    await fetch('/DataContents/abas.json')
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

document.addEventListener('DOMContentLoaded', function () {
    fetch('/DataContents/cards.json')
        .then(response => response.json())
        .then(data => {
            populateCarousel(data.card);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});



function saveCardContent(button) {
    console.log('Botão clicado:', button);

    const card = button.closest('.carousel-item');
    const title = card.querySelector('.card-title').textContent;
    const imgSrc = card.querySelector('.card-img-top').src;
    const text = card.querySelector('.card-text').textContent;

    console.log('Conteúdo do card:', { title, imgSrc, text });


    const nome = prompt('Digite seu nome:');
    console.log('Nome do usuário:', nome);

    const cardContent = {
        title,
        imgSrc,
        text,
        nome
    };
    let id = localStorage.getItem('id');
    if (id === null) {
        id = 0;
    } else {
        id = parseInt(id) + 1;
    }
    localStorage.setItem('id', id);

    localStorage.setItem(id, JSON.stringify(cardContent));

    alert('Card salvo com sucesso!');
}

function populateCarousel(cards) {
    const carouselInner = document.querySelector('.carousel-inner');

    carouselInner.innerHTML = '';

    cards.forEach((card, index) => {
        const isActive = index === 0 ? 'active' : ''; 

        const carouselItem = `
            <div class="carousel-item ${isActive}">
                <div class="d-flex justify-content-center align-itens-center">
                    <div class="card" style="width: 30rem;">
                    <img src="${card.imgUrl}" class="card-img-top"" alt="${card.title}">
                    <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.content}</p>
                            <button class="btn btn-primary inscricaoButton">Inscrever-se</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        carouselInner.innerHTML += carouselItem;
    });

    const inscricaoButtons = document.querySelectorAll('.inscricaoButton');
    inscricaoButtons.forEach(button => {
        console.log('Adicionando ouvinte de evento ao botão:', button);
        button.addEventListener('click', function () {
            showModal(this);
        });
    });
}

function showModal(button) {
    const card = button.closest('.carousel-item');
    const title = card.querySelector('.card-title').textContent;
    const imgSrc = card.querySelector('.card-img-top').src;
    const text = card.querySelector('.card-text').textContent;

    const modalContent = `
        <img src="${imgSrc}" class="card-img-top mb-3" alt="${title}" style="width: 100%; height: auto;">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${text}</p>
    
    `;

    const cardDetails = document.querySelector('#cardDetails');
    cardDetails.innerHTML = modalContent;

    const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));
    cardModal.show();

    const subscriptionForm = document.getElementById('subscriptionForm');
    subscriptionForm.onsubmit = function (event) {
        event.preventDefault();
        saveCardContent(title, imgSrc, text);
        cardModal.hide();
    };
}

function saveCardContent(title, imgSrc, text) {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    const cardContent = {
        title,
        imgSrc,
        text,
        userName,
        userEmail
    };

    let id = localStorage.getItem('id');
    if (id === null) {
        id = 0;
    } else {
        id = parseInt(id) + 1;
    }
    localStorage.setItem('id', id);

    localStorage.setItem(id, JSON.stringify(cardContent));

    alert('Card salvo com sucesso!');
}

function showSavedEvents() {
    const savedEventsModal = new bootstrap.Modal(document.getElementById('savedEventsModal'));
    const savedEventsContainer = document.getElementById('savedEvents');

    savedEventsContainer.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key === 'id') continue;

        const cardContent = JSON.parse(localStorage.getItem(key));
        const eventItem = `
                  <div class="card mb-3" style="width: 18rem;">
                      <img src="${cardContent.imgSrc}" class="card-img-top" alt="${cardContent.title}">
                      <div class="card-body">
                          <h5 class="card-title">${cardContent.title}</h5>
                          <p class="card-text">${cardContent.text}</p>
                          <p class="card-text"><strong>Nome:</strong> ${cardContent.userName}</p>
                          <p class="card-text"><strong>Email:</strong> ${cardContent.userEmail}</p>
                          <button class="btn btn-danger" onclick="deleteSavedEvent(${key})">Excluir</button>
                            <button class="btn btn-primary" onclick="editSavedEvent(${key})">Editar</button>
                      </div>
                  </div>
              `;
        savedEventsContainer.innerHTML += eventItem;
    }

    savedEventsModal.show();
}

function editSavedEvent(key) {
    const cardContent = JSON.parse(localStorage.getItem(key));
    document.getElementById('editTitle').innerHTML = cardContent.title;
    document.getElementById('editContent').innerHTML = cardContent.text;;
    document.getElementById('editUserName').value = cardContent.userName;
    document.getElementById('editUserEmail').value = cardContent.userEmail;

    const editEventModal = new bootstrap.Modal(document.getElementById('editEventModal'));
    editEventModal.show();

    document.getElementById('editEventForm').onsubmit = function(event) {
        event.preventDefault();
        
        cardContent.userName = document.getElementById('editUserName').value;
        cardContent.userEmail = document.getElementById('editUserEmail').value;

        console.log('Updated cardContent:', cardContent);

        localStorage.setItem(key, JSON.stringify(cardContent));

        console.log('Updated item:', localStorage.getItem(key));

        editEventModal.hide();
        showSavedEvents();
    };
}

function deleteSavedEvent(key) {
    localStorage.removeItem(key);
    showSavedEvents();
}




document.getElementById('showSavedEventsButton').addEventListener('click', showSavedEvents);