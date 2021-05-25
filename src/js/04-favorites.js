//Extraer LIS con las tarjetas de las series
function addCardListeners() {
  const cardEls = document.querySelectorAll(".js-card");

  //añadir listener a cada uno de los lis
  for (const cardEl of cardEls) {
    cardEl.addEventListener("click", handleFavBtn);
  }
}

//Función para seleccionar y deseleccionar favoritos y guardarlos en nuestro array de favoritos.
function handleFavBtn(event) {
  //identificar la serie seleccionada por el usuario
  const selectedCard = event.currentTarget;
  const selectedCardId = parseInt(selectedCard.dataset.id);

  //Ver si ha guardado anteriormente el favorito. Si es undefined no se ha guardado.
  const checkFavIdsExistence = userFavShows.find((favSerie) => {
    return favSerie.show.id === selectedCardId;
  });
  //Si no se ha guardado(da undefined) guardamos el objeto entero de la serie en nuestro array de favoritos.
  if (checkFavIdsExistence === undefined) {
    const foundSerie = apiData.find((serie) => {
      return serie.show.id === selectedCardId;
    });
    userFavShows.push(foundSerie);
  }
  //Si ya se hubiera guardado antes, lo borraremos del array userFavShows.
  else {
    //modifico mi array UserFavShows filtrando y quedándome solo con aquellos favoritos que no haya "deseleccionado"
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
}

function renderFavSection(keptFavData) {
  favShowsList.innerHTML = "";
  let htmlCode = "";

  for (const fav of keptFavData) {
    htmlCode += `<li class= "show-list__item js-card" data-id="${fav.show.id}">`;

    //Si tenemos foto en .show.image.medium la pintaremos
    if (fav.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${fav.show.name}"/>`;
      //Y si no, pintaremos la foto de relleno.
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${fav.show.image.medium}" alt="${fav.show.name}"/>`;
    }
    //En cualquier caso pintaremos el título y el aspa y cerraremos el array.
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

//cuando cargamos la página llamamos a la función recoverFavorites
document.addEventListener("load", recoverFavorites());

//función para recuperar favoritas cuando recargamos la web
function recoverFavorites() {
  if (JSON.parse(localStorage.getItem("userFavShows")) !== null) {
    let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
    userFavShows = keptFavData;
    renderFavSection(userFavShows);
  }
}

//función botón de reset
function handleBin() {
  userFavShows = [];
  keptFavData = [];
  lS(userFavShows);
  favShowsList.innerHTML = "";
}

//Función borrar favorito con icono de aspa
function handleIcon(event) {
  //identificar la serie seleccionada por el usuario
  const selectedIcon = event.currentTarget;
  const selectedIconId = parseInt(selectedIcon.dataset.id);

  //modifico mi array UserFavShows filtrando y quedándome solo con aquellos favoritos que no haya "deseleccionado"
  userFavShows = userFavShows.filter((fav) => {
    return fav.show.id !== selectedIconId;
  });

  /*for (const fav of userFavShows) {
    console.log(fav);
    if (fav === "") {
      favShowsList.innerHTML = "";
    }
  }*/

  /*
  if (userFavShows === undefined) {
    favShowsList.innerHTML = "";
  }
^*/
  //llamo al locaLSt
  lS(userFavShows);
}

// al arrancar > compruebas si hay datos en el local storage > los lees > los guardas en userFavShows > y los pintas
