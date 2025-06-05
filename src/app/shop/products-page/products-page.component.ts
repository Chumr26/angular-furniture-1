import { Component, ViewEncapsulation } from '@angular/core';
import { Product } from '../../models/app.model';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../../shared/product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common'; // Import ViewportScroller

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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller // Inject ViewportScroller
  ) {}

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
      this.loadProducts(); // Reload products based on the new page
    });
  }

  loadProducts(): void {
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
  }

  scrollToTop(): void {
    // Scroll to the element with the ID or anchor name
    this.viewportScroller.setOffset([0, 200]);
    this.viewportScroller.scrollToAnchor('anchor');
  }
}
