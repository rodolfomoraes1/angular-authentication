import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router) { }

  intercept(req, next) {

    req = this.buildHeaders(req);

    if (req.url.includes('refresh-token')) {
      req = this.buildRefreshTokenHeaders(req);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.handleUnathorizedErrors(error.error);
        }

        return next.handle(req).pipe(
          catchError((error) => {
            if (error.status === 401) {
              this.handleUnathorizedErrors(error.error);
            }
            return throwError(error);
          })
        );
        return throwError(error);
      })
    );
  }

  buildHeaders(req) {
    const token = this._authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return req;
  }

  buildRefreshTokenHeaders(req) {
    const refreshToken = this._authService.getRefreshToken();

    if (refreshToken) {
      req = req.clone({
        setHeaders: {
          RefreshAuthorization: `Bearer ${refreshToken}`
        }
      });
    }
    return req;
  }

  handleUnathorizedErrors(errorMessage) {
    switch (errorMessage) {
      case 'Invalid email':
        console.log('Invalid email error');
        break;
      case 'Invalid password':
        console.log('Invalid password error');
        break;
      case 'Unathorized request':
        console.log('Unathorized request error');
        this._authService.logoutUser();
        break;
      case 'Token is expired':
        this._authService.refreshAuthToken()
          .then(
            res => {
              console.log(res);
              localStorage.setItem('token', res.token);
              localStorage.setItem('refresh-token', res.refreshToken);
              this._router.navigate(['/special']);
              return;
            },
            err => console.log(err)
          );

        console.log('Token is expired error');
        break;
      default:
        console.log('Unathorized unknown error');
        this._authService.logoutUser();
        break;
    }
  }
}
