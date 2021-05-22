"use strict";

//const formEl = document.querySelector(".js-form");
const inputEl = document.querySelector(".js-input");
const btnEl = document.querySelector(".js-button");

//Función Prevent Default para que la info no se envíe al navegador.
function submitPrevent(event) {
  event.preventDefault();
}

//Función para mostrar la búsqueda del usuario.
function getUserSearch() {
  let userSearch = inputEl.value;
  //localStorage.setItem("userSearch", userSearch);
  //const keptData = localStorage.getItem("userSearch");
  console.log(userSearch);
}

//Función manejadora
function handleButton(event) {
  submitPrevent(event);
  getUserSearch();
}

btnEl.addEventListener("click", handleButton);
