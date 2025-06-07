import { Component, ViewEncapsulation } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { Product } from '../models/app.model';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[cart]',
  imports: [FormsModule, RouterLink],
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
    console.log('object');
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.cartProducts = this.cartItems.map(
        (item) => this.productService.getProductById(item.productId)!
      );
    });
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

  removeFromCart(index: number, event: Event) {
    event.preventDefault();
    this.cartService.removeProduct(index);
  }

  productSubtotal(index: number): number {
    const product = this.cartProducts[index];
    const item = this.cartItems[index];
    return product
      ? (product.price - (product.price * product.discount_percentage) / 100) *
          item.productCount
      : 0;
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce((total, product, index) => {
      const item = this.cartItems[index];
      return (
        total +
        (product.price - (product.price * product.discount_percentage) / 100) *
          item.productCount
      );
    }, 0);
  }
}
