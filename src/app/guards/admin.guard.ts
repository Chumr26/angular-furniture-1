import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = this.checkIfAdmin(); // Replace with your actual admin check logic
    console.log('checkIfAdmin: ', isAdmin);
    if (!isAdmin) {
      window.location.href = '/'; // Hard redirect to home and reload the page
      return false;
    }
    return true;
  }

  private checkIfAdmin(): boolean {
    // Replace this with your actual logic to check if the user is an admin
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === 'admin';
  }
}
