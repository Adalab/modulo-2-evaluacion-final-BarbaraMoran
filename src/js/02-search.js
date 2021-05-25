//Función Prevent Default para que la info no se envíe al navegador (bloquear enter del input).
function submitPrevent(event) {
  event.preventDefault();
}

formEl.addEventListener("submit", submitPrevent);

//Función para recoger la búsqueda del usuario.
function getUserSearch() {
  return inputEl.value;
}
