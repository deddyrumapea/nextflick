import ApiService from "./ApiService.js";

export default class ApiTmdb {
  static BASE_URL = "https://api.themoviedb.org/3/";
  static IMAGE_BASE_URL_500 = "https://image.tmdb.org/t/p/w500/";
  static API_KEY = "51a6c6939964995030fb073e1bc86edf";

  static getDiscoverMovies(page, onReady) {
    let path = "discover/movie";
    let params = `?page=${page}&api_key=${this.API_KEY}`;
    ApiService.sendRequest(this.BASE_URL + path + params, onReady);
  }

  static getDiscoverTVShows(page, onReady) {
    let path = "discover/tv";
    let params = `?page=${page}&api_key=${this.API_KEY}`;
    ApiService.sendRequest(this.BASE_URL + path + params, onReady);
  }

  static getMovieDetail(id, onReady) {
    let path = `movie/${id}`;
    let params = `?api_key=${this.API_KEY}`;
    ApiService.sendRequest(this.BASE_URL + path + params, onReady);
  }

  static getTvSeriesDetail(id, onReady) {
    let path = `tv/${id}`;
    let params = `?api_key=${this.API_KEY}`;
    ApiService.sendRequest(this.BASE_URL + path + params, onReady);
  }

  static searchMovies(query, onReady) {
    let path = "search/movie";
    let params = `?query=${query}&api_key=${this.API_KEY}`;
    ApiService.sendRequest(this.BASE_URL + path + params, onReady);
  }

  static searchTvShows(query, onReady) {
    let path = "search/tv";
    let params = `?query=${query}&api_key=${this.API_KEY}`;
    ApiService.sendRequest(this.BASE_URL + path + params, onReady);
  }
}
