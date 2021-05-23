//Crear constante global
//let showsData;

btnEl.addEventListener("click", getApiData);

//Función para solicitar data
function getApiData() {
  const searchedShow = getUserSearch();
  fetch(`https://api.tvmaze.com/search/shows?q=${searchedShow}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //showsData = data;
      renderTvShows(data);
    });
}

//Función para pintar Data
function renderTvShows(data) {
  showsList.innerHTML = "";

  for (const object of data) {
    //Localizar datos concretos y meterlos en una constante//
    const showNameData = object.show.name;
    const showMediumPicData = object.show.image.medium;
    const showPicData = object.show.image;

    //Pintar los datos e intento de camvbiar foto NULL
    if (showPicData === null) {
      showsList.innerHTML += `<li class= "show-list__item item-color js-card">
    <img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
    <h3>${showNameData}</h3>
  </li>`;
    } else {
      showsList.innerHTML += `<li class= "show-list__item item-color js-card">
    <img class="item__picture js-picture" src= "${showMediumPicData}"/>
    <h3>${showNameData}</h3>
  </li>`;
    }
    //INTENTO DE CAMBIAR FOTO NULL
    /*const picEls = document.querySelectorAll(".js-picture");
    for (const picEl of picEls) {
      if  {
        picEl.src =
          "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
      } else {
        picEl.src = `${showMediumPicData}`;
      }
    }*/

    /*const listItemEl = document.createElement("li");
        showsList.appendChild(listItemEl);
        const pictureEl = document.createElement("img");
        pictureEl.src = `${showPicData}`;
        listItemEl.appendChild(pictureEl);
        const titleEl = document.createElement("h2");
        const titleName = document.createTextNode(`${showNameData}`);
        titleEl.appendChild(titleName);
        listItemEl.appendChild(titleEl);
        //Añadir estilos
        listItemEl.style.backgroundColor = "palevioletred";
        listItemEl.height = "400px";
        listItemEl.width = "300px";
        listItemEl.display = "flex";
        listItemEl.flexDirection = "column";
        listItemEl.alignItems = "center";
        listItemEl.gap = "10px";
        listItemEl.justifyContent = "center";
        pictureEl.style.height = "250px";*/
  }

  addCardListeners();
}
