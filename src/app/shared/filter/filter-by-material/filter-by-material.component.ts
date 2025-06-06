import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../../services/filter.service';
import { FilteredItem, Product } from '../../../models/app.model';

@Component({
  selector: '[filter-by-material]',
  imports: [CommonModule],
  templateUrl: './filter-by-material.component.html',
  styleUrl: './filter-by-material.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByMaterialComponent {
  @Input() filterProduct: Product[] = [];
  materials: FilteredItem[] = [];

  constructor(private filterService: FilterService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterProduct'] && changes['filterProduct'].currentValue) {
      // update the materials list based on the filterProduct input
      this.materials = this.filterProduct.reduce(
        (acc: FilteredItem[], product) => {
          product.material.forEach((material) => {
            const existingMaterial = acc.find((m) => m.label === material);
            if (existingMaterial) {
              existingMaterial.count++;
            } else {
              acc.push({ label: material, count: 1 });
            }
          });
          return acc;
        },
        []
      );
    }
  }

  isMaterialSelected(materialLabel: string): boolean {
    return this.filterService.isFilterSelected(materialLabel, 'material');
  }

  onMaterialSelect(materialLabel: string) {
    this.filterService.onFilterSelect(materialLabel, 'material');
  }
}
