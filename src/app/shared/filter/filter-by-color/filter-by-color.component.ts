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
  selector: '[filter-by-color]',
  imports: [CommonModule],
  templateUrl: './filter-by-color.component.html',
  styleUrl: './filter-by-color.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByColorComponent {
  @Input() filterProduct: Product[] = [];
  swatchs: { [key: string]: string } = {
    Beige: 'c2b5ab',
    Black: '181818',
    Blue: '0791ba',
    Brown: '662f00',
    Gray: 'c9c9c9',
    Green: '6fa800',
    Orange: 'ff8412',
    White: 'f4f4f4',
    Yellow: 'f9cd0b',
  };

  colors: FilteredItem[] = [];

  constructor(private filterService: FilterService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterProduct'] && changes['filterProduct'].currentValue) {
      // update the colors list based on the filterProduct input
      this.colors = this.filterProduct.reduce(
        (acc: FilteredItem[], product) => {
          product.color.forEach((color) => {
            const existingColor = acc.find((c) => c.label === color);
            if (existingColor) {
              existingColor.count++;
            } else {
              acc.push({ label: color, count: 1 });
            }
          });
          return acc;
        },
        []
      );
    }
  }

  isColorSelected(colorLabel: string): boolean {
    return this.filterService.isFilterSelected(colorLabel, 'color');
  }

  onColorSelect(colorLabel: string, event: Event) {
    event.preventDefault(); // Prevent default anchor behavior
    this.filterService.onFilterSelect(colorLabel, 'color');
  }
}
