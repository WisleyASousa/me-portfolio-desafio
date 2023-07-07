function highlightItem(element) {
  // Remove a classe .nav-selected de todos os itens
  var items = document.getElementsByTagName("a");
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove("nav-selected");
  }

  // Adiciona a classe .nav-selected ao item clicado
  element.classList.add("nav-selected");
}
window.addEventListener("load", function() {
  var initialItem = document.querySelector("nav ul li:first-child a");
  highlightItem(initialItem);
});

/*======= Formulário ========*/


  

function submitForm(event) {
    event.preventDefault(); // Impede o envio do formulário padrão


    
    // Obter os valores dos campos de entrada
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var subject = document.getElementById('subjectInput').value;
    var message = document.getElementById('messageInput').value;


    // Validar se os campos estão vazios
    if (name === '' || email === '' || subject === '' || message === '') {
      document.getElementById('requiredAlert').style.display = 'block';
      document.getElementById('successAlert').style.display = 'none';
      // colcoar uma bordar vermelha nos campos vazios
      if (name === '') {
        document.getElementById('nameInput').style.border = '1px solid red';
      } else {
        document.getElementById('nameInput').style.border = '1px solid #ced4da';
      }
      if (email === '') {
        document.getElementById('emailInput').style.border = '1px solid red';
      } else {
        document.getElementById('emailInput').style.border = '1px solid #ced4da';
      }
      if (subject === '') {
        document.getElementById('subjectInput').style.border = '1px solid red';
      } else {
        document.getElementById('subjectInput').style.border = '1px solid #ced4da';
      }
      if (message === '') {
        document.getElementById('messageInput').style.border = '1px solid red';
      } else {
        document.getElementById('messageInput').style.border = '1px solid #ced4da';
      }

      return; // Impede o processamento adicional
    }

    // Criar um objeto com as informações do formulário
    var formData = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };

    // Converter o objeto para JSON
    var jsonData = JSON.stringify(formData);

    console.log(jsonData);

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


    setTimeout(function() {

      document.getElementById('requiredAlert').style.display = 'none';
      document.getElementById('successAlert').style.display = 'none';
      document.getElementById('submitEnviar').classList.remove('btn_EnviarOut');
    }
    , 3000);


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


