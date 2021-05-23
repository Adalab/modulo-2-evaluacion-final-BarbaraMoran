//Función Prevent Default para que la info no se envíe al navegador.
function submitPrevent(event) {
  event.preventDefault();
}

formEl.addEventListener("submit", submitPrevent);

//Función para recoger la búsqueda del usuario.
function getUserSearch() {
  return inputEl.value;
  //localStorage.setItem("userSearch", userSearch);
  //const keptData = localStorage.getItem("userSearch");
}
