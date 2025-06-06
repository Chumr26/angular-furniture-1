import { Component, ViewEncapsulation } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { FilterService } from '../../../services/filter.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/app.model';

@Component({
  selector: '[filter-by-brand]',
  imports: [CommonModule],
  templateUrl: './filter-by-brand.component.html',
  styleUrl: './filter-by-brand.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByBrandComponent {
  brands: string[] = [];

  constructor(
    private brandService: BrandService,
    private filterService: FilterService
  ) {
    this.brands = this.brandService.getBrands();
  }

  isBrandSelected(brand: string): boolean {
    return this.filterService.isFilterSelected(brand, 'brand');
  }

  onBrandSelect(brand: string, event: Event) {
    event.preventDefault();
    this.filterService.onFilterSelect(brand, 'brand');
  }
}
