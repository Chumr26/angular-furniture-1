import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders = [
    { id: 1, customer: 'John Doe', total: 100, status: 'Pending' },
    { id: 2, customer: 'Jane Smith', total: 200, status: 'Completed' },
    { id: 3, customer: 'Alice Johnson', total: 150, status: 'Shipped' }
  ];

  viewDetails(orderId: number): void {
    console.log(`Viewing details for order ID: ${orderId}`);
  }
}
