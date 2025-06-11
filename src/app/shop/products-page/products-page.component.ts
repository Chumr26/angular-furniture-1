import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../../models/app.model';
import { ProductComponent } from '../../shared/product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: '[products-page]',
  imports: [ProductComponent, RouterLink],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsPageComponent implements OnChanges {
  @Input() allProducts: Product[] = []; // Input property for products
  pageLen = 12;
  pages: number[] = [];
  currentPage = 1;
  startIndex = 0;
  endIndex = 0;
  totalProducts = 0;
  currentProducts: Product[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  // Public getter to expose queryParams
  get orderBy(): string {
    return this.route.snapshot.queryParams['orderby'] || 'menu_order';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allProducts'] && changes['allProducts'].currentValue) {
      this.initializePagination();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const page = parseInt(params['page'], 10);

      if (isNaN(page) || page < 1 || page > this.pages.length) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
        this.scrollToTop();
      }

      this.initializePagination();
    });
  }

  initializePagination(): void {
    this.pages = Array.from(
      { length: Math.ceil(this.allProducts.length / this.pageLen) },
      (_, i) => i + 1
    );
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.totalProducts = this.allProducts.length;
    this.startIndex = (this.currentPage - 1) * this.pageLen;
    this.endIndex = Math.min(
      this.startIndex + this.pageLen,
      this.totalProducts
    );
    this.currentProducts = this.allProducts.slice(
      this.startIndex,
      this.endIndex
    );
    this.loading = false;
  }

  scrollToTop(): void {
    this.viewportScroller.setOffset([0, 200]);
    this.viewportScroller.scrollToAnchor('anchor');
  }

  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { orderby: sortValue },
      queryParamsHandling: 'merge',
    });
  }
}
