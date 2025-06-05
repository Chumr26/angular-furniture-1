import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: '[filter-by-price]',
  imports: [FormsModule],
  templateUrl: './filter-by-price.component.html',
  styleUrl: './filter-by-price.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByPriceComponent {
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  currentminPrice: number = 0;
  currentmaxPrice: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentminPrice = this.minPrice;
    this.currentmaxPrice = this.maxPrice;
  }

  onPriceChange(): void {
    // Update the URL with the new price range
    this.router.navigate([], {
      queryParams: {
        minPrice: this.currentminPrice,
        maxPrice: this.currentmaxPrice,
      },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }
}
