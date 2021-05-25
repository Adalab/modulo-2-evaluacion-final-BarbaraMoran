let apiData = [];
let userFavShows = [];
let keptFavData = [];

btnEl.addEventListener("click", getApiData);

function getApiData() {
  const searchedShow = getUserSearch();
  fetch(`//api.tvmaze.com/search/shows?q=${searchedShow}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      apiData = data;
      renderTvShows();
    });
}

function renderTvShows() {
  showsList.innerHTML = "";
  let htmlCode = "";

  for (const object of apiData) {
    const checkFavIdsExistence = userFavShows.find(
      (fav) => fav.show.id === object.show.id
    );

    if (checkFavIdsExistence === undefined) {
      htmlCode += `<li class= "show-list__item item-color js-card" data-id="${object.show.id}">`;
    } else {
      htmlCode += `<li class= "show-list__item fav-color js-card" data-id="${object.show.id}">`;
    }

    if (object.show.image === null) {
      htmlCode += `<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
    } else {
      htmlCode += `<img class="item__picture js-picture" src= "${object.show.image.medium}"/>`;
    }

    htmlCode += `<h3>${object.show.name}</h3>`;
    htmlCode += `</li>`;
  }

  showsList.innerHTML = htmlCode;
  addCardListeners();
}
