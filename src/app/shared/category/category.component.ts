import { Component, ViewEncapsulation } from '@angular/core';
// import { CategoryService } from '../../services/category.service';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: '[category]',
  imports: [CommonModule],
  providers: [TitleCasePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CategoryComponent {
  categories: string[] = [];
  categoryCounts: { [category: string]: number } = {};
//   constructor(private categoryService: CategoryService) {
//     this.categories = this.categoryService.getCategories();
//     this.categoryCounts = this.categoryService.getCategoryProductCounts();
//   }
}
