
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
      // colcoar uma bordar vermelha nos campos vazios
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

    // Criar um objeto com as informações do formulário
    let formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      date: new Date().toLocaleDateString() 
    };

    messageList.push(formData);
    localStorage.setItem('messageList', JSON.stringify(messageList));

    showMessages();

    // Limpar os campos do formulário
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

    // Adicione um evento de clique à caixa de entrada do formulário
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

  // Atualiza o armazenamento local com a nova lista de mensagens
  localStorage.setItem('messageList', JSON.stringify(messageList));

  showMessages(); 
}

// Evento load para executar a função successRemove após a página ser recarregada
// window.addEventListener('load', function() {
//   // Chama a função successRemove após a página ser recarregada
//   successRemove();
// });
  // Reexibe os cards após a remoção
  // chamar funcao de sucesso de exclusao apos o reload

// criar funcao de sucesso de exclusao de msg e remover depois de 3 segundos
// document.getElementById('msgExcluida').style.display = 'none';


function successRemove() {
  document.getElementById('msgExcluida').style.display = 'block';
  setTimeout(function() {
    document.getElementById('msgExcluida').style.display = 'none';
    if (messageList.length !== 0) {
      // Recarrega a página
      location.reload();
    }
  }
  , 2000);
}

// Adicione um evento de clique ao elemento pai `cardContainer`
cardContainer.addEventListener('click', function(event) {
  successRemove()
  if (event.target.classList.contains('btn-outline-danger')) {
    // Verifique se o botão "Excluir" foi clicado
    let index = event.target.getAttribute('data-index');
    removeMessage(index);

  }
});
// Função para criar e exibir os cards
function showMessages() {
  // Obtendo a referência do elemento onde os cards serão exibidos
  let cardContainer = document.getElementById('cardContainer');

  // Limpar o conteúdo existente
  cardContainer.innerHTML = '';

  // colocar texto caso não tenha mensagens
  if (messageList.length === 0) {
    cardContainer.innerHTML = '<p class="text-center text-white bottom">Nenhuma mensagem recebida</p>';
    return;
  }

  messageList.forEach((message, i) => {
    // Criar os elementos do card
    let card = document.createElement('div');
    card.className = 'card widget text-center';
    card.style.width = '18rem';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerHTML = '<h5>' + message.name + '</h5>' + '<p>' + message.email + '</p>';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = '<p class="card-text">' + message.message + '</p>';

    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer d-flex flex-column align-items-center gap-4 text-body-secondary';
    cardFooter.innerHTML = message.date;

    // Criar o botão de exclusão
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn w-50 btn-outline-danger';
    deleteButton.setAttribute('data-index', i);
    deleteButton.innerHTML = 'Excluir';

    // Adicionar evento de clique ao botão de exclusão
    deleteButton.addEventListener('click', function() {
      // Chamar a função successRemove quando o botão de exclusão for clicado
      successRemove();
      // Outras ações que você deseja executar ao clicar no botão de exclusão
      // ...
    });

    // Adicionar o botão de exclusão ao rodapé do card
    cardFooter.appendChild(deleteButton);

    // Adicionar os elementos ao card
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // Adicionar o card ao container
    cardContainer.appendChild(card);
  });
}




// Chamada inicial para exibir os cards existentes
showMessages();
// document.getElementById('msgExcluida').style.display = 'none';

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


