import { Component, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../../models/app.model';
import { FetcherService } from '../../../../services/fetcher.service';

@Component({
  selector: '[start]',
  imports: [RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  searchValue: string = '';
  products: Product[] = [];
  searchedProduct: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fetcher: FetcherService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.fetcher.get<Product[]>('products').subscribe((data) => {
      this.products = data;
      //fetche image of each product and merge it with the product
      this.products.forEach((product) => {
        this.fetcher
          .get<{ id: string; data: string }>(`product_imgs/${product.id}`)
          .subscribe((image) => {
            product.image = image.data;
          });
      });
    });
    // Subscribe to query parameter changes
    this.route.queryParams.subscribe((params) => {
      const search = params['search'];
      if (search) {
        this.searchValue = search; // Update the search input value
        this.filterProduct(search);
      } else {
        this.searchValue = ''; // Clear the search input value
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: null },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  onSearchInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: value },
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }

  private filterProduct(search: string): void {
    this.searchedProduct = this.products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 8);
  }

  formatProductName(name: string): string {
    return name.toLocaleLowerCase().replace(/ /g, '-');
  }
}
