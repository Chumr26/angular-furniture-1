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
  cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private isActiveSubject = new BehaviorSubject<boolean>(false);
  private showEmptyCartAlert = new BehaviorSubject<boolean>(false);
  constructor() {}

  // Observable for components to subscribe to
  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }
  getIsActive() {
    return this.isActiveSubject.asObservable();
  }
  toggleIsActive() {
    this.isActiveSubject.next(!this.isActiveSubject.value);
  }

  // Add or update a product in the cart
  addProduct(productId: string) {
    // Add new product
    this.cartItems.push({ productId, productCount: 1 });
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Increment product count in the cart
  incrementProduct(index: number) {
    this.cartItems[index].productCount += 1;
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // Decrement product count in the cart
  decrementProduct(index: number) {
    this.cartItems[index].productCount -= 1;
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateProduct(index: number, quantity: number) {
    // Update product count
    this.cartItems[index].productCount = quantity;
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Remove a product from the cart
  removeProduct(index: number) {
    this.cartItems = this.cartItems.filter((item, i) => i !== index);
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Clear the cart
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  setShowEmptyCartAlert(value: boolean) {
    this.showEmptyCartAlert.next(value);
  }

  getShowEmptyCartAlert() {
    return this.showEmptyCartAlert.asObservable();
  }
}
