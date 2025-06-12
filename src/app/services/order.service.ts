import { Injectable } from '@angular/core';
import { FetcherService } from './fetcher.service';
import { CartItem } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { AccountService, User } from './account.service';

export interface OrderDetails {
  firstname: string;
  lastname: string;
  street: string;
  town: string;
  postcode: string;
  phone: string;
  email: string;
  additionalInfo?: string;
  cartItems?: CartItem[];
  totalPrice?: number;
  dateTime?: string;
  id?: string;
  userId?: string; // Optional user ID if the order is linked to a user
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderDetails = new BehaviorSubject<OrderDetails[]>([]);
  //   get max ID from the order details
  private maxId = this.orderDetails.value.reduce(
    (max, order) => Math.max(max, Number(order.id)),
    0
  );
  private currentUser: User | undefined;
  constructor(
    private fetcher: FetcherService,
    private accountService: AccountService
  ) {
    this.accountService.getCurrentUser().subscribe((user) => {
      this.currentUser = user || undefined;
    });

    this.fetcher.get<OrderDetails[]>('orders').subscribe({
      next: (orders) => {
        this.orderDetails.next(orders);
        // Update maxId based on fetched orders
        this.maxId = orders.reduce(
          (max, order) => Math.max(max, Number(order.id)),
          0
        );
        console.log('Orders fetched successfully:', orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  getOrderDetails() {
    return this.orderDetails.asObservable();
  }

  addOrderDetails(details: OrderDetails) {
    const currentOrders = this.orderDetails.value;
    const newOrder = {
      ...details,
      dateTime: new Date().toISOString(),
      id: `${++this.maxId}`, // Increment maxId for new order
      userId: this.currentUser?.id || undefined, // Link order to current user if available
    };
    this.fetcher.post('orders', newOrder).subscribe({
      next: (response) => {
        console.log('Order saved successfully:', response);
        this.orderDetails.next([...currentOrders, response]);
      },
      error: (error) => {
        console.error('Error saving order:', error);
      },
    });
  }

  deleteOrder(id: string) {
    const currentOrders = this.orderDetails.value;
    this.fetcher.delete(`orders/${id}`).subscribe({
      next: () => {
        console.log(`Order ${id} deleted successfully`);
        this.orderDetails.next(
          currentOrders.filter((order) => order.id !== id)
        );
      },
      error: (error) => {
        console.error(`Error deleting order ${id}:`, error);
      },
    });
  }
}
