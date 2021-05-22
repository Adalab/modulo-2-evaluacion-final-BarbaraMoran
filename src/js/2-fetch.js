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
      /*console.log(data);
      console.log(data[0].show);
      console.log(data[0].show.name);
      console.log(data[0].show.image);
      console.log(data[0].show.image.original);*/
      for (const object of data) {
        /*console.log(object.show.name);
        console.log(object.show.image);
        console.log(object.show.image.original);*/
      }
    });
}

btnEl.addEventListener("click", getApiData);
