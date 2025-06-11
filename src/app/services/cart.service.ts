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
  private cartItems: CartItem[] = this.loadCartItemsFromStorage();
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private isActiveSubject = new BehaviorSubject<boolean>(false);
  private showEmptyCartAlert = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Load cart items from localStorage
  private loadCartItemsFromStorage(): CartItem[] {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // Save cart items to localStorage
  private saveCartItemsToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

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
    this.cartItems.push({ productId, productCount: 1 });
    this.saveCartItemsToStorage(); // Persist changes
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Increment product count in the cart
  incrementProduct(index: number) {
    this.cartItems[index].productCount += 1;
    this.saveCartItemsToStorage(); // Persist changes
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // Decrement product count in the cart
  decrementProduct(index: number) {
    this.cartItems[index].productCount -= 1;
    this.saveCartItemsToStorage(); // Persist changes
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateProduct(index: number, quantity: number) {
    this.cartItems[index].productCount = quantity;
    this.saveCartItemsToStorage(); // Persist changes
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  // Remove a product from the cart
  removeProduct(index: number) {
    this.cartItems = this.cartItems.filter((item, i) => i !== index);
    this.saveCartItemsToStorage(); // Persist changes
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  isInCart(productId: string): boolean {
    return this.cartItems.some((item) => item.productId === productId);
  }

  // Clear the cart
  clearCart() {
    this.cartItems = [];
    this.saveCartItemsToStorage(); // Persist changes
    this.cartItemsSubject.next([...this.cartItems]); // Notify subscribers
  }

  setShowEmptyCartAlert(value: boolean) {
    this.showEmptyCartAlert.next(value);
  }

  getShowEmptyCartAlert() {
    return this.showEmptyCartAlert.asObservable();
  }
}
