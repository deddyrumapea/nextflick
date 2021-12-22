import ApiTmdb from "../data/api/ApiTmdb.js";
import ApiUnsplash from "../data/api/ApiUnsplash.js";

let formSearch = document.querySelector("#form-search");

let containerMovies = document.querySelector("#container-movies");
let containerTvShows = document.querySelector("#container-tv-shows");
let currentMoviePage = 1;
let currentTvShowPage = 1;

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
  populateMoviesList(movies);
});

ApiTmdb.getDiscoverTVShows(currentTvShowPage, (responseText) => {
  let response = JSON.parse(responseText);
  let tvShows = response.results;
  populateTvShowsList(tvShows);
});

function populateMoviesList(movies) {
  toggleMoviesShimmer(false);

  movies.forEach((movie) => {
    containerMovies.innerHTML += movieCard(movie);
  });
  setMovieCardOnClickCallback();
}

function populateTvShowsList(tvShows) {
  toggleTvShowsShimmer(false);

  tvShows.forEach((tvShow) => {
    containerTvShows.innerHTML += tvShowCard(tvShow);
  });
  setTvShowCardOnClickCallback();
}

function toggleTvShowsShimmer(isVisible) {
  containerTvShows.innerHTML = "";
  let shimmer = document.querySelector("#card-tvshows-loading");
  if (isVisible) shimmer.classList.remove("visually-hidden");
  else shimmer.classList.add("visually-hidden");
}

function toggleMoviesShimmer(isVisible) {
  containerMovies.innerHTML = "";
  let shimmer = document.querySelector("#card-movies-loading");
  if (isVisible) shimmer.classList.remove("visually-hidden");
  else shimmer.classList.add("visually-hidden");
}

formSearch.onsubmit = (e) => {
  e.preventDefault();

  let query = document.querySelector("#search-bar").value.trim();
  if (query == "") return;

  let alertMain = document.querySelector("#alert-main");
  toggleMoviesShimmer(true);
  toggleTvShowsShimmer(true);

  ApiTmdb.searchMovies(query, (responseText) => {
    let response = JSON.parse(responseText);
    let movies = response.results;

    alertMain.innerHTML = `Showing search results for ${query}. <a href=''>Reset.</a>`;
    alertMain.classList.remove("visually-hidden");

    populateMoviesList(movies);
  });

  ApiTmdb.searchTvShows(query, (responseText) => {
    let response = JSON.parse(responseText);
    let tvShows = response.results;

    alertMain.innerHTML = `Showing search results for ${query}. <a href=''>Reset.</a>`;
    alertMain.classList.remove("visually-hidden");

    populateTvShowsList(tvShows);
  });
};

function setMovieCardOnClickCallback() {
  let movieCards = containerMovies.childNodes;
  movieCards.forEach((card) => {
    card.onclick = () => {
      let movieId = card.getElementsByTagName("input")[0].value;

      ApiTmdb.getMovieDetail(movieId, (responseText) => {
        let movie = JSON.parse(responseText);
        populateMovieDetail(movie);
      });
    };
  });
}

function setTvShowCardOnClickCallback() {
  let tvShowCards = containerTvShows.childNodes;
  tvShowCards.forEach((card) => {
    card.onclick = () => {
      let tvShowId = card.getElementsByTagName("input")[0].value;

      ApiTmdb.getTvShowDetail(tvShowId, (responseText) => {
        let tvShow = JSON.parse(responseText);
        populateTvShowDetail(tvShow);
      });
    };
  });
}

function populateTvShowDetail(tvShow) {
  tvShow = formatTvShow(tvShow);

  document.querySelector(
    "#tvshow-detail-card"
  ).style.backgroundImage = `url('${tvShow.backdrop_path}')`;

  document.querySelector("#tvshow-detail-poster").src = tvShow.poster_path;
  document.querySelector("#tvshow-detail-title").innerHTML = tvShow.name;

  document.querySelector(
    "#tvshow-detail-vote"
  ).innerHTML = `<i class="bi bi-star"></i> ${tvShow.vote_average} (${tvShow.vote_count} votes) `;

  document.querySelector(
    "#tvshow-detail-release-date"
  ).innerHTML = `<i class="bi bi-calendar-event"></i> ${tvShow.first_air_date} `;

  document.querySelector(
    "#tvshow-detail-runtime"
  ).innerHTML = `<i class="bi bi-stopwatch"></i> ${tvShow.episode_run_time[0]} minutes `;

  document.querySelector("#tvshow-detail-tagline").innerHTML = tvShow.tagline;
  document.querySelector("#tvshow-detail-overview").innerHTML = tvShow.overview;
  document.querySelector("#tvshow-detail-genres").innerHTML = tvShow.genres;
  document.querySelector("#tvshow-detail-status").innerHTML = tvShow.status;
  document.querySelector("#tvshow-detail-inproduction").innerHTML =
    tvShow.in_production;
  document.querySelector("#tvshow-detail-createdby").innerHTML =
    tvShow.created_by;

  document.querySelector("#tvshow-detail-original-language").innerHTML =
    tvShow.original_language;

  document.querySelector("#tvshow-detail-popularity").innerHTML =
    tvShow.popularity;

  document.querySelector("#tvshow-detail-spoken-languages").innerHTML =
    tvShow.spoken_languages;

  document.querySelector("#tvshow-detail-production-countries").innerHTML =
    tvShow.production_countries;

  document.querySelector("#tvshow-detail-production-companies").innerHTML =
    tvShow.production_companies;

  document.querySelector(
    "#tvshow-detail-imdb"
  ).href = `https://www.imdb.com/title/${tvShow.imdb_id}`;

  document.querySelector("#tvshow-detail-homepage").href = tvShow.homepage;
}

function formatTvShow(tvShow) {
  tvShow.backdrop_path = ApiTmdb.IMAGE_BASE_URL_500 + tvShow.backdrop_path;
  tvShow.poster_path = ApiTmdb.IMAGE_BASE_URL_500 + tvShow.poster_path;

  let genres = "";
  tvShow.genres.forEach((genre, i) => {
    genres += (i > 0 ? ", " : "") + genre.name;
  });
  tvShow.genres = genres;

  let creators = "";
  tvShow.created_by.forEach((creator, i) => {
    creators += (i > 0 ? ", " : "") + creator.name;
  });
  tvShow.created_by = creators;

  let productionCountries = "";
  tvShow.production_countries.forEach((country, i) => {
    productionCountries += (i > 0 ? ", " : "") + country.name;
  });
  tvShow.production_countries = productionCountries;

  let productionCompanies = "";
  tvShow.production_companies.forEach((company, i) => {
    productionCompanies += (i > 0 ? "<br/>" : "") + company.name;
  });
  tvShow.production_companies = productionCompanies;

  let spokenLanguages = "";
  tvShow.spoken_languages.forEach((language, i) => {
    spokenLanguages += (i > 0 ? ", " : "") + language.english_name;
  });
  tvShow.spoken_languages = spokenLanguages;

  tvShow.first_air_date = moment(tvShow.first_air_date, "YYYY-MM-DD").format(
    "DD/MM/YYYY"
  );

  return tvShow;
}

function populateMovieDetail(movie) {
  movie = formatMovie(movie);

  document.querySelector(
    "#movie-detail-card"
  ).style.backgroundImage = `url('${movie.backdrop_path}')`;

  document.querySelector("#movie-detail-poster").src = movie.poster_path;
  document.querySelector("#movie-detail-title").innerHTML =
    movie.original_title;

  document.querySelector(
    "#movie-detail-vote"
  ).innerHTML = `<i class="bi bi-star"></i> ${movie.vote_average} (${movie.vote_count} votes) `;

  document.querySelector(
    "#movie-detail-release-date"
  ).innerHTML = `<i class="bi bi-calendar-event"></i> ${movie.release_date} `;

  document.querySelector(
    "#movie-detail-runtime"
  ).innerHTML = `<i class="bi bi-stopwatch"></i> ${movie.runtime} minutes `;

  document.querySelector("#movie-detail-tagline").innerHTML = movie.tagline;
  document.querySelector("#movie-detail-overview").innerHTML = movie.overview;
  document.querySelector("#movie-detail-genres").innerHTML = movie.genres;
  document.querySelector("#movie-detail-budget").innerHTML = movie.budget;
  document.querySelector("#movie-detail-revenue").innerHTML = movie.revenue;
  document.querySelector("#movie-detail-status").innerHTML = movie.status;

  document.querySelector("#movie-detail-original-language").innerHTML =
    movie.original_language;

  document.querySelector("#movie-detail-popularity").innerHTML =
    movie.popularity;

  document.querySelector("#movie-detail-spoken-languages").innerHTML =
    movie.spoken_languages;

  document.querySelector("#movie-detail-production-countries").innerHTML =
    movie.production_countries;

  document.querySelector("#movie-detail-production-companies").innerHTML =
    movie.production_companies;

  document.querySelector(
    "#movie-detail-imdb"
  ).href = `https://www.imdb.com/title/${movie.imdb_id}`;

  document.querySelector("#movie-detail-homepage").href = movie.homepage;
}

function formatMovie(movie) {
  movie.backdrop_path = ApiTmdb.IMAGE_BASE_URL_500 + movie.backdrop_path;
  movie.poster_path = ApiTmdb.IMAGE_BASE_URL_500 + movie.poster_path;
  movie.year = moment(movie.release_date, "YYYY-MM-DD").format("YYYY");

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  movie.budget = formatter.format(movie.budget);
  movie.revenue = formatter.format(movie.revenue);

  let genres = "";
  movie.genres.forEach((genre, i) => {
    genres += (i > 0 ? ", " : "") + genre.name;
  });
  movie.genres = genres;

  let productionCountries = "";
  movie.production_countries.forEach((country, i) => {
    productionCountries += (i > 0 ? ", " : "") + country.name;
  });
  movie.production_countries = productionCountries;

  let productionCompanies = "";
  movie.production_companies.forEach((company, i) => {
    productionCompanies += (i > 0 ? "<br/>" : "") + company.name;
  });
  movie.production_companies = productionCompanies;

  let spokenLanguages = "";
  movie.spoken_languages.forEach((language, i) => {
    spokenLanguages += (i > 0 ? ", " : "") + language.english_name;
  });
  movie.spoken_languages = spokenLanguages;

  let releaseDate = moment(movie.release_date, "YYYY-MM-DD").format(
    "DD/MM/YYYY"
  );
  movie.release_date = releaseDate;

  return movie;
}

function movieCard(movie) {
  return `
  <div class="card mb-3" role="button" data-bs-toggle="modal" data-bs-target="#modal-movie-detail">
    <div class="row g-0">
      <input type="hidden" name="movieId" value="${movie.id}">
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
  </div>`;
}

function tvShowCard(tvShow) {
  return `
  <div class="card mb-3" role="button" data-bs-toggle="modal" data-bs-target="#modal-tvshow-detail">
    <div class="row g-0">
    <input type="hidden" name="tvShowId" value="${tvShow.id}">
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
  </div>`;
}
