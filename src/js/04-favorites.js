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
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
      //Y si no, pintaremos la foto de relleno.
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${fav.show.image.medium}"/>`;
    }
    //En cualquier caso pintaremos el título y el aspa y cerraremos el array.
    htmlCode += `<h3 class= "favorite-show-title">${fav.show.name}</h3>`;
    htmlCode += `<img class="icon js-icon" data-id="${fav.show.id}" src="./assets/images/274c.png" />`;

    htmlCode += `</li>`;
  }

  favShowsList.innerHTML = `<h2 class="favorites-section__title">Mis series favoritas</h2>${htmlCode}`;
  //renderTvShows();
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

//prueba evento de deletear favs
for (const deleteIconEl of deleteIconEls) {
  deleteIconEl.addEventListener("click", prueba);
}
function prueba(event) {
  selectedIcon = event.CurrentTarget;
  console.log("holis");
}

//FUNCIÓN PARA DELETEAR FAVS y modificar el array desde el aspa
function handleFavIcon(event) {
  //identificar la serie seleccionada por el usuario
  const selectedCard = event.currentTarget;
  const selectedCardId = parseInt(selectedCard.dataset.id);

  //Ver que se ha guardado anteriormente el favorito.
  const checkFavIdsExistence = userFavShows.find((favSerie) => {
    return favSerie.show.id === selectedCardId;
  });

  //Como será undefined, lo borraremos del array userFavShows.
  if (checkFavIdsExistence !== undefined) {
    //modifico mi array UserFavShows filtrando y quedándome solo con aquellos favoritos que no haya "deseleccionado"
    userFavShows = userFavShows.filter((fav) => {
      return fav.show.id !== selectedCardId;
    });
  }
  console.log("hola");
  lS(userFavShows);
}

// al arrancar > compruebas si hay datos en el local storage > los lees > los guardas en userFavShows > y los pintas
