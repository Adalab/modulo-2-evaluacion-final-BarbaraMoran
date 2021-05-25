function submitPrevent(event) {
  event.preventDefault();
}

formEl.addEventListener("submit", submitPrevent);

function getUserSearch() {
  return inputEl.value;
}
