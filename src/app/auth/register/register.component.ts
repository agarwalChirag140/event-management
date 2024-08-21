import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  moveToLogin() {
    this.router.navigate(['login']);
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password} = this.registerForm.value
      const isRegistered = this.authservice.register(name, email, password)
      if(isRegistered) {
        this.router.navigate(['/login']);
      } else {
        alert('Registration failed')
      }
    }
  }
}

