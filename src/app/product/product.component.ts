import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumsComponent } from '../shared/breadcrums/breadcrums.component';
import { Router } from '@angular/router';
import { Product } from '../models/app.model';
import { FetcherService } from '../services/fetcher.service';

@Component({
  selector: '[product]',
  imports: [BreadcrumsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent {
  breadcrumItems: string[] = [];
  productName: string = '';
  product: Product | null = null; // Assuming you have a Product model

  constructor(private router: Router, private fetcher: FetcherService) {}

  ngOnInit(): void {
    this.productName = this.toTitleCase(this.router.url.split('/').pop()!);

    this.fetcher.get<Product[]>(`products?name=${this.productName}`).subscribe({
      next: (product) => {
        this.product = product[0] || null; // Assuming the API returns an array
        this.breadcrumItems = [
          'Home',
          'Shop',
          this.product?.category[0]!,
          this.productName,
        ];
        console.log(this.breadcrumItems);
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
}
