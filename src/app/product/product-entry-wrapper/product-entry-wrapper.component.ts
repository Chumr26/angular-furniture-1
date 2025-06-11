import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../models/app.model';
import { BreadcrumsComponent } from '../../shared/breadcrums/breadcrums.component';
import { FetcherService } from '../../services/fetcher.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: '[product-entry-wrapper]',
  imports: [BreadcrumsComponent],
  templateUrl: './product-entry-wrapper.component.html',
  styleUrl: './product-entry-wrapper.component.css',
})
export class ProductEntryWrapperComponent {
  @Input() productData!: Product;
  @Input() breadcrumItems: string[] = [];
  img: string = '';

  constructor(
    private fetcherService: FetcherService,
    private cartService: CartService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productData'] && this.productData && this.productData.id) {
      this.fetcherService
        .get<{ id: string; data: string }>('product_imgs/' + this.productData.id)
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

  devideParagraph(text: string, length: number): string[] {
    const sentences = text.split('. ');
    const result: string[] = [];
    const paragraphLen = sentences.length / length;
    for (let i = 0; i < length; i++) {
      result.push(
        sentences.slice(i * paragraphLen, (i + 1) * paragraphLen).join('. ')
      );
    }
    return result;
  }

  addToCart(id: string) {
    this.cartService.addProduct(id);
  }

  isInCart(productId: string): boolean {
    return this.cartService.isInCart(productId);
  }
}
