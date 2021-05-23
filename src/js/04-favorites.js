function addCardListeners() {
  const cardEls = document.querySelectorAll(".js-card");

  for (const cardEl of cardEls) {
    cardEl.addEventListener("click", handleFavBtn);
  }
}

function handleFavBtn(event) {
  const selectedCard = event.currentTarget;
  selectedCard.classList.toggle("fav-color");
  //favoriteCard.classList.remove("item-color");
}
