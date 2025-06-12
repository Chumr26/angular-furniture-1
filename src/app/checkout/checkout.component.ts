import { Component, ViewEncapsulation } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FetcherService } from '../services/fetcher.service';
import { Product } from '../models/app.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetails, OrderService } from '../services/order.service';

@Component({
  selector: 'checkout',
  imports: [CartItemComponent, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  products: Product[] = [];
  errors: string[] = [];

  currentOrder: OrderDetails = {
    firstname: '',
    lastname: '',
    street: '',
    town: '',
    postcode: '',
    phone: '',
    email: '',
    additionalInfo: '',
  };

  billingAddress1: string = '';
  billingAddress2: string = '';

  constructor(
    private cartService: CartService,
    private fetcher: FetcherService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;

      this.cartItems.forEach((item) => {
        this.fetcher
          .get<Product>('products/' + item.productId)
          .subscribe((product) => {
            this.products.push(product);
          });
      });
    });
  }

  updateStreet(): void {
    this.currentOrder.street =
      `${this.billingAddress2} ${this.billingAddress1}`.trim();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const product = this.products.find((p) => p.id === item.productId);
      return (
        total +
        (product
          ? (product.price -
              (product.price * product.discount_percentage) / 100) *
            item.productCount
          : 0)
      );
    }, 0);
  }

  validate() {
    this.errors = [];
    if (!this.currentOrder.firstname) {
      this.errors.push('billing_first_name');
    }
    if (!this.currentOrder.lastname) {
      this.errors.push('billing_last_name');
    }

    if (!this.currentOrder.street) {
      this.errors.push('billing_street');
    }
    if (!this.currentOrder.town) {
      this.errors.push('billing_town');
    }
    if (!this.currentOrder.postcode) {
      this.errors.push('billing_postcode');
    }
    if (!this.currentOrder.phone) {
      this.errors.push('billing_phone');
    }
    if (!this.currentOrder.email) {
      this.errors.push('billing_email');
    }
    if (this.errors.length > 0) {
      return false;
    }
    return true;
  }

  handleSubmit(): void {
    // for each field, check if it is error, if it is, add to errors array
    if (!this.validate()) {
      window.scrollTo(0, 0);
      return;
    }

    this.orderService.addOrderDetails({
      ...this.currentOrder,
      cartItems: this.cartItems,
      totalPrice: this.getTotalPrice(),
    });

    this.resetForm();
  }

  resetForm(): void {
    this.currentOrder = {
      firstname: '',
      lastname: '',
      street: '',
      town: '',
      postcode: '',
      phone: '',
      email: '',
      additionalInfo: '',
    };
    this.billingAddress1 = '';
    this.billingAddress2 = '';
    this.cartService.clearCart();
    this.cartItems = [];
    this.products = [];
    this.errors = [];
    window.scrollTo(0, 0);
  }
}
