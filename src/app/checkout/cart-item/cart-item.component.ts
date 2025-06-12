import { Component, Input } from '@angular/core';
import { Product } from '../../models/app.model';
import { FetcherService } from '../../services/fetcher.service';
import { forkJoin } from 'rxjs';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: '[cart-item]',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input({ required: true }) cartIem: CartItem | undefined;
  product: Product | undefined;
  img = '';
  constructor(private fetcher: FetcherService) {}

  ngOnInit() {
    forkJoin([
      this.fetcher.get<Product>('products/' + this.cartIem?.productId),
      this.fetcher.get<{ id: string; data: string }>(
        'product_imgs/' + this.cartIem?.productId
      ),
    ]).subscribe({
      next: ([product, images]) => {
        this.product = product;
        this.img = images.data; // Assuming 'data' contains the image URL
      },
      error: (error) => {
        console.error('Failed to fetch products or images:', error);
      },
    });
  }
}
