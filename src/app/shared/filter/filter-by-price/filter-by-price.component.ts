import { Component, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[filter-by-price]',
  imports: [FormsModule],
  templateUrl: './filter-by-price.component.html',
  styleUrl: './filter-by-price.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByPriceComponent {
  minPrice: number = 0;
  maxPrice: number = 0;
  currentminPrice: number = 0;
  currentmaxPrice: number = 0;
  constructor(private productService: ProductService) {
    const prices = this.productService
      .getProducts()
      .map((product) => product.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.currentmaxPrice = this.maxPrice;
    this.currentminPrice = this.minPrice;
  }
}
