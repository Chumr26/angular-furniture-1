import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { AccountService, User } from '../../services/account.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = {
    id: '',
    email: '',
    password: '',
    role: 'user',
  };

  constructor(
    private fetcherService: FetcherService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Fetch users
    this.accountService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
      },
    });
  }

  loadUserDetails(user: User): void {
    this.selectedUser = { ...user };
  }

  deleteUser(userId: string): void {
    this.fetcherService.delete(`accounts/${userId}`).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.accountService.setUsers(this.users); // Update the users in the service
        console.log('User deleted successfully');
      },
      error: (error) => {
        console.error('Failed to delete user:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.selectedUser.id) {
      // Update user
      this.fetcherService
        .put<User>(`accounts/${this.selectedUser.id}`, this.selectedUser)
        .subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex((u) => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
              this.accountService.setUsers(this.users);
            }
            console.log('User updated successfully:', updatedUser);
          },
          error: (error) => {
            console.error('Failed to update user:', error);
          },
        });
    } else {
      // Create new user
      const signupSuccess = this.accountService.signup(
        this.selectedUser.email,
        this.selectedUser.password,
        this.selectedUser.role
      );
      if (signupSuccess) {
        console.log('User signed up successfully');
      } else {
        console.error('Signup failed: Email already exists');
      }
    }
    this.resetForm();
  }

  resetForm(): void {
    this.selectedUser = {
      id: '',
      email: '',
      password: '',
      role: 'user',
    };
  }
}
