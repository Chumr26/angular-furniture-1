import { Component } from '@angular/core';
import { FilterByPriceComponent } from './filter-by-price/filter-by-price.component';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';

@Component({
  selector: '[filter]',
  imports: [FilterByPriceComponent, FilterByCategoryComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {}
