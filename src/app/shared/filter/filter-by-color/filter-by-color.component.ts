import { Component, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: '[filter-by-color]',
  imports: [],
  templateUrl: './filter-by-color.component.html',
  styleUrl: './filter-by-color.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByColorComponent {
  colors = [
    { label: 'Beige', swatch: 'c2b5ab', count: 0 },
    { label: 'Black', swatch: '181818', count: 0 },
    { label: 'Blue', swatch: '0791ba', count: 0 },
    { label: 'Brown', swatch: '662f00', count: 0 },
    { label: 'Gray', swatch: 'c9c9c9', count: 0 },
    { label: 'Green', swatch: '6fa800', count: 0 },
    { label: 'Orange', swatch: 'ff8412', count: 0 },
    { label: 'White', swatch: 'f4f4f4', count: 0 },
    { label: 'Yellow', swatch: 'f9cd0b', count: 0 },
  ];
  constructor(private productService: ProductService) {
    this.colors.forEach((color) => {
      color.count = this.productService.getProductsByColor(color.label).length;
    });
  }
}
