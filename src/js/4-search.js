"use strict";

const formEl = document.querySelector(".js-form");
const inputEl = document.querySelector(".js-input");
const showSearch = inputEl.value;
const btnEl = document.querySelector(".js-button");

function submitInput(event) {
  event.preventDefault();
}

function handleButton() {
  console.log(showSearch);
}

btnEl.addEventListener("click", handleButton);
btnEl.addEventListener("click", submitInput);
