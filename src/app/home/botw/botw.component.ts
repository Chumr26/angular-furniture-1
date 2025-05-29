import { Component, ViewEncapsulation } from '@angular/core';
import { ProductComponent } from '../../shared/product/product.component';
import { Product } from '../../models/app.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: '[botw]',
  imports: [ProductComponent],
  templateUrl: './botw.component.html',
  styleUrl: './botw.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BotwComponent {
  botwIds = ['1', '2', '3', '4', '5', '6', '7', '8'];
  botwProducts: Product[];
  constructor(private productService: ProductService) {
    this.botwProducts = this.productService.getProductsByIds(this.botwIds);
  }
}
