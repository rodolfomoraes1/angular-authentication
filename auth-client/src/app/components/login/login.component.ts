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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  loginUser() {
    this.authService.loginUser(this.loginUserData)
      .then(
        res => {
          this.router.navigate(['/special']);
        }
      );
  }
}
