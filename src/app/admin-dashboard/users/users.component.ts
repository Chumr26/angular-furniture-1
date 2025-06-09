import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Moderator' }
  ];

  editUser(user: any) {
    console.log('Edit user:', user);
  }
}
