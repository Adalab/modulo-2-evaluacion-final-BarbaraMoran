function addCardListeners() {
  const cardEls = document.querySelectorAll(".js-card");

  for (const cardEl of cardEls) {
    cardEl.addEventListener("click", handleFavBtn);
  }
}

function handleFavBtn(event) {
  const selectedCard = event.currentTarget;
  const selectedCardId = parseInt(selectedCard.dataset.id);

  const checkFavIdsExistence = userFavShows.find((favSerie) => {
    return favSerie.show.id === selectedCardId;
  });

  if (checkFavIdsExistence === undefined) {
    const foundSerie = apiData.find((serie) => {
      return serie.show.id === selectedCardId;
    });
    userFavShows.push(foundSerie);
  } else {
    userFavShows = userFavShows.filter((fav) => {
      return fav.show.id !== selectedCardId;
    });
  }

  lS(userFavShows);
  renderTvShows();
  renderFavSection(userFavShows);
}

function lS(userFavShows) {
  localStorage.setItem("userFavShows", JSON.stringify(userFavShows));
  let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
}

function renderFavSection(userFavShows) {
  let htmlCode = "";

  for (const fav of userFavShows) {
    htmlCode += `<li class= "show-list__item js-card" data-id="${fav.show.id}">`;

    if (fav.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${fav.show.name}"/>`;
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${fav.show.image.medium}" alt="${fav.show.name} title="${fav.show.name}"/>`;
    }

    htmlCode += `<h3 class= "favorite-show-title">${fav.show.name}</h3>`;
    htmlCode += `<img class= "icon js-icon" data-id="${fav.score}" src="./assets/images/274c.png" />`;
    htmlCode += `</li>`;
  }

  favShowsList.innerHTML = `<h2 class= "favorites-section__title">Mis series favoritas</h2>`;
  favShowsList.innerHTML += htmlCode;
  favShowsList.innerHTML += `<div class= "bin-container js-bin-container"><img class= "bin-button js-bin" src="./assets/images/trash.png" /></div>`;

  if (userFavShows.length === 0) {
    favShowsList.innerHTML = "";
  }

  addBinListener();
  addDeleteIconListeners();
}

function addBinListener() {
  const binPicEl = document.querySelector(".js-bin-container");
  binPicEl.addEventListener("click", handleBin);
}

function handleBin() {
  userFavShows = [];
  keptFavData = [];

  renderTvShows(userFavShows);
  renderFavSection(userFavShows);
  lS(userFavShows);
}

function addDeleteIconListeners() {
  const deleteIconEls = document.querySelectorAll(".js-icon");
  for (const deleteIconEl of deleteIconEls) {
    deleteIconEl.addEventListener("click", handleIcon);
  }
}

function handleIcon(event) {
  const selectedIcon = event.currentTarget;
  const selectedIconId = parseInt(selectedIcon.dataset.id);

  userFavShows = userFavShows.filter((fav) => {
    return fav.show.id !== selectedIconId;
  });

  renderTvShows(userFavShows);
  renderFavSection(userFavShows);
  lS(userFavShows);
}

document.addEventListener("load", recoverFavorites());

function recoverFavorites() {
  if (JSON.parse(localStorage.getItem("userFavShows")).length !== 0) {
    let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
    userFavShows = keptFavData;
    renderFavSection(userFavShows);
  }
}
