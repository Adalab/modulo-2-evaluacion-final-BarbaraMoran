//Función Prevent Default para que la info no se envíe al navegador.
function submitPrevent(event) {
  event.preventDefault();
}

formEl.addEventListener("submit", submitPrevent);

//Función para recoger el value del input (búsqueda del usuario).
function getUserSearch() {
  return inputEl.value;
}
