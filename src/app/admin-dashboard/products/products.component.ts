import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/app.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = {
    id: '',
    name: '',
    price: 0,
    category: [],
    brand: '',
    color: [],
    material: [],
    short_description: '',
    long_description: '',
    dimensions: '',
    features: [],
    care_instructions: '',
    quantity: 0,
    discount_percentage: 0,
  };

  constructor(private fetcherService: FetcherService) {}

  ngOnInit(): void {
    this.fetcherService.get<Product[]>('products').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
      },
    });
  }

  loadProductDetails(product: Product): void {
    this.selectedProduct = { ...product };
  }

  onSubmit(): void {
    if (this.selectedProduct.id) {
      // Update product in the database
      this.fetcherService
        .put<Product>(
          `products/${this.selectedProduct.id}`,
          this.selectedProduct
        )
        .subscribe({
          next: (updatedProduct) => {
            // Update the product in the UI
            const index = this.products.findIndex(
              (p) => p.id === updatedProduct.id
            );
            if (index !== -1) {
              this.products[index] = updatedProduct;
            }
            console.log('Product updated successfully:', updatedProduct);
          },
          error: (error) => {
            console.error('Failed to update product:', error);
          },
        });
    } else {
      // Create new product in the database
      this.fetcherService
        .post<Product>('products', this.selectedProduct)
        .subscribe({
          next: (newProduct) => {
            // Add the new product to the UI
            this.products.push(newProduct);
            console.log('Product created successfully:', newProduct);
          },
          error: (error) => {
            console.error('Failed to create product:', error);
          },
        });
    }
    this.resetForm();
  }

  resetForm(): void {
    this.selectedProduct = {
      id: '',
      name: '',
      price: 0,
      category: [],
      brand: '',
      color: [],
      material: [],
      short_description: '',
      long_description: '',
      dimensions: '',
      features: [],
      care_instructions: '',
      quantity: 0,
      discount_percentage: 0,
    };
  }
}
