//Convertimos nuestras tarjetas en listeners
function addCardListeners() {
  const cardEls = document.querySelectorAll(".js-card");

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
  //Si no se ha guardado, guardamos el objeto con sus propiedades (la serie) en nuestro array de favoritos.
  if (checkFavIdsExistence === undefined) {
    const foundSerie = apiData.find((serie) => {
      return serie.show.id === selectedCardId;
    });
    userFavShows.push(foundSerie);
  }
  //Si ya se hubiera guardado antes, lo borraremos del array de favoritos.
  else {
    //modifico mi array de favoritos filtrando y quedándome solo con aquellos favoritos que no hayan sido "deseleccionados"
    userFavShows = userFavShows.filter((fav) => {
      return fav.show.id !== selectedCardId;
    });
  }

  //llamo a LS para guardarlo en LS.
  lS(userFavShows);
}

function lS(userFavShows) {
  localStorage.setItem("userFavShows", JSON.stringify(userFavShows));
  let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
  //Pinto favoritos en la lista de resultados.
  renderTvShows();
  //Pinto favoritos en sección de favoritos.
  renderFavSection(keptFavData);
}

function renderFavSection(keptFavData) {
  favShowsList.innerHTML = "";
  let htmlCode = "";

  //para cada una de las tarjetas de favoritos
  for (const fav of keptFavData) {
    htmlCode += `<li class= "show-list__item js-card" data-id="${fav.show.id}">`;

    //Si tenemos foto en .show.image.medium la pintaremos
    if (fav.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${fav.show.name}"/>`;
      //Y si no, pintaremos la foto de relleno.
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${fav.show.image.medium}" alt="${fav.show.name}"/>`;
    }
    //En cualquier caso pintaremos el título y el icono de aspa y cerraremos el array.
    htmlCode += `<h3 class= "favorite-show-title">${fav.show.name}</h3>`;
    htmlCode += `<img class= "icon js-icon" data-id="${fav.score}" src="./assets/images/274c.png" />`;
    htmlCode += `</li>`;
  }

  favShowsList.innerHTML = `<h2 class= "favorites-section__title">Mis series favoritas</h2>`;
  favShowsList.innerHTML += htmlCode;
  favShowsList.innerHTML += `<div class= "bin-container js-bin-container"><img class= "bin-button js-bin" src="./assets/images/trash.png" /></div>`;

  //Añadimos listeners de icono de aspa y papelera reset
  const binPicEl = document.querySelector(".js-bin-container");
  binPicEl.addEventListener("click", handleBin);
  const deleteIconEls = document.querySelectorAll(".js-icon");
  for (const deleteIconEl of deleteIconEls) {
    deleteIconEl.addEventListener("click", handleIcon);
  }
}

//Cuando cargamos la página llamamos a la función recoverFavorites
document.addEventListener("load", recoverFavorites());

//Función para recuperar favoritas cuando recargamos la web
function recoverFavorites() {
  if (JSON.parse(localStorage.getItem("userFavShows")) !== null) {
    let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
    userFavShows = keptFavData;
    renderFavSection(userFavShows);
  }
}

//Función papelera de reset (borrar todos los favoritos)
function handleBin() {
  userFavShows = [];
  keptFavData = [];
  lS(userFavShows);
  favShowsList.innerHTML = "";
}

//Función borrar serie favorita con icono de aspa.
function handleIcon(event) {
  //identificar la serie seleccionada por el usuario
  const selectedIcon = event.currentTarget;
  const selectedIconId = parseInt(selectedIcon.dataset.id);

  //modifico mi array UserFavShows filtrando y quedándome solo con aquellos favoritos que no haya "deseleccionado"
  userFavShows = userFavShows.filter((fav) => {
    return fav.show.id !== selectedIconId;
  });

  //llamo al LS para guardar los cambios
  lS(userFavShows);

  //quiero borrar la papelera y el título de la sección
  /*if (userFavShows === undefined) {
    favShowsList.innerHTML = "";
  }*/
}
