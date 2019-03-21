import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  state = {
    isRequesting: false
  };

  serverUrl = 'http://localhost:3000/api/';

  constructor() { }

  getServerUrl() {
    return this.serverUrl;
  }

}
