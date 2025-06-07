import { Component, ViewEncapsulation } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { Product } from '../../models/app.model';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[cart]',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
  cartProducts: Product[] = [];
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartProducts = cartItems.map(
        (item) => this.productService.getProductById(item.productId)!
      );
      this.cartItems = this.cartService.cartItems;
    });
  }

  toggleCart() {
    this.cartService.toggleIsActive();
  }

  removeFromCart(index: number, event: Event) {
    event.preventDefault();
    this.cartService.removeProduct(index);
  }

  incrementProduct(index: number) {
    this.cartService.incrementProduct(index);
  }

  decrementProduct(index: number) {
    this.cartService.decrementProduct(index);
  }

  validateQuantity(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Remove leading zeros
    const sanitizedValue = parseInt(inputElement.value, 10);

    // Ensure the value is at least 1
    if (sanitizedValue < 1 || isNaN(sanitizedValue)) {
      this.cartService.updateProduct(index, 1); // Reset to minimum value
    } else {
      this.cartService.updateProduct(index, sanitizedValue);
    }
    inputElement.value = sanitizedValue.toString(); // Update the input box value
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce((total, product, index) => {
      const item = this.cartItems[index];
      return total + product.price * item.productCount;
    }, 0);
  }
}
