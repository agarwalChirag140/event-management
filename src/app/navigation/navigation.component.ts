import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  loggedInStatus: boolean = false

  constructor(private router: Router, private authservice: AuthService) { }

  navigateToProfile() {
    this.router.navigate(['/events']);
  }

  ngOnInit() {
    this.checkLoginStatus()
  }

  checkLoginStatus() {
    this.authservice.getLoggedInStatus().subscribe((res:any) => {
      this.loggedInStatus = res
    })
  }

  logout() {
    // Clear user session or authentication token here
    // Example: sessionStorage.removeItem('authToken');

    // Redirect to login page or home page
    this.authservice.logout()
    this.router.navigate(['/login']);
  }
}
