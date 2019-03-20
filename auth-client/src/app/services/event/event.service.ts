import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventsUrl = 'http://localhost:3000/api/events'
  specialUrl = 'http://localhost:3000/api/special'

  // eventsUrl = 'events'
  // specialUrl = 'special'
  // url = 'http://localhost:3000/api';

  // constructor(url: string, http: HttpClient) {
  //   super('http://localhost:3000/api', http);
  // }

  constructor(private _http: HttpClient) { }

  getEvents() {
    // return this.get(this.eventsUrl);

    return this._http.get<any>(this.eventsUrl)
      .toPromise()
      .then(response => {
        return response;
      }).catch();
  }

  getSpecialEvents() {
    // return this.get(this.specialUrl);

    return this._http.get<any>(this.specialUrl)
      .toPromise()
      .then(response => {
        return response;
      }).catch();
  }
}
