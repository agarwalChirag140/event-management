import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInKey = 'isLoggedIn';
  private userKey = 'user';

  constructor() {}

  private loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn());


  // Register a new user
  register(name: string, email: string, password: string): boolean {
    // Here we store user info in sessionStorage for demo purposes
    const user = { name, email, password };
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    return true; // Indicating the registration was successful
  }

  // Log in an existing user
  login(email: string, password: string): boolean {
    const storedUser = sessionStorage.getItem(this.userKey);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        this.loggedInStatus.next(true)
        sessionStorage.setItem(this.loggedInKey, 'true');
        return true; // Indicating login was successful
      }
    }
    return false; // Login failed
  }

  // Log out the user
  logout(): void {
    this.loggedInStatus.next(false)
    sessionStorage.removeItem(this.loggedInKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const isBrowser = typeof window !== 'undefined';
    const isLoggedIn = isBrowser ? sessionStorage.getItem(this.loggedInKey) : null;
    return isLoggedIn === 'true' ? true : false;
  }

  getLoggedInStatus() {
    return this.loggedInStatus.asObservable();
  }
}
