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

  //Ver si ha guardado anteriormente el favorito.Si es undefined no se ha guardado.
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

  renderTvShows();
  renderFavSection();
  // setInLocalStorage()
  console.log(userFavShows);
}

//document.addEventListener("load", renderFavSection)

function renderFavSection() {}

//GUARDAR FAV EN EL LOCAL STORAGE
/*function loadFav() {
  if (localStorage.getItem(object) !== null) {
    const keptData = localStorage.getItem(object);
    renderTvShows(data);
  }
}
document.addEventListener("load", renderFavShows);*/

// al arrancar > compruebas si hay datos en el local storage > los lees > los guardas en userFavShows > y los pintas
