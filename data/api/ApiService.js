export default class ApiService {
  static sendRequest(url, onReady) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        onReady(this.responseText);
      }
    };
    request.open("GET", url, true);
    request.send();
  }
}
