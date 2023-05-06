// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

const banner = document.getElementsByClassName("banner__slide");

window.addEventListener("load", function (e) {
  if (banner) {
    for (let i = 0, length = banner.length; i < length; i++) {
      banner[i].classList.add("visible");
    }
    console.log(banner);
  }
});


