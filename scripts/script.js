
function highlightItem(element) {
  // Remove a classe .nav-selected de todos os itens
  let items = document.getElementsByTagName("a");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("nav-selected");
  }

  // Adiciona a classe .nav-selected ao item clicado
  element.classList.add("nav-selected");
}
window.addEventListener("load", function() {
  let initialItem = document.querySelector("nav ul li:first-child a");
  highlightItem(initialItem);
});

/*======= Videos ========*/

let video = document.getElementById("myVideo");
    video.addEventListener("ended", function() {
      video.play();
    });



/*======= Formulário ========*/


 // Recuperar a lista de mensagens do localStorage, se existir
let messageList = JSON.parse(localStorage.getItem('messageList')) || [];
// Exibir a quantidade de mensagens na tela

function showMessageCount() {
  let messageCountElement = document.getElementById('messageCount');
  messageCountElement.textContent = messageList.length;
}
showMessageCount();



function submitForm(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    

    
    // Obter os valores dos campos de entrada
    let name = document.getElementById('nameInput').value;
    let email = document.getElementById('emailInput').value;
    let subject = document.getElementById('subjectInput').value;
    let message = document.getElementById('messageInput').value;


    // Validar se os campos estão vazios
    if (name === '' || email === '' || subject === '' || message === '') {
      document.getElementById('requiredAlert').style.display = 'block';
      document.getElementById('successAlert').style.display = 'none';
      // colocando uma bordar vermelha nos campos vazios
      if (name === '') {
        document.getElementById('nameInput').style.border = '1px solid red';
        document.getElementById('nameInput').classList.add('inputAlert');

      } else {
        document.getElementById('nameInput').style.border = '1px solid #ced4da';
      }
      if (email === '') {
        document.getElementById('emailInput').style.border = '1px solid red';
        document.getElementById('emailInput').classList.add('inputAlert');

      } else {
        document.getElementById('emailInput').style.border = '1px solid #ced4da';
      }
      if (subject === '') {
        document.getElementById('subjectInput').style.border = '1px solid red';
        document.getElementById('subjectInput').classList.add('inputAlert');

      } else {
        document.getElementById('subjectInput').style.border = '1px solid #ced4da';
      }
      if (message === '') {
        document.getElementById('messageInput').style.border = '1px solid red';
        document.getElementById('messageInput').classList.add('inputAlert');
      } else {
        document.getElementById('messageInput').style.border = '1px solid #ced4da';
      }

      return; // Impede o processamento adicional
    }

    // Criando um objeto com as informações do formulário
    let formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      date: new Date().toLocaleDateString() 
    };

    messageList.push(formData);
    localStorage.setItem('messageList', JSON.stringify(messageList));

    // showMessages();

    // Limpando os campos do formulário
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('subjectInput').value = '';
    document.getElementById('messageInput').value = '';

    document.getElementById('requiredAlert').style.display = 'none';
    document.getElementById('successAlert').style.display = 'block';
    document.getElementById('submitEnviar').classList.add('btn_EnviarOut');


    document.getElementById('nameInput').style.border = '1px solid #ced4da';
    document.getElementById('emailInput').style.border = '1px solid #ced4da';
    document.getElementById('subjectInput').style.border = '1px solid #ced4da';
    document.getElementById('messageInput').style.border = '1px solid #ced4da';
    showMessageCount()
    document.getElementById('linkMsgs').classList.add('notificacao');
    

    setTimeout(function() {

      document.getElementById('requiredAlert').style.display = 'none';
      document.getElementById('successAlert').style.display = 'none';
      document.getElementById('submitEnviar').classList.remove('btn_EnviarOut');
      document.getElementById('linkMsgs').classList.remove('notificacao');
      
    }
    , 5000);

    // Adicionando um evento de clique à caixa de entrada do formulário
    document.getElementById('inputBox').addEventListener('click', function() {
      // Código a ser executado quando o usuário clicar na caixa de entrada
      document.getElementById('successAlert').style.display = 'none';

      // Ocultar o alerta "requiredAlert"
      document.getElementById('requiredAlert').style.display = 'none';

      // Ocultar o alerta "successAlert"
      document.getElementById('successAlert').style.display = 'none';

      // Remover a classe "btn_EnviarOut" do botão "submitEnviar"
      document.getElementById('submitEnviar').classList.remove('btn_EnviarOut');

      // Remover a classe "notificacao" do link "linkMsgs"
      document.getElementById('linkMsgs').classList.remove('notificacao');


    });

  }
  

// Função para remover uma mensagem específica
function removeMessage(index) {
  // Remove a mensagem da lista pelo índice
  messageList.splice(index, 1);

  // Atualizando o armazenamento local com a nova lista de mensagens
  localStorage.setItem('messageList', JSON.stringify(messageList));

  showMessages(); 
}

function successRemove() {
  document.getElementById('msgExcluida').style.display = 'block';
  setTimeout(function() {
    document.getElementById('msgExcluida').style.display = 'none';
    if (messageList.length !== 0) {
      location.reload();
    }
  }
  , 1200);
}


// Função para criar e exibir os cards
function showMessages() {
  let messageList = JSON.parse(localStorage.getItem('messageList')) || [];

  
  // Obtendo a referência do elemento onde os cards serão exibidos
  let cardContainer = document.getElementById('cardContainer');

  // Limpar o conteúdo existente
  cardContainer.innerHTML = '';

  // colocando texto caso não tenha mensagens
  if (messageList.length === 0) {
    cardContainer.innerHTML = '<p class="text-center text-white bottom">Nenhuma mensagem recebida</p>';
    return;
  }

  messageList.forEach((message, i) => {
    // Criar os elementos do card
    let card = document.createElement('div');
    card.className = 'card widget text-center rounded-4 ';
    card.style.width = '18rem';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerHTML = '<h6 class="text-uppercase ">' + message.name + '</h6>' + '<p class="small text_email rounded-4 shadow-sm">' + message.email + '</p>';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = '<p class="card-text fw-semibold border-bottom bg-info-subtle bg-opacity-10 rounded-4 shadow-sm">' + message.subject + '</p>' + '<p class="card-text ">' + message.message + '</p>';

    let cardFooter = document.createElement('small');
    cardFooter.className = 'card-footer d-flex flex-column font-monospace align-items-center gap-4 text-body-secondary';
    cardFooter.innerHTML = message.date;

    // Criar o botão de exclusão
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn w-50 shadow btn-outline-danger';
    deleteButton.setAttribute('data-index', i);
    deleteButton.innerHTML = `Excluir`;

    // Adicionando evento de clique ao botão de exclusão
    deleteButton.addEventListener('click', function() {
      let index = parseInt(this.getAttribute('data-index'));
      removeMessage(index);
      successRemove();
    });

    // Adicionando o botão de exclusão ao rodapé do card
    cardFooter.appendChild(deleteButton);

    // Adicionando os elementos ao card
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // Adicionando o card ao container
    cardContainer.appendChild(card);
  });
}

deleteMsgsAll.addEventListener('click', function() {
  clearAll();
});


// Chamada inicial para exibir os cards existentes
showMessages();

// funcao apra apagar todas as msg no local storage
function clearAll() {
  localStorage.clear();
  successRemoveAll()
}

function successRemoveAll() {
  document.getElementById('msgExcluidaAll').style.display = 'block';
  setTimeout(function() {
    document.getElementById('msgExcluidaAll').style.display = 'none';
    location.reload();
  }
  , 2000);
}
/*======= scroll progresso bar ========*/



window.addEventListener('scroll', function() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = scrollProgress + '%';
});

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

/*======= scroll sections nav-selected ========*/

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('nav-selected');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('nav-selected');
      })
    };
  });
};

/*======= Animações========*/

ScrollReveal({ 
  reset: true,
  distance: '100px',
  duration: 800, 
  delay: 100
});

ScrollReveal().reveal('.container_Formation, .top, .right, .container_Contact', { origin: 'top' });
ScrollReveal().reveal('.container_Professional, .bottom, .left',  { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.widget', { interval: 200 });
// ScrollReveal().reveal('.right', { origin: 'left' });
// ScrollReveal().reveal('.left, .container_Contact', { origin: 'right' });


const typed = new Typed('.multiple-text', {
  strings: ['Desenvolvedor Front-end', ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 2000,
  loop: true
});

const typedMe = new Typed('.multiple-text-2', {
  strings: ['me!', ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 500,
  loop: true
});


