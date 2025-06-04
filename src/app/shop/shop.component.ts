import { Component } from '@angular/core';
import { BannerComponent } from '../shared/banner/banner.component';
import { CategoryComponent } from '../shared/category/category.component';
import { FilterComponent } from '../shared/filter/filter.component';

@Component({
  selector: '[shop]',
  imports: [BannerComponent, CategoryComponent, FilterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
