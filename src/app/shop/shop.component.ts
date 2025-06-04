import { Component } from '@angular/core';
import { BannerComponent } from '../shared/banner/banner.component';
import { CategoryComponent } from '../shared/category/category.component';

@Component({
  selector: '[shop]',
  imports: [BannerComponent, CategoryComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
