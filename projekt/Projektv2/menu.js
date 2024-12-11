//Menu wysuwane
function menu() {
  var menu = document.querySelector(".menu");
  menu.classList.toggle("show");
  menu.classList.toggle("hide");
}

let menus = document.querySelector(".more");
menus.addEventListener("click", menu);
