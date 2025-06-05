import { Component, ViewEncapsulation } from '@angular/core';
import { Product } from '../../models/app.model';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../../shared/product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common'; // Import ViewportScroller
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: '[products-page]',
  imports: [ProductComponent, RouterLink],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductsPageComponent {
  pageLen = 12;
  pages: number[] = [];
  currentPage = 1;
  startIndex = 0;
  endIndex = 0;
  totalProducts = 0;
  allProducts: Product[] = [];
  currentProducts: Product[] = [];
  loading = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private viewportScroller: ViewportScroller // Inject ViewportScroller
  ) {}

  // Public getter to expose queryParams
  get orderBy(): string {
    return this.route.snapshot.queryParams['orderby'] || 'menu_order';
  }

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.pages = Array.from(
      { length: Math.ceil(this.allProducts.length / this.pageLen) },
      (_, i) => i + 1
    );

    this.route.params.subscribe((params) => {
      const page = parseInt(params['page'], 10);

      if (isNaN(page) || page < 1 || page > this.pages.length) {
        this.currentPage = 1; // Default to page 1 if no valid page is provided
      } else {
        this.currentPage = page;
        this.scrollToTop(); // Scroll to the top of the page
      }

      this.route.queryParams.subscribe((queryParams) => {
        const sort = queryParams['orderby'];
        if (sort) {
          this.applySort(sort);
        }
        this.loadProducts(); // Reload products based on the new page and sort
      });
    });
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
    // Scroll to the element with the ID or anchor name
    this.viewportScroller.setOffset([0, 200]);
    this.viewportScroller.scrollToAnchor('anchor');
  }

  onSortChange(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;

    // Update query parameters with the new sort value
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { orderby: sortValue},
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }

  applySort(sortValue: string): void {
    switch (sortValue) {
      //   case 'popularity':
      //     this.allProducts.sort((a, b) => b.popularity - a.popularity);
      //     break;
      //   case 'rating':
      //     this.allProducts.sort((a, b) => b.rating - a.rating);
      //     break;
      //   case 'date':
      //     this.allProducts.sort(
      //       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      //     );
      //     break;
      case 'price':
        this.allProducts.sort(
          (a, b) =>
            a.price -
            (a.discount_percentage / 100) * a.price -
            (b.price - (b.discount_percentage / 100) * b.price)
        );
        break;
      case 'price-desc':
        this.allProducts.sort(
          (a, b) =>
            b.price -
            (b.discount_percentage / 100) * b.price -
            (a.price - (a.discount_percentage / 100) * a.price)
        );
        break;
      default:
        // Default sorting logic if needed
        break;
    }
  }
}
