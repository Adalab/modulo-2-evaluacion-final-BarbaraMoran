"use strict";

//Función Prevent Default para que la info no se envíe al navegador.
function submitPrevent(event) {
  event.preventDefault();
}

formEl.addEventListener("submit", submitPrevent);
