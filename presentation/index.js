import ApiService from "../data/ApiService.js";

let containerMovies = document.querySelector("#container-movies");
let containerTvShows = document.querySelector("#container-tv-shows");
let currentMoviePage = 1;
let currentTvShowPage = 1;

ApiService.getDiscoverMovies(currentMoviePage, (responseText) => {
  let response = JSON.parse(responseText);
  console.log(response);

  let movies = response.results;
  movies.forEach((movie) => {
    containerMovies.innerHTML += movieCard(movie);
  });

  let totalPages = response.total_pages;
});

ApiService.getDiscoverTVShows(currentTvShowPage, (responseText) => {
  let response = JSON.parse(responseText);
  // console.log(response);
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
          src="${ApiService.IMAGE_BASE_URL_500 + movie.poster_path}" 
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
          src="${ApiService.IMAGE_BASE_URL_500 + tvShow.poster_path}" 
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
