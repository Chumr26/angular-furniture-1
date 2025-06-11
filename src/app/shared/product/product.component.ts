import { Component, Input } from '@angular/core';
import { Product } from '../../models/app.model';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: '[product]',
  imports: [RouterLink, CommonModule, CartButtonsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) productData!: Product;
  slug: string = '';
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.slug = this.productData.name.toLowerCase().replace(/ /g, '-');
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }
  addToCart(id: string, event: Event) {
    event.preventDefault();
    this.cartService.addProduct(id);
  }

  isInCart(productId: string): boolean {
    return this.cartItems.some((item) => item.productId === productId);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
