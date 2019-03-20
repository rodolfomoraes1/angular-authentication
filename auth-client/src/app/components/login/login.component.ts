import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() { }

  loginUser() {
    this._authService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('refresh-token', res.refreshToken);
          this._router.navigate(['/special']);
        },
        err => console.log(err)
      );
  }
}
