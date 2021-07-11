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
}

function lS(userFavShows) {
  localStorage.setItem("userFavShows", JSON.stringify(userFavShows));
  let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));

  renderTvShows();
  renderFavSection(keptFavData);

  if (keptFavData.length === 0) {
    console.log(keptFavData.length);
    favShowsList.innerHTML = "";
  }
}

function renderFavSection(keptFavData) {
  favShowsList.innerHTML = "";
  let htmlCode = "";

  for (const fav of keptFavData) {
    htmlCode += `<li class= "show-list__item js-card" data-id="${fav.show.id}">`;

    if (fav.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${fav.show.name}"/>`;
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${fav.show.image.medium}" alt="${fav.show.name}"/>`;
    }

    htmlCode += `<h3 class= "favorite-show-title">${fav.show.name}</h3>`;
    htmlCode += `<img class= "icon js-icon" data-id="${fav.score}" src="./assets/images/274c.png" />`;
    htmlCode += `</li>`;
  }

  favShowsList.innerHTML = `<h2 class= "favorites-section__title">Mis series favoritas</h2>`;
  favShowsList.innerHTML += htmlCode;
  favShowsList.innerHTML += `<div class= "bin-container js-bin-container"><img class= "bin-button js-bin" src="./assets/images/trash.png" /></div>`;

  const binPicEl = document.querySelector(".js-bin-container");
  binPicEl.addEventListener("click", handleBin);
  const deleteIconEls = document.querySelectorAll(".js-icon");
  for (const deleteIconEl of deleteIconEls) {
    deleteIconEl.addEventListener("click", handleIcon);
  }
}

document.addEventListener("load", recoverFavorites());

function recoverFavorites() {
  if (JSON.parse(localStorage.getItem("userFavShows")).length !== 0) {
    let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
    userFavShows = keptFavData;
    renderFavSection(userFavShows);
  }
}

function handleBin() {
  userFavShows = [];
  keptFavData = [];
  lS(userFavShows);
  favShowsList.innerHTML = "";
}

function handleIcon(event) {
  const selectedIcon = event.currentTarget;
  const selectedIconId = parseInt(selectedIcon.dataset.id);

  userFavShows = userFavShows.filter((fav) => {
    return fav.show.id !== selectedIconId;
  });

  lS(userFavShows);
}
