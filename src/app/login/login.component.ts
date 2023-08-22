import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private auth: AuthService ,  @Inject(DOCUMENT) public document: Document,private router: Router) { }
  

  // login() {
  //   this.auth.loginWithRedirect();
   
  // }


}
