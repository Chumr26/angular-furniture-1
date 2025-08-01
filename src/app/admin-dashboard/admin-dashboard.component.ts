import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  // Placeholder properties for sections
  sections = ['Users', 'Orders', 'Products'];
}
