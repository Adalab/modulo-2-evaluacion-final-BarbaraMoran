//Extraemos lis con las tarjetas de las series
function addCardListeners() {
  const cardEls = document.querySelectorAll(".js-card");

  //añadir listener a cada uno de los lis y añadir evento. Llamar a la función handleFavBtn al activar el evento.
  for (const cardEl of cardEls) {
    cardEl.addEventListener("click", handleFavBtn);
  }
}

//Función para seleccionar y deseleccionar favoritos y guardarlos en nuestro array de favoritos.
function handleFavBtn(event) {
  //identificar la serie seleccionada por el usuario mediante el id de aquella en la que pinche.
  const selectedCard = event.currentTarget;
  const selectedCardId = parseInt(selectedCard.dataset.id);

  //Ver si el usuario ha marcado anteriormente el favorito. Si el resultado devuelto por el find es undefined no se ha guardado.
  const checkFavIdsExistence = userFavShows.find((favSerie) => {
    return favSerie.show.id === selectedCardId;
  });
  //Si no se ha guardado(undefined) guardamos el objeto entero de la serie en nuestro array de favorito (variable global)
  if (checkFavIdsExistence === undefined) {
    const foundSerie = apiData.find((serie) => {
      return serie.show.id === selectedCardId;
    });
    userFavShows.push(foundSerie);
  }
  //Si la serie pinchada ya se hubiera guardado antes, lo borraremos del array userFavShows (la deseleccionaremos)
  else {
    //modifico mi array UserFavShows filtrando y quedándome solo con aquellos favoritos que no haya pinchado ("deseleccionado").
    userFavShows = userFavShows.filter((fav) => {
      return fav.show.id !== selectedCardId;
    });
  }

  //llamamos a nuestra función LocalStorage (Ls) y le pasamos el array de favoritos como parámetro.
  lS(userFavShows);
}

//función para guardar Array actualizado en Local Storage.
function lS(userFavShows) {
  localStorage.setItem("userFavShows", JSON.stringify(userFavShows));
  let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
  //llamamos a renderTvShows para marcar nuestras favoritas ahora que tenemos los datos
  renderTvShows();
  //llamamos a renderFavSection para pintar nuestra sección de favoritos y le pasamos los datos del LS.
  renderFavSection(keptFavData);
}

//Función para pintar favoritos
function renderFavSection(keptFavData) {
  favShowsList.innerHTML = "";
  let htmlCode = "";

  //para cada una de nuestras series favoritas guardadas en LS.
  for (const fav of keptFavData) {
    htmlCode += `<li class= "show-list__item fav-color-list js-eraseCard js-card" data-id="${fav.show.id}">`;

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
  //pintamos todo nuestro html JS en nuestra lista de favoritos.
  favShowsList.innerHTML = `<h2 class="favorites-section__title">Mis series favoritas</h2>${htmlCode}`;

  //renderTvShows();si lo activara, las favoritas serían clicables y se eliminarían
}

document.addEventListener("load", recoverFavorites());

function recoverFavorites(event) {
  if (JSON.parse(localStorage.getItem("userFavShows")) !== null) {
    let keptFavData = JSON.parse(localStorage.getItem("userFavShows"));
    userFavShows = keptFavData;
    renderFavSection(userFavShows);
  }
}

// al arrancar > compruebas si hay datos en el local storage > los lees > los guardas en userFavShows > y los pintas!!
