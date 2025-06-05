import { Component, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/app.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: '[best-selling]',
  imports: [],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BestSellingComponent {
  productIds: string[] = ['45', '44', '43', '42', '41'];
  products: Product[] = [];
  constructor(private productService: ProductService) {
    this.productIds.forEach((id) => {
      const product = this.productService.getProductById(id);
      if (product) {
        this.products.push(product);
      }
    });
  }
}
