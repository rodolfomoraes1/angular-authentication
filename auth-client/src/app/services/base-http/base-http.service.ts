import {HttpClient} from '@angular/common/http';
import {ApiService} from '../api/api.service';

export abstract class BaseHttpService <T> {

  constructor(public http: HttpClient, private serverUrl: string, private api: ApiService) { }

  post(url: string, body: any, errorHandler: any, options?: any): Promise<any> {
    this.api.state.isRequesting = true;
    return this.http.post(this.serverUrl + url, body, options)
      .toPromise()
      .then(response => {
        this.api.state.isRequesting = false;
        return response;
      }).catch(errorHandler);
  }

  put(url: string, body: any, errorHandler: any, options?: any): Promise<any> {
    this.api.state.isRequesting = true;
    return this.http.put(this.serverUrl, body, options)
      .toPromise()
      .then(response => {
        this.api.state.isRequesting = false;
        return response;
      }).catch(errorHandler);
  }

  delete(id: any, errorHandler: any, options?: any): Promise<any> {
    if (!id) {
      id = '';
    }

    this.api.state.isRequesting = true;
    return this.http.delete(this.serverUrl + id, options)
      .toPromise()
      .then(response => {
        this.api.state.isRequesting = false;
      }).catch(errorHandler);
  }

  get(url, errorHandler, id?: string, options?: any): Promise<any> {
    if (!id) {
      id = '';
    }
    this.api.state.isRequesting = true;
    return this.http.get(this.serverUrl + url + id, options)
      .toPromise()
      .then(response => {
        this.api.state.isRequesting = false;
        return response;
      })
      .catch(errorHandler);
  }

  patch(id: string, body: any, errorHandler: any, options?: any): Promise<any> {
    if (!id) {
      id = '';
    }
    this.api.state.isRequesting = true;
    return this.http.patch(this.serverUrl + id, body, options)
      .toPromise()
      .then(response => {
        this.api.state.isRequesting = false;
      }).catch(errorHandler);
  }
}
