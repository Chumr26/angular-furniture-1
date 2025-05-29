import { Component, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/app.model';
import { ProductComponent } from '../../shared/product/product.component';

@Component({
  selector: '[top-selling]',
  imports: [ProductComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TopSellingComponent {
  topSellingIds = ['27', '30', '28', '29'];
  topSellingProducts: Product[];
  constructor(private productService: ProductService) {
    this.topSellingProducts = this.productService.getProductsByIds(
      this.topSellingIds
    );
  }
}
