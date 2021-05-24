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
  console.log(keptFavData);
  favShowsList.innerHTML = "";
  let htmlCode = "";

  for (const fav of keptFavData) {
    htmlCode += `<li class= "show-list__item fav-color-list js-card" data-id="${fav.show.id}">`;

    //Si tenemos foto en .show.image.medium la pintaremos
    if (fav.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
      //Y si no, pintaremos la foto de relleno.
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${fav.show.image.medium}"/>`;
    }
    //En cualquier caso pintaremos el título y cerraremos el array.
    htmlCode += `<h3>${fav.show.name}</h3>`;
    htmlCode += `</li>`;
  }

  favShowsList.innerHTML = `<h2 class="favorites-section__title">Mis series favoritas</h2>${htmlCode}`;
  renderTvShows();
}

document.addEventListener("load", recoverFavorites());

function recoverFavorites(event) {
  if (JSON.parse(localStorage.getItem("userFavShows")) !== null) {
    let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
    userFavShows = keptFavData;
    renderFavSection(userFavShows);
  }
}

// al arrancar > compruebas si hay datos en el local storage > los lees > los guardas en userFavShows > y los pintas
