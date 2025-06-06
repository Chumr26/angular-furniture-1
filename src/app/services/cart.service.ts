import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: string;
  productCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  constructor() {}

  // Observable for components to subscribe to
  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  // Add or update a product in the cart
  addProduct(productId: string) {
    // Add new product
    this.cartItems.push({ productId, productCount: 1 });
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  updateProduct(productId: string, quantity: number) {
    const index = this.cartItems.findIndex(
      (item) => item.productId === productId
    );
    // Update product count
    this.cartItems[index].productCount += quantity;
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Remove a product from the cart
  removeProduct(productId: string) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Clear the cart
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }
}
