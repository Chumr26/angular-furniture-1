import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../models/app.model';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: '[product]',
  imports: [RouterLink, CommonModule, CartButtonsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) productData!: Product;
  cartItems: CartItem[] = [];
  img: string = '';

  constructor(
    private cartService: CartService,
    private fetcherService: FetcherService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productData'] && this.productData && this.productData.id) {
      this.fetcherService
        .get<{ id: string; data: string }>(
          'product_imgs/' + this.productData.id
        )
        .subscribe({
          next: (image) => {
            this.img = image.data;
          },
          error: (error) => {
            console.error('Failed to fetch product images:', error);
          },
        });
    }
  }

  addToCart(id: string, event: Event) {
    event.preventDefault();
    this.cartService.addProduct(id);
  }

  isInCart(productId: string): boolean {
    return this.cartItems.some((item) => item.productId === productId);
  }

  getProductSlug(name: string): string {
    return name.toLowerCase().replace(/ /g, '-');
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
