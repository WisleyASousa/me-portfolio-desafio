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