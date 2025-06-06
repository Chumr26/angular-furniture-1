import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/app.model';

@Component({
  selector: '[filter-by-price]',
  imports: [FormsModule],
  templateUrl: './filter-by-price.component.html',
  styleUrl: './filter-by-price.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilterByPriceComponent {
  @Input() filterProduct: Product[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  currentminPrice: number = 0;
  currentmaxPrice: number = 0;
  prevMin: number = 0;
  prevMax: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updatePriceRange();
    this.currentminPrice = this.minPrice;
    this.currentmaxPrice = this.maxPrice;
    this.prevMin = this.currentminPrice;
    this.prevMax = this.currentmaxPrice;
    this.route.queryParams.subscribe((params) => {
      if (
        (!params['minPrice'] && !params['maxPrice']) ||
        (Number(params['minPrice']) === this.prevMin &&
          Number(params['maxPrice']) === this.prevMax)
      ) {
        // Wait for filterProduct to be updated
        setTimeout(() => {
          this.updatePriceRange();
          if (
            this.currentmaxPrice > this.maxPrice ||
            this.currentminPrice < this.minPrice
          ) {
            this.currentminPrice = this.minPrice;
            this.currentmaxPrice = this.maxPrice;
            // remove query params
            this.router.navigate([], {
              queryParams: {
                minPrice: null,
                maxPrice: null,
              },
              queryParamsHandling: 'merge', // Merge with existing query params
            });
          } else {
            this.currentminPrice = this.minPrice;
            this.currentmaxPrice = this.maxPrice;
          }
          this.cdr.detectChanges(); // Trigger change detection
        });
      } else {
        this.prevMax = Number(params['maxPrice']) || this.currentmaxPrice;
        this.prevMin = Number(params['minPrice']) || this.currentminPrice;
      }
    });
  }

  private updatePriceRange(): void {
    this.minPrice = this.filterProduct.reduce(
      (min, p) => Math.min(min, p.price),
      Infinity
    );
    this.maxPrice = this.filterProduct.reduce(
      (max, p) => Math.max(max, p.price),
      -Infinity
    );
  }

  onPriceChange(): void {
    if (this.currentminPrice > this.currentmaxPrice) {
      this.currentminPrice = this.currentmaxPrice;
    } else if (this.currentmaxPrice < this.currentminPrice) {
      this.currentmaxPrice = this.currentminPrice;
    }
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
