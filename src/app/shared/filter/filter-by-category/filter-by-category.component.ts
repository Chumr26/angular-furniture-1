import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FilterService } from '../../../services/filter.service';
import { FilteredItem, Product } from '../../../models/app.model';

@Component({
  selector: '[filter-by-category]',
  imports: [CommonModule],
  providers: [TitleCasePipe],
  templateUrl: './filter-by-category.component.html',
  styleUrl: './filter-by-category.component.css',
})
export class FilterByCategoryComponent {
  @Input() filterProduct: Product[] = [];
  categories: FilteredItem[] = [];

  constructor(private filterService: FilterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterProduct']) {
      this.categories = this.filterProduct.reduce(
        (acc: FilteredItem[], product) => {
          product.category.forEach((category) => {
            const existingCategory = acc.find((c) => c.label === category);
            if (existingCategory) {
              existingCategory.count++;
            } else {
              acc.push({ label: category, count: 1 });
            }
          });
          return acc;
        },
        []
      );
    }
  }

  isCategorySelected(categoryLabel: string): boolean {
    return this.filterService.isFilterSelected(categoryLabel, 'category');
  }

  onCategorySelect(categoryLabel: string) {
    this.filterService.onFilterSelect(categoryLabel, 'category');
  }
}
