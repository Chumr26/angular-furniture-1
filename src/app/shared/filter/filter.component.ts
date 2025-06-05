import { Component } from '@angular/core';
import { FilterByPriceComponent } from './filter-by-price/filter-by-price.component';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';
import { FilterByColorComponent } from './filter-by-color/filter-by-color.component';
import { FilterByMaterialComponent } from './filter-by-material/filter-by-material.component';
import { FilterByBrandComponent } from './filter-by-brand/filter-by-brand.component';
import { BestSellingComponent } from './best-selling/best-selling.component';

@Component({
  selector: '[filter]',
  standalone: true,
  imports: [
    FilterByPriceComponent,
    FilterByCategoryComponent,
    FilterByColorComponent,
    FilterByMaterialComponent,
    FilterByBrandComponent,
    BestSellingComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {}
