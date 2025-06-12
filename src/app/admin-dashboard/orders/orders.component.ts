import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, OrderDetails } from '../../services/order.service';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: OrderDetails[] = [];
  selectedOrder: OrderDetails = this.getEmptyOrder();

  get productsString(): string {
    const products: string[] = [];
    this.selectedOrder.cartItems?.forEach((item) => {
      products.push(`${item.productId}:${item.productCount}`);
    });
    return products.join(', ');
  }

  set productsString(value: string) {
    const productEntries = value.split(',').map((entry) => entry.trim());
    this.selectedOrder.cartItems = productEntries.map((entry) => {
      const [productId, productCount] = entry
        .split(':')
        .map((part) => part.trim());
      console.log({ productId, productCount });
      return { productId, productCount: Number(productCount) }; // Convert productCount to a number
    });
  }
  constructor(
    private orderService: OrderService,
    private fetcher: FetcherService
  ) {}

  ngOnInit(): void {
    // Fetch orders
    this.orderService.getOrderDetails().subscribe({
      next: (orders) => {
        this.orders = orders;
        console.log('Orders fetched successfully:', this.orders);
      },
      error: (error) => {
        console.error('Failed to fetch orders:', error);
      },
    });
  }

  getProductsString(order: OrderDetails): string {
    const products: string[] = [];
    order.cartItems?.forEach((item) => {
      products.push(`${item.productId}:${item.productCount}`);
    });
    return products.join(', ');
  }

  loadOrderDetails(order: OrderDetails): void {
    this.selectedOrder = { ...order };
  }

  deleteOrder(id: string): void {
    // this.orderService.deleteOrder(id)
    this.fetcher.delete(`orders/${id}`).subscribe({
      next: () => {
        console.log(`Order ${id} deleted successfully`);
        this.orders = this.orders.filter((order) => order.id !== id);
      },
      error: (error) => {
        console.error(`Error deleting order ${id}:`, error);
      },
    });
  }

  onSubmit(): void {
    if (this.selectedOrder.id) {
      // Update order
      const index = this.orders.findIndex(
        (o) => o.id === this.selectedOrder.id
      );
      if (index !== -1) {
        this.orders[index] = { ...this.selectedOrder };
        console.log('Order updated successfully:', this.selectedOrder);
      }
    } else {
      // Create new order
      const newOrder = {
        ...this.selectedOrder,
        id: `${this.orders.length + 1}`, // Simple ID generation
        dateTime: new Date().toISOString(),
      };
      this.orders.push(newOrder);
      console.log('Order created successfully:', newOrder);
    }
    this.resetForm();
  }

  resetForm(): void {
    this.selectedOrder = this.getEmptyOrder();
  }

  private getEmptyOrder(): OrderDetails {
    return {
      firstname: '',
      lastname: '',
      street: '',
      town: '',
      postcode: '',
      phone: '',
      email: '',
      additionalInfo: '',
      cartItems: [],
      totalPrice: 0,
      dateTime: '',
      id: '',
      userId: '',
    };
  }
}
