import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FetcherService } from '../../services/fetcher.service';
import { Product } from '../../models/app.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  editingProductId: number | null = null;
  displayedColumns: string[] = ['id', 'name', 'brand', 'img', 'price', 'actions'];

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

  startEditing(productId: number): void {
    this.editingProductId = productId;
  }

  saveProduct(product: Product): void {
    this.fetcherService.put<Product>(`products/${product.id}`, product).subscribe({
      next: (updatedProduct) => {
        const index = this.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.products = [...this.products]; // Trigger change detection
        }
        this.editingProductId = null;
        console.log('Product updated successfully:', updatedProduct);
      },
      error: (error) => {
        console.error('Failed to update product:', error);
      },
    });
  }

  cancelEditing(): void {
    this.editingProductId = null;
  }
}
