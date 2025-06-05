import { Component, ViewEncapsulation } from '@angular/core';
import { count } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: '[filter-by-material]',
  imports: [],
  templateUrl: './filter-by-material.component.html',
  styleUrl: './filter-by-material.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByMaterialComponent {
  materials = [
    { label: 'Aluminium', count: 0 },
    { label: 'Fabric', count: 0 },
    { label: 'Glass', count: 0 },
    { label: 'Leather', count: 0 },
    { label: 'Marble', count: 0 },
    { label: 'Metal', count: 0 },
    { label: 'Plastic', count: 0 },
    { label: 'Wood', count: 0 },
  ];

  constructor(private productService: ProductService) {
    this.materials.forEach((material) => {
      material.count = this.productService.getProductsByMaterial(
        material.label
      ).length;
    });
  }
}
