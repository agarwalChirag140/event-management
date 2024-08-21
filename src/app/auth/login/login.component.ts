import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  loginFormValidation: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  creatAccount() {
      this.router.navigate(['/register']);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value
      const isLoggedIn = this.authservice.login(email, password)
      if(isLoggedIn) {
         this.router.navigate(['events'])
      } else {
        alert('Login failed. Please check your credentials.');
      }
    }
  }
}

