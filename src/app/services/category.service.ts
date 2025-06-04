import { Injectable } from '@angular/core';
import { ProductService } from './product.service'; // Import ProductService

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: string[] = [
    'armchairs',
    'chairs',
    'storage',
    'sofas',
    'decor',
    'tables',
    'beds',
  ];

  categoryCounts: { [category: string]: number } = {};

  constructor(private productService: ProductService) {} // Inject ProductService

  getCategories(): string[] {
    return this.categories;
  }

  getCategoryProductCounts(): { [category: string]: number } {
    this.categories.forEach((category) => {
      this.categoryCounts[category] =
        this.productService.getProductsByCategory(category).length;
    });
    return this.categoryCounts;
  }
}
