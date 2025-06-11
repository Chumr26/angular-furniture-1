import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/app.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { forkJoin } from 'rxjs';

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

  get colorString(): string {
    return this.selectedProduct.color.join(', '); // Convert array to comma-separated string
  }

  set colorString(value: string) {
    this.selectedProduct.color = value.split(',').map((color) => color.trim()); // Convert string back to array
  }

  get materialString(): string {
    return this.selectedProduct.material.join(', '); // Convert array to comma-separated string
  }

  set materialString(value: string) {
    this.selectedProduct.material = value
      .split(',')
      .map((material) => material.trim());
  }
  get categoryString(): string {
    return this.selectedProduct.category.join(', '); // Convert array to comma-separated string
  }
  set categoryString(value: string) {
    this.selectedProduct.category = value
      .split(',')
      .map((category) => category.trim());
  }
  get featuresString(): string {
    return this.selectedProduct.features.join(', '); // Convert array to comma-separated string
  }

  set featuresString(value: string) {
    this.selectedProduct.features = value
      .split(',')
      .map((feature) => feature.trim());
  }
  ngOnInit(): void {
    // Fetch products and their images
    forkJoin([
      this.fetcherService.get<Product[]>('products'),
      this.fetcherService.get<{ id: string; data: string }[]>('product_imgs'),
    ]).subscribe({
      next: ([products, images]) => {
        // Merge products with their images
        this.products = products.map((product) => {
          const productImage = images.find((image) => image.id === product.id);
          return { ...product, image: productImage?.data || undefined };
        });
      },
      error: (error) => {
        console.error('Failed to fetch products or images:', error);
      },
    });
  }

  loadProductDetails(product: Product): void {
    window.scrollTo(0, 0); // Scroll to the top of the page
    this.selectedProduct = { ...product };
  }

  onSubmit(): void {
    if (this.selectedProduct.id) {
      // Update product in the database
      forkJoin([
        this.fetcherService.put<Product>(
          `products/${this.selectedProduct.id}`,
          this.selectedProduct
        ),
        this.fetcherService.put(
          `product_imgs/${this.selectedProduct.id}`,
          { id: this.selectedProduct.id, data: this.selectedProduct.image } // Assuming image is a base64 string
        ),
      ]).subscribe({
        next: ([updatedProduct, img]) => {
          // Update the product in the UI
          const index = this.products.findIndex(
            (p) => p.id === updatedProduct.id
          );
          if (index !== -1) {
            this.products[index] = { ...updatedProduct, image: img.data }; // Update the image field with the new image data
          }
          console.log('Product updated successfully:', updatedProduct);
        },
        error: (error) => {
          console.error('Failed to update product:', error);
        },
      });
    } else {
      // Create new product in the database
      const { image, ...newProduct } = this.selectedProduct;
      forkJoin([
        this.fetcherService.post<Product>('products', {
          ...newProduct,
          id: this.getId(),
        }), // Generate a new ID for the product
        this.fetcherService.post(
          'product_imgs',
          { id: this.getId(), data: image } // Use the new ID for the image
        ),
      ]).subscribe({
        next: ([newProduct, img]) => {
          // Add the new product to the UI
          this.products = [
            ...this.products,
            { ...newProduct, image: img.data },
          ]; // Update the image field with the new image data
          console.log('Product created successfully:', newProduct);
        },
        error: (error) => {
          console.error('Failed to create product:', error);
        },
      });
    }
    this.resetForm();
  }

  getId(): string {
    // Generate a new ID for the product
    const max = this.products.reduce(
      (maxId, product) => Math.max(maxId, parseInt(product.id || '0', 10)),
      0
    );
    return (max + 1).toString();
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedProduct.image = reader.result as string; // Update the image field with the base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.click(); // Trigger the file input click programmatically
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

  deleteProduct(productId: string): void {
    this.fetcherService.delete(`products/${productId}`).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        this.products = [...this.products]; // Trigger change detection
      },
      error: (error) => {
        console.error('Failed to delete product:', error);
      },
    });
  }
}
