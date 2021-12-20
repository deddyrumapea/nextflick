import ApiService from "./ApiService.js";

export default class ApiUnsplash {
  static BASE_URL = "https://api.unsplash.com/";
  static CLIENT_ID = "dZNHTKQH6NZZdKPtpSxI18wMrGRkisHWD_mhPlc4rrE";

  static getPhotos(query, onReady) {
    let path = "search/photos/";
    let params = `?query=${query}&client_id=${this.CLIENT_ID}`;
    let url = this.BASE_URL + path + params;
    ApiService.sendRequest(url, onReady);
  }
}
