import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient ,  @Inject(DOCUMENT) public document: Document,private router: Router) { }
  

  // login() {
  //   this.auth.loginWithRedirect();
   
  // }


}
