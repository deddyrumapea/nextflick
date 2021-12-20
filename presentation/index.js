import ApiTmdb from "../data/api/ApiTmdb.js";
import ApiUnsplash from "../data/api/ApiUnsplash.js";

let formSearch = document.querySelector("#form-search");

let containerMovies = document.querySelector("#container-movies");
let containerTvShows = document.querySelector("#container-tv-shows");
let currentMoviePage = 1;
let currentTvShowPage = 1;

formSearch.onsubmit = (e) => {
  e.preventDefault();

  let query = document.querySelector("#search-bar").value.trim();
  if (query == "") return;

  let alertMain = document.querySelector("#alert-main");

  ApiTmdb.searchMovies(query, (responseText) => {
    let response = JSON.parse(responseText);
    let movies = response.results;

    containerMovies.innerHTML = "";
    alertMain.innerHTML = `Showing search results for ${query}. <a href=''>Reset.</a>`;
    alertMain.classList.remove("visually-hidden");

    movies.forEach((movie) => {
      containerMovies.innerHTML += movieCard(movie);
    });
  });

  ApiTmdb.searchTvShows(query, (responseText) => {
    let response = JSON.parse(responseText);
    let tvShows = response.results;

    containerTvShows.innerHTML = "";
    alertMain.innerHTML = `Showing search results for ${query}. <a href=''>Reset.</a>`;
    alertMain.classList.remove("visually-hidden");

    tvShows.forEach((tvShow) => {
      containerTvShows.innerHTML += tvShowCard(tvShow);
    });
  });
};

ApiUnsplash.getPhotos("movies", (responseText) => {
  let response = JSON.parse(responseText);
  let randomIndex = Math.floor(Math.random() * response.results.length);
  let imageSrc = response.results[randomIndex].urls.full;

  let imgJumbotron = document.querySelector("#img-jumbotron");
  imgJumbotron.src = imageSrc;
});

ApiTmdb.getDiscoverMovies(currentMoviePage, (responseText) => {
  let response = JSON.parse(responseText);
  let movies = response.results;
  movies.forEach((movie) => {
    containerMovies.innerHTML += movieCard(movie);
  });
});

ApiTmdb.getDiscoverTVShows(currentTvShowPage, (responseText) => {
  let response = JSON.parse(responseText);
  let tvShows = response.results;
  tvShows.forEach((tvShow) => {
    containerTvShows.innerHTML += tvShowCard(tvShow);
  });
});

function movieCard(movie) {
  return `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-2">
        <img 
          src="${ApiTmdb.IMAGE_BASE_URL_500 + movie.poster_path}" 
          class="img-fluid rounded"
          alt="${movie.original_title}" />
      </div>
      <div class="col-10">
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text flick-overview">${movie.overview}</p>
          <p class="card-text">
            <small class="text-muted">Release: ${moment(
              movie.release_date,
              "YYYY-MM-DD"
            ).format("MMMM DD, YYYY")}</small>
          </p>
        </div>
      </div>
    </div>
  </div`;
}

function tvShowCard(tvShow) {
  return `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-2">
        <img 
          src="${ApiTmdb.IMAGE_BASE_URL_500 + tvShow.poster_path}" 
          class="img-fluid rounded"
          alt="${tvShow.name}" />
      </div>
      <div class="col-10">
        <div class="card-body">
          <h5 class="card-title">${tvShow.name}</h5>
          <p class="card-text flick-overview">${tvShow.overview}</p>
          <p class="card-text">
            <small class="text-muted">First air: ${moment(
              tvShow.first_air_date,
              "YYYY-MM-DD"
            ).format("MMMM DD, YYYY")}</small>
          </p>
        </div>
      </div>
    </div>
  </div`;
}
