import { Component, ViewEncapsulation } from '@angular/core';
import { ProductComponent } from '../shared/product/product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/app.model';
import { FetcherService } from '../services/fetcher.service';
import { CommonModule } from '@angular/common';
import { ProductEntryWrapperComponent } from './product-entry-wrapper/product-entry-wrapper.component';

@Component({
  selector: '[product-detail]',
  imports: [CommonModule, ProductEntryWrapperComponent, ProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent {
  breadcrumItems: string[] = [];
  productName: string = '';
  product!: Product; // Assuming you have a Product model
  tab = 'description';
  relatedProducts: Product[] = [];

  constructor(
    private router: Router,
    private fetcher: FetcherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Subscribe to route parameter changes
    this.route.params.subscribe(() => {
      this.updateProductDetails();
    });
  }

  updateProductDetails(): void {
    this.productName = this.toTitleCase(this.router.url.split('/').pop()!);

    // Fetch product details
    this.fetcher.get<Product[]>(`products?name=${this.productName}`).subscribe({
      next: (product) => {
        this.product = product[0]; // Assuming the API returns an array
        this.breadcrumItems = [
          'Home',
          'Shop',
          this.product?.category[0]!,
          this.productName,
        ];

        // Fetch related products
        this.fetcher
          .get<Product[]>(`products?category[0]=${this.product.category[0]}`)
          .subscribe({
            next: (products) => {
              this.relatedProducts = products
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            },
            error: (error) => {
              console.error('Error fetching related products:', error);
            },
          });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  toTitleCase(str: string): string {
    return str
      .replace(/-/g, ' ') // Replace dashes with spaces
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
      );
  }

  devideParagraph(text: string, length: number): string[] {
    if (text) {
      const sentences = text.split('. ');
      const result: string[] = [];
      const paragraphLen = sentences.length / length;
      for (let i = 0; i < length; i++) {
        result.push(
          sentences.slice(i * paragraphLen, (i + 1) * paragraphLen).join('. ')
        );
      }
      return result;
    } else return [''];
  }

  setTab(name: string, event: Event) {
    event.preventDefault();
    this.tab = name;
  }
}
