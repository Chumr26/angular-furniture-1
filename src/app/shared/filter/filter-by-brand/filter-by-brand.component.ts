import { Component, ViewEncapsulation } from '@angular/core';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: '[filter-by-brand]',
  imports: [],
  templateUrl: './filter-by-brand.component.html',
  styleUrl: './filter-by-brand.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByBrandComponent {
  brands: string[] = [];

  constructor(private brandService: BrandService) {
    this.brands = this.brandService.getBrands();
  }
}
