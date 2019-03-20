import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};
  constructor(private _authService: AuthService,
              private _router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this._authService.registerUser(this.registerUserData)
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
