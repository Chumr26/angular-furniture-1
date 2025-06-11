import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FetcherService } from './fetcher.service';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private isActiveSubject = new BehaviorSubject<boolean>(false);
  private isSignUp = new BehaviorSubject<boolean>(false);
  users: User[] = []; // Placeholder for user data, replace with actual user model
  private currentUser = new BehaviorSubject<User | null>(this.getStoredUser()); // Initialize with user from localStorage
  private maxId = 0; // To keep track of the maximum ID for new users

  constructor(private fetcher: FetcherService, private router: Router) {
    this.initializeUsers(); // Initialize user list when the service is created
  }

  private initializeUsers(): void {
    this.fetcher.get<User[]>('accounts').subscribe((users) => {
      this.users = users;
      this.maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    });
  }

  private getStoredUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  private storeUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  toggleIsActive(): void {
    const currentState = this.isActiveSubject.value;
    this.isActiveSubject.next(!currentState);
  }

  getIsActive(): Observable<boolean> {
    return this.isActiveSubject.asObservable();
  }

  getisSignUp(): Observable<boolean> {
    return this.isSignUp.asObservable();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  login(email: string, password: string): boolean {
    if (email === 'admin' && password === 'admin') {
      window.location.href = '/dashboard'; // Redirect to the dashboard route using the browser object
      return true; // Login successful
    }

    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      this.toggleIsActive();
      this.currentUser.next(user);
      this.storeUser(user); // Store user in localStorage
      return true; // Login successful
    }
    return false; // Login failed
  }

  logout(): void {
    this.currentUser.next(null);
    this.storeUser(null); // Remove user from localStorage
    this.isActiveSubject.next(false);
  }

  signup(email: string, password: string): boolean {
    if (this.users.some((user) => user.email === email)) {
      return false; // Email already exists
    }
    const newUser: User = {
      id: this.maxId + 1, // Increment maxId for new user
      email,
      password,
    };
    this.fetcher.post('accounts', newUser).subscribe({
      next: (response) => {
        this.users.push(response); // Add new user to the local users array
        this.maxId++; // Update maxId if necessary
        this.storeUser(response); // Store new user in localStorage
        this.currentUser.next(response); // Set current user
      },
      error: (error) => {
        console.error('Error during signup:', error);
      },
    });
    return true; // Signup successful
  }
}
