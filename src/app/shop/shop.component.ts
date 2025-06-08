import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BannerComponent } from '../shared/banner/banner.component';
import { CategoryComponent } from '../shared/category/category.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { Product } from '../models/app.model';
import { ActivatedRoute } from '@angular/router';
import { SubscribeComponent } from '../shared/subscribe/subscribe.component';
import { WelflareComponent } from './welflare/welflare.component';
import { FetcherService } from '../services/fetcher.service';

@Component({
  selector: '[shop]',
  imports: [
    BannerComponent,
    CategoryComponent,
    FilterComponent,
    ProductsPageComponent,
    SubscribeComponent,
    WelflareComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private fetcher: FetcherService) {}

  ngOnInit(): void {
    // Load all products initially
    this.fetcher.get<Product[]>('products').subscribe({
      next: (products) => {
        this.allProducts = products;
        this.filteredProducts = [...this.allProducts];
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
    // this.allProducts = this.productService.getProducts();
    // this.filteredProducts = [...this.allProducts];

    // Listen for query parameter changes
    this.route.queryParams.subscribe((params) => {
      this.applyFilters(params);
    });
  }

  private applyFilters(params: { [key: string]: string }): void {
    let filtered = [...this.allProducts];

    // Filter by category if 'filter_category' exists
    if (params['filter_category']) {
      const categories = decodeURIComponent(params['filter_category']).split(
        ','
      );
      filtered = filtered.filter((product) =>
        product.category.some((cat) =>
          categories.includes(cat.toLocaleLowerCase())
        )
      );
    }

    // Filter by color if 'filter_color' exists
    if (params['filter_color']) {
      const colors = decodeURIComponent(params['filter_color']).split(',');
      filtered = filtered.filter((product) =>
        product.color.some((color) =>
          colors.includes(color.toLocaleLowerCase())
        )
      );
    }

    // Filter by price if 'minPrice' and 'maxPrice' exists
    if (params['minPrice'] && params['maxPrice']) {
      const minPrice = parseInt(params['minPrice']);
      const maxPrice = parseInt(params['maxPrice']);
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
    // Filter by material if 'filter_material' exists
    if (params['filter_material']) {
      const materials = decodeURIComponent(params['filter_material']).split(
        ','
      );
      filtered = filtered.filter((product) =>
        product.material.some((mat) =>
          materials.includes(mat.toLocaleLowerCase())
        )
      );
    }

    // Filter by brand if 'filter_brand' exists
    if (params['filter_brand']) {
      const brands = decodeURIComponent(params['filter_brand']).split(',');
      filtered = filtered.filter((product) =>
        brands.includes(product.brand.toLocaleLowerCase())
      );
    }

    // Sort products if 'orderby' exists
    if (params['orderby']) {
      const orderBy = params['orderby'];
      switch (orderBy) {
        case 'price':
          filtered.sort(
            (a, b) =>
              a.price -
              (a.discount_percentage / 100) * a.price -
              (b.price - (b.discount_percentage / 100) * b.price)
          );
          break;
        case 'price-desc':
          filtered.sort(
            (a, b) =>
              b.price -
              (b.discount_percentage / 100) * b.price -
              (a.price - (a.discount_percentage / 100) * a.price)
          );
          break;
        default:
          break;
      }
    }

    this.filteredProducts = filtered;
  }
}
