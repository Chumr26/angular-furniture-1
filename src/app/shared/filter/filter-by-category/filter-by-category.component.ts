import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: '[filter-by-category]',
  imports: [CommonModule],
  providers: [TitleCasePipe],
  templateUrl: './filter-by-category.component.html',
  styleUrl: './filter-by-category.component.css',
})
export class FilterByCategoryComponent {
  categories: string[] = [];
  categoryCounts: { [category: string]: number } = {};
  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.getCategories();
    this.categoryCounts = this.categoryService.getCategoryProductCounts();
  }
}
