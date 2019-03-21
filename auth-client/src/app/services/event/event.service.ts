import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseHttpService} from '../base-http/base-http.service';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseHttpService<any> {

  private eventsUrl = 'events/'
  private specialUrl = 'special/'

  constructor(public http: HttpClient, api: ApiService) {
    super(http, api.getServerUrl(), api);
  }

  getEvents() {
    return this.get(this.eventsUrl, this.handleError);
  }

  getSpecialEvents() {
    return this.get(this.specialUrl, this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error(`Events service error: ${error.message}`);
    return Promise.reject(error.message || error);
  }
}
