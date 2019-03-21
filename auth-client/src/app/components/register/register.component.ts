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
  constructor(private authService: AuthService, private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerUser(this.registerUserData)
      .then(
        res => {
          this.router.navigate(['/special']);
        }
      );
  }

}
