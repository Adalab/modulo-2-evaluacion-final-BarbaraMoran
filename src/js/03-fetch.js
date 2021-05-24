//Crear variables "maestras" globales.

//creamos un array para guardar los datos recibidos por el fetch
let apiData = [];
//creamos un array para guardar los favoritos del usuario
let userFavShows = [];
//creamos un array para guardar los datos recuperados del LocalStorage
let keptFavData = [];

btnEl.addEventListener("click", getApiData);

//Función para solicitar data
function getApiData() {
  //capturamos la búsqueda del usuario en una constante (llamando a la función getUserSearch de search.js)
  const searchedShow = getUserSearch();
  //hacemos fetch usando los datos introducidos por el usuario
  fetch(`//api.tvmaze.com/search/shows?q=${searchedShow}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Metemos los datos recibidos en la constante apiData (variable global)
      apiData = data;
      //llamamos a la función para pintar los datos de la búsqueda en la pantalla y marcar los fav.
      renderTvShows();
    });
}

//Función para pintar Search Data
function renderTvShows() {
  resultsList.innerHTML = "";
  let htmlCode = "";

  for (const object of apiData) {
    //Buscar si las tarjetas que está pintando son fav.
    const checkFavIdsExistence = userFavShows.find(
      (fav) => fav.show.id === object.show.id
    );
    //Si find nos devuelve un undefined no la tenemos en nuestro array de favoritos y pintaremos el li en rosa (clase item-color para series no fav)
    if (checkFavIdsExistence === undefined) {
      htmlCode += `<li class= "show-list__item item-color js-card" data-id="${object.show.id}">`;
      //y si nos devuelve un id de un favorito pintaremos ese favorito en naranja (clase fav-color)
    } else {
      htmlCode += `<li class= "show-list__item fav-color js-card" data-id="${object.show.id}">`;
    }
    //Si tenemos foto en .show.image.medium la pintaremos.
    if (object.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
      //Y si no, pintaremos la foto de relleno.
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${object.show.image.medium}"/>`;
    }
    //En cualquier caso pintaremos el título y cerraremos el array.
    htmlCode += `<h3>${object.show.name}</h3>`;
    htmlCode += `</li>`;
  }

  //añadimos nuestro HTML de js a elemento (lista de resultados)
  resultsList.innerHTML = htmlCode;
  //llamamos a la función donde activaremos nuestras tarjetas clicables
  addCardListeners();
}
