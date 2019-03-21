import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BaseHttpService} from '../base-http/base-http.service';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService<any> {

  private registerUrl = 'register/';
  private loginUrl = 'login/';
  private refreshToken = 'refreshToken/';

  constructor(public http: HttpClient, api: ApiService, private router: Router) {
    super(http, api.getServerUrl(), api);
  }

  registerUser(user) {
    return this.post(this.registerUrl, user, this.handleError).then(
      res => {
        this.storeTokens(res.token, res.refreshToken);
      }, err => {
        console.error(`Error to register user! ${err}`);
      }
    );
  }

  loginUser(user) {
    return this.post(this.loginUrl, user, this.handleError).then(
      res => {
        this.storeTokens(res.token, res.refreshToken);
      }, err => {
        console.error(`Error to login user! ${err}`);
      }
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.router.navigate(['/login']);
  }

  refreshAuthToken() {
    return this.get(this.refreshToken, this.handleError);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  storeTokens(token, refreshToken) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh-token', refreshToken);
  }

  protected handleError(error: any): Promise<any> {
    console.error(`Auth service error: ${error.message}`);
    return Promise.reject(error.message || error);
  }
}
