import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail : string;
  userPassword : string;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {

  }

  login(){
    this.authService.validate(this.userEmail, this.userPassword)
        .then((response) => {
            console.log(response)
          this.authService.setUserInfo({'user' : response['user']});
          this.router.navigate(['home']);

        })
  }

}
