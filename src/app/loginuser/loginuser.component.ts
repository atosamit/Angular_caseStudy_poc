import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, FormControlName, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent {
  loginForm!: FormGroup;
  hideHeader: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const api = 'https://contentmanagement-7iyh.onrender.com/api/login';
      
      this.http.post(api, formData).subscribe(
        (response: any) => {
          // console.log(formData);
          // console.log(response);
          console.log(response.response.token);
          console.log('POST request success:', response);
         if (response.response.token) { 
           //sessionStorage.setItem('isAuthenticate', 'true');
           this.router.navigate(['/grid-page']);
            window.location.reload();
          }
        },
        (error) => {
          console.error('POST request error:', error);
        }
      );
    }
  }
  // ........................................................
}
