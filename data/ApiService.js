export default class ApiService {
  static BASE_URL = "https://api.themoviedb.org/3/";
  static IMAGE_BASE_URL_500 = "https://image.tmdb.org/t/p/w500/";
  static API_KEY = "51a6c6939964995030fb073e1bc86edf";

  static getDiscoverMovies(page, onReady) {
    let path = "discover/movie";
    let params = `?page=${page}&api_key=${this.API_KEY}`;
    this.sendRequest(path + params, onReady);
  }

  static getDiscoverTVShows(page, onReady) {
    let path = "discover/tv";
    let params = `?page=${page}&api_key=${this.API_KEY}`;
    this.sendRequest(path + params, onReady);
  }

  static getMovieDetail(id, onReady) {
    let path = `movie/${id}`;
    let params = `?api_key=${this.API_KEY}`;
    this.sendRequest(path + params, onReady);
  }

  static getTvSeriesDetail(id, onReady) {
    let path = `tv/${id}`;
    let params = `?api_key=${this.API_KEY}`;
    this.sendRequest(path + params, onReady);
  }

  static sendRequest(endPoint, onReady) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        onReady(this.responseText);
      }
    };
    request.open("GET", this.BASE_URL + endPoint, true);
    request.send();
  }
}
