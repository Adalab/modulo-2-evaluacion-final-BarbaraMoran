"use strict";

//Función para guardar la búsqueda del usuario.
function getUserSearch() {
  return inputEl.value;
  //localStorage.setItem("userSearch", userSearch);
  //const keptData = localStorage.getItem("userSearch");
}

function getApiData() {
  const searchedShow = getUserSearch();
  fetch(`https://api.tvmaze.com/search/shows?q=${searchedShow}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (const object of data) {
        //Localizar datos//
        const showNameData = object.show.name;
        const showPicData = object.show.image.original;
        //Crear elementos con los datos y añadirlos al DOM
        const listItemEl = document.createElement("li");
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
        pictureEl.style.height = "250px";
      }
    });
}

btnEl.addEventListener("click", getApiData);
