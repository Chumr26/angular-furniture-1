import { Component } from '@angular/core';
import { BannerComponent } from '../shared/banner/banner.component';
import { CategoryComponent } from '../shared/category/category.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { ProductsPageComponent } from './products-page/products-page.component';

@Component({
  selector: '[shop]',
  imports: [
    BannerComponent,
    CategoryComponent,
    FilterComponent,
    ProductsPageComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
}
