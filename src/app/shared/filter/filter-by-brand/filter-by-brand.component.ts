import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FilteredItem, Product } from '../../../models/app.model';

@Component({
  selector: '[filter-by-brand]',
  imports: [CommonModule],
  templateUrl: './filter-by-brand.component.html',
  styleUrl: './filter-by-brand.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByBrandComponent {
  @Input() filterProduct: Product[] = [];
  brands: string[] = [];

  constructor(private filterService: FilterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterProduct']) {
      this.brands = this.filterProduct.map((product) => product.brand);
    }
  }

  isBrandSelected(brand: string): boolean {
    return this.filterService.isFilterSelected(brand, 'brand');
  }

  onBrandSelect(brand: string, event: Event) {
    event.preventDefault();
    this.filterService.onFilterSelect(brand, 'brand');
  }
}
